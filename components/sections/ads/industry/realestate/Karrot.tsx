"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function Karrot() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2]">
            <div className="flex-[2] bg-gradient-to-br from-[#D97706] to-[#78350F] flex items-center justify-center text-white relative overflow-hidden">
                {/* house SVG */}
                <div className="absolute top-4 right-4 opacity-25">
                    <svg viewBox="0 0 40 36" className="w-10 h-9" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round">
                        <polygon points="20,3 5,16 10,16 10,33 30,33 30,16 35,16" />
                        <rect x="14" y="21" width="12" height="12" />
                    </svg>
                </div>
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded">광고</div>
                <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="광고주 비즈프로필 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-2 opacity-90">OO동 비즈프로필</div>
                    <div className="text-[20px] font-bold leading-tight mb-2">OO동 매물</div>
                    <div className="text-[12px] font-bold mb-1">공인중개사</div>
                    <div className="text-[10px] opacity-90">자격 등록 OO###</div>
                </div>
            </div>

            <div className="flex-1 px-4 py-3 bg-white">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D97706] to-[#92400E] flex items-center justify-center text-white font-bold text-xs">집</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[12px] text-[#1F1F1F]">공인중개사 OO</div>
                        <div className="text-[10px] text-gray-500">OO동 · 비즈프로필 · 등록번호 OO###</div>
                    </div>
                    <div className="text-[10px] font-bold text-[#FF7E36]">방문</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[9px] bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full font-bold">매물 안내</span>
                    <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">시세 분석</span>
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed">
                    지역 매물 안내, 시세 분석. 공인중개사 자격 등록.
                </div>
            </div>
        </div>
    );
}
