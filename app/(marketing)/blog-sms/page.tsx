import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "OTMarketing 블로그문자 — 무료 문자 답신 SaaS",
    description:
        "블로그·인스타·명함에 문자 버튼 박는 가장 빠른 방법. 회원가입 1분, 평생 무료, 비공개 번호 옵션, OG 이미지 자동 생성.",
    openGraph: {
        title: "OTMarketing 블로그문자 — 무료 문자 답신 SaaS",
        description: "블로그·인스타·명함에 문자 버튼 박는 가장 빠른 방법. 평생 무료.",
        type: "website",
    },
};

const FEATURES = [
    {
        title: "평생 무료",
        body: "회원가입·페이지 생성·SMS 링크 발급 모두 0원. 결제 정보 입력 X.",
    },
    {
        title: "1분 셋업",
        body: "이메일·아이디·휴대폰만 입력하면 곧바로 ot-marketing.kr/blog-sms/내아이디 발급.",
    },
    {
        title: "14 업종 템플릿",
        body: "예약·부동산·법률·세무·보험·과외·헬스·미용·청소·인테리어 등 즉시 사용 메시지 박힘.",
    },
    {
        title: "비공개 번호",
        body: "번호 노출 없이 문자 답신을 받고 싶다면 비공개 옵션 1 클릭.",
    },
    {
        title: "OG 이미지 자동",
        body: "카톡·페이스북에 링크 붙여넣을 때 미리보기 카드 자동 생성. 직접 업로드도 가능.",
    },
    {
        title: "방문·클릭 통계",
        body: "내 페이지가 몇 번 열렸고 SMS 버튼이 몇 번 눌렸는지 즉시 확인.",
    },
];

const STEPS = [
    { n: "01", title: "회원가입", body: "이메일·아이디 4~20자·휴대폰 한 번만 입력." },
    { n: "02", title: "업종 선택", body: "14 업종 템플릿 중 1 개 선택. 메시지·제목 즉시 채움." },
    { n: "03", title: "링크 공유", body: "ot-marketing.kr/blog-sms/내아이디 를 블로그·SNS 에 박기." },
    { n: "04", title: "문자 받기", body: "방문자가 버튼 누르면 본인 SMS 앱 자동 호출 → 미리채워진 메시지." },
];

export default function BlogSmsLanding() {
    return (
        <div className="bg-white text-[var(--slate-900)]">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--navy-900)] text-white pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="ot-container">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6 ring-1 ring-white/20">
                            <span className="w-2 h-2 bg-[var(--coral-400)] rounded-full"></span>
                            평생 무료 · OTMarketing 블로그문자
                        </span>
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
                                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-semibold rounded-full transition-colors"
                            >
                                무료로 시작하기 →
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

            {/* 6 Features */}
            <section className="py-16 md:py-24 bg-[var(--slate-50)]">
                <div className="ot-container">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-12 text-center">
                        왜 블로그문자인가
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((f) => (
                            <div
                                key={f.title}
                                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm"
                            >
                                <h3 className="font-bold text-xl text-[var(--navy-900)] mb-3">
                                    {f.title}
                                </h3>
                                <p className="text-[var(--slate-700)] leading-relaxed">{f.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4 Step process */}
            <section className="py-16 md:py-24 bg-white">
                <div className="ot-container">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-12 text-center">
                        4단계로 시작
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map((s) => (
                            <div
                                key={s.n}
                                className="border border-slate-200 rounded-2xl p-7 hover:border-[var(--coral-400)] transition-colors"
                            >
                                <div className="text-4xl font-bold text-[var(--coral-500)] mb-3">
                                    {s.n}
                                </div>
                                <h3 className="font-bold text-lg text-[var(--navy-900)] mb-2">
                                    {s.title}
                                </h3>
                                <p className="text-[var(--slate-700)] text-sm leading-relaxed">
                                    {s.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upsell — Phase 3 사전 등록 */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-[var(--navy-900)] to-[var(--gold-600)] text-white">
                <div className="ot-container text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        곧 출시 — 셀프 랜딩페이지
                    </h2>
                    <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
                        블로그문자보다 더 강력한 풀 사이즈 랜딩페이지로 진짜 고객을 모으세요. 사전 등록자에게 출시 시 1순위 알림.
                    </p>
                    <Link
                        href="/blog-sms/landing-pre-register"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--navy-900)] font-bold rounded-full hover:bg-[var(--gold-50)] transition-colors"
                    >
                        사전 등록하기 →
                    </Link>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="ot-container text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-6">
                        지금 무료로 시작
                    </h2>
                    <p className="text-lg text-[var(--slate-700)] mb-10 max-w-xl mx-auto">
                        결제 정보 X · 카드 등록 X · 한도 X. 1분이면 내 페이지가 발급됩니다.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/blog-sms/signup"
                            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-semibold rounded-full transition-colors"
                        >
                            회원가입 →
                        </Link>
                        <Link
                            href="/blog-sms/login"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--navy-900)] font-semibold rounded-full ring-1 ring-slate-300 hover:ring-[var(--navy-900)] transition-colors"
                        >
                            로그인
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
