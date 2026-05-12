"use client";

/**
 * STEP_57 — 1 화면 3 문항 (옛 STEP_42 1 화면 1 문항 → 3 step)
 *
 * 9 문항 = 3 step 으로 분할:
 *   Step 1 = Q1·Q2·Q3 (채무 상황)
 *   Step 2 = Q4·Q5·Q6 (소득·직업·가족)
 *   Step 3 = Q7·Q8·Q9 (추심·자산·이력)
 *   Step 4 = ContactForm (개인정보 = onComplete 콜백 후 부모가 렌더링)
 *
 * 사용자 = "끝 3 단계만" 인식 → 완료율 ↑
 *
 * Custom events 매핑 (STEP_55 합치):
 *   - currentStep === 0 (mount) = DiagnosisStart
 *   - currentStep === 1 = DiagnosisStep2
 *   - currentStep === 2 = DiagnosisStep3
 *   - DiagnosisStep4 = ContactForm.tsx (부모) 가 fire
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question, AnswerMap } from "@/lib/industries";
import { MultiQuestionScreen } from "./diagnosis/MultiQuestionScreen";
import { ProgressBar } from "./diagnosis/ProgressBar";
import { trackCustom } from "@/lib/fbq";
import { trackGoogleAdsEvent } from "@/lib/gtag";

interface DiagnosisProps {
    questions: Question[];
    onComplete: (answers: AnswerMap) => void;
}

const STEP_LABELS = ["채무 상황", "소득·직업·가족", "추심·자산·이력"];
const TRANSITION_MS = 280;

export function Diagnosis({ questions, onComplete }: DiagnosisProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [direction, setDirection] = useState<"next" | "prev">("next");
    const [isCompleting, setIsCompleting] = useState(false);

    // 9 문항 → 3 step 분할 (각 3 문항)
    const stepQuestions = useMemo(
        () => [
            questions.slice(0, 3),
            questions.slice(3, 6),
            questions.slice(6, 9),
        ],
        [questions]
    );

    const totalSteps = stepQuestions.length;
    const currentQuestions = stepQuestions[currentStep] ?? [];

    // STEP_55 — 단계별 Meta Pixel custom events (중복 fire 방지 ref)
    const firedSteps = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (currentStep === 0 && !firedSteps.current.has("start")) {
            trackCustom("DiagnosisStart", { total_steps: totalSteps });
            trackGoogleAdsEvent("diagnosis_start", { total_steps: totalSteps });
            firedSteps.current.add("start");
        } else if (currentStep === 1 && !firedSteps.current.has("step2")) {
            trackCustom("DiagnosisStep2", { step: currentStep });
            trackGoogleAdsEvent("diagnosis_step2", { step: currentStep });
            firedSteps.current.add("step2");
        } else if (currentStep === 2 && !firedSteps.current.has("step3")) {
            trackCustom("DiagnosisStep3", { step: currentStep });
            trackGoogleAdsEvent("diagnosis_step3", { step: currentStep });
            firedSteps.current.add("step3");
        }
    }, [currentStep, totalSteps]);

    function handleSingleSelect(questionId: string, value: string) {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    }

    function handleMultiToggle(questionId: string, value: string) {
        setAnswers((prev) => {
            const cur = (prev[questionId] as string[]) || [];
            const next = cur.includes(value)
                ? cur.filter((v) => v !== value)
                : [...cur, value];
            return { ...prev, [questionId]: next };
        });
    }

    // 현재 step 의 3 문항 모두 답변 됐는지 검증
    function isStepValid(): boolean {
        return currentQuestions.every((q) => {
            if (!q.required) return true;
            const val = answers[q.id];
            if (q.type === "multi") {
                return Array.isArray(val) && val.length > 0;
            }
            return val !== undefined && val !== "";
        });
    }

    function handleNext() {
        if (!isStepValid()) return;
        const nextStep = currentStep + 1;
        if (nextStep >= totalSteps) {
            // 마지막 step 완료 → ContactForm (Step 4) 으로 진행
            setIsCompleting(true);
            setTimeout(() => onComplete(answers), 600);
            return;
        }
        setDirection("next");
        setCurrentStep(nextStep);
    }

    function handlePrev() {
        if (currentStep === 0) return;
        setDirection("prev");
        setCurrentStep(currentStep - 1);
    }

    if (currentQuestions.length === 0) return null;

    return (
        <section
            className="bg-[var(--navy)] py-4 md:py-6 min-h-[600px]"
            data-testid="diagnosis-oqps"
        >
            <div className="ot-container max-w-[465px] mx-auto">
                {/* 진행 바 — STEP_57 = 3 step 기준 */}
                <ProgressBar
                    currentIndex={currentStep}
                    total={totalSteps}
                    label={STEP_LABELS[currentStep]}
                />

                {/* 슬라이드 영역 */}
                <div className="relative overflow-hidden" style={{ minHeight: "440px" }}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`step-${currentStep}`}
                            custom={direction}
                            initial={{ x: direction === "next" ? 60 : -60, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction === "next" ? -60 : 60, opacity: 0 }}
                            transition={{ duration: TRANSITION_MS / 1000, ease: "easeOut" }}
                            data-testid={`step-screen-${currentStep + 1}`}
                        >
                            <MultiQuestionScreen
                                questions={currentQuestions}
                                answers={answers}
                                onSelect={handleSingleSelect}
                                onMultiToggle={handleMultiToggle}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 하단 네비 — 항상 다음 버튼 노출 (3 문항 검증 통과 시 enable) */}
                <div className="px-4 mt-3 pb-4">
                    <div className="flex items-center gap-2">
                        {currentStep > 0 && (
                            <button
                                type="button"
                                onClick={handlePrev}
                                aria-label="이전 단계로"
                                className="px-4 py-3 border border-white/30 hover:border-white/60 text-white/80 hover:text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                ← 이전
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            aria-label={
                                currentStep === totalSteps - 1 ? "결과 확인" : "다음 단계로"
                            }
                            data-testid="next-button"
                            className="flex-1 bg-[var(--gold)] hover:bg-[var(--gold-dark)] disabled:bg-white/20 disabled:text-white/40 text-[var(--navy)] font-bold py-3.5 rounded-lg transition-colors"
                        >
                            {currentStep === totalSteps - 1 ? "결과 확인하기" : "다음 단계"}
                        </button>
                    </div>
                </div>

                {/* 완료 로딩 */}
                {isCompleting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-[var(--navy)]/95 flex items-center justify-center z-50"
                        data-testid="completing-overlay"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-white text-base font-semibold">결과 분석 중...</p>
                            <p className="text-white/60 text-xs mt-1">9 응답 종합 + 등급 산출</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
