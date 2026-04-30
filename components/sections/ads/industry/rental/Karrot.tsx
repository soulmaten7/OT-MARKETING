"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function Karrot() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2]">
            <div className="flex-[2] bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center text-white relative overflow-hidden">
                {/* diagonal stripes */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
                {/* water drop */}
                <div className="absolute top-3 right-4 opacity-30">
                    <svg viewBox="0 0 28 36" className="w-8 h-10" fill="white">
                        <path d="M14 2 C14 2 2 14 2 22 C2 29.7 7.5 34 14 34 C20.5 34 26 29.7 26 22 C26 14 14 2 14 2Z" />
                    </svg>
                </div>
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded">
                    광고
                </div>
                <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="광고주 비즈프로필 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 opacity-90">정수기 렌탈 동네</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        정수기 렌탈 비교
                    </div>
                    <div className="text-[11px] opacity-95 mb-4">
                        무이자 36개월 총액 명시
                    </div>
                </div>
            </div>

            <div className="flex-1 px-4 py-3 bg-white">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center text-white font-bold text-xs">
                        정
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[12px] text-[#1F1F1F]">정수기 브랜드 OO</div>
                        <div className="text-[10px] text-gray-500">OO동 · 비즈프로필</div>
                    </div>
                    <div className="text-[10px] font-bold text-[#FF7E36]">방문</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[9px] bg-[#E0F7FA] text-[#0077B6] px-2 py-0.5 rounded-full font-bold">무이자 36개월</span>
                    <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">무료 점검</span>
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed">
                    정수기 렌탈 할부 조건 안내. 무이자 36개월, 총액 명시.
                </div>
            </div>
        </div>
    );
}
