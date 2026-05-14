import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();

    const checks = [];

    // ── Test 1: /signup 페이지 = 디자인 시스템 적용 ─────────────────
    await page.goto(`${BASE}/signup`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(800);

    const signupTitle = await page.locator("h1").first().textContent().catch(() => "");
    const hasStartText = signupTitle?.includes("시작") || (await page.locator("text=시작하기").count()) > 0;
    const hasFunnelMsg = await page.locator("p:has-text('블로그문자')").first().isVisible().catch(() => false);
    checks.push({
        name: "1. /signup 헤더 '시작하기' 노출",
        pass: hasStartText,
        actual: `h1: "${signupTitle}"`,
    });
    checks.push({
        name: "2. /signup 깔때기 메시지 (블로그문자 무료 안내) 노출",
        pass: hasFunnelMsg,
        actual: `블로그문자 visible = ${hasFunnelMsg}`,
    });

    // 디자인 시스템 버튼 class
    const submitBtn = page.locator("button[type='submit']").first();
    const btnClass = await submitBtn.getAttribute("class").catch(() => "");
    const hasPrimaryClass = btnClass?.includes("bg-primary-500") ?? false;
    checks.push({
        name: "3. /signup CTA = bg-primary-500 (토스 블루 디자인 시스템)",
        pass: hasPrimaryClass,
        actual: `class: ${btnClass?.slice(0, 60)}`,
    });

    // ── Test 4: /login 페이지 렌더링 ────────────────────────────────
    await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(500);

    const loginH1 = await page.locator("h1").first().textContent().catch(() => "");
    const hasLoginText = loginH1?.includes("로그인") || loginH1?.includes("오셨") || false;
    checks.push({
        name: "4. /login 페이지 렌더링 (h1 확인)",
        pass: hasLoginText,
        actual: `h1: "${loginH1}"`,
    });

    // ── Test 5: 미인증 시 /dashboard → /login redirect ───────────────
    // 새 context (쿠키 없음 = 미인증)
    const anonCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const anonPage = await anonCtx.newPage();

    await anonPage.goto(`${BASE}/dashboard`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await anonPage.waitForTimeout(500);

    const dashboardUrl = anonPage.url();
    const redirectedToLogin = dashboardUrl.includes("/login");
    checks.push({
        name: "5. 미인증 /dashboard → /login redirect",
        pass: redirectedToLogin,
        actual: `redirected to: ${dashboardUrl}`,
    });

    // ── Test 6: 옛 /blog-sms/signup → /signup redirect ──────────────
    await anonPage.goto(`${BASE}/blog-sms/signup`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await anonPage.waitForTimeout(500);

    const blogSmsSignupUrl = anonPage.url();
    const redirectedToSignup = blogSmsSignupUrl.includes("/signup");
    checks.push({
        name: "6. 옛 /blog-sms/signup → /signup redirect",
        pass: redirectedToSignup,
        actual: `redirected to: ${blogSmsSignupUrl}`,
    });

    await anonCtx.close();
    await browser.close();

    // ── 결과 출력 ────────────────────────────────────────────────────
    console.log("\n========== STEP_96 DOM 검증 ==========");
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
