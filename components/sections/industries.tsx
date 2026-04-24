"use client";

import { StaggerContainer, StaggerItem } from "@/components/animations/stagger";
import { FadeIn } from "@/components/animations/fade-in";
import { Monitor, Smartphone, TrendingUp, ShieldCheck, Home, MoreHorizontal } from "lucide-react";

const industries = [
    { name: "인터넷/통신 DB", icon: Monitor, desc: "초고속 인터넷, IPTV 가입 유치" },
    { name: "정수기/렌탈 DB", icon: Smartphone, desc: "브랜드 정수기, 생활가전 렌탈" },
    { name: "주식/투자 DB", icon: TrendingUp, desc: "실시간 리딩방, 투자 자문" },
    { name: "개인회생/파산 DB", icon: ShieldCheck, desc: "법률 상담, 신용 회복" },
    { name: "부동산/분양 DB", icon: Home, desc: "아파트 분양, 상가 투자" },
    { name: "기타 전문 DB", icon: MoreHorizontal, desc: "병의원, 교육, 법률 등 맞춤형" },
];

export function Industries() {
    return (
        <section id="industries" className="py-32 bg-secondary/30 relative overflow-hidden">
            <div className="container px-6 md:px-12">
                <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
                        어떤 비즈니스든<br />
                        <span className="text-accent">확실한 타겟</span>을 찾아냅니다.
                    </h2>
                    <p className="text-xl text-muted-foreground font-light">
                        단순 수집이 아닌, 구매 전환 가능성이 높은<br className="hidden md:block" />
                        진성 고객 데이터만을 필터링하여 제공합니다.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {industries.map((item, idx) => (
                        <StaggerItem key={idx} className="group">
                            <div className="h-full p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 tracking-tight">{item.name}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
