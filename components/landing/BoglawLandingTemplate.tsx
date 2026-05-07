"use client";

/**
 * STEP_70 — otpage1.com/select11 = 법률사무소 보광 (AD001) 전용 랜딩
 *
 * 4 단계 progressive form (메인 파트너 lawsolution.eventkor.co.kr 패턴 차용 + OT 자체 카피·hex):
 *   1. 채무 금액 (6 옵션 버튼)
 *   2. 직업 (7 옵션 버튼)
 *   3. 자유 텍스트 (선택, textarea)
 *   4. 이름 + 휴대폰 + 동의 (필수)
 *
 * 색상 = Tailwind Blue 600/700 (#2563EB / #1D4ED8) — 법률 신뢰
 * 추적 = Meta Pixel 824440290225761 + Google Ads AW-11289983153 + Conversion qblFCK-ul6ccELHxvYcq
 * 안전 zone = 변호사법 §24의2·§7의2·§117 위반 표현 0건
 */

import { useState, useEffect, useRef } from "react";

const DEBT_OPTIONS = [
    { value: "2000_4000", label: "2,000~4,000만원" },
    { value: "4000_6000", label: "4,000~6,000만원" },
    { value: "6000_8000", label: "6,000~8,000만원" },
    { value: "8000_10000", label: "8,000만원~1억원" },
    { value: "10000_50000", label: "1억원 이상" },
    { value: "over_50000", label: "5억원 이상" },
];

const JOB_OPTIONS = [
    { value: "self", label: "사업자" },
    { value: "employed", label: "직장인" },
    { value: "freelance", label: "프리랜서" },
    { value: "parttime", label: "아르바이트생" },
    { value: "homemaker", label: "주부" },
    { value: "unemployed", label: "무직" },
    { value: "etc", label: "기타" },
];

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
    }
}

function trackStep(stepName: string) {
    if (typeof window === "undefined") return;
    if (window.fbq) {
        window.fbq("trackCustom", stepName);
    }
    if (window.gtag) {
        window.gtag("event", stepName, {
            event_category: "boglaw_funnel",
            event_label: stepName,
        });
    }
}

