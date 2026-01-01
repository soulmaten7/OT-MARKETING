"use client";

import { motion } from "framer-motion";
import { Filter, BarChart3, Users, CheckCircle } from "lucide-react";

const steps = [
    {
        icon: Users,
        title: "1. 광고 집행 & 데이터 수집",
        desc: "귀사의 타겟 고객에게 맞춤형 광고를 노출하여 잠재 리드를 확보합니다.",
    },
    {
        icon: Filter,
        title: "2. 정밀 필터링 & 등급 분류",
        desc: "단순 신청자가 아닙니다. 관심도에 따라 A/B/C 등급으로 리드를 정밀 분류합니다.",
    },
    {
        icon: CheckCircle,
        title: "3. 실시간 리드 전달",
        desc: "검증된 '진성 리드'만을 귀사의 영업 담당자에게 실시간으로 전달합니다.",
    },
    {
        icon: BarChart3,
        title: "4. 성과 분석 및 최적화",
        desc: "전환 데이터를 기반으로 광고 효율을 지속적으로 개선하고 리포트를 제공합니다.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        단순 마케팅이 아닙니다.<br />
                        <span className="text-accent">완벽한 세일즈 엔진</span>입니다.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        불필요한 리드에 영업력을 낭비하지 마세요. <br className="hidden md:block" />
                        저희가 걸러낸 1명의 진성 고객이 100명의 단순 클릭보다 가치 있습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-border -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-card border border-border/50 rounded-2xl p-6 relative flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6 border border-blue-500/20 text-accent">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
