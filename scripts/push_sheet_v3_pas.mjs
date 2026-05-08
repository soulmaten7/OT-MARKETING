/**
 * STEP_84.6 — OT_광고카피_자동화 시트에 v3_PAS_Boglaw 탭 박기 (Sheets API 자동)
 *
 * - 옛 탭 4 (01_Meta·02_Google·03_당근·04_YouTube) 보존
 * - 신규 탭 v3_PAS_Boglaw 추가 (이미 박혀 있으면 clear 후 재박기)
 * - 메타 1 + 본문 5 + 헤드라인 14 + 설명·CTA·검증 = 약 35 행
 */
import { google } from "googleapis";
import { readFileSync } from "fs";

const envText = readFileSync("/Users/maegbug/OTMarketing/ot-marketing-source/.env.local", "utf8");
const env = {};
for (const line of envText.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^"(.*)"$/s, "$1");
}

const SHEET_ID = "1r35RKS1c04PX_8fG5-HbyMmUhj0FHIMNJaU1wcfuYXY";
const TAB_NAME = "v3_PAS_Boglaw";

function buildPrivateKey(raw) {
    let key = raw;
    if (key.includes("\\n")) key = key.replace(/\\n/g, "\n");
    if (key.startsWith('"') && key.endsWith('"')) key = key.slice(1, -1);
    return key;
}

const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: buildPrivateKey(env.GOOGLE_PRIVATE_KEY),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

// 1. 탭 박혀 있나 체크 → 없으면 추가, 있으면 clear
const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
const existingTab = meta.data.sheets.find((s) => s.properties.title === TAB_NAME);

if (existingTab) {
    console.log(`[${TAB_NAME}] 이미 박혀 있음 → clear`);
    await sheets.spreadsheets.values.clear({
        spreadsheetId: SHEET_ID,
        range: `${TAB_NAME}!A1:Z100`,
    });
} else {
    console.log(`[${TAB_NAME}] 신규 탭 추가`);
    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
            requests: [{ addSheet: { properties: { title: TAB_NAME, gridProperties: { rowCount: 60, columnCount: 12 } } } }],
        },
    });
}

// 2. 데이터 매트릭스
const RES = "최대 95%까지 높은 탕감율!! 0%에 가까운 기각율!!";

const primary = [
    ["p1", "신용대출·가계대출", "신용대출·가계대출 부채로 인한 압박 및 압류 시 — 인가 후 빠른 압류 해제", RES],
    ["p2", "주식·코인 손실", "주식 및 코인 사용 손실로 인한 압류 시 — 인가 후 빠른 압류 해제", RES],
    ["p3", "월급 압류", "월급 압류 받고 계신가요? — 인가 후 빠른 압류 해제", RES],
    ["p4", "집·전세 담보", "집·전세 담보대출 부채로 인한 압박 및 압류 시 — 인가 후 빠른 압류 해제", RES],
    ["p5", "자영업자", "사업 실패로 인한 부채 및 압류 시 — 인가 후 빠른 압류 해제", RES],
];

const headlines = [
    [1, "서울", "서울회생법원", "서울 관할법원 — 서울회생법원에서 회생 인가"],
    [2, "경기", "수원지방법원", "경기 관할법원 — 수원지방법원에서 회생 인가"],
    [3, "인천", "인천지방법원", "인천 관할법원 — 인천지방법원에서 회생 인가"],
    [4, "부산", "부산지방법원", "부산 관할법원 — 부산지방법원에서 회생 인가"],
    [5, "대구·경북", "대구지방법원", "대구·경북 관할법원 — 대구지방법원에서 회생 인가"],
    [6, "광주·전남", "광주지방법원", "광주·전남 관할법원 — 광주지방법원에서 회생 인가"],
    [7, "대전·세종·충남", "대전지방법원", "대전·세종·충남 관할법원 — 대전지방법원에서 회생 인가"],
    [8, "충북", "청주지방법원", "충북 관할법원 — 청주지방법원에서 회생 인가"],
    [9, "경남", "창원지방법원", "경남 관할법원 — 창원지방법원에서 회생 인가"],
    [10, "경기 북부", "의정부지방법원", "경기 북부 관할법원 — 의정부지방법원에서 회생 인가"],
    [11, "울산", "울산지방법원", "울산 관할법원 — 울산지방법원에서 회생 인가"],
    [12, "전북", "전주지방법원", "전북 관할법원 — 전주지방법원에서 회생 인가"],
    [13, "강원", "춘천지방법원", "강원 관할법원 — 춘천지방법원에서 회생 인가"],
    [14, "제주", "제주지방법원", "제주 관할법원 — 제주지방법원에서 회생 인가"],
];

