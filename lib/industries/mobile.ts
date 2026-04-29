import type { IndustryConfig, AnswerMap } from "./index";

const mobileLogic = (a: AnswerMap): string => {
    const join = a.join_type as string;
    const family = a.family_combo as string;

    if (join === "mnp" && family === "yes") return "MNP_FAMILY";
    if (join === "new" || join === "change") return "NEW_CHANGE";
    return "MVNO_UNDECIDED";
};

export const mobileConfig: IndustryConfig = {
    industryId: "select3",
    industryNumber: 3,
    industryName: "인터넷·통신·휴대폰",
    hero: {
        eyebrow: "FREE PLAN CHECK",
        title: "1분 무료",
        titleHighlight: "요금제 진단",
        subtitle: "6문항 답변 시 결합·MNP 조건에 맞춘 최적 요금제를 안내드립니다.",
        ctaText: "지금 진단 시작",
    },
    diagnosis: {
        progressSteps: 3,
        stepLabels: ["1/3 · 현재 사용", "2/3 · 가입 의향", "3/3 · 결과 + 가입 안내"],
        questions: [
            {
                id: "current_carrier",
                step: 1,
                type: "select",
                label: "Q1. 현재 통신사",
                required: true,
                options: [
                    { value: "skt", label: "SK Telecom" },
                    { value: "kt", label: "KT" },
                    { value: "lgu", label: "LG U+" },
                    { value: "mvno", label: "알뜰폰 (MVNO)" },
                    { value: "none", label: "현재 가입 없음" },
                ],
            },
            {
                id: "monthly_fee",
                step: 1,
                type: "select",
                label: "Q2. 월 통신비 (휴대폰 + 인터넷 합산)",
                required: true,
                options: [
                    { value: "under_5", label: "5만원 미만" },
                    { value: "5_10", label: "5만원 ~ 10만원" },
                    { value: "10_15", label: "10만원 ~ 15만원" },
                    { value: "over_15", label: "15만원 이상" },
                ],
            },
            {
                id: "join_type",
                step: 2,
                type: "select",
                label: "Q3. 가입 유형",
                required: true,
                options: [
                    { value: "mnp", label: "번호이동 (MNP)" },
                    { value: "new", label: "신규 가입" },
                    { value: "change", label: "기기 변경" },
                    { value: "mvno", label: "알뜰폰 검토" },
                    { value: "undecided", label: "미정" },
                ],
            },
            {
                id: "device",
                step: 2,
                type: "select",
                label: "Q4. 단말 요청 사항",
                required: true,
                options: [
                    { value: "newest", label: "최신 단말 (할부 가능)" },
                    { value: "midrange", label: "중급 단말" },
                    { value: "use_existing", label: "기존 단말 사용" },
                    { value: "any", label: "추천 받음" },
                ],
            },
            {
                id: "family_combo",
                step: 2,
                type: "radio",
                label: "Q5. 가족 결합 가입 의향",
                required: true,
                options: [
                    { value: "yes", label: "가족 결합 가입 (2~5명)" },
                    { value: "single", label: "단독 가입" },
                    { value: "consider", label: "안내 받고 결정" },
                ],
            },
            {
                id: "call_time",
                step: 2,
                type: "select",
                label: "Q6. 통화 가능 시간대",
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
        logic: mobileLogic,
        branches: [
            {
                grade: "MNP_FAMILY",
                title: "MNP + 가족 결합 추천",
                description: "번호이동 + 가족 결합 조합으로 월 통신비 절감 가능성이 큽니다. 전담 상담사가 결합 혜택 안내드립니다.",
                cta: "결합 상담 예약",
            },
            {
                grade: "NEW_CHANGE",
                title: "신규·기변 안내",
                description: "신규 가입 또는 기기 변경 조건에 맞춘 요금제·할부 안내드립니다.",
                cta: "신규 가입 안내",
            },
            {
                grade: "MVNO_UNDECIDED",
                title: "알뜰폰 / 검토 정보 안내",
                description: "알뜰폰 옵션 또는 추가 정보 자료 안내드립니다. 추후 검토 시 다시 진단 가능합니다.",
                cta: "정보 자료 받기",
            },
        ],
    },
    contact: {
        sheetId: "1iAXREiGGnao1d3hV9RkrTyWlH5UF0LAW2e1ueNHengg", // OT-leads-mobile-2026
        additionalFields: [
            { key: "name", label: "성함", required: true },
            { key: "phone", label: "연락처", required: true },
        ],
    },
    guardrail: {
        law: "전기통신사업법 · 표시광고법",
        forbidden: [
            '"최고 속도 보장" — 단정 표현 금지',
            '"최저가 1위" / "공식 인증 1위" — 부당비교',
            "약관 미명시 광고",
            "이용자 보호 의무 미준수",
        ],
        allowed: [
            "기가 인터넷 안내",
            "결합 할인 정보",
            "MNP·신규·기변 가입 유형 안내",
            "약관 명시 + 이용자 보호 사항 표시",
        ],
        warning: "위반 시 전기통신사업법: 시정명령 + 과태료 (반복 시 영업정지)",
    },
    defaultBrand: {
        companyName: "OT MARKETING (시안)",
        businessNumber: "141-39-01329",
        contactPerson: "장은태",
        phone: "070-4367-4013",
        mandatoryNote: "전기통신사업법 §50 약관 표시 의무",
    },
};
