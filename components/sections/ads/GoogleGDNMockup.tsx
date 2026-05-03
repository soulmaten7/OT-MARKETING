"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function GoogleGDNMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
            {/* 호스트 사이트 헤더 */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 flex-shrink-0">
                <div className="font-black text-[12px] text-gray-900 tracking-tight">DAILY NEWS</div>
                <div className="text-[8px] text-gray-500">2026.04.30 · 19:42</div>
            </div>

            {/* 호스트 컨텐츠 (위) */}
            <div className="px-3 pt-2 pb-1 flex-shrink-0">
                <div className="text-[9px] font-bold text-[#EA4335] mb-1">[경제]</div>
                <div className="text-[10px] font-bold text-gray-900 mb-1.5 leading-snug">
                    가계부채 1,800조 돌파, 회생·파산 신청 급증
                </div>
                <div className="text-[8px] text-gray-500 mb-2">김기자 · 2시간 전 · 댓글 24</div>
                <div className="space-y-1">
                    {[100, 88, 72].map((w, i) => (
                        <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                    ))}
                </div>
            </div>

            {/* GDN 배너 — 300×250 medium rectangle */}
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="mx-3 my-2 rounded-lg overflow-hidden border border-gray-200 shadow-md flex-shrink-0">
                <div className="flex">
                    {/* 좌측 이미지 (1/3) */}
                    <div className="w-[35%] relative aspect-square overflow-hidden">
                        <Image
                            src="/ads-creatives/01-debt-relief/DR-014-A.png"
                            alt="월급 압류 구제 안내"
                            fill
                            sizes="120px"
                            className="object-cover z-0"
                        />
                        <div className="absolute top-1 left-1 bg-black/50 text-white text-[7px] px-1 py-0.5 rounded font-bold z-10">광고</div>
                    </div>
                    {/* 우측 카피 */}
                    <div className="flex-1 px-2.5 py-2 bg-white flex flex-col justify-between">
                        <div>
                            <div className="text-[11px] font-bold text-gray-900 leading-tight mb-1">변제계획 검토 무료</div>
                            <div className="text-[8px] text-gray-600 leading-snug">회생·파산 법률상담</div>
                        </div>
                        <button className="bg-[#1A73E8] text-white font-bold text-[9px] px-2 py-1 rounded mt-2 self-start">
                            확인하기
                        </button>
                    </div>
                </div>
                <div className="px-2 py-1 bg-gray-50 flex items-center justify-between border-t border-gray-200">
                    <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                            <span className="w-1 h-1 rounded-full bg-[#4285F4]" />
                            <span className="w-1 h-1 rounded-full bg-[#EA4335]" />
                            <span className="w-1 h-1 rounded-full bg-[#FBBC05]" />
                            <span className="w-1 h-1 rounded-full bg-[#34A853]" />
                        </div>
                        <div className="text-[7px] text-gray-500">법무법인 OO · 광고</div>
                    </div>
                    <div className="text-[7px] text-gray-400">Ads by Google</div>
                </div>
            </motion.div>

            {/* 호스트 컨텐츠 (계속) */}
            <div className="flex-1 px-3 py-1">
                <div className="space-y-1.5">
                    {[100, 85, 95, 70, 80, 60, 90, 75].map((w, i) => (
                        <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                    ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="text-[9px] text-gray-500 mb-1 font-bold">관련 기사</div>
                    <div className="flex items-center gap-2 p-1.5 border border-gray-100 rounded">
                        <div className="w-7 h-7 bg-gradient-to-br from-[var(--coral-100)] to-orange-100 rounded flex-shrink-0" />
                        <div>
                            <div className="text-[9px] font-bold text-gray-700 leading-tight">개인회생 신청 자격 정리</div>
                            <div className="text-[7px] text-gray-400">DAILY NEWS · 5시간 전</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
