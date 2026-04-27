const steps = [
    {
        num: "Step 1",
        title: "상담 · CPA 모델 합의",
        desc: "업종·사무소 규모·예상 물량 검토 후 모델 A (1차콜 미포함) / 모델 B (1차콜 포함) 선택. 단가·정산 주기·결제 조건 협의.",
    },
    {
        num: "Step 2",
        title: "광고주 정보 6 항목 받음",
        desc: "회사명·법인명·사업자번호·광고책임 변호사·전화·푸터 안내문 — 5분 내 광고주 명의로 자동 변경 (광고주가 추가로 할 일 없음).",
    },
    {
        num: "Step 3",
        title: "다매체 광고 송출",
        desc: "Meta · Google · 당근 · Naver · 카카오 모먼트 — 광고주 업종·예산에 맞춰 적합 매체 운영. 매체별 카피·이미지·CTA 별도 제작.",
    },
    {
        num: "Step 4",
        title: "9문항 자가진단 → A/B/C 등급 분기",
        desc: "랜딩 클릭 후 신청자 9문항 답변 → 점수 자동 계산 → 등급 분류. A (즉시 콜) / B (검토 후) / C (다른 절차 안내) 자동 처리.",
    },
    {
        num: "Step 5",
        title: "시트 + 텔레그램 동시 알림",
        desc: "17 컬럼 구글 시트 자동 기록 + 광고주·OT 폰에 텔레그램 동시 발송 (병렬). 골든타임 (5분 이내) 콜 가능.",
    },
    {
        num: "Step 6",
        title: "1차콜 (옵션) · 변호사 전달 · 정산",
        desc: "모델 A 면 광고주 콜팀이 직접, 모델 B 면 OT 측이 1차콜 응대 후 미팅 확정 건만 변호사에게 전달. 합의된 주기로 정산.",
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
                        광고 → 변호사까지의 <span className="text-[var(--gold)]">6단계 자동화</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        광고주가 신경 쓸 일은 Step 1·Step 2 두 단계.
                        <br className="hidden md:block" />
                        나머지 Step 3 ~ 6 은 OT 시스템이 자동으로 처리합니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
