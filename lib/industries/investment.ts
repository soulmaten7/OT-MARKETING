import type { IndustryConfig, AnswerMap } from "./index";

const investmentLogic = (a: AnswerMap): string => {
    const exp = a.experience as string;
    const monthly = a.monthly as string;
    const risk = a.risk as string;

    if ((exp === "regular" || exp === "experienced") && (monthly === "100_500" || monthly === "over_500") && risk === "high") return "A";
    if (exp === "starter" || exp === "regular" || risk === "mid") return "B";
    return "C";
};

export const investmentConfig: IndustryConfig = {
    industryId: "select5",
    industryNumber: 5,
    industryName: "주식·투자",
    hero: {
        eyebrow: "FREE INVESTMENT CHECK",
        title: "1분 무료",
        titleHighlight: "투자 성향 진단",
        subtitle: "5문항 답변 시 투자 성향에 맞춘 정보 자료를 안내드립니다.",
        ctaText: "지금 진단 시작",
    },
    diagnosis: {
        progressSteps: 3,
        stepLabels: ["1/3 · 투자 경험", "2/3 · 성향·금액", "3/3 · 결과 + 자료 안내"],
        questions: [
            {
                id: "experience",
                step: 1,
                type: "select",
                label: "Q1. 투자 경험",
                required: true,
                options: [
                    { value: "none", label: "투자 경험 없음" },
                    { value: "starter", label: "1년 이내 (입문)" },
                    { value: "regular", label: "1~5년 (정기)" },
                    { value: "experienced", label: "5년 이상 (숙련)" },
                ],
            },
            {
                id: "monthly",
                step: 1,
                type: "select",
                label: "Q2. 월 투자 가능 금액",
                required: true,
                options: [
                    { value: "under_50", label: "월 50만원 미만" },
                    { value: "50_100", label: "월 50만원 ~ 100만원" },
                    { value: "100_500", label: "월 100만원 ~ 500만원" },
                    { value: "over_500", label: "월 500만원 이상" },
                ],
            },
            {
                id: "interest",
                step: 2,
                type: "multi",
                label: "Q3. 관심 분야 (복수 선택)",
                required: true,
                options: [
                    { value: "kr_stock", label: "국내 주식" },
                    { value: "us_stock", label: "해외 주식 (미국 등)" },
                    { value: "etf", label: "ETF" },
                    { value: "crypto", label: "코인" },
                    { value: "fund", label: "펀드" },
                    { value: "etc", label: "기타" },
                ],
            },
            {
                id: "risk",
                step: 2,
                type: "radio",
                label: "Q4. 위험 선호도",
                required: true,
                options: [
                    { value: "low", label: "안정 (원금 손실 최소)" },
                    { value: "mid", label: "균형 (적정 수익 + 위험 관리)" },
                    { value: "high", label: "공격 (높은 수익 추구)" },
                ],
            },
            {
                id: "call_time",
                step: 2,
                type: "select",
                label: "Q5. 통화 가능 시간대",
                required: true,
                options: [
                    { value: "morning", label: "오전 (9~12시)" },
                    { value: "afternoon", label: "오후 (13~18시)" },
                    { value: "evening", label: "저녁 (18~21시)" },
                    { value: "anytime", label: "언제든" },
                ],
            },
        ],
    },
    result: {
        logic: investmentLogic,
        branches: [
            {
                grade: "A",
                title: "적극 투자 정보 안내",
                description: "투자 성향에 맞춰 적극 투자 분야 정보 자료를 안내드립니다. 전담 컨설턴트가 1:1 안내드립니다.",
                cta: "투자 정보 자료 받기",
            },
            {
                grade: "B",
                title: "균형 투자 정보 안내",
                description: "균형 투자 성향에 맞춘 분석 자료를 안내드립니다.",
                cta: "분석 자료 받기",
            },
            {
                grade: "C",
                title: "기초 정보 자료 안내",
                description: "투자 입문 단계 정보 자료를 안내드립니다.",
                cta: "기초 자료 받기",
            },
        ],
    },
    contact: {
        sheetId: "1iupb2uifYMBHZ-LrUYFcEdmm5k4Kors3PTze6CR8AUk", // OT-leads-investment-2026
        additionalFields: [
            { key: "name", label: "성함", required: true },
            { key: "phone", label: "연락처", required: true },
        ],
    },
    guardrail: {
        law: "자본시장법 · 유사수신행위 규제법",
        forbidden: [
            '"수익률 보장" — 자본시장법 위반',
            '"100% 수익" — 유사수신 의심 표현',
            '"원금 보장" — 단정 표현 금지',
            "무인가 영업 표현",
        ],
        allowed: [
            "투자 정보 제공",
            "분석 자료 안내",
            "투자 성향 진단",
            "인가·등록 영업 표시",
        ],
        warning: "위반 시 자본시장법·유사수신: 무인가 영업 5년 이하 / 유사수신 5년 이하 징역",
    },
    defaultBrand: {
        companyName: "OT MARKETING (시안)",
        businessNumber: "141-39-01329",
        contactPerson: "장은태",
        phone: "070-4367-4013",
        mandatoryNote: "자본시장법 §53 인가·등록 사업자 표시 의무 (광고주 측 인가번호 자동 표기)",
    },
};
