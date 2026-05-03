/**
 * STEP_25 — 6 업종 랜딩 폼 제출 통합 API
 * STEP_44 v2 Phase 3·4 — landing_url 캡처 + 동의 3 + DB 분배 + 광고주 봇 알림
 *
 * 분배 흐름:
 *   POST → zod 검증 → 시트 row 추가 → classifyDbGrade (5 레버) → distributeRow (Tier 1 fetch + 광고주 시트 복사)
 *        → 분배_로그 기록 → 사장 봇 알림 (옛) → 광고주 봇 알림 (신규, 등급 A/B/C + 광고주 박힌 경우만)
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { getIndustryConfig } from "@/lib/industries";
import type { Question } from "@/lib/industries";
import { parseAdvertiserSlug } from "@/lib/advertisers";
import { getAdvertiserBySlug } from "@/lib/advertisers/sheet-api";

// STEP_44 v2 Phase 2 — 봇 시트 ID (Cowork 자동 substitute, 2026-05-03)
const BOT_SHEET_ID = "1lzMfu7z3x20iCQNrzXTbFCUdWU6V_E_Ea2PyPhqL2dg";

const submitSchema = z.object({
    industryId: z.string(),
    sheetId: z.string().nullable().optional(),
    grade: z.string(),
    answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
    personal: z.record(z.string(), z.string()),
    memo: z.string().optional(),
    // STEP_44 v2 Phase 3 신규
    landingUrl: z.string().url().optional(),
    consentPrivacy: z.boolean().optional(),
    consentThirdParty: z.boolean().optional(),
    consentMarketing: z.boolean().optional().default(false),
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
    // STEP_44 v2 Phase 1 신규 5 컬럼
    const v2New = ["랜딩 URL", "광고주 ID", "DB 등급", "동의_3자", "동의_마케팅"];
    const tail = ["추가 메모", "상태"];
    return [...base, ...qHeaders, ...v2New, ...tail];
}

async function sendTelegram(botToken: string, chatId: string, text: string): Promise<void> {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
}

function buildTelegramMessage(
    industryName: string,
    grade: string,
    personal: Record<string, string>,
    questions: Question[],
    answers: Record<string, string | string[]>,
    submissionId: string,
    now: string,
): string {
    const timeLabel = TIME_LABELS[personal.time ?? ""] ?? personal.time ?? "";
    const qLines = questions
        .map((q) => `  <b>${q.label}</b>: ${labelize(answers[q.id], q)}`)
        .join("\n");

    return [
        `🆕 <b>새 신청 도착</b>`,
        ``,
        `<b>업종</b>: ${industryName}`,
        `<b>등급</b>: ${grade}`,
        `<b>성함</b>: ${personal.name ?? ""}`,
        `<b>연락처</b>: ${normalizePhone(personal.phone ?? "")}`,
        `<b>통화 시간</b>: ${timeLabel}`,
        ``,
        `<b>자가진단</b>`,
        qLines,
        ``,
        `━━━━━━━━━━`,
        `📅 ${now}`,
        `🆔 ${submissionId}`,
    ].join("\n");
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

// === STEP_44 v2 Phase 4 === //

/**
 * DB 등급 5 레버 측정
 * 1. 응답 완성도 20%
 * 2. 연락처 형식 20%
 * 3. 응답 진실성 20%
 * 4. 동의 30%
 * 5. 1차콜 응답 10% (현재 0)
 */
function classifyDbGrade(args: {
    personal: Record<string, string>;
    answers: Record<string, string | string[]>;
    questions: Question[];
    consentPrivacy: boolean;
    consentThirdParty: boolean;
}): "A" | "B" | "C" | "D" {
    let score = 0;

    // 1. 응답 완성도 20%
    const required = args.questions.filter((q) => q.required);
    const filled = required.filter((q) => {
        const v = args.answers[q.id];
        return v !== undefined && v !== "" && (!Array.isArray(v) || v.length > 0);
    }).length;
    if (required.length > 0) score += (filled / required.length) * 20;

    // 2. 연락처 형식 20%
    if (/^010-?\d{4}-?\d{4}$/.test(args.personal.phone ?? "")) score += 20;

    // 3. 응답 진실성 20% (간소화: required 모두 박힘 + non-default 옵션)
    if (required.length > 0 && filled === required.length) score += 20;

    // 4. 동의 30% (필수 2 모두 ✅)
    if (args.consentPrivacy && args.consentThirdParty) score += 30;

    // 5. 1차콜 응답 10% — 광고주 수동 입력 영역. 현재 0.

    if (score >= 90) return "A";
    if (score >= 70) return "B";
    if (score >= 50) return "C";
    return "D";
}

