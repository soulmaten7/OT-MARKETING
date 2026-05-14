import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { UpsellBanner } from "@/components/blog-sms/UpsellBanner";
import { getTemplate } from "@/lib/blog-sms/templates";

export const metadata: Metadata = {
    title: "내 페이지 — OTMarketing 블로그문자",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    if (!isSupabaseConfigured()) {
        return <NotConfigured />;
    }
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    const { data: page } = await supabase
        .from("sms_pages")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ot-marketing.kr";
    const publicUrl = profile ? `${baseUrl}/blog-sms/${profile.username}` : "";
    const tpl = page ? getTemplate(page.industry) : undefined;

    return (
        <div className="bg-[var(--slate-50)] min-h-screen pt-32 pb-20">
            <div className="ot-container max-w-4xl">
                <UpsellBanner />

                <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-[var(--navy-900)]">
                            내 페이지
                        </h1>
                        <p className="text-[var(--slate-700)] mt-1">
                            안녕하세요,{" "}
                            <span className="font-semibold">
                                {profile?.display_name ?? profile?.username ?? user.email}
                            </span>{" "}
                            님
                        </p>
                    </div>
                    <form action="/auth/signout" method="post">
                        <button className="text-sm text-[var(--slate-500)] hover:text-[var(--navy-900)] underline">
                            로그아웃
                        </button>
                    </form>
                </header>

                {!page ? (
                    <EmptyPageCard />
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-[var(--coral-50)] text-[var(--coral-600)] text-xs font-semibold rounded-full">
                                    {tpl?.industry_name ?? page.industry}
                                </span>
                                {profile?.phone_private && (
                                    <span className="px-3 py-1 bg-slate-100 text-[var(--slate-700)] text-xs font-semibold rounded-full">
                                        비공개 번호
                                    </span>
                                )}
                            </div>
                            <h2 className="font-display text-2xl font-bold text-[var(--navy-900)] mb-2">
                                {page.title}
                            </h2>
                            <p className="text-[var(--slate-700)] mb-6 whitespace-pre-line">
                                {page.description}
                            </p>
                            <div className="rounded-xl bg-[var(--slate-50)] border border-slate-200 px-4 py-3 mb-6">
                                <div className="text-xs text-[var(--slate-500)] mb-1">
                                    공유 URL
                                </div>
                                <div className="font-mono text-sm text-[var(--navy-900)] break-all">
                                    {publicUrl}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/blog-sms/dashboard/edit"
                                    className="px-5 py-2.5 rounded-full bg-[var(--navy-900)] text-white text-sm font-semibold hover:bg-[var(--navy-800)]"
                                >
                                    페이지 편집
                                </Link>
                                <a
                                    href={publicUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-[var(--navy-900)] hover:border-[var(--navy-900)]"
                                >
                                    공개 페이지 미리보기 →
                                </a>
                            </div>
                        </div>

                        <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-[var(--navy-900)] mb-4">통계</h3>
                            <div className="space-y-4">
                                <Stat label="방문 수" value={page.visit_count} />
                                <Stat label="SMS 클릭" value={page.click_count} />
                                <Stat
                                    label="전환율"
                                    value={
                                        page.visit_count
                                            ? `${((page.click_count / page.visit_count) * 100).toFixed(1)}%`
                                            : "—"
                                    }
                                />
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: number | string }) {
    return (
        <div>
            <div className="text-xs text-[var(--slate-500)] mb-1">{label}</div>
            <div className="text-2xl font-bold text-[var(--navy-900)]">{value}</div>
        </div>
    );
}

function EmptyPageCard() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
            <div className="text-5xl mb-4">📨</div>
            <h2 className="font-display text-2xl font-bold text-[var(--navy-900)] mb-2">
                아직 내 페이지가 없습니다
            </h2>
            <p className="text-[var(--slate-700)] mb-6">
                14 업종 템플릿 중 하나로 1분 안에 만들 수 있습니다.
            </p>
            <Link
                href="/blog-sms/dashboard/edit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-semibold transition-colors"
            >
                페이지 만들기 →
            </Link>
        </div>
    );
}

function NotConfigured() {
    return (
        <div className="bg-[var(--slate-50)] min-h-screen pt-32 pb-20">
            <div className="ot-container max-w-2xl text-center">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10">
                    <h1 className="font-display text-2xl font-bold text-[var(--navy-900)] mb-3">
                        대시보드 점검 중
                    </h1>
                    <p className="text-[var(--slate-700)] mb-6">
                        Supabase 환경변수가 아직 설정되지 않았습니다. 사장이{" "}
                        <code className="px-2 py-1 bg-slate-100 rounded">.env.local</code>
                        에 키를 넣으면 즉시 활성화됩니다.
                    </p>
                    <Link
                        href="/blog-sms"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-300 text-[var(--navy-900)] font-semibold hover:border-[var(--navy-900)]"
                    >
                        ← 메인으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}
