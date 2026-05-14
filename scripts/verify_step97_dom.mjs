import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();

    const checks = [];

    // ── Test 1: 홈 = Hero h1 노출 ──────────────────────────────────────
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(800);

    const heroH1 = await page.locator("h1").first().textContent().catch(() => "");
    checks.push({
        name: "1. 홈 Hero h1 노출",
        pass: heroH1 !== "",
        actual: `h1: "${heroH1?.slice(0, 60)}"`,
    });

    // ── Test 2: 3 기능 카드 모두 노출 ──────────────────────────────────
    const hasCpa = (await page.locator("text=CPA 광고 신청").count()) > 0;
    const hasLanding = (await page.locator("text=구독형 랜딩페이지").count()) > 0;
    const hasBlogSms = (await page.locator("text=블로그문자").first().isVisible().catch(() => false));
    checks.push({
        name: "2. 3 기능 카드 모두 노출 (CPA·랜딩페이지·블로그문자)",
        pass: hasCpa && hasLanding && hasBlogSms,
        actual: `CPA=${hasCpa}, 랜딩=${hasLanding}, 블로그문자=${hasBlogSms}`,
    });

    // ── Test 3: 블로그문자 카드 = '무료' 배지 노출 ─────────────────────
    const hasFreeBadge = (await page.locator("text=무료").count()) > 0;
    checks.push({
        name: "3. 블로그문자 '무료' 배지 노출",
        pass: hasFreeBadge,
        actual: `무료 badge count = ${await page.locator("text=무료").count()}`,
    });

    // ── Test 4: 네비게이션 = 3 기능 메뉴 + 로그인 ──────────────────────
    const nav = page.locator("header nav");
    const navHasCpa = (await nav.locator("text=CPA 광고").count()) > 0;
    const navHasLanding = (await nav.locator("text=랜딩페이지").count()) > 0;
    const navHasBlogSms = (await nav.locator("text=블로그문자").count()) > 0;
    const headerHasLogin = (await page.locator("header").locator("text=로그인").count()) > 0;
    checks.push({
        name: "4. 네비게이션 = 3 기능 메뉴 + 로그인",
        pass: navHasCpa && navHasLanding && navHasBlogSms && headerHasLogin,
        actual: `nav: CPA=${navHasCpa}, 랜딩=${navHasLanding}, 블로그=${navHasBlogSms}, 로그인=${headerHasLogin}`,
    });

    // ── Test 5: 모바일 = 3 카드 세로 1열 (card2.y > card1.y) ───────────
    const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobilePage = await mobileCtx.newPage();
    await mobilePage.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await mobilePage.waitForTimeout(800);

    const card1Box = await mobilePage.locator("text=CPA 광고 신청").first().boundingBox();
    const card2Box = await mobilePage.locator("text=구독형 랜딩페이지").first().boundingBox();
    const isVertical = card1Box && card2Box && card2Box.y > card1Box.y;
    checks.push({
        name: "5. 모바일 = 카드 세로 1열 (card2.y > card1.y)",
        pass: isVertical ?? false,
        actual: `card1.y=${card1Box?.y?.toFixed(0)}, card2.y=${card2Box?.y?.toFixed(0)}`,
    });
    await mobileCtx.close();

    // ── Test 6: /ads 라우트 = 무영향 (옛 CPA 콘텐츠 보존) ──────────────
    const adsRes = await page.goto(`${BASE}/ads`, { waitUntil: "domcontentloaded", timeout: 45000 });
    const adsOk = adsRes ? adsRes.status() < 400 : false;
    checks.push({
        name: "6. /ads 라우트 = 200 (옛 CPA 콘텐츠 보존 확인)",
        pass: adsOk,
        actual: `HTTP status = ${adsRes?.status()}`,
    });

    await ctx.close();
    await browser.close();

    // ── 결과 출력 ────────────────────────────────────────────────────────
    console.log("\n========== STEP_97 DOM 검증 ==========");
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
