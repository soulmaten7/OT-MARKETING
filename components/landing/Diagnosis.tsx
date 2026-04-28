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
        <section className="py-12 md:py-20 bg-[var(--navy)]">
            <div className="ot-container max-w-2xl">
                <div className="flex gap-2 mb-4">
                    {Array.from({ length: progressSteps }, (_, i) => i + 1).map((s) => (
                        <div
                            key={s}
                            className={`flex-1 h-1.5 rounded ${
                                step >= s ? "bg-[var(--gold)]" : "bg-white/15"
                            }`}
                        />
                    ))}
                </div>
                <div className="text-center text-xs text-white/60 mb-6">{stepLabels[step - 1]}</div>

                <div className="bg-white p-6 md:p-10 rounded-md text-gray-900 space-y-6">
                    {stepQuestions.map((q) => (
                        <div key={q.id}>
                            <label className="block text-sm font-bold mb-2 text-[var(--navy)]">
                                {q.label}
                                {q.required && <span className="text-red-600 ml-1">*</span>}
                            </label>
                            {q.type === "select" && (
                                <select
                                    value={(answers[q.id] as string) || ""}
                                    onChange={(e) => setAnswer(q.id, e.target.value)}
                                    required={q.required}
                                    className="w-full px-4 py-3 border border-gray-300 rounded text-base bg-white"
                                >
                                    <option value="" disabled>
                                        선택해 주세요
                                    </option>
                                    {q.options.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {q.type === "radio" && (
                                <div className="space-y-2">
                                    {q.options.map((o) => (
                                        <label
                                            key={o.value}
                                            className="flex items-center gap-2 cursor-pointer p-2 border border-gray-200 rounded hover:border-[var(--gold)]"
                                        >
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={o.value}
                                                checked={(answers[q.id] as string) === o.value}
                                                onChange={() => setAnswer(q.id, o.value)}
                                                required={q.required}
                                                className="w-4 h-4"
                                            />
                                            <span>{o.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            {q.type === "multi" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {q.options.map((o) => {
                                        const cur = (answers[q.id] as string[]) || [];
                                        const checked = cur.includes(o.value);
                                        return (
                                            <label
                                                key={o.value}
                                                className={`flex items-center gap-2 cursor-pointer p-2 border rounded ${
                                                    checked
                                                        ? "border-[var(--gold)] bg-[var(--gold)]/10"
                                                        : "border-gray-200 hover:border-[var(--gold)]"
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => toggleMulti(q.id, o.value)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm">{o.label}</span>
                                            </label>
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
                                className="px-6 py-3 border border-gray-300 rounded font-bold"
                            >
                                이전
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!canNext()}
                            className="flex-1 bg-[var(--gold)] hover:bg-[var(--gold-dark)] disabled:bg-gray-300 text-[var(--navy)] font-bold py-3 rounded transition-colors"
                        >
                            {step < progressSteps - 1 ? "다음" : "결과 보기"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
