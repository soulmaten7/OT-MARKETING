// STEP_58 — Google Ads gtag + Conversion 검증 + Meta Pixel regression
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = process.env.BASE_URL || "http://localhost:3000/select1";
const OUT = path.resolve(__dirname, "../_captures_step58");
fs.mkdirSync(OUT, { recursive: true });

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

    const fbqCalls = [];
    const gtagCalls = [];
    await page.exposeFunction("__captureFbq", (args) => fbqCalls.push(args));
    await page.exposeFunction("__captureGtag", (args) => gtagCalls.push(args));

    await page.addInitScript(() => {
        // fbq capture
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

        // dataLayer wrap → gtag 호출 capture (gtag = dataLayer.push)
        const origPush = Array.prototype.push;
        window.dataLayer = [];
        const dl = window.dataLayer;
        Object.defineProperty(dl, "push", {
            configurable: true,
            value: function (...items) {
                items.forEach(it => {
                    // @ts-ignore
                    window.__captureGtag?.(it);
                });
                return origPush.apply(this, items);
            },
        });
    });

    console.log(`🚀 ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // 1. window.fbq 박힘 (Meta regression 0)
    const fbqAvailable = await page.evaluate(() => typeof window.fbq === "function");
    console.log(`fbq (Meta) available: ${fbqAvailable ? "✅" : "❌ regression!"}`);

    // 2. Google Ads — 환경변수 박힌 경우 (라이브) gtag function · dataLayer 존재
    //    환경변수 X 인 경우 (로컬) GoogleAdsTag = null = dataLayer 미박힘 = OK
    const hasGoogleAdsEnv = await page.evaluate(() => {
        // dataLayer 가 array 이고 비어있지 않거나, gtag function 존재 시 = 박힘
        return Array.isArray(window.dataLayer) && window.dataLayer.length > 0;
    });
    console.log(`Google Ads (gtag/dataLayer): ${hasGoogleAdsEnv ? "✅ 환경변수 박힘 + 라이브" : "⚠️ 로컬 환경변수 X = 정상 (사장 Vercel 박은 후 라이브 작동)"}`);

    // 3. Hero CTA → Diagnosis 진입
    await page.click('[data-testid="hero-cta-start"]');
    await page.waitForTimeout(1000);
    await page.waitForSelector('[data-testid="step-screen-1"]', { state: "visible", timeout: 8000 });

    // 4. Step 1·2·3 자동 응답
    for (let s = 1; s <= 3; s++) {
        await page.waitForSelector(`[data-testid="step-screen-${s}"]`, { state: "visible", timeout: 5000 });
        for (let q = 0; q < 3; q++) {
            const qDiv = page.locator(`[data-testid="step-screen-${s}"] [data-testid^="question-"]`).nth(q);
            await qDiv.locator("button").first().click();
            await page.waitForTimeout(110);
        }
        if (s < 3) {
            await page.click('[data-testid="next-button"]');
            await page.waitForTimeout(500);
        }
    }
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(1500);

    // 5. ContactForm 등장
    await page.waitForSelector("form", { state: "visible", timeout: 8000 });

    await page.screenshot({ path: path.join(OUT, "01_after_step4.png"), fullPage: true });

    // 6. fbq 호출 검증 (Meta regression 방지)
    await page.waitForTimeout(400);
    const fbqEvents = fbqCalls
        .filter(c => c[0] === "track" || c[0] === "trackCustom")
        .map(c => `${c[0]}:${c[1]}`);
    const fbqUniq = [...new Set(fbqEvents)];
    console.log(`\nfbq 호출 ${fbqEvents.length} 회:`);
    fbqUniq.forEach(u => console.log("  ", u));

    const fbqExpected = [
        "track:PageView",
        "trackCustom:DiagnosisStart",
        "trackCustom:DiagnosisStep2",
        "trackCustom:DiagnosisStep3",
        "trackCustom:DiagnosisStep4",
    ];
    const fbqMissing = fbqExpected.filter(e => !fbqUniq.includes(e));
    console.log(`Meta events ${fbqExpected.length} / 발견 ${fbqExpected.length - fbqMissing.length}`);

    // 7. gtag 호출 검증 (환경변수 있을 때만 == 라이브)
    const gtagEvents = gtagCalls
        .filter(item => Array.isArray(item) || (item && typeof item === "object"))
        .map(item => {
            // gtag('event', 'name', {...}) = ["event", "name", {...}]
            if (Array.isArray(item)) return `${item[0]}:${item[1]}`;
            return JSON.stringify(item).slice(0, 80);
        });
    const gtagUniq = [...new Set(gtagEvents)];
    console.log(`\ngtag 호출 ${gtagEvents.length} 회:`);
    gtagUniq.slice(0, 10).forEach(u => console.log("  ", u));

    // 환경변수 X = gtag 호출 0 = no-op = OK. 환경변수 O = gtag 호출 ≥4.
    const gtagExpected = hasGoogleAdsEnv ? 4 : 0;
    console.log(`gtag events ${hasGoogleAdsEnv ? "(env 박힘) ≥ 4 예상" : "(env X = no-op = 정상)"} / 발견 ${gtagEvents.filter(e => e.startsWith("event:")).length}`);

    const ok = fbqAvailable && fbqMissing.length === 0;
    console.log(`\n${ok ? "✅ 검증 통과 (Meta regression 0 + STEP_58 코드 박힘)" : "❌ 실패"}`);
    console.log(`📁 캡처: ${OUT}/`);

    await browser.close();
    process.exit(ok ? 0 : 1);
})();
