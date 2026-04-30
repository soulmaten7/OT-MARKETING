#!/usr/bin/env node
/**
 * STEP_31 Playwright DOM 검증
 *
 * 6 업종 × 6 매체 = 36 mockup 의 헤드라인+본문 카피가 실제 DOM 에 박혀있는지
 * 자동 검증. data/copy-swap-log.json 과 1:1 대조.
 *
 * 1건 불일치도 빌드 실패 → exit 1.
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3717";
const log = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/copy-swap-log.json"), "utf-8")
);

const INDUSTRIES = [
    { id: "debt-relief", name: "개인회생" },
    { id: "rental",      name: "렌탈" },
    { id: "broadband",   name: "통신" },
    { id: "invest",      name: "리딩" },
    { id: "realestate",  name: "부동산" },
    { id: "medical",     name: "병의원" },
];

(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();

    const failures = [];
    const successes = [];

    console.log(`Loading ${BASE}/ads ...`);
    await page.goto(`${BASE}/ads`, { waitUntil: "networkidle" });

    for (const ind of INDUSTRIES) {
        // industry 탭 클릭
        const tabSel = `button:has-text("${ind.name}")`;
        const tab = page.locator(tabSel).first();
        if (await tab.count() === 0) {
            failures.push({ ind: ind.id, error: `industry tab "${ind.name}" 미발견` });
            continue;
        }
        await tab.click();
        await page.waitForTimeout(450); // AnimatePresence transition

        // "전체" 채널 보장 (6 mockup 모두 visible)
        const allChannelTab = page.locator('button:has-text("전체")').first();
        if (await allChannelTab.count() > 0) {
            await allChannelTab.click();
            await page.waitForTimeout(350);
        }

        // 해당 industry 의 6 매핑
        const mappings = log.mappings.filter((m) => m.industry === ind.id);

        for (const m of mappings) {
            const text = await page.locator("body").innerText();
            const hasH = text.includes(m.headline);
            const hasB = text.includes(m.body);
            if (hasH && hasB) {
                successes.push({ industry: m.industry, channel: m.channel });
            } else {
                failures.push({
                    industry: m.industry,
                    channel: m.channel,
                    headline: m.headline,
                    body: m.body,
                    hasHeadline: hasH,
                    hasBody: hasB,
                });
            }
        }
    }

    await browser.close();

    console.log("=".repeat(60));
    console.log("STEP_31 Playwright DOM 검증 결과");
    console.log("=".repeat(60));
    console.log(`총: ${log.mappings.length}`);
    console.log(`통과: ${successes.length}`);
    console.log(`실패: ${failures.length}`);

    if (failures.length > 0) {
        console.log("\n=== 실패 상세 ===");
        for (const f of failures) {
            console.log(`\n[${f.industry} × ${f.channel}]`);
            if (f.error) console.log(`  ${f.error}`);
            else {
                console.log(`  헤드라인 "${f.headline}" → ${f.hasHeadline ? "✅" : "❌"}`);
                console.log(`  본문    "${f.body}" → ${f.hasBody ? "✅" : "❌"}`);
            }
        }
        process.exit(1);
    }

    console.log("\n✅ 36/36 모두 DOM 에 박힘 (Playwright headless 검증 통과)");
})().catch((e) => {
    console.error("Playwright 실행 실패:", e.message);
    process.exit(2);
});
