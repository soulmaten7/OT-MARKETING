interface HeroProps {
    title: string;
    industryName: string;
}

export function Hero({ title, industryName }: HeroProps) {
    return (
        <section className="relative bg-[var(--navy)] text-white overflow-hidden">
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,165,114,0.18), transparent 70%)",
                }}
            />
            <div className="ot-container relative pt-10 sm:pt-14 pb-3 sm:pb-4 text-center">
                <p className="text-xs sm:text-sm font-medium tracking-wider text-[var(--gold)] mb-2">
                    {industryName}
                </p>
                <h1
                    className="font-serif text-2xl sm:text-3xl leading-[1.35] text-white"
                    style={{ textWrap: "balance" }}
                >
                    {title}
                </h1>
            </div>
        </section>
    );
}
