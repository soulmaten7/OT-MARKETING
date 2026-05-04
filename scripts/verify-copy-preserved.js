#!/usr/bin/env node
/**
 * STEP_31 카피 swap 자동 검증
 *
 * 36 mockup 파일 각각에 대해 copy-swap-log.json 의 headline + body 가
 * 파일에 포함되는지 1:1 검증.
 *
 * 불일치 1건이라도 있으면 exit code 1 (배포 중단).
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const log = JSON.parse(fs.readFileSync(path.join(ROOT, "data/copy-swap-log.json"), "utf-8"));

// channel id → file name mapping
const CHANNEL_FILE = {
    "meta": "MetaFeed",
    "karrot": "Karrot",
    "naver": "NaverSearch",
    "kakao": "KakaoMoment",
    "google-gdn": "GoogleGDN",
    "google-discovery": "GoogleDiscovery",
};

// STEP_63: debt-relief 카피가 lib/industry-mockup-copy.ts (select1) 로 이전됨.
// 6 mockup 파일은 getMockupCopy(industry) 호출로 동적 매핑.
// 따라서 debt-relief 검증 = (1) lib/industry-mockup-copy.ts 에 headline/body 박힘 + (2) mockup 파일이 getMockupCopy 임포트.
const INDUSTRY_COPY_LIB = path.join(ROOT, "lib/industry-mockup-copy.ts");
const industryCopyContent = fs.existsSync(INDUSTRY_COPY_LIB) ? fs.readFileSync(INDUSTRY_COPY_LIB, "utf-8") : "";

// debt-relief uses default mockups (no industry subfolder)
function getFilePath(industry, channel) {
    const base = CHANNEL_FILE[channel];
    if (industry === "debt-relief") {
        return path.join(ROOT, `components/sections/ads/${base}Mockup.tsx`);
    }
    return path.join(ROOT, `components/sections/ads/industry/${industry}/${base}.tsx`);
}

const failures = [];
const successes = [];

for (const m of log.mappings) {
    const filePath = getFilePath(m.industry, m.channel);
    if (!fs.existsSync(filePath)) {
        failures.push({
            industry: m.industry,
            channel: m.channel,
            error: `FILE_NOT_FOUND: ${filePath}`,
        });
        continue;
    }
    const content = fs.readFileSync(filePath, "utf-8");

    // STEP_63: debt-relief 는 동적 매핑 — lib/industry-mockup-copy.ts 의 select1 entry 검증
    if (m.industry === "debt-relief") {
        const hasHeadline = industryCopyContent.includes(m.headline);
        const hasBody = industryCopyContent.includes(m.body);
        const usesGetMockupCopy = content.includes("getMockupCopy") && content.includes("@/lib/industry-mockup-copy");

        if (!hasHeadline || !hasBody || !usesGetMockupCopy) {
            failures.push({
                industry: m.industry,
                channel: m.channel,
                file: filePath.replace(ROOT, ""),
                keyword: m.keyword,
                headline: m.headline,
                body: m.body,
                hasHeadline,
                hasBody,
                usesGetMockupCopy,
                note: "STEP_63: debt-relief 카피는 lib/industry-mockup-copy.ts (select1) 에 박혀있고, mockup 파일은 getMockupCopy 호출.",
            });
        } else {
            successes.push({ industry: m.industry, channel: m.channel });
        }
        continue;
    }

    // 5 다른 업종 = 정적 매핑 (industry/<industry>/<Channel>.tsx)
    const hasHeadline = content.includes(m.headline);
    const hasBody = content.includes(m.body);

    if (!hasHeadline || !hasBody) {
        failures.push({
            industry: m.industry,
            channel: m.channel,
            file: filePath.replace(ROOT, ""),
            keyword: m.keyword,
            headline: m.headline,
            body: m.body,
            hasHeadline,
            hasBody,
        });
    } else {
        successes.push({ industry: m.industry, channel: m.channel });
    }
}

console.log("=".repeat(60));
console.log("STEP_31 카피 swap 검증");
console.log("=".repeat(60));
console.log(`총: ${log.mappings.length} (industry × channel)`);
console.log(`통과: ${successes.length}`);
console.log(`실패: ${failures.length}`);

if (failures.length > 0) {
    console.log("\n=== 실패 상세 ===");
    for (const f of failures) {
        console.log(`\n[${f.industry} × ${f.channel}]`);
        console.log(`  file: ${f.file || f.error}`);
        if (f.headline !== undefined) {
            console.log(`  헤드라인 "${f.headline}" → ${f.hasHeadline ? "✅" : "❌ 미발견"}`);
            console.log(`  본문    "${f.body}" → ${f.hasBody ? "✅" : "❌ 미발견"}`);
        }
    }
    process.exit(1);
}

console.log("\n✅ 36/36 매핑 모두 일치");
console.log("\n=== 통과 매핑 (sample 12) ===");
for (const m of log.mappings.slice(0, 12)) {
    console.log(`  ${m.industry.padEnd(11)} × ${m.channel.padEnd(18)} | h: "${m.headline}" / b: "${m.body}"`);
}
