import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "랜딩페이지 디자인 시안 6종 | OT Marketing",
    description: "신뢰·액션·케어·미니멀·다크·비비드 — 6 가지 디자인 방향을 실시간으로 비교해 보세요.",
};

export default function ShowcasePage() {
    return (
        <div className="min-h-screen flex flex-col pt-20">
            {/* Top bar with back link */}
            <div className="border-b border-black/10 dark:border-white/10 bg-background/95 backdrop-blur-sm">
                <div className="container px-6 md:px-12 py-4 flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        홈으로
                    </Link>
                    <div className="text-sm font-semibold">
                        랜딩페이지 디자인 시안 6종
                    </div>
                    <Link href="/guide" className="text-sm text-accent hover:underline">
                        콘텐츠 가이드 →
                    </Link>
                </div>
            </div>

            {/* Intro */}
            <div className="container px-6 md:px-12 py-10 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    6 가지 디자인 시안을 비교해 보세요
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-2">
                    상단 탭에서 시안을 전환하며 <strong>상단 탭 맨 오른쪽 💡 가이드 모드</strong>를 켜면
                    <br className="hidden md:block" />
                    각 시안에 어떤 콘텐츠를 넣어야 하는지 힌트가 뜹니다.
                </p>
                <p className="text-sm text-muted-foreground">
                    카피는 모두 <code className="bg-secondary px-2 py-0.5 rounded text-xs">{'{플레이스홀더}'}</code> 로 표기되어 있어, 광고주님의 브랜드에 맞춰 바로 치환 가능합니다.
                </p>
            </div>

            {/* Iframe preview */}
            <div className="flex-1 border-t border-black/10 dark:border-white/10">
                <iframe
                    src="/samples.html"
                    title="랜딩페이지 디자인 시안 6종"
                    className="w-full border-0"
                    style={{ height: "calc(100vh - 60px)", minHeight: "800px" }}
                />
            </div>

            {/* Bottom CTA */}
            <div className="border-t border-black/10 dark:border-white/10 bg-secondary/30">
                <div className="container px-6 md:px-12 py-10 text-center">
                    <h2 className="text-2xl font-bold mb-3">마음에 드는 시안이 있으셨나요?</h2>
                    <p className="text-muted-foreground mb-6">
                        어느 시안이 귀사 업종에 맞을지 함께 고민해 드립니다.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
                    >
                        상담 신청하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
