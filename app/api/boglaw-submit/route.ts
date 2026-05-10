/**
 * STEP_70 — 법률사무소 보광 (AD001) 전용 시트 입력 endpoint
 * STEP_87 — 공통 시트 (DB 분배 인프라) 추가 박힘 + R~U 컬럼 (UTM 추적)
 *
 * BoglawLandingTemplate (4 단계 progressive form) → POST /api/boglaw-submit
 *
 * 시트 박힘 (이중):
 *   1. 보광 시트 (BOGLAW_SHEET_ID = 1xX7qJX56Nj0zrFfAAA-i69oEyaQlvhnIxXRgDQm1Mjc)
 *      - 16 컬럼 (A~P) — 광고주 직접 보는 곳, 옛 형식 보존
 *   2. 공통 시트 (COMMON_SHEET_ID = 1THuTtpdZiRB0yI7jxWal5RU-SOHifDUYIGOXbP-g2AY)
 *      - 21 컬럼 (A~U) — OT 측 통합 분석 + Apps Script 자동 분배
 *      - Q = 광고주 (자동 = "보광") / R = 유입 URL / S = 매체 / T = 캠페인 / U = 키워드
 *
 * Apps Script (사장 손 박기) = 공통 시트 Q열 변경 → 광고주 시트 자동 복사
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
    consentCaseUse: z.boolean().optional().default(false),  // STEP_71 — 상담 사례 익명 활용 동의 (선택)
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

        // 16 컬럼 형식 — OT 측 입력 = A~I 9 컬럼만. J~P 7 컬럼 = 광고주 입력란 (수임료·수당·메모1~5) = 빈 칸 박힘.
        // 마케팅 동의 = 시트 입력 X (광고주 입력란 보호) → 텔레그램 알림에만 박힘 (사장 모니터링)
        const row = [
            submissionId,           // A 번호
            nowSeoul,               // B 날짜
            data.name,              // C 이름
            data.phone,             // D 연락처
            data.debt_amount,       // E 채무액
            data.job_type,          // F 직업
            data.user_story,        // G 문의사항
            ip,                     // H IP
            platform,               // I 플랫폼
            "",                     // J 수임료 (광고주 입력)
            "",                     // K 수당 (광고주 입력)
            "",                     // L 메모1 (광고주 입력)
            "",                     // M 메모2 (광고주 입력)
            "",                     // N 메모3 (광고주 입력)
            "",                     // O 메모4 (광고주 입력)
            "",                     // P 메모5 (광고주 입력)
        ];

        // 시트의 첫 탭에 append
        // BOGLAW 시트의 탭 이름을 모르므로 sheetId 만 지정 + 첫 탭 사용
        const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
        const firstSheetTitle = meta.data.sheets?.[0]?.properties?.title || "Sheet1";

        // OVERWRITE 모드 = 미리 박힌 흰 배경 보존 (INSERT_ROWS = 헤더 노란 형식 상속 버그 fix)
        const appendRes = await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${firstSheetTitle}!A:P`,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "OVERWRITE",
            requestBody: {
                values: [row],
            },
        });

        // append 후 = 그 행 명시적 흰 배경 + 검정 글자 박기 (defense in depth, 만약 흰 미리 박힌 형식이 무효화되더라도 보장)
        try {
            const updatedRange = appendRes.data.updates?.updatedRange || "";
            // updatedRange = "DB!A2:P2" 형식 → row number 추출
            const rowMatch = updatedRange.match(/A(\d+):/);
            const rowNum = rowMatch ? parseInt(rowMatch[1], 10) : 0;
            if (rowNum >= 2) {
                const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
                const dbSheetId = sheetMeta.data.sheets?.find(
                    (s) => s.properties?.title === firstSheetTitle
                )?.properties?.sheetId ?? 0;

                const formatRequests = [];
                // 좌측 wrap (G·L·M·N·O·P)
                for (const colIdx of [6, 11, 12, 13, 14, 15]) {
                    formatRequests.push({
                        repeatCell: {
                            range: { sheetId: dbSheetId, startRowIndex: rowNum - 1, endRowIndex: rowNum, startColumnIndex: colIdx, endColumnIndex: colIdx + 1 },
                            cell: { userEnteredFormat: {
                                backgroundColor: { red: 1, green: 1, blue: 1 },
                                horizontalAlignment: "LEFT",
                                verticalAlignment: "MIDDLE",
                                wrapStrategy: "WRAP",
                                textFormat: { fontSize: 10, bold: false, foregroundColor: { red: 0, green: 0, blue: 0 } },
                            }},
                            fields: "userEnteredFormat(backgroundColor,horizontalAlignment,verticalAlignment,wrapStrategy,textFormat)",
                        }
                    });
                }
                // 가운데 (나머지)
                for (const colIdx of [0, 1, 2, 3, 4, 5, 7, 8, 9, 10]) {
                    formatRequests.push({
                        repeatCell: {
                            range: { sheetId: dbSheetId, startRowIndex: rowNum - 1, endRowIndex: rowNum, startColumnIndex: colIdx, endColumnIndex: colIdx + 1 },
                            cell: { userEnteredFormat: {
                                backgroundColor: { red: 1, green: 1, blue: 1 },
                                horizontalAlignment: "CENTER",
                                verticalAlignment: "MIDDLE",
                                wrapStrategy: "WRAP",
                                textFormat: { fontSize: 10, bold: false, foregroundColor: { red: 0, green: 0, blue: 0 } },
                            }},
                            fields: "userEnteredFormat(backgroundColor,horizontalAlignment,verticalAlignment,wrapStrategy,textFormat)",
                        }
                    });
                }
                await sheets.spreadsheets.batchUpdate({
                    spreadsheetId: sheetId,
                    requestBody: { requests: formatRequests },
                });
            }
        } catch (fmtErr) {
            console.error("[boglaw-submit] 형식 박기 실패 (alarm 보다 데이터 우선):", fmtErr);
        }

        // STEP_87 — 공통 시트 박기 (DB 분배 인프라, 21 컬럼)
        try {
            const commonSheetId = process.env.COMMON_SHEET_ID;
            if (commonSheetId) {
                // 유입 URL parse (UTM 추출)
                let pathname = "/select11";
                let utmSource = "";
                let utmMedium = "";
                let utmCampaign = "";
                let utmTerm = "";
                try {
                    if (data.landingUrl) {
                        const lu = new URL(data.landingUrl);
                        pathname = lu.pathname || "/select11";
                        utmSource = lu.searchParams.get("utm_source") || "";
                        utmMedium = lu.searchParams.get("utm_medium") || "";
                        utmCampaign = lu.searchParams.get("utm_campaign") || "";
                        utmTerm = lu.searchParams.get("utm_term") || "";
                    }
                } catch {
                    // landingUrl parse 실패 시 = slug 박힘
                    pathname = `/${data.slug}`;
                }

                // Q열 자동 = /select11 (광고 사용자) = "보광" / /select1 (직접 트래픽) = 빈칸
                const advertiser = pathname === "/select11" ? "보광" : "";

                // 21 컬럼 (A~U)
                const commonRow = [
                    submissionId,                       // A 번호
                    nowSeoul,                           // B 날짜
                    data.name,                          // C 이름
                    data.phone,                         // D 연락처
                    data.debt_amount,                   // E 채무액
                    data.job_type,                      // F 직업
                    data.user_story,                    // G 문의사항
                    ip,                                 // H IP
                    platform,                           // I 플랫폼
                    "",                                 // J 수임료
                    "",                                 // K 수당
                    "",                                 // L 메모1
                    "",                                 // M 메모2
                    "",                                 // N 메모3
                    "",                                 // O 메모4
                    "",                                 // P 메모5
                    advertiser,                         // Q 광고주 (자동)
                    pathname,                           // R 유입 URL
                    utmSource || "direct",              // S 광고 매체
                    utmCampaign,                        // T 광고 캠페인
                    utmTerm,                            // U 광고 키워드
                ];

                const commonMeta = await sheets.spreadsheets.get({ spreadsheetId: commonSheetId });
                const commonFirstTab = commonMeta.data.sheets?.[0]?.properties?.title || "Sheet1";

                await sheets.spreadsheets.values.append({
                    spreadsheetId: commonSheetId,
                    range: `${commonFirstTab}!A:U`,
                    valueInputOption: "USER_ENTERED",
                    insertDataOption: "INSERT_ROWS",
                    requestBody: { values: [commonRow] },
                });
            } else {
                console.log(`[boglaw-submit] COMMON_SHEET_ID 미설정 — 공통 시트 박기 skip. ${submissionId}`);
            }
        } catch (commonErr) {
            console.error("[boglaw-submit] 공통 시트 박기 실패 (보광 시트 박힘 보장 우선):", commonErr);
        }

        // 사장 본인 모니터링 (보광 전용 텔레그램 봇 BoGwang_bot, 5/7 발급)
        try {
            const tgToken = process.env.TELEGRAM_BOT_TOKEN_BOGWANG;
            const tgChat = process.env.TELEGRAM_CHAT_ID_BOGWANG;
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
                    `<b>마케팅 동의</b>: ${data.consentMarketing ? "Y" : "N"}`,
                    `<b>사례 활용 동의</b>: ${data.consentCaseUse ? "Y" : "N"}`,
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
