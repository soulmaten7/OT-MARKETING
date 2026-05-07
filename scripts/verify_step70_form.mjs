// STEP_70 — /select11 4 단계 progressive form 통과 검증 (제출 X)
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile Safari/604.1",
    locale: "ko-KR",
});
const page = await ctx.newPage();
await page.goto("https://otpage1.com/select11", { waitUntil: "networkidle", timeout: 30000 });

let failed = 0;
const ok = (label, cond) => {
    console.log(`${cond ? "✅" : "❌"} ${label}`);
    if (!cond) failed++;
};

// 단계 1: 채무 금액
const debtBtn = await page.locator('button:has-text("4,000~6,000만원")').count();
ok(`step 1 옵션 "4,000~6,000만원" 박힘 (${debtBtn})`, debtBtn === 1);
await page.click('button:has-text("4,000~6,000만원")');
await page.waitForTimeout(800);

// 단계 2: 직업
const jobBtn = await page.locator('button:has-text("직장인")').count();
ok(`step 2 옵션 "직장인" 박힘 (${jobBtn})`, jobBtn === 1);
await page.click('button:has-text("직장인")');
await page.waitForTimeout(800);

// 단계 3: textarea
const textareaCount = await page.locator("textarea").count();
ok(`step 3 textarea (${textareaCount})`, textareaCount === 1);
await page.fill("textarea", "테스트 사용자 시나리오");

const nextBtn = await page.locator('button:has-text("다음으로")').count();
ok(`step 3 "다음으로" 버튼 (${nextBtn})`, nextBtn === 1);
await page.click('button:has-text("다음으로")');
await page.waitForTimeout(800);

// 단계 4: 이름·휴대폰·동의
const nameInput = await page.locator('input[type="text"]').count();
ok(`step 4 name input (${nameInput})`, nameInput >= 1);
const phoneInputs = await page.locator('input[type="tel"]').count();
ok(`step 4 phone tel input ${phoneInputs} (3 분할)`, phoneInputs === 3);
const submitBtn = await page.locator('button:has-text("내 탕감액 확인하기")').count();
ok(`step 4 제출 버튼 "내 탕감액 확인하기" (${submitBtn})`, submitBtn === 1);

// 입력 (제출은 X)
await page.fill('input[type="text"]', "테스트");
const phoneEls = page.locator('input[type="tel"]');
await phoneEls.nth(1).fill("1234");
await phoneEls.nth(2).fill("5678");

// 동의 체크
const checkboxes = await page.locator('input[type="checkbox"]').count();
ok(`동의 checkbox (${checkboxes})`, checkboxes >= 1);

// 스크린샷
await page.screenshot({ path: "scripts/_step70_step4.png", fullPage: true });
console.log(`📸 scripts/_step70_step4.png 저장`);

await browser.close();
if (failed > 0) {
    console.log(`\n❌ ${failed}건 실패`);
    process.exit(1);
}
console.log("\n✅ 4 단계 폼 통과");
