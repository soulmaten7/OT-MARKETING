import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const steps = [
    {
        num: "01",
        title: "상담 · CPA 모델 합의",
        desc: "업종·사업장 규모·예상 물량 검토 후 모델 A (1차콜 미포함) / 모델 B (1차콜 포함) 선택. 단가·정산 주기·결제 조건 협의.",
    },
    {
        num: "02",
        title: "광고주 정보 6 항목 받음",
        desc: "상호·사업자번호·광고책임자·전화·연락 채널·푸터 의무 표기 사항 — 5분 내 광고주 명의로 자동 변경 (광고주가 추가로 할 일 없음).",
    },
    {
        num: "03",
        title: "다매체 광고 송출",
        desc: "Meta · Google · 당근 · Naver · 카카오 모먼트 — 광고주 업종·예산에 맞춰 적합 매체 운영. 매체별 카피·이미지·CTA 별도 제작.",
    },
    {
        num: "04",
        title: "업종별 자가진단 → 등급 / 유형 분기",
        desc: "랜딩 클릭 후 신청자 답변 → 점수·조건 자동 계산 → 등급 또는 가입 유형 분류. (개인회생 = A/B/C / 핸드폰 = MNP·신규·기변·MVNO / 그 외 업종도 동일 패턴).",
    },
    {
        num: "05",
        title: "시트 + 텔레그램 동시 알림",
        desc: "업종별 풀 데이터 구글 시트 자동 기록 + 광고주·OT 폰에 텔레그램 동시 발송 (병렬). 골든타임 (5분 이내) 콜 가능.",
    },
    {
        num: "06",
        title: "1차콜 (옵션) · 광고주 전달 · 정산",
        desc: "모델 A 면 광고주 콜팀이 직접, 모델 B 면 OT 측이 1차콜 응대 후 검증 확정 건만 광고주에게 전달. 합의된 주기로 정산.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-[var(--slate-50)] lg:min-h-[70vh] lg:flex lg:items-center">
            <div className="ot-container">
                <FadeInUp className="text-center max-w-3xl mx-auto mb-16">
                    <div className="eyebrow mb-4">PROCESS</div>
                    <h2
                        className="font-display text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.25]"
                        style={{ textWrap: "balance" }}
                    >
                        광고 → 정산까지의 <span className="text-gradient-coral font-semibold">6단계 자동화</span>
                    </h2>
                    <p className="text-base md:text-lg text-[var(--slate-600)] leading-relaxed">
                        광고주가 신경 쓸 일은 Step 1·Step 2 두 단계.
                        <br className="hidden md:block" />
                        나머지 Step 3 ~ 6 은 OT 시스템이 자동으로 처리합니다.
                    </p>
                </FadeInUp>

                <StaggerContainer
                    stagger={0.08}
                    delayChildren={0.1}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    {steps.map((step, i) => (
                        <StaggerItem key={i}>
                            <div className="group relative bg-white border border-[var(--slate-200)] rounded-xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--coral-400)]">
                                {/* connector — 카드 사이 가로 라인 (lg 데스크탑 6 카드 일렬일 때만 의미. md 2열 / lg 3열 기본 → 시각 connector 는 카드 안 좌측에 짧게) */}
                                <div className="absolute left-0 top-7 w-1 h-12 bg-gradient-to-b from-[var(--coral-500)] to-transparent rounded-r opacity-50 group-hover:opacity-100 transition-opacity" />

                                <div className="font-display text-5xl md:text-6xl font-semibold text-gradient-coral leading-none mb-3">
                                    {step.num}
                                </div>
                                <h3 className="text-lg md:text-xl text-[var(--navy)] font-bold mb-3 leading-snug">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-[var(--slate-600)] leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
