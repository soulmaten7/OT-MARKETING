import { google } from "googleapis";
import { readFileSync } from "fs";

const envText = readFileSync("/Users/maegbug/OTMarketing/ot-marketing-source/.env.local", "utf8");
const env = {};
for (const line of envText.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^"(.*)"$/s, "$1");
}

function buildKey(raw) {
    let key = raw;
    if (key.includes("\\n")) key = key.replace(/\\n/g, "\n");
    if (key.startsWith('"') && key.endsWith('"')) key = key.slice(1, -1);
    return key;
}

const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: buildKey(env.GOOGLE_PRIVATE_KEY),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

// Fetch 1p0K
const SHEET_NEW = "1p0KOLGz1AVBHvDUMBh8BY6Ylj_iw64RZv0BnDYlTwoM";
console.log("=== 1p0K (OT_광고_통합_운영) 시트 정보 ===");
try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_NEW });
    console.log("제목:", meta.data.properties?.title);
    console.log("탭 목록:");
    for (const s of meta.data.sheets) {
        console.log(`  - "${s.properties.title}" (gid ${s.properties.sheetId}, ${s.properties.gridProperties?.rowCount} 행 × ${s.properties.gridProperties?.columnCount} 열)`);
    }
    
    const targetTab = meta.data.sheets.find(s => s.properties.sheetId === 781999053);
    if (targetTab) {
        console.log(`\n=== 타겟 탭 "${targetTab.properties.title}" 첫 5행 fetch ===`);
        const fetched = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_NEW,
            range: `${targetTab.properties.title}!A1:AZ5`,
        });
        const rows = fetched.data.values || [];
        console.log(`현재 행 수: ${rows.length}`);
        for (let i = 0; i < Math.min(rows.length, 5); i++) {
            console.log(`R${i+1}:`, JSON.stringify(rows[i]).slice(0, 300));
        }
    } else {
        console.log("\n⚠ gid=781999053 탭 못 찾음");
    }
} catch(e) {
    console.error("ERROR:", e.message);
}

console.log("\n=== 1r35 (OT_광고카피_자동화) v3_PAS_Boglaw 탭 archive 대비 fetch ===");
try {
    const SHEET_OLD = "1r35RKS1c04PX_8fG5-HbyMmUhj0FHIMNJaU1wcfuYXY";
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_OLD });
    const oldTab = meta.data.sheets.find(s => s.properties.title === "v3_PAS_Boglaw");
    if (oldTab) {
        console.log(`옛 탭 박힘: "${oldTab.properties.title}" (gid ${oldTab.properties.sheetId})`);
    }
} catch(e) {
    console.error("ERROR:", e.message);
}
