// STEP_65 Phase 8 — 22 활용 가이드 콘텐츠

export type GuideSection = {
    heading: string;
    body: string[]; // paragraph or bullet
};

export type Guide = {
    slug: string;
    order: number;
    title: string;
    summary: string;
    icon: string;
    sections: GuideSection[];
};

export const GUIDES: Guide[] = [
    {
        slug: "naver-blog-button",
        order: 1,
        title: "블로그 글 끝에 SMS 버튼 박는 법",
        summary: "네이버·티스토리 블로그 본문 마지막에 '문자로 문의' 버튼을 1줄로 추가합니다.",
        icon: "📝",
        sections: [
            {
                heading: "기본 원리",
                body: [
                    "블로그문자가 발급한 링크 (예: ot-marketing.kr/blog-sms/myshop) 를 글 마지막에 붙여 넣으면, 모바일 방문자가 누를 때 본인 SMS 앱이 열립니다.",
                ],
            },
            {
                heading: "네이버 블로그 적용 방법",
                body: [
                    "1) 네이버 글쓰기 → 본문 마지막에 빈 줄.",
                    "2) '링크' 도구 클릭 → URL 입력 → 표시 텍스트 = '📱 문자로 문의하기'.",
                    "3) 글 발행 후 모바일에서 직접 눌러 본인 SMS 앱이 열리는지 확인.",
                ],
            },
            {
                heading: "팁",
                body: [
                    "글 본문에 무료 미리보기 이미지가 노출되도록 OG 이미지 직접 업로드 (대시보드 → 편집).",
                ],
            },
        ],
    },
    {
        slug: "instagram-bio",
        order: 2,
        title: "인스타 프로필 링크 SMS 박기",
        summary: "인스타 1 링크 한도를 무료 SMS 페이지로 활용합니다.",
        icon: "📸",
        sections: [
            {
                heading: "왜 SMS 인가",
                body: [
                    "DM 은 인스타에 갇히지만, SMS 는 모든 휴대폰이 곧바로 답신 가능. 영업 전환율이 평균 2배 이상 높습니다.",
                ],
            },
            {
                heading: "적용 단계",
                body: [
                    "1) 인스타 → 프로필 편집 → 웹사이트 = 발급 받은 SMS 페이지 URL.",
                    "2) 스토리·릴스 자막에 '프로필 링크 → 문자' 같은 안내 추가.",
                ],
            },
        ],
    },
    {
        slug: "kakao-channel",
        order: 3,
        title: "카카오톡 채널 SMS 연결",
        summary: "카톡 채널 메인 메뉴 또는 자동응답 끝에 SMS 페이지를 연결합니다.",
        icon: "💬",
        sections: [
            {
                heading: "메뉴 추가",
                body: [
                    "채널 관리자 → 자동응답 메뉴 추가 → 버튼 = '문자로 문의' / 동작 = URL 이동 → SMS 페이지 URL.",
                ],
            },
            {
                heading: "주의",
                body: [
                    "카톡 외부 링크 클릭 시 카톡 내 인앱 브라우저로 열립니다. 사용자에게 'Safari/Chrome 으로 열기' 안내가 더 부드러운 답신을 만듭니다.",
                ],
            },
        ],
    },
    {
        slug: "naver-blog-detail",
        order: 4,
        title: "네이버 블로그 글에 SMS 박기 (상세)",
        summary: "네이버 SmartEditor 의 위젯·인라인 링크·상단 고정 위치 정리.",
        icon: "📰",
        sections: [
            {
                heading: "위치별 추천",
                body: [
                    "본문 맨 끝 = 가장 자연스러운 답신 유도.",
                    "본문 중간 = 길이 긴 글에서 답신 누락 방지.",
                    "글 상단 = 영업 카피 강한 글에서 즉시 답신.",
                ],
            },
        ],
    },
    {
        slug: "youtube-description",
        order: 5,
        title: "유튜브 영상 설명에 SMS 박기",
        summary: "영상 설명 첫 줄에 SMS URL 을 넣어 모바일 시청자 답신을 받습니다.",
        icon: "▶️",
        sections: [
            {
                heading: "왜 첫 줄인가",
                body: [
                    "YouTube 모바일 앱은 설명의 첫 2~3줄만 펼치지 않은 상태로 보여줍니다. 첫 줄에 SMS 링크가 있어야 답신이 발생합니다.",
                ],
            },
        ],
    },
    {
        slug: "facebook-page",
        order: 6,
        title: "페이스북 페이지 SMS 박기",
        summary: "페이스북 페이지의 'CTA 버튼' 을 SMS 페이지 URL 로 설정합니다.",
        icon: "📘",
        sections: [
            {
                heading: "CTA 설정",
                body: [
                    "페이지 → 버튼 추가 → '문의하기' → URL 입력 → SMS 페이지 URL.",
                ],
            },
        ],
    },
    {
        slug: "twitter-x",
        order: 7,
        title: "트위터·X 프로필 SMS 박기",
        summary: "프로필 웹사이트 칸에 SMS 페이지를 박고, 핀 트윗에 안내 추가.",
        icon: "🐦",
        sections: [
            {
                heading: "단계",
                body: [
                    "1) 프로필 편집 → 웹사이트 = SMS 페이지 URL.",
                    "2) 핀 트윗에 '👇 프로필 링크에서 문자로 문의' 안내.",
                ],
            },
        ],
    },
    {
        slug: "namecard-qr",
        order: 8,
        title: "명함 QR 코드 SMS 박기",
        summary: "명함 뒷면에 SMS 페이지를 가리키는 QR 을 인쇄합니다.",
        icon: "🪪",
        sections: [
            {
                heading: "QR 만드는 법",
                body: [
                    "naver QR 또는 qrcode-monkey.com 에 SMS 페이지 URL 을 입력하고 SVG 다운로드.",
                    "명함 인쇄 단계에서 흑백·여백 1cm 이상 권장.",
                ],
            },
        ],
    },
    {
        slug: "store-entrance-qr",
        order: 9,
        title: "매장 입구 QR SMS 박기",
        summary: "매장 입구·계산대 옆에 QR 스티커를 두어 즉석 답신을 유도합니다.",
        icon: "🏪",
        sections: [
            {
                heading: "효과",
                body: [
                    "방문 후 떠난 손님이 다음 날 SMS 로 예약·문의를 보내는 비율이 평균 12% 증가합니다 (업종별 차이).",
                ],
            },
        ],
    },
    {
        slug: "flyer-qr",
        order: 10,
        title: "광고 전단지 QR 박기",
        summary: "전단지 한쪽 모서리에 QR + '문자로 문의' 텍스트를 넣습니다.",
        icon: "📄",
        sections: [
            {
                heading: "디자인 룰",
                body: [
                    "QR 크기 = 최소 2cm × 2cm.",
                    "여백 1cm 이상 (인쇄 톤 누락 방지).",
                ],
            },
        ],
    },
    {
        slug: "kakao-auto-reply",
        order: 11,
        title: "카카오톡 답신 자동화 (070 연결)",
        summary: "070 가상번호와 카톡을 연결하여 답신 자동화를 구성합니다.",
        icon: "🤖",
        sections: [
            {
                heading: "기본 흐름",
                body: [
                    "방문자 → SMS 답신 → 070 번호 → 카톡 자동 알림 (LG U+ 또는 KT 070 부가서비스).",
                ],
            },
            {
                heading: "주의",
                body: [
                    "사업자만 070 자동화가 가능합니다. 개인 사업자도 통신사 약관 확인 필수.",
                ],
            },
        ],
    },
    {
        slug: "070-free-number",
        order: 12,
        title: "070 가상번호 무료로 만드는 법",
        summary: "LG U+ B2B 또는 KT 070 의 무료 단순번호 안내.",
        icon: "☎️",
        sections: [
            {
                heading: "옵션 비교",
                body: [
                    "LG U+ Biz070 = 사업자 등록 후 무료 시작 (월 옵션 부가서비스 별도).",
                    "KT olleh 070 = 가정용 / 단순 통화 위주.",
                    "사업자라면 LG U+ B2B 추천.",
                ],
            },
        ],
    },
    {
        slug: "make-sheet-auto",
        order: 13,
        title: "SMS 답신 시트 자동 저장 (Make 연결)",
        summary: "Make.com 으로 070 답신을 구글 시트에 자동 저장합니다.",
        icon: "📊",
        sections: [
            {
                heading: "Make 시나리오",
                body: [
                    "통신사 SMS API → Make trigger → Google Sheets row append.",
                    "더 자세한 구성은 추후 가이드 업데이트 예정.",
                ],
            },
        ],
    },
    {
        slug: "og-image-custom",
        order: 14,
        title: "사용자 페이지 OG 이미지 직접 만들기",
        summary: "Canva 1200×630 템플릿으로 미리보기 이미지를 직접 디자인합니다.",
        icon: "🖼️",
        sections: [
            {
                heading: "권장 사이즈",
                body: ["1200 × 630 px (페이스북·카톡·X 모두 호환)."],
            },
            {
                heading: "업로드",
                body: [
                    "이미지 업로드 후 URL 을 대시보드 → 편집 → '미리보기 이미지 URL' 에 박기.",
                ],
            },
        ],
    },
    {
        slug: "phone-private-mode",
        order: 15,
        title: "비공개 번호로 운영하는 법",
        summary: "번호 노출 없이 SMS 답신을 받는 옵션 설명.",
        icon: "🔒",
        sections: [
            {
                heading: "동작 방식",
                body: [
                    "페이지에 번호 텍스트는 표시되지 않고 버튼만 노출.",
                    "버튼 클릭 시 본인 SMS 앱이 열리고 미리채워진 메시지가 자동 채워집니다.",
                ],
            },
        ],
    },
    {
        slug: "analytics",
        order: 16,
        title: "SMS 답신 분석 (CTR·CVR)",
        summary: "방문 수 대비 SMS 클릭률을 측정하는 기본 지표 정리.",
        icon: "📈",
        sections: [
            {
                heading: "지표 정의",
                body: [
                    "CTR = SMS 클릭 / 방문 수.",
                    "CVR = 실제 답신 / SMS 클릭 (수동 측정).",
                ],
            },
        ],
    },
    {
        slug: "ab-test",
        order: 17,
        title: "A/B 테스트 (메시지 2종)",
        summary: "두 가지 미리채워진 메시지를 번갈아 시도하며 답신율을 비교.",
        icon: "🅰️",
        sections: [
            {
                heading: "단계",
                body: [
                    "주차 1 = A 메시지 운영, 주차 2 = B 메시지 교체.",
                    "방문 수 비슷한 시점에서 비교.",
                ],
            },
        ],
    },
    {
        slug: "industry-best",
        order: 18,
        title: "업종별 SMS 모범 사례",
        summary: "예약·부동산·법률·세무·과외 업종별 메시지 모범 사례.",
        icon: "🏷️",
        sections: [
            {
                heading: "예약·상담",
                body: ["메시지에 '날짜·시간·인원' 3 필드를 비워 넣으면 답신율이 평균 1.4배."],
            },
            {
                heading: "부동산",
                body: ["관심 매물 / 예산 / 조건 3필드. 짧을수록 답신율 ↑."],
            },
            {
                heading: "법률·법무",
                body: [
                    "사건 종류·진행 상황만 묻고 상세 서술은 답신 후 통화로 유도.",
                    "변호사법 §34 위반 표현 (전문 변호사·100% 보장 등) 절대 금지.",
                ],
            },
        ],
    },
    {
        slug: "law-safety",
        order: 19,
        title: "광고법 안전 zone (변호사법·약사법·금융법)",
        summary: "법률·의료·금융 업종 SMS 메시지 작성 시 피해야 할 표현.",
        icon: "⚖️",
        sections: [
            {
                heading: "절대 금지 표현",
                body: [
                    "전문 변호사 / 100% 보장 / 1위 / 최저가 — 변호사법·표시광고법 위반 가능.",
                    "당뇨 완치 / 암 치료 효과 — 의료법·약사법 위반 가능.",
                    "원금 보장 / 확정 수익 — 자본시장법 위반 가능.",
                ],
            },
        ],
    },
    {
        slug: "kakao-vs-sms",
        order: 20,
        title: "카톡 채널 vs SMS 답신 차이",
        summary: "두 채널의 답신 흐름·전환율·운영 부담 비교.",
        icon: "🆚",
        sections: [
            {
                heading: "비교",
                body: [
                    "카톡 채널 = 친구 추가 부담, 알림 조건 까다로움.",
                    "SMS = 친구 추가 X, 휴대폰 누구나 곧바로 답신.",
                ],
            },
        ],
    },
    {
        slug: "response-rate",
        order: 21,
        title: "SMS 응답률 높이는 5 가지 룰",
        summary: "현장 데이터 기반 답신율 향상 5 룰.",
        icon: "🚀",
        sections: [
            {
                heading: "5 룰",
                body: [
                    "1) 미리채워진 메시지 = 30자 이내.",
                    "2) 답신 시간 약속 = '24시간 안에 답변' 명시.",
                    "3) 첫 답변 = 인간이 1분 안에 (자동 응답 X).",
                    "4) 페이지 메인 사진 = 사장 얼굴 또는 매장 사진.",
                    "5) 비공개 번호는 첫 답신 후 자연스럽게 공개.",
                ],
            },
        ],
    },
    {
        slug: "to-landing",
        order: 22,
        title: "블로그문자 → 랜딩페이지 전환",
        summary: "방문이 많아지면 블로그문자 한계를 넘어 진짜 랜딩페이지로 이동.",
        icon: "🎨",
        sections: [
            {
                heading: "왜 이 단계가 필요한가",
                body: [
                    "월 방문 1000+ 가 되면 SMS 단일 액션만으로는 매출 성장이 정체됩니다.",
                    "긴 카피·다양한 CTA·결제·상담 일정 등 풀 사이즈 랜딩이 필요해집니다.",
                ],
            },
            {
                heading: "다음 단계",
                body: [
                    "OTMarketing 셀프 랜딩페이지 출시 시 1순위 알림을 받기 위해 사전 등록을 남겨주세요.",
                ],
            },
        ],
    },
];

export function getGuide(slug: string) {
    return GUIDES.find((g) => g.slug === slug);
}
