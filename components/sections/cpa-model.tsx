import Link from "next/link";
import { ArrowRight, Receipt, Coins, Check } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const models = [
    {
        title: "모델 A — 1차콜 미포함",
        subtitle: "DB 만 전달 · 광고주 인하우스 콜팀 운영",
        priceLabel: "유효 DB 1건 기준 정산",
        bullets: [
            "업종별 자가진단 + 등급·유형 + 연락처 풀 데이터",
            "구글시트 + 텔레그램 동시 전달",
            "광고주 콜팀이 직접 1차 응대",
            "콜팀 운영 가능한 중·대형 사업장 적합",
        ],
    },
    {
        title: "모델 B — 자체 CRM 콜센터 (1차콜 포함)",
        subtitle: "OT 자체 콜센터 직접 운영 · 외주 X · 유효 상담 1건 = 미팅 약속까지",
        priceLabel: "미팅 확정 1건 기준 정산",
        bullets: [
            "OT 자체 CRM 콜센터에서 직접 1차콜 운영 (외주 실행사 X)",
            "광고주가 콜 스크립트 제공 또는 핵심 응대 내용 전달",
            "실수요 검증 + 미팅 일정 확정",
            "확정된 검증 건만 광고주에게 전달",
            "1인·소형 사업자 적합",
        ],
    },
];

export function CpaModel() {
    return (
        <section id="cpa-model" className="py-24 md:py-32 bg-white">
            <div className="ot-container">
                <FadeInUp className="text-center max-w-3xl mx-auto mb-12">
                    <div className="eyebrow mb-4">CPA SETTLEMENT</div>
                    <h2
                        className="font-display text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.25]"
                        style={{ textWrap: "balance" }}
                    >
                        CPA 정산 모델 <span className="text-gradient-coral font-semibold">2가지 + 결제 옵션</span>
                    </h2>
                    <p className="text-base md:text-lg text-[var(--slate-600)] leading-relaxed">
                        광고주 비즈니스 모델에 맞는 정산 방식 선택.
                        <br className="hidden md:block" />
                        결제는 세금계산서·코인 모두 가능합니다.
                    </p>
                </FadeInUp>

                {/* Model A · B — 동일 디자인 (대등 선상) */}
                <StaggerContainer
                    stagger={0.12}
                    delayChildren={0.1}
                    className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10"
                >
                    {models.map((m, idx) => (
                        <StaggerItem key={idx}>
                            <div className="bg-white border border-[var(--slate-200)] shadow-md rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
                                <h3 className="text-xl md:text-2xl text-[var(--navy)] font-bold mb-1">
                                    {m.title}
                                </h3>
                                <p className="text-sm text-[var(--slate-500)] mb-6">{m.subtitle}</p>

                                <div className="text-base font-bold text-[var(--navy)] mb-6 pb-4 border-b border-[var(--slate-100)]">
                                    {m.priceLabel}
                                </div>

                                <ul className="space-y-3">
                                    {m.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--slate-700)]">
                                            <Check className="w-4 h-4 text-[var(--coral-500)] flex-shrink-0 mt-0.5" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* 결제 옵션 */}
                <FadeInUp delay={0.3} className="max-w-5xl mx-auto bg-[var(--slate-50)] rounded-xl p-6 md:p-8 mb-6">
                    <div className="text-xs font-bold text-[var(--coral-500)] tracking-widest mb-4">
                        PAYMENT OPTIONS · 결제 옵션
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--coral-50)] flex items-center justify-center flex-shrink-0">
                                <Receipt className="w-5 h-5 text-[var(--coral-500)]" />
                            </div>
                            <div>
                                <strong className="block text-[var(--navy)] mb-0.5">세금계산서 발행 가능</strong>
                                <span className="text-sm text-[var(--slate-600)]">법인·사업자 광고주 표준. 부가세 포함 견적 발행.</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--coral-50)] flex items-center justify-center flex-shrink-0">
                                <Coins className="w-5 h-5 text-[var(--coral-500)]" />
                            </div>
                            <div>
                                <strong className="block text-[var(--navy)] mb-0.5">코인 결제 가능</strong>
                                <span className="text-sm text-[var(--slate-600)]">
                                    USDT·BTC·ETH 등. <strong>코인 결제 시 세금계산서 발행 불가.</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </FadeInUp>

                {/* 안내 문구 */}
                <FadeInUp delay={0.4} className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-[var(--slate-600)] leading-relaxed">
                        ※ <strong className="text-[var(--navy)]">최종 단가 · 정산 주기 · 결제 조건은 모두 계약 단계에서 광고주와 직접 조율</strong>해 확정합니다.<br />
                        (업종 · 물량 · 기간 · 1차콜 포함 여부에 따라 변동)
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white px-6 py-3 rounded-md text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        >
                            모델 상담 받기
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </FadeInUp>
            </div>
        </section>
    );
}
