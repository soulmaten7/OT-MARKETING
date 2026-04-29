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
        <section className="relative hero-gradient-bg text-white overflow-hidden lg:min-h-screen lg:flex lg:items-center">
            {/* Dot pattern overlay */}
            <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />

            {/* Subtle radial light */}
            <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,0.15), transparent 70%)",
                }}
            />

            <div className="ot-container relative py-28 md:py-36 pt-36 md:pt-44">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Headline — WordStagger */}
                    <h1
                        className="font-display text-4xl md:text-6xl leading-[1.2] mb-8 text-white"
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
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
                            DB 단순 전달이 아닌 업종별 자가진단 + 등급·유형 분기 + 1차콜까지.
                            <br className="hidden md:block" />
                            Meta · Google · 당근 · Naver · 카카오 모먼트 다매체 운영.
                        </p>
                    </FadeIn>

                    {/* 4 차별점 pills — StaggerContainer */}
                    <StaggerContainer
                        stagger={0.08}
                        delayChildren={0.9}
                        className="flex flex-wrap justify-center gap-2 mb-12"
                    >
                        {pills.map(({ icon: Icon, label }) => (
                            <StaggerItem key={label}>
                                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs px-3 py-1.5 rounded-full">
                                    <Icon className="w-3.5 h-3.5 text-[var(--coral-400)]" />
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
                                className="w-full sm:w-auto bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-bold px-8 py-4 rounded-md text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
                            >
                                광고주 상담 신청
                            </Link>
                            <Link
                                href="/samples"
                                className="w-full sm:w-auto border border-white/40 hover:border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-md text-base transition-colors inline-flex items-center justify-center gap-2 group"
                            >
                                디자인 시안 6종 보기
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>

                    {/* 신뢰 시그널 */}
                    <FadeIn delay={1.4}>
                        <div className="mt-14 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/65">
                            <span>✓ 6 업종 운영 가능</span>
                            <span>✓ 광고주 명의 분리 자동</span>
                            <span>✓ 카톡 오픈채팅 즉시 상담</span>
                        </div>
                    </FadeIn>
                </div>

                {/* Scroll down arrow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
                >
                    <ChevronDown className="w-6 h-6 text-white/60 animate-bounce-down" />
                </motion.div>
            </div>
        </section>
    );
}
