/**
 * STEP_62 — 6 업종 × 6 매체 = 36 mockup 통합 매핑
 *
 * 옛 (STEP_27): 5 업종별 별도 컴포넌트 (rental/MetaFeed.tsx 등) = 30 placeholder
 * 새 (STEP_62): 통합 6 mockup (ads/MetaFeedMockup.tsx 등) + industry props (select1~6)
 *   = 동적 이미지 매핑 (lib/adsImageMap.ts)
 *
 * 옛 5 업종 별도 컴포넌트 = 보존 (deprecated, 미사용). 추후 archive 검토.
 */

import type { ReactNode } from "react";

import { MetaFeedMockup }        from "../MetaFeedMockup";
import { KarrotMockup }          from "../KarrotMockup";
import { NaverSearchMockup }     from "../NaverSearchMockup";
import { KakaoMomentMockup }     from "../KakaoMomentMockup";
import { GoogleGDNMockup }       from "../GoogleGDNMockup";
import { GoogleDiscoveryMockup } from "../GoogleDiscoveryMockup";

export type MockupConfig = {
    id: string;
    name: string;
    color: string;
    component: ReactNode;
};

// industry 라벨 → industry slug 매핑 (lib/adsImageMap.ts 의 INDUSTRY_IMAGE_MAP key 와 일치)
const INDUSTRY_SLUG_MAP: Record<string, string> = {
    "debt-relief": "select1",
    "rental":      "select2",
    "broadband":   "select3",
    "invest":      "select4",
    "realestate":  "select5",
    "medical":     "select6",
};

function buildMockups(industrySlug: string): MockupConfig[] {
    return [
        { id: "meta",   name: "Meta 피드",        color: "#1877F2", component: <MetaFeedMockup        industry={industrySlug} /> },
        { id: "karrot", name: "당근 비즈프로필",  color: "#FF7E36", component: <KarrotMockup          industry={industrySlug} /> },
        { id: "naver",  name: "Naver 검색광고",   color: "#03C75A", component: <NaverSearchMockup     industry={industrySlug} /> },
        { id: "kakao",  name: "카카오 모먼트",    color: "#FEE500", component: <KakaoMomentMockup     industry={industrySlug} /> },
        { id: "google", name: "Google GDN",       color: "#4285F4", component: <GoogleGDNMockup       industry={industrySlug} /> },
        { id: "google", name: "Google Discovery", color: "#EA4335", component: <GoogleDiscoveryMockup industry={industrySlug} /> },
    ];
}

export const industryMockups: Record<string, MockupConfig[]> = Object.fromEntries(
    Object.entries(INDUSTRY_SLUG_MAP).map(([label, slug]) => [label, buildMockups(slug)])
);
