// STEP_80 — DOM 검증 (선택 동의 통합 + 토스트 카운터 영구 제거)
import { chromium } from "@playwright/test";

const URL = process.env.URL || "http://localhost:3000/select11";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 412, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });

    const checks = [];

    // 1. 첫 페이지 (step 0) 토스트 mount X
    await page.waitForTimeout(2000);
    const toastStep0 = await page.locator("[data-testid='live-toast-mount']").count();
    checks.push({ name: "step 0 토스트 mount X", pass: toastStep0 === 0, actual: toastStep0 });

    // 2. CTA 클릭 → step 1
    await page.locator("button:has-text('내 탕감액 무료 분석 시작')").first().click();
    await page.waitForTimeout(3000);

    // 3. step ≥ 1 mount 박힘
    const wrapper = await page.locator("[data-testid='live-toast-mount']").count();
    checks.push({ name: "step ≥ 1 토스트 래퍼 mount", pass: wrapper === 1, actual: wrapper });

    // 4. "지금까지" 카운터 0건
    const counterText = await page.locator("text=지금까지").count();
    checks.push({ name: '"지금까지 N명" 카운터 0건 (모든 페이지)', pass: counterText === 0, actual: counterText });

    const completedText = await page.locator("text=무료 자가진단 완료").count();
    checks.push({ name: '"무료 자가진단 완료" 0건', pass: completedText === 0, actual: completedText });

    // 5. step 4 진입
    await page.locator("button:has-text('2,000~4,000만원')").first().click();
    await page.waitForTimeout(500);
    await page.locator("button:has-text('직장인')").first().click();
    await page.waitForTimeout(500);
    await page.locator("button:has-text('다음으로')").first().click();
    await page.waitForTimeout(500);

    // 6. 동의 체크박스 = 2개 (3 → 2)
    const checkboxCount = await page.locator("input[type='checkbox']").count();
    checks.push({ name: "동의 체크박스 = 2개 (3 → 2 통합)", pass: checkboxCount === 2, actual: checkboxCount });

    // 7. 통합 카피
    const optionalText = await page.locator("text=마케팅 정보 수신 + 상담 사례 익명 활용 동의").count();
    checks.push({ name: "선택 동의 통합 카피", pass: optionalText === 1, actual: optionalText });

    // 8. body 안 옛 분리 카피 잔여 0건 (정확 매치)
    const bodyText = await page.locator("body").innerText();
    const oldMarketing = (bodyText.match(/\[선택\]\s+마케팅 정보 수신 동의(?!\s*\+)/g) || []).length;
    const oldCaseUse = (bodyText.match(/\[선택\]\s+상담 사례 익명 활용 동의(?!\s*$)/g) || []).length;
    checks.push({ name: "옛 분리 카피 (마케팅 정보 수신 동의 단독) 0건", pass: oldMarketing === 0, actual: oldMarketing });
    checks.push({ name: "옛 분리 카피 (상담 사례 익명 활용 동의 단독) 0건", pass: oldCaseUse === 0, actual: oldCaseUse });

    console.log("─".repeat(60));
    console.log("STEP_80 검증 결과");
    console.log("─".repeat(60));
    for (const c of checks) {
        const mark = c.pass ? "✅" : "❌";
        console.log(`${mark} ${c.name}: ${c.actual}`);
    }
    console.log("─".repeat(60));

    const failed = checks.filter((c) => !c.pass).length;
    if (failed > 0) {
        console.log(`❌ ${failed}건 실패`);
        process.exit(1);
    }
    console.log(`✅ ${checks.length}건 모두 통과`);

    await browser.close();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
