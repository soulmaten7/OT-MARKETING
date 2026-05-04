#!/usr/bin/env node
/**
 * STEP_33 폰 프레임 보존 검증
 *
 * 검증 대상 (STEP_62 갱신):
 * 1. PhoneFrame.tsx 의 핵심 라인 (aspect-[9/19.5], rounded-[2.5rem], bg-gray-900) 유지
 * 2. industry/index.tsx 의 6 매체 라벨 ("Meta 피드", "당근 비즈프로필", "Naver 검색광고", "카카오 모먼트", "Google GDN", "Google Discovery") 보존
 * 3. industry/index.tsx 의 6 업종 매핑 (debt-relief·rental·broadband·invest·realestate·medical) 박힘
 *    (옛 = 5 업종별 별도 폴더 import / 새 = 통합 6 mockup + industry props 동적 매핑)
 * 4. 36 mockup 파일 존재 (통합 6 + 옛 5 업종 × 6 = 보존)
 *
 * 1건이라도 fail → exit 1.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const failures = [];

// 1) PhoneFrame.tsx 핵심 라인 검증
const phoneFramePath = path.join(ROOT, "components/sections/ads/PhoneFrame.tsx");
const pf = fs.readFileSync(phoneFramePath, "utf-8");
const phoneMustHave = ["aspect-[9/19.5]", "rounded-[2.5rem]", "bg-gray-900"];
for (const must of phoneMustHave) {
    if (!pf.includes(must)) {
        failures.push({ kind: "PhoneFrame", missing: must });
    }
}

// 2) industry/index.tsx 라벨 + 6 업종 키 검증 (STEP_62 통합 패턴 호환)
const indexPath = path.join(ROOT, "components/sections/ads/industry/index.tsx");
const idx = fs.readFileSync(indexPath, "utf-8");
const labels = ["Meta 피드", "당근 비즈프로필", "Naver 검색광고", "카카오 모먼트", "Google GDN", "Google Discovery"];
for (const lbl of labels) {
    if (!idx.includes(lbl)) {
        failures.push({ kind: "industryMockups label missing", label: lbl });
    }
}

// 3) 6 업종 키 박힘 검증 (옛 = 6 객체 키 / 새 = INDUSTRY_SLUG_MAP 안에 박힘)
const expectedIndustries = ["debt-relief", "rental", "broadband", "invest", "realestate", "medical"];
for (const ind of expectedIndustries) {
    if (!idx.includes(`"${ind}"`)) {
        failures.push({ kind: "industry key missing", industry: ind });
    }
}

// 4) 36 mockup 파일 존재 검증
const channels = ["MetaFeed", "Karrot", "NaverSearch", "KakaoMoment", "GoogleGDN", "GoogleDiscovery"];
const industries = ["rental", "broadband", "invest", "realestate", "medical"];
const defaultMockups = ["MetaFeedMockup", "KarrotMockup", "NaverSearchMockup", "KakaoMomentMockup", "GoogleGDNMockup", "GoogleDiscoveryMockup"];

for (const m of defaultMockups) {
    const f = path.join(ROOT, `components/sections/ads/${m}.tsx`);
    if (!fs.existsSync(f)) failures.push({ kind: "default mockup file", missing: f });
}
for (const ind of industries) {
    for (const ch of channels) {
        const f = path.join(ROOT, `components/sections/ads/industry/${ind}/${ch}.tsx`);
        if (!fs.existsSync(f)) failures.push({ kind: "industry mockup file", missing: f });
    }
}

console.log("============================================================");
console.log("STEP_33 폰 프레임·구조 보존 검증");
console.log("============================================================");
if (failures.length > 0) {
    console.log(`❌ 실패 ${failures.length}건`);
    for (const f of failures) {
        console.log("  - " + JSON.stringify(f));
    }
    process.exit(1);
}
console.log("✅ PhoneFrame.tsx 핵심 라인 보존");
console.log("✅ 6 매체 라벨 보존 (각 6 업종 × 1)");
console.log("✅ industry/index.tsx 5 업종 import 정상");
console.log(`✅ 36 mockup 파일 모두 존재`);
