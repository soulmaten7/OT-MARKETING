import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

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
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
            {placeholderData.map((item) => (
                <StaggerItem key={item.label}>
                    <div className="bg-white border border-[var(--slate-200)] rounded-xl p-6 md:p-8 text-center hover:shadow-md transition-shadow">
                        <div className="text-xs font-bold tracking-widest text-[var(--coral-500)] uppercase mb-3">
                            {item.label}
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-[var(--navy)] mb-2">
                            {item.value}
                        </div>
                        <div className="text-xs text-gray-500">{item.subtext}</div>
                    </div>
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
