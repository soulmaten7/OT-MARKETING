/**
 * STEP_84.9 — 시트 02_이미지_프롬프트 탭 5 prompt 좌절·체념 톤 swap
 *
 * - 행 3~7 (p1~p5) E·H·I 컬럼 = Korean tragedy realism 톤 swap
 * - 행 2 (B 변호사) = 손 X (변형 X 보존)
 * - F·G (사이즈·파일명) 손 X — E·H·I 만 swap
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
const TAB = "02_이미지_프롬프트";

const NOTE = "STEP_84.9 Korean tragedy realism 톤 적용 (사장 5/8 결정 — 좌절·체념·풀어헤침). p1 GPT 결과 = 통과 후 동일 톤 적용.";

const PROMPTS = {
    p1: {
        prompt: `이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.

A photorealistic Korean middle-aged woman (35-45 years old) wearing a rumpled white dress shirt with top button undone and rolled-up sleeves, navy suit jacket draped haphazardly on the chair behind her, slightly disheveled hair falling loose. Sitting deeply slumped at a dimly lit home desk late at night, leaning back heavily in her chair with shoulders collapsed downward, head tilted slightly back looking up at ceiling with eyes half-closed in defeated weary exhaustion (mood: emotional collapse + quiet despair, raw and unstaged). One hand limp on desk holding a single crumpled statement, the other hand hanging loose at her side. The desk is overwhelmed by a chaotic pile of credit card statements, bank notices, and final demand letters spread everywhere — some scattered onto the floor (all documents kept blank — no readable text). Glasses pushed up onto her forehead, traces of fatigue under her eyes. Background: blurred Korean home office at night with single warm desk lamp casting harsh amber glow on left side of face, deep blue cold darkness from window behind her. Color grading: deep navy + amber + cold blue shadows. Cinematic 8K photography, shallow depth of field f/2.0. Korean tragedy realism aesthetic (NOT polished K-drama — raw, documentary feel of someone breaking down quietly). Aspect ratio 4:5 (1080x1350 portrait). Composition: subject occupies center 60% with breathing room top 25% and bottom 25% for future text overlay. NO visible text, NO letters on documents, NO logos. Mobile-first composition.`,
        checklist: "1) 4:5 비율 (1080×1350) / 2) 의상 = 풀어헤친 셔츠 + 자켓 의자에 + 단추 풀림 / 3) 자세 = 의자에 깊게 기대 + 어깨 무너짐 + 하늘 응시 / 4) 표정 = 좌절·체념·반쯤 감긴 눈 / 5) 책상 = 정신없는 명세서 더미 + 일부 바닥에 / 6) 글자·로고 0",
    },
    p2: {
        prompt: `이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.

A photorealistic Korean man (30-40 years old) wearing an unzipped wrinkled dark hoodie over a stretched-out white t-shirt, slightly disheveled hair sticking up unevenly, dark circles under his eyes. Sitting deeply slumped at a Korean home desk late at night, leaning forward with elbows on the desk, both hands gripping his head in raw despair, fingers buried in his hair. A smartphone lies face-up on the desk in front of him showing a red plummeting stock chart graph (chart kept abstract — no numbers, no logos), screen casting cold blue glow on his face. Mouth slightly open in silent shock, eyes squeezed shut (mood: emotional collapse + raw grief, NOT cinematic posing). Background: blurred messy Korean home office with a single empty coffee cup on desk, a knocked-over chair barely visible, dark night ambiance with single overhead pendant light off, only the phone screen and a distant window providing cold blue light. Color grading: deep navy + cool blue + cold shadows. Cinematic 8K photography, shallow depth of field f/2.0. Korean tragedy realism aesthetic (NOT polished K-drama — raw, documentary feel of someone breaking down quietly). Aspect ratio 4:5 (1080x1350 portrait). Composition: subject center 60%, breathing room top 25% and bottom 25%. NO text, NO numbers visible on screen, NO logos. Mobile-first composition.`,
        checklist: "1) 4:5 비율 / 2) 의상 = 늘어진 후드+티셔츠 + 헝클어진 머리 + 다크서클 / 3) 자세 = 책상에 엎드림 + 양손 머리 잡고 좌절 / 4) 표정 = 입 벌림 침묵의 충격 + 눈 감음 / 5) 폰 = 빨간 차트 (글자 X) + 옆 빈 커피잔 / 6) 글자·로고 0",
    },
    p3: {
        prompt: `이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.

A photorealistic Korean office worker (40-45 years old) wearing a rumpled wrinkled white dress shirt with top buttons undone and tie hanging loose around his neck, sleeves rolled up unevenly, suit jacket discarded on chair behind. Sitting collapsed at his cubicle desk in a dim empty Korean corporate office at night (other cubicles dark and empty, monitors off). Slumped forward with both elbows on desk, one hand covering his eyes in defeated exhaustion, the other hand limp beside an official-looking court notice document with a red official seal stamp visible (document kept blank otherwise — no readable text), document slightly crumpled. Mouth slightly open exhaling deep weary breath (mood: emotional collapse + quiet defeat, raw and unstaged). Background: open-plan Korean office at night with rows of empty desks, blue computer screens dark, single fluorescent ceiling light flickering harshly above creating cold shadows. Color grading: cold blue + harsh fluorescent + warm amber spotlight. Cinematic 8K photography, shallow DOF f/2.2. Korean tragedy realism aesthetic (NOT polished K-drama — raw, documentary feel of someone breaking down quietly). Aspect ratio 4:5 (1080x1350 portrait). Composition: subject center 60%, top 25% + bottom 25% clean. NO text on document body (only red seal stamp shape ok), NO logos, NO readable letters. Mobile-first composition.`,
        checklist: "1) 4:5 비율 / 2) 의상 = 풀어헤친 흰 셔츠 + 풀린 넥타이 + 자켓 의자에 / 3) 자세 = 책상에 엎드림 + 손으로 눈 가림 / 4) 표정 = 깊은 한숨·체념 / 5) 통지서 = 빨간 도장 + 살짝 구겨짐 / 6) 회사 = 빈 큐비클 + 깜빡이는 형광등 / 글자·로고 0",
    },
    p4: {
        prompt: `이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.

A photorealistic Korean middle-aged woman (35-45 years old) wearing oversized rumpled gray cardigan over a wrinkled blouse, comfortable home pants, hair falling loose and uncombed, traces of fatigue on her face. Sitting collapsed on the floor of a dim Korean apartment living room with her back against the sofa, knees drawn up loosely, holding a framed family photograph against her chest with both hands (photo kept simple — silhouettes ok, no readable faces or text), looking down at the photograph with eyes half-closed in quiet despair (mood: emotional collapse + maternal grief carrying family burden, NOT cinematic posing). Beside her on the floor: scattered bank documents and an apartment key (kept blank — no readable text), a crumpled letter in her hand. Background: blurred Korean apartment living room at night with dimmed ceiling light casting warm but cold shadows, large window showing dark blue night cityscape, blurred sofa behind her, traces of family living (toys, books) softly visible but blurred. Color grading: warm sepia + amber + cold blue shadows. Cinematic 8K photography, shallow DOF f/2.0. Korean tragedy realism aesthetic (NOT polished K-drama — raw, documentary feel of someone breaking down quietly). Aspect ratio 4:5 (1080x1350 portrait). Composition: subject center 60%, breathing room top 25% bottom 25%. NO visible text on documents or photo, NO logos. Mobile-first composition.`,
        checklist: "1) 4:5 비율 / 2) 의상 = 늘어진 카디건 + 풀린 머리 + 정신없음 / 3) 자세 = 거실 바닥 무너짐 + 소파에 등 기댐 + 무릎 굽힘 / 4) 표정 = 가족 사진 보며 체념·죄책감 / 5) 가족 사진 (silhouettes, 얼굴 X) + 옆 흩어진 서류 / 6) 글자·로고 0",
    },
    p5: {
        prompt: `이 영문 prompt 로 1080×1350 (4:5 세로) 사진 1장 만들어 줘. 텍스트·글자·로고 일절 없는 깔끔한 이미지.

A photorealistic Korean man (45-60 years old) wearing a faded worn navy work apron stained with traces of work, over a wrinkled white t-shirt, sleeves of t-shirt slightly torn, sitting on the curb of an empty Korean alley at dusk in front of a small Korean shop or restaurant with metal roller shutter HALF-CLOSED (shutter kept blank — no shop name, no signage). Sitting slumped with elbows on his knees, hands hanging loose in front of him, head bowed down low between his shoulders, looking down at the empty pavement with stoic deep resignation (mood: weary defeat + quiet acceptance of loss, raw and unstaged). A discarded crumpled paper near his feet, a half-empty soju bottle by his side (bottle kept abstract — no label, no readable text). Storefront: traditional Korean street-front store with faded paint, dust on shutter, no readable signs. Background: empty Korean alley at twilight with distant warm street lights blurred, last orange glow of sunset behind buildings. Color grading: muted teal + warm orange sunset + sepia + cold shadows. Cinematic 8K photography, shallow DOF f/2.5. Korean tragedy realism aesthetic (NOT polished K-drama — raw, documentary feel of small business closing). Aspect ratio 4:5 (1080x1350 portrait). Composition: subject center 60%, top 25% bottom 25% clean for text. NO readable text on shop or bottle, NO logos, NO numbers. Mobile-first composition.`,
        checklist: "1) 4:5 비율 / 2) 의상 = 낡은 작업복 + 얼룩 + 헝클어진 / 3) 자세 = 사업장 셔터 앞 길거리 주저앉음 + 무릎에 팔꿈치 + 머리 숙임 / 4) 표정 = 깊은 체념·사업 잃은 슬픔 / 5) 셔터 (글자 X) + 옆 구겨진 종이·소주병 (라벨 X) / 6) 글자·로고 0",
    },
};

// 행 매핑: B(변호사)=2 / p1=3 / p2=4 / p3=5 / p4=6 / p5=7
const ROW_MAP = { p1: 3, p2: 4, p3: 5, p4: 6, p5: 7 };

console.log("=== STEP_84.9 — 02_이미지_프롬프트 5 prompt swap ===");

// E·H·I 컬럼만 swap (F·G 사이즈·파일명 그대로 유지) → batchUpdate 1 회
const data = [];
for (const [pid, row] of Object.entries(ROW_MAP)) {
    const { prompt, checklist } = PROMPTS[pid];
    // E (5번째 컬럼) = prompt
    data.push({ range: `${TAB}!E${row}`, values: [[prompt]] });
    // H (8번째 컬럼) = checklist
    data.push({ range: `${TAB}!H${row}`, values: [[checklist]] });
    // I (9번째 컬럼) = note
    data.push({ range: `${TAB}!I${row}`, values: [[NOTE]] });
}

await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET,
    requestBody: { valueInputOption: "USER_ENTERED", data },
});
console.log(`✅ 5 행 × 3 컬럼 = ${data.length} cell swap 완료`);

// === 검증 ===
console.log("\n=== 게이트 검증 ===");
const fetched = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET,
    range: `${TAB}!A1:I10`,
});
const rows = fetched.data.values || [];
const flat = JSON.stringify(rows);

const pIds = ["p1", "p2", "p3", "p4", "p5"];
let pass = 0, fail = 0;
const ok = (n, c) => { c ? pass++ : fail++; console.log(`${c ? "✅" : "❌"} ${n}`); };

// 5 prompt = Korean tragedy realism 톤
ok("5 prompt = 'Korean tragedy realism' 박힘 ≥ 5", (flat.match(/Korean tragedy realism/g) || []).length >= 5);

// B 행 (변호사) = 손 X 검증 (변형 X / 사장 본인 박은)
const bPrompt = rows[1]?.[4] || "";
ok("B 행 (변호사) 변형 X 보존 (사장 본인 박은 / 변형 X 키워드)",
    bPrompt.includes("사장 본인 박은") || bPrompt.includes("변형 X"));

// 옛 단정 톤 잔여 검증 (5 prompt 본문)
ok("옛 'heavy gravitas, NOT despair' 잔여 0", !flat.includes("heavy gravitas, NOT despair"));
ok("옛 'stoic resigned' 잔여 0 (p5)", !flat.includes("stoic resigned"));
ok("옛 'frozen expression' 잔여 0 (p3)", !flat.includes("frozen expression"));
ok("옛 'composed worry' 잔여 0 (p4)", !flat.includes("composed worry"));
ok("옛 'weary contemplation' 잔여 0", !flat.includes("weary contemplation"));

// 새 톤 키워드 7종
const KEYWORDS = ["emotional collapse", "tragedy realism", "rumpled", "slumped", "disheveled", "breaking down quietly", "raw"];
for (const kw of KEYWORDS) {
    const found = flat.includes(kw);
    ok(`새 톤 키워드 '${kw}' 박힘`, found);
}

// 4:5 (1080x1350) 박힘
ok("4:5 사이즈 1080x1350 박힘 ≥ 5", (flat.match(/1080x1350/g) || []).length >= 5);

// 안전 zone (광고 카피 본질)
const FORBIDDEN = ["전문 변호사", "최저가"];
for (const w of FORBIDDEN) {
    ok(`안전 zone: '${w}' 0`, !flat.includes(w));
}
// 정밀: "확실 (한·히·하게)" / "보장 (의무·평생·영원)"
ok("안전 zone: 광고 카피 안 '확실(한·히·하게)' 0", !flat.match(/확실(한|히|하게)/));
ok("안전 zone: '평생 보장' 0", !flat.match(/평생 보장|영원 보장/));

// note 박힘 5건
ok("STEP_84.9 비고 5건", (flat.match(/STEP_84\.9 Korean tragedy realism/g) || []).length >= 5);

// 체크리스트 5건 박힘 (1) 4:5 비율 등)
ok("체크리스트 박힘 ≥ 5 (1) 4:5)", (flat.match(/1\) 4:5/g) || []).length >= 5);

console.log(`\n=== ${pass}/${pass + fail} ===`);
console.log(`\n시트 URL: https://docs.google.com/spreadsheets/d/${SHEET}/edit?gid=1677914566#gid=1677914566`);
if (fail > 0) process.exit(1);