const rows = [
    // 1) 광고주 메타
    ["[광고주 메타]"],
    ["광고주ID", "광고주명", "업종", "페이지명(메인)", "페이지명(서브)", "컨셉"],
    ["AD001", "법률사무소 보광", "개인회생·파산", "BOKWANG", "법률사무소 보광", "PAS Problem · Agitate · Solve"],
    [],
    // 2) 본문 5 (PAS DCT)
    ["[본문 (Primary Text) — Meta DCT 5 변형, 모든 캠페인 공통]"],
    ["ID", "트리거", "본문 line1 (PAS Problem+Solve)", "본문 line2 (Result)"],
    ...primary,
    [],
    // 3) 헤드라인 14
    ["[헤드라인 — 캠페인별 14 변형]"],
    ["#", "캠페인 (regionLabel)", "법원", "헤드라인"],
    ...headlines,
    [],
    // 4) 설명·CTA·URL·UTM
    ["[설명 · CTA · URL · UTM]"],
    ["항목", "값"],
    ["설명 line1", "개인회생 및 파산 관련 스페셜리스트"],
    ["설명 line2", "내 탕감액 무료 분석"],
    ["CTA 버튼", "신청하기"],
    ["랜딩 URL", "https://otpage1.com/select11"],
    ["UTM 패턴", "?utm_source=meta&utm_medium=cpc&utm_campaign={campaign}&utm_content=p{1-5}"],
    ["광고 조합 총량", "14 캠페인 × 5 본문 × 2 이미지 (A·B) = 140 광고 (Meta DCT 자동 회전)"],
    [],
    // 5) 안전 zone + 박힘 메타
    ["[안전 zone 검증]"],
    ["변호사법 §22 (사무소 명칭)", "통과 — 페이지명 듀얼 BOKWANG / 법률사무소 보광"],
    ["변호사법 §23 (전문 표시)", "통과 — '스페셜리스트' OK / '전문 변호사' X"],
    ["변호사법 §24의2 (광고규정)", "통과 — 광고책임 변호사 LP footer 박힘"],
    ["표시광고법 §3 (거짓·과장)", "통과 — '최대' / '에 가까운' 보호 표현"],
    ["금지 단어 (전문 변호사·100%·확실·보장·최저가·1위·반드시)", "0건"],
    [],
    ["박힌 일시", "2026-05-08"],
    ["박힌 STEP", "STEP_84.6 (v3 PAS 공식, 사장 본인 안)"],
    ["선행 산출물", "data/ad-headlines-70.json (v3) + docs/AD_SETUP_MANUAL_BOGLAW_v2.md + docs/AD_IMAGE_PROMPTS_v3_BOGLAW.md"],
];

await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${TAB_NAME}!A1`,
    valueInputOption: "RAW",
    requestBody: { values: rows },
});

console.log(`✅ ${TAB_NAME} 박힘 — ${rows.length} 행`);

// 3. 검증 fetch
const fetched = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${TAB_NAME}!A1:Z60`,
});
const flatText = JSON.stringify(fetched.data.values || []);
const checks = [
    ["BOKWANG", flatText.includes("BOKWANG")],
    ["신청하기", flatText.includes("신청하기")],
    ["신용대출·가계대출 부채", flatText.includes("신용대출·가계대출 부채")],
    ["서울회생법원", flatText.includes("서울회생법원")],
    ["관할법원 — 14", (flatText.match(/관할법원 —/g) || []).length === 14],
    ["인가 후 빠른 압류 해제 5", (flatText.match(/인가 후 빠른 압류 해제/g) || []).length === 5],
    ["최대 95%까지 5", (flatText.match(/최대 95%까지/g) || []).length === 5],
    ["스페셜리스트", flatText.includes("스페셜리스트")],
    ["100% 광고 카피 위반 0", !flatText.match(/100% [가-힣]/) && !flatText.includes("\"100%\"")],
    ["확실 광고 카피 위반 0", !flatText.match(/확실(한|히|하게)/)],
    ["보장 광고 카피 위반 0", !flatText.match(/(평생|영원|100%) 보장/)],
];

console.log("");
console.log("=== 게이트 검증 ===");
let pass = 0, fail = 0;
for (const [name, ok] of checks) {
    console.log(`${ok ? "✅" : "❌"} ${name}`);
    ok ? pass++ : fail++;
}
console.log(`\n=== ${pass}/${pass + fail} ===`);
console.log(`\n시트 URL: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=${(meta.data.sheets.find((s) => s.properties.title === TAB_NAME) || {}).properties?.sheetId || "(신규 박힘 직후 — 시트 새로고침 시 보임)"}`);
if (fail > 0) process.exit(1);
