"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function Karrot() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2]">
            <div className="flex-[2] bg-gradient-to-br from-[#0891B2] to-[#0E4F6E] flex items-center justify-center text-white relative overflow-hidden">
                {/* cross SVG */}
                <div className="absolute top-4 right-4 opacity-25">
                    <svg viewBox="0 0 28 28" className="w-8 h-8" fill="white">
                        <rect x="10" y="2" width="8" height="24" rx="2" />
                        <rect x="2" y="10" width="24" height="8" rx="2" />
                    </svg>
                </div>
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded">광고</div>
                <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="광고주 비즈프로필 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-2 opacity-90">OO동 비즈프로필</div>
                    <div className="text-[20px] font-bold leading-tight mb-2">OO 진료 안내</div>
                    <div className="text-[12px] font-bold mb-1">동네 병원</div>
                    <div className="text-[10px] opacity-90">진료 시간 · 예약 안내</div>
                </div>
            </div>

            <div className="flex-1 px-4 py-3 bg-white">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0891B2] to-[#0E7490] flex items-center justify-center text-white font-bold text-xs">+</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[12px] text-[#1F1F1F]">OO 병원</div>
                        <div className="text-[10px] text-gray-500">OO동 · 비즈프로필</div>
                    </div>
                    <div className="text-[10px] font-bold text-[#FF7E36]">방문</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[9px] bg-[#E0F7FA] text-[#0E7490] px-2 py-0.5 rounded-full font-bold">예약 안내</span>
                    <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">진료 시간</span>
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed">
                    OO 진료 예약 안내. 진료 시간, 위치 안내.
                </div>
            </div>
        </div>
    );
}
