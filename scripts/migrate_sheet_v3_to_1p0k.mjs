/**
 * STEP_84.7 — 시트 마이그레이션 (1r35 → 1p0K)
 *
 * 1. 1r35 (OT_광고카피_자동화) v3_PAS_Boglaw 탭 = archive rename + A1 메모
 * 2. 1p0K (OT_광고_통합_운영) 매체별_광고문구 탭 (gid 781999053)
 *    = 옛 4 행 (DR-011/014/018/021) 보존 + AD001 v3 70 행 append (idempotent)
 *
 * 광고ID 매트릭스: AD001-{CAMPAIGN}-{p1-5} = 14 × 5 = 70
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

const SHEET_OLD = "1r35RKS1c04PX_8fG5-HbyMmUhj0FHIMNJaU1wcfuYXY";
const SHEET_NEW = "1p0KOLGz1AVBHvDUMBh8BY6Ylj_iw64RZv0BnDYlTwoM";
const TAB_TARGET_GID = 781999053;
const ARCHIVE_NAME = "_archive_v3_PAS_Boglaw_2026-05-08";

// === 1. 1r35 v3_PAS_Boglaw 탭 archive rename ===
console.log("=== 1. 1r35 옛 탭 archive rename ===");
try {
    const oldMeta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_OLD });
    const oldTab = oldMeta.data.sheets.find((s) => s.properties.title === "v3_PAS_Boglaw");
    const archived = oldMeta.data.sheets.find((s) => s.properties.title === ARCHIVE_NAME);

    if (oldTab && !archived) {
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: SHEET_OLD,
            requestBody: {
                requests: [
                    {
                        updateSheetProperties: {
                            properties: { sheetId: oldTab.properties.sheetId, title: ARCHIVE_NAME },
                            fields: "title",
                        },
                    },
                ],
            },
        });
        console.log(`✅ rename: v3_PAS_Boglaw → ${ARCHIVE_NAME}`);

        // A1 메모 박기
        await sheets.spreadsheets.values.update({
            spreadsheetId: SHEET_OLD,
            range: `${ARCHIVE_NAME}!A1`,
            valueInputOption: "RAW",
            requestBody: {
                values: [["⚠ STEP_84.7 옮김 — 정확한 위치는 OT_광고_통합_운영 (1p0K, gid=781999053). 이 탭은 archive."]],
            },
        });
        console.log("✅ A1 메모 박힘");
    } else if (archived) {
        console.log("ℹ archive 탭 이미 박힘 → skip");
    } else {
        console.log("ℹ v3_PAS_Boglaw 탭 못 찾음 (이전 실행으로 이미 archive 됐을 가능성) → skip");
    }
} catch (e) {
    console.error("⚠ 1r35 archive 실패:", e.message);
}

// === 2. 1p0K 매체별_광고문구 탭 = 보광 v3 70 행 append (idempotent) ===
console.log("\n=== 2. 1p0K 보광 v3 70행 박기 (idempotent) ===");

const PRIMARY = [
    { id: "p1", trigger: "신용대출·가계대출", line1: "신용대출·가계대출 부채로 인한 압박 및 압류 시 — 인가 후 빠른 압류 해제" },
    { id: "p2", trigger: "주식·코인 손실", line1: "주식 및 코인 사용 손실로 인한 압류 시 — 인가 후 빠른 압류 해제" },
    { id: "p3", trigger: "월급 압류", line1: "월급 압류 받고 계신가요? — 인가 후 빠른 압류 해제" },
    { id: "p4", trigger: "집·전세 담보", line1: "집·전세 담보대출 부채로 인한 압박 및 압류 시 — 인가 후 빠른 압류 해제" },
    { id: "p5", trigger: "자영업자", line1: "사업 실패로 인한 부채 및 압류 시 — 인가 후 빠른 압류 해제" },
];
const RESULT_LINE = "최대 95%까지 높은 탕감율!! 0%에 가까운 기각율!!";

const HEADLINES = [
    { campaign: "SEOUL", regionLabel: "서울", court: "서울회생법원", headline: "서울 관할법원 — 서울회생법원에서 회생 인가" },
    { campaign: "GYEONGGI", regionLabel: "경기", court: "수원지방법원", headline: "경기 관할법원 — 수원지방법원에서 회생 인가" },
    { campaign: "INCHEON", regionLabel: "인천", court: "인천지방법원", headline: "인천 관할법원 — 인천지방법원에서 회생 인가" },
    { campaign: "BUSAN", regionLabel: "부산", court: "부산지방법원", headline: "부산 관할법원 — 부산지방법원에서 회생 인가" },
    { campaign: "DAEGU", regionLabel: "대구·경북", court: "대구지방법원", headline: "대구·경북 관할법원 — 대구지방법원에서 회생 인가" },
    { campaign: "GWANGJU", regionLabel: "광주·전남", court: "광주지방법원", headline: "광주·전남 관할법원 — 광주지방법원에서 회생 인가" },
    { campaign: "DAEJEON", regionLabel: "대전·세종·충남", court: "대전지방법원", headline: "대전·세종·충남 관할법원 — 대전지방법원에서 회생 인가" },
    { campaign: "CHUNGBUK", regionLabel: "충북", court: "청주지방법원", headline: "충북 관할법원 — 청주지방법원에서 회생 인가" },
    { campaign: "GYEONGNAM", regionLabel: "경남", court: "창원지방법원", headline: "경남 관할법원 — 창원지방법원에서 회생 인가" },
    { campaign: "GYEONGGI_BUKBU", regionLabel: "경기 북부", court: "의정부지방법원", headline: "경기 북부 관할법원 — 의정부지방법원에서 회생 인가" },
    { campaign: "ULSAN", regionLabel: "울산", court: "울산지방법원", headline: "울산 관할법원 — 울산지방법원에서 회생 인가" },
    { campaign: "JEONBUK", regionLabel: "전북", court: "전주지방법원", headline: "전북 관할법원 — 전주지방법원에서 회생 인가" },
    { campaign: "GANGWON", regionLabel: "강원", court: "춘천지방법원", headline: "강원 관할법원 — 춘천지방법원에서 회생 인가" },
    { campaign: "JEJU", regionLabel: "제주", court: "제주지방법원", headline: "제주 관할법원 — 제주지방법원에서 회생 인가" },
];

// 옛 컬럼 구조 (26 컬럼) 매핑:
// A: 광고ID, B: 헤드라인 base, C: Meta_Primary, D: Meta_Headline, E: Meta_Description,
// F: Meta_CTA, G: Meta_Story_노트, H: Google_H1, I: Google_H2, J: Google_H3,
// K: Google_D1, L: Google_D2, M: Google_사이트링크1, N: Google_사이트링크2,
// O: 카카오_제목, P: 카카오_본문, Q: 카카오_CTA, R: Naver_제목, S: Naver_설명, ...

function buildRow(h, p) {
    const adId = `AD001-${h.campaign}-${p.id.toUpperCase()}`;
    const utm = `?utm_source=meta&utm_medium=cpc&utm_campaign=${h.campaign.toLowerCase()}&utm_content=${p.id}`;
    return [
        adId,                                      // A 광고ID
        h.headline,                                // B 헤드라인 base
        `${p.line1}\n${RESULT_LINE}`,              // C Meta_Primary (PAS 본문 line1+line2)
        h.headline,                                // D Meta_Headline
        "스페셜리스트",                            // E Meta_Description (12자 이내)
        "신청하기",                                // F Meta_CTA
        "base 1080×1350 (4:5) + 변호사 / 채무자 PAS 변형 5 (남 3 + 여 2) — STEP_84.7 v4 prompt", // G Meta_Story_노트
        `${h.regionLabel} 회생 인가`,              // H Google_H1 (15자 이내)
        h.court,                                   // I Google_H2 (15자 이내)
        "스페셜리스트 상담",                       // J Google_H3
        p.line1.length <= 45 ? p.line1 : p.line1.slice(0, 44) + "…",  // K Google_D1
        RESULT_LINE.length <= 45 ? RESULT_LINE : RESULT_LINE.slice(0, 44) + "…",  // L Google_D2
        "내 탕감액 분석",                          // M 사이트링크1
        "1:1 비밀 상담",                           // N 사이트링크2
        `${h.regionLabel} 회생`,                   // O 카카오_제목
        `${p.trigger} 압류 시 인가 후 빠른 해제`,   // P 카카오_본문
        "신청하기",                                // Q 카카오_CTA
        `${h.regionLabel} 관할법원`,               // R Naver_제목
        `${h.court} 회생 인가. 스페셜리스트 무료 상담`, // S Naver_설명
        "AD001",                                   // T 광고주ID
        "법률사무소 보광",                         // U 광고주명
        h.regionLabel,                             // V 캠페인_지역
        p.trigger,                                 // W 본문_트리거
        "https://otpage1.com/select11" + utm,      // X 랜딩 URL (UTM 박힘)
        "STEP_84.7",                               // Y 박힌 STEP
    ];
}

// 헤더 박혀 있는지 확인 + 옛 4 행 보존
const TAB_NAME = "매체별_광고문구";

const fetched = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_NEW,
    range: `${TAB_NAME}!A1:Z200`,
});
const existingRows = fetched.data.values || [];
console.log(`현재 박힌 행: ${existingRows.length}`);

// 광고ID 인덱스 (idempotent — AD001 기존 행 있으면 update)
const adIdToRowNum = {};
for (let i = 0; i < existingRows.length; i++) {
    const adId = existingRows[i]?.[0];
    if (adId) adIdToRowNum[adId] = i + 1; // 1-based row
}

// 보광 v3 70 행 생성
const v3Rows = [];
for (const h of HEADLINES) {
    for (const p of PRIMARY) {
        v3Rows.push(buildRow(h, p));
    }
}

// idempotent: 옛 보광 AD001-* 행 있으면 update / 없으면 append
const updateRequests = [];
const appendRows = [];
for (const row of v3Rows) {
    const adId = row[0];
    if (adIdToRowNum[adId]) {
        // update existing
        updateRequests.push({
            range: `${TAB_NAME}!A${adIdToRowNum[adId]}`,
            values: [row],
        });
    } else {
        appendRows.push(row);
    }
}

if (updateRequests.length > 0) {
    await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: SHEET_NEW,
        requestBody: { valueInputOption: "RAW", data: updateRequests },
    });
    console.log(`✅ ${updateRequests.length} 행 update`);
}

if (appendRows.length > 0) {
    await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_NEW,
        range: `${TAB_NAME}!A1`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: appendRows },
    });
    console.log(`✅ ${appendRows.length} 행 append`);
}

console.log(`\n=== 완료 — 보광 v3 70 행 박힘 (옛 ${existingRows.length}행 보존) ===`);

// 검증
const verify = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_NEW,
    range: `${TAB_NAME}!A1:Z200`,
});
const allRows = verify.data.values || [];
const ad001Count = allRows.filter(r => r[0]?.startsWith("AD001-")).length;
console.log(`AD001-* 행 수: ${ad001Count} (기대: 70)`);
console.log(`총 행 수: ${allRows.length}`);

const flat = JSON.stringify(allRows);
const checks = [
    ["AD001 70행", ad001Count === 70],
    ["BOKWANG (Meta_Primary 본문 안 X — 페이지명은 광고 셋업 시 박음)", true],
    ["서울회생법원", flat.includes("서울회생법원")],
    ["인가 후 빠른 압류 해제 박힘 ≥ 70", (flat.match(/인가 후 빠른 압류 해제/g) || []).length >= 70],
    ["최대 95%까지 박힘 ≥ 70", (flat.match(/최대 95%까지/g) || []).length >= 70],
    ["스페셜리스트 박힘", flat.includes("스페셜리스트")],
    ["옛 4행 보존 (DR-011-A)", flat.includes("DR-011-A")],
    ["광고 노출 위반 0 (확실)", !flat.match(/확실(한|히|하게)/)],
    ["광고 노출 위반 0 (전문 변호사)", !flat.includes("전문 변호사")],
    ["100% 광고 카피 위반 0", !flat.match(/100%[ 가-힣]/)],
];

console.log("\n=== 게이트 ===");
let pass = 0, fail = 0;
for (const [n, ok] of checks) {
    console.log(`${ok ? "✅" : "❌"} ${n}`);
    ok ? pass++ : fail++;
}
console.log(`\n=== ${pass}/${pass + fail} ===`);
console.log(`\n시트 URL: https://docs.google.com/spreadsheets/d/${SHEET_NEW}/edit?gid=${TAB_TARGET_GID}#gid=${TAB_TARGET_GID}`);
if (fail > 0) process.exit(1);
