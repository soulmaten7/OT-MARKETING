import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();

    const checks = [];

    // pre-warm
    await page.goto(`${BASE}/landing-pages`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1000);

    // ── Test 1: Hero + h1 + "5분" 노출 ─────────────────────────────
    const h1Text = await page.locator("h1").first().textContent().catch(() => "");
    const has5min = (await page.locator("text=5분").count()) > 0;
    checks.push({
        name: "1. Hero = h1 노출 + '5분' 포함",
        pass: (h1Text?.length ?? 0) > 0 && has5min,
        actual: `h1: "${h1Text?.slice(0, 60)}", 5분=${has5min}`,
    });

    // ── Test 2: 작동 방식 3단계 ──────────────────────────────────────
    const hasStep1 = (await page.locator("text=업종 선택").count()) > 0;
    const hasStep2 = (await page.locator("text=정보 입력").count()) > 0;
    const hasStep3 = (await page.locator("text=DB 수집").count()) > 0;
    checks.push({
        name: "2. 작동 방식 3단계 (업종 선택 / 정보 입력 / DB 수집)",
        pass: hasStep1 && hasStep2 && hasStep3,
        actual: `업종선택=${hasStep1}, 정보입력=${hasStep2}, DB수집=${hasStep3}`,
    });

    // ── Test 3: 업종 6개 갤러리 (ACTIVE 1 + PLACEHOLDER 5) ──────────
    const hasDebt = (await page.locator("text=개인회생").count()) > 0;
    const hasRental = (await page.locator("text=정수기").count()) > 0;
    const hasMedical = (await page.locator("text=의료").count()) > 0;
    const hasReadyBadge = (await page.locator("text=준비 중").count()) > 0;
    checks.push({
        name: "3. 업종 6개 갤러리 (개인회생 ACTIVE + 정수기·의료 PLACEHOLDER + '준비 중' 배지)",
        pass: hasDebt && hasRental && hasMedical && hasReadyBadge,
        actual: `개인회생=${hasDebt}, 정수기=${hasRental}, 의료=${hasMedical}, 준비중=${hasReadyBadge}`,
    });

    // ── Test 4: FAQ = '구독료' 노출 ──────────────────────────────────
    const hasFaq = (await page.locator("text=구독료").count()) > 0;
    checks.push({
        name: "4. FAQ '구독료' 항목 노출",
        pass: hasFaq,
        actual: `구독료 count = ${await page.locator("text=구독료").count()}`,
    });

    // ── Test 5: 구독 CTA = /signup 링크 존재 ─────────────────────────
    const signupLinks = await page.locator('a[href="/signup"]').count();
    checks.push({
        name: "5. '무료로 시작하기' = /signup 링크",
        pass: signupLinks > 0,
        actual: `a[href="/signup"] count = ${signupLinks}`,
    });

    // ── Test 6: 디자인 시스템 적용 (bg-primary-500) ──────────────────
    const firstSignupLink = page.locator('a[href="/signup"]').first();
    const linkClass = await firstSignupLink.getAttribute("class").catch(() => "");
    const hasPrimaryClass = linkClass?.includes("bg-primary-500") ?? false;
    checks.push({
        name: "6. 디자인 시스템 = bg-primary-500 (토스 블루)",
        pass: hasPrimaryClass,
        actual: `class includes bg-primary-500 = ${hasPrimaryClass}`,
    });

    // ── Test 7: 308 redirect 유지 (/blog-sms/landing-pre-register → /landing-pages) ─
    const anonCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const anonPage = await anonCtx.newPage();
    await anonPage.goto(`${BASE}/blog-sms/landing-pre-register`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
    });
    await anonPage.waitForTimeout(500);
    const redirectedUrl = anonPage.url();
    const redirectOk = redirectedUrl.includes("/landing-pages");
    checks.push({
        name: "7. /blog-sms/landing-pre-register → /landing-pages redirect 유지",
        pass: redirectOk,
        actual: `redirected to: ${redirectedUrl}`,
    });
    await anonCtx.close();

    await ctx.close();
    await browser.close();

    // ── 결과 출력 ────────────────────────────────────────────────────
    console.log("\n========== STEP_99 DOM 검증 ==========");
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
