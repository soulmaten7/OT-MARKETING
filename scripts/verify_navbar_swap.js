// Navbar 회원 영역 + 셀프→구독형 + Hero 화이트 배경 라이브 검증
const { chromium } = require('@playwright/test');

(async () => {
    const browser = await chromium.launch();
    const page = await (await browser.newContext()).newPage();
    let failed = 0;
    const ok = (label, cond) => {
        console.log(`${cond ? '✅' : '❌'} ${label}`);
        if (!cond) failed++;
    };

    // 1. /blog-sms Hero 화이트 배경
    {
        const url = `https://ot-marketing.kr/blog-sms?bust=${Date.now()}`;
        const resp = await page.goto(url, { waitUntil: 'networkidle' });
        ok(`/blog-sms 200`, resp.status() === 200);
        const html = await page.content();
        // Hero 섹션의 옛 navy gradient (from-[var(--navy-900)]) 가 사라졌는지
        const oldHero = html.includes('bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)]');
        ok(`/blog-sms Hero 옛 navy gradient 0건`, !oldHero);
        // 셀프 랜딩페이지 잔여 0건
        ok(`/blog-sms "셀프 랜딩페이지" 0건`, !html.includes('셀프 랜딩페이지'));
        // 구독형 라벨 박힘 (navbar 또는 본문)
        ok(`/blog-sms "구독형 랜딩페이지" 박힘`, html.includes('구독형 랜딩페이지'));
    }

    // 2. 헤더 우측 회원 영역 박힘
    {
        await page.goto(`https://ot-marketing.kr/blog-sms?bust=${Date.now()}`, { waitUntil: 'networkidle' });
        const headerHtml = await page.locator('header').innerHTML();
        ok(`헤더 "내 페이지" 박힘`, headerHtml.includes('내 페이지'));
        ok(`헤더 "로그인" 박힘`, headerHtml.includes('로그인'));
        ok(`헤더 "회원가입" 박힘`, headerHtml.includes('회원가입'));
        ok(`헤더 "구독형 랜딩페이지" 메뉴 라벨`, headerHtml.includes('구독형 랜딩페이지'));
        ok(`헤더 "셀프 랜딩페이지" 0건`, !headerHtml.includes('셀프 랜딩페이지'));
    }

    // 3. /landing-pages 라벨도 구독형
    {
        const resp = await page.goto(`https://ot-marketing.kr/landing-pages?bust=${Date.now()}`, { waitUntil: 'networkidle' });
        ok(`/landing-pages 200`, resp.status() === 200);
        const html = await page.content();
        ok(`/landing-pages "구독형 랜딩페이지" 박힘`, html.includes('구독형 랜딩페이지'));
        ok(`/landing-pages "셀프 랜딩페이지" 0건`, !html.includes('셀프 랜딩페이지'));
    }

    // 4. faq, guide 도 구독형
    {
        const resp = await page.goto(`https://ot-marketing.kr/blog-sms/faq?bust=${Date.now()}`, { waitUntil: 'networkidle' });
        ok(`/blog-sms/faq 200`, resp.status() === 200);
        const html = await page.content();
        ok(`/blog-sms/faq "셀프" 0건 (구독형 박힘)`, !html.includes('셀프 랜딩페이지'));
    }

    {
        const resp = await page.goto(`https://ot-marketing.kr/blog-sms/guide/to-landing?bust=${Date.now()}`, { waitUntil: 'networkidle' });
        ok(`/blog-sms/guide/to-landing 200`, resp.status() === 200);
        const html = await page.content();
        ok(`gauide upsell box "구독형 랜딩페이지" 박힘`, html.includes('구독형 랜딩페이지'));
        ok(`gauide upsell box "셀프 랜딩페이지" 0건`, !html.includes('셀프 랜딩페이지'));
    }

    await browser.close();
    if (failed > 0) {
        console.log(`\n❌ ${failed}건 실패`);
        process.exit(1);
    }
    console.log('\n✅ 전체 통과');
})();
