const steps = [
    {
        num: "Step 1",
        title: "상담 신청·초기 진단",
        desc: "업종·타겟·예산·운영 목표를 함께 정리합니다. 무료.",
    },
    {
        num: "Step 2",
        title: "시안·스크립트 배정",
        desc: "6 시안 중 적합한 시안을 추천하고, 업종 스크립트를 광고주 브랜드로 치환합니다.",
    },
    {
        num: "Step 3",
        title: "계약·매체 셋업",
        desc: "CPA 표준계약서 체결. 메타·구글·당근 광고 계정을 연결하고 초도 예산을 분배합니다.",
    },
    {
        num: "Step 4",
        title: "운영·정산·리포트",
        desc: "DB 수집·1차콜 연결·월 정산. 매주 성과 리포트 공유 후 소재·타겟을 최적화합니다.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-[var(--secondary)]">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="eyebrow mb-4">PROCESS</div>
                    <h2 className="font-serif text-4xl md:text-5xl text-[var(--navy)] mb-6">
                        운영 절차
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        상담부터 정산까지 4 단계의 표준 프로세스.
                        <br className="hidden md:block" />
                        각 단계마다 투명한 커뮤니케이션과 리포트를 제공합니다.
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
