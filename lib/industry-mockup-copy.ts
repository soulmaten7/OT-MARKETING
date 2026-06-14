/**
 * STEP_63 — ot-marketing.kr/ads 6 업종 × 6 매체 mockup 카피 매핑
 *
 * 변호사법 §24의2 (개인회생만) / 자본시장법 §49 (주식·코인) / 의료법 §56·§57 (병의원)
 * 표시광고법 §3 / 부동산공인중개사법 §32 / 전기통신사업법 §50 안전 zone 통과 카피.
 */

export interface IndustryMockupCopy {
    // 광고주 (페이지 발신자)
    advertiserName: string;        // 예: "법무법인 OO" / "정수기 OO" 등
    advertiserShort: string;       // 짧은 형태 (CTA·뱃지용)
    advertiserCategory: string;    // 카테고리 라벨 (예: "법률상담")

    // Meta 피드
    metaHeadline: string;          // 본문 첫 줄 (강조 부분 포함)
    metaHeadlineEm?: string;       // 강조 단어 (옵션, 헤드라인의 굵은 단어 1개)
    metaSubcopy: string;           // 본문 나머지
    metaCtaTitle: string;          // CTA 제목 (예: "개인회생 자가진단 — 9문항 · 무료")

    // 당근 비즈프로필
    karrotEyebrow: string;         // 상단 작은 라벨 (예: "동네 법률상담")
    karrotHeadline: string;        // 메인
    karrotSubcopy: string;         // 보조
    karrotProfileNote: string;     // 광고주 프로필 한 줄 (예: "동네 이웃을 위한 ...")

    // Naver 검색
    naverKeyword: string;          // 검색어
    naverDomain: string;           // 광고주 도메인 (예: "lawfirm-oo.com")
    naverTitle: string;            // 광고 제목
    naverDesc: string;             // 본문 설명
    naverSitelinks: string[];      // 4 사이트링크
    naverHighlight: string;        // 강조 박스 텍스트
    naverRelated: string;          // 하단 관련 검색

    // 카카오 모먼트
    kakaoEyebrow: string;          // 상단 라벨
    kakaoHeadline: string;
    kakaoSubcopy: string;
    kakaoCardNote: string;         // 카드 하단 한 줄

    // Google Discovery
    discoveryHeroTitle: string;    // 메인 타이틀
    discoveryHeroSub: string;      // 보조
    discoveryCardTitle: string;
    discoveryCardSub: string;
    discoveryNewsTitle: string;    // 뉴스 헤드 (옛 가계부채 1,800조...)
    discoveryRelated: string;      // 관련 글 제목

    // Google GDN
    gdnNewsHead: string;           // 호스트 뉴스 헤드
    gdnHeadline: string;
    gdnSubcopy: string;
    gdnRelated: string;            // 관련 안내
}

