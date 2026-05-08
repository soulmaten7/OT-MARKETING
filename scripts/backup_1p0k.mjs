import { google } from "googleapis";
import { readFileSync, writeFileSync } from "fs";

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
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const sheets = google.sheets({ version: "v4", auth });
const SHEET = "1p0KOLGz1AVBHvDUMBh8BY6Ylj_iw64RZv0BnDYlTwoM";
const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET });
const backup = { fetchedAt: new Date().toISOString(), title: meta.data.properties?.title, tabs: [] };
for (const s of meta.data.sheets) {
    const title = s.properties.title;
    const data = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET, range: `${title}!A1:Z1000` });
    backup.tabs.push({ title, sheetId: s.properties.sheetId, rows: data.data.values || [] });
}
writeFileSync(process.argv[2], JSON.stringify(backup, null, 2));
console.log(`✅ 백업: ${process.argv[2]} (${backup.tabs.length} 탭)`);
