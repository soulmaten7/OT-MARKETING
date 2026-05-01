"use client";
import { MapPin, Heart, MessageCircle, Search, Home, Heart as HeartTab, Map as MapTab, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function Karrot() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2]" style={{ fontFamily: 'Pretendard, system-ui, sans-serif' }}>
            <div className="flex items-center gap-2 px-3 py-2 bg-white flex-shrink-0">
                <div className="text-[#FF7E36] font-black text-[14px] tracking-tight">당근</div>
                <div className="flex items-center gap-1 text-gray-700 text-[11px]">
                    <MapPin className="w-3 h-3 text-[#FF7E36]" />
                    <span className="font-semibold">OO동</span>
                    <span className="text-gray-500">· 1.2km</span>
                </div>
                <div className="ml-auto">
                    <Search className="w-4 h-4 text-gray-700" />
                </div>
            </div>

            <div className="px-3 pt-3 pb-2 flex-shrink-0">
                <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#0A1628] flex items-center justify-center text-white relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-black/40 text-white text-[9px] px-2 py-0.5 rounded-full font-medium">광고</div>
                    <div className="absolute top-4 right-4 opacity-30">
                        <svg viewBox="0 0 48 32" className="w-12 h-8" fill="none">
                            <polyline points="4,28 16,18 26,22 40,8" stroke="#F0B429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="36,6 42,8 40,14" stroke="#F0B429" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="광고주 비즈프로필 이미지" />
                    <div className="relative z-20 text-center px-4">
                        <div className="text-[10px] font-bold tracking-widest mb-2 text-[#F0B429]">투자 정보 안내</div>
                        <div className="text-[18px] font-bold leading-tight mb-1">
                            투자 정보 무료 안내
                        </div>
                        <div className="text-[11px] opacity-95">
                            차트·시황 정보
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="flex-1 px-3 pb-3 bg-[#FAF7F2]">
                <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                    <span>투자 정보</span>
                    <span>·</span>
                    <span>OO동</span>
                </div>
                <div className="flex items-start gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#0A1628] flex items-center justify-center text-[#F0B429] font-bold text-xs flex-shrink-0">▲</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[12px] text-[#1F1F1F] leading-tight">투자 정보 OO</div>
                        <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[9px] bg-[#FFE5D0] text-[#FF7E36] px-1.5 py-0.5 rounded font-bold">비즈프로필</span>
                            <span className="text-[9px] text-gray-500">· 영업중</span>
                        </div>
                    </div>
                </div>
                <div className="text-[10px] text-gray-700 leading-relaxed mb-2">
                    차트 분석, 시황, 산업 동향 안내. 정보 중심.
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <div className="flex items-center gap-0.5">
                        <Heart className="w-3 h-3" /> <span>38</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <MessageCircle className="w-3 h-3" /> <span>7</span>
                    </div>
                    <span>· 2시간 전</span>
                </div>
            </div>

            <div className="flex items-center justify-around px-2 py-1.5 border-t border-gray-200 bg-white flex-shrink-0">
                <Home className="w-4 h-4 text-[#FF7E36]" />
                <HeartTab className="w-4 h-4 text-gray-500" />
                <MapTab className="w-4 h-4 text-gray-500" />
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <User className="w-4 h-4 text-gray-500" />
            </div>
        </div>
    );
}
