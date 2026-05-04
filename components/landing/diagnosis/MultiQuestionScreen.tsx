"use client";

/**
 * STEP_57 — 1 화면 3 문항 컴팩트 디자인
 * 한 step (Q1·Q2·Q3 또는 Q4·Q5·Q6 또는 Q7·Q8·Q9) 을 한 화면에 박음.
 * 사용자가 "끝 보임 = 3 단계만" 인식 → 완료율 ↑.
 */

import type { Question, AnswerMap } from "@/lib/industries";

interface MultiQuestionScreenProps {
    questions: Question[];      // 3 문항 배열
    answers: AnswerMap;
    onSelect: (questionId: string, value: string) => void;
    onMultiToggle: (questionId: string, value: string) => void;
}

export function MultiQuestionScreen({
    questions,
    answers,
    onSelect,
    onMultiToggle,
}: MultiQuestionScreenProps) {
    return (
        <div className="flex flex-col gap-4 px-4 pt-3 pb-2">
            {questions.map((q, qIdx) => {
                const isSingle = q.type === "select" || q.type === "radio";
                const answer = answers[q.id];

                return (
                    <div
                        key={q.id}
                        data-testid={`question-${q.id}`}
                        className="bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10"
                    >
                        {/* 문항 라벨 (작게, 한 줄) */}
                        <div className="flex items-baseline gap-2 mb-2.5">
                            <span className="text-[11px] text-[var(--gold)] font-bold tracking-wide flex-shrink-0">
                                Q{qIdx + 1}.
                            </span>
                            <h3 className="text-[13px] font-semibold text-white leading-snug">
                                {q.label}
                                {q.required && <span className="text-red-400 ml-1">*</span>}
                            </h3>
                        </div>
                        {q.type === "multi" && (
                            <p className="text-[10px] text-white/50 mb-2 ml-5">복수 선택 가능</p>
                        )}

                        {/* 옵션 — 컴팩트 2열 그리드 (모바일 한 화면 룰) */}
                        <div className="grid grid-cols-2 gap-1.5">
                            {q.options.map((o) => {
                                const selected = isSingle
                                    ? answer === o.value
                                    : ((answer as string[]) || []).includes(o.value);
                                return (
                                    <button
                                        key={o.value}
                                        type="button"
                                        onClick={() =>
                                            isSingle
                                                ? onSelect(q.id, o.value)
                                                : onMultiToggle(q.id, o.value)
                                        }
                                        aria-pressed={selected}
                                        aria-label={o.label}
                                        className={`text-left px-3 py-2.5 min-h-[44px] rounded-lg border-2 transition-all duration-150 active:scale-[0.97] ${
                                            selected
                                                ? "bg-[var(--navy)]/40 text-white border-[var(--gold)]"
                                                : "bg-white text-[var(--navy)] border-white hover:bg-[#7DD3C0]/15 hover:border-[#7DD3C0]"
                                        }`}
                                    >
                                        <span className="flex items-center gap-1.5 text-[12px] font-semibold leading-tight">
                                            {selected && (
                                                <svg
                                                    className="w-3.5 h-3.5 text-[var(--gold)] shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
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
            })}
        </div>
    );
}
