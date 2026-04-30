"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function KarrotMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2]">
            {/* 광고 이미지 — 폰 높이의 65% */}
            <div className="flex-[2] bg-gradient-to-br from-[#FFE5D0] via-[#FF7E36] to-[#E55A1A] flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded">
                    광고
                </div>
                <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="광고주 비즈프로필 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 opacity-90">OO동 비즈프로필</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        회생·파산<br />법률 상담 무료
                    </div>
                    <div className="text-[11px] opacity-95 mb-4">
                        변제계획 검토 · 자가진단
                    </div>
                </div>
            </div>

            {/* 정보 영역 — 폰 높이의 35% */}
            <div className="flex-1 px-4 py-3 bg-white">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF7E36] to-[#E55A1A] flex items-center justify-center text-white font-bold text-xs">
                        법
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[12px] text-[#1F1F1F]">법무법인 OO</div>
                        <div className="text-[10px] text-gray-500">OO동 · 비즈프로필</div>
                    </div>
                    <div className="text-[10px] font-bold text-[#FF7E36]">방문</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[9px] bg-[#FFE5D0] text-[#E55A1A] px-2 py-0.5 rounded-full font-bold">
                        법률상담 무료
                    </span>
                    <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        회생·파산 전담
                    </span>
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed">
                    동네 이웃을 위한 무료 법률 상담 서비스. 변제계획 검토부터 신용회복위원회 안내까지.
                </div>
            </div>
        </div>
    );
}
