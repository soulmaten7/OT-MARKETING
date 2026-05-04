// STEP_62 — ot-marketing.kr/ads 6 업종 × 6 매체 = 36 매트릭스 이미지 매핑 검증
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = process.env.BASE_URL || "http://localhost:3000/ads";
const OUT = path.resolve(__dirname, "../_captures_step62");
fs.mkdirSync(OUT, { recursive: true });

const INDUSTRY_TABS = [
    { id: "debt-relief", prefix: "DR" },
    { id: "rental",      prefix: "WR" },
    { id: "broadband",   prefix: "BB" },
    { id: "invest",      prefix: "IL" },
    { id: "realestate",  prefix: "RE" },
    { id: "medical",     prefix: "MD" },
];

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on("response", res => {
        if (res.url().includes("ads-creatives") && res.status() >= 400) {
            errors.push(`HTTP ${res.status()} - ${res.url()}`);
        }
    });

    console.log(`🚀 ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    const summary = [];
    for (const ind of INDUSTRY_TABS) {
        // 업종 탭 클릭 (data-testid 또는 text 기반)
        const tab = page.locator(`button:has-text("${
            ind.id === "debt-relief" ? "개인회생" :
            ind.id === "rental"      ? "렌탈" :
            ind.id === "broadband"   ? "통신" :
            ind.id === "invest"      ? "리딩" :
            ind.id === "realestate"  ? "부동산" :
            "병의원"
        }")`);
        try {
            await tab.first().click({ timeout: 5000 });
            await page.waitForTimeout(800);
        } catch {
            console.log(`  ⚠️ ${ind.id} 탭 클릭 실패 (디폴트만 검증)`);
        }

        // 6 매체 이미지 src 수집
        const imgSrcs = await page.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll("img"));
            return imgs
                .map(i => {
                    const raw = i.currentSrc || i.src || "";
                    const m = raw.match(/[?&]url=([^&]+)/);
                    return m ? decodeURIComponent(m[1]) : raw;
                })
                .filter(s => s.includes("ads-creatives"));
        });

        const matched = imgSrcs.filter(s => s.includes(`${ind.prefix}-`));
        console.log(`  ${ind.id} (${ind.prefix}): ${matched.length} 이미지 매칭`);
        matched.forEach(m => {
            const fname = m.split("/").pop();
            console.log(`    - ${fname}`);
        });
        summary.push({ industry: ind.id, prefix: ind.prefix, count: matched.length });

        // 캡처
        await page.screenshot({ path: path.join(OUT, `${ind.id}.png`), fullPage: false });
    }

    console.log("\n=== 종합 ===");
    summary.forEach(s => console.log(`  ${s.industry}: ${s.count} 이미지 (${s.prefix} 접두)`));
    if (errors.length > 0) {
        console.log("\n❌ 네트워크 에러:");
        errors.forEach(e => console.log("  ", e));
    } else {
        console.log("\n✅ 네트워크 에러 0");
    }

    // 검증: 각 업종 ≥ 6 매칭 (6 매체)
    const allOk = summary.every(s => s.count >= 6) && errors.length === 0;
    console.log(`\n${allOk ? "✅ 36 매트릭스 모두 매칭" : "❌ 일부 업종 매칭 부족"}`);
    console.log(`📁 캡처: ${OUT}/`);

    await browser.close();
    process.exit(allOk ? 0 : 1);
})();
