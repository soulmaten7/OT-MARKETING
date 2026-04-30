"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";

export function MetaFeed() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0891B2] to-[#0E7490] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-[10px] truncate">OO 병원</div>
                    <div className="text-[8px] text-gray-500">광고 · 진료 예약 안내</div>
                </div>
                <div className="text-gray-400 text-[10px]">⋯</div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-[#0891B2] to-[#0E4F6E] flex items-center justify-center text-white relative overflow-hidden">
                {/* soft dot pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                {/* cross SVG */}
                <div className="absolute top-4 right-5 opacity-25">
                    <svg viewBox="0 0 36 36" className="w-10 h-10" fill="white">
                        <rect x="13" y="3" width="10" height="30" rx="2" />
                        <rect x="3" y="13" width="30" height="10" rx="2" />
                    </svg>
                </div>
                {/* circle block */}
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white/10" />
                <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 브랜드 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 opacity-80">병원 진료 예약</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        진료 예약 안내
                    </div>
                    <div className="text-[11px] opacity-90 mb-4">
                        예약·진료 시간 정보
                    </div>
                    <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1 text-[10px] font-bold">
                        예약 안내
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
