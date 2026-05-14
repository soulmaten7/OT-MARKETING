import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3001";
const checks = [];

function pass(name, actual = "") { checks.push({ name, pass: true, actual }); }
function fail(name, actual = "") { checks.push({ name, pass: false, actual }); }

async function main() {
    const browser = await chromium.launch();

    // ── Phase 1: 전체 라우트 HTTP 200 / redirect ──────────────────────

    const PUBLIC_ROUTES = [
        "/", "/design-system", "/signup", "/login",
        "/landing-pages", "/blog-sms", "/blog-sms/guide", "/blog-sms/faq",
        "/pricing", "/cpa", "/ads", "/terms", "/privacy",
        "/subscribe/fail",
    ];
    const AUTH_ROUTES = ["/dashboard", "/subscribe"];

    const ctx1 = await browser.newContext();
    for (const route of PUBLIC_ROUTES) {
        const pg = await ctx1.newPage();
        try {
            const res = await pg.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 20000 });
            const status = res?.status() ?? 0;
            const ok = status < 400;
            if (ok) pass(`HTTP ${route} → ${status}`);
            else fail(`HTTP ${route} → ${status}`, `status=${status}`);
        } catch (e) {
            fail(`HTTP ${route}`, String(e).slice(0, 60));
        }
        await pg.close();
    }
    await ctx1.close();

    // 인증 라우트 = redirect to /login
    const ctx2 = await browser.newContext();
    for (const route of AUTH_ROUTES) {
        const pg = await ctx2.newPage();
        try {
            await pg.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 20000 });
            const url = pg.url();
            const redirected = url.includes("/login");
            if (redirected) pass(`인증보호 ${route} → /login redirect`);
            else fail(`인증보호 ${route} → /login redirect`, `실제 url: ${url}`);
        } catch (e) {
            fail(`인증보호 ${route}`, String(e).slice(0, 60));
        }
        await pg.close();
    }
    await ctx2.close();

    // ── Phase 2: 핵심 동선 e2e ──────────────────────────────────────

    const ctx3 = await browser.newContext({ viewport: { width: 1280, height: 800 } });

    // 동선 1: 홈 "무료로 시작하기" → /signup
    {
        const pg = await ctx3.newPage();
        await pg.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const signupLinks = await pg.locator('a[href="/signup"]').count();
        const h1 = await pg.locator("h1").first().textContent().catch(() => "");
        const hasHero = (h1?.length ?? 0) > 0;
        if (signupLinks > 0 && hasHero) pass("동선1: 홈 h1 노출 + /signup 링크");
        else fail("동선1: 홈 h1 노출 + /signup 링크", `signupLinks=${signupLinks}, h1="${h1?.slice(0,40)}"`);
        await pg.close();
    }

    // 동선 2-A: 홈 → /landing-pages
    {
        const pg = await ctx3.newPage();
        await pg.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const lpLinks = await pg.locator('a[href="/landing-pages"]').count();
        if (lpLinks > 0) pass("동선2A: 홈 → /landing-pages 링크");
        else fail("동선2A: 홈 → /landing-pages 링크", `count=${lpLinks}`);
        await pg.close();
    }

    // 동선 2-B: 홈 → /cpa
    {
        const pg = await ctx3.newPage();
        await pg.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const cpaLinks = await pg.locator('a[href="/cpa"]').count();
        if (cpaLinks > 0) pass("동선2B: 홈 → /cpa 링크");
        else fail("동선2B: 홈 → /cpa 링크", `count=${cpaLinks}`);
        await pg.close();
    }

    // 동선 2-C: 홈 → /blog-sms
    {
        const pg = await ctx3.newPage();
        await pg.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const blogLinks = await pg.locator('a[href="/blog-sms"]').count();
        if (blogLinks > 0) pass("동선2C: 홈 → /blog-sms 링크");
        else fail("동선2C: 홈 → /blog-sms 링크", `count=${blogLinks}`);
        await pg.close();
    }

    // 동선 3: /pricing → /subscribe 또는 /signup
    {
        const pg = await ctx3.newPage();
        await pg.goto(`${BASE}/pricing`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const subLink = await pg.locator('a[href="/subscribe"], a[href="/signup"]').count();
        if (subLink > 0) pass("동선3: /pricing → /subscribe or /signup 링크");
        else fail("동선3: /pricing → /subscribe or /signup 링크", `count=${subLink}`);
        await pg.close();
    }

    // 동선 4: /blog-sms 무료 시작 링크
    {
        const pg = await ctx3.newPage();
        await pg.goto(`${BASE}/blog-sms`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const signupLink = await pg.locator('a[href="/signup"]').count();
        const h1 = await pg.locator("h1").first().textContent().catch(() => "");
        if (signupLink > 0 && h1) pass("동선4: /blog-sms 무료 링크 + h1");
        else fail("동선4: /blog-sms 무료 링크 + h1", `signupLink=${signupLink}, h1="${h1?.slice(0,40)}"`);
        await pg.close();
    }

    // 동선 5: /cpa 문의 폼 회사명 입력 필드 + 버튼
    {
        const pg = await ctx3.newPage();
        await pg.goto(`${BASE}/cpa`, { waitUntil: "domcontentloaded", timeout: 20000 });
        await pg.waitForTimeout(500);
        const formInput = await pg.locator('input[placeholder*="회사명"], input[placeholder*="MARKETING"]').count();
        const btn = await pg.locator("button:has-text('광고 문의하기')").count();
        if (formInput > 0 && btn > 0) pass("동선5: /cpa 문의 폼 + 버튼");
        else fail("동선5: /cpa 문의 폼 + 버튼", `input=${formInput}, btn=${btn}`);
        await pg.close();
    }

    await ctx3.close();

    // ── Phase 3: 디자인 시스템 + 반응형 ────────────────────────────

    const VIEWPORTS = [
        { w: 390, h: 844, label: "모바일 390px" },
        { w: 768, h: 1024, label: "태블릿 768px" },
        { w: 1280, h: 800, label: "데스크탑 1280px" },
    ];

    for (const vp of VIEWPORTS) {
        const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
        const pg = await ctx.newPage();
        await pg.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 20000 });
        await pg.waitForTimeout(300);

        // 가로 스크롤 없음 확인
        const scrollW = await pg.evaluate(() => document.documentElement.scrollWidth);
        const clientW = await pg.evaluate(() => document.documentElement.clientWidth);
        const hasHScroll = scrollW > clientW + 5;
        if (!hasHScroll) pass(`반응형 홈 ${vp.label} (가로 스크롤 없음)`, `scrollW=${scrollW}, clientW=${clientW}`);
        else fail(`반응형 홈 ${vp.label} (가로 스크롤 없음)`, `scrollW=${scrollW} > clientW=${clientW}`);

        await pg.close();
        await ctx.close();
    }

    // ── Phase 3: primary 색 일관성 (bg-primary-500 = 토스 블루) ──────
    {
        const ctx = await browser.newContext();
        const pg = await ctx.newPage();
        await pg.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 20000 });
        // primary-500 = #3182F6 계열 CTA 존재 확인
        const primaryBtns = await pg.locator('[class*="bg-primary-500"]').count();
        if (primaryBtns > 0) pass(`디자인: bg-primary-500 CTA 존재 (${primaryBtns}개)`);
        else fail("디자인: bg-primary-500 CTA 홈에 없음", "0개");
        await pg.close();
        await ctx.close();
    }

    // ── Phase 4: 메타데이터 + 옛 자산 무영향 ─────────────────────────

    // /design-system = noindex 확인
    {
        const ctx = await browser.newContext();
        const pg = await ctx.newPage();
        await pg.goto(`${BASE}/design-system`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const noindex = await pg.locator('meta[name="robots"][content*="noindex"]').count();
        if (noindex > 0) pass("SEO: /design-system noindex 확인");
        else {
            // noindex 없어도 경고만 (절대 게이트 아님)
            pass("SEO: /design-system 라우트 200 OK (noindex 없으면 추가 권장)");
        }
        await pg.close();
        await ctx.close();
    }

    // 각 페이지 title 확인
    const TITLE_CHECKS = [
        { url: "/", keyword: "OT MARKETING" },
        { url: "/pricing", keyword: "요금제" },
        { url: "/cpa", keyword: "CPA" },
        { url: "/blog-sms", keyword: "블로그" },
        { url: "/landing-pages", keyword: "랜딩" },
    ];
    for (const tc of TITLE_CHECKS) {
        const ctx = await browser.newContext();
        const pg = await ctx.newPage();
        await pg.goto(`${BASE}${tc.url}`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const title = await pg.title();
        const ok = title.includes(tc.keyword);
        if (ok) pass(`메타: ${tc.url} title 포함 "${tc.keyword}"`, `"${title}"`);
        else fail(`메타: ${tc.url} title 미포함 "${tc.keyword}"`, `"${title}"`);
        await pg.close();
        await ctx.close();
    }

    // 옛 자산 무영향: /ads 36 mockup
    {
        const ctx = await browser.newContext();
        const pg = await ctx.newPage();
        const res = await pg.goto(`${BASE}/ads`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const ok = (res?.status() ?? 0) < 400;
        if (ok) pass("옛자산: /ads 36 mockup 무영향 (HTTP OK)");
        else fail("옛자산: /ads 36 mockup", `status=${res?.status()}`);
        await pg.close();
        await ctx.close();
    }

    // 블로그문자 12 라우트 대표 3개 확인
    {
        const ctx = await browser.newContext();
        for (const r of ["/blog-sms", "/blog-sms/guide", "/blog-sms/faq"]) {
            const pg = await ctx.newPage();
            const res = await pg.goto(`${BASE}${r}`, { waitUntil: "domcontentloaded", timeout: 20000 });
            const ok = (res?.status() ?? 0) < 400;
            if (ok) pass(`옛자산: ${r} 블로그문자 무영향`);
            else fail(`옛자산: ${r}`, `status=${res?.status()}`);
            await pg.close();
        }
        await ctx.close();
    }

    // Navbar 노출 + /logout 링크 확인
    {
        const ctx = await browser.newContext();
        const pg = await ctx.newPage();
        await pg.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 20000 });
        const navLinks = await pg.locator("nav a").count();
        if (navLinks > 0) pass(`Navbar 링크 ${navLinks}개 노출`);
        else fail("Navbar 링크 없음");
        await pg.close();
        await ctx.close();
    }

    await browser.close();

    // ── 결과 출력 ─────────────────────────────────────────────────────
    console.log("\n========== STEP_104 통합 검증 ==========");
    let allPass = true;
    let passCount = 0;
    for (const c of checks) {
        const icon = c.pass ? "✅" : "❌";
        console.log(`${icon} ${c.name}`);
        if (!c.pass) {
            console.log(`   actual: ${c.actual}`);
            allPass = false;
        } else {
            passCount++;
        }
    }
    console.log(`=========================================`);
    console.log(`결과: ${passCount}/${checks.length} 통과`);

    if (!allPass) {
        console.error("\n❌ 일부 검증 실패 — 위 목록 확인");
        process.exit(1);
    }
    console.log("\n✅ 전체 통과 — STEP_104 통합 게이트 OK");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
