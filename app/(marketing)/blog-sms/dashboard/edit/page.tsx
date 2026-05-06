import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { EditForm } from "@/components/blog-sms/EditForm";
import { INDUSTRY_TEMPLATES } from "@/lib/blog-sms/templates";
import { UpsellBanner } from "@/components/blog-sms/UpsellBanner";
import Link from "next/link";

export const metadata: Metadata = {
    title: "페이지 편집 — OTMarketing 블로그문자",
};

export const dynamic = "force-dynamic";

export default async function EditPage() {
    if (!isSupabaseConfigured()) {
        return (
            <div className="min-h-screen pt-32 pb-20 ot-container max-w-2xl text-center">
                <p className="text-[var(--slate-700)]">Supabase 점검 중입니다.</p>
                <Link
                    href="/blog-sms"
                    className="text-[var(--coral-600)] underline mt-4 inline-block"
                >
                    메인으로
                </Link>
            </div>
        );
    }
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/blog-sms/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
    const { data: page } = await supabase
        .from("sms_pages")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    return (
        <div className="bg-[var(--slate-50)] min-h-screen pt-32 pb-20">
            <div className="ot-container max-w-3xl">
                <UpsellBanner />
                <header className="mb-8">
                    <Link
                        href="/blog-sms/dashboard"
                        className="text-sm text-[var(--slate-500)] hover:text-[var(--navy-900)] mb-4 inline-block"
                    >
                        ← 대시보드
                    </Link>
                    <h1 className="font-display text-3xl font-bold text-[var(--navy-900)]">
                        페이지 편집
                    </h1>
                    <p className="text-[var(--slate-700)] mt-1">
                        14 업종 템플릿 중 1 개를 선택하면 제목·설명·메시지가 자동 채워집니다.
                    </p>
                </header>
                <EditForm
                    templates={INDUSTRY_TEMPLATES}
                    initialPage={page ?? null}
                    initialPhonePrivate={profile?.phone_private ?? false}
                    username={profile?.username ?? ""}
                />
            </div>
        </div>
    );
}
