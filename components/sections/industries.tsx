"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Wifi, Droplets, TrendingUp, ShieldCheck, Building2, Stethoscope, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const industries = [
    {
        icon: Wifi,
        name: "인터넷/통신 DB",
        desc: "3사 개통, 알뜰폰, 결합상품 리드",
    },
    {
        icon: Droplets,
        name: "정수기/렌탈 DB",
        desc: "브랜드별 렌탈 신청 및 상담",
    },
    {
        icon: TrendingUp,
        name: "주식/코인/투자 DB",
        desc: "전문가 리딩방, 종목 추천 DB",
    },
    {
        icon: ShieldCheck,
        name: "개인회생/채무 DB",
        desc: "신용회복, 파산 면책 상담",
    },
    {
        icon: Building2,
        name: "부동산/분양 DB",
        desc: "아파트, 오피스텔 분양 관심고객",
    },
    {
        icon: Stethoscope,
        name: "병의원 DB",
        desc: "임플란트, 성형, 다이어트 상담",
    },
];

export function Industries() {
    return (
        <section id="industries" className="py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            어떤 업종이든<br />
                            <span className="text-accent">확장 가능한 엔진</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            단순 마케팅이 아닙니다.<br />
                            귀사의 비즈니스에 맞는 최적의 DB를 추출합니다.
                        </p>
                    </div>
                    <Link href="#contact" className="hidden md:flex items-center text-primary font-semibold hover:text-accent transition-colors group">
                        내 업종 문의하기 <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {industries.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative overflow-hidden p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all hover:shadow-lg min-h-[200px] flex flex-col justify-between"
                        >
                            {/* Placeholder for Industry Image - Overlay style */}
                            <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 z-0" />

                            <div className="relative z-10 flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/50 backdrop-blur-md rounded-xl border border-white/20 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2 text-card-foreground group-hover:text-accent transition-colors">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col justify-center items-center p-6 rounded-2xl border border-dashed border-border bg-transparent text-center"
                    >
                        <div className="p-3 bg-secondary rounded-full mb-4">
                            <MoreHorizontal className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-muted-foreground">기타 전문 서비스 DB</h3>
                        <p className="text-xs text-muted-foreground mt-1">상담이 필요한 모든 업종 가능</p>
                    </motion.div>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="#contact" className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors group">
                        내 업종 문의하기 <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
