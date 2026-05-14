import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ⚠️ TOSS_SECRET_KEY = 절대 코드 하드코딩 X = process.env 에서만
export async function POST(req: NextRequest) {
    try {
        const { customerKey, amount, orderId, orderName } = await req.json();
        if (!customerKey || !amount || !orderId || !orderName) {
            return NextResponse.json(
                { error: "customerKey, amount, orderId, orderName 필요" },
                { status: 400 }
            );
        }

        const secretKey = process.env.TOSS_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: "결제 설정 오류" }, { status: 500 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 빌링키 조회
        const { data: sub } = await supabase
            .from("subscriptions")
            .select("id, billing_key")
            .eq("customer_key", customerKey)
            .eq("status", "active")
            .maybeSingle();

        if (!sub?.billing_key) {
            return NextResponse.json({ error: "등록된 결제 수단 없음" }, { status: 404 });
        }

        // payment_logs: pending 기록
        await supabase.from("payment_logs").insert({
            user_id: customerKey,
            subscription_id: sub.id,
            order_id: orderId,
            order_name: orderName,
            amount,
            status: "pending",
        });

        // 토스 API: 정기결제 승인
        const credentials = Buffer.from(`${secretKey}:`).toString("base64");
        const tossRes = await fetch(
            `https://api.tosspayments.com/v1/billing/${sub.billing_key}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${credentials}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customerKey, amount, orderId, orderName }),
            }
        );

        if (!tossRes.ok) {
            const errBody = await tossRes.json().catch(() => ({}));
            console.error("[billing-charge] 토스 API 오류:", errBody);

            // 결제 실패 → payment_logs 갱신, profiles 상태 past_due
            await supabase
                .from("payment_logs")
                .update({ status: "failed" })
                .eq("order_id", orderId);

            await supabase
                .from("profiles")
                .update({ landing_subscription_status: "past_due" })
                .eq("id", customerKey);

            return NextResponse.json(
                { error: errBody.message ?? "결제 승인 실패" },
                { status: tossRes.status }
            );
        }

        const tossData = await tossRes.json();

        // 결제 성공 → payment_logs 갱신
        await supabase
            .from("payment_logs")
            .update({
                status: "success",
                toss_payment_key: tossData.paymentKey,
            })
            .eq("order_id", orderId);

        // profiles landing_subscription_status = 'active'
        await supabase
            .from("profiles")
            .update({
                landing_subscription_status: "active",
                landing_subscription_plan: orderName,
                landing_subscription_started_at: new Date().toISOString(),
            })
            .eq("id", customerKey);

        // subscriptions next_billing_date 갱신
        const next = new Date();
        next.setMonth(next.getMonth() + 1);
        await supabase
            .from("subscriptions")
            .update({ amount, next_billing_date: next.toISOString() })
            .eq("id", sub.id);

        return NextResponse.json({ ok: true, paymentKey: tossData.paymentKey });
    } catch (err) {
        console.error("[billing-charge] 서버 오류:", err);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
