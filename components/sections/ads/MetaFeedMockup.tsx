"use client";
import { ThumbsUp, MessageCircle, Share2, Bookmark, Home, PlaySquare, Store, Bell, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function MetaFeedMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Helvetica, Arial' }}>
            {/* iOS 상태바 */}
            <div className="flex items-center justify-between px-3 flex-shrink-0" style={{ height: "22px", fontSize: "9px", fontWeight: 600 }}>
                <span>9:41</span>
                <div className="flex items-center gap-1">
                    <div className="flex gap-0.5 items-end">
                        <div style={{ width: "2px", height: "4px", background: "#050505", borderRadius: "0.5px" }} />
                        <div style={{ width: "2px", height: "6px", background: "#050505", borderRadius: "0.5px" }} />
                        <div style={{ width: "2px", height: "8px", background: "#050505", borderRadius: "0.5px" }} />
                        <div style={{ width: "2px", height: "10px", background: "#050505", borderRadius: "0.5px" }} />
                    </div>
                    <div style={{ width: "20px", height: "10px", border: "1px solid #050505", borderRadius: "2px", padding: "1px", boxSizing: "border-box", position: "relative" }}>
                        <div style={{ display: "block", height: "100%", width: "75%", background: "#050505", borderRadius: "1px" }} />
                    </div>
                </div>
            </div>

            {/* 페북 톱 헤더 */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-[#E4E6EB] flex-shrink-0">
                <div className="text-[#1877F2] font-black text-[13px] tracking-tight" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>facebook</div>
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#E4E6EB] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#E4E6EB] flex items-center justify-center">
                        <MessageCircle className="w-3 h-3 text-[#050505]" />
                    </div>
                </div>
            </div>

            {/* 탭 바 */}
            <div className="flex border-b border-[#E4E6EB] bg-white flex-shrink-0">
                {[
                    { icon: <Home className="w-3.5 h-3.5" />, active: true },
                    { icon: <PlaySquare className="w-3.5 h-3.5" />, active: false },
                    { icon: <Store className="w-3.5 h-3.5" />, active: false },
                    { icon: <Bell className="w-3.5 h-3.5" />, active: false },
                    { icon: <Menu className="w-3.5 h-3.5" />, active: false },
                ].map(({ icon, active }, i) => (
                    <div key={i} className="flex-1 flex items-center justify-center py-1.5"
                        style={{ color: active ? "#1877F2" : "#65676B", borderBottom: active ? "2px solid #1877F2" : "2px solid transparent" }}>
                        {icon}
                    </div>
                ))}
            </div>

            {/* 피드 */}
            <div className="flex-1 overflow-hidden flex flex-col" style={{ background: "#F0F2F5" }}>

                {/* 스폰서 포스트 */}
                <div className="bg-white flex-shrink-0">

                    {/* 포스트 헤더 */}
                    <div className="flex items-start gap-2 px-2.5 pt-2 pb-1">
                        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px]"
                            style={{ background: "radial-gradient(circle at 30% 30%, #E0C285, #9C7C42 60%, #6F5734)" }}>
                            법
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[10px] text-[#050505] leading-tight">법무법인 OO</div>
                            <div className="flex items-center gap-1 mt-0.5" style={{ fontSize: "7px", color: "#65676B" }}>
                                <span>광고 · 후원</span>
                                <span className="w-1 h-1 rounded-full bg-[#65676B]" />
                                <svg className="w-2 h-2" viewBox="0 0 16 16" fill="#65676B">
                                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 1a5.5 5.5 0 0 1 5.477 5H10.96c-.07-1.81-.49-3.42-1.144-4.55A5.5 5.5 0 0 1 13.477 7.5H10.96zM8 2.5c.6 0 1.34 1.36 1.6 4.5h-3.2C6.66 3.86 7.4 2.5 8 2.5zm-2.184.45C5.16 4.08 4.74 5.69 4.67 7.5H2.523A5.5 5.5 0 0 1 5.816 2.95zM2.523 8.5H4.67c.07 1.81.49 3.42 1.146 4.55A5.5 5.5 0 0 1 2.523 8.5zM8 13.5c-.6 0-1.34-1.36-1.6-4.5h3.2c-.26 3.14-1 4.5-1.6 4.5zm2.184-.45c.656-1.13 1.076-2.74 1.146-4.55h2.147a5.5 5.5 0 0 1-3.293 4.55z"/>
                                </svg>
                            </div>
                        </div>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" fill="#65676B">
                            <circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>
                        </svg>
                    </div>

                    {/* 본문 카피 (Tier 5 카피 보존: 변제계획 검토 무료 / 회생·파산 법률 안내) */}
                    <div className="px-2.5 pb-1.5 text-[8px] text-[#050505] leading-snug">
                        <span className="font-semibold">추심 정지</span> 가능한지, 먼저 확인해 보세요.{" "}
                        <span>변제계획 검토 무료 · 회생·파산 법률 안내 · 1분 자가진단</span>
                    </div>

                    {/* 광고 크리에이티브 — STEP_47 실 이미지 (자영업자 컨셉) */}
                    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.5 }}
                        className="relative overflow-hidden flex-shrink-0"
                        style={{ aspectRatio: "1 / 1" }}>
                        <Image
                            src="/ads-creatives/01-debt-relief/DR-011-A.png"
                            alt="자영업자 회생 안내"
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover z-0"
                        />
                        {/* 광고 태그 */}
                        <div className="absolute top-2 left-2 bg-black/50 text-white font-bold px-1.5 py-0.5 rounded z-10" style={{ fontSize: "6px", letterSpacing: "0.15em" }}>광고</div>
                        {/* 워터마크 */}
                        <div className="absolute top-2 right-2 z-10" style={{ fontSize: "6px", color: "rgba(255,255,255,0.7)", textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>otpage1.com</div>
                    </motion.div>

                    {/* CTA 바 */}
                    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-[#F0F2F5]">
                        <div className="flex-1 min-w-0">
                            <div style={{ fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.04em", color: "#65676B", fontWeight: 500 }}>otpage1.com</div>
                            <div style={{ fontSize: "9px", fontWeight: 700, color: "#050505", lineHeight: 1.25 }}>개인회생 자가진단 — 9문항 · 무료</div>
                        </div>
                        <button className="flex-shrink-0 bg-[#1877F2] text-white font-bold rounded-[6px]" style={{ fontSize: "8px", padding: "6px 10px" }}>
                            지금 무료 진단
                        </button>
                    </div>

                    {/* 반응 행 */}
                    <div className="flex items-center justify-between px-2.5 py-1 border-t border-[#E4E6EB]" style={{ fontSize: "8px", color: "#65676B" }}>
                        <div className="flex items-center gap-1">
                            <div className="flex items-center">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2] flex items-center justify-center border border-white">
                                    <ThumbsUp className="w-2 h-2 text-white" fill="white" />
                                </span>
                                <span className="w-3.5 h-3.5 rounded-full bg-[#F33E58] flex items-center justify-center border border-white -ml-1 text-white" style={{ fontSize: "7px" }}>♥</span>
                            </div>
                            <span>좋아요 1,234개</span>
                        </div>
                        <span>댓글 38 · 공유 12</span>
                    </div>

                    {/* 액션 행 */}
                    <div className="flex items-center border-t border-[#E4E6EB]">
                        {[
                            { icon: <ThumbsUp className="w-2.5 h-2.5" />, label: "좋아요" },
                            { icon: <MessageCircle className="w-2.5 h-2.5" />, label: "댓글 달기" },
                            { icon: <Share2 className="w-2.5 h-2.5" />, label: "공유하기" },
                        ].map(({ icon, label }, i) => (
                            <div key={i} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[#65676B]" style={{ fontSize: "8px", fontWeight: 600 }}>
                                {icon} {label}
                            </div>
                        ))}
                        <div className="flex items-center justify-center px-2 py-1.5 text-[#65676B]">
                            <Bookmark className="w-2.5 h-2.5" />
                        </div>
                    </div>
                </div>

                {/* 다음 포스트 스켈레톤 */}
                <div className="bg-white mt-1.5 flex-1 px-2.5 pt-2">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex-shrink-0" />
                        <div className="flex-1">
                            <div className="h-1.5 bg-[#E4E6EB] rounded w-1/2 mb-1" />
                            <div className="h-1.5 bg-[#E4E6EB] rounded w-1/3" />
                        </div>
                    </div>
                    <div className="h-1.5 bg-[#E4E6EB] rounded mb-1.5" style={{ width: "92%" }} />
                    <div className="h-1.5 bg-[#E4E6EB] rounded" style={{ width: "78%" }} />
                </div>
            </div>
        </div>
    );
}
