import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "OTMarketing 블로그문자 — 100% 무료 문자 답신 SaaS",
    description:
        "블로그·인스타·명함에 문자 버튼 박는 가장 빠른 방법. 회원가입 1분, 평생 100% 무료, 결제 정보 0건. 14 업종 템플릿 즉시 사용.",
    openGraph: {
        title: "OTMarketing 블로그문자 — 100% 무료 문자 답신 SaaS",
        description: "블로그·인스타·명함에 문자 버튼 박는 가장 빠른 방법. 평생 100% 무료. 결제 정보 0건.",
        type: "website",
    },
};

const VALUE_CARDS = [
    {
        emoji: "🛡️",
        bg: "bg-[var(--navy-50)]",
        ring: "ring-[var(--navy-900)]/20",
        title: "블로그 지수 보호",
        body: "전화번호를 글에 직접 노출 X. 안전한 SMS 링크 한 줄로 연결 = 검색엔진 저품질 위험 0.",
    },
    {
        emoji: "💬",
        bg: "bg-[var(--coral-50)]",
        ring: "ring-[var(--coral-500)]/30",
        title: "미리채워진 답신",
        body: "방문자가 버튼 누르면 14 업종 템플릿이 자동 채워진 SMS 앱이 즉시 열림. 응대 자동화.",
    },
    {
        emoji: "⚡",
        bg: "bg-[var(--gold-50)]",
        ring: "ring-[var(--gold-500)]/40",
        title: "1 클릭 연결",
        body: "방문자는 한 번의 탭으로 본인 휴대폰 SMS 앱 호출. 망설임 0 = 문의율 ↑.",
    },
];

const FEATURES = [
    { title: "평생 100% 무료", body: "회원가입·페이지 발급·SMS 링크 모두 0원. 결제 정보 입력 X. 한도 X. 카드 X." },
    { title: "1분 셋업", body: "이메일·아이디·휴대폰 한 번 입력 = ot-marketing.kr/blog-sms/내아이디 즉시 발급." },
    { title: "14 업종 템플릿", body: "예약·부동산·법률·세무·보험·과외·헬스·미용·청소·인테리어 등 즉시 사용 메시지." },
    { title: "비공개 번호", body: "번호 노출 없이 답신을 받고 싶다면 비공개 옵션 1 클릭." },
    { title: "OG 이미지 자동", body: "카톡·페이스북에 링크 붙여넣을 때 미리보기 카드 자동. 직접 업로드도 가능." },
    { title: "방문·클릭 통계", body: "내 페이지가 몇 번 열렸고 SMS 버튼이 몇 번 눌렸는지 즉시 확인." },
];

const STEPS = [
    { n: "01", title: "회원가입", body: "이메일·아이디 4~20자·휴대폰 한 번만 입력." },
    { n: "02", title: "업종 선택", body: "14 업종 템플릿 중 1 개 선택. 메시지·제목 즉시 채움." },
    { n: "03", title: "링크 공유", body: "ot-marketing.kr/blog-sms/내아이디 를 블로그·SNS 에 박기." },
    { n: "04", title: "문자 받기", body: "방문자가 버튼 누르면 본인 SMS 앱 자동 호출 → 미리채워진 메시지." },
];

const USE_CASES = [
    { emoji: "📝", label: "네이버 블로그 글 끝" },
    { emoji: "📸", label: "인스타 프로필 링크" },
    { emoji: "💬", label: "카카오톡 채널 답신" },
    { emoji: "🎬", label: "유튜브 영상 설명" },
    { emoji: "📇", label: "명함 QR 코드" },
    { emoji: "🏪", label: "매장 입구 QR" },
];