/**
 * URL → slug 추출 (광고주 매칭 source)
 */
function extractSlugFromUrl(landingUrl: string | undefined): string | null {
    if (!landingUrl) return null;
    try {
        const url = new URL(landingUrl);
        const slug = url.pathname.replace(/^\//, "").split("/")[0];
        return slug || null;
    } catch {
        return null;
    }
}

interface DistributionResult {
    partnerId: string;
    partnerSheetId: string | null;
    copied: boolean;
    reason?: string;
}

/**
 * 광고주 시트 복사 (등급 A/B/C 만)
 */
async function distributeRow(args: {
    slug: string | null;
    grade: "A" | "B" | "C" | "D";
    rowData: Record<string, string>;
    auth: JWT;
}): Promise<DistributionResult> {
    const { slug, grade, rowData, auth } = args;

    if (!slug) {
        return { partnerId: "AD000", partnerSheetId: null, copied: false, reason: "no_slug" };
    }

    // sample slug = 사장 디폴트 (광고주 시트 복사 X)
    if (/^select[1-6]$/.test(slug)) {
        return { partnerId: "AD000", partnerSheetId: null, copied: false, reason: "sample_default" };
    }

    const parsed = parseAdvertiserSlug(slug);
    if (!parsed) {
        return { partnerId: "AD000", partnerSheetId: null, copied: false, reason: "invalid_slug" };
    }

    const advertiser = await getAdvertiserBySlug(slug);
    if (!advertiser) {
        return { partnerId: "AD_UNKNOWN", partnerSheetId: null, copied: false, reason: "tier1_miss" };
    }

    const partnerId = advertiser.advertiserId || "AD_UNKNOWN";

    if (grade === "D") {
        return { partnerId, partnerSheetId: null, copied: false, reason: "grade_D" };
    }

    const partnerSheetId = advertiser.partnerSheetId;
    if (!partnerSheetId) {
        return { partnerId, partnerSheetId: null, copied: false, reason: "no_partner_sheet" };
    }

    try {
        const partnerDoc = new GoogleSpreadsheet(partnerSheetId, auth);
        await partnerDoc.loadInfo();
        const partnerSheet = partnerDoc.sheetsByIndex[0];
        await partnerSheet.addRow(rowData);
        return { partnerId, partnerSheetId, copied: true };
    } catch (err) {
        console.error("[distributeRow] 광고주 시트 복사 실패:", err);
        return { partnerId, partnerSheetId, copied: false, reason: "copy_error" };
    }
}

/**
 * 봇 토큰 시트 fetch (광고주별)
 */
async function getBotInfo(
    partnerId: string,
    auth: JWT
): Promise<{ token: string; chatId: string } | null> {
    if (!BOT_SHEET_ID || BOT_SHEET_ID.length < 20) {
        console.warn("[getBotInfo] BOT_SHEET_ID 미박힘. 알림 skip");
        return null;
    }

    try {
        const doc = new GoogleSpreadsheet(BOT_SHEET_ID, auth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        for (const row of rows) {
            if (row.get("광고주ID") !== partnerId) continue;
            const isActive = row.get("활성");
            if (isActive !== "TRUE" && isActive !== true) continue;
            return {
                token: row.get("봇 토큰") || "",
                chatId: String(row.get("chat_id") || ""),
            };
        }
        return null;
    } catch (err) {
        console.error("[getBotInfo] 실패:", err);
        return null;
    }
}

/**
 * 분배_로그 시트 기록
 */
async function logDistribution(args: {
    sheetId: string;
    auth: JWT;
    submissionId: string;
    distribution: DistributionResult;
    slug: string | null;
    landingUrl: string | undefined;
    grade: string;
    now: string;
}): Promise<void> {
    try {
        const doc = new GoogleSpreadsheet(args.sheetId, args.auth);
        await doc.loadInfo();
        const logSheet = doc.sheetsByTitle["분배_로그"];
        if (!logSheet) {
            console.warn("[logDistribution] 분배_로그 탭 X (Phase 1 setupAllIndustrySheets 미실행?)");
            return;
        }
        await logSheet.addRow({
            "타임스탬프":    args.now,
            "submissionId": args.submissionId,
            "광고주ID":      args.distribution.partnerId,
            "slug":          args.slug || "",
            "랜딩 URL":      args.landingUrl || "",
            "등급":          args.grade,
            "복사 결과":     args.distribution.copied ? "OK" : (args.distribution.reason || "N/A"),
        });
    } catch (err) {
        console.error("[logDistribution] 실패:", err);
    }
}

// === POST handler === //

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

        const {
            industryId,
            sheetId,
            grade,
            answers,
            personal,
            memo,
            landingUrl,
            consentPrivacy = false,
            consentThirdParty = false,
            consentMarketing = false,
        } = parsed.data;
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

        // 헤더 강제 셋업 (업종별 동적, v2 신규 5 컬럼 포함)
        const questions = config?.diagnosis.questions ?? [];
        const headers = buildHeaders(questions);
        await sheet.setHeaderRow(headers);

        // 기본 필드
        const submissionId = `LD-${Date.now()}`;
        const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        // STEP_44 v2 Phase 4 — 5 레버 등급 측정
        const v2Grade = classifyDbGrade({
            personal,
            answers,
            questions,
            consentPrivacy,
            consentThirdParty,
        });

        // STEP_44 v2 Phase 4 — slug 추출
        const slug = extractSlugFromUrl(landingUrl);

        // 시트 row (사장 시트 = OT-landing-debt-relief-2026 등)
        const row: Record<string, string> = {
            "신청ID":          submissionId,
            "신청일시":         now,
            "업종":            config?.industryName ?? industryId,
            "등급":            grade,                                 // 옛 등급 (config gradeLogic)
            "성함":            personal.name  ?? "",
            "연락처":          normalizePhone(personal.phone ?? ""),
            "통화 가능 시간":   TIME_LABELS[personal.time ?? ""] ?? personal.time ?? "",
            "랜딩 URL":        landingUrl ?? "",
            "광고주 ID":        "",                                   // distributeRow 결과로 채움
            "DB 등급":         v2Grade,                                // v2 5 레버 등급
            "동의_3자":        consentThirdParty ? "Y" : "N",
            "동의_마케팅":     consentMarketing  ? "Y" : "N",
            "추가 메모":        memo ?? "",
            "상태":            "01_접수",
        };

        questions.forEach((q, i) => {
            const key = `Q${i + 1} ${q.label}`;
            row[key] = labelize(answers[q.id], q);
        });

        // STEP_44 v2 Phase 4 — 광고주 시트 분배
        const distribution = await distributeRow({
            slug,
            grade: v2Grade,
            rowData: row,
            auth,
        });

        // 광고주 ID 컬럼 채움
        row["광고주 ID"] = distribution.partnerId;

        // 사장 시트에 row 추가
        await sheet.addRow(row);

        // STEP_44 v2 Phase 4 — 분배_로그 기록
        await logDistribution({
            sheetId,
            auth,
            submissionId,
            distribution,
            slug,
            landingUrl,
            grade: v2Grade,
            now,
        });

        // 텔레그램 알림 (사장 봇 — 옛 흐름 그대로)
        try {
            const tokenEnv = config?.contact.telegramBotTokenEnv;
            const chatEnv  = config?.contact.telegramChatIdEnv;
            const botToken = tokenEnv ? process.env[tokenEnv] : null;
            const chatId   = chatEnv  ? process.env[chatEnv]  : null;
            if (botToken && chatId) {
                const msg = buildTelegramMessage(
                    config?.industryName ?? industryId,
                    v2Grade,
                    personal,
                    questions,
                    answers,
                    submissionId,
                    now,
                );
                await sendTelegram(botToken, chatId, msg);
            }
        } catch (tgErr) {
            console.error("[telegram] 사장 봇 send 실패:", tgErr);
        }

        // STEP_44 v2 Phase 4 — 광고주 봇 알림 (등급 A/B/C + 광고주 박힌 경우만)
        if (
            distribution.partnerId !== "AD000" &&
            distribution.partnerId !== "AD_UNKNOWN" &&
            v2Grade !== "D"
        ) {
            try {
                const partnerBot = await getBotInfo(distribution.partnerId, auth);
                if (partnerBot && partnerBot.token && partnerBot.chatId) {
                    const partnerMsg = [
                        `🆕 <b>새 DB 입수</b> (등급 ${v2Grade})`,
                        ``,
                        `<b>성함</b>: ${personal.name ?? ""}`,
                        `<b>연락처</b>: ${normalizePhone(personal.phone ?? "")}`,
                        `<b>제출 시각</b>: ${now}`,
                        ``,
                        `시트 확인: https://docs.google.com/spreadsheets/d/${distribution.partnerSheetId}`,
                        `🆔 ${submissionId}`,
                    ].join("\n");
                    await sendTelegram(partnerBot.token, partnerBot.chatId, partnerMsg);
                }
            } catch (tgErr) {
                console.error("[telegram] 광고주 봇 send 실패:", tgErr);
            }
        }

        return NextResponse.json({
            success: true,
            submissionId,
            distribution: {
                partnerId: distribution.partnerId,
                grade: v2Grade,
                copied: distribution.copied,
                reason: distribution.reason,
            },
        });
    } catch (error) {
        console.error("Landing submit error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
