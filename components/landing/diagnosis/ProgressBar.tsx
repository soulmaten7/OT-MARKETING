"use client";

interface ProgressBarProps {
    currentIndex: number; // 0-based
    total: number;
    label?: string;
}

export function ProgressBar({ currentIndex, total, label }: ProgressBarProps) {
    return (
        <div className="px-4 pt-2 pb-3">
            <div className="flex items-center gap-1.5 mb-2">
                {Array.from({ length: total }, (_, i) => (
                    <div
                        key={i}
                        className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                            i <= currentIndex ? "bg-[var(--gold)]" : "bg-white/15"
                        }`}
                        aria-hidden="true"
                    />
                ))}
            </div>
            <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/60 font-medium tracking-wide">
                    {currentIndex + 1}/{total}
                    {label ? ` · ${label}` : ""}
                </span>
                <span className="text-[var(--gold)] font-bold">
                    {Math.round(((currentIndex + 1) / total) * 100)}%
                </span>
            </div>
        </div>
    );
}
