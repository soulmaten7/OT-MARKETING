import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";
import type { Profile } from "@/lib/supabase/types";

export const metadata: Metadata = {
    title: "대시보드 — OT MARKETING",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
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

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    return (
        <DashboardClient
            userEmail={user.email ?? ""}
            profile={profile as Profile | null}
        />
    );
}
