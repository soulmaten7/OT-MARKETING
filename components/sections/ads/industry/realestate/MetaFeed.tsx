"use client";
import { ThumbsUp, MessageCircle, Share2, Bookmark, Search, Home, PlaySquare, Store, Bell, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function MetaFeed() {
    return (
        <div className="w-full h-full flex flex-col bg-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Helvetica, Arial' }}>
            <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-gray-200 flex-shrink-0">
                <div className="text-[#1877F2] font-black text-[15px] tracking-tight">facebook</div>
                <div className="ml-auto flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search className="w-3.5 h-3.5 text-gray-700" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5 text-gray-700" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D97706] to-[#92400E] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[11px] text-gray-900 truncate">공인중개사 OO###</div>
                    <div className="text-[9px] text-gray-500">광고 · 후원 · 🌐</div>
                </div>
                <div className="text-gray-400 text-[14px] leading-none">⋯</div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="flex-1 bg-gradient-to-br from-[#D97706] to-[#78350F] flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="absolute top-4 right-5 opacity-25">
                    <svg viewBox="0 0 48 44" className="w-12 h-11" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round">
                        <polygon points="24,4 6,20 12,20 12,40 36,40 36,20 42,20" />
                        <rect x="18" y="26" width="12" height="14" />
                    </svg>
                </div>
                <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 브랜드 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 opacity-80">부동산 매물 안내</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        OO 지역 매물 안내
                    </div>
                    <div className="text-[11px] opacity-90">
                        공인중개사 자격 등록
                    </div>
                </div>
            </motion.div>

            <div className="px-3 pt-2 flex-shrink-0">
                <div className="flex items-center gap-1 text-[10px] text-gray-600 mb-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center">
                        <ThumbsUp className="w-2.5 h-2.5 text-white" fill="white" />
                    </span>
                    <span>지역민 외 612명</span>
                </div>
                <div className="flex items-center justify-around py-1.5 border-t border-b border-gray-100 text-gray-600">
                    <button className="flex items-center gap-1 text-[10px] font-semibold">
                        <ThumbsUp className="w-3.5 h-3.5" /> 좋아요
                    </button>
                    <button className="flex items-center gap-1 text-[10px] font-semibold">
                        <MessageCircle className="w-3.5 h-3.5" /> 댓글
                    </button>
                    <button className="flex items-center gap-1 text-[10px] font-semibold">
                        <Share2 className="w-3.5 h-3.5" /> 공유
                    </button>
                    <button>
                        <Bookmark className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="px-3 py-2 flex-shrink-0">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#1877F2] hover:bg-[#1864D9] text-white font-semibold py-2 rounded-md text-[11px] transition-colors">
                    더 알아보기
                </motion.button>
            </div>

            <div className="flex items-center justify-around px-2 py-1.5 border-t border-gray-200 bg-white flex-shrink-0">
                <Home className="w-4 h-4 text-[#1877F2]" />
                <PlaySquare className="w-4 h-4 text-gray-500" />
                <Store className="w-4 h-4 text-gray-500" />
                <Bell className="w-4 h-4 text-gray-500" />
                <Menu className="w-4 h-4 text-gray-500" />
            </div>
        </div>
    );
}
