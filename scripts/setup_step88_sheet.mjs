/**
 * STEP_88 Phase 2~3 — 공통 시트 셋업
 * 1. Q1:U1 헤더 박기 (광고주 / 유입 URL / 광고 매체 / 광고 캠페인 / 광고 키워드)
 * 2. Q2:Q1000 드롭다운 (보광 / 분배안함)
 * 3. 서비스 계정 권한 사전 검사
 */
import { google } from "googleapis";
import { readFileSync } from "fs";

const envText = readFileSync("/Users/maegbug/OTMarketing/ot-marketing-source/.env.local", "utf8");
const env = {};
for (const line of envText.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^"(.*)"$/s, "$1");
}
function buildKey(raw) {
    let k = raw;
    if (k.includes("\\n")) k = k.replace(/\\n/g, "\n");
    if (k.startsWith('"') && k.endsWith('"')) k = k.slice(1, -1);
    return k;
}

const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: buildKey(env.GOOGLE_PRIVATE_KEY),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

const COMMON_SHEET = "1THuTtpdZiRB0yI7jxWal5RU-SOHifDUYIGOXbP-g2AY";
const BOGLAW_SHEET = "1xX7qJX56Nj0zrFfAAA-i69oEyaQlvhnIxXRgDQm1Mjc";

console.log("=== STEP_88 Phase 2~3 — 공통 시트 셋업 ===\n");

// ===== 권한 사전 검사 =====
console.log("[Pre-check] 서비스 계정 편집자 권한");
let commonTitle, commonTabId, boglawTitle;

try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId: COMMON_SHEET });
    commonTitle = meta.data.properties?.title;
    commonTabId = meta.data.sheets?.[0]?.properties?.sheetId ?? 0;
    console.log(`✅ 공통 시트 read OK: "${commonTitle}" (gid ${commonTabId})`);
} catch (e) {
    console.error(`❌ 공통 시트 read 실패: ${e.message}`);
    console.error("⚠ 사장 손 박기: 시트 공유 → 서비스 계정에 편집자 권한");
    console.error(`   서비스 계정: ${env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
    process.exit(1);
}

try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId: BOGLAW_SHEET });
    boglawTitle = meta.data.properties?.title;
    console.log(`✅ 보광 시트 read OK: "${boglawTitle}"`);
} catch (e) {
    console.warn(`⚠ 보광 시트 read 실패: ${e.message}`);
    console.warn("   Apps Script 분배 = 사장 손 박기 (보광 시트 공유 X)");
}

// ===== Phase 2: Q~U 헤더 =====
console.log("\n[Phase 2] Q1:U1 헤더 박기");
const headers = [["광고주", "유입 URL", "광고 매체", "광고 캠페인", "광고 키워드"]];

await sheets.spreadsheets.values.update({
    spreadsheetId: COMMON_SHEET,
    range: "Q1:U1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: headers },
});

const verifyHeaders = await sheets.spreadsheets.values.get({
    spreadsheetId: COMMON_SHEET,
    range: "Q1:U1",
});
console.log(`✅ Q1:U1 박힘 = ${JSON.stringify(verifyHeaders.data.values?.[0])}`);

// 헤더 서식 (다크 네이비 + 흰 + Bold)
await sheets.spreadsheets.batchUpdate({
    spreadsheetId: COMMON_SHEET,
    requestBody: {
        requests: [
            {
                repeatCell: {
                    range: {
                        sheetId: commonTabId,
                        startRowIndex: 0,
                        endRowIndex: 1,
                        startColumnIndex: 16,
                        endColumnIndex: 21,
                    },
                    cell: {
                        userEnteredFormat: {
                            backgroundColor: { red: 0.12, green: 0.16, blue: 0.22 },
                            textFormat: {
                                foregroundColor: { red: 1, green: 1, blue: 1 },
                                bold: true,
                                fontSize: 11,
                            },
                            horizontalAlignment: "CENTER",
                            verticalAlignment: "MIDDLE",
                        },
                    },
                    fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)",
                },
            },
        ],
    },
});
console.log("✅ Q~U 헤더 서식 박힘");

// ===== Phase 3: Q열 드롭다운 =====
console.log("\n[Phase 3] Q2:Q1000 드롭다운 박기");
await sheets.spreadsheets.batchUpdate({
    spreadsheetId: COMMON_SHEET,
    requestBody: {
        requests: [
            {
                setDataValidation: {
                    range: {
                        sheetId: commonTabId,
                        startRowIndex: 1,
                        endRowIndex: 1000,
                        startColumnIndex: 16,
                        endColumnIndex: 17,
                    },
                    rule: {
                        condition: {
                            type: "ONE_OF_LIST",
                            values: [
                                { userEnteredValue: "보광" },
                                { userEnteredValue: "분배안함" },
                            ],
                        },
                        showCustomUi: true,
                        strict: false,
                    },
                },
            },
        ],
    },
});
console.log("✅ Q2:Q1000 드롭다운 박힘 (보광 / 분배안함 / 빈칸 허용)");

console.log("\n=== Phase 2~3 완료 ===");
console.log(`시트 URL: https://docs.google.com/spreadsheets/d/${COMMON_SHEET}/edit#gid=${commonTabId}`);
