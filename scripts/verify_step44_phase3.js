// STEP_44 v2 Phase 3 검증 — 9 화면 자동 응답 + ContactForm 동의 3 박힘 검증
// 패턴 reuse: scripts/capture_oqps_step42.js (STEP_42 의 OQPS 9 화면 응답 패턴)

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = process.env.BASE_URL || "http://localhost:3000/select1";
const OUT_DIR = path.resolve(__dirname, "../_captures_step44_phase3");
fs.mkdirSync(OUT_DIR, { recursive: true });

// STEP_42 의 자가진단 9 화면 ID (debt-relief 업종)
const QUESTIONS = [
    { id: "debt", type: "single" },
    { id: "debt_types", type: "multi" },
    { id: "overdue", type: "single" },
    { id: "income", type: "single" },
    { id: "job", type: "single" },
    { id: "family", type: "single" },
    { id: "collection", type: "single" },
    { id: "assets", type: "multi" },
    { id: "history", type: "single" },
];

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    console.log(`🚀 STEP_44 v2 Phase 3 검증 — ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.locator('[data-testid="diagnosis-oqps"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // 9 화면 자동 응답
    for (let i = 0; i < QUESTIONS.length; i++) {
        const q = QUESTIONS[i];
        await page.waitForSelector(`[data-testid="question-screen-${q.id}"]`, { state: "visible", timeout: 5000 });
        await page.waitForTimeout(350);
        const screen = await page.locator(`[data-testid="question-screen-${q.id}"]`).first();
        const firstOption = await screen.locator("button").first();
        await firstOption.click();
        await page.waitForTimeout(120);
        if (q.type === "multi") {
            const nextBtn = await page.locator('[data-testid="next-button"]').first();
            await nextBtn.click();
        }
        await page.waitForTimeout(450);
    }

    // ContactForm 등장 대기
    await page.waitForSelector("form", { state: "visible", timeout: 8000 });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT_DIR, "01_contact_form_full.png"), fullPage: true });

    // 검증 항목
    const checkboxCount = await page.locator('input[type="checkbox"]').count();
    const requiredText  = await page.locator(':text("(필수)")').count();
    // (선택) 텍스트는 "추가 문의 (선택)" 라벨에도 등장 → 카운트 X. 마케팅 link 로 박힘 검증.
    const collectionLink   = await page.locator('a[href="/legal/privacy-collection"]').count();
    const thirdPartyLink   = await page.locator('a[href="/legal/privacy-third-party"]').count();
    const marketingLink    = await page.locator('a[href="/legal/marketing"]').count();

    // 제출 버튼 disabled 여부 (필수 동의 X 시 disabled)
    const submitBtn = await page.locator('button[type="submit"]').first();
    const initialDisabled = await submitBtn.isDisabled();

    console.log("\n📊 검증 결과");
    console.log(`체크박스: ${checkboxCount} (예상 3)`);
    console.log(`(필수) 표기: ${requiredText} (예상 2)`);
    console.log(`수집 동의 링크: ${collectionLink} (예상 1)`);
    console.log(`제3자 동의 링크: ${thirdPartyLink} (예상 1)`);
    console.log(`마케팅 동의 링크: ${marketingLink} (예상 1)  ← 마케팅 박힘 검증`);
    console.log(`초기 제출 버튼 disabled: ${initialDisabled} (예상 true)`);

    // 필수 2 체크 후 제출 버튼 enabled 검증
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await page.waitForTimeout(120);
    const afterDisabled = await submitBtn.isDisabled();
    console.log(`필수 2 체크 후 disabled: ${afterDisabled} (예상 false)`);

    await page.screenshot({ path: path.join(OUT_DIR, "02_after_required_consents.png"), fullPage: true });

    const ok =
        checkboxCount === 3 &&
        requiredText === 2 &&
        collectionLink === 1 &&
        thirdPartyLink === 1 &&
        marketingLink === 1 &&
        initialDisabled === true &&
        afterDisabled === false;

    console.log(`\n${ok ? "✅ 검증 통과" : "❌ 검증 실패"}`);
    console.log(`📁 캡처: ${OUT_DIR}/`);

    await browser.close();
    process.exit(ok ? 0 : 1);
})();
