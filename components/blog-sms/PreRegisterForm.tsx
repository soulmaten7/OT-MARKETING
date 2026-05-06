"use client";

import { useState, useTransition } from "react";
import { preRegisterAction } from "@/app/(marketing)/blog-sms/landing-pre-register/actions";

const INDUSTRY_OPTIONS = [
    "일반·기타",
    "예약·상담",
    "부동산·중개",
    "법률·법무",
    "세무·회계",
    "보험",
    "중고차",
    "인테리어·리모델링",
    "과외·교육",
    "헬스·PT",
    "미용·이용",
    "청소·이사",
    "채용·구인",
    "기타",
];

export function PreRegisterForm() {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await preRegisterAction(fd);
            if (res.ok) setDone(true);
            else setError(res.error);
        });
    };

    if (done) {
        return (
            <div className="rounded-xl bg-[var(--coral-50)] border border-[var(--coral-400)] px-5 py-6 text-center">
                <div className="text-4xl mb-2">✅</div>
                <p className="font-bold text-[var(--navy-900)] mb-1">사전 등록이 완료됐습니다.</p>
                <p className="text-sm text-[var(--slate-700)]">
                    출시 시 1순위로 알려드릴게요. 곧 다시 만나요.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                    이메일 <span className="text-[var(--coral-500)]">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="ot-input"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                    업종 (선택)
                </label>
                <select name="industry" className="ot-input" defaultValue="">
                    <option value="">선택하지 않음</option>
                    {INDUSTRY_OPTIONS.map((i) => (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                    예상 월 방문자 (선택)
                </label>
                <select name="expected_visitors" className="ot-input" defaultValue="">
                    <option value="">선택하지 않음</option>
                    <option value="< 100">월 100 이하</option>
                    <option value="100~500">월 100~500</option>
                    <option value="500~2000">월 500~2,000</option>
                    <option value="2000+">월 2,000+</option>
                </select>
            </div>
            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}
            <button
                type="submit"
                disabled={pending}
                className="w-full py-4 rounded-full bg-[var(--navy-900)] hover:bg-[var(--navy-800)] text-white font-semibold transition-colors disabled:opacity-50"
            >
                {pending ? "등록 중..." : "사전 등록하기"}
            </button>
            <p className="text-xs text-[var(--slate-500)] text-center">
                결제·신용카드 정보 X · 출시 알림 외에는 이메일을 보내지 않습니다.
            </p>
        </form>
    );
}
