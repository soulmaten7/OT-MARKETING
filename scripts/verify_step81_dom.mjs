// STEP_81 — DOM 검증 (토스트 다크 슬라이드 + 액션 4종 + Step 1 안내)
import { chromium } from "@playwright/test";

const URL = process.env.URL || "http://localhost:3000/select11";

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 412, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });

    const checks = [];

    // 1. 첫 페이지 토스트 X
    await page.waitForTimeout(2000);
    const toastStep0 = await page.locator("[data-testid='live-toast-mount']").count();
    checks.push({ name: "step 0 토스트 X", pass: toastStep0 === 0, actual: toastStep0 });

    // 2. CTA 클릭 → step 1
    await page.locator("button:has-text('내 탕감액 무료 분석 시작')").first().click();
    await page.waitForTimeout(1500);

    // 3. Step 1 안내
    const noticeText = await page.locator("text=1,000만원 미만은 법적 절차 진행이 어렵습니다").count();
    checks.push({ name: "Step 1 채무 안내 1건", pass: noticeText === 1, actual: noticeText });

    // 4. step 1 토스트 래퍼 mount
    const wrapper = await page.locator("[data-testid='live-toast-mount']").count();
    checks.push({ name: "step 1 토스트 래퍼 mount", pass: wrapper === 1, actual: wrapper });

    // 5. 옛 카운터 카피 0건
    const counterCopy = await page.locator("text=지금까지").count();
    checks.push({ name: "옛 카운터 카피 0건", pass: counterCopy === 0, actual: counterCopy });

    // 6~7. 옛 액션 카피 잔여 0건
    const oldAction1 = await page.locator("text=무료 자가진단을 신청했습니다").count();
    const oldAction2 = await page.locator("text=면책 가능액을 확인했습니다").count();
    checks.push({ name: "옛 액션 '무료 자가진단을 신청' 0건", pass: oldAction1 === 0, actual: oldAction1 });
    checks.push({ name: "옛 액션 '면책 가능액을 확인' 0건", pass: oldAction2 === 0, actual: oldAction2 });

    // 8. STEP_80 동의 통합 보존 (Step 4 진입 후)
    await page.locator("button:has-text('2,000~4,000만원')").first().click();
    await page.waitForTimeout(300);
    await page.locator("button:has-text('직장인')").first().click();
    await page.waitForTimeout(300);
    await page.locator("button:has-text('다음으로')").first().click();
    await page.waitForTimeout(300);
    const checkboxCount = await page.locator("input[type='checkbox']").count();
    checks.push({ name: "동의 체크박스 = 2개 (STEP_80 보존)", pass: checkboxCount === 2, actual: checkboxCount });

    console.log("─".repeat(60));
    console.log("STEP_81 검증 결과");
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
