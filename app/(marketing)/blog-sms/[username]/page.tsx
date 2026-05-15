import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Profile, SmsPage } from "@/lib/supabase/types";
import { SmsButton } from "@/components/blog-sms/SmsButton";
import { getTemplate, RESERVED_USERNAMES } from "@/lib/blog-sms/templates";

type Props = { params: Promise<{ username: string }> };

export const dynamic = "force-dynamic";

async function loadPage(
    username: string,
): Promise<{ profile: Profile; page: SmsPage | null } | null> {
    if (!isSupabaseConfigured()) return null;
    if (RESERVED_USERNAMES.has(username)) return null;
    const supabase = await createClient();
    const profileRes = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .maybeSingle();
    const profile = profileRes.data as Profile | null;
    if (!profile) return null;
    const pageRes = await supabase
        .from("sms_pages")
        .select("*")
        .eq("user_id", profile.id)
        .maybeSingle();
    const page = pageRes.data as SmsPage | null;
    if (!page) return { profile, page: null };
    // 방문 카운트 증가 (best-effort, 실패해도 페이지는 보여줌)
    void supabase
        .from("sms_pages")
        .update({ visit_count: page.visit_count + 1 })
        .eq("id", page.id);
    return { profile, page };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    const data = await loadPage(username);
    if (!data?.page) {
        return { title: `@${username} — OTMarketing 문자문의 만들기` };
    }
    const title = `${data.page.title} — @${username}`;
    const description = data.page.description ?? "OTMarketing 문자문의 만들기로 만든 SMS 페이지";
    const images = data.page.preview_image_url
        ? [{ url: data.page.preview_image_url }]
        : undefined;
    return {
        title,
        description,
        openGraph: { title, description, images, type: "profile" },
        twitter: { card: "summary_large_image", title, description, images: images?.map((i) => i.url) },
    };
}

export default async function PublicUserPage({ params }: Props) {
    const { username } = await params;
    const data = await loadPage(username);
    if (!data) notFound();
    const { profile, page } = data;
    const tpl = page ? getTemplate(page.industry) : undefined;

    return (
        <div className="bg-[var(--slate-50)] min-h-screen pt-32 pb-20">
            <div className="ot-container max-w-2xl">
                <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {page?.preview_image_url && (
                        <div className="aspect-[1200/630] w-full bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={page.preview_image_url}
                                alt={page.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="p-7 md:p-10">
                        {tpl && (
                            <span className="inline-block px-3 py-1 bg-[var(--coral-50)] text-[var(--coral-600)] text-xs font-semibold rounded-full mb-4">
                                {tpl.industry_name}
                            </span>
                        )}
                        <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--navy-900)] mb-3">
                            {page?.title ?? `@${profile.username}`}
                        </h1>
                        <p className="text-[var(--slate-700)] leading-relaxed whitespace-pre-line mb-8">
                            {page?.description ??
                                "아직 페이지가 준비되지 않았습니다. 잠시 후 다시 방문해 주세요."}
                        </p>

                        {page && profile.phone && (
                            <SmsButton
                                pageId={page.id}
                                phone={profile.phone}
                                phonePrivate={profile.phone_private}
                                preFilledMessage={page.pre_filled_message ?? ""}
                            />
                        )}

                        {!profile.phone && (
                            <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-[var(--slate-700)]">
                                이 페이지는 아직 연락처가 등록되지 않았습니다.
                            </div>
                        )}
                    </div>
                </article>

                <div className="mt-8 text-center">
                    <p className="text-xs text-[var(--slate-500)]">
                        Powered by{" "}
                        <Link
                            href="/blog-sms"
                            className="font-semibold text-[var(--navy-900)] hover:underline"
                        >
                            OTMarketing 문자문의 만들기
                        </Link>{" "}
                        — 평생 무료
                    </p>
                </div>
            </div>
        </div>
    );
}
