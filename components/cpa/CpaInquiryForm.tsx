"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

function formatPhone(raw: string): string {
    let digits = raw.replace(/\D/g, "");
    if (digits.length === 10 && digits.startsWith("1")) digits = "0" + digits;
    digits = digits.slice(0, 11);
    if (digits.startsWith("02")) {
        if (digits.length <= 2) return digits;
        if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        if (digits.length <= 9) return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
        return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
    }
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.startsWith("010")) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const selectCls =
    "flex h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent";
const inputCls =
    "flex h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-neutral-400";
const labelCls = "block text-sm font-medium text-neutral-700 mb-1.5";
const errCls = "text-xs text-red-500 mt-1";

interface FormState {
    companyName: string;
    contactPerson: string;
    phone: string;
    email: string;
    industry: string;
    firmSize: string;
    callIncluded: string;
    budget: string;
    message: string;
    privacyAgree: boolean;
}

const INITIAL: FormState = {
    companyName: "", contactPerson: "", phone: "", email: "",
    industry: "", firmSize: "", callIncluded: "", budget: "",
    message: "", privacyAgree: false,
};

export function CpaInquiryForm() {
    const [form, setForm] = useState<FormState>(INITIAL);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function set<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    }

    function validate(): boolean {
        const e: Partial<Record<keyof FormState, string>> = {};
        if (!form.companyName.trim()) e.companyName = "회사명을 입력해주세요.";
        if (!form.contactPerson.trim()) e.contactPerson = "담당자명을 입력해주세요.";
        if (form.phone.replace(/\D/g, "").length < 9) e.phone = "유효한 연락처를 입력해주세요.";
        if (!form.email.includes("@")) e.email = "유효한 이메일을 입력해주세요.";
        if (!form.industry) e.industry = "업종을 선택해주세요.";
        if (!form.firmSize) e.firmSize = "사업장 규모를 선택해주세요.";
        if (!form.callIncluded) e.callIncluded = "1차콜 포함 여부를 선택해주세요.";
        if (!form.budget) e.budget = "예상 월 예산을 선택해주세요.";
        if (!form.privacyAgree) e.privacyAgree = "개인정보 수집 및 이용에 동의해야 합니다.";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, targetCpa: "", currentMethod: "", marketingAgree: false }),
            });
            if (res.ok) setSubmitted(true);
            else alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
        } catch {
            alert("전송 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    }

    if (submitted) {
        return (
            <div className="text-center py-16">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">문의가 접수되었습니다</h3>
                <p className="text-neutral-500 mb-6">
                    담당자가 내용 확인 후 기재해주신 연락처로 빠르게 안내 드리겠습니다.<br />
                    영업일 기준 24시간 이내 회신.
                </p>
                <button
                    onClick={() => { setForm(INITIAL); setSubmitted(false); }}
                    className="text-sm text-primary-500 hover:underline font-medium"
                >
                    추가 문의하기
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelCls}>회사명 <span className="text-red-500">*</span></label>
                    <input className={inputCls} placeholder="OT MARKETING" value={form.companyName}
                        onChange={(e) => set("companyName", e.target.value)} />
                    {errors.companyName && <p className={errCls}>{errors.companyName}</p>}
                </div>
                <div>
                    <label className={labelCls}>담당자명 <span className="text-red-500">*</span></label>
                    <input className={inputCls} placeholder="홍길동 팀장" value={form.contactPerson}
                        onChange={(e) => set("contactPerson", e.target.value)} />
                    {errors.contactPerson && <p className={errCls}>{errors.contactPerson}</p>}
                </div>
                <div>
                    <label className={labelCls}>연락처 <span className="text-red-500">*</span></label>
                    <input className={inputCls} placeholder="010-1234-5678" value={form.phone}
                        onChange={(e) => set("phone", formatPhone(e.target.value))} />
                    {errors.phone && <p className={errCls}>{errors.phone}</p>}
                </div>
                <div>
                    <label className={labelCls}>이메일 <span className="text-red-500">*</span></label>
                    <input className={inputCls} type="email" placeholder="contact@company.com" value={form.email}
                        onChange={(e) => set("email", e.target.value)} />
                    {errors.email && <p className={errCls}>{errors.email}</p>}
                </div>
            </div>

            {/* 마케팅 현황 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelCls}>업종 <span className="text-red-500">*</span></label>
                    <select className={selectCls} value={form.industry}
                        onChange={(e) => set("industry", e.target.value)}>
                        <option value="">선택해주세요</option>
                        <option value="loan">개인회생·채무조정 DB</option>
                        <option value="rental">정수기·생활렌탈 DB</option>
                        <option value="internet">통신·인터넷 DB</option>
                        <option value="finance">주식·투자 DB</option>
                        <option value="realestate">부동산·분양 DB</option>
                        <option value="medical">병의원 DB</option>
                        <option value="etc">기타 전문 서비스</option>
                    </select>
                    {errors.industry && <p className={errCls}>{errors.industry}</p>}
                </div>
                <div>
                    <label className={labelCls}>사업장 규모 <span className="text-red-500">*</span></label>
                    <select className={selectCls} value={form.firmSize}
                        onChange={(e) => set("firmSize", e.target.value)}>
                        <option value="">선택해주세요</option>
                        <option value="solo">1인 사업자</option>
                        <option value="small">소형 (2~5명)</option>
                        <option value="medium">중형 (6~20명)</option>
                        <option value="large">대형 (20명 이상)</option>
                        <option value="agency">대행사·실행사</option>
                    </select>
                    {errors.firmSize && <p className={errCls}>{errors.firmSize}</p>}
                </div>
                <div>
                    <label className={labelCls}>1차콜 포함 여부 <span className="text-red-500">*</span></label>
                    <select className={selectCls} value={form.callIncluded}
                        onChange={(e) => set("callIncluded", e.target.value)}>
                        <option value="">선택해주세요</option>
                        <option value="included">모델 B (OT 콜센터 1차콜 포함)</option>
                        <option value="excluded">모델 A (자체 콜팀 운영)</option>
                        <option value="undecided">미정 (상담 후 결정)</option>
                    </select>
                    {errors.callIncluded && <p className={errCls}>{errors.callIncluded}</p>}
                </div>
                <div>
                    <label className={labelCls}>월 예상 예산 <span className="text-red-500">*</span></label>
                    <select className={selectCls} value={form.budget}
                        onChange={(e) => set("budget", e.target.value)}>
                        <option value="">선택해주세요</option>
                        <option value="under_300">300만원 미만</option>
                        <option value="300_1000">300만원 ~ 1,000만원</option>
                        <option value="1000_3000">1,000만원 ~ 3,000만원</option>
                        <option value="over_3000">3,000만원 이상</option>
                    </select>
                    {errors.budget && <p className={errCls}>{errors.budget}</p>}
                </div>
            </div>

            {/* 문의 내용 */}
            <div>
                <label className={labelCls}>문의 내용 (선택)</label>
                <textarea className={`${inputCls} h-24 resize-none`} placeholder="자유롭게 기재해주세요."
                    value={form.message} onChange={(e) => set("message", e.target.value)} />
            </div>

            {/* 개인정보 동의 */}
            <div className="pt-2 border-t border-neutral-100">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-neutral-300 accent-primary-500"
                        checked={form.privacyAgree} onChange={(e) => set("privacyAgree", e.target.checked)} />
                    <span className="text-xs text-neutral-500 leading-snug">
                        <span className="text-red-500 font-semibold">(필수)</span> 개인정보 수집 및 이용에 동의합니다.{" "}
                        <a href="/privacy" target="_blank" className="underline">약관 보기</a>
                    </span>
                </label>
                {errors.privacyAgree && <p className={`${errCls} ml-7`}>{errors.privacyAgree}</p>}
            </div>

            {/* 제출 */}
            <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center w-full px-8 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-full text-base transition-colors"
            >
                {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />접수 중...</> : "광고 문의하기"}
            </button>
        </form>
    );
}
