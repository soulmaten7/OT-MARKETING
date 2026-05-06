import Link from "next/link";
import type { Metadata } from "next";
import { SignupForm } from "@/components/blog-sms/SignupForm";

export const metadata: Metadata = {
    title: "회원가입 — OTMarketing 블로그문자",
    description: "1분이면 발급되는 무료 SMS 답신 페이지. 결제 정보 X.",
};

export default function SignupPage() {
    return (
        <div className="bg-[var(--slate-50)] min-h-screen pt-32 pb-20">
            <div className="ot-container max-w-xl">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
                    <h1 className="font-display text-3xl font-bold text-[var(--navy-900)] mb-2">
                        회원가입
                    </h1>
                    <p className="text-[var(--slate-700)] mb-8">
                        평생 무료. 결제 정보 입력 X.
                    </p>
                    <SignupForm />
                    <p className="text-sm text-[var(--slate-500)] mt-8 pt-6 border-t border-slate-200 text-center">
                        이미 가입하셨나요?{" "}
                        <Link
                            href="/blog-sms/login"
                            className="text-[var(--coral-600)] font-semibold hover:underline"
                        >
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
