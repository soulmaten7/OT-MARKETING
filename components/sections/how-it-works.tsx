const steps = [
    {
        num: "Step 1",
        title: "상담 · 단가 합의",
        desc: "업종·타겟·예산 검토 후 CPA 단가와 유효 리드 기준을 사전 합의합니다.",
    },
    {
        num: "Step 2",
        title: "랜딩 · 광고 셋업",
        desc: "업종 맞춤 랜딩페이지를 제작하고, 메타·구글·당근 광고 계정을 연결합니다.",
    },
    {
        num: "Step 3",
        title: "DB 수집 · 검증 · 전달",
        desc: "광고 집행으로 수집된 리드를 중복·무효 필터링한 후 실시간으로 전달합니다.",
    },
    {
        num: "Step 4",
        title: "주간 리포트 · 최적화",
        desc: "성과는 Google Sheets 로 실시간 공유, 매주 요약 리포트를 발송합니다. 소재·타겟은 지속적으로 최적화합니다.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-[var(--secondary)]">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="eyebrow mb-4">PROCESS</div>
                    <h2
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.3]"
                        style={{ textWrap: "balance" }}
                    >
                        운영 프로세스
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        상담 · 단가 합의부터 DB 전달 · 주간 리포트까지 4 단계.
                        <br className="hidden md:block" />
                        각 단계는 투명한 커뮤니케이션과 리포트로 공유됩니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 rounded-md p-7 flex flex-col"
                        >
                            <div className="font-serif text-xl text-[var(--gold)] mb-2">
                                {step.num}
                            </div>
                            <h3 className="font-serif text-lg text-[var(--navy)] font-bold mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