export const INDUSTRY_MOCKUP_COPY: Record<string, IndustryMockupCopy> = {
    // ── select1 = 개인회생 (변호사법 §24의2 안전 — 옛 박힘 그대로 보존) ──
    "select1": {
        advertiserName: "법무법인 OO",
        advertiserShort: "법무법인",
        advertiserCategory: "법률상담",

        metaHeadline: "추심 정지 가능한지, 먼저 확인해 보세요.",
        metaHeadlineEm: "추심 정지",
        metaSubcopy: "변제계획 검토 무료 · 회생·파산 법률 안내 · 1분 자가진단",
        metaCtaTitle: "개인회생 자가진단 — 9문항 · 무료",

        karrotEyebrow: "동네 법률상담",
        karrotHeadline: "회생·파산 무료 상담",
        karrotSubcopy: "변제 검토 안내",
        karrotProfileNote: "동네 이웃을 위한 회생·파산 법률 상담 안내.",

        naverKeyword: "개인회생 자격",
        naverDomain: "lawfirm-oo.com",
        naverTitle: "개인회생 자격 안내",
        naverDesc: "1분 자가진단",
        naverSitelinks: ["상담 안내", "절차·비용", "변제 사례", "1분 자가진단"],
        naverHighlight: "📞 법률상담 무료 · 평일 9~18시",
        naverRelated: "개인회생 신청 자격 / 변제 기간 / 파산 차이",

        kakaoEyebrow: "채무 독촉 해결",
        kakaoHeadline: "변제계획 검토 무료",
        kakaoSubcopy: "자가진단 1분",
        kakaoCardNote: "본인 회생 가능 여부 무료 확인.",

        discoveryHeroTitle: "법률상담 무료",
        discoveryHeroSub: "회생·파산 검토",
        discoveryCardTitle: "법률상담 무료 안내",
        discoveryCardSub: "회생·파산 검토",
        discoveryNewsTitle: "가계부채 1,800조, 회생·파산 신청 급증",
        discoveryRelated: "개인회생 절차, 신청 자격 정리",

        gdnNewsHead: "가계부채 1,800조 돌파, 회생·파산 신청 급증",
        gdnHeadline: "변제계획 검토 무료",
        gdnSubcopy: "회생·파산 법률상담",
        gdnRelated: "개인회생 신청 자격 정리",
    },

    // ── select2 = 정수기·렌탈 (표시광고법 §3) ──
    "select2": {
        advertiserName: "정수기 OO",
        advertiserShort: "정수기",
        advertiserCategory: "정수기·렌탈",

        metaHeadline: "정수기, 우리 집 맞춤 견적 받아보세요.",
        metaHeadlineEm: "맞춤 견적",
        metaSubcopy: "직수·얼음·미니 비교 · 코웨이·SK매직·LG · 1분 무료 견적",
        metaCtaTitle: "정수기 1분 비교 견적 — 무료",

        karrotEyebrow: "동네 렌탈 안내",
        karrotHeadline: "정수기 무료 견적",
        karrotSubcopy: "우리 집 맞춤 안내",
        karrotProfileNote: "동네 이웃을 위한 정수기 비교 견적 안내.",

        naverKeyword: "정수기 비교",
        naverDomain: "water-oo.com",
        naverTitle: "정수기 1분 비교 견적",
        naverDesc: "1분 무료 견적",
        naverSitelinks: ["제품 비교", "월 렌탈료", "설치 안내", "무료 견적"],
        naverHighlight: "📞 견적 상담 무료 · 평일 9~18시",
        naverRelated: "정수기 렌탈료 / 직수형 비교 / 설치 안내",

        kakaoEyebrow: "정수기 비교",
        kakaoHeadline: "직수·얼음·미니",
        kakaoSubcopy: "1분 무료 견적",
        kakaoCardNote: "우리 집 맞춤 정수기 비교 안내.",

        discoveryHeroTitle: "무료 비교 견적",
        discoveryHeroSub: "코웨이·SK매직·LG",
        discoveryCardTitle: "정수기 비교 견적",
        discoveryCardSub: "1분 무료 견적",
        discoveryNewsTitle: "가정용 정수기 시장 매년 성장세",
        discoveryRelated: "정수기 렌탈료 비교 안내",

        gdnNewsHead: "가정용 정수기 시장, 직수형 비중 확대",
        gdnHeadline: "정수기 비교 견적",
        gdnSubcopy: "월 19,900원부터 안내",
        gdnRelated: "정수기 비교 견적 안내",
    },

    // ── select3 = 인터넷·통신 (전기통신사업법 §50) ──
    "select3": {
        advertiserName: "OO 통신",
        advertiserShort: "통신",
        advertiserCategory: "통신·결합",

        metaHeadline: "통신비, 결합 가입으로 절감해 보세요.",
        metaHeadlineEm: "통신비 절감",
        metaSubcopy: "KT·SKT·LG U+ 정식 가입처 · 무료 견적 · 1분 진단",
        metaCtaTitle: "통신비 1분 절감 진단 — 무료",

        karrotEyebrow: "동네 통신 안내",
        karrotHeadline: "결합 무료 견적",
        karrotSubcopy: "통신비 절감 안내",
        karrotProfileNote: "동네 이웃을 위한 결합 가입 안내.",

        naverKeyword: "통신비 절감",
        naverDomain: "telecom-oo.com",
        naverTitle: "통신비 1분 절감 진단",
        naverDesc: "1분 진단 안내",
        naverSitelinks: ["결합 상품", "월 요금 비교", "가입 안내", "1분 진단"],
        naverHighlight: "📞 견적 상담 무료 · 평일 9~18시",
        naverRelated: "결합 상품 비교 / 인터넷 가입 안내 / 통신비 절감",

        kakaoEyebrow: "결합 가입 비교",
        kakaoHeadline: "결합 가입 비교",
        kakaoSubcopy: "1분 자가진단",
        kakaoCardNote: "월 결합 요금 무료 비교 안내.",

        discoveryHeroTitle: "결합 가입 안내",
        discoveryHeroSub: "KT·SKT·LG U+",
        discoveryCardTitle: "결합 가입 안내",
        discoveryCardSub: "월 5만원대부터",
        discoveryNewsTitle: "1인 가구 통신비 부담 증가",
        discoveryRelated: "결합 상품 비교 안내",

        gdnNewsHead: "통신 3사 결합 상품 비교, 사용 패턴별 절감폭 차이",
        gdnHeadline: "통신비 절감",
        gdnSubcopy: "월 5만원대부터 안내",
        gdnRelated: "결합 상품 비교 안내",
    },

    // ── select4 = 주식·코인 리딩 (자본시장법 §49 ⚠️ 매우 엄격, 교육 카피만) ──
    "select4": {
        advertiserName: "OO 투자교육",
        advertiserShort: "투자교육",
        advertiserCategory: "교육·강좌",

        metaHeadline: "주식 차트, 무료 강좌로 시작해 보세요.",
        metaHeadlineEm: "무료 강좌",
        metaSubcopy: "기술적 분석 · 펀더멘탈 · 가치투자 · 금융투자협회 등록 강사 안내",
        metaCtaTitle: "주식 투자 무료 강좌 — 1분 신청",

        karrotEyebrow: "동네 교육 안내",
        karrotHeadline: "무료 투자 강좌",
        karrotSubcopy: "기술 분석 안내",
        karrotProfileNote: "기술적 분석·펀더멘탈 무료 강좌 안내.",

        naverKeyword: "주식 무료 강좌",
        naverDomain: "edu-oo.com",
        naverTitle: "주식 투자 무료 강좌",
        naverDesc: "1분 신청 안내",
        naverSitelinks: ["강좌 안내", "커리큘럼", "강사 소개", "신청"],
        naverHighlight: "📞 강좌 안내 무료 · 평일 10~18시",
        naverRelated: "주식 무료 강좌 / 기술적 분석 / 펀더멘탈 안내",

        kakaoEyebrow: "투자 교육",
        kakaoHeadline: "무료 투자 강좌",
        kakaoSubcopy: "1분 신청",
        kakaoCardNote: "기술적 분석 무료 강좌 안내.",

        discoveryHeroTitle: "무료 강좌 안내",
        discoveryHeroSub: "기술적 분석",
        discoveryCardTitle: "주식 투자 무료 강좌",
        discoveryCardSub: "기술 분석 안내",
        discoveryNewsTitle: "개인 투자자 학습 수요 증가",
        discoveryRelated: "주식 무료 강좌 안내",

        gdnNewsHead: "개인 투자자 학습 수요 증가, 무료 강좌 확대",
        gdnHeadline: "무료 강좌 안내",
        gdnSubcopy: "금융투자협회 등록 강사",
        gdnRelated: "주식 무료 강좌 안내",
    },

    // ── select5 = 부동산·분양 (부동산공인중개사법 §32) ──
    "select5": {
        advertiserName: "OO 부동산",
        advertiserShort: "부동산",
        advertiserCategory: "부동산·분양",

        metaHeadline: "신축 분양, 1분 진단으로 가능한지 확인해 보세요.",
        metaHeadlineEm: "1분 진단",
        metaSubcopy: "신축·재건축·재개발 비교 · 공인중개사 정식 등록 · 무료 진단",
        metaCtaTitle: "분양·청약 1분 진단 — 무료",

        karrotEyebrow: "동네 부동산 안내",
        karrotHeadline: "분양 무료 진단",
        karrotSubcopy: "신축 안내",
        karrotProfileNote: "공인중개사 정식 등록 분양 정보 안내.",

        naverKeyword: "신축 분양",
        naverDomain: "realestate-oo.com",
        naverTitle: "분양·청약 1분 진단",
        naverDesc: "1분 무료 진단",
        naverSitelinks: ["신축 분양", "재건축", "재개발", "1분 진단"],
        naverHighlight: "📞 분양 안내 무료 · 평일 9~18시",
        naverRelated: "신축 분양 / 재건축 / 재개발 안내",

        kakaoEyebrow: "분양 비교",
        kakaoHeadline: "분양가 비교",
        kakaoSubcopy: "1분 진단",
        kakaoCardNote: "신축·재건축·재개발 비교 안내.",

        discoveryHeroTitle: "분양 정보 안내",
        discoveryHeroSub: "신축·재건축·재개발",
        discoveryCardTitle: "분양 무료 진단",
        discoveryCardSub: "공인중개사 등록",
        discoveryNewsTitle: "수도권 신축 분양 수요 지속",
        discoveryRelated: "신축 분양 가이드 안내",

        gdnNewsHead: "수도권 신축 분양 가이드, 청약 자격 정리",
        gdnHeadline: "분양 무료 진단",
        gdnSubcopy: "공인중개사 정식 등록",
        gdnRelated: "신축 분양 가이드 안내",
    },

    // ── select6 = 병의원 (의료법 §56·§57 ⚠️ 매우 엄격) ──
    "select6": {
        advertiserName: "OO 의원",
        advertiserShort: "의원",
        advertiserCategory: "의료 상담",

        metaHeadline: "시술·약물·관리, 무료 상담으로 안내받아 보세요.",
        metaHeadlineEm: "무료 상담",
        metaSubcopy: "전문의 자격 인증 · 의료법 사전심의 · 무료 상담 안내",
        metaCtaTitle: "병의원 1분 상담 진단 — 무료",

        karrotEyebrow: "동네 의료 안내",
        karrotHeadline: "무료 상담 안내",
        karrotSubcopy: "의료법 인증",
        karrotProfileNote: "의료법 사전심의 인증 의원 상담 안내.",

        naverKeyword: "병의원 상담",
        naverDomain: "clinic-oo.com",
        naverTitle: "병의원 1분 상담 진단",
        naverDesc: "1분 무료 상담",
        naverSitelinks: ["시술", "약물치료", "생활관리", "상담 신청"],
        naverHighlight: "📞 상담 무료 · 평일 9~18시",
        naverRelated: "병의원 상담 / 시술 안내 / 약물치료 안내",

        kakaoEyebrow: "의료 상담",
        kakaoHeadline: "무료 상담 안내",
        kakaoSubcopy: "1분 진단",
        kakaoCardNote: "전문의 자격 인증 상담 안내.",

        discoveryHeroTitle: "진료 안내",
        discoveryHeroSub: "전문의 자격",
        discoveryCardTitle: "무료 상담 안내",
        discoveryCardSub: "사전심의 인증",
        discoveryNewsTitle: "의료법 사전심의 인증 의원 안내 확대",
        discoveryRelated: "병의원 상담 가이드 안내",

        gdnNewsHead: "의료법 사전심의 인증 의원 안내 가이드",
        gdnHeadline: "무료 상담",
        gdnSubcopy: "사전심의 인증병원",
        gdnRelated: "병의원 상담 가이드 안내",
    },
};

/**
 * 광고주 슬러그 (select11+) → industry 매핑
 * select11~19 = 업종 1, select21~29 = 업종 2 등
 */
export function getIndustryFromSlug(slug: string): string {
    if (slug.match(/^select[1-6]$/)) return slug;
    const m = slug.match(/^select(\d)/);
    if (m) return `select${m[1]}`;
    return "select1";
}

export function getMockupCopy(slug: string): IndustryMockupCopy {
    const industry = getIndustryFromSlug(slug);
    return INDUSTRY_MOCKUP_COPY[industry] ?? INDUSTRY_MOCKUP_COPY["select1"]!;
}
