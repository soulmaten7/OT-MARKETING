"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { FadeInUp } from "@/components/ui/motion";

interface IndustryComingSoonProps {
    industryName: string;
    legalNote?: string;
}

export function IndustryComingSoon({ industryName, legalNote }: IndustryComingSoonProps) {
    return (
        <FadeInUp>
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-[var(--coral-50)] to-orange-50 border border-[var(--coral-200)] rounded-2xl p-10 md:p-14 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Sparkles className="w-8 h-8 text-[var(--coral-500)]" />
                </div>
                <div className="eyebrow mb-3 text-[var(--coral-600)]">
                    {industryName} · COMING SOON
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-[var(--navy)] mb-4 leading-[1.3]">
                    {industryName} 광고 크리에이티브는<br />
                    진입 광고주와 함께 공개됩니다
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2">
                    OT MARKETING 은 업종별 법규 가드레일을 먼저 정리한 뒤 광고를 굴립니다.
                    <br />
                    {industryName} 진입 광고주와 함께 법규·금지표현·등급 분기까지 통합 정리 후 공개.
                </p>
                {legalNote && (
                    <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-white rounded-full text-xs text-[var(--slate-600)] border border-gray-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--coral-500)]" />
                        <span>참고: {legalNote}</span>
                    </div>
                )}
                <div className="mt-8">
                    <p className="text-xs text-gray-500 mb-4">
                        미팅 시 비공개 운영 deck 으로 별도 안내드립니다.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-bold px-7 py-3.5 rounded-md text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                        {industryName} 광고주 상담 신청
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </FadeInUp>
    );
}
