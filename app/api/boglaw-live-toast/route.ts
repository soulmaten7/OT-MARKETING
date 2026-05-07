/**
 * STEP_71 — 보광 라이브 토스트 데이터 endpoint (하이브리드)
 *
 * - DB 탭 데이터 5건 미만 = { phase: "counter", total: N }
 * - DB 탭 데이터 5건+ = { phase: "live", recent: [{name·action·elapsed}, ...] }
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

const ACTIONS = [
    "무료 자가진단을 신청",
    "1:1 비밀 상담을 신청",
    "면책 가능액을 확인",
];

function pickAction(seed: number): string {
    return ACTIONS[seed % ACTIONS.length];
}

export async function GET() {
    // 캐시 hit
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
        return NextResponse.json(cache.data);
    }

    const sheetId = process.env.BOGLAW_SHEET_ID;
    if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        // env 미설정 = 카운터 0 (안전 fallback)
        const fallback = { phase: "counter", total: 0 };
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
            response = { phase: "counter", total: totalCount };
        } else {
            // 최근 10 행 익명화 → 회전 데이터
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
        // 에러 시 안전 fallback (사용자 이탈 방지)
        const fallback = { phase: "counter", total: 0 };
        cache = { data: fallback, timestamp: Date.now() };
        return NextResponse.json(fallback);
    }
}
