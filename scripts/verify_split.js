// 블로그문자 ⊥ 셀프 랜딩페이지 분리 검증
const { chromium } = require('@playwright/test');

(async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    let failed = 0;

    // 1. /blog-sms 본문에 upsell 섹션 0건
    {
        const resp = await page.goto('https://ot-marketing.kr/blog-sms', { waitUntil: 'networkidle' });
        const html = await page.content();
        const hasUpsellHeading = html.includes('곧 출시 — 셀프 랜딩페이지');
        const hasUpsellCta = html.includes('사전 등록하기 →');
        const ok = resp.status() === 200 && !hasUpsellHeading && !hasUpsellCta;
        console.log(`${ok ? '✅' : '❌'} /blog-sms 본문에 upsell 섹션 0건 (heading=${hasUpsellHeading}, cta=${hasUpsellCta})`);
        if (!ok) failed++;
    }

    // 2. /landing-pages 200 + 핵심 콘텐츠
    {
        const resp = await page.goto('https://ot-marketing.kr/landing-pages', { waitUntil: 'networkidle' });
        const html = await page.content();
        const ok = resp.status() === 200 && html.includes('셀프 랜딩페이지');
        console.log(`${ok ? '✅' : '❌'} /landing-pages = ${resp.status()} (셀프 랜딩페이지 텍스트 ${html.includes('셀프 랜딩페이지') ? 'O' : 'X'})`);
        if (!ok) failed++;
    }

    // 3. /blog-sms/landing-pre-register = 307/308 redirect → /landing-pages
    {
        const ctx2 = await browser.newContext();
        const p2 = await ctx2.newPage();
        // Capture all responses to find the redirect
        const responses = [];
        p2.on('response', (r) => responses.push({ url: r.url(), status: r.status() }));
        await p2.goto('https://ot-marketing.kr/blog-sms/landing-pre-register', { waitUntil: 'networkidle' });
        const finalUrl = p2.url();
        const firstResp = responses.find((r) => r.url.includes('/blog-sms/landing-pre-register'));
        const redirectStatus = firstResp ? firstResp.status : 0;
        const isRedirected = (redirectStatus === 307 || redirectStatus === 308) && finalUrl.endsWith('/landing-pages');
        console.log(`${isRedirected ? '✅' : '❌'} /blog-sms/landing-pre-register redirect = status ${redirectStatus} → ${finalUrl}`);
        await ctx2.close();
        if (!isRedirected) failed++;
    }

    // 4. Navbar 메뉴 분리 확인
    {
        await page.goto('https://ot-marketing.kr/');
        const headerHtml = await page.locator('header').innerHTML();
        const hasBlogSms = headerHtml.includes('블로그문자');
        const hasLandingPages = headerHtml.includes('셀프 랜딩페이지');
        const ok = hasBlogSms && hasLandingPages;
        console.log(`${ok ? '✅' : '❌'} Navbar 메뉴 분리: 블로그문자=${hasBlogSms}, 셀프 랜딩페이지=${hasLandingPages}`);
        if (!ok) failed++;
    }

    // 5. /landing-pages 안에 PreRegister 폼 박힘
    {
        await page.goto('https://ot-marketing.kr/landing-pages', { waitUntil: 'networkidle' });
        const emailInputs = await page.locator('input[type="email"]').count();
        const ok = emailInputs >= 1;
        console.log(`${ok ? '✅' : '❌'} /landing-pages 사전 등록 이메일 input = ${emailInputs}`);
        if (!ok) failed++;
    }

    await browser.close();
    if (failed > 0) {
        console.log(`\n❌ ${failed}건 실패`);
        process.exit(1);
    }
    console.log('\n✅ 5/5 분리 검증 통과');
})();
