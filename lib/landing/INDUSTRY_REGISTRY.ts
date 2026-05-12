/**
 * INDUSTRY_REGISTRY — otpage1.com 라우트별 업종/광고주 메타 매핑
 *
 * 본 파일 = 미래 Claude Code 명령 시 "어느 라우트 = 어느 업종" 즉시 인지용.
 * 라우트 자체 = 미리 만들지 X. 명령받을 때 default 베이스 복사 → placeholder swap.
 *
 * 새 광고주 LP 만들 절차 = docs/HOW_TO_ADD_NEW_ADVERTISER.md
 */

export type IndustryStatus = "✅ ACTIVE" | "⏳ PLACEHOLDER" | "🔧 IN_DEVELOPMENT";

export interface IndustryEntry {
    industry: string;
    status: IndustryStatus;
    advertiser?: string;
    advertiserId?: string;
    sheetId?: string;
    telegramBot?: string;
    pixelId?: string;
    notes?: string;
    legalNote?: string; // 업종별 법규 메모
}

export const INDUSTRY_REGISTRY: Record<string, IndustryEntry> = {
    "/": {
        industry: "DEFAULT_BASE",
        status: "✅ ACTIVE",
        advertiser: "[placeholder]",
        notes:
            "otpage1.com/ default 베이스. placeholder 박혀 있음. 새 광고주 LP 만들 때 복사 기준.",
    },
    "/select1": {
        industry: "개인회생·파산·채무회복",
        status: "✅ ACTIVE",
        advertiser: "법률사무소 보광",
        advertiserId: "AD001",
        sheetId: "1xX7qJX56Nj0zrFfAAA-i69oEyaQlvhnIxXRgDQm1Mjc",
        telegramBot: "BoGwang_bot",
        pixelId: "824440290225761",
        notes: "첫 광고주. 인트로 + 진단. 자연 도착용.",
        legalNote:
            "변호사법 §22·§23·§24의2 준수 — '전문 변호사'·'100%/확실/보장'·'최저가/1위'·실명 후기 모두 금지",
    },
    "/select11": {
        industry: "개인회생·파산·채무회복",
        status: "✅ ACTIVE",
        advertiser: "법률사무소 보광 (광고용)",
        advertiserId: "AD001",
        sheetId: "1xX7qJX56Nj0zrFfAAA-i69oEyaQlvhnIxXRgDQm1Mjc",
        telegramBot: "BoGwang_bot",
        pixelId: "824440290225761",
        notes: "인트로 숨김 = Meta 광고 진입 전용. /select1 과 동일 광고주, 흐름만 다름.",
        legalNote: "변호사법 §22·§23·§24의2 준수",
    },
    "/select2": {
        industry: "정수기·렌탈·구독",
        status: "⏳ PLACEHOLDER",
        notes:
            "미래 광고주. default 베이스 복사 → placeholder swap = 5분. 시트·텔레그램 봇 신규 필요.",
        legalNote: "소비자기본법 §3 + 표시광고법 §3 (허위·과장 광고 금지)",
    },
    "/select3": {
        industry: "인터넷·결합·통신",
        status: "⏳ PLACEHOLDER",
        notes: "미래 광고주. 통신사 결합 상품 영업용.",
        legalNote: "전기통신사업법 §50의2 (가입 유도 광고 규제) + 방통위 가이드라인",
    },
    "/select4": {
        industry: "주식·코인·투자",
        status: "⏳ PLACEHOLDER",
        notes: "미래 광고주. 변호사법 외 영역 = 카피 자유도 ↑.",
        legalNote:
            "자본시장법 §445 (투자권유 광고 규제) + 금감원 가이드라인. '수익률 보장'·'손실 절대 X' 모두 금지",
    },
    "/select5": {
        industry: "부동산·임대·매매",
        status: "⏳ PLACEHOLDER",
        notes: "미래 광고주.",
        legalNote: "공인중개사법 §18의2 (허위 매물 광고 금지) + 부동산광고 규제",
    },
    "/select6": {
        industry: "의료·병원·미용",
        status: "⏳ PLACEHOLDER",
        notes: "미래 광고주.",
        legalNote: "의료법 §56 (의료광고 심의 의무) + 의료광고 가이드라인. 의료광고심의위 사전 심의 필수",
    },
};

/**
 * 라우트로 업종 정보 조회
 */
export function getIndustryByRoute(route: string): IndustryEntry | undefined {
    return INDUSTRY_REGISTRY[route];
}

/**
 * ACTIVE 상태 라우트 목록
 */
export function getActiveRoutes(): string[] {
    return Object.entries(INDUSTRY_REGISTRY)
        .filter(([, entry]) => entry.status === "✅ ACTIVE")
        .map(([route]) => route);
}

/**
 * PLACEHOLDER 상태 라우트 목록 (미래 만들 라우트)
 */
export function getPlaceholderRoutes(): string[] {
    return Object.entries(INDUSTRY_REGISTRY)
        .filter(([, entry]) => entry.status === "⏳ PLACEHOLDER")
        .map(([route]) => route);
}
