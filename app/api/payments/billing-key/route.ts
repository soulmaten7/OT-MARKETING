import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ⚠️ TOSS_SECRET_KEY = 절대 코드 하드코딩 X = process.env 에서만
export async function POST(req: NextRequest) {
    try {
        const { authKey, customerKey } = await req.json();
        if (!authKey || !customerKey) {
            return NextResponse.json({ error: "authKey, customerKey 필요" }, { status: 400 });
        }

        const secretKey = process.env.TOSS_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: "결제 설정 오류" }, { status: 500 });
        }

        // 토스 API: 빌링키 발급
        const credentials = Buffer.from(`${secretKey}:`).toString("base64");
        const tossRes = await fetch(
            "https://api.tosspayments.com/v1/billing/authorizations/issue",
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${credentials}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ authKey, customerKey }),
            }
        );

        if (!tossRes.ok) {
            const errBody = await tossRes.json().catch(() => ({}));
            console.error("[billing-key] 토스 API 오류:", errBody);
            return NextResponse.json(
                { error: errBody.message ?? "빌링키 발급 실패" },
                { status: tossRes.status }
            );
        }

        const tossData = await tossRes.json();
        const billingKey: string = tossData.billingKey;

        // Supabase service_role 로 subscriptions 테이블에 저장
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 유저 ID = customerKey (BillingAuthButton 에서 userId = Supabase user.id)
        const userId = customerKey;

        // 기존 구독 조회 (upsert)
        const { data: existing } = await supabase
            .from("subscriptions")
            .select("id")
            .eq("user_id", userId)
            .maybeSingle();

        const nextBillingDate = new Date();
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

        if (existing) {
            await supabase
                .from("subscriptions")
                .update({
                    billing_key: billingKey,
                    customer_key: customerKey,
                    status: "active",
                    next_billing_date: nextBillingDate.toISOString(),
                })
                .eq("user_id", userId);
        } else {
            await supabase.from("subscriptions").insert({
                user_id: userId,
                billing_key: billingKey,
                customer_key: customerKey,
                status: "active",
                plan_name: "구독형 랜딩페이지",
                amount: 0,
                next_billing_date: nextBillingDate.toISOString(),
            });
        }

        return NextResponse.json({ ok: true, customerKey });
    } catch (err) {
        console.error("[billing-key] 서버 오류:", err);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
