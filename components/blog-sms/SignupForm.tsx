"use client";

import { useState, useTransition } from "react";
import { signupAction } from "@/app/(marketing)/blog-sms/signup/actions";

export function SignupForm() {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [agreeAll, setAgreeAll] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await signupAction(formData);
            if (res && !res.ok) setError(res.error);
        });
    };

    const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAgreeAll(checked);
        const form = e.target.form;
        if (!form) return;
        ["agree", "agree_marketing", "agree_privacy"].forEach((name) => {
            const el = form.elements.namedItem(name) as HTMLInputElement | null;
            if (el) el.checked = checked;
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <FieldLabel label="이메일" required>
                <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="ot-input"
                    placeholder="you@example.com"
                />
            </FieldLabel>
            <FieldLabel label="비밀번호" required hint="8자 이상">
                <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="ot-input"
                />
            </FieldLabel>
            <FieldLabel
                label="고유 아이디"
                required
                hint="영문 소문자·숫자·_·- 4~20자, 변경 불가"
            >
                <div className="flex items-center gap-2">
                    <span className="text-[var(--slate-500)] text-sm whitespace-nowrap">
                        ot-marketing.kr/blog-sms/
                    </span>
                    <input
                        type="text"
                        name="username"
                        required
                        pattern="[a-z0-9_-]{4,20}"
                        className="ot-input flex-1"
                        placeholder="myshop01"
                    />
                </div>
            </FieldLabel>
            <FieldLabel label="휴대폰 번호" hint="070·010 모두 가능. SMS 답신을 받을 번호.">
                <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    className="ot-input"
                    placeholder="010-0000-0000"
                />
            </FieldLabel>
            <label className="flex items-start gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    name="phone_private"
                    className="mt-1 w-5 h-5 accent-[var(--coral-500)]"
                />
                <span className="text-sm text-[var(--slate-700)]">
                    번호를 페이지에 노출하지 않습니다 (비공개 모드)
                </span>
            </label>

            <div className="border-t border-slate-200 pt-5">
                <label className="flex items-start gap-3 cursor-pointer mb-3">
                    <input
                        type="checkbox"
                        checked={agreeAll}
                        onChange={toggleAll}
                        className="mt-1 w-5 h-5 accent-[var(--coral-500)]"
                    />
                    <span className="font-semibold text-[var(--navy-900)]">전체 동의</span>
                </label>
                <div className="pl-8 space-y-2 text-sm text-[var(--slate-700)]">
                    <label className="flex items-start gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="agree"
                            required
                            className="mt-0.5 w-4 h-4 accent-[var(--coral-500)]"
                        />
                        <span>
                            (필수) 서비스 이용약관 동의 ·{" "}
                            <a href="/terms" className="underline">
                                보기
                            </a>
                        </span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="agree_privacy"
                            required
                            className="mt-0.5 w-4 h-4 accent-[var(--coral-500)]"
                        />
                        <span>
                            (필수) 개인정보 수집·이용 동의 ·{" "}
                            <a href="/privacy" className="underline">
                                보기
                            </a>
                        </span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="agree_marketing"
                            className="mt-0.5 w-4 h-4 accent-[var(--coral-500)]"
                        />
                        <span>(선택) 마케팅 정보 수신 동의</span>
                    </label>
                </div>
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={pending}
                className="w-full py-4 rounded-full bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-semibold transition-colors disabled:opacity-50"
            >
                {pending ? "가입 중..." : "무료로 시작하기"}
            </button>
        </form>
    );
}

function FieldLabel({
    label,
    children,
    required,
    hint,
}: {
    label: string;
    children: React.ReactNode;
    required?: boolean;
    hint?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                {label}
                {required && <span className="text-[var(--coral-500)] ml-1">*</span>}
            </label>
            {children}
            {hint && <p className="text-xs text-[var(--slate-500)] mt-1.5">{hint}</p>}
        </div>
    );
}
