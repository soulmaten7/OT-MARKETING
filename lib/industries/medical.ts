import type { IndustryConfig, AnswerMap } from "./index";

const medicalLogic = (a: AnswerMap): string => {
    const intent = a.intent as string;
    const symptom = a.symptom as string;
    const budget = a.budget as string;

    if (intent === "asap" && (symptom === "ongoing" || symptom === "checked") && budget !== "undecided") return "A";
    if (intent === "asap" || intent === "consult") return "B";
    return "C";
};

export const medicalConfig: IndustryConfig = {
    industryId: "select6",
    industryNumber: 6,
    industryName: "병의원",
    hero: {
        eyebrow: "FREE PRE-CONSULT CHECK",
        title: "1분 무료",
        titleHighlight: "사전 상담 진단",
        subtitle: "5문항 답변 시 진료 의향·일정에 맞춘 사전 상담 안내드립니다.",
        ctaText: "지금 진단 시작",
    },
    diagnosis: {
        progressSteps: 3,
        stepLabels: ["1/3 · 진료 의향", "2/3 · 일정·예산", "3/3 · 결과 + 사전 상담 신청"],
        questions: [
            {
                id: "department",
                step: 1,
                type: "select",
                label: "Q1. 희망 진료 과목",
                required: true,
                options: [
                    { value: "skin", label: "피부과" },
                    { value: "plastic", label: "성형외과" },
                    { value: "oriental", label: "한의원" },
                    { value: "dental", label: "치과" },
                    { value: "general", label: "일반 진료" },
                    { value: "etc", label: "기타" },
                ],
            },
            {
                id: "symptom",
                step: 1,
                type: "select",
                label: "Q2. 증상·관심 사항 진행 정도",
                required: true,
                options: [
                    { value: "ongoing", label: "현재 증상 있음" },
                    { value: "checked", label: "타원 진단 받음" },
                    { value: "interest", label: "관심 단계 (증상 없음)" },
                ],
            },
            {
                id: "intent",
                step: 2,
                type: "select",
                label: "Q3. 검토 단계",
                required: true,
                options: [
                    { value: "asap", label: "즉시 사전 상담 희망" },
                    { value: "consult", label: "비용·절차 안내 후 결정" },
                    { value: "info", label: "정보만 원함" },
                ],
            },
            {
                id: "budget",
                step: 2,
                type: "select",
                label: "Q4. 비용 범위",
                required: true,
                options: [
                    { value: "under_50", label: "50만원 미만" },
                    { value: "50_200", label: "50만원 ~ 200만원" },
                    { value: "200_500", label: "200만원 ~ 500만원" },
                    { value: "over_500", label: "500만원 이상" },
                    { value: "undecided", label: "미정 (안내 받고 결정)" },
                ],
            },
            {
                id: "location",
                step: 2,
                type: "select",
                label: "Q5. 희망 위치",
                required: true,
                options: [
                    { value: "seoul_north", label: "서울 강북" },
                    { value: "seoul_south", label: "서울 강남" },
                    { value: "gyeonggi", label: "경기·인천" },
                    { value: "regional", label: "지방" },
                    { value: "any", label: "위치 무관" },
                ],
            },
        ],
    },
    result: {
        logic: medicalLogic,
        branches: [
            {
                grade: "A",
                title: "사전 상담 즉시 안내 가능",
                description: "조건이 적합하여 사전 상담 일정 즉시 안내 가능합니다. 전담 코디네이터가 1:1 안내드립니다.",
                cta: "사전 상담 예약",
            },
            {
                grade: "B",
                title: "비용·절차 안내 후 결정",
                description: "비용 범위·절차 자료 안내 후 결정 가능합니다. 자료 수령 후 추가 진단 가능합니다.",
                cta: "비용·절차 안내 받기",
            },
            {
                grade: "C",
                title: "정보 자료 안내",
                description: "진료 과목 정보 자료를 안내드립니다.",
                cta: "정보 자료 받기",
            },
        ],
    },
    contact: {
        sheetId: null,
        additionalFields: [
            { key: "name", label: "성함", required: true },
            { key: "phone", label: "연락처", required: true },
            { key: "time", label: "통화 가능 시간대", required: true },
        ],
    },
    guardrail: {
        law: "의료법 §56 (의료광고 사전심의)",
        forbidden: [
            '"효과 100% 보장" — 의료법 §56 위반',
            "환자 실명·실사진 후기 — 의료법 §56 위반",
            "시술 전후 비교 사진 (사전심의 미통과 시)",
            '"최고" / "1위" — 단정 표현',
        ],
        allowed: [
            "사전 상담 안내",
            "절차 설명",
            "진료 과목 안내",
            "비용 범위 안내 (구체 금액은 사전심의 통과 시)",
        ],
        warning: "위반 시 의료법 §56·§89: 1년 이하 징역 또는 1천만원 이하 벌금",
    },
    defaultBrand: {
        companyName: "OT MARKETING (시안)",
        businessNumber: "141-39-01329",
        contactPerson: "장은태",
        phone: "070-4367-4013",
        mandatoryNote: "의료광고 사전심의 통과 (심의번호: 광고주 측 자료 자동 표기)",
    },
};
