// /blog-sms redesign 라이브 검증 (blogsms.net 분석 반영)
const { chromium } = require('@playwright/test');

(async () => {
    const browser = await chromium.launch();
    const page = await (await browser.newContext()).newPage();
    let failed = 0;

    const url = `https://ot-marketing.kr/blog-sms?bust=${Date.now()}`;
    const resp = await page.goto(url, { waitUntil: 'networkidle' });
    const html = await page.content();

    const ok = (label, cond) => {
        console.log(`${cond ? '✅' : '❌'} ${label}`);
        if (!cond) failed++;
    };

    ok(`HTTP 200 (received ${resp.status()})`, resp.status() === 200);
    ok('"평생 100% 무료" 박힘', html.includes('평생 100% 무료'));
    ok('"결제 정보" 박힘', html.includes('결제 정보'));

    const banned = ['5만원', '12만원', 'Pro 플랜', '구독료', '요금제'];
    const hits = banned.filter((b) => html.includes(b));
    ok(`가격 표현 0건 (잔여: ${hits.join(', ') || 'none'})`, hits.length === 0);

    for (const e of ['✨', '🛡️', '📝', '📸', '💬', '🎬', '📇', '🏪', '🎁', '⚡']) {
        ok(`이모지 ${e} 박힘`, html.includes(e));
    }

    await browser.close();
    if (failed > 0) {
        console.log(`\n❌ ${failed}건 실패`);
        process.exit(1);
    }
    console.log('\n✅ 전체 통과');
})();
