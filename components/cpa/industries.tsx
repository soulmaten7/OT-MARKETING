import Link from "next/link";
import {
    Monitor,
    Smartphone,
    TrendingUp,
    ShieldCheck,
    Home,
    Stethoscope,
    ArrowRight,
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const industries = [
    {
        name: "정수기·렌탈",
        icon: Smartphone,
        law: "표시광고법 §3 · 할부거래법",
        forbidden: '"업계 최저가" · "100% 정수"',
        penalty: "시정명령 + 과태료",
    },
    {
        name: "인터넷·통신·휴대폰",
        icon: Monitor,
        law: "전기통신사업법 · 표시광고법",
        forbidden: '"공짜" · "0원" · "최고 속도 보장"',
        penalty: "시정명령 + 과태료 (반복 시 영업정지)",
    },
    {
        name: "부동산·분양",
        icon: Home,
        law: "공인중개사법 · 부동산광고 표시법",
        forbidden: '"확정 분양가" · "투자 수익 보장"',
        penalty: "자격 취소 / 1년 이하 징역",
    },
    {
        name: "주식·투자",
        icon: TrendingUp,
        law: "자본시장법 · 유사수신행위 규제법",
        forbidden: '"원금 보장" · "확정 수익"',
        penalty: "무인가 영업 5년 이하 / 유사수신 5년 이하 징역",
    },
    {
        name: "병의원",
        icon: Stethoscope,
        law: "의료법 §56 (사전심의 필수)",
        forbidden: '"최고 의료" · 환자 후기 사진',
        penalty: "1년 이하 징역 또는 1천만원 이하 벌금",
    },
    {
        name: "개인회생·법률",
        icon: ShieldCheck,
        law: "변호사법 §24의2 · 광고규정 §3·§4",
        forbidden: '"100% 면책" · "확실한 면책"',
        penalty: "1억원 이하 과태료 + 협회 징계 + 형사 송치",
    },
];

export function Industries() {
    return (
        <section
            id="guardrail"
            className="py-24 md:py-32 bg-white border-t border-[var(--slate-100)] lg:min-h-[85vh] lg:flex lg:items-center"
        >
            <div className="ot-container">
                <FadeInUp className="text-center max-w-3xl mx-auto mb-16">
                    <div className="eyebrow mb-4">INDUSTRY GUARDRAIL</div>
                    <h2
                        className="font-display text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.25]"
                        style={{ textWrap: "balance" }}
                    >
                        업종별 <span className="text-gradient-coral font-semibold">법규 가드레일</span>
                    </h2>
                    <p className="text-base md:text-lg text-[var(--slate-600)] leading-relaxed">
                        6 업종마다 적용 법령·금지 표현·위반 시 처벌까지
                        <br className="hidden md:block" />
                        OT 가 사전 검증·차단합니다.
                    </p>
                </FadeInUp>

                <StaggerContainer
                    stagger={0.08}
                    delayChildren={0.1}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
                >
                    {industries.map((item, idx) => (
                        <StaggerItem key={idx}>
                            <div className="group relative bg-white p-6 md:p-7 border border-[var(--slate-200)] hover:border-[var(--coral-400)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl h-full flex flex-col">
                                {/* Coral 좌측 hover 강조 라인 */}
                                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[var(--coral-500)] rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-lg bg-[var(--coral-50)] flex items-center justify-center text-[var(--coral-500)]">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg md:text-xl text-[var(--navy)] font-bold">
                                        {item.name}
                                    </h3>
                                </div>

                                <div className="space-y-3 text-sm flex-1">
                                    <div>
                                        <div className="text-[10px] tracking-widest text-[var(--slate-500)] font-bold mb-1">
                                            적용 법령
                                        </div>
                                        <p className="text-[var(--slate-700)] leading-relaxed">
                                            ⚖ {item.law}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="text-[10px] tracking-widest text-red-700 font-bold mb-1">
                                            금지 표현
                                        </div>
                                        <p className="text-[var(--coral-600)] font-semibold leading-relaxed">
                                            {item.forbidden}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="text-[10px] tracking-widest text-amber-700 font-bold mb-1">
                                            위반 시 처벌
                                        </div>
                                        <p className="text-[var(--slate-700)] leading-relaxed">
                                            {item.penalty}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* 기타 업종 안내 — 배너 */}
                <FadeInUp delay={0.4} className="mt-10 max-w-6xl mx-auto">
                    <div className="bg-[var(--slate-50)] border border-[var(--slate-200)] rounded-xl px-6 py-6 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <p className="text-sm md:text-base text-[var(--navy)] leading-relaxed">
                            이 외에도 <strong className="text-[var(--coral-600)]">다양한 업종</strong> DB 수집 가능합니다.
                            <br className="md:hidden" />
                            <span className="text-[var(--slate-600)] md:ml-2">
                                신규 업종은 진입 시 법규 가이드 시트 작성 후 운영 시작.
                            </span>
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-[var(--navy-800)] text-white px-5 py-2.5 rounded-md text-sm font-bold transition-colors whitespace-nowrap"
                        >
                            업종 문의
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </FadeInUp>
            </div>
        </section>
    );
}
