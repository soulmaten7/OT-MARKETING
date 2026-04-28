interface HeroProps {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    industryName: string;
}

export function Hero({ eyebrow, title, titleHighlight, subtitle, industryName }: HeroProps) {
    return (
        <section className="relative bg-[var(--navy)] text-white overflow-hidden">
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,165,114,0.18), transparent 70%)",
                }}
            />
            <div className="ot-container relative py-20 md:py-28 pt-28 md:pt-36">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="eyebrow mb-4 text-[var(--gold)]">{eyebrow}</div>
                    <h1
                        className="font-serif text-3xl md:text-5xl leading-[1.3] mb-6 text-white"
                        style={{ textWrap: "balance" }}
                    >
                        <span className="text-[var(--gold)]">{title}</span> {titleHighlight}
                    </h1>
                    <p className="text-base md:text-lg text-white/75 leading-relaxed mb-2">
                        {subtitle}
                    </p>
                    <p className="text-xs md:text-sm text-white/50">
                        {industryName} · 자가진단 → 결과 분기 → 1:1 안내
                    </p>
                </div>
            </div>
        </section>
    );
}
