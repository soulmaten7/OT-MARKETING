import type { IndustryConfig, AnswerMap } from "./index";

const rentalLogic = (a: AnswerMap): string => {
    const intent = a.intent as string;
    const budget = a.budget as string;
    const contract = a.contract as string;

    if (intent === "asap" && (budget === "30_50" || budget === "over_50") && contract === "yes") return "A";
    if (intent === "compare" || intent === "asap") return "B";
    return "C";
};

export const rentalConfig: IndustryConfig = {
    industryId: "select2",
    industryNumber: 2,
    industryName: "정수기·렌탈",
    hero: {
        eyebrow: "FREE QUOTE CHECK",
        title: "1분 자가진단 · 정수기 추천",
        titleHighlight: "견적 진단",
        subtitle: "가족 사용 패턴 맞춤 견적",
        ctaText: "지금 견적 받기",
    },
    diagnosis: {
        progressSteps: 3,
        stepLabels: ["1/3 · 사용 환경", "2/3 · 예산·약정", "3/3 · 결과 + 견적 신청"],
        questions: [
            {
                id: "family",
                step: 1,
                type: "select",
                label: "Q1. 가족 구성원 수 (본인 포함)",
                required: true,
                options: [
                    { value: "1", label: "1인 가구" },
                    { value: "2", label: "2인" },
                    { value: "3_4", label: "3~4인" },
                    { value: "5_more", label: "5인 이상" },
                ],
            },
            {
                id: "usage",
                step: 1,
                type: "select",
                label: "Q2. 주 사용 장소",
                required: true,
                options: [
                    { value: "home", label: "가정" },
                    { value: "office", label: "사무실·매장" },
                    { value: "both", label: "가정 + 사무실" },
                ],
            },
            {
                id: "budget",
                step: 2,
                type: "select",
                label: "Q3. 월 예상 렌탈료",
                required: true,
                options: [
                    { value: "under_30", label: "월 3만원 미만" },
                    { value: "30_50", label: "월 3만원 ~ 5만원" },
                    { value: "over_50", label: "월 5만원 이상" },
                    { value: "undecided", label: "미정 (안내 받고 결정)" },
                ],
            },
            {
                id: "contract",
                step: 2,
                type: "radio",
                label: "Q4. 약정 가능 여부 (3년 또는 5년)",
                required: true,
                options: [
                    { value: "yes", label: "약정 가능" },
                    { value: "short", label: "단기 (1~2년) 선호" },
                    { value: "no", label: "약정 없는 옵션 원함" },
                ],
            },
            {
                id: "intent",
                step: 2,
                type: "select",
                label: "Q5. 검토 단계",
                required: true,
                options: [
                    { value: "asap", label: "즉시 설치 희망" },
                    { value: "compare", label: "다른 업체와 비교 검토" },
                    { value: "info", label: "정보만 원함" },
                ],
            },
        ],
    },
    result: {
        logic: rentalLogic,
        branches: [
            {
                grade: "A",
                title: "맞춤 견적 안내 가능",
                description: "조건에 맞춰 합리적 월 렌탈료 견적을 안내드릴 수 있습니다. 전담 컨설턴트가 1:1 상담드립니다.",
                cta: "견적 상담 예약",
            },
            {
                grade: "B",
                title: "비교 검토 견적 안내",
                description: "동급 대비 합리적 가격으로 비교 가능한 옵션을 안내드립니다.",
                cta: "비교 견적 받기",
            },
            {
                grade: "C",
                title: "정보 자료 안내",
                description: "정수기·렌탈 시장 정보 자료를 안내드립니다. 추후 검토 시 다시 진단 가능합니다.",
                cta: "정보 자료 받기",
            },
        ],
    },
    contact: {
        sheetId: "15u0tt28Jfo5NP3Cwa25Qt0fuS70R76lmhP0HlGxhxmU", // OT-leads-rental-2026
        additionalFields: [
            { key: "name", label: "성함", required: true },
            { key: "phone", label: "연락처", required: true },
            { key: "time", label: "통화 가능 시간대", required: true },
        ],
    },
    guardrail: {
        law: "표시광고법 §3 · 할부거래법",
        forbidden: [
            '"업계 최저가" — 부당비교 광고 금지',
            '"최고 품질" / "1위" — 단정 표현 금지',
            "사용자 실명 후기 — 표시광고법 위반",
            '"100% 만족 보장" — 확정 효과 표현 금지',
        ],
        allowed: [
            "동급 대비 합리적 가격",
            "가족 단위 결합 혜택",
            "월 렌탈료 안내",
            "약정 조건·해지 위약금 명시",
        ],
        warning: "위반 시 표시광고법 §17: 시정명령 + 매출 2% 이하 과징금",
    },
    defaultBrand: {
        companyName: "OT MARKETING",
        businessNumber: "141-39-01329",
        contactPerson: "장은태",
        phone: "070-4367-4013",
        mandatoryNote: "할부거래법 §6 약정 기간·해지 위약금 표시 의무",
    },
};
