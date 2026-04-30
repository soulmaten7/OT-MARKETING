"use client";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function MetaFeedMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* 압축된 브랜드 헤더 — 1줄 */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--coral-500)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-[10px] truncate">법무법인 OO</div>
                    <div className="text-[8px] text-gray-500">광고 · 회생·파산 전담</div>
                </div>
                <div className="text-gray-400 text-[10px]">⋯</div>
            </div>

            {/* 광고 이미지 — 폰 높이의 60% */}
            <div className="flex-1 bg-gradient-to-br from-[var(--coral-500)] via-[var(--coral-600)] to-[var(--navy)] flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)",
                }} />
                <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 브랜드 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 opacity-80">월 변제금 부담?</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        채무 독촉에서<br />벗어나는 첫걸음
                    </div>
                    <div className="text-[11px] opacity-90 mb-4">
                        법률 상담 · 자가진단 1분
                    </div>
                    <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1 text-[10px] font-bold">
                        무료 상담 받기
                    </div>
                </div>
            </div>

            {/* 액션 + CTA — 압축 */}
            <div className="px-3 py-2 border-t border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-4 h-4" />
                    <MessageSquare className="w-4 h-4" />
                    <Share2 className="w-4 h-4" />
                    <Bookmark className="w-4 h-4 ml-auto" />
                </div>
                <button className="w-full bg-[#1877F2] text-white font-bold py-2 rounded text-[11px]">
                    더 알아보기
                </button>
            </div>
        </div>
    );
}
