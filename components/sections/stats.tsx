import { CountUpInView, FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface Stat {
    label: string;
    sublabel?: string;
    counter: { end: number; suffix?: string; prefix?: string } | null;
    bigText?: string; // counter 대신 큰 텍스트 (예: "1조")
    bigTextDisplay?: boolean; // bigText 를 Cormorant + Coral gradient 로
    suffix?: string;
}

const stats: Stat[] = [
    {
        label: "운영 업종",
        sublabel: "INDUSTRIES",
        counter: { end: 6, suffix: "" },
        suffix: "업종",
    },
    {
        label: "광고주 명의 분리",
        sublabel: "BRAND ISOLATION",
        counter: { end: 100, suffix: "%" },
    },
    {
        label: "Long-term Goal",
        sublabel: "ONE TRILLION VISION",
        counter: null,
        bigText: "1조",
        bigTextDisplay: true,
    },
    {
        label: "카톡 즉시 상담",
        sublabel: "OPEN CHAT 24h",
        counter: { end: 24, suffix: "h" },
    },
];

export function Stats() {
    return (
        <section className="py-20 md:py-28 bg-[var(--slate-50)]">
            <div className="ot-container">
                <FadeInUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <div className="eyebrow mb-4">BY THE NUMBERS</div>
                    <h2
                        className="font-display text-3xl md:text-5xl text-[var(--navy)] leading-[1.25]"
                        style={{ textWrap: "balance" }}
                    >
                        숫자로 보는 <span className="text-gradient-coral font-semibold">OT MARKETING</span>
                    </h2>
                </FadeInUp>

                <StaggerContainer
                    stagger={0.1}
                    delayChildren={0.1}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                >
                    {stats.map((stat, idx) => (
                        <StaggerItem key={idx}>
                            <div className="text-center px-2">
                                <div className="text-[10px] md:text-xs tracking-widest text-[var(--coral-500)] font-bold mb-3">
                                    {stat.sublabel}
                                </div>

                                {stat.counter ? (
                                    <div className="font-display text-5xl md:text-7xl font-semibold text-gradient leading-none mb-3">
                                        {stat.counter.prefix ?? ""}
                                        <CountUpInView
                                            end={stat.counter.end}
                                            suffix={stat.counter.suffix ?? ""}
                                            duration={1.6}
                                        />
                                    </div>
                                ) : stat.bigTextDisplay ? (
                                    <div className="font-display text-5xl md:text-7xl font-semibold text-gradient-coral leading-none mb-3">
                                        {stat.bigText}
                                    </div>
                                ) : (
                                    <div className="font-display text-5xl md:text-7xl font-semibold text-[var(--navy)] leading-none mb-3">
                                        {stat.bigText}
                                    </div>
                                )}

                                {stat.suffix && (
                                    <div className="text-sm text-[var(--slate-500)] mb-1.5">
                                        {stat.suffix}
                                    </div>
                                )}
                                <div className="text-sm md:text-base text-[var(--slate-700)] font-semibold">
                                    {stat.label}
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeInUp delay={0.6} className="text-center mt-12 md:mt-16">
                    <p className="text-xs md:text-sm text-[var(--slate-500)] max-w-2xl mx-auto leading-relaxed">
                        ※ &ldquo;1조&rdquo; 는 OT MARKETING (One Trillion) 의 장기 비전입니다.
                        한국 DB 제공 시장 → 랜딩 구독 SaaS → 글로벌 확장으로 이어지는 단계별 로드맵.
                    </p>
                </FadeInUp>
            </div>
        </section>
    );
}
