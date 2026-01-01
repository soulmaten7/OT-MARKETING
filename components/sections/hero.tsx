"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-background to-background dark:from-blue-950/20 dark:via-background dark:to-background animate-fade-in-up" />

            <div className="container px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-950 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-50">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                        전환율 300% 달성 사례 확인하기
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                        매출로 직결되는 고효율 DB를
                        <br />
                        <span className="text-accent inline-block mt-2">‘전환’으로</span> 바꾸는 법
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        업종을 가리지 않는 성과 중심 CPA 파트너
                        <br className="hidden md:block" />
                        OT MARKETING이 증명하겠습니다.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
                            <Link href="#contact">
                                지금 상담 시작하기
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto group" asChild>
                            <Link href="#how-it-works" className="flex items-center gap-2">
                                운영 방식 보기
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
