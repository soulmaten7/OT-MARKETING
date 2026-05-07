// STEP_57 — 1 화면 3 문항 + 전체동의 + 컴팩트 검증 (모바일 viewport)
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = process.env.BASE_URL || "http://localhost:3000/select1";
const OUT = path.resolve(__dirname, "../_captures_step57");
fs.mkdirSync(OUT, { recursive: true });

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } }); // iPhone

    // fbq 호출 capture
    const fbqCalls = [];
    await page.exposeFunction("__captureFbq", (args) => fbqCalls.push(args));
    await page.addInitScript(() => {
        Object.defineProperty(window, "fbq", {
            configurable: true,
            set(v) {
                const orig = v;
                Object.defineProperty(window, "fbq", {
                    configurable: true,
                    get: () => function (...args) {
                        // @ts-ignore
                        window.__captureFbq?.(args);
                        return orig.apply(this, args);
                    },
                });
            },
        });
    });

    console.log(`🚀 ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // 1. Hero CTA → Diagnosis 진입
    await page.click('[data-testid="hero-cta-start"]');
    await page.waitForTimeout(1000);

    // 2. Step 1 화면 = 3 문항 박혀있어야 함
    await page.waitForSelector('[data-testid="step-screen-1"]', { state: "visible", timeout: 8000 });
    const step1Questions = await page.locator('[data-testid="step-screen-1"] [data-testid^="question-"]').count();
    console.log(`Step 1 문항 수: ${step1Questions} (예상 3)`);

    // 3. Step 1 의 3 문항 답변 (각 문항 첫 옵션 클릭)
    for (let q = 0; q < 3; q++) {
        const questionDiv = page.locator(`[data-testid="step-screen-1"] [data-testid^="question-"]`).nth(q);
        await questionDiv.locator("button").first().click();
        await page.waitForTimeout(120);
    }
    await page.screenshot({ path: path.join(OUT, "01_step1.png"), fullPage: true });

    // 4. 다음 버튼 클릭 → Step 2
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(600);

    // 5. Step 2 = 3 문항 박힘 + DiagnosisStep2 fire
    await page.waitForSelector('[data-testid="step-screen-2"]', { state: "visible", timeout: 5000 });
    const step2Questions = await page.locator('[data-testid="step-screen-2"] [data-testid^="question-"]').count();
    console.log(`Step 2 문항 수: ${step2Questions} (예상 3)`);
    for (let q = 0; q < 3; q++) {
        const questionDiv = page.locator(`[data-testid="step-screen-2"] [data-testid^="question-"]`).nth(q);
        await questionDiv.locator("button").first().click();
        await page.waitForTimeout(110);
    }

    // 6. Step 3
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(600);
    await page.waitForSelector('[data-testid="step-screen-3"]', { state: "visible", timeout: 5000 });
    const step3Questions = await page.locator('[data-testid="step-screen-3"] [data-testid^="question-"]').count();
    console.log(`Step 3 문항 수: ${step3Questions} (예상 3)`);
    await page.screenshot({ path: path.join(OUT, "02_step3.png"), fullPage: true });
    for (let q = 0; q < 3; q++) {
        const questionDiv = page.locator(`[data-testid="step-screen-3"] [data-testid^="question-"]`).nth(q);
        await questionDiv.locator("button").first().click();
        await page.waitForTimeout(110);
    }

    // 7. 결과 확인하기 → ContactForm (Step 4)
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(1500);

    // 8. ContactForm 등장 + 전체 동의 박스 + 개별 동의 3 박스
    await page.waitForSelector("form", { state: "visible", timeout: 8000 });
    const consentAllCount = await page.locator('[data-testid="consent-all"]').count();
    const allCheckboxes = await page.locator('input[type="checkbox"]').count();
    console.log(`전체 동의 체크박스: ${consentAllCount} (예상 1)`);
    console.log(`전체 체크박스 (전체동의 + 개별 3): ${allCheckboxes} (예상 4)`);
    await page.screenshot({ path: path.join(OUT, "03_contact_form.png"), fullPage: true });

    // 9. "전체 동의" 클릭 → 개별 3 모두 체크되는지
    await page.locator('[data-testid="consent-all"] input[type="checkbox"]').click();
    await page.waitForTimeout(300);
    const checkedCount = await page.locator('input[type="checkbox"]:checked').count();
    console.log(`전체 동의 클릭 후 체크된 박스: ${checkedCount} (예상 4 = 전체동의 + 3 개별)`);

    // 10. fbq 호출 검증
    await page.waitForTimeout(300);
    const events = fbqCalls
        .filter(c => c[0] === "track" || c[0] === "trackCustom")
        .map(c => `${c[0]}:${c[1]}`);
    const uniq = [...new Set(events)];
    console.log(`\nfbq 호출 (${events.length} 회):`);
    uniq.forEach(u => console.log("  ", u));

    const expected = [
        "track:PageView",
        "trackCustom:DiagnosisStart",
        "trackCustom:DiagnosisStep2",
        "trackCustom:DiagnosisStep3",
        "trackCustom:DiagnosisStep4",
    ];
    const missing = expected.filter(e => !uniq.includes(e));
    console.log(`\n예상 events ${expected.length} / 발견 ${expected.length - missing.length}`);
    if (missing.length > 0) console.log("누락:", missing);

    const ok = step1Questions === 3
            && step2Questions === 3
            && step3Questions === 3
            && consentAllCount === 1
            && allCheckboxes === 4
            && checkedCount === 4
            && missing.length === 0;
    console.log(`\n${ok ? "✅ 검증 통과" : "❌ 검증 실패"}`);
    console.log(`📁 캡처: ${OUT}/`);

    await browser.close();
    process.exit(ok ? 0 : 1);
})();
