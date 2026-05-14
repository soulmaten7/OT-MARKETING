import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();

    const checks = [];

    // pre-warm
    await page.goto(`${BASE}/blog-sms`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1000);

    // ── Test 1: Hero h1 + "무료" 노출 ───────────────────────────────
    const h1Text = await page.locator("h1").first().textContent().catch(() => "");
    const hasFree = (await page.locator("text=무료").count()) > 0;
    checks.push({
        name: "1. Hero = h1 노출 + '무료' 포함",
        pass: (h1Text?.length ?? 0) > 0 && hasFree,
        actual: `h1: "${h1Text?.slice(0, 60)}", 무료=${hasFree}`,
    });

    // ── Test 2: /signup 링크 존재 ────────────────────────────────────
    const signupLinks = await page.locator('a[href="/signup"]').count();
    checks.push({
        name: "2. '무료로 시작하기' = /signup 링크",
        pass: signupLinks > 0,
        actual: `a[href="/signup"] count = ${signupLinks}`,
    });

    // ── Test 3: 구독형 랜딩페이지 업셀 CTA (/landing-pages) ─────────
    const upsellLink = await page.locator('a[href="/landing-pages"]:has-text("구독형 랜딩페이지")').count();
    checks.push({
        name: "3. 업셀 CTA = '구독형 랜딩페이지' → /landing-pages",
        pass: upsellLink > 0,
        actual: `업셀 링크 count = ${upsellLink}`,
    });

    // ── Test 4: 디자인 시스템 적용 (bg-primary-500) ──────────────────
    const firstSignupLink = page.locator('a[href="/signup"]').first();
    const linkClass = await firstSignupLink.getAttribute("class").catch(() => "");
    const hasPrimaryClass = linkClass?.includes("bg-primary-500") ?? false;
    checks.push({
        name: "4. 디자인 시스템 = bg-primary-500 (토스 블루)",
        pass: hasPrimaryClass,
        actual: `class includes bg-primary-500 = ${hasPrimaryClass}`,
    });

    // ── Test 5: /blog-sms/guide 무영향 렌더링 ───────────────────────
    const guidePage = await ctx.newPage();
    let guideOk = false;
    try {
        const resp = await guidePage.goto(`${BASE}/blog-sms/guide`, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
        });
        guideOk = (resp?.status() ?? 0) < 400;
    } catch {
        guideOk = false;
    }
    await guidePage.close();
    checks.push({
        name: "5. /blog-sms/guide 무영향 (옛 기능 보존)",
        pass: guideOk,
        actual: `HTTP status < 400 = ${guideOk}`,
    });

    // ── Test 6: /blog-sms/faq 무영향 렌더링 ─────────────────────────
    const faqPage = await ctx.newPage();
    let faqOk = false;
    try {
        const resp = await faqPage.goto(`${BASE}/blog-sms/faq`, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
        });
        faqOk = (resp?.status() ?? 0) < 400;
    } catch {
        faqOk = false;
    }
    await faqPage.close();
    checks.push({
        name: "6. /blog-sms/faq 무영향 (옛 기능 보존)",
        pass: faqOk,
        actual: `HTTP status < 400 = ${faqOk}`,
    });

    // ── Test 7: 미인증 /blog-sms/dashboard → /login ──────────────────
    const anonCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const anonPage = await anonCtx.newPage();
    await anonPage.goto(`${BASE}/blog-sms/dashboard`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
    });
    await anonPage.waitForTimeout(500);
    const redirectedUrl = anonPage.url();
    const redirectOk = redirectedUrl.includes("/login");
    checks.push({
        name: "7. 미인증 /blog-sms/dashboard → /login redirect",
        pass: redirectOk,
        actual: `redirected to: ${redirectedUrl}`,
    });
    await anonCtx.close();

    await ctx.close();
    await browser.close();

    // ── 결과 출력 ────────────────────────────────────────────────────
    console.log("\n========== STEP_100 DOM 검증 ==========");
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
