import type { IndustryConfig, AnswerMap } from "./index";

const debtReliefLogic = (a: AnswerMap): string => {
    let score = 0;
    const debt = a.debt as string;
    const overdue = a.overdue as string;
    const income = a.income as string;
    const job = a.job as string;
    const collection = a.collection as string;
    const assets = (a.assets as string[]) || [];

    if (debt === "over_10000" || debt === "5000_10000") score += 3;
    else if (debt === "3000_5000") score += 2;
    else if (debt === "1000_3000") score += 1;

    if (overdue === "over_3months") score += 3;
    else if (overdue === "1_3months") score += 2;
    else if (overdue === "under_1month") score += 1;

    if (income === "regular") score += 2;
    else if (income === "irregular") score += 1;

    if (job === "employed" || job === "self") score += 1;

    if (collection === "active") score += 2;

    if (assets.includes("none")) score += 2;

    if (score >= 9) return "A";
    if (score >= 5) return "B";
    return "C";
};

export const debtReliefConfig: IndustryConfig = {
    industryId: "select1",
    industryNumber: 1,
    industryName: "개인회생·법률",
    hero: {
        eyebrow: "FREE SELF-CHECK",
        title: "1분 무료",
        titleHighlight: "자가진단",
        subtitle: "9 문항만 답하시면 전담 변호사가 검토 결과를 안내드립니다.",
        ctaText: "지금 진단 시작",
    },
    diagnosis: {
        progressSteps: 4,
        stepLabels: [
            "1/4 · 채무 상황",
            "2/4 · 소득·생활",
            "3/4 · 추심·자산·이력",
            "4/4 · 결과 + 상담 신청",
        ],
        questions: [
            {
                id: "debt",
                step: 1,
                type: "select",
                label: "Q1. 현재 채무 총액",
                required: true,
                options: [
                    { value: "under_1000", label: "1천만원 미만" },
                    { value: "1000_3000", label: "1천만원 ~ 3천만원" },
                    { value: "3000_5000", label: "3천만원 ~ 5천만원" },
                    { value: "5000_10000", label: "5천만원 ~ 1억원" },
                    { value: "over_10000", label: "1억원 이상" },
                ],
            },
            {
                id: "debt_types",
                step: 1,
                type: "multi",
                label: "Q2. 채무 종류 (복수 선택)",
                required: true,
                options: [
                    { value: "card", label: "신용카드" },
                    { value: "loan", label: "은행·캐피탈 대출" },
                    { value: "private", label: "사채" },
                    { value: "tax", label: "세금" },
                    { value: "etc", label: "기타" },
                ],
            },
            {
                id: "overdue",
                step: 1,
                type: "select",
                label: "Q3. 가장 오래된 채무의 연체 기간",
                required: true,
                options: [
                    { value: "none", label: "연체 없음" },
                    { value: "under_1month", label: "1개월 미만" },
                    { value: "1_3months", label: "1~3개월" },
                    { value: "over_3months", label: "3개월 이상" },
                ],
            },
            {
                id: "income",
                step: 2,
                type: "select",
                label: "Q4. 월 소득 형태",
                required: true,
                options: [
                    { value: "regular", label: "정기 (직장·연금 등)" },
                    { value: "irregular", label: "비정기 (프리랜서·자영업 등)" },
                    { value: "none", label: "현재 소득 없음" },
                ],
            },
            {
                id: "job",
                step: 2,
                type: "select",
                label: "Q5. 직업 형태",
                required: true,
                options: [
                    { value: "employed", label: "정규직" },
                    { value: "contract", label: "계약직·일용직" },
                    { value: "self", label: "자영업·사업자" },
                    { value: "unemployed", label: "무직" },
                ],
            },
            {
                id: "family",
                step: 2,
                type: "select",
                label: "Q6. 부양 가족 수 (본인 제외)",
                required: true,
                options: [
                    { value: "0", label: "없음" },
                    { value: "1_2", label: "1~2명" },
                    { value: "3_more", label: "3명 이상" },
                ],
            },
            {
                id: "collection",
                step: 3,
                type: "select",
                label: "Q7. 추심 진행 상황",
                required: true,
                options: [
                    { value: "none", label: "추심 없음" },
                    { value: "warning", label: "통지서·전화 접촉만" },
                    { value: "active", label: "법적 절차 진행 중" },
                ],
            },
            {
                id: "assets",
                step: 3,
                type: "multi",
                label: "Q8. 보유 자산 (복수 선택)",
                required: true,
                options: [
                    { value: "none", label: "보유 자산 없음" },
                    { value: "house", label: "주택 (자가)" },
                    { value: "car", label: "차량" },
                    { value: "deposit", label: "예적금" },
                    { value: "etc", label: "기타" },
                ],
            },
            {
                id: "history",
                step: 3,
                type: "select",
                label: "Q9. 회생·파산 신청 이력",
                required: true,
                options: [
                    { value: "none", label: "이력 없음" },
                    { value: "denied", label: "신청했으나 기각" },
                    { value: "discharged", label: "면책 받음 (10년 이내)" },
                ],
            },
        ],
    },
    result: {
        logic: debtReliefLogic,
        branches: [
            {
                grade: "A",
                title: "신청 가능성 높음",
                description: "현재 상황에서 개인회생 신청 가능성이 높게 판단됩니다. 전담 변호사 1:1 상담을 통해 변제계획안 설계를 시작하실 수 있습니다.",
                cta: "지금 변호사 상담 예약",
            },
            {
                grade: "B",
                title: "추가 검토 필요",
                description: "신청 가능성이 있으나 일부 조건 검토가 필요합니다. 전담 변호사가 자료 확인 후 절차를 안내드립니다.",
                cta: "검토 상담 예약",
            },
            {
                grade: "C",
                title: "다른 절차 안내",
                description: "현재 상황에서는 개인회생 외 다른 채무 조정 절차 (워크아웃·신용회복 등) 가 적합할 수 있습니다.",
                cta: "다른 절차 안내 받기",
            },
        ],
    },
    contact: {
        sheetId: "1THuTtpdZiRB0yI7jxWal5RU-SOHifDUYIGOXbP-g2AY",
        additionalFields: [
            { key: "name", label: "성함", required: true },
            { key: "phone", label: "연락처", required: true },
            { key: "time", label: "통화 가능 시간대", required: true },
        ],
    },
    guardrail: {
        law: "변호사법 §24의2 · 광고규정 §3·§4",
        forbidden: [
            '"100% 면책" / "확실한 면책" — 확정 효과 표현 금지',
            '"전문 변호사" — 협회 미등록 시 위반',
            '"성공보수 0원" — 단정 표현 금지',
            "의뢰인 추천사·실명 후기 — 광고규정 §4 위반",
        ],
        allowed: [
            "개인회생 신청 가능성 검토",
            "법원 절차 안내",
            "전담 변호사 (1:1 상담 시)",
            "면책 가능성 (가능성 표현으로)",
        ],
        warning: "위반 시 변호사법 §117: 1억원 이하 과태료 / 협회 징계 / 반복·중대 시 형사 송치",
    },
    defaultBrand: {
        companyName: "OT MARKETING (시안)",
        businessNumber: "141-39-01329",
        contactPerson: "장은태",
        phone: "070-4367-4013",
        mandatoryNote: "광고책임 변호사: (계약 후 광고주 측 변호사명 자동 표기) · 변호사법 §24의2 ② 의무 표시",
    },
};
