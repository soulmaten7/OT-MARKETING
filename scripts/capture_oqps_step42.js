// STEP_42 OQPS 9 화면 자동 캡처 (이미지 제거 + 가독성 우선 검증)

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = "http://localhost:3000/select1";
const OUT_DIR = path.resolve(__dirname, "../_captures_step42");
fs.mkdirSync(OUT_DIR, { recursive: true });

const QUESTIONS = [
    { id: "debt", type: "single", short: "Q1_채무총액" },
    { id: "debt_types", type: "multi", short: "Q2_채무종류" },
    { id: "overdue", type: "single", short: "Q3_연체기간" },
    { id: "income", type: "single", short: "Q4_소득형태" },
    { id: "job", type: "single", short: "Q5_직업형태" },
    { id: "family", type: "single", short: "Q6_부양가족" },
    { id: "collection", type: "single", short: "Q7_추심진행" },
    { id: "assets", type: "multi", short: "Q8_보유자산" },
    { id: "history", type: "single", short: "Q9_회생이력" },
];

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 }, // iPhone 14 Pro
        deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    console.log("🚀 STEP_42 OQPS 캡처 시작 (모바일 viewport 390x844)");
    await page.goto(BASE, { waitUntil: "networkidle" });

    // Diagnosis 섹션 스크롤
    await page.locator('[data-testid="diagnosis-oqps"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const log = [];

    for (let i = 0; i < QUESTIONS.length; i++) {
        const q = QUESTIONS[i];

        // 화면 등장 대기
        await page.waitForSelector(`[data-testid="question-screen-${q.id}"]`, { state: "visible", timeout: 5000 });
        await page.waitForTimeout(350);

        // 진행 바 + 질문 영역 캡처 검증
        const screen = await page.locator(`[data-testid="question-screen-${q.id}"]`).first();
        const screenBox = await screen.boundingBox();

        // 옵션 카드 측정 (첫 번째 옵션 = height 검증)
        const firstOption = await screen.locator("button").first();
        const optBox = await firstOption.boundingBox();

        // 이미지 영역 잔존 검증 — QuestionImage 텍스트·svg 검색
        const hasImageContainer = await screen.evaluate((el) => {
            const candidates = el.querySelectorAll('[style*="aspectRatio"], [class*="aspect-square"]');
            return candidates.length > 0;
        });

        // 질문 텍스트
        const questionText = await screen.locator("h2").first().innerText();

        // 옵션 카운트
        const optCount = await screen.locator("button").count();

        log.push({
            idx: i + 1,
            id: q.id,
            type: q.type,
            screenHeight: screenBox?.height ?? null,
            firstOptHeight: optBox?.height ?? null,
            firstOptWidth: optBox?.width ?? null,
            hasImageContainer,
            questionText: questionText.slice(0, 60),
            optionCount: optCount,
        });

        // 캡처
        const out = path.join(OUT_DIR, `${String(i + 1).padStart(2, "0")}_${q.short}.png`);
        await page.screenshot({ path: out, fullPage: false });
        console.log(`✅ ${q.short} (${q.type}) opts=${optCount} optH=${optBox?.height?.toFixed(0)}px imgArea=${hasImageContainer ? "❌ 잔존" : "✅ 제거"}`);

        // 다음 화면 진행
        if (q.type === "single") {
            // 첫 번째 옵션 클릭 → 자동 전환 (300ms)
            await firstOption.click();
            await page.waitForTimeout(450);
        } else {
            // multi: 첫 번째 옵션 toggle → next 버튼 클릭
            await firstOption.click();
            await page.waitForTimeout(120);
            const nextBtn = await page.locator('[data-testid="next-button"]').first();
            await nextBtn.click();
            await page.waitForTimeout(450);
        }
    }

    console.log("\n📊 검증 결과");
    console.table(log.map((r) => ({
        idx: r.idx,
        id: r.id,
        type: r.type,
        opts: r.optionCount,
        optH: Math.round(r.firstOptHeight),
        screenH: Math.round(r.screenHeight),
        image: r.hasImageContainer ? "❌" : "✅",
        Q: r.questionText.slice(0, 30),
    })));

    // 검증 게이트
    const allImageRemoved = log.every((r) => !r.hasImageContainer);
    const allOptHeight60Plus = log.every((r) => r.firstOptHeight >= 56); // 60 ± 4
    console.log(`\n검증 1) 이미지 제거: ${allImageRemoved ? "✅ 9/9" : "❌ 일부 잔존"}`);
    console.log(`검증 2) 옵션 카드 height ≥ 56px: ${allOptHeight60Plus ? "✅ 9/9" : "❌"}`);
    console.log(`📁 출력: ${OUT_DIR}/`);

    await browser.close();
    process.exit(allImageRemoved && allOptHeight60Plus ? 0 : 1);
})();
