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
