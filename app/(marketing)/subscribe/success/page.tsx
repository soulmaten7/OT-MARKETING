"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [state, setState] = useState<"loading" | "success" | "error">("loading");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const authKey = searchParams.get("authKey");
        const customerKey = searchParams.get("customerKey");

        if (!authKey || !customerKey) {
            setState("error");
            setErrorMsg("잘못된 접근입니다.");
            return;
        }

        (async () => {
            try {
                // 1. 빌링키 발급
                const billingRes = await fetch("/api/payments/billing-key", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ authKey, customerKey }),
                });

                if (!billingRes.ok) {
                    const err = await billingRes.json().catch(() => ({}));
                    throw new Error(err.error ?? "빌링키 발급 실패");
                }

                // 2. 첫 결제 (가격이 0이면 Supabase 상태만 업데이트)
                const amount = Number(process.env.NEXT_PUBLIC_PLAN_AMOUNT ?? 0);
                if (amount > 0) {
                    const orderId = `OT-${Date.now()}-${customerKey.slice(0, 8)}`;
                    const chargeRes = await fetch("/api/payments/billing-charge", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            customerKey,
                            amount,
                            orderId,
                            orderName: "구독형 랜딩페이지",
                        }),
                    });

                    if (!chargeRes.ok) {
                        const err = await chargeRes.json().catch(() => ({}));
                        throw new Error(err.error ?? "결제 승인 실패");
                    }
                } else {
                    // 가격 미확정 상태 = 빌링키만 저장 (status active 로 profiles 갱신)
                    await fetch("/api/payments/billing-key/activate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ customerKey }),
                    }).catch(() => {});
                }

                setState("success");
                setTimeout(() => router.push("/dashboard"), 3000);
            } catch (err: unknown) {
                setState("error");
                setErrorMsg(err instanceof Error ? err.message : "오류가 발생했습니다.");
            }
        })();
    }, [searchParams, router]);

    if (state === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary-500 animate-spin mx-auto mb-4" />
                    <p className="text-neutral-600 font-medium">결제 처리 중...</p>
                    <p className="text-sm text-neutral-400 mt-1">잠시만 기다려주세요.</p>
                </div>
            </div>
        );
    }

    if (state === "error") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center max-w-sm px-6">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-xl font-bold text-neutral-900 mb-2">결제 처리 실패</h1>
                    <p className="text-sm text-neutral-500 mb-6">{errorMsg}</p>
                    <a
                        href="/subscribe"
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-sm transition-colors"
                    >
                        다시 시도하기
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
            <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h1 className="text-xl font-bold text-neutral-900 mb-2">구독이 시작되었습니다!</h1>
                <p className="text-sm text-neutral-500 mb-6">
                    구독형 랜딩페이지를 이제 사용할 수 있습니다.<br />
                    잠시 후 대시보드로 이동합니다.
                </p>
                <a
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-sm transition-colors"
                >
                    대시보드 바로 가기
                </a>
            </div>
        </div>
    );
}

export default function SubscribeSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
