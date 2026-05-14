"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";

function FailContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message") ?? "카드 등록이 취소되었습니다.";
    const code = searchParams.get("code");

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
            <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-xl font-bold text-neutral-900 mb-2">카드 등록 실패</h1>
                <p className="text-sm text-neutral-500 mb-2">{message}</p>
                {code && (
                    <p className="text-xs text-neutral-400 mb-6">오류 코드: {code}</p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                    <a
                        href="/subscribe"
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-sm transition-colors"
                    >
                        다시 시도하기
                    </a>
                    <a
                        href="/dashboard"
                        className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold rounded-full text-sm transition-colors"
                    >
                        대시보드로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function SubscribeFailPage() {
    return (
        <Suspense>
            <FailContent />
        </Suspense>
    );
}
