interface HeroProps {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
}

export function Hero({ eyebrow, title, titleHighlight, subtitle }: HeroProps) {
    return (
        <section className="relative bg-[var(--navy)] text-white overflow-hidden">
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,165,114,0.18), transparent 70%)",
                }}
            />
            <div className="ot-container relative pt-24 md:pt-32 pb-6 md:pb-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="eyebrow mb-3 text-[var(--gold)]">{eyebrow}</div>
                    <h1
                        className="font-serif text-3xl md:text-5xl leading-[1.3] mb-3 text-white"
                        style={{ textWrap: "balance" }}
                    >
                        <span className="text-[var(--gold)]">{title}</span> {titleHighlight}
                    </h1>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
}
