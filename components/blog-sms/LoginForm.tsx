"use client";

import { useState, useTransition } from "react";
import { loginAction, loginWithGoogleAction } from "@/app/(marketing)/blog-sms/login/actions";

export function LoginForm() {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await loginAction(formData);
            if (res && !res.ok) setError(res.error);
        });
    };

    const handleGoogle = () => {
        setError(null);
        startTransition(async () => {
            const res = await loginWithGoogleAction();
            if (res && !res.ok) setError(res.error);
        });
    };

    return (
        <div className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                        이메일
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        className="ot-input"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        autoComplete="current-password"
                        className="ot-input"
                    />
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
                    {pending ? "로그인 중..." : "로그인"}
                </button>
            </form>

            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                    <span className="px-3 bg-white text-xs text-[var(--slate-500)] uppercase">
                        또는
                    </span>
                </div>
            </div>

            <button
                type="button"
                onClick={handleGoogle}
                disabled={pending}
                className="w-full py-3 rounded-full border border-slate-300 hover:border-[var(--navy-900)] text-[var(--navy-900)] font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden>
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.3C29.6 35 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.5 5.3C41 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
                </svg>
                Google 계정으로 로그인
            </button>
        </div>
    );
}
