// STEP_50 — 6 매체 mockup 이미지 비율 fit 검증
// 1) /ads 페이지 full 캡처
// 2) 매체별 mockup 캡처 (있으면)
// 3) Image src 매핑 정확 검증

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = process.env.BASE_URL || "http://localhost:3000/ads?industry=debt-relief";
const OUT = path.resolve(__dirname, "../_captures_step50");
fs.mkdirSync(OUT, { recursive: true });

const EXPECTED = {
    "DR-011-A.png": "Meta 피드",
    "DR-022-A.png": "당근",
    "DR-016-A.png": "Naver 검색",
    "DR-021-A.png": "카카오 모먼트 (9:16 swap)",
    "DR-014-A.png": "Google GDN",
    "DR-019-A.png": "Google Discovery",
};

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

    const errors = [];
    page.on("response", res => {
        if (res.url().includes("ads-creatives") && res.status() >= 400) {
            errors.push(`HTTP ${res.status()} - ${res.url()}`);
        }
    });

    console.log(`🚀 ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000);

    // full 캡처
    await page.screenshot({ path: path.join(OUT, "step50_ads_full.png"), fullPage: true });

    // 6 매체 src 검증
    const imgSrcs = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        return imgs
            .map(i => {
                const raw = i.currentSrc || i.src || "";
                const m = raw.match(/[?&]url=([^&]+)/);
                return m ? decodeURIComponent(m[1]) : raw;
            })
            .filter(s => s.includes("ads-creatives/01-debt-relief"));
    });

    console.log(`\n📊 발견 이미지 (${imgSrcs.length}):`);
    imgSrcs.forEach(s => {
        const fname = s.split("/").pop();
        const label = EXPECTED[fname] || "❓ 예상 X";
        console.log(`   ${fname} = ${label}`);
    });

    const expectedFiles = Object.keys(EXPECTED);
    const missing = expectedFiles.filter(e => !imgSrcs.some(s => s.includes(e)));
    const extra = imgSrcs
        .map(s => s.split("/").pop())
        .filter(f => !expectedFiles.includes(f));

    console.log(`\n예상 ${expectedFiles.length} / 발견 ${imgSrcs.length} / 누락 ${missing.length} / 예상 X ${extra.length}`);
    if (missing.length > 0) console.log("누락:", missing);
    if (extra.length > 0) console.log("예상 X:", extra);

    if (errors.length > 0) {
        console.log("\n❌ 네트워크 에러:");
        errors.forEach(e => console.log("  ", e));
    } else {
        console.log("\n✅ 네트워크 에러 0");
    }

    const ok = imgSrcs.length >= 6 && missing.length === 0 && errors.length === 0;
    console.log(`\n${ok ? "✅ 검증 통과" : "❌ 검증 실패"}`);
    console.log(`📁 캡처: ${OUT}/step50_ads_full.png`);

    await browser.close();
    process.exit(ok ? 0 : 1);
})();
