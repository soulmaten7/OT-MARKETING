import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3000/select11";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 412, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });

    const checks = [];

    // 1. 브랜드명 = "채무회복센터" (header span)
    const brand = await page.locator("header span").first().textContent();
    checks.push({
        name: "브랜드명 단일화",
        pass: brand?.trim() === "채무회복센터",
        actual: brand?.trim(),
    });

    // 2. 옛 표현 "채무회복 탕감센터" 가시 DOM 잔여 0건 (body 내부만)
    const oldBrandHits = await page.locator("body >> text=채무회복 탕감센터").count();
    checks.push({
        name: "옛 표현 가시 DOM 0건",
        pass: oldBrandHits === 0,
        actual: oldBrandHits,
    });

    // 3. 헤더 우측 "1:1 비밀 상담" DOM 잔여 0건
    const oldHeaderRightHits = await page.locator("header >> text=1:1 비밀 상담").count();
    checks.push({
        name: "헤더 우측 1:1 비밀 상담 제거",
        pass: oldHeaderRightHits === 0,
        actual: oldHeaderRightHits,
    });

    // 4. 헤더 아이콘 = svg (lucide Scale) — 이모지 ⚖ X
    const headerIconSvg = await page.locator("header svg").count();
    checks.push({
        name: "헤더 아이콘 lucide-react Scale (svg)",
        pass: headerIconSvg >= 1,
        actual: headerIconSvg,
    });

    // 5. 카드 높이 통일 (3 카드 모두 150px+ 동일)
    const cards = page.locator("[class*='min-h-[150px]']");
    const cardCount = await cards.count();
    const cardHeights = [];
    for (let i = 0; i < cardCount; i++) {
        const box = await cards.nth(i).boundingBox();
        if (box) cardHeights.push(Math.round(box.height));
    }
    const allSame = cardHeights.length === 3 && cardHeights.every((h) => h === cardHeights[0]);
    checks.push({
        name: "카드 높이 통일 (3 카드 동일)",
        pass: allSame && cardHeights[0] >= 150,
        actual: cardHeights.join(", "),
    });

    // 6. step === 0 (초기) 라이브 토스트 마운트 X (5초 대기)
    await page.waitForTimeout(5000);
    const toastMountStep0 = await page.locator("[data-testid='live-toast-mount']").count();
    checks.push({
        name: "step 0 라이브 토스트 마운트 X",
        pass: toastMountStep0 === 0,
        actual: toastMountStep0,
    });

    // 7. CTA 클릭 → step 1 → 라이브 토스트 컴포넌트 마운트 O
    await page.locator("button:has-text('내 탕감액 무료 분석 시작')").first().click();
    await page.waitForTimeout(2000);
    const toastMountStep1 = await page.locator("[data-testid='live-toast-mount']").count();
    checks.push({
        name: "step 1 라이브 토스트 마운트 O",
        pass: toastMountStep1 >= 1,
        actual: toastMountStep1,
    });

    // 결과 출력
    console.log("─".repeat(60));
    console.log("STEP_78 검증 결과");
    console.log("─".repeat(60));
    for (const c of checks) {
        const mark = c.pass ? "✅" : "❌";
        console.log(`${mark} ${c.name}: ${c.actual}`);
    }
    console.log("─".repeat(60));

    const failed = checks.filter((c) => !c.pass).length;
    if (failed > 0) {
        console.log(`❌ ${failed}건 실패. STOP. 빌드 중단.`);
        process.exit(1);
    }
    console.log(`✅ 7건 통과. STEP_78 완료.`);

    await browser.close();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
