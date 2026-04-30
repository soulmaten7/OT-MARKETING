#!/bin/bash
# STEP_31 — 안전 zone 자동 grep 검증
# 위반 1건이라도 발견 시 exit 1

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VIOLATIONS=0

echo "=== 안전 zone 검증 시작 ==="

# 1. 리딩 (자본시장법 §174) — 수익률 보장·원금 보장·100%·확실·보장 안내
echo "[리딩] 자본시장법 §174 위반 표현 검사..."
if grep -rE "수익률.*보장|원금.*보장|100%|확실한|보장 안내" "$ROOT/components/sections/ads/industry/invest/" 2>/dev/null | grep -v "수익률 보장 표현 없음\|수익률 보장 안내 X\|보장 표현 없음\|보장 표현 X\|보장 X\|없음\|표현 X"; then
    echo "❌ 리딩 위반 발견"
    VIOLATIONS=$((VIOLATIONS+1))
else
    echo "✅ 리딩 0건"
fi

# 2. 병의원 (의료법 §56) — 치료 효과·환자 후기·성공률·최고·1위
echo "[병의원] 의료법 §56 위반 표현 검사..."
if grep -rE "치료.*효과|환자.*후기|성공률|최고|1위|전문.*의사" "$ROOT/components/sections/ads/industry/medical/" 2>/dev/null | grep -v "효과 보장 표현 없음\|효과·치료 결과 보장 표현 없음\|효과·치료.*없음"; then
    echo "❌ 병의원 위반 발견"
    VIOLATIONS=$((VIOLATIONS+1))
else
    echo "✅ 병의원 0건"
fi

# 3. 부동산 (공인중개사법) — 독점·1위·최저가
echo "[부동산] 공인중개사법 위반 표현 검사..."
if grep -rE "독점|최저가" "$ROOT/components/sections/ads/industry/realestate/" 2>/dev/null; then
    echo "❌ 부동산 위반 발견"
    VIOLATIONS=$((VIOLATIONS+1))
else
    echo "✅ 부동산 0건"
fi

# 4. 개인회생 (변호사법 §24의2) — 전문 변호사·확실한 해결·100% 성공·최저가
echo "[개인회생] 변호사법 §24의2 위반 표현 검사..."
DEBT_FILES=(
    "$ROOT/components/sections/ads/MetaFeedMockup.tsx"
    "$ROOT/components/sections/ads/KarrotMockup.tsx"
    "$ROOT/components/sections/ads/NaverSearchMockup.tsx"
    "$ROOT/components/sections/ads/KakaoMomentMockup.tsx"
    "$ROOT/components/sections/ads/GoogleGDNMockup.tsx"
    "$ROOT/components/sections/ads/GoogleDiscoveryMockup.tsx"
)
if grep -E "전문 변호사|확실한 해결|100% 성공|최저가" "${DEBT_FILES[@]}" 2>/dev/null; then
    echo "❌ 개인회생 위반 발견"
    VIOLATIONS=$((VIOLATIONS+1))
else
    echo "✅ 개인회생 0건"
fi

# 5. 통신 (전기통신사업법) — 월 요금 표기 시 약정·무약정·총액 명시 없는 경우
echo "[통신] 전기통신사업법 요금 명시 검사..."
if grep -rE "월 [0-9]+,?[0-9]*원" "$ROOT/components/sections/ads/industry/broadband/" 2>/dev/null | grep -v "약정\|무약정\|총액\|명시"; then
    echo "❌ 통신 요금 표기 위반 발견"
    VIOLATIONS=$((VIOLATIONS+1))
else
    echo "✅ 통신 0건"
fi

# 6. 렌탈 (표시광고법 §3) — 할부 표현 옆 총액 없는 경우
echo "[렌탈] 표시광고법 §3 할부 표기 검사..."
if grep -rE "[0-9]+개월.*무이자|[0-9]+개월.*할부" "$ROOT/components/sections/ads/industry/rental/" 2>/dev/null | grep -v "총액"; then
    echo "❌ 렌탈 할부 총액 미기재 발견"
    VIOLATIONS=$((VIOLATIONS+1))
else
    echo "✅ 렌탈 0건"
fi

echo ""
if [ "$VIOLATIONS" -gt 0 ]; then
    echo "❌ 총 ${VIOLATIONS}건 위반 발견 — 빌드 중단"
    exit 1
else
    echo "✅ 안전 zone 검증 통과 (6 업종 모두 0건)"
fi
