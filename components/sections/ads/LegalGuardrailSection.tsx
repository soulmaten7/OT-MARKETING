"use client";
import { ShieldCheck } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const legalGuardrails = [
    { industry: "개인회생", law: "변호사법 §24의2 · §7의2 · §117 / 광고규정 §3·§4", focus: "전문 표기 · 의뢰인 후기 · 효과 보장 표현 금지" },
    { industry: "렌탈",     law: "표시광고법 §3",                                     focus: "할부 조건·총액 명시 의무" },
    { industry: "통신",     law: "전기통신사업법",                                    focus: "요금·약정·결합 조건 명시" },
    { industry: "리딩",     law: "자본시장법 §174",                                   focus: "수익률 보장·원금 보장 절대 금지" },
    { industry: "부동산",   law: "공인중개사법",                                      focus: "공인중개사 자격 표기 의무" },
    { industry: "병의원",   law: "의료법 §56",                                        focus: "전문 표기·환자 후기·치료 효과 보장 금지" },
];

export function LegalGuardrailSection() {
    return (
        <section className="py-20 md:py-28 bg-[var(--navy)] text-white">
            <div className="ot-container max-w-6xl mx-auto">
                <FadeInUp className="text-center max-w-3xl mx-auto mb-12">
                    <div className="text-[var(--coral-400)] text-xs tracking-widest font-bold mb-4">
                        LEGAL GUARDRAIL
                    </div>
                    <h2 className="font-display text-2xl md:text-4xl mb-4 leading-[1.3] text-white">
                        업종별 법규 가드레일
                        <span className="text-gradient-coral font-semibold"> 먼저 정리</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed">
                        OT MARKETING 은 광고를 굴리기 전에 업종별 법규부터 정리합니다.
                        <br className="hidden md:block" />
                        사용 가능 표현 / 금지 표현 / 등록 자격 / 의무 표기 모두 시트화 후 광고 카피 자동 검증.
                    </p>
                </FadeInUp>

                <StaggerContainer
                    stagger={0.08}
                    delayChildren={0.1}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {legalGuardrails.map((g) => (
                        <StaggerItem key={g.industry}>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-[var(--coral-400)] transition-colors h-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <ShieldCheck className="w-5 h-5 text-[var(--coral-400)] flex-shrink-0" />
                                    <h3 className="font-bold text-base">{g.industry}</h3>
                                </div>
                                <div className="text-xs text-[var(--coral-400)] font-mono mb-2 leading-relaxed">
                                    {g.law}
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    {g.focus}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <p className="mt-10 text-center text-xs text-white/50">
                    위반 카피 1건도 안 나옴 → 광고주 법적 리스크 차단
                </p>
            </div>
        </section>
    );
}
