import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/blog-sms/LoginForm";

export const metadata: Metadata = {
    title: "로그인 — OTMarketing 블로그문자",
};

export default function LoginPage() {
    return (
        <div className="bg-[var(--slate-50)] min-h-screen pt-32 pb-20">
            <div className="ot-container max-w-xl">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
                    <h1 className="font-display text-3xl font-bold text-[var(--navy-900)] mb-2">
                        로그인
                    </h1>
                    <p className="text-[var(--slate-700)] mb-8">
                        가입하신 이메일·비밀번호를 입력해 주세요.
                    </p>
                    <LoginForm />
                    <p className="text-sm text-[var(--slate-500)] mt-8 pt-6 border-t border-slate-200 text-center">
                        아직 계정이 없으신가요?{" "}
                        <Link
                            href="/blog-sms/signup"
                            className="text-[var(--coral-600)] font-semibold hover:underline"
                        >
                            회원가입
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
