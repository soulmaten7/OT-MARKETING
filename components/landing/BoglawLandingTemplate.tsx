"use client";

/**
 * STEP_71 — otpage1.com/select11 = 채무회복 탕감센터 본격 라이브
 *
 * 헤더 = "채무회복 탕감센터" (OT 자체 브랜드, 보광 명의 X)
 * Hero = 최대 95% 탕감 — 오늘부터 마음 편히 주무세요
 * 통계 카드 3종 = 720억 면책 / 6,015 사건접수 / 최대 95% 탕감
 * "왜?" 섹션 3 항목 = 전담 변호사 / 0%에 가까운 기각율 / 1:1 비밀 보장
 * 4 단계 progressive form (debt → job → user_story → name·phone·동의 3종)
 * 폼 4 안 푸터 = 법률사무소 보광 사무소명·대표·사업자번호·주소·전화 (변호사법 §22 통과)
 * 라이브 토스트 = 하이브리드 (BoglawLiveToast 컴포넌트)
 *
 * 색상 = Tailwind Blue 600/700 메인 + Coral 액센트 (CTA·통계 숫자)
 * 추적 = Meta Pixel 824440290225761 + Google Ads AW-11289983153 + Conversion qblFCK-ul6ccELHxvYcq
 * 안전 zone = 변호사법 §22·§23·§24의2 + 표시광고법 §3 위반 0건
 */

