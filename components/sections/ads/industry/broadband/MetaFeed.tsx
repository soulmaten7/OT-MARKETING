"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";

export function MetaFeed() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#4834D4] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-[10px] truncate">통신사 OO</div>
                    <div className="text-[8px] text-gray-500">광고 · 5G 요금 안내</div>
                </div>
                <div className="text-gray-400 text-[10px]">⋯</div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-[#6C63FF] to-[#2D1FA3] flex items-center justify-center text-white relative overflow-hidden">
                {/* signal wave pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                {/* signal arcs */}
                <div className="absolute bottom-6 right-4 opacity-20">
                    <svg viewBox="0 0 50 40" className="w-14 h-10" fill="none">
                        <circle cx="25" cy="40" r="8" stroke="white" strokeWidth="2.5" />
                        <path d="M12 28 Q25 15 38 28" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M4 18 Q25 2 46 18" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                </div>
                {/* diamond color block */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 rotate-45" />
                <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 브랜드 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-2 opacity-80">5G 요금 안내</div>
                    <div className="mb-1">
                        <span className="text-[46px] font-black leading-none">5G</span>
                    </div>
                    <div className="text-[11px] opacity-90 mb-1">데이터 무제한 · 가입비 X</div>
                    <div className="text-[11px] opacity-90 mb-3">약정 X · 월 OO원</div>
                    <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1 text-[10px] font-bold">
                        요금 보기
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
