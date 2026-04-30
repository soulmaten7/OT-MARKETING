"use client";

import { Search, MessageCircle, Heart, MessageSquare, Share2, Home, PlaySquare, User } from "lucide-react";

export function MetaFeedMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs">
            {/* 상단 바 */}
            <div className="flex items-center justify-between px-3 h-12 border-b border-gray-100 pt-6">
                <div className="font-bold text-[#1877F2] text-base">facebook</div>
                <div className="flex gap-2">
                    <Search className="w-4 h-4 text-gray-700" />
                    <MessageCircle className="w-4 h-4 text-gray-700" />
                </div>
            </div>

            {/* 스토리 행 */}
            <div className="flex gap-2 px-3 py-2 overflow-hidden">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-12 h-12 rounded-full flex-shrink-0 border-2 border-[#1877F2]"
                        style={{ background: `linear-gradient(${i * 60}deg, #FF7E36, #1877F2)` }}
                    />
                ))}
            </div>

            {/* 광고 카드 */}
            <div className="flex-1 border-t border-gray-100 flex flex-col">
                <div className="flex items-center gap-2 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--coral-500)] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] truncate">법무법인 OO</div>
                        <div className="text-[9px] text-gray-500">광고 · 회생·파산 전담</div>
                    </div>
                    <div className="text-gray-400">⋯</div>
                </div>

                <div className="aspect-square bg-gradient-to-br from-[var(--coral-500)] to-[var(--navy)] flex items-center justify-center text-white">
                    <div className="text-center px-4">
                        <div className="text-lg font-bold mb-1 leading-tight">월 변제금</div>
                        <div className="text-2xl font-bold leading-tight">부담되시나요?</div>
                    </div>
                </div>

                <div className="flex items-center gap-4 px-3 py-2 border-t border-gray-100">
                    <Heart className="w-4 h-4" />
                    <MessageSquare className="w-4 h-4" />
                    <Share2 className="w-4 h-4" />
                </div>

                <div className="px-3 pb-2">
                    <p className="text-[10px] mb-2 leading-relaxed">
                        <span className="font-bold">법무법인 OO</span> 법률 상담 무료 · 1분 자가진단으로 변제계획 검토받으세요.
                    </p>
                    <button className="w-full bg-[#1877F2] text-white font-bold py-2 rounded text-[11px]">
                        더 알아보기
                    </button>
                </div>
            </div>

            {/* 하단 네비 */}
            <div className="flex items-center justify-around h-10 border-t border-gray-100 flex-shrink-0">
                <Home className="w-4 h-4 text-[#1877F2]" />
                <PlaySquare className="w-4 h-4 text-gray-400" />
                <User className="w-4 h-4 text-gray-400" />
            </div>
        </div>
    );
}
