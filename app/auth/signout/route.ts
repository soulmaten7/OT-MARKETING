import { NextResponse, type NextRequest } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    const { origin } = new URL(request.url);
    if (isSupabaseConfigured()) {
        const supabase = await createClient();
        await supabase.auth.signOut();
    }
    return NextResponse.redirect(`${origin}/blog-sms`, { status: 303 });
}

export async function GET(request: NextRequest) {
    return POST(request);
}
