import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 412, height: 900 } });
const page = await ctx.newPage();
await page.goto("https://otpage1.com/select11", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

await page.locator("button:has-text('내 탕감액 무료 분석 시작')").first().click();
await page.waitForTimeout(8000);

// 토스트 박스 너비 측정 (320px 고정)
const toastBox = page.locator("[data-testid='live-toast-mount'] div[aria-live='polite'] > div").first();
const box1 = await toastBox.boundingBox();
console.log(`첫 토스트 박스 너비: ${box1?.width}px (목표 = 320 또는 calc(100vw - 32))`);

// 회전 간격 검증 = 8초 후 다음 콘텐츠로 변경 (5초 → 8초)
const text1 = await toastBox.textContent();
console.log(`t=0  콘텐츠: ${text1?.slice(0, 30)}`);

await page.waitForTimeout(6000); // 6초 후 = 회전 X (옛 5초였으면 이미 변경)
const text2 = await toastBox.textContent();
const same = text1 === text2;
console.log(`t=6s 콘텐츠: ${text2?.slice(0, 30)} (같음=${same})`);

await page.waitForTimeout(3000); // 6+3=9초 후 = 회전 후 (8초 ↑)
const text3 = await toastBox.textContent();
console.log(`t=9s 콘텐츠: ${text3?.slice(0, 30)}`);

// 박스 너비 = 콘텐츠 변경되어도 동일
const box2 = await toastBox.boundingBox();
const widthSame = box1?.width === box2?.width;
console.log(`회전 후 박스 너비: ${box2?.width}px (변경 전과 같음=${widthSame})`);

let pass = 0, fail = 0;
const w = box1?.width;
const widthOK = w >= 280 && w <= 380;
console.log(`\n${widthOK ? "✅" : "❌"} 박스 너비 ≈ 320px (실제 ${w}px)`);
widthOK ? pass++ : fail++;

console.log(`${widthSame ? "✅" : "❌"} 박스 너비 회전 전후 동일 (${box1?.width} vs ${box2?.width})`);
widthSame ? pass++ : fail++;

console.log(`${same ? "✅" : "❌"} 6초 시점 같은 콘텐츠 (회전 5→8초 검증)`);
same ? pass++ : fail++;

console.log(`\n=== ${pass}/3 PASS ===`);
await browser.close();
process.exit(fail > 0 ? 1 : 0);
