// STEP_63 — /ads 6 업종 × 6 매체 mockup 카피 동적 매핑 검증
// 각 업종 탭 클릭 후, 그 업종의 광고주명·헤드라인이 DOM 에 박혀있고
// 다른 업종의 광고주명은 박혀있지 않은지 확인.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = process.env.BASE_URL || "http://localhost:3000/ads";
const OUT = path.resolve(__dirname, "../_captures_step63");
fs.mkdirSync(OUT, { recursive: true });

const INDUSTRIES = [
    {
        id: "debt-relief", tabText: "개인회생",
        advertiserName: "법무법인 OO",
        signatures: ["변제계획 검토", "회생·파산", "개인회생 자격"],
        forbidden: ["정수기 OO", "OO 통신", "OO 투자교육", "OO 부동산", "OO 의원"],
    },
    {
        id: "rental", tabText: "렌탈",
        advertiserName: "정수기 OO",
        signatures: ["정수기", "맞춤 견적", "직수·얼음·미니", "렌탈"],
        forbidden: ["법무법인 OO", "OO 통신", "OO 투자교육", "OO 부동산", "OO 의원"],
    },
    {
        id: "broadband", tabText: "통신",
        advertiserName: "OO 통신",
        signatures: ["통신비", "결합 가입", "KT·SKT·LG U+"],
        forbidden: ["법무법인 OO", "정수기 OO", "OO 투자교육", "OO 부동산", "OO 의원"],
    },
    {
        id: "invest", tabText: "리딩",
        advertiserName: "OO 투자교육",
        signatures: ["무료 강좌", "기술적 분석", "금융투자협회"],
        forbidden: ["법무법인 OO", "정수기 OO", "OO 통신", "OO 부동산", "OO 의원",
                    "수익 보장", "100%", "리딩방", "매수 신호", "손실 없"],
    },
    {
        id: "realestate", tabText: "부동산",
        advertiserName: "OO 부동산",
        signatures: ["분양", "공인중개사", "신축·재건축"],
        forbidden: ["법무법인 OO", "정수기 OO", "OO 통신", "OO 투자교육", "OO 의원"],
    },
    {
        id: "medical", tabText: "병의원",
        advertiserName: "OO 의원",
        signatures: ["무료 상담", "전문의 자격", "사전심의"],
        forbidden: ["법무법인 OO", "정수기 OO", "OO 통신", "OO 투자교육", "OO 부동산",
                    "100%", "완치", "1위", "최고"],
    },
];

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    console.log(`🚀 ${BASE}`);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    const results = [];
    let totalFail = 0;

    for (const ind of INDUSTRIES) {
        console.log(`\n[${ind.id}] 탭 "${ind.tabText}" 클릭`);
        const tab = page.locator(`button:has-text("${ind.tabText}")`);
        try {
            await tab.first().click({ timeout: 5000 });
            await page.waitForTimeout(1000);
        } catch {
            console.log(`  ⚠️ 탭 클릭 실패`);
            results.push({ industry: ind.id, fail: true, reason: "탭 클릭 실패" });
            totalFail++;
            continue;
        }

        const text = await page.evaluate(() => document.body.innerText);

        // 광고주명 박힘 확인
        const advertiserOk = text.includes(ind.advertiserName);
        if (!advertiserOk) {
            console.log(`  ❌ 광고주명 "${ind.advertiserName}" 미박힘`);
            totalFail++;
        } else {
            console.log(`  ✅ 광고주명 "${ind.advertiserName}" 박힘`);
        }

        // 시그니처 카피 박힘 확인 (적어도 1개)
        const sigHits = ind.signatures.filter(s => text.includes(s));
        const sigOk = sigHits.length >= 1;
        if (!sigOk) {
            console.log(`  ❌ 시그니처 카피 0건 박힘 (예상: ${ind.signatures.join(", ")})`);
            totalFail++;
        } else {
            console.log(`  ✅ 시그니처 카피 ${sigHits.length}/${ind.signatures.length} 박힘 — ${sigHits.join(", ")}`);
        }

        // 금지 카피 누설 확인
        const forbiddenHits = ind.forbidden.filter(f => text.includes(f));
        const forbiddenOk = forbiddenHits.length === 0;
        if (!forbiddenOk) {
            console.log(`  ❌ 금지 카피 누설: ${forbiddenHits.join(", ")}`);
            totalFail++;
        } else {
            console.log(`  ✅ 금지 카피 누설 0건`);
        }

        results.push({
            industry: ind.id,
            advertiserOk,
            sigOk,
            sigHits,
            forbiddenOk,
            forbiddenHits,
        });

        await page.screenshot({ path: path.join(OUT, `${ind.id}.png`), fullPage: true });
    }

    console.log("\n============================================================");
    console.log("STEP_63 검증 결과");
    console.log("============================================================");
    results.forEach(r => {
        const sym = r.advertiserOk && r.sigOk && r.forbiddenOk ? "✅" : "❌";
        console.log(`  ${sym} ${r.industry.padEnd(12)} 광고주: ${r.advertiserOk ? "OK" : "FAIL"} / 시그니처: ${r.sigHits ? r.sigHits.length : 0} 박힘 / 금지: ${r.forbiddenHits ? r.forbiddenHits.length : 0} 누설`);
    });
    console.log(`\n총 실패: ${totalFail}`);

    fs.writeFileSync(path.join(OUT, "result.json"), JSON.stringify({ results, totalFail }, null, 2));
    await browser.close();
    process.exit(totalFail === 0 ? 0 : 1);
})();
