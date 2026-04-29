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
        desc: "렌탈 가전 · 생활 소비재",
        law: "표시광고법 · 할부거래법",
    },
    {
        name: "인터넷·통신·휴대폰",
        icon: Monitor,
        desc: "초고속 인터넷 · IPTV · 휴대폰 (MNP·신규·기변) · 결합 상품",
        law: "전기통신사업법 · 표시광고법",
    },
    {
        name: "부동산·분양",
        icon: Home,
        desc: "아파트 분양 · 청약 상담 · 상가 투자",
        law: "공인중개사법 · 부동산광고 표시법",
    },
    {
        name: "주식·투자",
        icon: TrendingUp,
        desc: "리딩 서비스 · 투자자문 · 핀테크",
        law: "자본시장법 · 유사수신행위 규제법",
    },
    {
        name: "병의원",
        icon: Stethoscope,
        desc: "피부·성형·한의원 · 의료광고법 대응",
        law: "의료법 §56 (사전심의 필수)",
    },
    {
        name: "개인회생·법률",
        icon: ShieldCheck,
        desc: "채무 조정 · 법원 회생 · 신용 회복",
        law: "변호사법 §24의2 · 광고규정 §3·§4",
    },
];

export function Industries() {
    return (
        <section id="industries" className="py-24 md:py-32 bg-white border-t border-[var(--slate-100)] lg:min-h-[85vh] lg:flex lg:items-center">
            <div className="ot-container">
                <FadeInUp className="text-center max-w-3xl mx-auto mb-16">
                    <div className="eyebrow mb-4">INDUSTRIES</div>
                    <h2
                        className="font-display text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.25]"
                        style={{ textWrap: "balance" }}
                    >
                        업종별 <span className="text-gradient-coral font-semibold">법규 가이드 시트</span> 시스템
                    </h2>
                    <p className="text-base md:text-lg text-[var(--slate-600)] leading-relaxed">
                        업종 특성·법적 규제·고객 심리에 맞춰
                        <br className="hidden md:block" />
                        랜딩·스크립트·고지 문구·금지 표현까지 업종별로 시트화·자동 검증됩니다.
                    </p>
                </FadeInUp>

                <StaggerContainer
                    stagger={0.08}
                    delayChildren={0.1}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
                >
                    {industries.map((item, idx) => (
                        <StaggerItem key={idx}>
                            <div className="group relative bg-white p-7 border border-[var(--slate-200)] hover:border-[var(--coral-400)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl h-full">
                                {/* Coral 좌측 hover 강조 라인 */}
                                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[var(--coral-500)] rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="w-12 h-12 rounded-lg bg-[var(--coral-50)] flex items-center justify-center mb-5 text-[var(--coral-500)]">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl text-[var(--navy)] font-bold mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-[var(--slate-600)] leading-relaxed mb-3">
                                    {item.desc}
                                </p>
                                <div className="pt-3 border-t border-[var(--slate-100)] text-xs text-[var(--coral-600)] font-semibold">
                                    ⚖ 적용 법률: {item.law}
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* 기타 업종 안내 — 배너 */}
                <FadeInUp delay={0.4} className="mt-10 max-w-5xl mx-auto">
                    <div className="bg-[var(--slate-50)] border border-[var(--slate-200)] rounded-xl px-6 py-6 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <p className="text-sm md:text-base text-[var(--navy)] leading-relaxed">
                            이 외에도 <strong className="text-[var(--coral-600)]">다양한 업종</strong> DB 수집 가능합니다.
                            <br className="md:hidden" />
                            <span className="text-[var(--slate-600)] md:ml-2">신규 업종은 진입 시 법규 가이드 시트 작성 후 운영 시작.</span>
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
