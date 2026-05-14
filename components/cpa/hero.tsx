"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, ShieldCheck, Layers, Lock, Database } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, WordStagger } from "@/components/ui/motion";

const pills = [
    { icon: ShieldCheck, label: "6 업종 법규 가드레일 내장" },
    { icon: Layers, label: "A · B · C 등급 자동 분기" },
    { icon: Lock, label: "광고주 명의 100% 분리" },
    { icon: Database, label: "업종별 풀 데이터 시트" },
];

export function Hero() {
    return (
        <section className="relative hero-gradient-bg text-[var(--navy-900)] overflow-hidden lg:min-h-screen lg:flex lg:items-center">
            {/* Dot pattern overlay — 화이트 톤 (옅은 Navy 도트) */}
            <div className="absolute inset-0 dot-pattern-light opacity-70 pointer-events-none" />

            {/* Subtle coral glow — 위쪽 ellipse */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,0.10), transparent 70%)",
                }}
            />

            {/* Subtle navy glow — 아래쪽 ellipse (깊이감) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(15,30,61,0.06), transparent 70%)",
                }}
            />

            <div className="ot-container relative py-28 md:py-36 pt-36 md:pt-44">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Headline — WordStagger */}
                    <h1
                        className="font-display text-4xl md:text-6xl leading-[1.2] mb-8 text-[var(--navy-900)]"
                        style={{ textWrap: "balance" }}
                    >
                        <WordStagger
                            text="광고가 끝나는 자리까지"
                            className="block"
                            delay={0.1}
                            stagger={0.08}
                        />
                        <span className="block mt-2">
                            <WordStagger
                                text="책임지는 CPA 인프라"
                                wordClassName="text-gradient-coral font-semibold"
                                delay={0.4}
                                stagger={0.08}
                            />
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <FadeIn delay={0.7}>
                        <p className="text-lg md:text-xl text-[var(--slate-700)] leading-relaxed max-w-2xl mx-auto mb-10">
                            DB 단순 전달이 아닌 업종별 자가진단 + 등급·유형 분기 + 1차콜까지.
                            <br className="hidden md:block" />
                            Meta · Google · 당근 · Naver · 카카오 모먼트 다매체 운영.
                        </p>
                    </FadeIn>

                    {/* 4 차별점 pills — StaggerContainer (화이트 톤 박스) */}
                    <StaggerContainer
                        stagger={0.08}
                        delayChildren={0.9}
                        className="flex flex-wrap justify-center gap-2 mb-12"
                    >
                        {pills.map(({ icon: Icon, label }) => (
                            <StaggerItem key={label}>
                                <span className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 text-[var(--navy-900)]/85 text-xs px-3 py-1.5 rounded-full shadow-sm">
                                    <Icon className="w-3.5 h-3.5 text-[var(--coral-500)]" />
                                    {label}
                                </span>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* CTAs */}
                    <FadeIn delay={1.2}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/#contact"
                                className="w-full sm:w-auto bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-bold px-8 py-4 rounded-md text-base transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md shadow-[var(--coral-500)]/20"
                            >
                                광고주 상담 신청
                            </Link>
                            <Link
                                href="/ads"
                                className="w-full sm:w-auto border border-slate-300 hover:border-[var(--navy-900)] text-[var(--navy-900)] hover:bg-white font-bold px-8 py-4 rounded-md text-base transition-colors inline-flex items-center justify-center gap-2 group bg-white/60 backdrop-blur-sm"
                            >
                                광고 크리에이티브 6 매체 보기
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>

                {/* Scroll down — clickable, smooth scroll to next section */}
                <motion.a
                    href="#what-we-bring"
                    aria-label="다음 섹션으로 이동"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    className="group absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-[var(--navy-900)]/70 hover:bg-white hover:border-[var(--coral-500)] hover:text-[var(--coral-500)] hover:scale-110 transition-all duration-300 shadow-sm"
                >
                    <ChevronDown className="w-7 h-7 animate-bounce-down" strokeWidth={2.5} />
                </motion.a>
            </div>
        </section>
    );
}
