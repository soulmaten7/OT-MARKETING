import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 가격 미확정 시 = 빌링키만 저장된 상태에서 profiles 구독 활성화
export async function POST(req: NextRequest) {
    try {
        const { customerKey } = await req.json();
        if (!customerKey) {
            return NextResponse.json({ error: "customerKey 필요" }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        await supabase
            .from("profiles")
            .update({
                landing_subscription_status: "active",
                landing_subscription_plan: "구독형 랜딩페이지",
                landing_subscription_started_at: new Date().toISOString(),
            })
            .eq("id", customerKey);

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[billing-key/activate] 서버 오류:", err);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
