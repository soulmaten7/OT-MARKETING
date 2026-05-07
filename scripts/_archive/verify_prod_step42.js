// STEP_42 production 검증 — otpage1.com 라이브에 이미지 제거 반영 확인

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const PROD = "https://otpage1.com/";
const OUT_DIR = path.resolve(__dirname, "../_captures_step42_prod");
fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    console.log(`🌐 Production check: ${PROD}`);
    await page.goto(PROD, { waitUntil: "networkidle", timeout: 30000 });

    // Diagnosis 영역으로 스크롤
    await page.locator('[data-testid="diagnosis-oqps"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // 첫 화면 (debt = Q1)
    await page.waitForSelector(`[data-testid="question-screen-debt"]`, { state: "visible", timeout: 8000 });
    await page.waitForTimeout(400);

    const screen = await page.locator(`[data-testid="question-screen-debt"]`).first();

    // 이미지 영역 검출 — 옛 QuestionImage 컨테이너 / SVG 일러스트 / aspect-square
    const detect = await page.evaluate(() => {
        const root = document.querySelector('[data-testid="diagnosis-oqps"]');
        if (!root) return { found: "diagnosis 미발견" };

        // 옛 SVG 일러스트 흔적 (QuestionImage 의 svg 들)
        const innerSvgs = root.querySelectorAll("svg");
        const svgWithViewBox = Array.from(innerSvgs).filter((s) => {
            const w = parseFloat(s.getAttribute("width") || "0");
            const h = parseFloat(s.getAttribute("height") || "0");
            return (w >= 100 && h >= 100) || s.getAttribute("viewBox")?.split(" ").map(Number).some((n) => n >= 100);
        });

        // aspectRatio 1/1 / aspect-square 컨테이너
        const aspectContainers = Array.from(root.querySelectorAll("*")).filter((el) => {
            const cs = getComputedStyle(el);
            return cs.aspectRatio === "1 / 1" || el.className?.toString().includes("aspect-square");
        });

        // QuestionImage 안의 svg 는 일반 체크 svg 보다 큼 (illustration 검출)
        return {
            largeSvgCount: svgWithViewBox.length,
            aspectContainerCount: aspectContainers.length,
            allSvgCount: innerSvgs.length,
        };
    });

    const questionText = await screen.locator("h2").first().innerText();
    const optBox = await screen.locator("button").first().boundingBox();

    await page.screenshot({ path: path.join(OUT_DIR, "01_prod_Q1.png"), fullPage: false });

    console.log("\n📊 Production 검증");
    console.log("질문 텍스트:", questionText);
    console.log("첫 옵션 height:", Math.round(optBox?.height ?? 0), "px");
    console.log("일러스트 SVG (height/width ≥100):", detect.largeSvgCount, "개");
    console.log("aspect 1/1 컨테이너:", detect.aspectContainerCount, "개");
    console.log("전체 SVG:", detect.allSvgCount, "개 (체크 아이콘은 정상 — 옵션 선택 시 표시)");

    const removed = detect.largeSvgCount === 0 && detect.aspectContainerCount === 0;
    console.log(`\n결과: ${removed ? "✅ 이미지 영역 제거 라이브 반영됨" : "❌ 옛 이미지 잔존 — Vercel 배포 미반영 가능"}`);
    console.log(`📁 캡처: ${OUT_DIR}/01_prod_Q1.png`);

    await browser.close();
    process.exit(removed ? 0 : 1);
})();
