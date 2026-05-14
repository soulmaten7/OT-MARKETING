"use client";

import { useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { Loader2 } from "lucide-react";

interface Props {
    userEmail: string;
    userName: string;
    userId: string;
}

export function BillingAuthButton({ userEmail, userName, userId }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleBillingAuth() {
        setLoading(true);
        setError(null);
        try {
            const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
            if (!clientKey) throw new Error("결제 설정 오류. 잠시 후 다시 시도해주세요.");

            const tossPayments = await loadTossPayments(clientKey);
            const payment = tossPayments.payment({ customerKey: userId });

            const origin = window.location.origin;
            await payment.requestBillingAuth({
                method: "CARD",
                successUrl: `${origin}/subscribe/success`,
                failUrl: `${origin}/subscribe/fail`,
                customerEmail: userEmail,
                customerName: userName || userEmail.split("@")[0],
            });
        } catch (err: unknown) {
            if (err instanceof Error && err.message.includes("PAY_PROCESS_CANCELED")) {
                setError(null);
            } else {
                setError("카드 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-3">
            <button
                onClick={handleBillingAuth}
                disabled={loading}
                className="inline-flex items-center justify-center w-full px-8 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-full text-base transition-colors"
            >
                {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />처리 중...</>
                ) : (
                    "카드 등록하고 구독 시작"
                )}
            </button>
            {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
            )}
        </div>
    );
}
