import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "랜딩페이지 디자인 시안 6종 | OT Marketing",
    description: "신뢰·액션·케어·미니멀·다크·비비드 — 6 가지 디자인 방향을 실시간으로 비교해 보세요.",
};

export default function ShowcasePage() {
    return (
        <div className="min-h-screen flex flex-col pt-20 bg-white">
            {/* Top bar with back link */}
            <div className="border-b border-gray-200 bg-white">
                <div className="ot-container py-4 flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--navy)] hover:text-[var(--gold)] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        홈으로
                    </Link>
                    <div className="text-sm font-semibold text-[var(--navy)]">
                        랜딩페이지 디자인 시안 6종
                    </div>
                    <Link href="/guide" className="text-sm text-[var(--gold)] hover:underline font-semibold">
                        콘텐츠 가이드 →
                    </Link>
                </div>
            </div>

            {/* Intro */}
            <div className="ot-container py-12 max-w-4xl">
                <div className="eyebrow mb-3">SHOWCASE</div>
                <h1 className="font-serif text-3xl md:text-4xl text-[var(--navy)] mb-4">
                    6 가지 디자인 시안을 비교해 보세요
                </h1>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-2">
                    상단 탭에서 시안을 전환하며 <strong className="text-[var(--navy)]">우측의 💡 가이드 모드</strong>를 켜면
                    각 시안에 어떤 콘텐츠를 넣어야 하는지 힌트가 뜹니다.
                </p>
                <p className="text-sm text-gray-500">
                    카피는 모두 <code className="bg-gray-100 px-2 py-0.5 rounded text-xs text-[var(--gold-dark)]">{'{플레이스홀더}'}</code> 로 표기되어 있어, 광고주님의 브랜드에 맞춰 바로 치환 가능합니다.
                </p>
            </div>

            {/* Iframe preview */}
            <div className="flex-1 border-t border-gray-200">
                <iframe
                    src="/samples.html"
                    title="랜딩페이지 디자인 시안 6종"
                    className="w-full border-0"
                    style={{ height: "calc(100vh - 60px)", minHeight: "800px" }}
                />
            </div>

            {/* Bottom CTA */}
            <div className="border-t border-gray-200 bg-[var(--cream)]">
                <div className="ot-container py-12 text-center">
                    <h2 className="font-serif text-2xl md:text-3xl text-[var(--navy)] mb-3">마음에 드는 시안이 있으셨나요?</h2>
                    <p className="text-gray-600 mb-8">
                        어느 시안이 귀사 업종에 맞을지 함께 고민해 드립니다.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--navy)] px-8 py-3 rounded font-bold transition-colors"
                    >
                        상담 신청하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
