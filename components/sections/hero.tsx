import Link from "next/link";
import { ArrowRight, ShieldCheck, Layers, Lock, Database } from "lucide-react";

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
                        광고가 끝나는 자리까지{" "}
                        <span className="text-[var(--gold)]">책임지는</span>{" "}
                        CPA 인프라
                    </h1>

                    <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto mb-10">
                        DB 단순 전달이 아닌 9문항 등급 분기 + 1차콜까지.
                        <br className="hidden md:block" />
                        Meta · Google · 당근 · Naver · 카카오 모먼트 다매체 운영.
                    </p>

                    {/* 차별점 4 pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/15 text-white/85 text-xs px-3 py-1.5 rounded">
                            <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
                            6 업종 법규 가드레일 내장
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/15 text-white/85 text-xs px-3 py-1.5 rounded">
                            <Layers className="w-3.5 h-3.5 text-[var(--gold)]" />
                            A · B · C 등급 자동 분기
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/15 text-white/85 text-xs px-3 py-1.5 rounded">
                            <Lock className="w-3.5 h-3.5 text-[var(--gold)]" />
                            광고주 명의 100% 분리
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/15 text-white/85 text-xs px-3 py-1.5 rounded">
                            <Database className="w-3.5 h-3.5 text-[var(--gold)]" />
                            17 컬럼 풀 데이터
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/#contact"
                            className="w-full sm:w-auto bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--navy)] font-bold px-8 py-4 rounded text-base transition-colors"
                        >
                            광고주 상담 신청
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
                        <span>✓ 6 업종 운영 가능</span>
                        <span>✓ 광고주 명의 분리 자동</span>
                        <span>✓ 카톡 오픈채팅 즉시 상담</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
