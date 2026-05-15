import { NextRequest, NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const DEV_BYPASS_AUTH = process.env.BYPASS_AUTH_DEV === "true";

// POST — 신규 draft 생성
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { slug, industry, title, config, status = "draft" } = body;

        if (!slug || !industry || !title) {
            return NextResponse.json({ error: "slug, industry, title 은 필수입니다" }, { status: 400 });
        }

        if (DEV_BYPASS_AUTH || !isSupabaseConfigured()) {
            // 개발 모드 = mock 저장 성공 반환
            return NextResponse.json({ id: `dev-${Date.now()}`, slug, status, created: true });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
        }

        const { data, error } = await supabase
            .from("landing_pages")
            .insert({
                user_id: user.id,
                slug,
                industry,
                title,
                config: config ?? {},
                status,
                published_at: status === "published" ? new Date().toISOString() : null,
            })
            .select("id, slug, status")
            .single();

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json({ error: "이미 사용 중인 slug입니다. 다른 주소를 입력해주세요." }, { status: 409 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch {
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}

// PATCH — 기존 LP 수정 (config 업데이트 또는 발행 상태 변경)
export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, slug, title, config, status } = body;

        if (!id) {
            return NextResponse.json({ error: "id 는 필수입니다" }, { status: 400 });
        }

        if (DEV_BYPASS_AUTH || !isSupabaseConfigured()) {
            return NextResponse.json({ id, slug, status, updated: true });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
        }

        const updatePayload: Record<string, unknown> = {};
        if (slug !== undefined) updatePayload.slug = slug;
        if (title !== undefined) updatePayload.title = title;
        if (config !== undefined) updatePayload.config = config;
        if (status !== undefined) {
            updatePayload.status = status;
            if (status === "published") updatePayload.published_at = new Date().toISOString();
        }

        const { data, error } = await supabase
            .from("landing_pages")
            .update(updatePayload)
            .eq("id", id)
            .eq("user_id", user.id)
            .select("id, slug, status")
            .single();

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json({ error: "이미 사용 중인 slug입니다. 다른 주소를 입력해주세요." }, { status: 409 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
