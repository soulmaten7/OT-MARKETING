"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";

export function MetaFeed() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0099CC] to-[#007ACC] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-[10px] truncate">정수기 브랜드 OO</div>
                    <div className="text-[8px] text-gray-500">광고 · 렌탈 전문</div>
                </div>
                <div className="text-gray-400 text-[10px]">⋯</div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-[#0099CC] to-[#004E8C] flex items-center justify-center text-white relative overflow-hidden">
                {/* dot grid pattern */}
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                {/* water drop SVG */}
                <div className="absolute top-4 right-5 opacity-25">
                    <svg viewBox="0 0 32 42" className="w-10 h-12" fill="white">
                        <path d="M16 2 C16 2 3 16 3 26 C3 34.8 9 40 16 40 C23 40 29 34.8 29 26 C29 16 16 2 16 2Z" />
                    </svg>
                </div>
                {/* color block */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/10" />
                <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 브랜드 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 opacity-80">정수기 렌탈 비교</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        무이자 36개월 렌탈
                    </div>
                    <div className="text-[11px] opacity-90 mb-4">
                        월 요금 · 총액 명시
                    </div>
                    <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1 text-[10px] font-bold">
                        지금 보기
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
