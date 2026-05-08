import { chromium } from "@playwright/test";

const URL = "https://otpage1.com/select11";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 412, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

const checks = [];
const ok = (name, cond, actual) => checks.push({ name, pass: cond, actual });

await page.waitForTimeout(2000);
ok("step 0 토스트 X", await page.locator("[data-testid='live-toast-mount']").count() === 0, 0);

// CTA 클릭
await page.locator("button:has-text('내 탕감액 무료 분석 시작')").first().click();
await page.waitForTimeout(8000); // toast fetch

// Step 1 카드 layout 검증
const debtBtn = await page.locator("button:has-text('2,000~4,000만원')").first();
const debtBox = await debtBtn.boundingBox();
ok(`Step 1 카드 너비 ≥ 300px (1줄 1카드)`, debtBox && debtBox.width >= 300, debtBox?.width);

// 6 카드 모두 노출 (만원 4개 + 1억원 + 5억원 = 6 전체)
const debtCount = await page.locator("button").filter({ hasText: /만원|억원/ }).count();
ok(`Step 1 카드 6개 노출`, debtCount >= 6, debtCount);

// 토스트 모션 박스 마운트
const toastWrapper = await page.locator("[data-testid='live-toast-mount'] div[aria-live='polite']").count();
ok(`토스트 wrapper 마운트`, toastWrapper === 1, toastWrapper);

// 토스트 위치 (bottom: 80px)
const toastBox = page.locator("[data-testid='live-toast-mount'] div[aria-live='polite']").first();
const toastStyle = await toastBox.evaluate((el) => window.getComputedStyle(el).bottom);
ok(`토스트 bottom = 80px (옛 16px 변경)`, toastStyle === "80px", toastStyle);

// fake fixture 노출
const anyNickname = await page.locator("text=/[김이박최서정강윤임한]\\*[가-힣]/").count();
ok(`fake fixture 익명 1+ 노출`, anyNickname >= 1, anyNickname);

// Step 1 안내
const notice = await page.locator("text=1,000만원 미만은 법적 절차 진행이 어렵습니다").count();
ok(`Step 1 안내 박힘`, notice === 1, notice);

console.log("─".repeat(60));
console.log("STEP_83 라이브 검증 (production)");
console.log("─".repeat(60));
for (const c of checks) {
    console.log(`${c.pass ? "✅" : "❌"} ${c.name}: ${c.actual}`);
}
console.log("─".repeat(60));
const failed = checks.filter(c => !c.pass).length;
if (failed > 0) {
    console.log(`❌ ${failed}건 실패`);
    process.exit(1);
}
console.log(`✅ ${checks.length}건 모두 통과`);
await browser.close();
