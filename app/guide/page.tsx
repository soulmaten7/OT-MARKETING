import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "광고주용 콘텐츠 가이드 | OT Marketing",
    description: "랜딩페이지 시안에 무엇을·어디에·얼마나 넣으면 되는지 단계별로 안내합니다.",
};

export default function GuidePage() {
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
                        광고주용 콘텐츠 가이드
                    </div>
                    <Link href="/showcase" className="text-sm text-accent hover:underline">
                        ← 시안 미리보기
                    </Link>
                </div>
            </div>

            {/* Iframe */}
            <div className="flex-1 border-t border-black/10 dark:border-white/10">
                <iframe
                    src="/guide.html"
                    title="광고주용 콘텐츠 가이드"
                    className="w-full border-0"
                    style={{ height: "calc(100vh - 60px)", minHeight: "900px" }}
                />
            </div>

            {/* Bottom CTA */}
            <div className="border-t border-black/10 dark:border-white/10 bg-secondary/30">
                <div className="container px-6 md:px-12 py-10 text-center">
                    <h2 className="text-2xl font-bold mb-3">준비물이 정리되셨다면</h2>
                    <p className="text-muted-foreground mb-6">
                        가이드에 있는 체크리스트를 채워 보내주시면 시안에 맞춰 반영해 드립니다.
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
