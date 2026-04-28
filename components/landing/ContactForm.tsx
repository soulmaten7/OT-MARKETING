"use client";

import { useState } from "react";
import type { AnswerMap } from "@/lib/industries";

interface ContactFormProps {
    mode: "showcase" | "operation";
    additionalFields: { key: string; label: string; required: boolean }[];
    sheetId: string | null;
    industryId: string;
    answers: AnswerMap;
    grade: string;
}

export function ContactForm({
    mode,
    additionalFields,
    sheetId,
    industryId,
    answers,
    grade,
}: ContactFormProps) {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const fd = new FormData(e.currentTarget);
        const personal: Record<string, string> = {};
        for (const field of additionalFields) {
            personal[field.key] = (fd.get(field.key) as string) || "";
        }
        const privacyOk = fd.get("privacy") === "on";
        const memo = (fd.get("memo") as string) || "";

        if (!privacyOk) {
            setError("개인정보 수집·이용 동의가 필요합니다.");
            setSubmitting(false);
            return;
        }

        if (mode === "showcase") {
            // 시안 모드 — 폼 제출 더미 (학습용)
            console.log("[showcase mode] form data captured (no sheet write)", {
                industryId,
                grade,
                answers,
                personal,
                memo,
            });
            await new Promise((r) => setTimeout(r, 600));
            setSubmitted(true);
            setSubmitting(false);
            return;
        }

        // 운영 모드 — Apps Script 또는 API 라우트
        try {
            const res = await fetch("/api/landing-submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    industryId,
                    sheetId,
                    grade,
                    answers,
                    personal,
                    memo,
                }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || "제출 실패");
            }
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "제출 중 오류");
        } finally {
            setSubmitting(false);
        }
    }

    if (submitted) {
        return (
            <section id="contact" className="py-12 md:py-20 bg-[var(--navy)] text-white">
                <div className="ot-container max-w-2xl">
                    <div className="bg-white p-8 md:p-12 rounded-md text-center text-gray-900">
                        <div className="w-20 h-20 rounded-full bg-[var(--gold)] text-[var(--navy)] flex items-center justify-center mx-auto mb-6 text-4xl">
                            ✓
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl text-[var(--navy)] font-bold mb-4">
                            상담 신청이 접수되었습니다
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed">
                            {mode === "showcase"
                                ? "(시안 모드 — 실제 데이터는 저장되지 않았습니다)"
                                : "전담 컨설턴트가 영업일 기준 24시간 이내 연락드립니다."}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-12 md:py-20 bg-[var(--navy)] text-white">
            <div className="ot-container max-w-2xl">
                <div className="text-center mb-8">
                    <h2 className="font-serif text-2xl md:text-4xl text-white font-bold mb-3">
                        결과 기반 1:1 상담 신청
                    </h2>
                    <p className="text-sm text-white/70">
                        아래 정보를 남겨주시면 전담 컨설턴트가 안내드립니다.
                    </p>
                </div>
                <form onSubmit={onSubmit} className="bg-white p-6 md:p-10 rounded-md text-gray-900 space-y-5">
                    {additionalFields.map((field) => (
                        <div key={field.key}>
                            <label className="block text-sm font-bold mb-2 text-[var(--navy)]">
                                {field.label}
                                {field.required && <span className="text-red-600 ml-1">*</span>}
                            </label>
                            {field.key === "time" ? (
                                <select
                                    name={field.key}
                                    required={field.required}
                                    defaultValue=""
                                    className="w-full px-4 py-3 border border-gray-300 rounded text-base bg-white"
                                >
                                    <option value="" disabled>
                                        선택해 주세요
                                    </option>
                                    <option value="morning">오전 (9~12시)</option>
                                    <option value="afternoon">오후 (13~18시)</option>
                                    <option value="evening">저녁 (18~21시)</option>
                                    <option value="anytime">언제든</option>
                                </select>
                            ) : (
                                <input
                                    name={field.key}
                                    type={field.key === "phone" ? "tel" : "text"}
                                    required={field.required}
                                    placeholder={field.key === "phone" ? "010-0000-0000" : ""}
                                    className="w-full px-4 py-3 border border-gray-300 rounded text-base"
                                />
                            )}
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-bold mb-2 text-[var(--navy)]">
                            추가 문의 (선택)
                        </label>
                        <textarea
                            name="memo"
                            rows={3}
                            placeholder="추가로 궁금한 내용이 있으시면 자유롭게 적어 주세요."
                            className="w-full px-4 py-3 border border-gray-300 rounded text-base"
                        />
                    </div>

                    <label className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed cursor-pointer">
                        <input type="checkbox" name="privacy" required className="mt-1 w-4 h-4" />
                        <span>
                            <span className="text-red-600 font-bold">(필수)</span> 개인정보 수집·이용에 동의합니다. 수집 항목: 성명·연락처·자가진단 결과. 이용 목적: 상담 안내. 보유 기간: 상담 완료 후 3년.
                        </span>
                    </label>

                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] disabled:bg-gray-400 text-[var(--navy)] font-bold py-4 rounded text-lg transition-colors"
                    >
                        {submitting ? "접수 중..." : "상담 신청하기"}
                    </button>

                    {mode === "showcase" && (
                        <p className="text-xs text-gray-500 text-center">
                            ⓘ 시안 모드 — 시연용 페이지입니다. 실제 데이터는 저장되지 않습니다.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
