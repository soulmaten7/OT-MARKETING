"use client";
import { MapPin, Heart, MessageCircle, Search, Home, Heart as HeartTab, Map as MapTab, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function KarrotMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2]" style={{ fontFamily: 'Pretendard, system-ui, sans-serif' }}>
            {/* 당근 헤더 */}
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

            {/* 광고 이미지 */}
            <div className="px-3 pt-3 pb-2 flex-shrink-0">
                <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#FFE5D0] via-[#FF7E36] to-[#E55A1A] flex items-center justify-center text-white relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-black/40 text-white text-[9px] px-2 py-0.5 rounded-full font-medium">광고</div>
                    <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="광고주 비즈프로필 이미지" />
                    <div className="relative z-20 text-center px-4">
                        <div className="text-[10px] font-bold tracking-widest mb-2 opacity-90">동네 법률상담</div>
                        <div className="text-[18px] font-bold leading-tight mb-1">
                            회생·파산 무료 상담
                        </div>
                        <div className="text-[11px] opacity-95">
                            변제 검토 안내
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* 정보 영역 */}
            <div className="flex-1 px-3 pb-3 bg-[#FAF7F2]">
                <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                    <span>법률상담</span>
                    <span>·</span>
                    <span>OO동</span>
                </div>
                <div className="flex items-start gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF7E36] to-[#E55A1A] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">법</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[12px] text-[#1F1F1F] leading-tight">법무법인 OO</div>
                        <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[9px] bg-[#FFE5D0] text-[#FF7E36] px-1.5 py-0.5 rounded font-bold">비즈프로필</span>
                            <span className="text-[9px] text-gray-500">· 영업중</span>
                        </div>
                    </div>
                </div>
                <div className="text-[10px] text-gray-700 leading-relaxed mb-2">
                    동네 이웃을 위한 회생·파산 법률 상담 안내.
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <div className="flex items-center gap-0.5">
                        <Heart className="w-3 h-3" /> <span>56</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <MessageCircle className="w-3 h-3" /> <span>12</span>
                    </div>
                    <span>· 방금 전</span>
                </div>
            </div>

            {/* 하단 5 탭 */}
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
