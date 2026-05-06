"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type PreRegisterResult = { ok: false; error: string } | { ok: true };

export async function preRegisterAction(formData: FormData): Promise<PreRegisterResult> {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const industry = String(formData.get("industry") ?? "").trim();
    const expectedVisitors = String(formData.get("expected_visitors") ?? "").trim();

    if (!email || !email.includes("@")) {
        return { ok: false, error: "이메일 형식이 올바르지 않습니다." };
    }

    if (!isSupabaseConfigured()) {
        // 환경변수 미설정 시에도 폼은 정상 작동한 것처럼 답변 (조용히 스킵)
        return { ok: true };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("landing_pre_registrants").insert({
        email,
        industry: industry || null,
        expected_visitors: expectedVisitors || null,
    });
    if (error) {
        return { ok: false, error: error.message };
    }
    return { ok: true };
}
