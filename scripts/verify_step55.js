// STEP_55 — Pixel + custom events + UX fix 검증 (모바일 viewport)
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = process.env.BASE_URL || "http://localhost:3000/select1";
const OUT = path.resolve(__dirname, "../_captures_step55");
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

    // 1. Pixel 박힘 확인 (script tag 또는 fbq 함수)
    const pixelScriptCount = await page.locator('script#meta-pixel').count();
    const fbqAvailable = await page.evaluate(() => typeof window.fbq === "function");
    console.log(`Pixel script tag: ${pixelScriptCount} (예상 1)`);
    console.log(`window.fbq available: ${fbqAvailable}`);

    // 2. Hero CTA 박힘
    const heroCtaCount = await page.locator('[data-testid="hero-cta-start"]').count();
    console.log(`Hero CTA: ${heroCtaCount} (예상 1)`);
    await page.screenshot({ path: path.join(OUT, "01_hero.png"), fullPage: false });

    // 3. Hero CTA 클릭 → 자가진단 영역 진입
    if (heroCtaCount > 0) {
        await page.click('[data-testid="hero-cta-start"]');
        await page.waitForTimeout(1200);
    }
    const diagVisible = await page.locator('[data-testid="diagnosis-oqps"]').isVisible();
    console.log(`Diagnosis 영역 visible: ${diagVisible}`);

    // 4. 9 화면 자동 응답 (Diagnosis*Step events fire)
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
    for (let i = 0; i < QUESTIONS.length; i++) {
        const q = QUESTIONS[i];
        await page.waitForSelector(`[data-testid="question-screen-${q.id}"]`, { state: "visible", timeout: 8000 });
        await page.waitForTimeout(280);
        const screen = page.locator(`[data-testid="question-screen-${q.id}"]`).first();
        const firstOpt = screen.locator("button").first();
        await firstOpt.click();
        await page.waitForTimeout(110);
        if (q.type === "multi") {
            await page.locator('[data-testid="next-button"]').first().click();
        }
        await page.waitForTimeout(400);
    }

    // 5. ContactForm 등장
    await page.waitForSelector("form", { state: "visible", timeout: 8000 });
    await page.waitForTimeout(400);

    // 6. 동의 #1 부드러움 체크
    const softCopy = await page.locator(':text("상담 결과 안내를 받기 위해")').count();
    console.log(`동의 #1 부드러움: ${softCopy} (예상 ≥1)`);

    // 7. 진행도 X/9 표시 (ProgressBar 의 1/9 등)
    // ProgressBar 는 ContactForm 단계에선 X (Diagnosis 안). 마지막 Q9 화면 = 9/9 박힘.
    // 현재 ContactForm 단계라 progress 검사 X. 대신 Diagnosis 도중 캡처에서 검증 가능.
    // → 이미 STEP_42 가 ProgressBar X/9 박음. 검증 skip OK.

    await page.screenshot({ path: path.join(OUT, "02_contact_form.png"), fullPage: true });

    // 8. fbq 호출 로그 분석
    await page.waitForTimeout(500);
    const allCalls = fbqCalls.map(c => c[0] === "track" || c[0] === "trackCustom" ? `${c[0]}:${c[1]}` : c[0]);
    const uniq = [...new Set(allCalls)];
    console.log(`\nfbq 호출 (${allCalls.length} 회):`);
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

    // Lead 는 제출 후. 시뮬레이션 X (api 호출 없음, 사장 데이터 X). skip.

    const ok = pixelScriptCount === 1 && fbqAvailable && heroCtaCount === 1 && softCopy >= 1 && missing.length === 0;
    console.log(`\n${ok ? "✅ 검증 통과" : "❌ 검증 실패"}`);
    console.log(`📁 캡처: ${OUT}/`);

    await browser.close();
    process.exit(ok ? 0 : 1);
})();
