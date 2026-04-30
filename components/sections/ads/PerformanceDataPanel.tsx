"use client";

import { Sparkles } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

const placeholderData = [
    { label: "평균 CPA", value: "준비 중", subtext: "5/3 R&D 종료 후 공개" },
    { label: "Meta CTR", value: "—", subtext: "운영 데이터 누적 중" },
    { label: "당근 CVR", value: "—", subtext: "운영 데이터 누적 중" },
];

export function PerformanceDataPanel() {
    return (
        <StaggerContainer
            stagger={0.1}
            delayChildren={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
            {placeholderData.map((d) => (
                <StaggerItem key={d.label}>
                    <div className="bg-white border border-[var(--slate-200)] rounded-xl p-7 md:p-8 h-full flex flex-col items-center text-center hover:border-[var(--coral-400)] hover:shadow-lg transition-all duration-300">
                        <Sparkles className="w-6 h-6 text-[var(--coral-500)] mb-3" />
                        <div className="text-xs font-bold tracking-widest text-[var(--slate-500)] mb-3">
                            {d.label}
                        </div>
                        <div className="font-display text-3xl md:text-4xl text-[var(--navy)] font-semibold mb-3 leading-none">
                            {d.value}
                        </div>
                        <div className="text-xs text-[var(--slate-500)] leading-relaxed">
                            {d.subtext}
                        </div>
                    </div>
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
