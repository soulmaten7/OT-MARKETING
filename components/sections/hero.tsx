"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background - Very subtle mesh */}
            <div className="absolute inset-0 -z-10 bg-white dark:bg-black">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/20 blur-[120px] rounded-full opacity-50" />
            </div>

            <div className="container px-6 md:px-12 text-center pt-20">
                <FadeIn delay={0.2} className="space-y-8 max-w-5xl mx-auto">
                    <div className="inline-flex items-center rounded-full border border-black/5 bg-white/50 px-4 py-1.5 text-sm text-foreground/80 backdrop-blur-md shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                        전환율 300% 달성 사례 확인하기
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-foreground leading-[1.05]">
                        매출로 직결되는
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">고효율 DB의</span> 기준
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                        업종을 가리지 않는 데이터 추출 기술.<br />
                        <span className="font-medium text-foreground">OT MARKETING</span>이 증명하겠습니다.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-10"
                    >
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto transition-transform hover:scale-105" asChild>
                            <Link href="#contact">
                                상담 시작하기
                            </Link>
                        </Button>
                        <Button variant="ghost" size="lg" className="h-14 px-8 text-lg rounded-full text-foreground hover:bg-black/5 w-full sm:w-auto group" asChild>
                            <Link href="#how-it-works" className="flex items-center gap-2">
                                운영 방식 보기
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </FadeIn>
            </div>
        </section>
    );
}
