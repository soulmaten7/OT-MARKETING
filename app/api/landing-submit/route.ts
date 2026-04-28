/**
 * STEP_25 — 6 업종 랜딩 폼 제출 통합 API
 *
 * 폼 제출:
 *   POST /api/landing-submit
 *   body: { industryId, sheetId, grade, answers, personal, memo }
 *
 * sheetId 가 null/빈 값 → console.log 만 (시트 미입력, 사장 사전 시트 생성 필요)
 * sheetId 가 있고 service account 권한 부여됨 → 시트에 자가진단 행 자동 추가
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const submitSchema = z.object({
    industryId: z.string(),
    sheetId: z.string().nullable().optional(),
    grade: z.string(),
    answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
    personal: z.record(z.string(), z.string()),
    memo: z.string().optional(),
});

function buildPrivateKey(raw: string): string {
    let privateKey = raw;
    if (privateKey.includes("\\n")) privateKey = privateKey.replace(/\\n/g, "\n");
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
    }
    let pureBase64 = privateKey
        .replace(/-----BEGIN PRIVATE KEY-----/g, "")
        .replace(/-----END PRIVATE KEY-----/g, "")
        .replace(/\s+/g, "");
    const remainder = pureBase64.length % 4;
    if (remainder !== 0) pureBase64 += "=".repeat(4 - remainder);
    const chunked = pureBase64.match(/.{1,64}/g)?.join("\n");
    return `-----BEGIN PRIVATE KEY-----\n${chunked}\n-----END PRIVATE KEY-----\n`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = submitSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Invalid data",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    details: (parsed.error as any).issues ?? (parsed.error as any).errors,
                },
                { status: 400 }
            );
        }

        const { industryId, sheetId, grade, answers, personal, memo } = parsed.data;

        // sheetId 없으면 console.log 만 (사장 사전 시트 생성 필요)
        if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.log(
                `[landing-submit] No sheetId or credentials — logged only. industryId=${industryId}, grade=${grade}, personal=${JSON.stringify(personal)}`
            );
            return NextResponse.json({ success: true, deliveryNote: "logged-only (no sheet target configured)" });
        }

        const finalKey = buildPrivateKey(process.env.GOOGLE_PRIVATE_KEY!);
        const auth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: finalKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const doc = new GoogleSpreadsheet(sheetId, auth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        // 헤더 자동 셋업 (없으면)
        let headersLoaded = false;
        try {
            await sheet.loadHeaderRow();
            headersLoaded = true;
        } catch {
            headersLoaded = false;
        }
        if (!headersLoaded) {
            await sheet.setHeaderRow([
                "신청ID",
                "신청일시",
                "업종",
                "등급",
                "성함",
                "연락처",
                "통화 가능 시간",
                "자가진단 답변(JSON)",
                "추가 메모",
                "상태",
            ]);
        }

        const submissionId = `LD-${Date.now()}`;
        const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        await sheet.addRow({
            "신청ID": submissionId,
            "신청일시": now,
            "업종": industryId,
            "등급": grade,
            "성함": personal.name || "",
            "연락처": personal.phone || "",
            "통화 가능 시간": personal.time || "",
            "자가진단 답변(JSON)": JSON.stringify(answers),
            "추가 메모": memo || "",
            "상태": "01_접수",
        });

        return NextResponse.json({ success: true, submissionId });
    } catch (error) {
        console.error("Landing submit error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
