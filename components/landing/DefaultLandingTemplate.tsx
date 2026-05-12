"use client";

import { useState } from "react";

/**
 * DefaultLandingTemplate — otpage1.com/ default 베이스 LP
 *
 * ⚠️ 이 컴포넌트는 placeholder 박힌 default 베이스입니다.
 * 새 광고주 LP 만들 때 = 이 파일 복사 → placeholder ([브랜드명], [질문], [옵션] 등) 만 swap → 라우트 신규
 *
 * 검증된 LP 패턴 (STEP_92 + STEP_92.2 + STEP_92.3 + STEP_92.4 + STEP_93):
 * - 4→2 Step 압축 (Page 1 = 옵션 1·2·3 한 화면, Page 2 = 연락처)
 * - 체크박스 3열 2행 컴팩트
 * - 진행률 바 헤더 1자 붙임
 * - Page 2 카피 단순화
 * - 라이브 토스트 비활성
 * - Microsoft Clarity 데이터 수집 (layout 박힘)
 * - Meta 도메인 인증 메타 태그 (layout 박힘)
 *
 * 새 광고주 LP 만들 절차 = docs/HOW_TO_ADD_NEW_ADVERTISER.md 참고
 */

const STEP1_OPTIONS = ["[옵션1]", "[옵션2]", "[옵션3]", "[옵션4]", "[옵션5]", "[옵션6]"];
const STEP2_OPTIONS = ["[옵션1]", "[옵션2]", "[옵션3]", "[옵션4]", "[옵션5]", "[옵션6]"];

export function DefaultLandingTemplate() {
    const [page, setPage] = useState<1 | 2>(1);
    const [option1, setOption1] = useState<string>("");
    const [option2, setOption2] = useState<string>("");
    const [option3, setOption3] = useState<string>("");
    const [name, setName] = useState("");
    const [phone1, setPhone1] = useState("010");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [agreeRequired, setAgreeRequired] = useState(false);
    const [agreeOptional, setAgreeOptional] = useState(false);

    return (
        <main className="min-h-screen bg-white" data-theme="default-placeholder">
            {/* Header — 진행률 바 헤더 1자 박힘 */}
            <header className="sticky top-0 z-40 bg-white">
                <div className="border-b border-gray-100">
                    <div className="max-w-xl mx-auto px-6 py-4 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-gray-400 flex items-center justify-center text-white font-bold">
                            [🎯]
                        </div>
                        <span className="text-lg font-bold text-gray-700 tracking-tight">
                            [브랜드명을 여기에 박을 거]
                        </span>
                    </div>
                </div>
                {/* 진행률 바 (헤더 1자 = h-1) */}
                <div className="w-full bg-gray-100 h-1">
                    <div
                        className="bg-gray-400 h-full transition-all duration-300"
                        style={{ width: `${page * 50}%` }}
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
                                    01. [첫 번째 질문을 여기에 박을 거]
                                </h2>
                                <div className="grid grid-cols-3 gap-2">
                                    {STEP1_OPTIONS.map((o) => (
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
                                    * [필수 안내 사항 박을 차례]
                                </p>
                            </div>

                            {/* 02. 옵션 2 (3열 2행) */}
                            <div>
                                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 text-center">
                                    02. [두 번째 질문을 여기에 박을 거]
                                </h2>
                                <div className="grid grid-cols-3 gap-2">
                                    {STEP2_OPTIONS.map((o) => (
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
                                    03. [자세한 상황을 여기에 박을 거]
                                </h2>
                                <p className="text-xs text-gray-500 mb-3 text-center">선택 입력 — 비워두셔도 됩니다.</p>
                                <textarea
                                    value={option3}
                                    onChange={(e) => setOption3(e.target.value.slice(0, 500))}
                                    rows={4}
                                    maxLength={500}
                                    placeholder="예: [사용자 상황 예시를 여기에 박을 거]"
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:border-gray-600 focus:outline-none resize-none"
                                />
                                <p className="text-xs text-gray-400 text-right mt-1">{option3.length} / 500</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setPage(2)}
                                disabled={!option1 || !option2}
                                className="w-full px-5 py-4 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-base font-semibold rounded-xl transition-colors"
                            >
                                다음으로
                            </button>
                        </div>
                    )}

                    {/* Page 2 = 이름·휴대폰·동의 + CTA */}
                    {page === 2 && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // [TODO] new advertiser swap = /api/[advertiser-id]-submit
                            }}
                        >
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
                                02. 무료 [가치 — 예: 탕감액·견적·진단] [상담 형식]을 위해
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
                                            <span className="text-gray-600 font-semibold">[필수]</span> 개인정보 수집·이용 동의
                                            ([상담 안내 목적 — 업종별 swap])
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
                                            <span className="text-gray-500 font-semibold">[선택]</span> 마케팅 정보 수신 + 상담 사례 익명
                                            활용 동의
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!name || !phone2 || !phone3 || !agreeRequired}
                                    className="w-full px-5 py-3 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-lg font-bold rounded-2xl transition-colors mt-2"
                                >
                                    내 [가치] 무료 [분석/견적/진단] 시작
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
                                    <p>
                                        [회사명] | 대표 [대표자명] | 사업자등록번호 [000-00-00000]
                                        <br />
                                        본점: [본점 주소 박을 차례]
                                    </p>
                                    <p>
                                        광고책임 [업종별 — 변호사/CP/약사/공인중개사 등] 별도 표기 · [업종별 법규 §00의0 ⓘ] 의무 표시
                                        <br />
                                        본 광고는 [업종별 상담/안내] 안내이며, 결과는 사안에 따라 다를 수 있습니다.
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
