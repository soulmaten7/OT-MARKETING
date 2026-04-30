"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";

export function MetaFeed() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D97706] to-[#92400E] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-[10px] truncate">공인중개사 OO###</div>
                    <div className="text-[8px] text-gray-500">광고 · 지역 매물 안내</div>
                </div>
                <div className="text-gray-400 text-[10px]">⋯</div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-[#D97706] to-[#78350F] flex items-center justify-center text-white relative overflow-hidden">
                {/* grid pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                {/* house SVG */}
                <div className="absolute top-4 right-5 opacity-25">
                    <svg viewBox="0 0 48 44" className="w-12 h-11" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round">
                        <polygon points="24,4 6,20 12,20 12,40 36,40 36,20 42,20" />
                        <rect x="18" y="26" width="12" height="14" />
                    </svg>
                </div>
                {/* triangle block */}
                <div className="absolute bottom-5 left-5 opacity-20">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                        <polygon points="12,2 22,22 2,22" />
                    </svg>
                </div>
                <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 브랜드 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 opacity-80">부동산 매물 안내</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        OO 지역 매물 안내
                    </div>
                    <div className="text-[11px] opacity-90 mb-4">
                        공인중개사 자격 등록
                    </div>
                    <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1 text-[10px] font-bold">
                        매물 보기
                    </div>
                </div>
            </div>

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
