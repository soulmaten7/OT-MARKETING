/**
 * STEP_25 — 6 업종 랜딩 폼 제출 통합 API
 * fix: 업종 한글화 + 자가진단 컬럼 분해 + 연락처 정규화 + 통화 시간 라벨 변환
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { getIndustryConfig } from "@/lib/industries";
import type { Question } from "@/lib/industries";

const submitSchema = z.object({
    industryId: z.string(),
    sheetId: z.string().nullable().optional(),
    grade: z.string(),
    answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
    personal: z.record(z.string(), z.string()),
    memo: z.string().optional(),
});

const TIME_LABELS: Record<string, string> = {
    morning:   "오전 9~12시",
    afternoon: "오후 13~18시",
    evening:   "저녁 18~21시",
    anytime:   "언제든",
};

function normalizePhone(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("010")) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
    if (digits.length === 10 && digits.startsWith("010")) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return raw;
}

function labelize(
    rawValue: string | string[] | undefined,
    question: Question
): string {
    if (rawValue === undefined || rawValue === null) return "";
    const opts = question.options ?? [];
    if (Array.isArray(rawValue)) {
        return rawValue
            .map((v) => opts.find((o) => o.value === v)?.label ?? v)
            .join(", ");
    }
    return opts.find((o) => o.value === rawValue)?.label ?? rawValue;
}

function buildHeaders(questions: Question[]): string[] {
    const base = ["신청ID", "신청일시", "업종", "등급", "성함", "연락처", "통화 가능 시간"];
    const qHeaders = questions.map((q, i) => `Q${i + 1} ${q.label}`);
    const tail = ["추가 메모", "상태"];
    return [...base, ...qHeaders, ...tail];
}

function buildPrivateKey(raw: string): string {
    let key = raw;
    if (key.includes("\\n")) key = key.replace(/\\n/g, "\n");
    if (key.startsWith('"') && key.endsWith('"')) key = key.slice(1, -1);
    let b64 = key
        .replace(/-----BEGIN PRIVATE KEY-----/g, "")
        .replace(/-----END PRIVATE KEY-----/g, "")
        .replace(/\s+/g, "");
    const rem = b64.length % 4;
    if (rem !== 0) b64 += "=".repeat(4 - rem);
    const chunked = b64.match(/.{1,64}/g)?.join("\n");
    return `-----BEGIN PRIVATE KEY-----\n${chunked}\n-----END PRIVATE KEY-----\n`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = submitSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid data", details: parsed.error.issues },
                { status: 400 }
            );
        }

        const { industryId, sheetId, grade, answers, personal, memo } = parsed.data;
        const config = getIndustryConfig(industryId);

        if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.log(
                `[landing-submit] No sheetId or credentials — logged only. industryId=${industryId}, grade=${grade}`
            );
            return NextResponse.json({ success: true, deliveryNote: "logged-only" });
        }

        const auth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: buildPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const doc = new GoogleSpreadsheet(sheetId, auth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        // 헤더 강제 셋업 (업종별 동적)
        const questions = config?.diagnosis.questions ?? [];
        const headers = buildHeaders(questions);
        await sheet.setHeaderRow(headers);

        // 기본 필드
        const submissionId = `LD-${Date.now()}`;
        const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        const row: Record<string, string> = {
            "신청ID":          submissionId,
            "신청일시":         now,
            "업종":            config?.industryName ?? industryId,
            "등급":            grade,
            "성함":            personal.name  ?? "",
            "연락처":          normalizePhone(personal.phone ?? ""),
            "통화 가능 시간":   TIME_LABELS[personal.time ?? ""] ?? personal.time ?? "",
            "추가 메모":        memo ?? "",
            "상태":            "01_접수",
        };

        // Q1~Q9 컬럼별 한글 변환
        questions.forEach((q, i) => {
            const key = `Q${i + 1} ${q.label}`;
            row[key] = labelize(answers[q.id], q);
        });

        await sheet.addRow(row);

        return NextResponse.json({ success: true, submissionId });
    } catch (error) {
        console.error("Landing submit error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
