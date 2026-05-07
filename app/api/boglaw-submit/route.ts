/**
 * STEP_70 — 법률사무소 보광 (AD001) 전용 시트 입력 endpoint
 *
 * BoglawLandingTemplate (4 단계 progressive form) → POST /api/boglaw-submit
 *
 * 시트 = process.env.BOGLAW_SHEET_ID (1xX7qJX56qJX56Nj0zrFfAAA-i69oEyaQlvhnIxXRgDQm1Mjc)
 * 16 컬럼 형식 9 컬럼 입력 (J~P = 광고주 측 입력 = 빈 칸)
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { google } from "googleapis";

const submitSchema = z.object({
    advertiserId: z.string(),
    slug: z.string(),
    name: z.string().min(2),
    phone: z.string().min(10),
    debt_amount: z.string(),
    job_type: z.string(),
    user_story: z.string().optional().default(""),
    landingUrl: z.string().optional().default(""),
    utmSource: z.string().optional().default("기타"),
    consentPrivacy: z.boolean(),
    consentMarketing: z.boolean().optional().default(false),
});

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

function classifySource(utmSource: string, landingUrl: string): string {
    const s = (utmSource || "").toLowerCase();
    if (s.includes("google") || s.includes("gads")) return "구글";
    if (s.includes("meta") || s.includes("facebook") || s.includes("fb") || s.includes("instagram") || s.includes("ig")) return "메타";
    if (s.includes("naver")) return "네이버";
    if (s.includes("kakao")) return "카카오";
    if (s.includes("toss")) return "토스";
    if (s.includes("sns")) return "SNS";
    return utmSource || "기타";
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = submitSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid data", details: parsed.error.issues }, { status: 400 });
        }
        const data = parsed.data;
        if (!data.consentPrivacy) {
            return NextResponse.json({ error: "필수 동의가 필요합니다." }, { status: 400 });
        }

        // 동의 미체크 시 시트 입력 X (개인정보보호법)
        const sheetId = process.env.BOGLAW_SHEET_ID;
        if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.log(`[boglaw-submit] env 미설정 — logged-only. name=${data.name}`);
            return NextResponse.json({ success: true, deliveryNote: "logged-only" });
        }

        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: buildPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        const sheets = google.sheets({ version: "v4", auth });

        const ip = (request.headers.get("x-forwarded-for")?.split(",")[0] || "").trim();
        const nowSeoul = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }).replace("T", " ");
        const submissionId = `BL-${Date.now()}`;
        const platform = classifySource(data.utmSource, data.landingUrl);

        // 16 컬럼 형식 — 9 컬럼 입력 (A~I), J~P 빈 칸 (광고주 입력)
        const row = [
            submissionId,           // A 신청ID
            nowSeoul,               // B 신청일시
            data.name,              // C 이름
            data.phone,             // D 연락처
            data.debt_amount,       // E 채무액
            data.job_type,          // F 직업
            data.user_story,        // G 문의사항
            ip,                     // H IP
            platform,               // I 플랫폼
            "",                     // J 메모 (광고주)
            "",                     // K 수임 여부
            "",                     // L 수임료
            "",                     // M 수당
            "",                     // N 1차콜 결과
            "",                     // O 비고
            data.consentMarketing ? "Y" : "N",  // P 마케팅동의
        ];

        // 시트의 첫 탭에 append
        // BOGLAW 시트의 탭 이름을 모르므로 sheetId 만 지정 + 첫 탭 사용
        const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
        const firstSheetTitle = meta.data.sheets?.[0]?.properties?.title || "Sheet1";

        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${firstSheetTitle}!A:P`,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [row],
            },
        });

        // 사장 본인 모니터링 (텔레그램 봇 — TELEGRAM_BOT_TOKEN_DEBT_RELIEF 재사용)
        try {
            const tgToken = process.env.TELEGRAM_BOT_TOKEN_DEBT_RELIEF;
            const tgChat = process.env.TELEGRAM_CHAT_ID_DEBT_RELIEF;
            if (tgToken && tgChat) {
                const text = [
                    `🆕 <b>보광 (AD001) 새 DB</b>`,
                    ``,
                    `<b>성함</b>: ${data.name}`,
                    `<b>연락처</b>: ${data.phone}`,
                    `<b>채무액</b>: ${data.debt_amount}`,
                    `<b>직업</b>: ${data.job_type}`,
                    `<b>문의사항</b>: ${data.user_story || "(없음)"}`,
                    `<b>플랫폼</b>: ${platform}`,
                    `<b>제출 시각</b>: ${nowSeoul}`,
                    ``,
                    `🆔 ${submissionId}`,
                ].join("\n");
                await fetch(`https://api.telegram.org/bot${tgToken.trim()}/sendMessage`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: tgChat.trim(),
                        text,
                        parse_mode: "HTML",
                    }),
                });
            }
        } catch (tgErr) {
            console.error("[boglaw-submit] 텔레그램 send 실패:", tgErr);
        }

        return NextResponse.json({ success: true, submissionId });
    } catch (error) {
        console.error("[boglaw-submit] error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