export function BoglawLandingTemplate({ slug }: { slug: string }) {
    const [step, setStep] = useState(1);
    const [debtAmount, setDebtAmount] = useState("");
    const [jobType, setJobType] = useState("");
    const [userStory, setUserStory] = useState("");
    const [name, setName] = useState("");
    const [phone1, setPhone1] = useState("010");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const stepRef = useRef<HTMLDivElement>(null);

    // 페이지 진입 시 DiagnosisStart 발사
    useEffect(() => {
        trackStep("DiagnosisStart");
    }, []);

    // 단계 진행 시 스크롤 + 추적 이벤트
    useEffect(() => {
        if (step > 1) {
            trackStep(`Step${step}`);
            stepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [step]);

    const handleDebtSelect = (value: string) => {
        setDebtAmount(value);
        setStep(2);
    };
    const handleJobSelect = (value: string) => {
        setJobType(value);
        setStep(3);
    };
    const handleStoryNext = () => {
        setStep(4);
    };

    const phoneFull = `${phone1}-${phone2}-${phone3}`;
    const phoneValid = /^010$/.test(phone1) && /^\d{4}$/.test(phone2) && /^\d{4}$/.test(phone3);
    const canSubmit = name.trim().length >= 2 && phoneValid && agreePrivacy && !submitting;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        setError("");
        try {
            const utmSource = new URLSearchParams(window.location.search).get("utm_source") || "기타";
            const res = await fetch("/api/boglaw-submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    advertiserId: "AD001",
                    slug,
                    name: name.trim(),
                    phone: phoneFull,
                    debt_amount: DEBT_OPTIONS.find((o) => o.value === debtAmount)?.label ?? debtAmount,
                    job_type: JOB_OPTIONS.find((o) => o.value === jobType)?.label ?? jobType,
                    user_story: userStory.trim(),
                    landingUrl: window.location.href,
                    utmSource,
                    consentPrivacy: agreePrivacy,
                    consentMarketing: agreeMarketing,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "제출에 실패했습니다. 잠시 후 다시 시도해 주세요.");
            }
            // 성공: Meta Lead + Google Ads conversion
            if (window.fbq) window.fbq("track", "Lead");
            if (window.gtag) {
                window.gtag("event", "conversion", {
                    send_to: "AW-11289983153/qblFCK-ul6ccELHxvYcq",
                });
            }
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "제출 실패");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">접수 완료</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        법률사무소 보광에서<br />
                        영업일 기준 24시간 이내 1:1 비밀 상담을 드립니다.
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p>· 익명 처리 가능</p>
                        <p>· 무료 자가진단 결과 안내</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white" data-theme="lawfirm-blue">
            {/* Hero */}
            <section className="bg-gradient-to-b from-blue-50 via-white to-white pt-20 pb-12 md:pt-28 md:pb-16">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-5 tracking-wider">
                        법률사무소 보광 · 1:1 비밀 상담
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
                        최대 90% 탕감 — 오늘부터<br />
                        빚 걱정 없이 시작하세요
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        1분 무료 자가진단으로 받을 수 있는 탕감액을 확인하세요.<br />
                        법률사무소 보광이 책임지고 안내해드립니다.
                    </p>
                </div>
            </section>

            {/* Progressive Form */}
            <section className="py-10 md:py-14" ref={stepRef}>
                <div className="max-w-2xl mx-auto px-6">
                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-8">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`h-1.5 flex-1 rounded-full transition-colors ${
                                    s <= step ? "bg-blue-600" : "bg-gray-200"
                                }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        {step}/4 단계 진행 중
                    </p>

                    {/* Step 1: 채무 금액 */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
                                01. 현재 채무 금액은 얼마정도 되시나요?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {DEBT_OPTIONS.map((o) => (
                                    <button
                                        key={o.value}
                                        type="button"
                                        onClick={() => handleDebtSelect(o.value)}
                                        className="px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-base font-semibold text-gray-900 hover:border-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        {o.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: 직업 */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
                                02. 현재 직업은 어떻게 되시나요?
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {JOB_OPTIONS.map((o) => (
                                    <button
                                        key={o.value}
                                        type="button"
                                        onClick={() => handleJobSelect(o.value)}
                                        className="px-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-base font-semibold text-gray-900 hover:border-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        {o.label}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                ← 이전 단계
                            </button>
                        </div>
                    )}

                    {/* Step 3: 자유 텍스트 */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
                                03. 현재 상황을 자세히 남겨주세요
                            </h2>
                            <p className="text-sm text-gray-500 mb-6 text-center">선택 입력 — 비워두셔도 됩니다.</p>
                            <textarea
                                value={userStory}
                                onChange={(e) => setUserStory(e.target.value.slice(0, 500))}
                                rows={5}
                                maxLength={500}
                                placeholder="예: 신용카드 연체 6개월째, 추심 전화 받고 있어요..."
                                className="w-full p-4 border-2 border-gray-200 rounded-xl text-base text-gray-900 focus:border-blue-600 focus:outline-none resize-none"
                            />
                            <p className="text-xs text-gray-400 text-right mt-1">{userStory.length} / 500</p>
                            <div className="flex gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-5 py-3 text-sm text-gray-500 hover:text-gray-700"
                                >
                                    ← 이전
                                </button>
                                <button
                                    type="button"
                                    onClick={handleStoryNext}
                                    className="flex-1 px-5 py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-xl transition-colors"
                                >
                                    다음으로
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: 이름·휴대폰·동의 */}
                    {step === 4 && (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
                                04. 무료 탕감액 분석을 위해<br />
                                성함과 연락처를 입력해주세요
                            </h2>
                            <p className="text-sm text-gray-500 mb-6 text-center">
                                법률사무소 보광이 1:1 비밀 상담으로 안내드립니다.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        성함 <span className="text-blue-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="홍길동"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base text-gray-900 focus:border-blue-600 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        휴대폰 <span className="text-blue-600">*</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="tel"
                                            value={phone1}
                                            onChange={(e) => setPhone1(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                            className="w-20 px-3 py-3 border-2 border-gray-200 rounded-xl text-base text-center text-gray-900 focus:border-blue-600 focus:outline-none"
                                            inputMode="numeric"
                                            maxLength={3}
                                            required
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="tel"
                                            value={phone2}
                                            onChange={(e) => setPhone2(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                            className="flex-1 px-3 py-3 border-2 border-gray-200 rounded-xl text-base text-center text-gray-900 focus:border-blue-600 focus:outline-none"
                                            inputMode="numeric"
                                            maxLength={4}
                                            required
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="tel"
                                            value={phone3}
                                            onChange={(e) => setPhone3(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                            className="flex-1 px-3 py-3 border-2 border-gray-200 rounded-xl text-base text-center text-gray-900 focus:border-blue-600 focus:outline-none"
                                            inputMode="numeric"
                                            maxLength={4}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreePrivacy}
                                            onChange={(e) => setAgreePrivacy(e.target.checked)}
                                            className="mt-1 w-5 h-5 accent-blue-600"
                                            required
                                        />
                                        <span className="text-sm text-gray-700 leading-relaxed">
                                            <span className="text-blue-600 font-semibold">[필수]</span>{" "}
                                            개인정보 수집·이용 동의 (1:1 비밀 상담 안내 목적, 익명 처리 가능)
                                        </span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreeMarketing}
                                            onChange={(e) => setAgreeMarketing(e.target.checked)}
                                            className="mt-1 w-5 h-5 accent-blue-600"
                                        />
                                        <span className="text-sm text-gray-700 leading-relaxed">
                                            <span className="text-gray-500 font-semibold">[선택]</span>{" "}
                                            마케팅 정보 수신 동의
                                        </span>
                                    </label>
                                </div>

                                {error && (
                                    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className="w-full px-6 py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-bold rounded-xl transition-colors mt-2"
                                >
                                    {submitting ? "전송 중..." : "내 탕감액 확인하기"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="w-full text-sm text-gray-500 hover:text-gray-700"
                                >
                                    ← 이전 단계
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* 신뢰 시그널 */}
            <section className="bg-gray-50 py-10 md:py-14">
                <div className="max-w-3xl mx-auto px-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center">
                        왜 법률사무소 보광인가요?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 font-bold">
                                01
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1.5">1:1 비밀 상담</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                담당자와 직접 통화. 외부 노출 X.
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 font-bold">
                                02
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1.5">익명 처리 가능</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                실명 노출 부담 없이 진행.
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 font-bold">
                                03
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1.5">무료 탕감액 분석</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                받을 수 있는 최대 탕감액을 안내.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 안전 zone footer */}
            <footer className="bg-gray-100 border-t border-gray-200 py-6">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        법률사무소 보광 · 광고책임 변호사 별도 표기 · 변호사법 §24의2 ② 의무 표시<br />
                        본 광고는 법률 상담 안내이며, 결과는 사안에 따라 달라질 수 있습니다.
                    </p>
                </div>
            </footer>
        </main>
    );
}
