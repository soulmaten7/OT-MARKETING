// STEP_64 — /ads PERFORMANCE DATA 섹션 제거 검증
const { chromium } = require("playwright");

const BASE = process.env.BASE_URL || "http://localhost:3300/ads";

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    console.log(`🚀 ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);

    const text = await page.evaluate(() => document.body.innerText);

    const banned = [
        "PERFORMANCE DATA",
        "R&D 운영 데이터로 검증",
        "R&D 광고 운영 중",
        "곧 공개합니다",
    ];

    let fail = 0;
    for (const t of banned) {
        if (text.includes(t)) {
            console.log(`❌ "${t}" 여전히 박힘`);
            fail++;
        } else {
            console.log(`✅ "${t}" 제거 확인`);
        }
    }

    // 다른 섹션 정상 박힘 확인 (회귀 방지)
    const expected = [
        "광고 클릭 → 0.3초 → 랜딩 도착",  // 섹션 4
        "법규 가드레일",                      // 섹션 6
    ];
    for (const t of expected) {
        if (!text.includes(t)) {
            console.log(`❌ 회귀: "${t}" 누락`);
            fail++;
        } else {
            console.log(`✅ "${t}" 박힘 (회귀 X)`);
        }
    }

    await browser.close();
    console.log(`\n총 실패: ${fail}`);
    process.exit(fail === 0 ? 0 : 1);
})();
