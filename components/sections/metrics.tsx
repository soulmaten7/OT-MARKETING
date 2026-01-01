"use client";

import { motion } from "framer-motion";

const metrics = [
    {
        value: "97%",
        label: "가짜 DB 필터링 비율",
        sub: "중복/결번/허위 정보 자동 차단",
    },
    {
        value: "3.5x",
        label: "평균 ROI 상승",
        sub: "기존 CPA 대비 효율 개선",
    },
    {
        value: "0건",
        label: "개인정보 이슈",
        sub: "철저한 법적 가이드라인 준수",
    },
];

export function Metrics() {
    return (
        <section id="metrics" className="py-24 bg-foreground text-background">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            숫자로 증명하는<br />
                            압도적인 퍼포먼스
                        </h2>
                        <p className="text-lg text-white/60 mb-8 max-w-md">
                            말로만 하는 보장은 의미 없습니다. <br />
                            철저하게 데이터로 검증된 결과값만 제공합니다.
                        </p>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-sm font-medium text-white/80 mb-2">💡 Why?</p>
                            <p className="text-sm text-white/60">
                                “보장/확정” 같은 자극적인 단어는 사용하지 않습니다.
                                하지만 저희와 함께한 파트너사의 <span className="text-white font-bold underline decoration-accent">재계약률은 92%</span>입니다.
                                이것이 우리가 가진 가장 강력한 증거입니다.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-3xl bg-white/5 border border-white/10 text-center ${index === 2 ? 'sm:col-span-2' : ''}`}
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight text-white">{metric.value}</div>
                                <div className="text-lg font-semibold text-white/90 mb-1">{metric.label}</div>
                                <div className="text-sm text-white/50">{metric.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
