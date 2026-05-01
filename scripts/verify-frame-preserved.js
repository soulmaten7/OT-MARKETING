#!/usr/bin/env node
/**
 * STEP_33 폰 프레임 보존 검증
 *
 * 검증 대상:
 * 1. PhoneFrame.tsx 의 핵심 라인 (aspect-[9/19.5], rounded-[2.5rem], bg-gray-900) 유지
 * 2. industry/index.tsx 의 36 mockup 매체 라벨 ("Meta 피드", "당근 비즈프로필", "Naver 검색광고", "카카오 모먼트", "Google GDN", "Google Discovery") 보존
 * 3. industry/index.tsx 의 industryMockups 매핑 6 업종 모두 정상 (각자 자기 폴더 import)
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

// 2) industry/index.tsx 라벨·매핑 검증
const indexPath = path.join(ROOT, "components/sections/ads/industry/index.tsx");
const idx = fs.readFileSync(indexPath, "utf-8");
const labels = ["Meta 피드", "당근 비즈프로필", "Naver 검색광고", "카카오 모먼트", "Google GDN", "Google Discovery"];
for (const lbl of labels) {
    const count = (idx.match(new RegExp(lbl, "g")) || []).length;
    if (count < 6) {
        failures.push({ kind: "industryMockups label", label: lbl, count, expected: ">= 6 (6 업종 × 1)" });
    }
}

// 3) industry 폴더 import 검증
const expectedImports = [
    "./rental/MetaFeed",
    "./broadband/MetaFeed",
    "./invest/MetaFeed",
    "./realestate/MetaFeed",
    "./medical/MetaFeed",
];
for (const imp of expectedImports) {
    if (!idx.includes(imp)) {
        failures.push({ kind: "industry import", expected: imp });
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
