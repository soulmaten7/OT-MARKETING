// STEP_47 /ads 개인회생 6 mockup 실 이미지 적용 검증
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = process.env.BASE_URL || "http://localhost:3000/ads?industry=debt-relief";
const OUT_DIR = path.resolve(__dirname, "../_captures_step47");
fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    const errors = [];
    page.on("requestfailed", req => {
        if (req.url().includes("ads-creatives")) errors.push(`${req.failure()?.errorText} - ${req.url()}`);
    });
    page.on("response", res => {
        if (res.url().includes("ads-creatives") && res.status() >= 400) {
            errors.push(`HTTP ${res.status()} - ${res.url()}`);
        }
    });

    console.log(`🚀 ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // 6 이미지 로드 검증 — next/Image 는 src 를 /_next/image?url=... 으로 변환. decodeURI 후 매칭.
    const imgSrcs = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
            .map(i => {
                const raw = i.currentSrc || i.src || "";
                try {
                    // /_next/image?url=%2Fads-creatives... → /ads-creatives/...
                    const m = raw.match(/[?&]url=([^&]+)/);
                    if (m) return decodeURIComponent(m[1]);
                    return raw;
                } catch {
                    return raw;
                }
            })
            .filter(s => s.includes("ads-creatives/01-debt-relief"));
    });

    const expected = [
        "DR-011-A.png",
        "DR-014-A.png",
        "DR-016-A.png",
        "DR-018-A.png",
        "DR-019-A.png",
        "DR-022-A.png",
    ];

    console.log(`\n📊 발견된 이미지 (${imgSrcs.length}):`);
    imgSrcs.forEach(s => console.log("  ", s));

    const missing = expected.filter(e => !imgSrcs.some(s => s.includes(e)));
    console.log(`\n예상 6 / 발견 ${imgSrcs.length} / 누락 ${missing.length}`);
    if (missing.length > 0) console.log("누락:", missing);

    // 네트워크 에러
    if (errors.length > 0) {
        console.log("\n❌ 이미지 네트워크 에러:");
        errors.forEach(e => console.log("  ", e));
    } else {
        console.log("\n✅ 이미지 네트워크 에러 0");
    }

    // 캡처
    await page.screenshot({ path: path.join(OUT_DIR, "ads_debt_relief_grid.png"), fullPage: true });

    const ok = imgSrcs.length >= 6 && missing.length === 0 && errors.length === 0;
    console.log(`\n${ok ? "✅ 검증 통과" : "❌ 검증 실패"}`);

    await browser.close();
    process.exit(ok ? 0 : 1);
})();
