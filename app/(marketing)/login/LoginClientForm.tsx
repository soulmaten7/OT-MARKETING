"use client";

import { useState, useTransition } from "react";
import { unifiedLoginAction } from "./actions";

export function LoginClientForm() {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await unifiedLoginAction(formData);
            if (res && !res.ok) setError(res.error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">
                    이메일
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
                    비밀번호
                </label>
                <input
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors text-sm"
                    placeholder="비밀번호 입력"
                />
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
                {pending ? "로그인 중..." : "로그인"}
            </button>
        </form>
    );
}
