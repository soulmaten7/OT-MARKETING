import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIDES, getGuide } from "@/lib/blog-sms/guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const guide = getGuide(slug);
    if (!guide) return { title: "가이드 — OTMarketing 블로그문자" };
    return {
        title: `${guide.title} — OTMarketing 블로그문자`,
        description: guide.summary,
    };
}

export default async function GuideDetailPage({ params }: Props) {
    const { slug } = await params;
    const guide = getGuide(slug);
    if (!guide) notFound();

    const idx = GUIDES.findIndex((g) => g.slug === guide.slug);
    const prev = idx > 0 ? GUIDES[idx - 1] : null;
    const next = idx < GUIDES.length - 1 ? GUIDES[idx + 1] : null;

    return (
        <article className="bg-white pt-32 pb-20">
            <div className="ot-container max-w-3xl">
                <Link
                    href="/blog-sms/guide"
                    className="text-sm text-[var(--slate-500)] hover:text-[var(--navy-900)] mb-6 inline-block"
                >
                    ← 가이드 목록
                </Link>
                <div className="flex items-center gap-3 mb-4 text-sm">
                    <span className="text-3xl">{guide.icon}</span>
                    <span className="font-mono text-[var(--slate-500)]">
                        #{String(guide.order).padStart(2, "0")}
                    </span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-4">
                    {guide.title}
                </h1>
                <p className="text-lg text-[var(--slate-700)] leading-relaxed mb-12">
                    {guide.summary}
                </p>

                <div className="space-y-10">
                    {guide.sections.map((s) => (
                        <section key={s.heading}>
                            <h2 className="font-bold text-xl text-[var(--navy-900)] mb-3">
                                {s.heading}
                            </h2>
                            <div className="space-y-3 text-[var(--slate-700)] leading-relaxed">
                                {s.body.map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Phase 11 — 22번 (마지막) 가이드는 upsell 강화 */}
                {guide.slug === "to-landing" && (
                    <div className="mt-12 rounded-2xl bg-gradient-to-r from-[var(--navy-900)] to-[var(--gold-600)] p-7 text-white">
                        <h3 className="font-bold text-2xl mb-2">곧 출시 — 셀프 랜딩페이지</h3>
                        <p className="mb-5 text-white/85">
                            블로그문자가 답신을 만들면, 셀프 랜딩페이지는 매출을 만듭니다. 사전 등록자에게 1순위 알림.
                        </p>
                        <Link
                            href="/landing-pages"
                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[var(--navy-900)] font-bold rounded-full hover:bg-[var(--gold-50)]"
                        >
                            사전 등록하기 →
                        </Link>
                    </div>
                )}

                <nav className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between gap-4 text-sm">
                    {prev ? (
                        <Link
                            href={`/blog-sms/guide/${prev.slug}`}
                            className="flex flex-col items-start hover:text-[var(--coral-600)]"
                        >
                            <span className="text-[var(--slate-500)]">← 이전</span>
                            <span className="font-semibold text-[var(--navy-900)]">
                                {prev.title}
                            </span>
                        </Link>
                    ) : (
                        <span />
                    )}
                    {next ? (
                        <Link
                            href={`/blog-sms/guide/${next.slug}`}
                            className="flex flex-col items-end hover:text-[var(--coral-600)] text-right"
                        >
                            <span className="text-[var(--slate-500)]">다음 →</span>
                            <span className="font-semibold text-[var(--navy-900)]">
                                {next.title}
                            </span>
                        </Link>
                    ) : (
                        <span />
                    )}
                </nav>
            </div>
        </article>
    );
}
