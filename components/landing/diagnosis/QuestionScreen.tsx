"use client";

import type { Question } from "@/lib/industries";

interface QuestionScreenProps {
    question: Question;
    answer: string | string[] | undefined;
    onSelect: (value: string) => void;     // radio·select = 자동 전환
    onMultiToggle: (value: string) => void; // multi
}

export function QuestionScreen({ question, answer, onSelect, onMultiToggle }: QuestionScreenProps) {
    const isSingle = question.type === "select" || question.type === "radio";

    return (
        <div className="flex flex-col px-4 pt-6 pb-4">
            {/* 질문 영역 (30%) */}
            <div className="mb-6">
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-tight">
                    {question.label}
                    {question.required && <span className="text-[var(--gold)] ml-1">*</span>}
                </h2>
                {question.type === "multi" && (
                    <p className="text-white/60 text-[12px] font-medium mt-2">복수 선택 가능 · 다음 버튼으로 진행</p>
                )}
                {isSingle && (
                    <p className="text-white/55 text-[12px] font-medium mt-2">선택 시 자동으로 다음 화면</p>
                )}
            </div>

            {/* 옵션 영역 (50%) */}
            <div className="flex flex-col gap-2.5">
                {question.options.map((o) => {
                    if (isSingle) {
                        const selected = (answer as string) === o.value;
                        return (
                            <button
                                key={o.value}
                                type="button"
                                onClick={() => onSelect(o.value)}
                                aria-pressed={selected}
                                aria-label={o.label}
                                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] min-h-[60px] flex items-center ${
                                    selected
                                        ? "bg-[var(--navy)]/40 text-white border-[var(--gold)]"
                                        : "bg-white text-[var(--navy)] border-white hover:bg-[#7DD3C0]/20 hover:border-[#7DD3C0]"
                                }`}
                            >
                                <span className="flex items-center gap-2.5 text-[18px] font-semibold leading-snug">
                                    {selected && (
                                        <svg className="w-5 h-5 text-[var(--gold)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                    {o.label}
                                </span>
                            </button>
                        );
                    }

                    const cur = (answer as string[]) || [];
                    const checked = cur.includes(o.value);
                    return (
                        <button
                            key={o.value}
                            type="button"
                            onClick={() => onMultiToggle(o.value)}
                            aria-pressed={checked}
                            aria-label={o.label}
                            className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] min-h-[60px] flex items-center ${
                                checked
                                    ? "bg-[var(--navy)]/40 text-white border-[var(--gold)]"
                                    : "bg-white text-[var(--navy)] border-white hover:bg-[#7DD3C0]/20 hover:border-[#7DD3C0]"
                            }`}
                        >
                            <span className="flex items-center gap-2.5 text-[18px] font-semibold leading-snug">
                                {checked && (
                                    <svg className="w-5 h-5 text-[var(--gold)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {o.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
