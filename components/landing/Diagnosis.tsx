"use client";

import { useState } from "react";
import type { Question, AnswerMap } from "@/lib/industries";

interface DiagnosisProps {
    questions: Question[];
    progressSteps: number;
    stepLabels: string[];
    onComplete: (answers: AnswerMap) => void;
}

export function Diagnosis({ questions, progressSteps, stepLabels, onComplete }: DiagnosisProps) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<AnswerMap>({});

    function setAnswer(id: string, value: string | string[]) {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    }

    function toggleMulti(id: string, value: string) {
        setAnswers((prev) => {
            const cur = (prev[id] as string[]) || [];
            const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
            return { ...prev, [id]: next };
        });
    }

    const stepQuestions = questions.filter((q) => q.step === step);

    function canNext(): boolean {
        for (const q of stepQuestions) {
            if (!q.required) continue;
            const val = answers[q.id];
            if (q.type === "multi") {
                if (!Array.isArray(val) || val.length === 0) return false;
            } else {
                if (!val || (typeof val === "string" && !val)) return false;
            }
        }
        return true;
    }

    function handleNext() {
        if (step < progressSteps - 1) {
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onComplete(answers);
        }
    }

    return (
        <section className="pt-2 pb-10 md:pt-3 md:pb-16 bg-[var(--navy)]">
            <div className="ot-container max-w-2xl">
                <div className="flex gap-2 mb-3">
                    {Array.from({ length: progressSteps }, (_, i) => i + 1).map((s) => (
                        <div
                            key={s}
                            className={`flex-1 h-1.5 rounded ${
                                step >= s ? "bg-[var(--gold)]" : "bg-white/15"
                            }`}
                        />
                    ))}
                </div>
                <div className="text-center text-xs text-white/60 mb-4">{stepLabels[step - 1]}</div>

                <div className="space-y-6">
                    {stepQuestions.map((q) => (
                        <div key={q.id}>
                            <label className="block text-sm font-bold mb-3 text-white">
                                {q.label}
                                {q.required && <span className="text-[var(--gold)] ml-1">*</span>}
                            </label>
                            {(q.type === "select" || q.type === "radio") && (
                                <div className="grid gap-2">
                                    {q.options.map((o) => {
                                        const selected = (answers[q.id] as string) === o.value;
                                        return (
                                            <button
                                                key={o.value}
                                                type="button"
                                                onClick={() => setAnswer(q.id, o.value)}
                                                aria-pressed={selected}
                                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                                    selected
                                                        ? "bg-[var(--navy)] text-white border-[var(--gold)] font-semibold shadow-lg"
                                                        : "bg-white text-[var(--navy)] border-slate-200 hover:border-slate-400"
                                                }`}
                                            >
                                                <span className="flex items-center gap-2 text-base">
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
                            )}
                            {q.type === "multi" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {q.options.map((o) => {
                                        const cur = (answers[q.id] as string[]) || [];
                                        const checked = cur.includes(o.value);
                                        return (
                                            <button
                                                key={o.value}
                                                type="button"
                                                onClick={() => toggleMulti(q.id, o.value)}
                                                aria-pressed={checked}
                                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                                    checked
                                                        ? "bg-[var(--navy)] text-white border-[var(--gold)] font-semibold shadow-lg"
                                                        : "bg-white text-[var(--navy)] border-slate-200 hover:border-slate-400"
                                                }`}
                                            >
                                                <span className="flex items-center gap-2 text-sm">
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
                    ))}

                    <div className="flex gap-3 pt-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-3 border border-white/30 hover:border-white/60 text-white/80 hover:text-white rounded font-bold transition-colors"
                            >
                                이전
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!canNext()}
                            className="flex-1 bg-[var(--gold)] hover:bg-[var(--gold-dark)] disabled:bg-white/20 disabled:text-white/40 text-[var(--navy)] font-bold py-3 rounded transition-colors"
                        >
                            {step < progressSteps - 1 ? "다음" : "신청하기"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
