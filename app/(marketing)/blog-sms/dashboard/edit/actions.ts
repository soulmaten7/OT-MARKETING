"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type SaveResult = { ok: false; error: string } | { ok: true };

export async function savePageAction(formData: FormData): Promise<SaveResult> {
    if (!isSupabaseConfigured()) {
        return { ok: false, error: "Supabase 가 설정되지 않았습니다." };
    }
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false, error: "로그인이 필요합니다." };

    const { data: profile } = await supabase
        .from("profiles")
        .select("username, phone_private")
        .eq("id", user.id)
        .maybeSingle();
    if (!profile) return { ok: false, error: "프로필을 찾을 수 없습니다." };

    const industry = String(formData.get("industry") ?? "general");
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const message = String(formData.get("pre_filled_message") ?? "").trim();
    const previewImageUrl = String(formData.get("preview_image_url") ?? "").trim();
    const phonePrivate = formData.get("phone_private") === "on";

    if (!title) return { ok: false, error: "제목을 입력해 주세요." };
    if (title.length > 80) return { ok: false, error: "제목은 80자 이하여야 합니다." };
    if (description.length > 500) return { ok: false, error: "설명은 500자 이하여야 합니다." };
    if (message.length > 500) return { ok: false, error: "메시지는 500자 이하여야 합니다." };

    // phone_private toggle 동기화
    await supabase
        .from("profiles")
        .update({ phone_private: phonePrivate })
        .eq("id", user.id);

    const upsertPayload = {
        user_id: user.id,
        slug: profile.username,
        industry,
        title,
        description: description || null,
        pre_filled_message: message || null,
        preview_image_url: previewImageUrl || null,
        updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase
        .from("sms_pages")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (existing) {
        const { error } = await supabase
            .from("sms_pages")
            .update(upsertPayload)
            .eq("id", existing.id);
        if (error) return { ok: false, error: error.message };
    } else {
        const { error } = await supabase.from("sms_pages").insert(upsertPayload);
        if (error) return { ok: false, error: error.message };
    }

    revalidatePath(`/blog-sms/${profile.username}`);
    revalidatePath("/blog-sms/dashboard");
    redirect("/blog-sms/dashboard");
}
