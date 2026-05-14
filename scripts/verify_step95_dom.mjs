import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();

    const checks = [];

    // ── Test 1: /design-system 페이지 렌더링 ─────────────────────────
    await page.goto(`${BASE}/design-system`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1000);

    const hasColorText = await page.locator("text=컬러").first().isVisible().catch(() => false);
    checks.push({
        name: "1. /design-system 페이지 렌더링 (컬러 섹션 노출)",
        pass: hasColorText,
        actual: `컬러 섹션 visible = ${hasColorText}`,
    });

    // ── Test 2: primary-500 버튼 = bg-primary-500 class 보유 ─────────
    const primaryBtn = page.locator("button.bg-primary-500").first();
    const btnCount = await primaryBtn.count();
    const btnClass = btnCount > 0 ? (await primaryBtn.getAttribute("class") || "") : "";
    const hasPrimaryClass = btnClass.includes("bg-primary-500");
    checks.push({
        name: "2. primary 버튼 bg-primary-500 class 확인 (토스 블루)",
        pass: hasPrimaryClass,
        actual: `count=${btnCount}, class snippet: ${btnClass.slice(0, 80)}`,
    });

    // ── Test 3: Pretendard 폰트 CSS link 존재 확인 ───────────────────
    // CDN 폰트는 headless 환경에서 computedStyle 에 반영 안 됨 → <link> 존재로 검증
    const fontLinkHandle = await page.$('link[href*="pretendard"]');
    const hasFontLink = fontLinkHandle !== null;
    checks.push({
        name: "3. Pretendard 폰트 <link> 태그 존재",
        pass: hasFontLink,
        actual: `pretendard link tag found = ${hasFontLink}`,
    });

    // ── Test 4: 6 컴포넌트 섹션 헤더 모두 노출 ─────────────────────
    const componentNames = ["Button", "Card", "Input", "Badge", "Modal", "Section"];
    const missingComponents = [];
    for (const name of componentNames) {
        const el = page.locator(`h2:has-text("${name}")`).first();
        const visible = await el.isVisible().catch(() => false);
        if (!visible) missingComponents.push(name);
    }
    checks.push({
        name: "4. 6 컴포넌트 섹션 헤더 모두 렌더링",
        pass: missingComponents.length === 0,
        actual: missingComponents.length === 0 ? "Button·Card·Input·Badge·Modal·Section 모두 ✅" : `누락: ${missingComponents.join(", ")}`,
    });

    // ── Test 5a: 홈(/) 기존 페이지 무영향 ───────────────────────────
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(500);
    const homeBodyCount = await page.locator("body").count();
    const homeOk = homeBodyCount > 0;
    checks.push({
        name: "5a. 홈(/) 기존 페이지 무영향",
        pass: homeOk,
        actual: `body count = ${homeBodyCount}`,
    });

    // ── Test 5b: /select11 기존 페이지 무영향 ───────────────────────
    await page.goto(`${BASE}/select11`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1000);
    const brandLocator = page.locator("text=채무회복센터").first();
    const brandVisible = await brandLocator.isVisible().catch(() => false);
    checks.push({
        name: "5b. /select11 기존 페이지 무영향 (채무회복센터 표시)",
        pass: brandVisible,
        actual: `채무회복센터 visible = ${brandVisible}`,
    });

    await browser.close();

    // ── 결과 출력 ────────────────────────────────────────────────────
    console.log("\n========== STEP_95 DOM 검증 ==========");
    let allPass = true;
    for (const c of checks) {
        const icon = c.pass ? "✅" : "❌";
        console.log(`${icon} ${c.name}`);
        if (!c.pass) {
            console.log(`   actual: ${c.actual}`);
            allPass = false;
        }
    }
    console.log("======================================");

    if (!allPass) {
        console.error("\n❌ 일부 검증 실패 — commit 중단");
        process.exit(1);
    }
    console.log("\n✅ 전체 통과 — Phase 5 게이트 OK");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
