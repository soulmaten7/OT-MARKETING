/**
 * STEP_88 Phase 4 — Apps Script 코드 박기 시도
 * - service account 박기 권한 = Domain-wide delegation 박힘 X 시 = 실패 가능
 * - 실패 시 = Apps Script 코드 + 박는 매뉴얼 보고서에 박힘
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

const COMMON_SHEET = "1THuTtpdZiRB0yI7jxWal5RU-SOHifDUYIGOXbP-g2AY";
const BOGLAW_SHEET = "1xX7qJX56Nj0zrFfAAA-i69oEyaQlvhnIxXRgDQm1Mjc";

const APPS_SCRIPT_CODE = `const COMMON_SHEET_ID = '${COMMON_SHEET}';
const ADVERTISER_SHEETS = {
  '보광': '${BOGLAW_SHEET}',
};

function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  const col = range.getColumn();
  const row = range.getRow();

  if (col !== 17) return;  // Q열만
  if (row === 1) return;   // 헤더 무시

  const newValue = range.getValue();
  if (!ADVERTISER_SHEETS[newValue]) return;

  // 21열 데이터 가져오기
  const rowData = sheet.getRange(row, 1, 1, 21).getValues()[0];

  // 광고주 시트로 복사
  const targetSheetId = ADVERTISER_SHEETS[newValue];
  const targetSheet = SpreadsheetApp.openById(targetSheetId).getSheets()[0];
  targetSheet.appendRow(rowData);

  // V열에 분배 완료 표시
  sheet.getRange(row, 22).setValue('✓ 분배완료 ' + new Date().toLocaleString('ko-KR'));
}
`;

const APPS_SCRIPT_MANIFEST = JSON.stringify({
    timeZone: "Asia/Seoul",
    exceptionLogging: "STACKDRIVER",
    runtimeVersion: "V8",
});

console.log("=== STEP_88 Phase 4 — Apps Script 코드 박기 시도 ===\n");

// scope 확장 박기
const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: buildKey(env.GOOGLE_PRIVATE_KEY),
    scopes: [
        "https://www.googleapis.com/auth/script.projects",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ],
});

try {
    const script = google.script({ version: "v1", auth });

    // Apps Script 프로젝트 생성 (공통 시트에 바인딩)
    const project = await script.projects.create({
        requestBody: {
            title: "STEP_88 보광 분배 자동화",
            parentId: COMMON_SHEET,
        },
    });

    const scriptId = project.data.scriptId;
    console.log(`✅ Apps Script 프로젝트 박힘: ${scriptId}`);

    // 코드 업로드
    await script.projects.updateContent({
        scriptId,
        requestBody: {
            files: [
                { name: "Code", type: "SERVER_JS", source: APPS_SCRIPT_CODE },
                { name: "appsscript", type: "JSON", source: APPS_SCRIPT_MANIFEST },
            ],
        },
    });

    console.log(`✅ Apps Script 코드 박힘`);
    console.log(`\nApps Script URL: https://script.google.com/d/${scriptId}/edit`);
    console.log(`\n⚠ 사장 1번 박을 단계 (Apps Script OAuth 승인):`);
    console.log(`  1. 위 URL 열기`);
    console.log(`  2. 좌측 시계 아이콘 (트리거)`);
    console.log(`  3. 트리거 추가 → 함수 onEdit / 이벤트 spreadsheet → "편집할 때"`);
    console.log(`  4. Google 권한 승인 (한 번만 박기)`);
    process.exit(0);
} catch (e) {
    console.error(`❌ Apps Script API 실패: ${e.message}`);
    if (e.code === 403 || e.message?.includes("403") || e.message?.includes("permission")) {
        console.error("\n⚠ 일반 service account = Apps Script CRUD 권한 X 박힘");
        console.error("   해결책 옵션:");
        console.error("   A. Domain-wide delegation 박기 (Google Workspace 박힘)");
        console.error("   B. 사장 손 박기 (보고서 §사장 다음 액션 박힘)");
    }
    console.log("\n=== Apps Script 코드 (사장 손 박기 박힘) ===");
    console.log(APPS_SCRIPT_CODE);
    process.exit(1);
}
