import { Monitor, Smartphone, TrendingUp, ShieldCheck, Home, Stethoscope } from "lucide-react";

const industries = [
    { name: "개인회생·법률", icon: ShieldCheck, desc: "채무 조정 · 법원 회생 · 신용 회복" },
    { name: "주식·투자", icon: TrendingUp, desc: "리딩 서비스 · 투자자문 · 핀테크" },
    { name: "부동산·분양", icon: Home, desc: "아파트 분양 · 청약 상담 · 상가 투자" },
    { name: "정수기·렌탈", icon: Smartphone, desc: "렌탈 가전 · 생활 소비재" },
    { name: "인터넷·통신", icon: Monitor, desc: "초고속 인터넷 · IPTV · 결합 상품" },
    { name: "병의원", icon: Stethoscope, desc: "피부·성형·한의원 · 의료광고법 대응" },
];

export function Industries() {
    return (
        <section id="industries" className="py-24 md:py-32 bg-white border-t border-gray-100">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="eyebrow mb-4">INDUSTRIES</div>
                    <h2 className="font-serif text-4xl md:text-5xl text-[var(--navy)] mb-6">
                        6 업종 전문 운영
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        각 업종 특성·법적 규제·고객 심리에 맞춰
                        <br className="hidden md:block" />
                        시안·스크립트·고지 문구까지 업종별로 준비되어 있습니다.
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
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
