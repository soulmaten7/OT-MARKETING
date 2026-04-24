import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "광고주용 콘텐츠 가이드 | OT Marketing",
    description: "랜딩페이지 시안에 무엇을·어디에·얼마나 넣으면 되는지 단계별로 안내합니다.",
};

export default function GuidePage() {
    return (
        <div className="min-h-screen flex flex-col pt-20 bg-white">
            {/* Top bar */}
            <div className="border-b border-gray-200 bg-white">
                <div className="ot-container py-4 flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--navy)] hover:text-[var(--gold)] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        홈으로
                    </Link>
                    <div className="text-sm font-semibold text-[var(--navy)]">
                        광고주용 콘텐츠 가이드
                    </div>
                    <Link href="/showcase" className="text-sm text-[var(--gold)] hover:underline font-semibold">
                        ← 시안 미리보기
                    </Link>
                </div>
            </div>

            {/* Iframe */}
            <div className="flex-1 border-t border-gray-200">
                <iframe
                    src="/guide.html"
                    title="광고주용 콘텐츠 가이드"
                    className="w-full border-0"
                    style={{ height: "calc(100vh - 60px)", minHeight: "900px" }}
                />
            </div>

            {/* Bottom CTA */}
            <div className="border-t border-gray-200 bg-[var(--cream)]">
                <div className="ot-container py-12 text-center">
                    <h2 className="font-serif text-2xl md:text-3xl text-[var(--navy)] mb-3">준비물이 정리되셨다면</h2>
                    <p className="text-gray-600 mb-8">
                        가이드에 있는 체크리스트를 채워 보내주시면 시안에 맞춰 반영해 드립니다.
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
