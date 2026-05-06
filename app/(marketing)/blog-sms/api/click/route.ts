import { NextResponse, type NextRequest } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    if (!isSupabaseConfigured()) {
        return NextResponse.json({ ok: false }, { status: 200 });
    }
    const pageId = new URL(request.url).searchParams.get("page");
    if (!pageId) return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = await createClient();
    const { data: row } = await supabase
        .from("sms_pages")
        .select("click_count")
        .eq("id", pageId)
        .maybeSingle();
    if (!row) return NextResponse.json({ ok: false }, { status: 404 });

    await supabase
        .from("sms_pages")
        .update({ click_count: row.click_count + 1 })
        .eq("id", pageId);

    return NextResponse.json({ ok: true });
}
