import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";
import type { Profile } from "@/lib/supabase/types";

export const metadata: Metadata = {
    title: "대시보드 — One Trillion",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// STEP_105 — 개발 모드 인증 우회 플래그 (next.config.mjs env 통해 정적 주입)
const DEV_BYPASS_AUTH = process.env.BYPASS_AUTH_DEV === 'true'

const DEV_MOCK_PROFILE: Profile = {
    id: 'dev-mock',
    username: 'dev',
    display_name: '개발 모드',
    phone: null,
    phone_private: false,
    created_at: new Date().toISOString(),
    landing_subscription_status: 'active',
    landing_subscription_plan: '구독형 랜딩페이지 (개발 모드)',
    landing_subscription_started_at: new Date().toISOString(),
    blog_sms_enabled: true,
    cpa_inquiry_status: 'none',
}

export default async function DashboardPage() {
    // STEP_105 — 개발 모드 = mock 사용자·프로필 반환
    if (DEV_BYPASS_AUTH) {
        return (
            <DashboardClient
                userEmail="dev@ot-marketing.kr"
                profile={DEV_MOCK_PROFILE}
                landingPageCount={2}
            />
        );
    }

    if (!isSupabaseConfigured()) {
        return (
            <main className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <p className="text-neutral-500">서비스 점검 중입니다. 잠시 후 다시 시도해 주세요.</p>
            </main>
        );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const [{ data: profile }, { count: landingPageCount }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("landing_pages").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    ]);

    return (
        <DashboardClient
            userEmail={user.email ?? ""}
            profile={profile as Profile | null}
            landingPageCount={landingPageCount ?? 0}
        />
    );
}
