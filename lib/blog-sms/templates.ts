// STEP_65 Phase 4 — 14 업종 템플릿 (변호사법·자본시장법·약사법 안전 zone 준수)

export type IndustryTemplate = {
    industry_key: string;
    industry_name: string;
    default_title: string;
    default_description: string;
    default_message: string;
    display_order: number;
};

export const INDUSTRY_TEMPLATES: IndustryTemplate[] = [
    {
        industry_key: "general",
        industry_name: "일반·기타",
        default_title: "문자로 빠르게 답변드립니다",
        default_description: "궁금한 점을 남겨주세요. 빠르게 답변드립니다.",
        default_message: "안녕하세요, 글 보고 연락드립니다. 문의 사항이 있어 메시지 남깁니다.",
        display_order: 1,
    },
    {
        industry_key: "reservation",
        industry_name: "예약·상담",
        default_title: "예약·상담 문의",
        default_description: "원하시는 날짜·시간·인원을 적어주시면 빠르게 확인드립니다.",
        default_message: "안녕하세요, 예약 문의드립니다.\n· 날짜: \n· 시간: \n· 인원: ",
        display_order: 2,
    },
    {
        industry_key: "realestate",
        industry_name: "부동산·중개",
        default_title: "매물 상담 문의",
        default_description: "관심 매물·예산·조건을 알려주시면 맞춤 매물 안내드립니다.",
        default_message: "안녕하세요, 매물 상담 문의드립니다.\n· 관심 지역: \n· 예산: \n· 조건: ",
        display_order: 3,
    },
    {
        industry_key: "legal",
        industry_name: "법률·법무",
        default_title: "법무 상담 문의",
        default_description: "사건 개요를 간단히 적어주시면 담당자가 회신드립니다.",
        default_message: "안녕하세요, 법무 상담 문의드립니다.\n· 사건 종류: \n· 진행 상황: ",
        display_order: 4,
    },
    {
        industry_key: "tax",
        industry_name: "세무·회계",
        default_title: "세무 상담 문의",
        default_description: "사업 형태·문의 항목을 알려주시면 답변드립니다.",
        default_message: "안녕하세요, 세무 상담 문의드립니다.\n· 사업 형태: \n· 문의 항목: ",
        display_order: 5,
    },
    {
        industry_key: "insurance",
        industry_name: "보험",
        default_title: "보험 상담 문의",
        default_description: "관심 보험·연령대를 알려주시면 안내드립니다.",
        default_message: "안녕하세요, 보험 상담 문의드립니다.\n· 관심 보험: \n· 연령대: ",
        display_order: 6,
    },
    {
        industry_key: "usedcar",
        industry_name: "중고차",
        default_title: "중고차 매입·판매 문의",
        default_description: "차종·연식·예산을 알려주시면 빠르게 답변드립니다.",
        default_message: "안녕하세요, 중고차 문의드립니다.\n· 차종: \n· 연식: \n· 예산: ",
        display_order: 7,
    },
    {
        industry_key: "interior",
        industry_name: "인테리어·리모델링",
        default_title: "인테리어 상담 문의",
        default_description: "평수·예산·시공 항목을 알려주시면 견적 안내드립니다.",
        default_message: "안녕하세요, 인테리어 상담 문의드립니다.\n· 평수: \n· 예산: \n· 시공 항목: ",
        display_order: 8,
    },
    {
        industry_key: "tutor",
        industry_name: "과외·교육",
        default_title: "수업 문의",
        default_description: "과목·학년·희망 시간을 알려주시면 안내드립니다.",
        default_message: "안녕하세요, 수업 문의드립니다.\n· 과목: \n· 학년: \n· 희망 시간: ",
        display_order: 9,
    },
    {
        industry_key: "fitness",
        industry_name: "헬스·PT",
        default_title: "PT·등록 상담 문의",
        default_description: "관심 프로그램·요일을 알려주시면 안내드립니다.",
        default_message: "안녕하세요, PT 상담 문의드립니다.\n· 관심 프로그램: \n· 가능 요일: ",
        display_order: 10,
    },
    {
        industry_key: "beauty",
        industry_name: "미용·이용",
        default_title: "예약 문의",
        default_description: "원하시는 시술·날짜·시간을 알려주세요.",
        default_message: "안녕하세요, 예약 문의드립니다.\n· 시술: \n· 날짜·시간: ",
        display_order: 11,
    },
    {
        industry_key: "cleaning",
        industry_name: "청소·이사",
        default_title: "청소·이사 견적 문의",
        default_description: "평수·일정·서비스 항목을 알려주시면 견적 안내드립니다.",
        default_message: "안녕하세요, 견적 문의드립니다.\n· 평수: \n· 일정: \n· 서비스: ",
        display_order: 12,
    },
    {
        industry_key: "recruit",
        industry_name: "채용·구인",
        default_title: "채용 문의",
        default_description: "지원 직무·경력을 알려주시면 안내드립니다.",
        default_message: "안녕하세요, 채용 문의드립니다.\n· 지원 직무: \n· 경력: ",
        display_order: 13,
    },
    {
        industry_key: "etc",
        industry_name: "기타",
        default_title: "문의 남겨주세요",
        default_description: "원하시는 내용을 자유롭게 적어주세요.",
        default_message: "안녕하세요, 글 보고 연락드립니다.",
        display_order: 14,
    },
];

export function getTemplate(key: string): IndustryTemplate | undefined {
    return INDUSTRY_TEMPLATES.find((t) => t.industry_key === key);
}

export const RESERVED_USERNAMES = new Set([
    "admin",
    "root",
    "api",
    "blog-sms",
    "blogsms",
    "dashboard",
    "login",
    "signup",
    "guide",
    "faq",
    "landing-pre-register",
    "auth",
    "ads",
    "samples",
    "about",
    "contact",
    "legal",
    "privacy",
    "terms",
    "thank-you",
    "static",
    "public",
    "_next",
    "favicon",
]);

export function validateUsername(username: string): { ok: boolean; error?: string } {
    if (!username) return { ok: false, error: "아이디를 입력해 주세요." };
    if (!/^[a-z0-9_-]{4,20}$/.test(username)) {
        return {
            ok: false,
            error: "영문 소문자·숫자·`_`·`-` 만 사용해 4~20자로 입력해 주세요.",
        };
    }
    if (RESERVED_USERNAMES.has(username)) {
        return { ok: false, error: "사용할 수 없는 아이디입니다." };
    }
    return { ok: true };
}
