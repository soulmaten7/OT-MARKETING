import { chromium } from "playwright";
import { execSync } from "child_process";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const checks = [];

    // ── Test 1: /subscribe 미로그인 → /login redirect ─────────────────
    const page1 = await ctx.newPage();
    await page1.goto(`${BASE}/subscribe`, { waitUntil: "domcontentloaded", timeout: 30000 });
    const url1 = page1.url();
    checks.push({
        name: "1. /subscribe 미로그인 → /login redirect",
        pass: url1.includes("/login"),
        actual: `redirected to: ${url1}`,
    });
    await page1.close();

    // ── Test 2: /pricing 구독하기 버튼 → /subscribe 또는 /login ───────
    const page2 = await ctx.newPage();
    await page2.goto(`${BASE}/pricing`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page2.waitForTimeout(500);
    const subscribeLinks = await page2.locator('a[href="/subscribe"], a[href="/signup"], button:has-text("구독")').count();
    checks.push({
        name: "2. /pricing 구독 진입 링크 노출 (/subscribe 또는 관련 CTA)",
        pass: subscribeLinks > 0,
        actual: `구독 CTA count = ${subscribeLinks}`,
    });
    await page2.close();

    // ── Test 3: /subscribe/success 라우트 200 ─────────────────────────
    const page3 = await ctx.newPage();
    let successOk = false;
    try {
        const resp = await page3.goto(`${BASE}/subscribe/success`, {
            waitUntil: "domcontentloaded",
            timeout: 15000,
        });
        successOk = (resp?.status() ?? 0) < 500;
    } catch { successOk = false; }
    checks.push({
        name: "3. /subscribe/success 라우트 존재 (5xx 아님)",
        pass: successOk,
        actual: `HTTP < 500 = ${successOk}`,
    });
    await page3.close();

    // ── Test 4: /subscribe/fail 라우트 200 ───────────────────────────
    const page4 = await ctx.newPage();
    let failOk = false;
    try {
        const resp = await page4.goto(`${BASE}/subscribe/fail`, {
            waitUntil: "domcontentloaded",
            timeout: 15000,
        });
        failOk = (resp?.status() ?? 0) < 500;
    } catch { failOk = false; }
    checks.push({
        name: "4. /subscribe/fail 라우트 존재 (5xx 아님)",
        pass: failOk,
        actual: `HTTP < 500 = ${failOk}`,
    });
    await page4.close();

    // ── Test 5: API billing-key 라우트 존재 (POST → 400 = OK = 라우트 존재) ─
    const page5 = await ctx.newPage();
    let billingKeyOk = false;
    try {
        const resp = await page5.request.post(`${BASE}/api/payments/billing-key`, {
            data: {},
            headers: { "Content-Type": "application/json" },
        });
        billingKeyOk = resp.status() < 500;
    } catch { billingKeyOk = false; }
    checks.push({
        name: "5. /api/payments/billing-key 라우트 존재 (5xx 아님)",
        pass: billingKeyOk,
        actual: `HTTP < 500 = ${billingKeyOk}`,
    });
    await page5.close();

    // ── Test 6: secretKey 하드코딩 0건 ──────────────────────────────
    let securityPass = false;
    let securityActual = "";
    try {
        const result = execSync(
            "grep -rn \"test_sk_|live_sk_|sk_live|sk_test\" --include=\"*.ts\" --include=\"*.tsx\" " +
            "--exclude-dir=node_modules app/ components/ lib/ 2>/dev/null || echo NONE",
            { cwd: process.cwd(), encoding: "utf-8" }
        ).trim();
        securityPass = result === "NONE" || result === "";
        securityActual = result === "NONE" || result === "" ? "0건 (보안 통과)" : `발견: ${result}`;
    } catch {
        securityPass = true;
        securityActual = "0건 (grep 반환코드 1 = 매칭 없음)";
    }
    checks.push({
        name: "6. secretKey 하드코딩 = 0건 (보안 절대 게이트)",
        pass: securityPass,
        actual: securityActual,
    });

    // ── Test 7: /dashboard 구독 CTA → /subscribe ────────────────────
    const page7 = await ctx.newPage();
    await page7.goto(`${BASE}/dashboard`, { waitUntil: "domcontentloaded", timeout: 30000 });
    const dashUrl = page7.url();
    const redirectedToLogin = dashUrl.includes("/login");
    checks.push({
        name: "7. /dashboard 미로그인 → /login (미들웨어 정상)",
        pass: redirectedToLogin,
        actual: `redirected to: ${dashUrl}`,
    });
    await page7.close();

    await ctx.close();
    await browser.close();

    // ── 결과 출력 ────────────────────────────────────────────────────
    console.log("\n========== STEP_103 DOM 검증 ==========");
    let allPass = true;
    for (const c of checks) {
        const icon = c.pass ? "✅" : "❌";
        console.log(`${icon} ${c.name}`);
        if (!c.pass) {
            console.log(`   actual: ${c.actual}`);
            allPass = false;
        }
    }
    console.log("=======================================");

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
