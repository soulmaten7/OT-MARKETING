const { chromium } = require('@playwright/test');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let failed = 0;

    const routes = [
        { url: 'http://localhost:3001/blog-sms', expect: '블로그문자' },
        { url: 'http://localhost:3001/blog-sms/signup', expect: '회원가입' },
        { url: 'http://localhost:3001/blog-sms/login', expect: '로그인' },
        { url: 'http://localhost:3001/blog-sms/guide', expect: '활용 가이드' },
        { url: 'http://localhost:3001/blog-sms/guide/to-landing', expect: '랜딩페이지' },
        { url: 'http://localhost:3001/blog-sms/faq', expect: '자주 묻는 질문' },
        { url: 'http://localhost:3001/blog-sms/landing-pre-register', expect: '사전 등록' },
        { url: 'http://localhost:3001/blog-sms/dashboard', expect: null }, // redirects to login
    ];

    for (const r of routes) {
        try {
            const resp = await page.goto(r.url, { waitUntil: 'networkidle', timeout: 15000 });
            const status = resp.status();
            const html = await page.content();
            const hasText = r.expect ? html.includes(r.expect) : true;
            const ok = status < 400 && hasText;
            console.log(`${ok ? '✅' : '❌'} ${status} ${r.url}${r.expect ? ` ["${r.expect}" ${hasText ? 'found' : 'MISSING'}]` : ''}`);
            if (!ok) failed++;
        } catch (e) {
            console.log(`❌ FAIL ${r.url}: ${e.message}`);
            failed++;
        }
    }

    // Existing routes 회귀 방지
    const existing = [
        'http://localhost:3001/',
        'http://localhost:3001/ads',
        'http://localhost:3001/samples',
    ];
    for (const url of existing) {
        try {
            const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
            const status = resp.status();
            console.log(`${status < 400 ? '✅' : '❌'} ${status} ${url} [회귀]`);
            if (status >= 400) failed++;
        } catch (e) {
            console.log(`❌ FAIL ${url}: ${e.message}`);
            failed++;
        }
    }

    // Header 메뉴 박힘 확인
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    const headerHtml = await page.locator('header').innerHTML();
    const blogSmsInMenu = headerHtml.includes('블로그문자');
    console.log(`${blogSmsInMenu ? '✅' : '❌'} 헤더에 "블로그문자" 메뉴 박힘`);
    if (!blogSmsInMenu) failed++;

    await browser.close();
    if (failed > 0) {
        console.log(`\n❌ ${failed}건 실패`);
        process.exit(1);
    }
    console.log('\n✅ 모든 검증 통과');
})();
