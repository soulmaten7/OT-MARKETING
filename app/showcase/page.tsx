import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShowcaseIframe } from "./showcase-iframe";

export const metadata: Metadata = {
    title: "랜딩페이지 디자인 시안 | OT Marketing",
    description: "신뢰·액션·케어·미니멀·다크·비비드 — 업종 특성에 맞춰 디자인 방향을 비교해 보세요.",
};

export default function ShowcasePage() {
    return (
        <div className="min-h-screen flex flex-col pt-20 bg-white">
            {/* Top bar */}
            <div className="border-b border-gray-200 bg-white">
                <div className="ot-container py-4 flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--navy)] hover:text-[var(--gold)] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        홈으로
                    </Link>
                    <Link href="/#contact" className="text-sm text-[var(--gold)] hover:underline font-semibold">
                        상담 신청 →
                    </Link>
                </div>
            </div>

            {/* Intro + Iframe */}
            <div className="flex-1 bg-white">
                <div className="ot-container py-12">
                    <div className="eyebrow mb-3">PORTFOLIO</div>
                    <h1 className="font-serif text-3xl md:text-4xl text-[var(--navy)] mb-4">
                        업종별 디자인 시안을 비교해 보세요
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
                        업종별로 어울리는 시안이 다릅니다. 상단 탭에서 하나씩 전환하며 톤·색·구조를 확인하세요.
                        상담 후 업종 특성에 맞춰 실제 카피와 이미지로 치환해 드립니다.
                    </p>
                </div>

                {/* Iframe — 자동 높이 조절 (postMessage) */}
                <div className="border-t border-gray-200">
                    <ShowcaseIframe />
                </div>
            </div>
        </div>
    );
}
