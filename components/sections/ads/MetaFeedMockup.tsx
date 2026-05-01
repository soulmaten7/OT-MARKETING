"use client";
import { ThumbsUp, MessageCircle, Share2, Bookmark, Search, Home, PlaySquare, Store, Bell, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function MetaFeedMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Helvetica, Arial' }}>
            {/* 페북 톱 헤더 (#1877F2) */}
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

            {/* 브랜드 행 */}
            <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--coral-500)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[11px] text-gray-900 truncate">법무법인 OO</div>
                    <div className="text-[9px] text-gray-500">광고 · 후원 · 🌐</div>
                </div>
                <div className="text-gray-400 text-[14px] leading-none">⋯</div>
            </div>

            {/* 광고 이미지 */}
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="flex-1 bg-gradient-to-br from-[var(--coral-500)] via-[var(--coral-600)] to-[var(--navy)] flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)" }} />
                <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 브랜드 이미지" />
                <div className="relative z-20 text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-3 opacity-80">개인회생 법률상담</div>
                    <div className="text-[22px] font-bold leading-tight mb-2">
                        변제계획 검토 무료
                    </div>
                    <div className="text-[11px] opacity-90">
                        회생·파산 법률 안내
                    </div>
                </div>
            </motion.div>

            {/* 좋아요 카운트 + 액션 */}
            <div className="px-3 pt-2 flex-shrink-0">
                <div className="flex items-center gap-1 text-[10px] text-gray-600 mb-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center">
                        <ThumbsUp className="w-2.5 h-2.5 text-white" fill="white" />
                    </span>
                    <span>김변호사 외 1,234명</span>
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

            {/* CTA */}
            <div className="px-3 py-2 flex-shrink-0">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#1877F2] hover:bg-[#1864D9] text-white font-semibold py-2 rounded-md text-[11px] transition-colors">
                    더 알아보기
                </motion.button>
            </div>

            {/* 하단 5 탭 네비 */}
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
