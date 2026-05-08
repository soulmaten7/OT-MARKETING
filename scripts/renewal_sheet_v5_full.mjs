/**
 * STEP_84.8 — OT_광고_통합_운영 시트 통째 리뉴얼 + 6 탭 통합
 *
 * 1. 옛 모든 탭 wipe (gid=0 외 삭제 + gid=0 cell clear + rename)
 * 2. 01_카피_매트릭스 (gid=0) = 70행 (14 캠페인 × 5 본문) + 헤더 서식 + freeze
 * 3. 02_이미지_프롬프트 = 6 base prompt 영문
 * 4. 03_overlay_spec = 8 영역 디자인 spec
 * 5. 04_관할법원_매핑 = 14 회생 법원
 * 6. 05_매체별_사이즈 = 5 사이즈 + 매체
 * 7. 06_안전_zone = 4 법령
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

const SHEET = "1p0KOLGz1AVBHvDUMBh8BY6Ylj_iw64RZv0BnDYlTwoM";

// ========== Phase 1. wipe + gid=0 rename ==========
console.log("=== Phase 1. 옛 모든 탭 wipe + gid=0 rename ===");

const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET });
const oldTabs = meta.data.sheets.map((s) => s.properties);

// gid=0 외 삭제
const deleteRequests = [];
for (const t of oldTabs) {
    if (t.sheetId !== 0) {
        deleteRequests.push({ deleteSheet: { sheetId: t.sheetId } });
        console.log(`  삭제 대상: "${t.title}" (gid ${t.sheetId})`);
    }
}

if (deleteRequests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET,
        requestBody: { requests: deleteRequests },
    });
    console.log(`✅ ${deleteRequests.length} 탭 삭제`);
}

// gid=0 cell clear + rename 01_카피_매트릭스 + grid 확장
await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET,
    requestBody: {
        requests: [
            {
                updateCells: {
                    range: { sheetId: 0 },
                    fields: "userEnteredValue,userEnteredFormat,note",
                },
            },
            {
                updateSheetProperties: {
                    properties: {
                        sheetId: 0,
                        title: "01_카피_매트릭스",
                        gridProperties: { rowCount: 100, columnCount: 24, frozenRowCount: 1 },
                    },
                    fields: "title,gridProperties.rowCount,gridProperties.columnCount,gridProperties.frozenRowCount",
                },
            },
        ],
    },
});
console.log(`✅ gid=0 cell clear + rename "01_카피_매트릭스" + freeze 1행`);

// ========== Phase 2. 01_카피_매트릭스 박기 ==========
console.log("\n=== Phase 2. 01_카피_매트릭스 박기 (70행) ===");

const COURTS = [
    ["seoul", "서울", "서울회생법원", 5000],
    ["gyeonggi", "경기", "수원지방법원", 5000],
    ["incheon", "인천", "인천지방법원", 3000],
    ["busan", "부산", "부산지방법원", 2500],
    ["daegu-gyeongbuk", "대구·경북", "대구지방법원", 2500],
    ["gwangju-jeonnam", "광주·전남", "광주지방법원", 2000],
    ["daejeon-sejong-chungnam", "대전·세종·충남", "대전지방법원", 2000],
    ["chungbuk", "충북", "청주지방법원", 2000],
    ["gyeongnam", "경남", "창원지방법원", 2000],
    ["gyeonggi-bukbu", "경기 북부", "의정부지방법원", 2000],
    ["ulsan", "울산", "울산지방법원", 2000],
    ["jeonbuk", "전북", "전주지방법원", 2000],
    ["gangwon", "강원", "춘천지방법원", 1500],
    ["jeju", "제주", "제주지방법원", 1500],
];
const PRIMARY = [
    ["p1", "신용대출·가계대출", "신용대출·가계대출 부채로 인한 압박 및 압류 시 — 인가 후 빠른 압류 해제"],
    ["p2", "주식·코인 손실", "주식 및 코인 사용 손실로 인한 압류 시 — 인가 후 빠른 압류 해제"],
    ["p3", "월급 압류", "월급 압류 받고 계신가요? — 인가 후 빠른 압류 해제"],
    ["p4", "집·전세 담보", "집·전세 담보대출 부채로 인한 압박 및 압류 시 — 인가 후 빠른 압류 해제"],
    ["p5", "자영업자 사업 실패", "사업 실패로 인한 부채 및 압류 시 — 인가 후 빠른 압류 해제"],
];
const LINE2 = "최대 95%까지 높은 탕감율!! 0%에 가까운 기각율!!";

const HEADERS_1 = [
    "광고ID", "광고주ID", "광고주명", "캠페인", "지역명", "관할법원",
    "본문ID", "트리거", "본문 line1 (PAS Problem+Solve)", "본문 line2 (Result)",
    "헤드라인 (이미지 안 + Meta 자동)", "페이지명 메인", "페이지명 서브",
    "설명 line1", "설명 line2", "CTA 버튼", "랜딩 URL", "UTM 파라미터",
    "이미지 base ID", "캠페인 일 예산", "안전 zone 검증", "변경 이력",
];

const tab1Rows = [HEADERS_1];
for (const [campaign, region, court, budget] of COURTS) {
    for (const [pid, trigger, line1] of PRIMARY) {
        const adId = `AD001-${campaign}-${pid}`;
        const headline = `${region} 관할법원 — ${court}에서 회생 인가`;
        const utm = `?utm_source=meta&utm_medium=cpc&utm_campaign=${campaign}&utm_content=${pid}`;
        tab1Rows.push([
            adId, "AD001", "법률사무소 보광",
            campaign, region, court,
            pid, trigger,
            line1, LINE2,
            headline,
            "BOKWANG", "법률사무소 보광",
            "개인회생 및 파산 관련 스페셜리스트", "내 탕감액 무료 분석",
            "신청하기",
            "https://otpage1.com/select11", utm,
            `${pid} (이미지 base) + B (변호사)`,
            `₩${budget.toLocaleString()}`,
            "변호사법 §22·§23·§24의2 + 표시광고법 §3 통과",
            "STEP_84.8 (2026-05-08)",
        ]);
    }
}

await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET,
    range: "01_카피_매트릭스!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: tab1Rows },
});
console.log(`✅ 01_카피_매트릭스 ${tab1Rows.length} 행 박힘 (헤더 1 + 광고 ${tab1Rows.length - 1})`);

// 헤더 서식 (다크 네이비 배경 + 흰 글자)
await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET,
    requestBody: {
        requests: [
            {
                repeatCell: {
                    range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
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
console.log("✅ 01 탭 헤더 서식 박힘");

// ========== Phase 3. 02_이미지_프롬프트 ==========
console.log("\n=== Phase 3. 02_이미지_프롬프트 (6 base) ===");

const HEADERS_2 = ["이미지 ID", "변형 이름", "PAS 트리거", "인물 인구", "사장 GPT 박을 prompt (영문)", "출력 사이즈", "출력 파일명", "검수 체크리스트", "참고"];

const PROMPTS = [
    {
        id: "B", name: "변호사 정충원 사진", trigger: "변호사",
        demo: "변호사 정충원 (사장 박은 사진 그대로)",
        prompt: "[GPT 박지 X — 사장 본인 박은 변호사 사진을 ad_v4_attorney_clean.png 로 저장. 변형 X 권장.]",
        size: "1080x1350 (4:5, STEP_85 자동 변환)",
        filename: "ad_v4_attorney_clean.png",
        checklist: "사진 그대로 / 변형 X / 1080×1350 4:5 비율로 저장",
        note: "변호사법 §22 통과 (사장 박은 본인 사진, 변호사 본인 동의 박힘)",
    },
    {
        id: "p1", name: "신용대출 여성 직장인", trigger: "신용대출·가계대출",
        demo: "여성 35-45 직장인 + 정장 + 안경",
        prompt: "이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.\n\nA photorealistic Korean middle-aged businesswoman (35-45 years old) wearing a charcoal navy business suit and round glasses, sitting at a dimly lit home desk late at night, surrounded by a pile of credit card statements and bank notices spread across the desk. Forehead pressed against one hand, the other hand holding a statement, deeply contemplative expression with subtle weariness (mood: heavy gravitas, NOT despair). Behind: blurred Korean home office bookshelf with thick brown books. Single warm desk lamp casting amber glow on left side, dark blue ambient light from window on right. Color grading: deep navy + amber + warm beige. Cinematic 8K photography, shallow depth of field f/2.0. Korean legal drama aesthetic. Aspect ratio 4:5 (1080x1350 portrait). Composition: subject occupies center 60% with breathing room top 25% and bottom 25% for future text overlay. NO visible text, NO letters on documents (kept blank), NO logos. Mobile-first composition.",
        size: "1080x1350 (4:5)",
        filename: "ad_v4_debtor_p1_credit-loan_woman.png",
        checklist: "1) 4:5 비율 / 2) 여성 35-45 직장인 / 3) 정장+안경 / 4) 카드 명세서 산더미 / 5) 어두운 표정 / 6) 글자 0",
        note: "Google 데이터 = 여성 35-44 = 신용대출 인구 증가",
    },
    {
        id: "p2", name: "주식·코인 남성 (변형 2 fix)", trigger: "주식·코인 손실",
        demo: "남성 30-40 캐주얼 + 후드",
        prompt: "이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.\n\nA photorealistic Korean man (30-40 years old) wearing a casual hoodie and t-shirt, sitting at home desk in dim night ambiance in a Korean home office, holding a smartphone close to face showing red plummeting stock chart graph (chart kept abstract — no numbers, no logos), forehead pressed against one hand with stunned but composed expression, slightly disheveled hair (mood: heavy gravitas + weary contemplation, NOT despair). Background: blurred Korean home office with single empty coffee cup on desk, dark night ambiance with single cool blue monitor glow on his face. Color grading: deep navy + cool blue + warm amber. Cinematic 8K photography, shallow depth of field f/2.0. Korean legal drama aesthetic. Aspect ratio 4:5 (1080x1350 portrait). Composition: subject center 60%, breathing room top 25% and bottom 25%. NO text, NO numbers visible on screen, NO logos. Mobile-first composition.",
        size: "1080x1350 (4:5)",
        filename: "ad_v4_debtor_p2_stock-coin_man.png",
        checklist: "1) 4:5 / 2) 남성 30-40 캐주얼 / 3) 후드+티셔츠 / 4) 폰 빨간 차트 / 5) 머리 잡고 사색 / 6) 커피잔 / 7) 글자 0",
        note: "STEP_84.6 v3 톤 충돌 fix (raw grief → weary contemplation, magenta 제거, energy drink → coffee)",
    },
    {
        id: "p3", name: "월급 압류 남성 직장인", trigger: "월급 압류",
        demo: "남성 40-45 흰 셔츠 + 빈 회사",
        prompt: "이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.\n\nA photorealistic Korean office worker (40-45 years old) in white dress shirt with rolled sleeves and loosened tie, standing at his cubicle desk in a dim Korean corporate office at night (other cubicles empty, dark monitors). Holding an official-looking court notice document with red official seal stamp visible (document kept blank otherwise — no readable text). Frozen expression staring at document, suit jacket draped on chair behind him. Background: open-plan Korean office with rows of empty desks, blue computer screens off, single fluorescent light flickering above. Color grading: cold blue + warm amber spotlight on subject. Cinematic 8K photography, shallow DOF f/2.2. Korean legal drama corporate stress scene. Aspect ratio 4:5 (1080x1350 portrait). Composition: subject center 60%, top 25% + bottom 25% clean. NO text on document body (only red seal stamp shape ok), NO logos, NO readable letters. Mobile-first composition.",
        size: "1080x1350 (4:5)",
        filename: "ad_v4_debtor_p3_salary-seizure_man.png",
        checklist: "1) 4:5 / 2) 남성 40-45 / 3) 흰 셔츠+넥타이 / 4) 빈 회사 야근 / 5) 빨간 도장 통지서 / 6) 굳은 표정 / 7) 글자 0",
        note: "옛 DR-014_월급압류 R&D Hot 카피 본질 보존",
    },
    {
        id: "p4", name: "담보대출 여성 워킹맘", trigger: "집·전세 담보대출",
        demo: "여성 35-45 가장 + 거실 + 가족 사진",
        prompt: "이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.\n\nA photorealistic Korean middle-aged woman (35-45 years old) wearing casual home clothes (gray cardigan + comfortable pants), standing in dim living room of a Korean apartment, holding a framed family photograph close to chest with both hands (photo kept simple — silhouettes ok, no readable faces or text). Looking down at floor with deeply worried but composed expression as a working mother carrying family responsibility (mood: heavy responsibility, NOT defeat). Background: blurred Korean apartment living room with sofa, dimmed ceiling light, large window showing night cityscape. On a side table: stack of bank documents and a key (kept blank — no readable text). Color grading: warm sepia + amber + soft shadows. Cinematic 8K photography, shallow DOF f/2.0. Korean legal drama family responsibility scene. Aspect ratio 4:5 (1080x1350 portrait). Composition: subject center 60%, breathing room top 25% bottom 25%. NO visible text on documents or photo, NO logos. Mobile-first composition.",
        size: "1080x1350 (4:5)",
        filename: "ad_v4_debtor_p4_collateral_woman.png",
        checklist: "1) 4:5 / 2) 여성 35-45 워킹맘 / 3) 캐주얼 / 4) 한국 아파트 거실 / 5) 가족 사진 / 6) 가장 걱정 / 7) 글자 0",
        note: "Google 데이터 = 여성 45-54 = 13.79% / 가족 책임 self-identify",
    },
    {
        id: "p5", name: "자영업자 남성", trigger: "사업 실패",
        demo: "남성 45-60 작업복 + 사업장",
        prompt: "이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.\n\nA photorealistic Korean man (45-60 years old) wearing a worn navy work apron over a white t-shirt, standing in front of a small Korean shop or restaurant with metal roller shutter HALF-CLOSED at dusk (shutter kept blank — no shop name, no signage). One hand resting on the closed shutter, looking down at empty street with stoic resigned expression (mood: weary acceptance, NOT bitter). Storefront: traditional Korean street-front store, faded paint, no readable signs. Background: empty Korean alley at twilight, distant street lights blurred. Color grading: muted teal + warm orange sunset + sepia. Cinematic 8K photography, shallow DOF f/2.5. Korean indie film aesthetic of small business closing. Aspect ratio 4:5 (1080x1350 portrait). Composition: subject center 60%, top 25% bottom 25% clean for text. NO readable text on shop, NO logos, NO numbers. Mobile-first composition.",
        size: "1080x1350 (4:5)",
        filename: "ad_v4_debtor_p5_self-employed_man.png",
        checklist: "1) 4:5 / 2) 남성 45-60 / 3) 작업복+앞치마 / 4) 사업장 셔터 반쯤 / 5) 황혼 거리 / 6) 체념 표정 / 7) 글자 0",
        note: "Google 데이터 = 65+ 33% / 자영업자 = 남성 80%",
    },
];

// 공통 함수: 새 탭 추가 + 데이터 박기
async function createTab(title, rowCount, colCount, headerRows, dataRows, eColumnPixelSize) {
    const addRes = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET,
        requestBody: {
            requests: [
                {
                    addSheet: {
                        properties: {
                            title,
                            gridProperties: { rowCount, columnCount: colCount, frozenRowCount: 1 },
                        },
                    },
                },
            ],
        },
    });
    const newTabId = addRes.data.replies[0].addSheet.properties.sheetId;

    await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET,
        range: `${title}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [headerRows, ...dataRows] },
    });

    // 헤더 서식
    const reqs = [
        {
            repeatCell: {
                range: { sheetId: newTabId, startRowIndex: 0, endRowIndex: 1 },
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
    ];

    // 줄바꿈 wrap
    reqs.push({
        repeatCell: {
            range: { sheetId: newTabId, startRowIndex: 0 },
            cell: { userEnteredFormat: { wrapStrategy: "WRAP" } },
            fields: "userEnteredFormat.wrapStrategy",
        },
    });

    // E 컬럼 너비 (옵션)
    if (eColumnPixelSize) {
        reqs.push({
            updateDimensionProperties: {
                range: {
                    sheetId: newTabId,
                    dimension: "COLUMNS",
                    startIndex: 4,
                    endIndex: 5,
                },
                properties: { pixelSize: eColumnPixelSize },
                fields: "pixelSize",
            },
        });
    }

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET,
        requestBody: { requests: reqs },
    });

    console.log(`✅ ${title} 박힘 (${dataRows.length}행, gid ${newTabId})`);
    return newTabId;
}

const tab2Data = PROMPTS.map((p) => [p.id, p.name, p.trigger, p.demo, p.prompt, p.size, p.filename, p.checklist, p.note]);
await createTab("02_이미지_프롬프트", 20, 9, HEADERS_2, tab2Data, 800);

// ========== Phase 4. 03_overlay_spec ==========
console.log("\n=== Phase 4. 03_overlay_spec (8 영역) ===");
const HEADERS_3 = ["영역", "Meta 자동 / 이미지 안", "박힐 텍스트 (사장 v3 카피)", "폰트", "크기", "색상", "위치 (1080×1350 안)", "비고"];
const OVERLAY = [
    ["① 페이지명", "Meta 자동 (이미지 위)", "BOKWANG\n법률사무소 보광", "Meta 표준", "Meta 자동", "Meta 자동", "이미지 위", "Meta 광고주 페이지 등록 시 자동 박힘"],
    ["② 본문", "Meta 자동 (이미지 위)", "{본문 line1 PAS}\n{본문 line2 Result}", "Meta 표준", "Meta 자동", "Meta 자동", "이미지 바로 위", "5 변형 = Meta DCT 자동 회전 / line1 = 캠페인별 14 swap, line2 = 공통"],
    ["③ 이미지 안 상단 (헤드라인)", "이미지 안 (수동 박힘)", "{헤드라인}\n예: 서울 관할법원 —\n서울회생법원에서 회생 인가", "Pretendard Bold", "64-72px", "다크 네이비 #1F2937 / 강조 단어 (법원명) Coral #EF4444", "상단 25% (탑 padding 40px)", "사장 5/8 결정 = 2줄 분리 (1줄: 서울 관할법원 — / 2줄: 서울회생법원에서 회생 인가)"],
    ["③ 이미지 안 중앙 (base 이미지)", "이미지 안", "(텍스트 X — base 이미지만)", "-", "-", "-", "중앙 50%", "변호사 또는 채무자 PAS 변형 5 중 1"],
    ["③ 이미지 안 하단 CTA 박스", "이미지 안 (수동 박힘)", "내 탕감액 무료 분석\n신청하기 →", "Pretendard Medium / Bold", "40-48px / 44-52px", "흰 #FFFFFF on 파란 배경 #2563EB", "하단 25% (바텀 padding 40px)", "설명 line2 + CTA 시각화 박스"],
    ["④ 헤드라인 (Meta)", "Meta 자동 (이미지 아래)", "{헤드라인}\n예: 서울 관할법원 — 서울회생법원에서 회생 인가", "Meta 표준 (굵은 글씨)", "Meta 자동", "Meta 자동", "이미지 아래", "캠페인별 14 변형"],
    ["⑤ 설명 (Meta)", "Meta 자동", "개인회생 및 파산 관련 스페셜리스트", "Meta 표준", "Meta 자동", "Meta 자동", "헤드라인 아래", "설명 line1 = 모든 광고 공통"],
    ["⑥ CTA 버튼 (Meta)", "Meta 자동", "신청하기", "Meta 표준", "Meta 자동", "Meta 자동 (파랑)", "광고 카드 우측 하단", "Meta 표준 CTA 8개 중 선택"],
];
await createTab("03_overlay_spec", 20, 8, HEADERS_3, OVERLAY, 350);

// ========== Phase 5. 04_관할법원_매핑 ==========
console.log("\n=== Phase 5. 04_관할법원_매핑 (14 법원) ===");
const HEADERS_4 = ["캠페인 ID", "지역명", "관할법원", "법원 주소", "법원 전화", "관할 시·군·구 (요약)", "인구 추정 (만)", "캠페인 일 예산 (Meta+Google)", "Meta 비중", "Google 비중", "비고"];
const COURTS_FULL = [
    ["seoul", "서울", "서울회생법원", "서울특별시 서초구 서초중앙로 157", "02-3480-1114", "서울특별시 25 자치구", 940, "₩5,000", "₩4,000", "₩1,000", "최우선 (인구 1위)"],
    ["gyeonggi", "경기", "수원지방법원", "경기도 수원시 영통구 법조로 105", "031-210-1114", "경기 남부 23 시·군 (수원·용인·화성·성남 등)", 1250, "₩5,000", "₩4,000", "₩1,000", "인구 1위 = 가중치 ↑"],
    ["incheon", "인천", "인천지방법원", "인천광역시 미추홀구 소성로 163번길 17", "032-860-1114", "인천광역시 10 자치구·군", 300, "₩3,000", "₩2,500", "₩500", "광역시"],
    ["busan", "부산", "부산지방법원", "부산광역시 연제구 법원로 31", "051-590-1114", "부산광역시 16 자치구·군", 332, "₩2,500", "₩2,000", "₩500", "광역시"],
    ["daegu-gyeongbuk", "대구·경북", "대구지방법원", "대구광역시 수성구 동대구로 364", "053-757-6600", "대구 9 + 경북 22 = 31", 493, "₩2,500", "₩2,000", "₩500", "광역시 + 도 합본"],
    ["gwangju-jeonnam", "광주·전남", "광주지방법원", "광주광역시 동구 준법로 7-12", "062-239-1114", "광주 5 + 전남 22 = 27", 323, "₩2,000", "₩2,000", "₩0", "광역시 + 도"],
    ["daejeon-sejong-chungnam", "대전·세종·충남", "대전지방법원", "대전광역시 서구 둔산중로 78번길 45", "042-470-1114", "대전 5 + 세종 1 + 충남 15 = 21", 397, "₩2,000", "₩2,000", "₩0", "광역시 + 특별자치시 + 도"],
    ["chungbuk", "충북", "청주지방법원", "충청북도 청주시 서원구 산남로 70번길 51", "043-249-7114", "충북 11 시·군", 159, "₩2,000", "₩2,000", "₩0", "도"],
    ["gyeongnam", "경남", "창원지방법원", "경상남도 창원시 성산구 창이대로 681", "055-239-2000", "경남 18 시·군", 326, "₩2,000", "₩2,000", "₩0", "도"],
    ["gyeonggi-bukbu", "경기 북부", "의정부지방법원", "경기도 의정부시 가능로 1", "031-828-0114", "의정부·동두천·양주·포천·가평·연천·남양주·구리", 150, "₩2,000", "₩2,000", "₩0", "경기 북부 분리"],
    ["ulsan", "울산", "울산지방법원", "울산광역시 남구 법대로 55", "052-216-8000", "울산광역시 5 자치구·군", 109, "₩2,000", "₩2,000", "₩0", "광역시"],
    ["jeonbuk", "전북", "전주지방법원", "전북특별자치도 전주시 덕진구 사평로 25", "063-259-5400", "전북 14 시·군", 175, "₩2,000", "₩2,000", "₩0", "특별자치도"],
    ["gangwon", "강원", "춘천지방법원", "강원특별자치도 춘천시 공지로 284", "033-259-9000", "강원 18 시·군", 153, "₩1,500", "₩1,500", "₩0", "Phase 2 (데이터 보고 추가)"],
    ["jeju", "제주", "제주지방법원", "제주특별자치도 제주시 남광북5길 3", "064-729-2000", "제주시·서귀포시", 67, "₩1,500", "₩1,500", "₩0", "Phase 2 (데이터 보고 추가)"],
];
await createTab("04_관할법원_매핑", 20, 11, HEADERS_4, COURTS_FULL, 350);

// ========== Phase 6. 05_매체별_사이즈 ==========
console.log("\n=== Phase 6. 05_매체별_사이즈 (5 사이즈) ===");
const HEADERS_5 = ["사이즈 ID", "비율", "픽셀", "주 매체", "세부 위치", "권장 우선순위", "비고"];
const SIZES = [
    ["size-1", "4:5 세로", "1080x1350", "Meta 피드 ⭐ (base)", "Facebook·Instagram 피드", "1순위 ⭐", "CTR 압도 (정사각보다 ↑) — STEP_84.7 base 사이즈로 결정"],
    ["size-2", "9:16 세로", "1080x1920", "Meta 스토리·릴스 / 토스 전체 배너", "스토리·릴스·앱내", "2순위 ⭐", "Engagement +41%"],
    ["size-3", "1:1 정사각", "1200x1200", "Google 디스플레이 / 토스 1:1", "디스플레이·앱내", "3순위", "호환성 광범위"],
    ["size-4", "1.91:1 가로", "1200x628", "Google 디스플레이 가로", "Display Network", "4순위", "Google 필수 가로"],
    ["size-5", "1.97:1 가로", "1500x760", "토스 머니알림", "토스 머니알림 일반형", "5순위", "토스 전용 (법인 대행 후)"],
];
await createTab("05_매체별_사이즈", 15, 7, HEADERS_5, SIZES, 0);

// ========== Phase 7. 06_안전_zone ==========
console.log("\n=== Phase 7. 06_안전_zone (4 법령) ===");
const HEADERS_6 = ["법령", "조항", "내용", "위반 표현 (금지 단어)", "통과 표현", "검증 위치"];
const SAFETY = [
    ["변호사법", "§22 (사무소 명칭)", "사무소 명칭 의무 표시", "(없음)", "법률사무소 보광", "footer + 페이지명 (BOKWANG / 법률사무소 보광)"],
    ["변호사법", "§23 (전문 표시)", "전문분야 등록 시에만 사용 가능", "전문 변호사", "스페셜리스트 (전문분야 등록 무관 OK)", "본문·설명"],
    ["변호사법", "§24의2 (광고규정)", "광고책임 변호사 별도 표기", "(시간 압박·과장 금지)", "광고책임 변호사 별도 표기 (footer)", "footer LP"],
    ["표시광고법", "§3 (거짓·과장)", "거짓·과장 표현 금지", "100%, 확실, 보장, 최저가, 1위, 반드시", "최대 95%, 0%에 가까운 (보호 표현)", "본문 line2"],
];
await createTab("06_안전_zone", 15, 6, HEADERS_6, SAFETY, 0);

// ========== Phase 8. 검증 ==========
console.log("\n=== Phase 8. 게이트 ===");
const finalMeta = await sheets.spreadsheets.get({ spreadsheetId: SHEET });
const finalTabs = finalMeta.data.sheets.map((s) => s.properties.title);
console.log("최종 탭 목록:", finalTabs);

const expected = ["01_카피_매트릭스", "02_이미지_프롬프트", "03_overlay_spec", "04_관할법원_매핑", "05_매체별_사이즈", "06_안전_zone"];
let pass = 0, fail = 0;
for (const t of expected) {
    const ok = finalTabs.includes(t);
    console.log(`${ok ? "✅" : "❌"} 탭 ${t}`);
    ok ? pass++ : fail++;
}
const noOldTabs = !finalTabs.some((t) => t.includes("매체별_광고문구") || t === "운영" || t.includes("v3_PAS_Boglaw"));
console.log(`${noOldTabs ? "✅" : "❌"} 옛 탭 잔여 0건`);
noOldTabs ? pass++ : fail++;

// 행 수 검증
const tab1Verify = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET, range: "01_카피_매트릭스!A1:V100" });
const tab1RowCount = (tab1Verify.data.values || []).length;
console.log(`${tab1RowCount === 71 ? "✅" : "❌"} 01_카피_매트릭스 71행 (헤더 1 + 광고 70): 실제 ${tab1RowCount}`);
tab1RowCount === 71 ? pass++ : fail++;

// 안전 zone 검증 (광고 카피 본질)
const flat1 = JSON.stringify(tab1Verify.data.values);
const violations = [
    ["100% (광고 카피)", !flat1.match(/100%[ 가-힣]/) && !flat1.includes('"100%')],
    ["확실 (한·히·하게)", !flat1.match(/확실(한|히|하게)/)],
    ["전문 변호사", !flat1.includes("전문 변호사")],
    ["최저가", !flat1.includes("최저가")],
    ["1위 (광고 카피)", !flat1.match(/1위 (변호사|법률|회생)/)],
];
for (const [name, ok] of violations) {
    console.log(`${ok ? "✅" : "❌"} 안전 zone: ${name}`);
    ok ? pass++ : fail++;
}

console.log(`\n=== ${pass}/${pass + fail} ===`);
console.log(`\n시트 URL: https://docs.google.com/spreadsheets/d/${SHEET}/edit#gid=0`);
if (fail > 0) process.exit(1);
