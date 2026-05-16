import type { Metadata } from "next";
import { SignupClientForm } from "./SignupClientForm";

export const metadata: Metadata = {
    title: "회원가입 — One Trillion",
    description: "문자문의 만들기는 무료로 바로 사용할 수 있어요. 1분이면 시작됩니다.",
    robots: { index: false, follow: false },
};

export default function SignupPage() {
    return (
        <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* 로고 */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-block">
                        <span className="text-2xl font-bold text-neutral-900">One Trillion</span>
                    </a>
                </div>

                {/* 카드 */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-1">One Trillion 시작하기</h1>
                    <p className="text-sm text-neutral-500 mb-8">
                        문자문의 만들기는 무료로 바로 사용할 수 있어요
                    </p>

                    <SignupClientForm />

                    <p className="text-sm text-neutral-500 mt-8 pt-6 border-t border-neutral-100 text-center">
                        이미 계정이 있으신가요?{" "}
                        <a href="/login" className="text-primary-500 font-semibold hover:underline">
                            로그인
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
