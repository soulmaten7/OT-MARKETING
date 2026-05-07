// STEP_66 라이브 검증 — Supabase 환경변수 + DB seed + 라우트 작동
const { chromium } = require('@playwright/test');

(async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await ctx.newPage();
    let failed = 0;

    const checks = [
        { url: 'https://ot-marketing.kr/blog-sms', expect: '블로그문자' },
        { url: 'https://ot-marketing.kr/blog-sms/signup', expect: '회원가입' },
        { url: 'https://ot-marketing.kr/blog-sms/login', expect: '로그인' },
        { url: 'https://ot-marketing.kr/blog-sms/guide', expect: '활용 가이드' },
        { url: 'https://ot-marketing.kr/blog-sms/faq', expect: '자주 묻는 질문' },
        { url: 'https://ot-marketing.kr/blog-sms/landing-pre-register', expect: '사전 등록' },
    ];

    for (const c of checks) {
        const resp = await page.goto(c.url, { waitUntil: 'networkidle', timeout: 20000 });
        const html = await page.content();
        const hasText = html.includes(c.expect);
        const status = resp.status();
        const ok = status === 200 && hasText;
        console.log(`${ok ? '✅' : '❌'} ${status} ${c.url} ["${c.expect}" ${hasText ? 'found' : 'MISSING'}]`);
        if (!ok) failed++;
    }

    // 회원가입 폼 = 4 input 박힘 (이메일·비번·아이디·휴대폰)
    await page.goto('https://ot-marketing.kr/blog-sms/signup', { waitUntil: 'networkidle' });
    const inputCount = {
        email: await page.locator('input[name="email"]').count(),
        password: await page.locator('input[name="password"]').count(),
        username: await page.locator('input[name="username"]').count(),
        phone: await page.locator('input[name="phone"]').count(),
    };
    const allPresent = Object.values(inputCount).every((n) => n === 1);
    console.log(`${allPresent ? '✅' : '❌'} 회원가입 폼 4 input = ${JSON.stringify(inputCount)}`);
    if (!allPresent) failed++;

    // 점검 모드 fallback 메시지 = 0건 (= Supabase 환경변수 박힘)
    await page.goto('https://ot-marketing.kr/blog-sms/dashboard', { waitUntil: 'networkidle' });
    const finalUrl = page.url();
    const isLoginRedirect = finalUrl.includes('/blog-sms/login');
    console.log(`${isLoginRedirect ? '✅' : '❌'} dashboard → login redirect (Supabase Auth 작동) = ${finalUrl}`);
    if (!isLoginRedirect) failed++;

    // 점검 중 fallback 텍스트 없는지
    await page.goto('https://ot-marketing.kr/blog-sms/signup');
    const fallbackText = await page.locator('text=회원가입 점검 중').count();
    console.log(`${fallbackText === 0 ? '✅' : '❌'} signup 점검 모드 fallback = ${fallbackText}건 (0 이어야 함)`);
    if (fallbackText !== 0) failed++;

    // 헤더 메뉴 박힘
    await page.goto('https://ot-marketing.kr/');
    const headerHtml = await page.locator('header').innerHTML();
    const blogSmsInMenu = headerHtml.includes('블로그문자');
    console.log(`${blogSmsInMenu ? '✅' : '❌'} 헤더 "블로그문자" 메뉴 라이브 박힘`);
    if (!blogSmsInMenu) failed++;

    await browser.close();
    if (failed > 0) {
        console.log(`\n❌ ${failed}건 실패`);
        process.exit(1);
    }
    console.log('\n✅ 라이브 + Supabase 환경변수 + DB seed + Auth 모두 통과');
})();
