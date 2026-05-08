/**
 * STEP_82 — 보광 라이브 토스트 데이터 endpoint
 *
 * - DB 5건 미만 = fake fixture 10명 즉시 회전 (사장 의도, 첫날부터 라이브 체감)
 * - DB 5건+ = 실제 데이터 최근 10 행 익명화 (자동 전환)
 * - 30초 캐싱 (Sheets API quota 보호)
 * - 익명화 = 이름 첫글자 + "*" + 마지막글자
 */

import { NextResponse } from "next/server";
import { google } from "googleapis";

let cache: { data: unknown; timestamp: number } | null = null;
const CACHE_TTL = 30 * 1000;

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

function anonymizeName(name: string): string {
    if (!name || name.length < 2) return "익명";
    if (name.length === 2) return name[0] + "*";
    return name[0] + "*" + name[name.length - 1];
}

// STEP_81 — 라이브 토스트 액션 4종 (사장 의도)
const ACTIONS = [
    "무료 상담을 신청",
    "1:1 비밀 상담을 신청",
    "접수를 완료",
    "면책 성공 여부를 확인",
];

function pickAction(seed: number): string {
    return ACTIONS[seed % ACTIONS.length];
}

// STEP_82 — fake fixture 10명 (DB 5건 미만 시 즉시 회전, 사장 의도)
const FAKE_FIXTURE = [
    { name: "김*윤", action: ACTIONS[0], elapsed: "방금" },
    { name: "이*현", action: ACTIONS[1], elapsed: "1분 전" },
    { name: "박*혁", action: ACTIONS[2], elapsed: "방금" },
    { name: "최*영", action: ACTIONS[3], elapsed: "3분 전" },
    { name: "서*우", action: ACTIONS[0], elapsed: "방금" },
    { name: "정*아", action: ACTIONS[1], elapsed: "5분 전" },
    { name: "강*호", action: ACTIONS[2], elapsed: "방금" },
    { name: "윤*진", action: ACTIONS[3], elapsed: "2분 전" },
    { name: "임*수", action: ACTIONS[0], elapsed: "방금" },
    { name: "한*경", action: ACTIONS[1], elapsed: "4분 전" },
];

export async function GET() {
    // 캐시 hit
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
        return NextResponse.json(cache.data);
    }

    const sheetId = process.env.BOGLAW_SHEET_ID;
    if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        // STEP_82 — env 미설정 = fake fixture 10명 (사용자 이탈 방지)
        const fallback = { phase: "live", recent: FAKE_FIXTURE };
        cache = { data: fallback, timestamp: Date.now() };
        return NextResponse.json(fallback);
    }

    try {
        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: buildPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });
        const sheets = google.sheets({ version: "v4", auth });

        const result = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: "DB!A2:I",
        });

        const rows = result.data.values || [];
        const totalCount = rows.length;

        let response: unknown;
        if (totalCount < 5) {
            // STEP_82 — DB 5건 미만 = fake fixture 10명 (첫날부터 라이브 체감)
            response = { phase: "live", recent: FAKE_FIXTURE };
        } else {
            // DB 5건+ = 최근 10 행 익명화 회전 (자동 전환)
            const recent = rows.slice(-10).reverse().map((row, idx) => {
                const name = (row[2] as string) || "";
                return {
                    name: anonymizeName(name),
                    action: pickAction(idx),
                    elapsed: "방금",
                };
            });
            response = { phase: "live", recent };
        }

        cache = { data: response, timestamp: Date.now() };
        return NextResponse.json(response);
    } catch (error) {
        console.error("[boglaw-live-toast] error:", error);
        // STEP_82 — 에러 시 fake fixture 10명 fallback (사용자 이탈 방지)
        const fallback = { phase: "live", recent: FAKE_FIXTURE };
        cache = { data: fallback, timestamp: Date.now() };
        return NextResponse.json(fallback);
    }
}
