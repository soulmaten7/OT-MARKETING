"use server";

import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { validateUsername } from "@/lib/blog-sms/templates";

export type SignupResult = { ok: false; error: string } | { ok: true };

export async function signupAction(formData: FormData): Promise<SignupResult> {
    if (!isSupabaseConfigured()) {
        return { ok: false, error: "현재 회원가입 점검 중입니다. 잠시 후 다시 시도해 주세요." };
    }

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const username = String(formData.get("username") ?? "").trim().toLowerCase();
    const phone = String(formData.get("phone") ?? "").trim();
    const phonePrivate = formData.get("phone_private") === "on";
    const agree = formData.get("agree") === "on";

    if (!agree) return { ok: false, error: "약관에 동의해 주세요." };
    if (!email || !email.includes("@")) return { ok: false, error: "이메일 형식이 올바르지 않습니다." };
    if (password.length < 8) return { ok: false, error: "비밀번호는 8자 이상이어야 합니다." };

    const v = validateUsername(username);
    if (!v.ok) return { ok: false, error: v.error ?? "아이디가 올바르지 않습니다." };

    const supabase = await createClient();

    // 중복 아이디 체크
    const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();
    if (existing) return { ok: false, error: "이미 사용 중인 아이디입니다." };

    // Supabase Auth 가입
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username, phone, phone_private: phonePrivate },
        },
    });
    if (error) return { ok: false, error: error.message };

    const userId = data.user?.id;
    if (!userId) {
        return { ok: false, error: "가입은 성공했으나 세션을 받지 못했습니다. 이메일을 확인 후 다시 로그인해 주세요." };
    }

    // profiles row 생성 (RLS = 본인만 insert)
    const { error: profileErr } = await supabase.from("profiles").insert({
        id: userId,
        username,
        phone: phone || null,
        phone_private: phonePrivate,
    });
    if (profileErr && !profileErr.message.includes("duplicate")) {
        return { ok: false, error: `프로필 생성 실패: ${profileErr.message}` };
    }

    redirect("/blog-sms/dashboard");
}
