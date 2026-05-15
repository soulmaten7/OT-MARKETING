"use client";

import { useState } from "react";
import type { LandingConfig } from "@/lib/supabase/types";

/**
 * DefaultLandingTemplate — otpage1.com/ default 베이스 LP
 *
 * ⚠️ 이 컴포넌트는 placeholder 들어있는 default 베이스입니다.
 * 새 광고주 LP 만들 때 = 이 파일 복사 → placeholder ([브랜드명], [질문], [옵션] 등) 만 swap → 라우트 신규
 *
 * STEP_107: config prop 추가 — config 있으면 해당 값 표시, 없으면 placeholder 표시.
 */

interface Props {
    config?: Partial<LandingConfig>;
    /** true 이면 신청 제출 시 /api/landing-submit/{slug} 호출 */
    slug?: string;
}

export function DefaultLandingTemplate({ config, slug }: Props) {
    const step1Opts = config?.step1Options?.length === 6 ? config.step1Options : ["[옵션1]", "[옵션2]", "[옵션3]", "[옵션4]", "[옵션5]", "[옵션6]"];
    const step2Opts = config?.step2Options?.length === 6 ? config.step2Options : ["[옵션1]", "[옵션2]", "[옵션3]", "[옵션4]", "[옵션5]", "[옵션6]"];

    const brandColor = config?.brandColor ?? "#9ca3af";
    const brandName = config?.brandName ?? "[브랜드명 입력]";
    const brandIcon = config?.brandIcon ?? "🎯";

    const [page, setPage] = useState<1 | 2>(1);
    const [option1, setOption1] = useState<string>("");
    const [option2, setOption2] = useState<string>("");
    const [option3, setOption3] = useState("");
    const [name, setName] = useState("");
    const [phone1, setPhone1] = useState("010");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [agreeRequired, setAgreeRequired] = useState(false);
    const [agreeOptional, setAgreeOptional] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!slug) return;
        setSubmitting(true);
        try {
            await fetch(`/api/landing-submit/${slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone: `${phone1}-${phone2}-${phone3}`, option1, option2, option3, agreeRequired, agreeOptional }),
            });
            setSubmitted(true);
        } catch {
            // silent — still show success
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
                <div className="text-5xl mb-4">✅</div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">신청이 완료되었습니다</h1>
                <p className="text-sm text-gray-500 text-center">담당자가 확인 후 연락드리겠습니다.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white" data-theme="default-placeholder">
            {/* Header — 진행률 바 헤더 1자 */}
            <header className="sticky top-0 z-40 bg-white">
                <div className="border-b border-gray-100">
                    <div className="max-w-xl mx-auto px-6 py-4 flex items-center gap-2">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                            style={{ backgroundColor: brandColor }}
                        >
                            {brandIcon}
                        </div>
                        <span className="text-lg font-bold text-gray-700 tracking-tight">
                            {brandName}
                        </span>
                    </div>
                </div>
                {/* 진행률 바 (헤더 1자 = h-1) */}
                <div className="w-full bg-gray-100 h-1">
                    <div
                        className="h-full transition-all duration-300"
                        style={{ width: `${page * 50}%`, backgroundColor: brandColor }}
                    />
                </div>
            </header>

            <section className="py-5 md:py-7 bg-white">
                <div className="max-w-xl mx-auto px-6">
                    {/* Page 1 = 옵션 1 + 옵션 2 + 자유 텍스트 (3 섹션) */}
                    {page === 1 && (
                        <div className="space-y-7">
                            {/* 01. 옵션 1 (3열 2행) */}
                            <div>
                                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 text-center">
                                    01. {config?.step1Question ?? "[첫 번째 질문 입력]"}
                                </h2>
                                <div className="grid grid-cols-3 gap-2">
                                    {step1Opts.map((o) => (
                                        <button
                                            key={o}
                                            type="button"
                                            onClick={() => setOption1(o)}
                                            className={`py-2.5 px-2 border-2 rounded-xl text-sm font-medium transition-colors ${
                                                option1 === o
                                                    ? "border-gray-600 bg-gray-50 text-gray-700 font-semibold"
                                                    : "border-gray-200 text-gray-700 hover:border-gray-400"
                                            }`}
                                        >
                                            {o}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    * {config?.step1Note ?? "[필수 안내 사항 입력]"}
                                </p>
                            </div>

                            {/* 02. 옵션 2 (3열 2행) */}
                            <div>
                                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 text-center">
                                    02. {config?.step2Question ?? "[두 번째 질문 입력]"}
                                </h2>
                                <div className="grid grid-cols-3 gap-2">
                                    {step2Opts.map((o) => (
                                        <button
                                            key={o}
                                            type="button"
                                            onClick={() => setOption2(o)}
                                            className={`py-2.5 px-2 border-2 rounded-xl text-sm font-medium transition-colors ${
                                                option2 === o
                                                    ? "border-gray-600 bg-gray-50 text-gray-700 font-semibold"
                                                    : "border-gray-200 text-gray-700 hover:border-gray-400"
                                            }`}
                                        >
                                            {o}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 03. 자유 텍스트 (선택 입력) */}
                            <div>
                                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 text-center">
                                    03. {config?.step3Question ?? "[자세한 상황 입력]"}
                                </h2>
                                <p className="text-xs text-gray-500 mb-3 text-center">선택 입력 — 비워두셔도 됩니다.</p>
                                <textarea
                                    value={option3}
                                    onChange={(e) => setOption3(e.target.value.slice(0, 500))}
                                    rows={4}
                                    maxLength={500}
                                    placeholder={config?.step3Placeholder ?? "예: [사용자 상황 예시 입력]"}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:border-gray-600 focus:outline-none resize-none"
                                />
                                <p className="text-xs text-gray-400 text-right mt-1">{option3.length} / 500</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setPage(2)}
                                disabled={!option1 || !option2}
                                className="w-full px-5 py-4 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-base font-semibold rounded-xl transition-opacity"
                                style={{ backgroundColor: brandColor }}
                            >
                                다음으로
                            </button>
                        </div>
                    )}

                    {/* Page 2 = 이름·휴대폰·동의 + CTA */}
                    {page === 2 && (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
                                {config?.page2Copy ?? "무료 [가치 — 예: 탕감액·견적·진단] [상담 형식]을 위해"}
                                <br />
                                성함과 연락처를 입력해주세요
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        성함 <span className="text-gray-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="홍길동"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base text-gray-900 focus:border-gray-600 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        휴대폰 <span className="text-gray-600">*</span>
                                    </label>
                                    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5">
                                        <input
                                            type="tel"
                                            value={phone1}
                                            onChange={(e) => setPhone1(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                            className="w-full min-w-0 px-2 py-3 border-2 border-gray-200 rounded-xl text-base text-center text-gray-900 focus:border-gray-600 focus:outline-none"
                                            inputMode="numeric"
                                            maxLength={3}
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="tel"
                                            value={phone2}
                                            onChange={(e) => setPhone2(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                            className="w-full min-w-0 px-2 py-3 border-2 border-gray-200 rounded-xl text-base text-center text-gray-900 focus:border-gray-600 focus:outline-none"
                                            inputMode="numeric"
                                            maxLength={4}
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="tel"
                                            value={phone3}
                                            onChange={(e) => setPhone3(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                            className="w-full min-w-0 px-2 py-3 border-2 border-gray-200 rounded-xl text-base text-center text-gray-900 focus:border-gray-600 focus:outline-none"
                                            inputMode="numeric"
                                            maxLength={4}
                                        />
                                    </div>
                                </div>

                                {/* 동의 2종 */}
                                <div className="space-y-2 pt-2">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreeRequired}
                                            onChange={(e) => setAgreeRequired(e.target.checked)}
                                            className="mt-1 w-5 h-5 accent-gray-600"
                                        />
                                        <span className="text-sm text-gray-700 leading-relaxed">
                                            <span className="text-gray-600 font-semibold">[필수]</span>{" "}
                                            {config?.consentRequired ?? "개인정보 수집·이용 동의 ([상담 안내 목적 — 업종별 swap])"}
                                        </span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreeOptional}
                                            onChange={(e) => setAgreeOptional(e.target.checked)}
                                            className="mt-1 w-5 h-5 accent-gray-600"
                                        />
                                        <span className="text-sm text-gray-700 leading-relaxed">
                                            <span className="text-gray-500 font-semibold">[선택]</span>{" "}
                                            {config?.consentOptional ?? "마케팅 정보 수신 + 상담 사례 익명 활용 동의"}
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!name || !phone2 || !phone3 || !agreeRequired || submitting}
                                    className="w-full px-5 py-3 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-lg font-bold rounded-2xl transition-opacity mt-2"
                                    style={{ backgroundColor: brandColor }}
                                >
                                    {submitting ? "신청 중..." : (config?.ctaText ?? "내 [가치] 무료 [분석/견적/진단] 시작")}
                                </button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setPage(1)}
                                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                                    >
                                        ← 이전 단계
                                    </button>
                                </div>

                                {/* Footer */}
                                <div
                                    className="mt-4 pt-4 border-t border-gray-100 text-center space-y-2"
                                    style={{ fontSize: "11px", lineHeight: 1.6, color: "#9ca3af" }}
                                >
                                    {(config?.companyName || config?.companyRep || config?.companyBizNum || config?.companyAddress) ? (
                                        <p>
                                            {config.companyName && <>{config.companyName}</>}
                                            {config.companyRep && <> | 대표 {config.companyRep}</>}
                                            {config.companyBizNum && <> | 사업자등록번호 {config.companyBizNum}</>}
                                            {config.companyAddress && <><br />본점: {config.companyAddress}</>}
                                        </p>
                                    ) : (
                                        <p>
                                            [회사명] | 대표 [대표자명] | 사업자등록번호 [000-00-00000]
                                            <br />
                                            본점: [본점 주소 입력]
                                        </p>
                                    )}
                                    <p style={{ whiteSpace: "pre-line" }}>
                                        {config?.legalNote ?? "광고책임 [업종별 — 변호사/CP/약사/공인중개사 등] 별도 표기 · [업종별 법규 §00의0 ⓘ] 의무 표시\n본 광고는 [업종별 상담/안내] 안내이며, 결과는 사안에 따라 다를 수 있습니다."}
                                    </p>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
