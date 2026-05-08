// STEP_82 — DOM 검증 (fake fixture 10명 즉시 활성)
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
    // dev 환경에서 /api/boglaw-live-toast 첫 컴파일 + fetch 약 7초 — 충분히 대기
    await page.waitForTimeout(9000);

    // 3. step 1 토스트 래퍼 mount
    const wrapper = await page.locator("[data-testid='live-toast-mount']").count();
    checks.push({ name: "step 1 래퍼 mount", pass: wrapper === 1, actual: wrapper });

    // 4. 토스트 모션 박스 마운트 (aria-live 후손 div)
    const toastBox = await page.locator("[data-testid='live-toast-mount'] div[aria-live='polite']").count();
    checks.push({ name: "토스트 aria-live wrapper 마운트", pass: toastBox >= 1, actual: toastBox });

    // 5. fake fixture 익명 1명 이상 노출
    const anyNickname = await page.locator("text=/[김이박최서정강윤임한]\\*[가-힣]/").count();
    checks.push({ name: "fake fixture 익명 1+ 노출", pass: anyNickname >= 1, actual: anyNickname });

    // 6. 액션 카피 1+ 노출
    const anyAction = await page.locator("text=/(무료 상담을 신청|1:1 비밀 상담을 신청|접수를 완료|면책 성공 여부를 확인)했습니다/").count();
    checks.push({ name: "액션 카피 1+ 노출", pass: anyAction >= 1, actual: anyAction });

    // 7. 옛 카운터 카피 0건
    const counterCopy = await page.locator("text=지금까지").count();
    checks.push({ name: "옛 카운터 0건", pass: counterCopy === 0, actual: counterCopy });

    // 8. API 직접 호출 → fake fixture 10명 검증
    const apiRes = await page.request.get(`${URL.replace('/select11', '')}/api/boglaw-live-toast`);
    const apiData = await apiRes.json();
    const isLivePhase = apiData.phase === "live";
    const recentLength = apiData.recent?.length || 0;
    checks.push({ name: "API phase = live", pass: isLivePhase, actual: apiData.phase });
    checks.push({ name: "API recent.length = 10", pass: recentLength === 10, actual: recentLength });

    // 9. STEP_80 동의 통합 보존
    await page.locator("button:has-text('2,000~4,000만원')").first().click();
    await page.waitForTimeout(300);
    await page.locator("button:has-text('직장인')").first().click();
    await page.waitForTimeout(300);
    await page.locator("button:has-text('다음으로')").first().click();
    await page.waitForTimeout(300);
    const checkboxCount = await page.locator("input[type='checkbox']").count();
    checks.push({ name: "동의 체크박스 = 2개 (STEP_80)", pass: checkboxCount === 2, actual: checkboxCount });

    console.log("─".repeat(60));
    console.log("STEP_82 검증 결과");
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
