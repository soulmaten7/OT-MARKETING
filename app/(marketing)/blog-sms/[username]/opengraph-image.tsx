import { ImageResponse } from "next/og";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getTemplate } from "@/lib/blog-sms/templates";
import type { Profile, SmsPage } from "@/lib/supabase/types";

export const runtime = "nodejs";
export const alt = "One Trillion 문자문의 만들기 페이지";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;

    let title = `@${username}`;
    let description = "One Trillion 문자문의 만들기 — 무료 SMS 답신 페이지";
    let industryName = "";

    if (isSupabaseConfigured()) {
        try {
            const supabase = await createClient();
            const profileRes = await supabase
                .from("profiles")
                .select("*")
                .eq("username", username)
                .maybeSingle();
            const profile = profileRes.data as Profile | null;
            if (profile) {
                const pageRes = await supabase
                    .from("sms_pages")
                    .select("*")
                    .eq("user_id", profile.id)
                    .maybeSingle();
                const page = pageRes.data as SmsPage | null;
                if (page) {
                    title = page.title;
                    description = page.description ?? description;
                    const tpl = getTemplate(page.industry);
                    industryName = tpl?.industry_name ?? page.industry;
                }
            }
        } catch {
            // ignore — fall back to defaults
        }
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "linear-gradient(135deg, #0F1E3D 0%, #1C2E5A 50%, #C5A572 130%)",
                    padding: "80px",
                    color: "white",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                        style={{
                            background: "rgba(255,255,255,0.12)",
                            padding: "8px 18px",
                            borderRadius: 999,
                            fontSize: 22,
                            fontWeight: 600,
                            letterSpacing: 1,
                        }}
                    >
                        One Trillion 문자문의 만들기
                    </div>
                    {industryName && (
                        <div
                            style={{
                                background: "#F97316",
                                padding: "8px 18px",
                                borderRadius: 999,
                                fontSize: 22,
                                fontWeight: 700,
                            }}
                        >
                            {industryName}
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.15 }}>
                        {title.length > 60 ? title.slice(0, 60) + "…" : title}
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            fontWeight: 400,
                            color: "rgba(255,255,255,0.85)",
                            lineHeight: 1.4,
                            maxWidth: 1000,
                        }}
                    >
                        {description.length > 140
                            ? description.slice(0, 140) + "…"
                            : description}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        fontSize: 24,
                        color: "rgba(255,255,255,0.75)",
                    }}
                >
                    <div>📱 ot-marketing.kr/blog-sms/{username}</div>
                    <div>평생 무료</div>
                </div>
            </div>
        ),
        size,
    );
}
