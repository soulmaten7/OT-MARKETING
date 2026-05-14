"use client";

import { useState, useTransition } from "react";
import { unifiedSignupAction } from "./actions";

export function SignupClientForm() {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [agreeAll, setAgreeAll] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await unifiedSignupAction(formData);
            if (res && !res.ok) setError(res.error);
        });
    };

    const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAgreeAll(checked);
        const form = e.target.form;
        if (!form) return;
        ["agree", "agree_privacy", "agree_marketing"].forEach((name) => {
            const el = form.elements.namedItem(name) as HTMLInputElement | null;
            if (el) el.checked = checked;
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">
                    이메일 <span className="text-ot-error">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors text-sm"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">
                    비밀번호 <span className="text-ot-error">*</span>
                </label>
                <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors text-sm"
                    placeholder="8자 이상"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">
                    비밀번호 확인 <span className="text-ot-error">*</span>
                </label>
                <input
                    type="password"
                    name="password_confirm"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors text-sm"
                    placeholder="비밀번호 재입력"
                />
            </div>

            {/* 약관 */}
            <div className="border-t border-neutral-100 pt-5">
                <label className="flex items-start gap-3 cursor-pointer mb-3">
                    <input
                        type="checkbox"
                        checked={agreeAll}
                        onChange={toggleAll}
                        className="mt-0.5 w-4 h-4 accent-primary-500 rounded"
                    />
                    <span className="text-sm font-semibold text-neutral-800">전체 동의</span>
                </label>
                <div className="pl-7 space-y-2.5 text-sm text-neutral-600">
                    <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" name="agree" required className="mt-0.5 w-4 h-4 accent-primary-500" />
                        <span>
                            (필수) 서비스 이용약관 동의 ·{" "}
                            <a href="/terms" className="underline">보기</a>
                        </span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" name="agree_privacy" required className="mt-0.5 w-4 h-4 accent-primary-500" />
                        <span>
                            (필수) 개인정보 수집·이용 동의 ·{" "}
                            <a href="/privacy" className="underline">보기</a>
                        </span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" name="agree_marketing" className="mt-0.5 w-4 h-4 accent-primary-500" />
                        <span>(선택) 마케팅 정보 수신 동의</span>
                    </label>
                </div>
            </div>

            {error && (
                <div className="rounded-xl bg-red-50 border border-ot-error px-4 py-3 text-sm text-ot-error">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={pending}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
            >
                {pending ? "가입 중..." : "무료로 시작하기"}
            </button>
        </form>
    );
}
