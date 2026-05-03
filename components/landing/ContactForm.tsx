"use client";

import { useState } from "react";
import type { AnswerMap } from "@/lib/industries";

const TIME_OPTIONS = [
    { value: "morning",   label: "오전 (9~12시)" },
    { value: "afternoon", label: "오후 (13~18시)" },
    { value: "evening",   label: "저녁 (18~21시)" },
    { value: "anytime",   label: "언제든" },
];

interface ContactFormProps {
    additionalFields: { key: string; label: string; required: boolean }[];
    sheetId: string | null;
    industryId: string;
    answers: AnswerMap;
    grade: string;
}

export function ContactForm({
    additionalFields,
    sheetId,
    industryId,
    answers,
    grade,
}: ContactFormProps) {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timeValue, setTimeValue] = useState<string>("");

    // STEP_44 v2 Phase 3 — 동의 3개 (필수 2 + 선택 1) state 박힘
    const [consents, setConsents] = useState({
        privacy: false,        // 필수 #1 — 수집·이용
        thirdParty: false,     // 필수 #2 — 제3자 제공
        marketing: false,      // 선택   — 마케팅 정보
    });

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const fd = new FormData(e.currentTarget);
        const personal: Record<string, string> = {};
        for (const field of additionalFields) {
            personal[field.key] = field.key === "time"
                ? timeValue
                : ((fd.get(field.key) as string) || "");
        }
        const memo = (fd.get("memo") as string) || "";

        // STEP_44 v2 Phase 3 — 필수 동의 2개 모두 검증
        if (!consents.privacy) {
            setError("개인정보 수집·이용 동의가 필요합니다.");
            setSubmitting(false);
            return;
        }
        if (!consents.thirdParty) {
            setError("변호사·법무법인 등 제3자 정보 제공 동의가 필요합니다.");
            setSubmitting(false);
            return;
        }

        const timeField = additionalFields.find((f) => f.key === "time");
        if (timeField?.required && !timeValue) {
            setError("통화 가능 시간대를 선택해 주세요.");
            setSubmitting(false);
            return;
        }

        // STEP_44 v2 Phase 3 — landing_url 캡처 (분배 룰의 slug 추출 source)
        const landingUrl = typeof window !== "undefined" ? window.location.href : "";

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
                    landingUrl,
                    consentPrivacy:    consents.privacy,
                    consentThirdParty: consents.thirdParty,
                    consentMarketing:  consents.marketing,
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
                            전담 컨설턴트가 영업일 기준 24시간 이내 연락드립니다.
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
                        1:1 상담 신청
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                        자가진단 결과는 전담 컨설턴트 1:1 상담에서 안내드립니다.
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
                                <div className="grid grid-cols-2 gap-2">
                                    {TIME_OPTIONS.map((opt) => {
                                        const selected = timeValue === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => setTimeValue(opt.value)}
                                                aria-pressed={selected}
                                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                                    selected
                                                        ? "bg-[var(--navy)] text-white border-[var(--gold)] font-semibold shadow-lg"
                                                        : "bg-white text-[var(--navy)] border-slate-200 hover:border-slate-400"
                                                }`}
                                            >
                                                <span className="flex items-center gap-2 text-sm">
                                                    {selected && (
                                                        <svg className="w-5 h-5 text-[var(--gold)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                    {opt.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
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

                    {/* STEP_44 v2 Phase 3 — 동의 3개 (필수 2 + 선택 1) */}
                    <div className="space-y-3 pt-2 border-t border-gray-200">
                        {/* 동의 #1 — 수집·이용 (필수) */}
                        <label className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed cursor-pointer">
                            <input
                                type="checkbox"
                                checked={consents.privacy}
                                onChange={(e) => setConsents({ ...consents, privacy: e.target.checked })}
                                className="mt-1 w-4 h-4"
                            />
                            <span>
                                <span className="text-red-600 font-bold">(필수)</span> 개인정보 수집·이용 동의 · 수집: 성명·연락처·자가진단 결과 · 목적: 상담 안내 · 보유: 3년.
                                <a href="/legal/privacy-collection" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">[전문 보기]</a>
                            </span>
                        </label>

                        {/* 동의 #2 — 제3자 제공 (필수) */}
                        <label className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed cursor-pointer">
                            <input
                                type="checkbox"
                                checked={consents.thirdParty}
                                onChange={(e) => setConsents({ ...consents, thirdParty: e.target.checked })}
                                className="mt-1 w-4 h-4"
                            />
                            <span>
                                <span className="text-red-600 font-bold">(필수)</span> 변호사·법무법인 등 제3자 정보 제공 동의 · 등급 A/B 시 매칭 광고주에 제공.
                                <a href="/legal/privacy-third-party" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">[전문 보기]</a>
                            </span>
                        </label>

                        {/* 동의 #3 — 마케팅 (선택) */}
                        <label className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed cursor-pointer">
                            <input
                                type="checkbox"
                                checked={consents.marketing}
                                onChange={(e) => setConsents({ ...consents, marketing: e.target.checked })}
                                className="mt-1 w-4 h-4"
                            />
                            <span>
                                <span className="text-gray-500 font-bold">(선택)</span> 마케팅 정보 수신 동의 · 신규 정보·이벤트 안내.
                                <a href="/legal/marketing" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">[전문 보기]</a>
                            </span>
                        </label>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting || !consents.privacy || !consents.thirdParty}
                        className="w-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] disabled:bg-gray-400 text-[var(--navy)] font-bold py-4 rounded text-lg transition-colors"
                    >
                        {submitting ? "접수 중..." : "상담 신청하기"}
                    </button>
                </form>
            </div>
        </section>
    );
}
