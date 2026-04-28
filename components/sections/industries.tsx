import Link from "next/link";
import { Monitor, Smartphone, TrendingUp, ShieldCheck, Home, Stethoscope, ArrowRight } from "lucide-react";

const industries = [
    {
        name: "정수기·렌탈",
        icon: Smartphone,
        desc: "렌탈 가전 · 생활 소비재",
        law: "표시광고법 · 할부거래법"
    },
    {
        name: "인터넷·통신·휴대폰",
        icon: Monitor,
        desc: "초고속 인터넷 · IPTV · 휴대폰 (MNP·신규·기변) · 결합 상품",
        law: "전기통신사업법 · 표시광고법"
    },
    {
        name: "부동산·분양",
        icon: Home,
        desc: "아파트 분양 · 청약 상담 · 상가 투자",
        law: "공인중개사법 · 부동산광고 표시법"
    },
    {
        name: "주식·투자",
        icon: TrendingUp,
        desc: "리딩 서비스 · 투자자문 · 핀테크",
        law: "자본시장법 · 유사수신행위 규제법"
    },
    {
        name: "병의원",
        icon: Stethoscope,
        desc: "피부·성형·한의원 · 의료광고법 대응",
        law: "의료법 §56 (사전심의 필수)"
    },
    {
        name: "개인회생·법률",
        icon: ShieldCheck,
        desc: "채무 조정 · 법원 회생 · 신용 회복",
        law: "변호사법 §24의2 · 광고규정 §3·§4"
    },
];

export function Industries() {
    return (
        <section id="industries" className="py-24 md:py-32 bg-white border-t border-gray-100">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="eyebrow mb-4">INDUSTRIES</div>
                    <h2
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.3]"
                        style={{ textWrap: "balance" }}
                    >
                        업종별 <span className="text-[var(--gold)]">법규 가이드 시트</span> 시스템
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        업종 특성·법적 규제·고객 심리에 맞춰
                        <br className="hidden md:block" />
                        시안·스크립트·고지 문구·금지 표현까지 업종별로 시트화·자동 검증됩니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {industries.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-7 border border-gray-200 hover:border-[var(--gold)] transition-colors rounded-md"
                        >
                            <div className="w-12 h-12 rounded-md bg-[var(--gold-10)] flex items-center justify-center mb-5 text-[var(--gold)]">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-xl text-[var(--navy)] font-bold mb-2">
                                {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                {item.desc}
                            </p>
                            <div className="pt-3 border-t border-gray-100 text-xs text-[var(--gold-dark)] font-semibold">
                                ⚖ 적용 법률: {item.law}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 기타 업종 안내 — 배너 */}
                <div className="mt-10 max-w-5xl mx-auto">
                    <div className="bg-[var(--gold-10)] border border-[var(--gold)]/40 rounded-md px-6 py-6 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <p className="text-sm md:text-base text-[var(--navy)] leading-relaxed">
                            이 외에도 <strong className="text-[var(--gold-dark)]">다양한 업종</strong> DB 수집 가능합니다.
                            <br className="md:hidden" />
                            <span className="text-gray-600 md:ml-2">신규 업종은 진입 시 법규 가이드 시트 작성 후 운영 시작.</span>
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-[var(--navy-80)] text-white px-5 py-2.5 rounded text-sm font-bold transition-colors whitespace-nowrap"
                        >
                            업종 문의
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
