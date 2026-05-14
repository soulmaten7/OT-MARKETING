import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();

    const checks = [];

    // pre-warm
    await page.goto(`${BASE}/cpa`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1000);

    // ── Test 1: Hero h1 + "건당 정산" / "검증된 인프라" 노출 ─────────
    const h1Text = await page.locator("h1").first().textContent().catch(() => "");
    const hasValue =
        (await page.locator("text=건당 정산").count()) > 0 ||
        (await page.locator("text=검증된 인프라").count()) > 0;
    checks.push({
        name: "1. Hero h1 + '건당 정산'/'검증된 인프라' 노출",
        pass: (h1Text?.length ?? 0) > 0 && hasValue,
        actual: `h1: "${h1Text?.slice(0, 60)}", 가치=${hasValue}`,
    });

    // ── Test 2: 작동 방식 4단계 ──────────────────────────────────────
    const hasStep1 = (await page.locator("text=광고 문의").count()) > 0;
    const hasStep4 =
        (await page.locator("text=DB 수집").count()) > 0 ||
        (await page.locator("text=정산").count()) > 0;
    checks.push({
        name: "2. 작동 방식 — '광고 문의' + 'DB 수집/정산' 노출",
        pass: hasStep1 && hasStep4,
        actual: `광고문의=${hasStep1}, DB수집/정산=${hasStep4}`,
    });

    // ── Test 3: 광고 크리에이티브 갤러리 링크 (/ads) ─────────────────
    const adsLinks = await page.locator('a[href="/ads"]').count();
    const hasCreativeText =
        (await page.locator("text=광고 크리에이티브").count()) > 0 ||
        (await page.locator("text=크리에이티브").count()) > 0;
    checks.push({
        name: "3. 광고 크리에이티브 갤러리 → /ads 링크",
        pass: adsLinks > 0 && hasCreativeText,
        actual: `a[href="/ads"] count=${adsLinks}, 크리에이티브=${hasCreativeText}`,
    });

    // ── Test 4: 광고 문의 폼 버튼 노출 ──────────────────────────────
    const hasInquiryBtn =
        (await page.locator("button:has-text('광고 문의하기')").count()) > 0 ||
        (await page.locator("a:has-text('광고 문의하기')").count()) > 0;
    checks.push({
        name: "4. '광고 문의하기' CTA/버튼 노출",
        pass: hasInquiryBtn,
        actual: `광고 문의하기 count = ${(await page.locator("button:has-text('광고 문의하기'), a:has-text('광고 문의하기')").count())}`,
    });

    // ── Test 5: 문의 폼 = 회사명 입력 필드 ──────────────────────────
    const hasForm = (await page.locator('input[placeholder*="회사명"], input[placeholder*="MARKETING"]').count()) > 0;
    checks.push({
        name: "5. 문의 폼 = 회사명 입력 필드 노출",
        pass: hasForm,
        actual: `회사명 input count = ${await page.locator('input[placeholder*="회사명"], input[placeholder*="MARKETING"]').count()}`,
    });

    // ── Test 6: /ads 라우트 무영향 ───────────────────────────────────
    const adsPage = await ctx.newPage();
    let adsOk = false;
    try {
        const resp = await adsPage.goto(`${BASE}/ads`, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
        });
        adsOk = (resp?.status() ?? 0) < 400;
    } catch {
        adsOk = false;
    }
    await adsPage.close();
    checks.push({
        name: "6. /ads 라우트 무영향 (옛 36 mockup 갤러리 보존)",
        pass: adsOk,
        actual: `HTTP status < 400 = ${adsOk}`,
    });

    // ── Test 7: 디자인 시스템 = Hero "광고 문의하기" bg-primary-500 ──
    const heroLink = page.locator('a[href="#contact"]').first();
    const heroLinkClass = await heroLink.getAttribute("class").catch(() => "");
    const hasPrimary = heroLinkClass?.includes("bg-primary-500") ?? false;
    checks.push({
        name: "7. Hero '광고 문의하기' = bg-primary-500 (디자인 시스템)",
        pass: hasPrimary,
        actual: `bg-primary-500 = ${hasPrimary}`,
    });

    await ctx.close();
    await browser.close();

    // ── 결과 출력 ────────────────────────────────────────────────────
    console.log("\n========== STEP_102 DOM 검증 ==========");
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
