"use client";

import type { Question } from "@/lib/industries";
import { QuestionImage } from "./QuestionImage";

interface QuestionScreenProps {
    question: Question;
    answer: string | string[] | undefined;
    onSelect: (value: string) => void;     // radio·select = 자동 전환
    onMultiToggle: (value: string) => void; // multi
}

export function QuestionScreen({ question, answer, onSelect, onMultiToggle }: QuestionScreenProps) {
    const isSingle = question.type === "select" || question.type === "radio";

    return (
        <div className="flex flex-col">
            {/* 이미지 영역 (50%) */}
            <div className="px-4 pb-3">
                <div className="rounded-xl overflow-hidden mx-auto" style={{ maxWidth: "260px", aspectRatio: "1 / 1" }}>
                    <QuestionImage questionId={question.id} />
                </div>
            </div>

            {/* 질문 영역 (50%) */}
            <div className="px-4 pb-4">
                <h2 className="text-white text-[17px] font-bold leading-snug mb-1">
                    {question.label}
                    {question.required && <span className="text-[var(--gold)] ml-1">*</span>}
                </h2>
                {question.type === "multi" && (
                    <p className="text-white/60 text-[11px] mb-3">복수 선택 가능 · 다음 버튼으로 진행</p>
                )}
                {isSingle && (
                    <p className="text-white/50 text-[11px] mb-3">선택 시 자동으로 다음 화면</p>
                )}

                {isSingle ? (
                    <div className="grid gap-2">
                        {question.options.map((o) => {
                            const selected = (answer as string) === o.value;
                            return (
                                <button
                                    key={o.value}
                                    type="button"
                                    onClick={() => onSelect(o.value)}
                                    aria-pressed={selected}
                                    aria-label={o.label}
                                    className={`w-full text-left px-4 py-3.5 rounded-lg border-2 transition-all duration-200 ${
                                        selected
                                            ? "bg-[var(--navy)]/40 text-white border-[var(--gold)] font-semibold"
                                            : "bg-white text-[var(--navy)] border-white hover:border-[var(--gold)]/60"
                                    }`}
                                >
                                    <span className="flex items-center gap-2 text-[15px]">
                                        {selected && (
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
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.options.map((o) => {
                            const cur = (answer as string[]) || [];
                            const checked = cur.includes(o.value);
                            return (
                                <button
                                    key={o.value}
                                    type="button"
                                    onClick={() => onMultiToggle(o.value)}
                                    aria-pressed={checked}
                                    aria-label={o.label}
                                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                        checked
                                            ? "bg-[var(--navy)]/40 text-white border-[var(--gold)] font-semibold"
                                            : "bg-white text-[var(--navy)] border-white hover:border-[var(--gold)]/60"
                                    }`}
                                >
                                    <span className="flex items-center gap-2 text-[14px]">
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
                )}
            </div>
        </div>
    );
}
