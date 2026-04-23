"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger";

const metrics = [
    { label: "월 평균 DB 추출", value: "50,000+", suffix: "건" },
    { label: "광고주 재계약률", value: "92", suffix: "%" },
    { label: "평균 ROAS 달성", value: "350", suffix: "%+" },
    { label: "검증된 업종 수", value: "30", suffix: "+개" },
];

export function Metrics() {
    return (
        <section id="metrics" className="py-32 bg-background relative border-y border-black/5 dark:border-white/5">
            <div className="container px-6 md:px-12">
                <FadeIn className="mb-20">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center">
                        숫자가 증명하는<br />
                        <span className="text-accent">압도적인 퍼포먼스</span>
                    </h2>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                    {metrics.map((metric, idx) => (
                        <StaggerItem key={idx} className="text-center">
                            <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-4">
                                {metric.value}<span className="text-3xl md:text-4xl text-muted-foreground/50 ml-1 align-top">{metric.suffix}</span>
                            </div>
                            <p className="text-lg md:text-xl font-medium text-muted-foreground">
                                {metric.label}
                            </p>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
