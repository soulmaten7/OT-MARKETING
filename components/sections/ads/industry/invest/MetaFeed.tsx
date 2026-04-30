"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";

export function MetaFeed() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#0F2440] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-[10px] truncate">투자 정보 OO</div>
                    <div className="text-[8px] text-gray-500">광고 · 시장 분석 안내</div>
                </div>
                <div className="text-gray-400 text-[10px]">⋯</div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-[#1E3A5F] to-[#0A1628] flex items-center justify-center text-white relative overflow-hidden">
                {/* subtle diagonal stripes */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
                {/* chart arrow SVG */}
                <div className="absolute top-4 right-5 opacity-30">
                    <svg viewBox="0 0 56 36" className="w-14 h-9" fill="none">
                        <polyline points="4,32 18,22 30,26 46,10" stroke="#F0B429" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="42,8 48,10 46,16" stroke="#F0B429" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                {/* gold circle */}
                <div className="absolute bottom-5 left-4 w-10 h-10 rounded-full bg-[#F0B429]/10 border border-[#F0B429]/20" />
                <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 브랜드 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 text-[#F0B429]">주식 시장 분석</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        시장 분석 안내
                    </div>
                    <div className="text-[11px] opacity-90 mb-4">
                        차트·시황·종목 정보
                    </div>
                    <div className="inline-block bg-[#F0B429]/20 border border-[#F0B429]/40 rounded-full px-4 py-1 text-[10px] font-bold text-[#F0B429]">
                        정보 받기
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