import { useState, useEffect, useRef } from "react";
import { BoglawLiveToast } from "./BoglawLiveToast";

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
    const [agreeCaseUse, setAgreeCaseUse] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const stepRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        trackStep("DiagnosisStart");
    }, []);

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
                    consentCaseUse: agreeCaseUse,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "제출에 실패했습니다. 잠시 후 다시 시도해 주세요.");
            }
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
                        채무회복 탕감센터에서<br />
                        영업일 기준 24시간 이내 1:1 비밀 상담을 드립니다.
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p>· 가족·직장 모르게 익명 처리</p>
                        <p>· 무료 자가진단 결과 안내</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white" data-theme="lawfirm-blue">
            {/* Header — 채무회복 탕감센터 */}
            <header className="bg-white border-b border-gray-100 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
                <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                            ⚖
                        </div>
                        <span className="text-lg font-bold text-blue-700 tracking-tight">
                            채무회복 탕감센터
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 hidden sm:inline">
                        1:1 비밀 상담
                    </span>
                </div>
            </header>

            {/* Hero — 여백 비율 ↑ */}
            <section className="bg-gradient-to-b from-blue-50 via-white to-white py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-5 tracking-wider">
                        채무회복 탕감센터 · 무료 자가진단
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                        <span className="text-blue-600">최대 95% 탕감</span><br />
                        오늘부터 마음 편히<br />
                        주무세요.
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        가족·직장 모르게 1:1 비밀 상담으로 안내해드립니다
                    </p>
                </div>
            </section>

            {/* 통계 카드 — 위계 (큰 1 + 작은 2) + 한국 표기 */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6 space-y-6">
                    {/* 큰 카드 — 총 면책금액 */}
                    <div className="bg-gradient-to-br from-blue-50 to-white py-12 px-8 rounded-2xl border border-blue-100 shadow-md text-center">
                        <div className="text-3xl mb-3">💰</div>
                        <div className="text-sm font-semibold text-gray-500 mb-3 tracking-wider">
                            총 면책금액
                        </div>
                        <div className="text-4xl md:text-6xl font-extrabold text-blue-600 mb-2 break-keep tracking-tight">
                            7,204억 8,000만+
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                            (보광 누적 자체 통계)
                        </div>
                    </div>
                    {/* 작은 카드 2 — 사건접수 + 탕감률 */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-white py-6 px-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                            <div className="text-2xl md:text-3xl mb-2">📋</div>
                            <div className="text-xs font-semibold text-gray-500 mb-2 tracking-wider">
                                총 사건접수
                            </div>
                            <div className="text-2xl md:text-4xl font-bold text-orange-500">
                                6,015 건+
                            </div>
                        </div>
                        <div className="bg-white py-6 px-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                            <div className="text-2xl md:text-3xl mb-2">⚖️</div>
                            <div className="text-xs font-semibold text-gray-500 mb-2 tracking-wider">
                                최대 탕감률
                            </div>
                            <div className="text-2xl md:text-4xl font-bold text-orange-500 break-keep">
                                최대 95% 탕감
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* "왜?" 섹션 — 리스트 형태 (박스 X) + CTA 큰 파란 버튼 */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
                        왜 채무회복 탕감센터를 선택해야 할까요?
                    </h2>
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="text-3xl md:text-4xl flex-shrink-0 leading-none">⚖️</div>
                            <div>
                                <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">
                                    전담 변호사 직접 상담
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    초기 상담부터 서류 준비까지 변호사가 직접 진행합니다.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl md:text-4xl flex-shrink-0 leading-none">📊</div>
                            <div>
                                <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">
                                    0%에 가까운 기각율
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    연간 수백여건 누적 데이터로 0%에 가까운 기각률을 유지합니다.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl md:text-4xl flex-shrink-0 leading-none">🔒</div>
                            <div>
                                <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">
                                    철저한 1:1 비밀 보장
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    가족·직장에 알려지지 않게 비밀로 안내해드립니다.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* CTA 큰 파란 버튼 — 폼 단계 1 영역으로 부드러운 스크롤 */}
                    <div className="mt-12 text-center">
                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("form-step-1")
                                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                            }
                            className="w-full md:w-3/4 lg:w-2/3 mx-auto block py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg transition-colors"
                        >
                            내 탕감액 무료 분석 시작
                        </button>
                    </div>
                </div>
            </section>

            {/* Progressive Form — 여백 ↑ + form-step-1 id (CTA 스크롤 타겟) */}
            <section id="form-step-1" className="py-12 md:py-16 bg-white" ref={stepRef}>
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

                    {/* Step 4: 이름·휴대폰·동의 3종 */}
                    {step === 4 && (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
                                04. 무료 탕감액 분석을 위해<br />
                                성함과 연락처를 입력해주세요
                            </h2>
                            <p className="text-sm text-gray-500 mb-6 text-center">
                                채무회복 탕감센터가 1:1 비밀 상담으로 안내드립니다.
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

                                {/* 동의 3종 */}
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
                                            개인정보 수집·이용 동의 (1:1 비밀 상담 안내 목적)
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
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreeCaseUse}
                                            onChange={(e) => setAgreeCaseUse(e.target.checked)}
                                            className="mt-1 w-5 h-5 accent-blue-600"
                                        />
                                        <span className="text-sm text-gray-700 leading-relaxed">
                                            <span className="text-gray-500 font-semibold">[선택]</span>{" "}
                                            상담 사례 익명 활용 동의
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
                                    {submitting ? "전송 중..." : "내 탕감액 무료 분석 시작"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="w-full text-sm text-gray-500 hover:text-gray-700"
                                >
                                    ← 이전 단계
                                </button>

                                {/* 폼 4 안 푸터 — 변호사법 §22 사무소 명칭 표시 */}
                                <div className="mt-4 pt-4 border-t border-gray-100 text-center"
                                     style={{ fontSize: "11px", lineHeight: 1.6, color: "#9ca3af" }}>
                                    법률사무소 보광 | 대표 정충원 | 사업자등록번호 471-20-01174<br />
                                    본점: 서울 도봉구 마들로 760 한밭법조타워 301호 (02-3492-4246)<br />
                                    분점: 서울 도봉구 마들로 736, 201호 (02-956-4246)
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* 안전 zone footer — 변호사법 §22 사무소 명칭 표시 + §24의2 의무 표시 */}
            <footer className="bg-gray-100 border-t border-gray-200 py-6">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-2">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        법률사무소 보광 | 대표 정충원 | 사업자등록번호 471-20-01174<br />
                        본점: 서울 도봉구 마들로 760 한밭법조타워 301호 (02-3492-4246)<br />
                        분점: 서울 도봉구 마들로 736, 201호 (02-956-4246)
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        광고책임 변호사 별도 표기 · 변호사법 §24의2 ② 의무 표시<br />
                        본 광고는 법률 상담 안내이며, 결과는 사안에 따라 달라질 수 있습니다.
                    </p>
                </div>
            </footer>

            {/* 라이브 토스트 (하이브리드 — 카운터 → 5건+ 시 리얼) */}
            <BoglawLiveToast />
        </main>
    );
}
