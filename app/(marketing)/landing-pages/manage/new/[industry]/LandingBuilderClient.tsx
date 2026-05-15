"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Save, Globe } from "lucide-react";
import { DefaultLandingTemplate } from "@/components/landing/DefaultLandingTemplate";
import type { LandingConfig } from "@/lib/supabase/types";

const COLOR_PRESETS = [
    { label: "토스 블루", value: "#3182f6" },
    { label: "그린", value: "#05c072" },
    { label: "퍼플", value: "#7f3bf5" },
    { label: "레드", value: "#f04452" },
    { label: "오렌지", value: "#ff7b00" },
    { label: "다크", value: "#1a1a1a" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="border-b border-neutral-100 pb-2 mb-4">
            <h3 className="text-sm font-bold text-neutral-700 uppercase tracking-wider">{children}</h3>
        </div>
    );
}

function FormField({
    label,
    hint,
    children,
}: {
    label: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-1">{label}</label>
            {hint && <p className="text-xs text-neutral-400 mb-1.5">{hint}</p>}
            {children}
        </div>
    );
}

const inputCls =
    "w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all";

interface Props {
    industry: string;
    industryName: string;
    defaultConfig: LandingConfig;
}

export function LandingBuilderClient({ industry, industryName, defaultConfig }: Props) {
    const router = useRouter();
    const [config, setConfig] = useState<LandingConfig>(defaultConfig);
    const [title, setTitle] = useState(`${industryName} 랜딩페이지`);
    const [slug, setSlug] = useState(`${industry}-${Math.random().toString(36).slice(2, 8)}`);
    const [showPreview, setShowPreview] = useState(false);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [savedId, setSavedId] = useState<string | null>(null);
    const [slugError, setSlugError] = useState("");

    const update = useCallback(<K extends keyof LandingConfig>(key: K, value: LandingConfig[K]) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    }, []);

    const updateOption = useCallback((step: 1 | 2, idx: number, val: string) => {
        setConfig((prev) => {
            const arr = step === 1 ? [...(prev.step1Options ?? [])] : [...(prev.step2Options ?? [])];
            arr[idx] = val;
            return step === 1 ? { ...prev, step1Options: arr } : { ...prev, step2Options: arr };
        });
    }, []);

    const validateSlug = (s: string) => {
        if (!/^[a-z0-9-]+$/.test(s)) return "영소문자·숫자·하이픈만 사용 가능합니다";
        if (s.length < 3) return "3자 이상 입력해주세요";
        if (s.length > 60) return "60자 이하로 입력해주세요";
        return "";
    };

    const handleSlugChange = (val: string) => {
        setSlug(val);
        setSlugError(validateSlug(val));
    };

    const save = async (publish = false) => {
        const err = validateSlug(slug);
        if (err) { setSlugError(err); return; }

        publish ? setPublishing(true) : setSaving(true);
        try {
            const method = savedId ? "PATCH" : "POST";
            const body = {
                id: savedId,
                slug,
                industry,
                title,
                config,
                status: publish ? "published" : "draft",
            };
            const res = await fetch("/api/landing-pages", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "저장 실패");
            setSavedId(data.id);
            if (publish) {
                router.push("/landing-pages/manage");
            }
        } catch (e: unknown) {
            alert((e as Error).message);
        } finally {
            setSaving(false);
            setPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Top bar */}
            <header className="bg-white border-b border-neutral-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <Link
                            href="/landing-pages/manage/new"
                            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            업종 선택
                        </Link>
                        <span className="text-neutral-200">/</span>
                        <span className="text-sm font-semibold text-neutral-900 truncate">{industryName}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => setShowPreview((v) => !v)}
                            className="hidden md:flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-xl px-3 py-1.5 transition-colors"
                        >
                            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {showPreview ? "미리보기 닫기" : "미리보기"}
                        </button>
                        <button
                            type="button"
                            onClick={() => save(false)}
                            disabled={saving || publishing}
                            className="flex items-center gap-1.5 text-sm text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-xl px-3 py-1.5 font-semibold transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? "저장 중..." : "임시저장"}
                        </button>
                        <button
                            type="button"
                            onClick={() => save(true)}
                            disabled={saving || publishing}
                            className="flex items-center gap-1.5 text-sm text-white bg-primary-500 hover:bg-primary-600 rounded-xl px-4 py-1.5 font-semibold transition-colors disabled:opacity-50"
                        >
                            <Globe className="w-4 h-4" />
                            {publishing ? "발행 중..." : "발행하기"}
                        </button>
                    </div>
                </div>
            </header>

            <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-6 ${showPreview ? "grid grid-cols-[1fr_400px] gap-6 items-start" : ""}`}>
                {/* Form */}
                <div className="space-y-6">
                    {/* 랜딩페이지 제목 + slug */}
                    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
                        <SectionTitle>기본 정보</SectionTitle>
                        <FormField label="랜딩페이지 제목 (내부 관리용)" hint="사용자에게는 표시되지 않습니다">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={inputCls}
                                placeholder="예: 개인회생 2026 메인 LP"
                            />
                        </FormField>
                        <FormField label="발행 주소 (slug)" hint="otpage1.com/{slug} — 영소문자·숫자·하이픈만 사용">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-neutral-400 shrink-0">otpage1.com/</span>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => handleSlugChange(e.target.value.toLowerCase())}
                                    className={`${inputCls} ${slugError ? "border-red-400 focus:border-red-400" : ""}`}
                                    placeholder="my-brand-2026"
                                />
                            </div>
                            {slugError && <p className="text-xs text-red-500 mt-1">{slugError}</p>}
                        </FormField>
                    </div>

                    {/* 브랜드 섹션 */}
                    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
                        <SectionTitle>브랜드</SectionTitle>
                        <FormField label="브랜드명">
                            <input type="text" value={config.brandName} onChange={(e) => update("brandName", e.target.value)} className={inputCls} placeholder="예: 채무 상담 센터" />
                        </FormField>
                        <FormField label="브랜드 아이콘 (이모지)">
                            <input type="text" value={config.brandIcon} onChange={(e) => update("brandIcon", e.target.value)} className={inputCls} placeholder="예: ⚖️" maxLength={4} />
                        </FormField>
                        <FormField label="브랜드 색상">
                            <div className="flex items-center gap-3 flex-wrap">
                                {COLOR_PRESETS.map((p) => (
                                    <button
                                        key={p.value}
                                        type="button"
                                        title={p.label}
                                        onClick={() => update("brandColor", p.value)}
                                        className={`w-8 h-8 rounded-lg border-2 transition-all ${config.brandColor === p.value ? "border-neutral-700 scale-110" : "border-transparent"}`}
                                        style={{ backgroundColor: p.value }}
                                    />
                                ))}
                                <input
                                    type="color"
                                    value={config.brandColor}
                                    onChange={(e) => update("brandColor", e.target.value)}
                                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-200"
                                    title="직접 선택"
                                />
                                <span className="text-xs text-neutral-400">{config.brandColor}</span>
                            </div>
                        </FormField>
                    </div>

                    {/* Step 1 */}
                    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
                        <SectionTitle>Step 1 질문</SectionTitle>
                        <FormField label="질문">
                            <input type="text" value={config.step1Question} onChange={(e) => update("step1Question", e.target.value)} className={inputCls} />
                        </FormField>
                        <FormField label="보조 안내 문구" hint="질문 아래 작은 글씨로 표시됩니다">
                            <input type="text" value={config.step1Note} onChange={(e) => update("step1Note", e.target.value)} className={inputCls} />
                        </FormField>
                        <div className="grid grid-cols-2 gap-3">
                            {(config.step1Options ?? []).map((opt, i) => (
                                <FormField key={i} label={`옵션 ${i + 1}`}>
                                    <input type="text" value={opt} onChange={(e) => updateOption(1, i, e.target.value)} className={inputCls} />
                                </FormField>
                            ))}
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
                        <SectionTitle>Step 2 질문</SectionTitle>
                        <FormField label="질문">
                            <input type="text" value={config.step2Question} onChange={(e) => update("step2Question", e.target.value)} className={inputCls} />
                        </FormField>
                        <div className="grid grid-cols-2 gap-3">
                            {(config.step2Options ?? []).map((opt, i) => (
                                <FormField key={i} label={`옵션 ${i + 1}`}>
                                    <input type="text" value={opt} onChange={(e) => updateOption(2, i, e.target.value)} className={inputCls} />
                                </FormField>
                            ))}
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
                        <SectionTitle>Step 3 자유 입력</SectionTitle>
                        <FormField label="질문">
                            <input type="text" value={config.step3Question} onChange={(e) => update("step3Question", e.target.value)} className={inputCls} />
                        </FormField>
                        <FormField label="입력 예시 (placeholder)">
                            <input type="text" value={config.step3Placeholder} onChange={(e) => update("step3Placeholder", e.target.value)} className={inputCls} />
                        </FormField>
                    </div>

                    {/* 연락처 페이지 */}
                    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
                        <SectionTitle>연락처 페이지</SectionTitle>
                        <FormField label="상단 카피" hint="'(카피)\n성함과 연락처를 입력해주세요' 형태로 표시">
                            <input type="text" value={config.page2Copy} onChange={(e) => update("page2Copy", e.target.value)} className={inputCls} />
                        </FormField>
                        <FormField label="CTA 버튼 문구">
                            <input type="text" value={config.ctaText} onChange={(e) => update("ctaText", e.target.value)} className={inputCls} />
                        </FormField>
                        <FormField label="[필수] 동의 문구">
                            <input type="text" value={config.consentRequired} onChange={(e) => update("consentRequired", e.target.value)} className={inputCls} />
                        </FormField>
                        <FormField label="[선택] 동의 문구">
                            <input type="text" value={config.consentOptional} onChange={(e) => update("consentOptional", e.target.value)} className={inputCls} />
                        </FormField>
                    </div>

                    {/* 회사 정보 */}
                    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
                        <SectionTitle>회사 정보 (하단 footer)</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField label="회사명">
                                <input type="text" value={config.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputCls} placeholder="예: (주)OT마케팅" />
                            </FormField>
                            <FormField label="대표자명">
                                <input type="text" value={config.companyRep} onChange={(e) => update("companyRep", e.target.value)} className={inputCls} placeholder="예: 홍길동" />
                            </FormField>
                            <FormField label="사업자등록번호">
                                <input type="text" value={config.companyBizNum} onChange={(e) => update("companyBizNum", e.target.value)} className={inputCls} placeholder="000-00-00000" />
                            </FormField>
                        </div>
                        <FormField label="주소">
                            <input type="text" value={config.companyAddress} onChange={(e) => update("companyAddress", e.target.value)} className={inputCls} placeholder="예: 서울특별시 강남구 테헤란로 00" />
                        </FormField>
                        <FormField label="법적 문구" hint="업종별 법규 표시 의무 문구">
                            <textarea rows={3} value={config.legalNote} onChange={(e) => update("legalNote", e.target.value)} className={`${inputCls} resize-none`} />
                        </FormField>
                    </div>
                </div>

                {/* Preview panel (desktop only) */}
                {showPreview && (
                    <div className="sticky top-[57px] max-h-[calc(100vh-57px)] overflow-y-auto rounded-2xl border border-neutral-200 bg-white shadow-lg">
                        <div className="bg-neutral-100 px-4 py-2 text-xs font-semibold text-neutral-500 border-b border-neutral-200 flex items-center gap-2">
                            <Eye className="w-3 h-3" />
                            실시간 미리보기
                        </div>
                        <div className="scale-[0.75] origin-top-left w-[133%]" style={{ pointerEvents: "none" }}>
                            <DefaultLandingTemplate config={config} />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile preview toggle */}
            <div className="fixed bottom-6 right-6 md:hidden z-40">
                <button
                    type="button"
                    onClick={() => setShowPreview((v) => !v)}
                    className="flex items-center gap-2 bg-primary-500 text-white font-semibold rounded-2xl px-4 py-3 shadow-lg text-sm"
                >
                    <Eye className="w-4 h-4" />
                    미리보기
                </button>
            </div>

            {/* Mobile full-screen preview */}
            {showPreview && (
                <div className="fixed inset-0 z-50 bg-white overflow-y-auto md:hidden">
                    <div className="sticky top-0 z-10 bg-neutral-100 px-4 py-3 flex items-center justify-between border-b border-neutral-200">
                        <span className="text-sm font-semibold text-neutral-700">미리보기</span>
                        <button type="button" onClick={() => setShowPreview(false)} className="text-sm text-primary-500 font-semibold">닫기</button>
                    </div>
                    <DefaultLandingTemplate config={config} />
                </div>
            )}
        </div>
    );
}
