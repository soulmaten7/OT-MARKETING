"use client";

/**
 * STEP_37 — OQPS (One Question Per Screen) Diagnosis
 *
 * 9 화면 1 질문 + 상단 50% 이미지 + 자동 전환.
 * - radio·select: 클릭 즉시 다음 화면
 * - multi: 다음 버튼 클릭 필요
 * - 진행 바: 9 단계 도트
 * - 슬라이드 애니메이션: Framer Motion
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question, AnswerMap } from "@/lib/industries";
import { QuestionScreen } from "./diagnosis/QuestionScreen";
import { ProgressBar } from "./diagnosis/ProgressBar";

interface DiagnosisProps {
    questions: Question[];
    onComplete: (answers: AnswerMap) => void;
}

// 9 질문 short 라벨 (진행 바 우측)
const QUESTION_SHORT_LABELS: Record<string, string> = {
    debt: "채무 총액",
    debt_types: "채무 종류",
    overdue: "연체 기간",
    income: "소득 형태",
    job: "직업 형태",
    family: "부양 가족",
    collection: "추심 진행",
    assets: "보유 자산",
    history: "이력",
};

const TRANSITION_MS = 300;

export function Diagnosis({ questions, onComplete }: DiagnosisProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [direction, setDirection] = useState<"next" | "prev">("next");
    const [isCompleting, setIsCompleting] = useState(false);

    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIndex];

    const shortLabel = useMemo(
        () => QUESTION_SHORT_LABELS[currentQuestion?.id ?? ""] ?? "",
        [currentQuestion?.id]
    );

    function advanceTo(nextIndex: number, finalAnswers: AnswerMap) {
        if (nextIndex >= totalQuestions) {
            // 완료
            setIsCompleting(true);
            setTimeout(() => {
                onComplete(finalAnswers);
            }, 600);
            return;
        }
        setCurrentIndex(nextIndex);
    }

    function handleSingleSelect(value: string) {
        if (!currentQuestion) return;
        const next: AnswerMap = { ...answers, [currentQuestion.id]: value };
        setAnswers(next);
        setDirection("next");
        // 짧은 딜레이로 사용자가 선택을 인지한 후 전환
        setTimeout(() => advanceTo(currentIndex + 1, next), TRANSITION_MS);
    }

    function handleMultiToggle(value: string) {
        if (!currentQuestion) return;
        setAnswers((prev) => {
            const cur = (prev[currentQuestion.id] as string[]) || [];
            const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
            return { ...prev, [currentQuestion.id]: next };
        });
        // multi: 자동 전환 X — 다음 버튼 필요
    }

    function canNext(): boolean {
        if (!currentQuestion?.required) return true;
        const val = answers[currentQuestion.id];
        if (currentQuestion.type === "multi") {
            return Array.isArray(val) && val.length > 0;
        }
        return !!val;
    }

    function handleNext() {
        if (!canNext()) return;
        setDirection("next");
        advanceTo(currentIndex + 1, answers);
    }

    function handlePrev() {
        if (currentIndex === 0) return;
        setDirection("prev");
        setCurrentIndex(currentIndex - 1);
    }

    if (!currentQuestion) {
        return null;
    }

    const isMulti = currentQuestion.type === "multi";

    return (
        <section className="bg-[var(--navy)] py-4 md:py-6 min-h-[600px]" data-testid="diagnosis-oqps">
            <div className="ot-container max-w-[465px] mx-auto">
                {/* 진행 바 */}
                <ProgressBar
                    currentIndex={currentIndex}
                    total={totalQuestions}
                    label={shortLabel}
                />

                {/* 슬라이드 영역 */}
                <div className="relative overflow-hidden" style={{ minHeight: "520px" }}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentQuestion.id}
                            custom={direction}
                            initial={{ x: direction === "next" ? 80 : -80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction === "next" ? -80 : 80, opacity: 0 }}
                            transition={{ duration: TRANSITION_MS / 1000, ease: "easeOut" }}
                            data-testid={`question-screen-${currentQuestion.id}`}
                        >
                            <QuestionScreen
                                question={currentQuestion}
                                answer={answers[currentQuestion.id]}
                                onSelect={handleSingleSelect}
                                onMultiToggle={handleMultiToggle}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 하단 네비 — multi 만 다음 버튼 */}
                <div className="px-4 mt-2 pb-2">
                    <div className="flex items-center gap-2">
                        {currentIndex > 0 && (
                            <button
                                type="button"
                                onClick={handlePrev}
                                aria-label="이전 질문으로"
                                className="px-4 py-2.5 border border-white/30 hover:border-white/60 text-white/80 hover:text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                ← 이전
                            </button>
                        )}
                        {isMulti && (
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!canNext()}
                                aria-label={currentIndex === totalQuestions - 1 ? "결과 확인" : "다음 질문으로"}
                                data-testid="next-button"
                                className="flex-1 bg-[var(--gold)] hover:bg-[var(--gold-dark)] disabled:bg-white/20 disabled:text-white/40 text-[var(--navy)] font-bold py-3 rounded-lg transition-colors"
                            >
                                {currentIndex === totalQuestions - 1 ? "결과 확인하기" : "다음"}
                            </button>
                        )}
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
