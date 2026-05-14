import type { Metadata } from "next";
import { LoginClientForm } from "./LoginClientForm";

export const metadata: Metadata = {
    title: "로그인 — OT MARKETING",
    robots: { index: false, follow: false },
};

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* 로고 */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-block">
                        <span className="text-2xl font-bold text-neutral-900">OT MARKETING</span>
                    </a>
                </div>

                {/* 카드 */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-1">다시 오셨네요</h1>
                    <p className="text-sm text-neutral-500 mb-8">
                        이메일·비밀번호로 로그인하세요
                    </p>

                    <LoginClientForm />

                    <div className="mt-6 pt-6 border-t border-neutral-100 text-center space-y-2">
                        <p className="text-sm text-neutral-500">
                            <a href="#" className="text-neutral-500 hover:text-neutral-700 underline">
                                비밀번호를 잊으셨나요?
                            </a>
                        </p>
                        <p className="text-sm text-neutral-500">
                            계정이 없으신가요?{" "}
                            <a href="/signup" className="text-primary-500 font-semibold hover:underline">
                                회원가입
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
