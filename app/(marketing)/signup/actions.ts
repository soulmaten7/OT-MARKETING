"use server";

import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { validateUsername } from "@/lib/blog-sms/templates";

export type SignupResult = { ok: false; error: string } | { ok: true };

export async function unifiedSignupAction(formData: FormData): Promise<SignupResult> {
    if (!isSupabaseConfigured()) {
        return { ok: false, error: "현재 회원가입 점검 중입니다. 잠시 후 다시 시도해 주세요." };
    }

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const passwordConfirm = String(formData.get("password_confirm") ?? "");
    const agree = formData.get("agree") === "on";
    const agreePrivacy = formData.get("agree_privacy") === "on";

    if (!agree || !agreePrivacy) return { ok: false, error: "필수 약관에 동의해 주세요." };
    if (!email || !email.includes("@")) return { ok: false, error: "이메일 형식이 올바르지 않습니다." };
    if (password.length < 8) return { ok: false, error: "비밀번호는 8자 이상이어야 합니다." };
    if (password !== passwordConfirm) return { ok: false, error: "비밀번호가 일치하지 않습니다." };

    // username = 이메일 앞부분 자동 생성 (추후 프로필 편집으로 변경 가능)
    const rawUsername = email.split("@")[0].replace(/[^a-z0-9_-]/g, "").slice(0, 20) || "user";
    const usernameBase = rawUsername.length >= 4 ? rawUsername : rawUsername + "0001";

    const supabase = await createClient();

    // 중복 아이디 체크 → 중복이면 타임스탬프 suffix 추가
    const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", usernameBase)
        .maybeSingle();

    const username = existing ? `${usernameBase}${Date.now().toString().slice(-4)}` : usernameBase;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username, phone: null, phone_private: false },
        },
    });
    if (error) return { ok: false, error: error.message };

    const userId = data.user?.id;
    if (!userId) {
        return { ok: false, error: "가입은 성공했으나 세션을 받지 못했습니다. 이메일 확인 후 로그인해 주세요." };
    }

    // profiles 행 생성
    await supabase.from("profiles").upsert({
        id: userId,
        username,
        display_name: null,
        phone: null,
        phone_private: false,
        blog_sms_enabled: true,
        landing_subscription_status: "none",
        cpa_inquiry_status: "none",
    });

    redirect("/dashboard");
}
