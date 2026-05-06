import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES } from "@/lib/blog-sms/guides";

export const metadata: Metadata = {
    title: "활용 가이드 22선 — OTMarketing 블로그문자",
    description: "블로그·인스타·명함·QR·070 자동화·법규 안전 zone 까지 22 가지 실전 가이드.",
};

export default function GuideIndexPage() {
    return (
        <div className="bg-white pt-32 pb-20">
            <div className="ot-container max-w-5xl">
                <header className="text-center mb-14">
                    <span className="eyebrow">22 가지 실전 가이드</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--navy-900)] mt-3 mb-4">
                        블로그문자 활용 가이드
                    </h1>
                    <p className="text-lg text-[var(--slate-700)] max-w-2xl mx-auto">
                        블로그 본문 끝 박기 · 인스타 프로필 · 명함 QR · 070 자동화 · 법규 안전 zone 까지.
                    </p>
                </header>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {GUIDES.map((g) => (
                        <Link
                            key={g.slug}
                            href={`/blog-sms/guide/${g.slug}`}
                            className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--coral-400)] hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-3xl">{g.icon}</span>
                                <span className="text-xs font-mono text-[var(--slate-500)]">
                                    #{String(g.order).padStart(2, "0")}
                                </span>
                            </div>
                            <h2 className="font-bold text-[var(--navy-900)] mb-2 group-hover:text-[var(--coral-600)] transition-colors">
                                {g.title}
                            </h2>
                            <p className="text-sm text-[var(--slate-700)] leading-relaxed">
                                {g.summary}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
