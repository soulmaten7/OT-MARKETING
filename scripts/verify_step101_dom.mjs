import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();

    const checks = [];

    // pre-warm
    await page.goto(`${BASE}/pricing`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1000);

    // ── Test 1: Hero h1 + "구독형 랜딩페이지" 노출 ──────────────────
    const h1Text = await page.locator("h1").first().textContent().catch(() => "");
    const hasLanding = (await page.locator("text=구독형 랜딩페이지").count()) > 0;
    checks.push({
        name: "1. Hero h1 + '구독형 랜딩페이지' 노출",
        pass: (h1Text?.length ?? 0) > 0 && hasLanding,
        actual: `h1: "${h1Text?.slice(0, 50)}", 구독형=${hasLanding}`,
    });

    // ── Test 2: 가격 placeholder "/월" 노출 ─────────────────────────
    const hasPerMonth = (await page.locator("text=/월").count()) > 0;
    checks.push({
        name: "2. 가격 placeholder '/월' 노출",
        pass: hasPerMonth,
        actual: `/월 count = ${await page.locator("text=/월").count()}`,
    });

    // ── Test 3: 블로그문자 ₩0 노출 ──────────────────────────────────
    const hasBlogSms = (await page.locator("text=블로그문자").count()) > 0;
    const hasZeroWon = (await page.locator("text=₩0").count()) > 0;
    checks.push({
        name: "3. 블로그문자 무료 (₩0) 카드",
        pass: hasBlogSms && hasZeroWon,
        actual: `블로그문자=${hasBlogSms}, ₩0=${hasZeroWon}`,
    });

    // ── Test 4: CPA 광고 + 건당 정산 / 맞춤 견적 ────────────────────
    const hasCpa = (await page.locator("text=CPA 광고").count()) > 0;
    const hasPerCase =
        (await page.locator("text=건당 정산").count()) > 0 ||
        (await page.locator("text=맞춤 견적").count()) > 0;
    checks.push({
        name: "4. CPA 광고 건당 정산 / 맞춤 견적 카드",
        pass: hasCpa && hasPerCase,
        actual: `CPA=${hasCpa}, 건당/맞춤=${hasPerCase}`,
    });

    // ── Test 5: FAQ "구독료" 또는 "결제" 항목 ───────────────────────
    const hasFaq =
        (await page.locator("text=구독료").count()) > 0 ||
        (await page.locator("text=결제").count()) > 0;
    checks.push({
        name: "5. FAQ '구독료'/'결제' 항목 노출",
        pass: hasFaq,
        actual: `구독료/결제 count = ${(await page.locator("text=구독료").count()) + (await page.locator("text=결제").count())}`,
    });

    // ── Test 6: /signup 링크 + bg-primary-500 ───────────────────────
    const signupLinks = await page.locator('a[href="/signup"]').count();
    const firstLink = page.locator('a[href="/signup"]').first();
    const linkClass = await firstLink.getAttribute("class").catch(() => "");
    const hasPrimary = linkClass?.includes("bg-primary-500") ?? false;
    checks.push({
        name: "6. /signup 링크 + bg-primary-500 디자인 시스템",
        pass: signupLinks > 0 && hasPrimary,
        actual: `signup links=${signupLinks}, bg-primary-500=${hasPrimary}`,
    });

    // ── Test 7: landing-pages 에서 "요금제 보기" → /pricing ─────────
    const lpPage = await ctx.newPage();
    await lpPage.goto(`${BASE}/landing-pages`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await lpPage.waitForTimeout(500);
    const pricingLinks = await lpPage.locator('a[href="/pricing"]').count();
    checks.push({
        name: "7. landing-pages '요금제 보기' → /pricing (404 해결)",
        pass: pricingLinks > 0,
        actual: `a[href="/pricing"] on /landing-pages = ${pricingLinks}`,
    });
    await lpPage.close();

    await ctx.close();
    await browser.close();

    // ── 결과 출력 ────────────────────────────────────────────────────
    console.log("\n========== STEP_101 DOM 검증 ==========");
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
