#!/usr/bin/env node
/**
 * STEP_37 OQPS Diagnosis 자동 검증
 *
 * 9 화면 전부 렌더링 + 자동 전환 + 진행 바 정확성 + 시각 캡처.
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3717";
const SLUG = "select1"; // debt-relief
const CAPTURE_DIR = path.resolve(__dirname, "../../data/oqps-captures");
fs.mkdirSync(CAPTURE_DIR, { recursive: true });

const Q_IDS = ["debt", "debt_types", "overdue", "income", "job", "family", "collection", "assets", "history"];

// 각 질문의 첫 옵션 (자동 전환 트리거 용)
const FIRST_OPTION = {
    debt: "1000_3000",
    debt_types: "card",       // multi
    overdue: "1_3months",
    income: "regular",
    job: "employed",
    family: "1_2",
    collection: "warning",
    assets: "none",            // multi
    history: "none",
};

const MULTI_QS = new Set(["debt_types", "assets"]);

(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 }, // iPhone 14 사이즈
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();

    console.log(`Loading ${BASE}/${SLUG} ...`);
    await page.goto(`${BASE}/${SLUG}`, { waitUntil: "networkidle" });

    // Hero 의 진단 시작 버튼 또는 자동 스크롤
    // 자가진단 영역 스크롤
    await page.evaluate(() => {
        const el = document.querySelector('[data-testid="diagnosis-oqps"]');
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    });
    await page.waitForTimeout(500);

    const results = [];
    const failures = [];

    for (let i = 0; i < Q_IDS.length; i++) {
        const qId = Q_IDS[i];
        const isMulti = MULTI_QS.has(qId);

        // visible 상태까지 명시 대기 (AnimatePresence transition 완료 보장)
        try {
            await page.waitForSelector(`[data-testid="question-screen-${qId}"]`, { state: "visible", timeout: 5000 });
            // 추가로 옵션 버튼이 클릭 가능한 상태까지
            await page.waitForSelector(`[data-testid="question-screen-${qId}"] button[aria-pressed]`, { state: "visible", timeout: 3000 });
        } catch {
            failures.push({ index: i, qId, error: `[data-testid="question-screen-${qId}"] not visible within timeout` });
            await page.screenshot({ path: path.join(CAPTURE_DIR, `Q${i + 1}_${qId}_FAIL.png`), fullPage: true });
            continue;
        }
        const screen = page.locator(`[data-testid="question-screen-${qId}"]`);

        // 진행 바 확인 (퍼센트 텍스트)
        const expectedPct = Math.round(((i + 1) / Q_IDS.length) * 100);
        const pctOk = await page.locator(`text=${expectedPct}%`).count();

        // 캡처
        const capPath = path.join(CAPTURE_DIR, `Q${i + 1}_${qId}.png`);
        await page.screenshot({ path: capPath, fullPage: true });

        results.push({ index: i, qId, isMulti, expectedPct, pctOk: pctOk > 0 });

        // 다음 화면으로 이동 — scope 좁히기 (question-screen 안에서만)
        const screenScope = page.locator(`[data-testid="question-screen-${qId}"]`);
        if (isMulti) {
            // multi: 첫 옵션 클릭 후 next 버튼
            const firstOpt = screenScope.locator('button[aria-pressed]').first();
            const optCount = await firstOpt.count();
            if (optCount > 0) {
                await firstOpt.click();
                await page.waitForTimeout(150);
            }
            const nextBtn = page.locator('[data-testid="next-button"]').first();
            const nextCount = await nextBtn.count();
            if (nextCount === 0) {
                failures.push({ index: i, qId, error: "next-button missing on multi" });
                continue;
            }
            const enabled = await nextBtn.isEnabled();
            if (!enabled) {
                failures.push({ index: i, qId, error: "next-button disabled on multi" });
                continue;
            }
            await nextBtn.click();
            await page.waitForTimeout(550);
        } else {
            // single: 첫 옵션 클릭 = 자동 전환
            const firstOpt = screenScope.locator('button[aria-pressed]').first();
            const c = await firstOpt.count();
            if (c === 0) {
                failures.push({ index: i, qId, error: "no option button found inside screen scope" });
                continue;
            }
            await firstOpt.click();
            await page.waitForTimeout(550);
        }
    }

    // 마지막: completing-overlay 또는 결과 화면 확인
    await page.waitForTimeout(1000);
    const overlayShown = await page.locator(`[data-testid="completing-overlay"]`).count();
    const resultRendered = await page.locator("text=결과").count();

    await page.screenshot({ path: path.join(CAPTURE_DIR, "Q_FINAL.png"), fullPage: true });

    await browser.close();

    console.log(`\n=== STEP_37 OQPS 검증 ===`);
    console.log(`9 화면 통과: ${results.length}/${Q_IDS.length}`);
    console.log(`실패: ${failures.length}`);
    if (failures.length > 0) {
        for (const f of failures) console.log(`  ❌ Q${f.index + 1} ${f.qId}: ${f.error}`);
    }
    console.log(`\n각 화면 진행 바 검증:`);
    for (const r of results) {
        console.log(`  ${r.pctOk ? "✅" : "❌"} Q${r.index + 1} ${r.qId} (${r.isMulti ? "multi" : "single"}) → ${r.expectedPct}%`);
    }
    console.log(`\n완료 오버레이 또는 결과 화면 도달: ${overlayShown > 0 || resultRendered > 0 ? "✅" : "⚠️"}`);
    console.log(`\n캡처: ${CAPTURE_DIR}`);

    if (failures.length > 0) process.exit(1);
})().catch((e) => { console.error("실패:", e.message); process.exit(2); });
