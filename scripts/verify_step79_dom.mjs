import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3000/select11";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 412, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });

    const checks = [];

    // 1. 카드 3 개 모두 min-h 125px (컴팩트, 높이 통일)
    const cards = page.locator("[class*='min-h-[125px]']");
    const cardCount = await cards.count();
    const cardHeights = [];
    for (let i = 0; i < cardCount; i++) {
        const box = await cards.nth(i).boundingBox();
        if (box) cardHeights.push(Math.round(box.height));
    }
    const allSame = cardHeights.length === 3 && cardHeights.every((h) => h === cardHeights[0]);
    checks.push({
        name: "3 카드 125px 통일 (컴팩트)",
        pass: allSame && cardHeights[0] >= 110 && cardHeights[0] < 160,
        actual: cardHeights.join(", "),
    });

    // 2. 큰 카드 숫자 = text-blue-600 class (DOM class 직접 검증 — oklch 우회)
    const bigNumberEl = page.locator("text=7,204억 8,000만+").first();
    const bigClass = await bigNumberEl.getAttribute("class");
    checks.push({
        name: "큰 카드 숫자 = text-blue-600",
        pass: bigClass?.includes("text-blue-600") ?? false,
        actual: bigClass ?? "(null)",
    });

    // 3. 작은 카드 1 (6,015 건+) = text-gray-900 class
    const smallNumber1El = page.locator("text=6,015 건+").first();
    const smallClass1 = await smallNumber1El.getAttribute("class");
    checks.push({
        name: "작은 카드 1 숫자 = text-gray-900",
        pass: smallClass1?.includes("text-gray-900") ?? false,
        actual: smallClass1 ?? "(null)",
    });

    // 4. 작은 카드 2 (최대 95% 탕감 = 카드 내부) = text-red-500 class
    // Hero h1에도 "최대 95% 탕감" 있으므로 grid-cols-2 내 red-500 요소로 특정
    const smallNumber2El = page.locator(".grid-cols-2 .text-red-500").first();
    const smallClass2 = await smallNumber2El.getAttribute("class");
    const smallText2 = await smallNumber2El.textContent();
    checks.push({
        name: "작은 카드 2 숫자 = text-red-500",
        pass: (smallClass2?.includes("text-red-500") && smallText2?.includes("95%")) ?? false,
        actual: `class=${smallClass2?.slice(0, 40)} text=${smallText2?.trim()}`,
    });

    // 5. "왜?" 항목 사이 간격 = 20px (space-y-5)
    const whyItems = page.locator("section.bg-gray-50 .space-y-5 > div");
    const whyCount = await whyItems.count();
    let gapPx = 0;
    if (whyCount >= 2) {
        const item1 = await whyItems.nth(0).boundingBox();
        const item2 = await whyItems.nth(1).boundingBox();
        if (item1 && item2) gapPx = Math.round(item2.y - (item1.y + item1.height));
    }
    checks.push({
        name: '"왜?" 항목 간격 ≥ 18px',
        pass: gapPx >= 18,
        actual: `${gapPx}px (항목 1↔2)`,
    });

    // 6. 페이지 전체 높이 < 1100px (한눈에 들어옴)
    const bodyBox = await page.locator("main").boundingBox();
    checks.push({
        name: "페이지 높이 < 1100px (100% 줌 한눈)",
        pass: bodyBox !== null && bodyBox.height < 1100,
        actual: `${Math.round(bodyBox?.height || 0)}px`,
    });

    // 7. 옛 표현 "채무회복 탕감센터" 가시 DOM 0건
    const oldBrandHits = await page.locator("body >> text=채무회복 탕감센터").count();
    checks.push({
        name: '옛 브랜드 "채무회복 탕감센터" 0건',
        pass: oldBrandHits === 0,
        actual: oldBrandHits,
    });

    // 8. step 0 토스트 마운트 X
    await page.waitForTimeout(2000);
    const toastStep0 = await page.locator("[data-testid='live-toast-mount']").count();
    checks.push({
        name: "step 0 토스트 X",
        pass: toastStep0 === 0,
        actual: toastStep0,
    });

    // 결과 출력
    console.log("─".repeat(60));
    console.log("STEP_79 검증 결과");
    console.log("─".repeat(60));
    for (const c of checks) {
        const mark = c.pass ? "✅" : "❌";
        console.log(`${mark} ${c.name}: ${c.actual}`);
    }
    console.log("─".repeat(60));

    const failed = checks.filter((c) => !c.pass).length;
    if (failed > 0) {
        console.log(`❌ ${failed}건 실패. STOP.`);
        process.exit(1);
    }
    console.log(`✅ 8건 통과. STEP_79 완료.`);

    await browser.close();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
