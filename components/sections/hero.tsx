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
                    <div className="eyebrow mb-6">
                        2026 NEW LAUNCH · BOUTIQUE AGENCY
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl leading-[1.15] mb-8 text-white">
                        광고주 한 분씩,<br />
                        <span className="text-[var(--gold)]">대표가 직접</span> 운영합니다
                    </h1>

                    <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto mb-12">
                        6 업종 랜딩·스크립트·계약서 자산을 이미 준비해 두었습니다.
                        <br className="hidden md:block" />
                        광고주님은 광고에만 집중하세요.
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
                        <span>✓ 6 디자인 시안 제공</span>
                        <span>✓ 업종별 상담 스크립트</span>
                        <span>✓ 을(광고주) 보호 표준계약서</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
