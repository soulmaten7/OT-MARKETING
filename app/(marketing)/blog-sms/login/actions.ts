"use server";

import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type LoginResult = { ok: false; error: string } | { ok: true };

export async function loginAction(formData: FormData): Promise<LoginResult> {
    if (!isSupabaseConfigured()) {
        return { ok: false, error: "현재 로그인 점검 중입니다. 잠시 후 다시 시도해 주세요." };
    }

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
        return { ok: false, error: "이메일과 비밀번호를 입력해 주세요." };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        return { ok: false, error: error.message };
    }

    redirect("/blog-sms/dashboard");
}

export async function loginWithGoogleAction(): Promise<LoginResult> {
    if (!isSupabaseConfigured()) {
        return { ok: false, error: "OAuth 미설정" };
    }
    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ot-marketing.kr";
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${siteUrl}/auth/callback` },
    });
    if (error) return { ok: false, error: error.message };
    if (data.url) redirect(data.url);
    return { ok: true };
}
