import { chromium } from "playwright";

const BASE = process.env.URL || "http://localhost:3000";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();

    const checks = [];

    // ── pre-warm (첫 컴파일 대기) ─────────────────────────────────────
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1000);

    // ── Test 1: 3 카드 = 제목 + 이미지 노출 ──────────────────────────
    const hasLanding = (await page.locator("text=구독형 랜딩페이지").count()) > 0;
    const hasCpa = (await page.locator("text=CPA 광고").count()) > 0;
    const hasBlogSms = (await page.locator("text=블로그문자").first().isVisible().catch(() => false));
    const imgLanding = (await page.locator('img[src*="feature-landing"]').count()) > 0;
    const imgCpa = (await page.locator('img[src*="feature-cpa"]').count()) > 0;
    const imgBlogSms = (await page.locator('img[src*="feature-blog-sms"]').count()) > 0;
    checks.push({
        name: "1. 3 카드 = 제목 + 이미지 모두 노출",
        pass: hasLanding && hasCpa && hasBlogSms && imgLanding && imgCpa && imgBlogSms,
        actual: `카드: 랜딩=${hasLanding}, CPA=${hasCpa}, 블로그=${hasBlogSms} / 이미지: 랜딩=${imgLanding}, CPA=${imgCpa}, 블로그=${imgBlogSms}`,
    });

    // ── Test 2: 이모지 제거 확인 ─────────────────────────────────────
    const bodyText = await page.locator("body").textContent().catch(() => "");
    const hasEmoji = /[📊🎯✉️]/.test(bodyText ?? "");
    checks.push({
        name: "2. 이모지 제거 확인 (📊🎯✉️ = 0건)",
        pass: !hasEmoji,
        actual: `이모지 발견 = ${hasEmoji}`,
    });

    // ── Test 3: 헤더 순서 = 랜딩페이지 → CPA → 블로그문자 ──────────
    const navLinks = await page.locator("header nav a").allTextContents().catch(() => []);
    const landingIdx = navLinks.findIndex((t) => t.includes("랜딩페이지"));
    const cpaIdx = navLinks.findIndex((t) => t.includes("CPA"));
    const blogIdx = navLinks.findIndex((t) => t.includes("블로그문자"));
    const navOrderOk = landingIdx !== -1 && cpaIdx !== -1 && blogIdx !== -1 &&
        landingIdx < cpaIdx && cpaIdx < blogIdx;
    checks.push({
        name: "3. 헤더 순서 = 랜딩페이지 → CPA → 블로그문자",
        pass: navOrderOk,
        actual: `nav 텍스트: [${navLinks.join(", ")}] → 인덱스: 랜딩=${landingIdx}, CPA=${cpaIdx}, 블로그=${blogIdx}`,
    });

    // ── Test 4: title 메타데이터 swap ────────────────────────────────
    const title = await page.title();
    const oldTitleGone = !title.includes("광고가 끝나는 자리");
    const newTitleOk = title.includes("마케팅");
    checks.push({
        name: "4. title = 신 메타데이터 ('광고가 끝나는 자리' 제거 + '마케팅' 포함)",
        pass: oldTitleGone && newTitleOk,
        actual: `title: "${title}"`,
    });

    // ── Test 5: 베네핏 3개 노출 ──────────────────────────────────────
    const b1 = (await page.locator("text=코딩 없이 5분 만에 완성").count()) > 0;
    const b2 = (await page.locator("text=광고 소재부터 정산까지 한 번에").count()) > 0;
    const b3 = (await page.locator("text=블로그 글 자동 생성").count()) > 0;
    checks.push({
        name: "5. 베네핏 3개 노출 (각 카드 대표 베네핏)",
        pass: b1 && b2 && b3,
        actual: `코딩없이=${b1}, 광고소재=${b2}, 블로그글=${b3}`,
    });

    // ── Test 6: 모바일 = 카드 세로 1열 ──────────────────────────────
    const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mPage = await mCtx.newPage();
    await mPage.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await mPage.waitForTimeout(800);

    const c1 = await mPage.locator("main h3:has-text('구독형 랜딩페이지')").first().boundingBox();
    const c2 = await mPage.locator("main h3:has-text('CPA 광고')").first().boundingBox();
    const isVertical = c1 && c2 && c2.y > c1.y;
    checks.push({
        name: "6. 모바일 = 카드 세로 1열 (card2.y > card1.y)",
        pass: isVertical ?? false,
        actual: `card1.y=${c1?.y?.toFixed(0)}, card2.y=${c2?.y?.toFixed(0)}`,
    });

    await mCtx.close();
    await ctx.close();
    await browser.close();

    // ── 결과 출력 ─────────────────────────────────────────────────────
    console.log("\n========== STEP_98 DOM 검증 ==========");
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
