import type { IndustryConfig, AnswerMap } from "./index";

const realestateLogic = (a: AnswerMap): string => {
    const intent = a.intent as string;
    const budget = a.budget as string;
    const subscription = a.subscription as string;

    if (intent === "ready" && (budget === "5_10" || budget === "over_10") && subscription !== "none") return "A";
    if (intent === "ready" || intent === "review") return "B";
    return "C";
};

export const realestateConfig: IndustryConfig = {
    industryId: "select4",
    industryNumber: 4,
    industryName: "부동산·분양",
    hero: {
        eyebrow: "FREE PROPERTY CHECK",
        title: "1분 자가진단 · 부동산 매물 추천",
        titleHighlight: "분양 진단",
        subtitle: "청약 자격·예산별 분양 정보 안내",
        ctaText: "지금 진단 시작",
    },
    diagnosis: {
        progressSteps: 3,
        stepLabels: ["1/3 · 희망 조건", "2/3 · 자격·예산", "3/3 · 결과 + 상담 신청"],
        questions: [
            {
                id: "region",
                step: 1,
                type: "select",
                label: "희망 지역",
                required: true,
                options: [
                    { value: "seoul", label: "서울" },
                    { value: "gyeonggi", label: "경기" },
                    { value: "incheon", label: "인천" },
                    { value: "regional_metro", label: "지방 광역시 (부산·대구·광주·대전·울산)" },
                    { value: "regional_other", label: "지방 기타 지역" },
                ],
            },
            {
                id: "size",
                step: 1,
                type: "select",
                label: "희망 평수",
                required: true,
                options: [
                    { value: "under_25", label: "전용 25평 미만" },
                    { value: "25_34", label: "전용 25~34평" },
                    { value: "35_50", label: "전용 35~50평" },
                    { value: "over_50", label: "전용 50평 이상" },
                ],
            },
            {
                id: "type",
                step: 1,
                type: "select",
                label: "희망 거래 유형",
                required: true,
                options: [
                    { value: "subscription", label: "신규 분양 (청약)" },
                    { value: "purchase", label: "기존 매매" },
                    { value: "lease", label: "전세·월세" },
                    { value: "commercial", label: "상가·오피스텔" },
                ],
            },
            {
                id: "budget",
                step: 2,
                type: "select",
                label: "자금 조달 가능 범위 (계약금 + 중도금 자체 조달)",
                required: true,
                options: [
                    { value: "under_2", label: "2억 미만" },
                    { value: "2_5", label: "2억 ~ 5억" },
                    { value: "5_10", label: "5억 ~ 10억" },
                    { value: "over_10", label: "10억 이상" },
                ],
            },
            {
                id: "subscription",
                step: 2,
                type: "select",
                label: "청약 가점 또는 자격",
                required: true,
                options: [
                    { value: "high", label: "가점 60점 이상 또는 무주택 1순위" },
                    { value: "mid", label: "가점 40~60점 또는 1순위 가능" },
                    { value: "low", label: "가점 40점 미만 또는 2순위" },
                    { value: "none", label: "청약 자격 없음 (해외·다주택 등)" },
                ],
            },
            {
                id: "intent",
                step: 2,
                type: "select",
                label: "검토 단계",
                required: true,
                options: [
                    { value: "ready", label: "즉시 청약·매매 검토" },
                    { value: "review", label: "비교·검토 중" },
                    { value: "info", label: "정보만 원함" },
                ],
            },
        ],
    },
    result: {
        logic: realestateLogic,
        branches: [
            {
                grade: "A",
                title: "청약·매매 즉시 검토 가능",
                description: "조건이 적합하여 청약·매매 즉시 검토 가능합니다. 모델하우스·단지 정보 + 자금 계획 1:1 상담드립니다.",
                cta: "분양 상담 예약",
            },
            {
                grade: "B",
                title: "조건 검토 후 안내",
                description: "일부 조건 (예산·자격) 검토 후 적합 단지를 안내드립니다. 전담 컨설턴트가 자료 송부드립니다.",
                cta: "조건 검토 상담",
            },
            {
                grade: "C",
                title: "정보 자료 안내",
                description: "분양 시장 정보·청약 일정 자료를 안내드립니다.",
                cta: "정보 자료 받기",
            },
        ],
    },
    contact: {
        sheetId: "13fN4R_UkwEfFuJ5Rse-74uzYJdOTZ3luvVv3TDhvCT8", // OT-leads-realestate-2026
        telegramBotTokenEnv: null,
        telegramChatIdEnv: null,
        additionalFields: [
            { key: "name", label: "성함", required: true },
            { key: "phone", label: "연락처", required: true },
            { key: "time", label: "통화 가능 시간대", required: true },
        ],
    },
    guardrail: {
        law: "공인중개사법 · 부동산광고 표시법",
        forbidden: [
            '"확정 시세차익" — 단정 효과 표현 금지',
            '"투자 수익 보장" — 부당광고',
            '"1위 분양가" / "최저가" — 부당비교',
            "허위 매물 광고",
        ],
        allowed: [
            "분양 일정·청약 자격 안내",
            "입지 정보 제공",
            "모델하우스 방문 안내",
            "자금 계획 상담",
        ],
        warning: "위반 시 공인중개사법: 자격 취소 / 1년 이하 징역",
    },
    defaultBrand: {
        companyName: "OT MARKETING",
        businessNumber: "141-39-01329",
        contactPerson: "장은태",
        phone: "070-4367-4013",
        mandatoryNote: "공인중개사법 §18의2 광고 표시 의무 (중개업자 등록번호·소재지 명시)",
    },
};
