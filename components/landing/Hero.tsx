"use client";

interface HeroProps {
    title: string;
    industryName: string;
}

export function Hero({ title, industryName }: HeroProps) {
    // STEP_55 — Hero CTA 클릭 시 자가진단 영역 부드럽게 진입 + 첫 옵션 focus
    function handleStartCta() {
        const target = document.querySelector<HTMLElement>('[data-testid="diagnosis-oqps"]');
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => {
                const firstOption = target.querySelector<HTMLButtonElement>("button");
                firstOption?.focus({ preventScroll: true });
            }, 700);
        }
    }

    return (
        <section className="relative bg-[var(--navy)] text-white overflow-hidden">
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,165,114,0.18), transparent 70%)",
                }}
            />
            <div className="ot-container relative pt-10 sm:pt-14 pb-6 sm:pb-8 text-center">
                <div className="mb-3">
                    <span className="inline-flex items-center px-5 py-2 rounded-full bg-[var(--gold)] text-[var(--navy)] text-base sm:text-lg font-bold tracking-wider">
                        {industryName}
                    </span>
                </div>
                <h1
                    className="font-serif text-2xl sm:text-3xl leading-[1.35] text-white"
                    style={{ textWrap: "balance" }}
                >
                    {title}
                </h1>
                {/* STEP_55 — Hero CTA: 클릭 시 자가진단 영역 자동 진입 + 첫 옵션 focus */}
                <button
                    type="button"
                    onClick={handleStartCta}
                    data-testid="hero-cta-start"
                    className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--gold)] text-[var(--navy)] text-sm sm:text-base font-bold shadow-lg hover:scale-[1.03] active:scale-95 transition-transform"
                >
                    1분 자가진단 시작
                    <span aria-hidden="true">→</span>
                </button>
            </div>
        </section>
    );
}
