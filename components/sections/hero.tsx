import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative bg-[var(--navy)] text-white overflow-hidden">
            {/* Subtle golden radial light */}
            <div className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(197,165,114,0.18), transparent 70%)"
                }}
            />

            <div className="ot-container relative py-28 md:py-36 pt-36 md:pt-44">
                <div className="max-w-3xl mx-auto text-center">
                    <h1
                        className="font-serif text-4xl md:text-6xl leading-[1.3] mb-8 text-white"
                        style={{ textWrap: "balance" }}
                    >
                        검증된 방식으로{" "}
                        <span className="text-[var(--gold)]">운영하는</span>{" "}
                        CPA 캠페인
                    </h1>

                    <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto mb-12">
                        업종 전문가가 설계한 랜딩 자산 · 상담 스크립트 · 표준계약서.
                        <br className="hidden md:block" />
                        기획 단계를 건너뛰고 실행 단계에서 바로 시작하세요.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/#contact"
                            className="w-full sm:w-auto bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--navy)] font-bold px-8 py-4 rounded text-base transition-colors"
                        >
                            상담 신청하기
                        </Link>
                        <Link
                            href="/showcase"
                            className="w-full sm:w-auto border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/10 font-bold px-8 py-4 rounded text-base transition-colors inline-flex items-center justify-center gap-2 group"
                        >
                            랜딩 시안 미리보기
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
                        <span>✓ 업종별 맞춤 랜딩 자산</span>
                        <span>✓ 법적 컴플라이언스 검증</span>
                        <span>✓ 투명한 정산 구조</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
