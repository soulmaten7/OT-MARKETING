"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function Karrot() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2]">
            <div className="flex-[2] bg-gradient-to-br from-[#1E3A5F] to-[#0A1628] flex items-center justify-center text-white relative overflow-hidden">
                {/* chart arrow */}
                <div className="absolute top-4 right-4 opacity-30">
                    <svg viewBox="0 0 48 32" className="w-12 h-8" fill="none">
                        <polyline points="4,28 16,18 26,22 40,8" stroke="#F0B429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="36,6 42,8 40,14" stroke="#F0B429" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded">광고</div>
                <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="광고주 비즈프로필 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-2 text-[#F0B429]">OO동 비즈프로필</div>
                    <div className="text-[20px] font-bold leading-tight mb-2">투자 정보 무료</div>
                    <div className="text-[11px] opacity-90">차트 · 시황 · 종목 안내</div>
                </div>
            </div>

            <div className="flex-1 px-4 py-3 bg-white">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#0A1628] flex items-center justify-center text-[#F0B429] font-bold text-xs">▲</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[12px] text-[#1F1F1F]">투자 정보 OO</div>
                        <div className="text-[10px] text-gray-500">OO동 · 비즈프로필</div>
                    </div>
                    <div className="text-[10px] font-bold text-[#FF7E36]">방문</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[9px] bg-[#FFF8E1] text-[#B7791F] px-2 py-0.5 rounded-full font-bold">시장 분석 안내</span>
                    <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">무료 정보</span>
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed">
                    차트 분석, 시황, 산업 동향 안내. 수익률 보장 표현 없음.
                </div>
            </div>
        </div>
    );
}
