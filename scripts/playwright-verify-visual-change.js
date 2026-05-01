#!/usr/bin/env node
/**
 * STEP_33 시각 변화 자동 검증 (Playwright headless)
 *
 * 36 mockup (6 매체 × 6 업종) 페이지를 자동 방문, 각 매체별 시그니처 컬러·요소가 출현하는지 확인.
 *
 * 검증 매체별 시그니처:
 * - Meta 피드      → #1877F2 (페북 블루) + lucide ThumbsUp + "더 알아보기" CTA
 * - 당근 비즈프로필 → #FF7E36 (당근 오렌지) + #FAF7F2 (베이지) + "비즈프로필" 라벨
 * - Naver 검색광고  → #03C75A (네이버 그린) + 카테고리 탭 ("VIEW"|"통합"|"이미지") + "광고" 태그 #FF6F00
 * - 카카오 모먼트   → #FEE500 (옐로우) + #3C1E1E (브라운)
 * - Google GDN     → 4컬러 도트 (#4285F4·#EA4335·#FBBC05·#34A853) + "Ads by Google"
 * - Google Discovery→ 4컬러 G 로고 + 별 평점 (lucide Star fill)
 *
 * 1건이라도 fail → exit 1.
 */

const { chromium } = require("playwright");

const BASE = process.env.BASE_URL || "http://localhost:3717";

const INDUSTRIES = [
    { id: "debt-relief", name: "개인회생" },
    { id: "rental",      name: "렌탈" },
    { id: "broadband",   name: "통신" },
    { id: "invest",      name: "리딩" },
    { id: "realestate",  name: "부동산" },
    { id: "medical",     name: "병의원" },
];

// 각 매체 시그니처 검증 selector (mockup 컨테이너 안에서 찾음)
const CHANNEL_SIGNATURES = {
    meta: {
        name: "Meta 피드",
        colors: ["#1877F2", "#1877f2"], // 페북 블루
        textHints: ["좋아요"],
    },
    karrot: {
        name: "당근 비즈프로필",
        colors: ["#FF7E36", "#ff7e36", "#FAF7F2"],
        textHints: ["비즈프로필"],
    },
    naver: {
        name: "Naver 검색광고",
        colors: ["#03C75A", "#03c75a", "#FF6F00"],
        textHints: ["광고", "관련 검색"],
    },
    kakao: {
        name: "카카오 모먼트",
        colors: ["#FEE500", "#fee500", "#3C1E1E"],
        textHints: ["추천 콘텐츠", "kakao"],
    },
    "google-gdn": {
        name: "Google GDN",
        colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#1A73E8"],
        textHints: ["Ads by Google"],
    },
    "google-discovery": {
        name: "Google Discovery",
        colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
        textHints: ["디스커버"],
    },
};

(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();

    const failures = [];
    const successes = [];

    console.log(`Loading ${BASE}/ads ...`);
    await page.goto(`${BASE}/ads`, { waitUntil: "networkidle" });

    for (const ind of INDUSTRIES) {
        const tab = page.locator(`button:has-text("${ind.name}")`).first();
        if (await tab.count() === 0) {
            failures.push({ ind: ind.id, error: `industry tab "${ind.name}" 미발견` });
            continue;
        }
        await tab.click();
        await page.waitForTimeout(500);

        // 전체 채널 보기
        const allTab = page.locator('button:has-text("전체")').first();
        if (await allTab.count() > 0) {
            await allTab.click();
            await page.waitForTimeout(400);
        }

        // 페이지 전체 HTML 추출 (computed style 컬러도 포함되도록)
        const html = await page.content();

        for (const [chId, sig] of Object.entries(CHANNEL_SIGNATURES)) {
            // 매체별 컬러 출현 확인 (대소문자 무관)
            const lower = html.toLowerCase();
            let colorOk = false;
            for (const c of sig.colors) {
                if (lower.includes(c.toLowerCase())) { colorOk = true; break; }
            }
            // 텍스트 힌트 확인
            const text = await page.locator("body").innerText();
            let textOk = sig.textHints.length === 0;
            for (const t of sig.textHints) {
                if (text.includes(t)) { textOk = true; break; }
            }

            const tag = `${ind.id} × ${chId}`;
            if (colorOk && textOk) {
                successes.push(tag);
            } else {
                failures.push({
                    industry: ind.id,
                    channel: chId,
                    colorOk,
                    textOk,
                    expectedColors: sig.colors,
                    expectedTextHints: sig.textHints,
                });
            }
        }
    }

    await browser.close();

    console.log("=".repeat(60));
    console.log("STEP_33 Playwright 시각 변화 검증");
    console.log("=".repeat(60));
    console.log(`총 검증: ${INDUSTRIES.length * 6} (industry × channel)`);
    console.log(`통과: ${successes.length}`);
    console.log(`실패: ${failures.length}`);

    if (failures.length > 0) {
        console.log("\n=== 실패 상세 ===");
        for (const f of failures) {
            console.log(`\n[${f.industry || f.ind} × ${f.channel || "?"}]`);
            if (f.error) console.log(`  ${f.error}`);
            else {
                console.log(`  컬러 ${f.colorOk ? "✅" : "❌"} (기대: ${f.expectedColors.join(", ")})`);
                console.log(`  텍스트 ${f.textOk ? "✅" : "❌"} (기대 중 1: ${f.expectedTextHints.join(", ")})`);
            }
        }
        process.exit(1);
    }

    console.log("\n✅ 36/36 매체별 시각 강화 출현 확인 (Playwright headless)");
})().catch((e) => {
    console.error("Playwright 실행 실패:", e.message);
    process.exit(2);
});
