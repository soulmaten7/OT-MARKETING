import type { Metadata } from "next";
import { PreRegisterForm } from "@/components/blog-sms/PreRegisterForm";

export const metadata: Metadata = {
    title: "구독형 랜딩페이지 — OTMarketing (곧 출시)",
    description:
        "14 업종 풀 사이즈 랜딩페이지를 코드 없이 1분 만에. 결제·예약·CRM 자동화 통합. 곧 출시 — 1순위 알림 받기.",
    openGraph: {
        title: "OTMarketing 구독형 랜딩페이지 — 곧 출시",
        description:
            "블로그문자보다 더 강력한 풀 사이즈 랜딩페이지. 14 업종 템플릿 + 결제·예약·CRM 통합. 사전 등록 1순위 알림.",
        type: "website",
    },
};

const VALUE_PROPS = [
    {
        title: "14 업종 풀 사이즈 템플릿",
        body: "예약·부동산·법률·세무·보험·과외·헬스·미용·청소·인테리어 등 즉시 사용 가능한 풀 사이즈 랜딩.",
    },
    {
        title: "결제·예약·CRM 통합",
        body: "토스페이·카카오페이·네이버 예약·시트·CRM 자동 연동. 코드 0줄.",
    },
    {
        title: "OT 광고 인프라 연결",
        body: "OT Marketing CPA 광고 인프라와 1-click 연결. 출시 기념 무료 노출 옵션.",
    },
    {
        title: "Pixel·gtag 자동 박힘",
        body: "Meta Pixel · Google Ads · 카카오 픽셀 자동 박힘. 측정·리타겟팅 즉시.",
    },
    {
        title: "변호사법·자본시장법 안전 zone",
        body: "업종별 광고법 안전 표현 자동 검수. 위반 표현 0건 보장.",
    },
    {
        title: "A/B 테스트 + 분석 대시보드",
        body: "헤드라인·이미지·CTA 자동 A/B. CTR·CVR·CPL 실시간 대시보드.",
    },
];

export default function LandingPagesIntro() {
    return (
        <div className="bg-white text-[var(--slate-900)]">
            {/* Hero — 화이트 배경 + 텍스트 포인트 (사장 5/6 진단 = 가독성 우선) */}
            <section className="bg-white text-[var(--navy-900)] pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="ot-container">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--gold-50)] rounded-full text-sm font-bold mb-6 ring-1 ring-[var(--gold-500)]/40 text-[var(--gold-600)]">
                            <span className="w-2 h-2 bg-[var(--gold-500)] rounded-full"></span>
                            곧 출시 · 구독형 랜딩페이지
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-[var(--navy-900)]">
                            진짜 매출을 만드는<br />
                            <span className="text-[var(--gold-600)]">풀 사이즈 랜딩페이지</span>.
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--slate-700)] leading-relaxed mb-10 max-w-2xl">
                            14 업종 템플릿 · 결제·예약·CRM 자동화 · OT 광고 인프라 통합.<br />
                            코드 0 줄. 1분 셋업.
                        </p>
                        <a
                            href="#pre-register"
                            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-[var(--navy-900)] font-bold rounded-full transition-colors shadow-lg shadow-[var(--gold-500)]/20"
                        >
                            1순위 알림 신청 →
                        </a>
                    </div>
                </div>
            </section>

            {/* 6 Value props */}
            <section className="py-16 md:py-24 bg-[var(--slate-50)]">
                <div className="ot-container">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-12 text-center">
                        왜 구독형 랜딩페이지인가
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {VALUE_PROPS.map((v) => (
                            <div
                                key={v.title}
                                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm"
                            >
                                <h3 className="font-bold text-xl text-[var(--navy-900)] mb-3">
                                    {v.title}
                                </h3>
                                <p className="text-[var(--slate-700)] leading-relaxed">{v.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pre-register form */}
            <section id="pre-register" className="py-16 md:py-24 bg-white">
                <div className="ot-container max-w-2xl">
                    <header className="text-center mb-10">
                        <span className="inline-block px-3 py-1 bg-[var(--gold-50)] text-[var(--gold-600)] text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                            1순위 알림
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-4">
                            먼저 받으세요
                        </h2>
                        <p className="text-base md:text-lg text-[var(--slate-700)]">
                            이메일을 남겨주시면 출시일·얼리버드 가격·런칭 자료를 1순위로 보내드립니다.
                        </p>
                    </header>

                    <div className="bg-[var(--slate-50)] rounded-2xl border border-slate-200 p-8 md:p-10">
                        <PreRegisterForm />
                    </div>

                    <p className="text-center text-sm text-[var(--slate-500)] mt-6">
                        결제·신용카드 정보 X · 출시 알림 외에는 이메일을 보내지 않습니다.
                    </p>
                </div>
            </section>

            {/* Bridge — already using 블로그문자? */}
            <section className="py-16 md:py-20 bg-[var(--slate-50)] border-t border-slate-200">
                <div className="ot-container max-w-3xl text-center">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--navy-900)] mb-4">
                        지금 당장 시작하고 싶다면
                    </h2>
                    <p className="text-base text-[var(--slate-700)] mb-8">
                        먼저 무료 <strong>블로그문자</strong>로 SMS 답신 채널을 운영하세요.<br />
                        랜딩페이지 출시 시 1순위 알림 + 데이터 자동 마이그레이션.
                    </p>
                    <a
                        href="/blog-sms"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-[var(--navy-900)] font-semibold rounded-full ring-1 ring-slate-300 hover:ring-[var(--navy-900)] transition-colors"
                    >
                        블로그문자 무료로 시작 →
                    </a>
                </div>
            </section>
        </div>
    );
}
