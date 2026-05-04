/**
 * STEP_62 — ot-marketing.kr/ads 6 매체 mockup 의 6 업종 동적 이미지 매핑
 *
 * 매체별 매핑:
 *   - Meta 피드   = -011-A (페인 직격)   cover  1:1
 *   - 당근       = -022-A (신뢰 기관)   contain 4:3
 *   - Naver 검색 = -014-A or -016-A     배경 opacity-15
 *   - 카카오     = 개인회생 DR-021-A 9:16 / 5 업종 -018-A 1:1 contain
 *   - GDN        = -014-A (선택)        cover  1:1
 *   - Discovery  = -022-A or DR-019-A   contain 16:10
 *
 * 개인회생 (select1) = STEP_47·50 옛 매핑 보존 (DR-016 / DR-019 / DR-021).
 * 5 업종 (select2~6) = 명령서 §3.2 매핑 그대로.
 */

export type Channel = "meta" | "karrot" | "naver" | "kakao" | "gdn" | "discovery";

export interface IndustryImageInfo {
    folder: string;
    images: Record<Channel, string>; // 광고ID 만 (확장자 X)
}

export const INDUSTRY_IMAGE_MAP: Record<string, IndustryImageInfo> = {
    "select1": {
        folder: "01-debt-relief",
        images: {
            meta:      "DR-011-A",
            karrot:    "DR-022-A",
            naver:     "DR-016-A",
            kakao:     "DR-021-A",  // 9:16 세로 (개인회생만)
            gdn:       "DR-014-A",
            discovery: "DR-019-A",
        },
    },
    "select2": {
        folder: "02-rental-water",
        images: {
            meta:      "WR-011-A",
            karrot:    "WR-022-A",
            naver:     "WR-014-A",
            kakao:     "WR-018-A",
            gdn:       "WR-014-A",
            discovery: "WR-022-A",
        },
    },
    "select3": {
        folder: "03-broadband",
        images: {
            meta:      "BB-011-A",
            karrot:    "BB-022-A",
            naver:     "BB-014-A",
            kakao:     "BB-018-A",
            gdn:       "BB-014-A",
            discovery: "BB-022-A",
        },
    },
    "select4": {
        folder: "04-invest-lead",
        images: {
            meta:      "IL-011-A",
            karrot:    "IL-022-A",
            naver:     "IL-014-A",
            kakao:     "IL-018-A",
            gdn:       "IL-014-A",
            discovery: "IL-022-A",
        },
    },
    "select5": {
        folder: "05-realestate",
        images: {
            meta:      "RE-011-A",
            karrot:    "RE-022-A",
            naver:     "RE-014-A",
            kakao:     "RE-018-A",
            gdn:       "RE-014-A",
            discovery: "RE-022-A",
        },
    },
    "select6": {
        folder: "06-medical",
        images: {
            meta:      "MD-011-A",
            karrot:    "MD-022-A",
            naver:     "MD-014-A",
            kakao:     "MD-018-A",
            gdn:       "MD-014-A",
            discovery: "MD-022-A",
        },
    },
};

/** industry slug + channel → public 절대 경로 */
export function getAdImageSrc(industry: string, channel: Channel): string {
    const info = INDUSTRY_IMAGE_MAP[industry] ?? INDUSTRY_IMAGE_MAP["select1"]!;
    return `/ads-creatives/${info.folder}/${info.images[channel]}.png`;
}

/** 카카오 모먼트 = 개인회생만 9:16 cover, 5 업종 = 1:1 contain */
export function getKakaoFitMode(industry: string): "cover" | "contain" {
    return industry === "select1" ? "cover" : "contain";
}