export default function BlogSmsLanding() {
    return (
        <div className="bg-white text-[var(--slate-900)]">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--navy-900)] text-white pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="ot-container">
                    <div className="max-w-3xl">
                        {/* 평생 100% 무료 강조 배너 — blogsms.net 패턴 응용, 결제 X 본질 박기 */}
                        <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 px-5 py-3 bg-black/40 backdrop-blur-sm rounded-2xl mb-8 ring-1 ring-white/10">
                            <span className="inline-flex items-center gap-2 text-[var(--coral-400)] font-bold text-sm tracking-wide">
                                <span className="text-base">🎁</span>
                                평생 100% 무료
                            </span>
                            <span className="hidden sm:inline-block w-px h-4 bg-white/20" />
                            <span className="text-white/85 text-sm">
                                결제 정보 입력 X · 카드 등록 X · 한도 X · 광고 X
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
                            글에 <span className="text-[var(--coral-400)]">문자 버튼</span> 박는<br />
                            가장 빠른 방법.
                        </h1>
                        <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl">
                            블로그·인스타·명함에 링크 한 줄 붙이면 끝.<br />
                            방문자는 본인 휴대폰 SMS 앱으로 미리채워진 메시지를 곧바로 보냅니다.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/blog-sms/signup"
                                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-semibold rounded-full transition-colors shadow-lg shadow-[var(--coral-500)]/20"
                            >
                                ✨ 무료로 시작하기
                            </Link>
                            <Link
                                href="/blog-sms/guide"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-full ring-1 ring-white/30 transition-colors"
                            >
                                활용 가이드 22 가지
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 컬러 가치 카드 — blogsms.net 패턴 응용 */}
            <section className="py-16 md:py-20 bg-white">
                <div className="ot-container">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-3 text-center">
                        왜 <span className="text-[var(--coral-500)]">블로그문자</span>를 사용해야 할까요?
                    </h2>
                    <p className="text-center text-[var(--slate-700)] mb-12 max-w-xl mx-auto">
                        블로그 방문자를 잠재 고객으로. 저품질 걱정 0, 응대 자동화.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {VALUE_CARDS.map((c) => (
                            <div
                                key={c.title}
                                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div
                                    className={`w-14 h-14 ${c.bg} rounded-2xl flex items-center justify-center mb-5 ring-1 ${c.ring}`}
                                >
                                    <span className="text-3xl">{c.emoji}</span>
                                </div>
                                <h3 className="font-bold text-xl text-[var(--navy-900)] mb-3">{c.title}</h3>
                                <p className="text-[var(--slate-700)] leading-relaxed">{c.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 핵심 기능 디테일 — SMS mockup + 동작 설명 (blogsms.net 의 핵심 기능 디테일 패턴) */}
            <section className="py-16 md:py-24 bg-[var(--slate-50)]">
                <div className="ot-container">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <span className="inline-block px-3 py-1 bg-[var(--coral-50)] text-[var(--coral-600)] text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                                핵심 기능
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-5 leading-tight">
                                업종에 맞는 답신을<br />
                                미리 박아두세요.
                            </h2>
                            <p className="text-base md:text-lg text-[var(--slate-700)] leading-relaxed mb-7">
                                14 업종 템플릿 중 하나 선택 = 메시지·제목 즉시 채움. 방문자가 SMS 버튼 누르면 본인 휴대폰 SMS 앱이 자동 호출되며, 사용자가 박은 텍스트가 그대로 들어갑니다.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "방문자 휴대폰 통신비로 발송 = 사용자 비용 0",
                                    "비공개 번호 옵션으로 본인 번호 노출 X",
                                    "방문 수·클릭 수 실시간 통계 박힘",
                                    "OG 이미지 자동 생성 (카톡·페북 미리보기)",
                                ].map((t) => (
                                    <li key={t} className="flex items-start gap-2">
                                        <span className="text-[var(--coral-500)] font-bold mt-0.5">✓</span>
                                        <span className="text-[var(--slate-700)]">{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SMS mockup — 인라인 CSS, 이미지 없음 */}
                        <div className="relative mx-auto w-full max-w-sm">
                            <div className="rounded-[2rem] bg-[var(--navy-900)] p-3 shadow-2xl">
                                <div className="rounded-[1.5rem] bg-white overflow-hidden">
                                    {/* SMS 헤더 */}
                                    <div className="bg-[var(--slate-50)] px-5 py-4 border-b border-slate-200 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--coral-400)] to-[var(--coral-600)] flex items-center justify-center text-white font-bold text-sm">
                                            나
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[var(--navy-900)]">새 메시지</p>
                                            <p className="text-xs text-[var(--slate-500)]">받는 사람: 010-1234-5678</p>
                                        </div>
                                    </div>
                                    {/* 미리채워진 메시지 */}
                                    <div className="px-5 py-6 min-h-[180px] flex items-end">
                                        <div className="bg-[var(--coral-500)] text-white rounded-2xl rounded-br-md px-4 py-3 ml-auto max-w-[85%] shadow-sm">
                                            <p className="text-sm leading-relaxed">
                                                안녕하세요, 블로그 글 보고 연락드립니다.<br />
                                                <span className="text-white/85">[예약 날짜]</span> /{" "}
                                                <span className="text-white/85">[인원]</span> 문의드려요.
                                            </p>
                                        </div>
                                    </div>
                                    {/* SMS 입력바 */}
                                    <div className="bg-[var(--slate-50)] px-5 py-3 border-t border-slate-200 flex items-center gap-2">
                                        <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-[var(--slate-500)] ring-1 ring-slate-200">
                                            메시지 작성...
                                        </div>
                                        <button className="w-9 h-9 rounded-full bg-[var(--coral-500)] flex items-center justify-center text-white">
                                            ↑
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-[var(--gold-500)] text-[var(--navy-900)] text-xs font-bold rounded-full shadow-md">
                                실제 작동 화면
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6 Features */}
            <section className="py-16 md:py-24 bg-white">
                <div className="ot-container">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-12 text-center">
                        모든 기능이 평생 무료.
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((f) => (
                            <div
                                key={f.title}
                                className="bg-[var(--slate-50)] p-7 rounded-2xl border border-slate-200 hover:border-[var(--coral-400)] transition-colors"
                            >
                                <h3 className="font-bold text-xl text-[var(--navy-900)] mb-3">{f.title}</h3>
                                <p className="text-[var(--slate-700)] leading-relaxed">{f.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4 Step process */}
            <section className="py-16 md:py-24 bg-[var(--slate-50)]">
                <div className="ot-container">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-12 text-center">
                        4 단계로 시작
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map((s) => (
                            <div
                                key={s.n}
                                className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-[var(--coral-400)] transition-colors"
                            >
                                <div className="text-4xl font-bold text-[var(--coral-500)] mb-3">{s.n}</div>
                                <h3 className="font-bold text-lg text-[var(--navy-900)] mb-2">{s.title}</h3>
                                <p className="text-[var(--slate-700)] text-sm leading-relaxed">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 활용 사례 */}
            <section className="py-16 md:py-20 bg-white">
                <div className="ot-container">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-3 text-center">
                        어디에 박을 수 있나요?
                    </h2>
                    <p className="text-center text-[var(--slate-700)] mb-12 max-w-xl mx-auto">
                        링크 한 줄만 있으면 어디서든 작동. 블로그·SNS·QR·명함 모두 OK.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {USE_CASES.map((u) => (
                            <div
                                key={u.label}
                                className="flex flex-col items-center text-center p-5 rounded-2xl bg-[var(--slate-50)] border border-slate-200 hover:border-[var(--coral-400)] hover:bg-white transition-all"
                            >
                                <span className="text-3xl mb-2">{u.emoji}</span>
                                <p className="text-sm font-semibold text-[var(--navy-900)] leading-tight">
                                    {u.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-[var(--slate-500)] mt-8">
                        +16 가지 더 →{" "}
                        <Link href="/blog-sms/guide" className="text-[var(--coral-500)] hover:underline font-semibold">
                            전체 22 가이드 보기
                        </Link>
                    </p>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-800)] text-white">
                <div className="ot-container text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        지금 무료로 시작
                    </h2>
                    <p className="text-base md:text-lg text-white/85 mb-10 max-w-xl mx-auto">
                        결제 정보 X · 카드 등록 X · 한도 X · 광고 X.<br />
                        1분이면 내 페이지가 발급됩니다.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/blog-sms/signup"
                            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-semibold rounded-full transition-colors shadow-lg shadow-[var(--coral-500)]/20"
                        >
                            ✨ 무료로 시작하기
                        </Link>
                        <Link
                            href="/blog-sms/login"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-full ring-1 ring-white/30 transition-colors"
                        >
                            🔑 로그인
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
