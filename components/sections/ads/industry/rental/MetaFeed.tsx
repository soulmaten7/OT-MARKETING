"use client";
import { ThumbsUp, MessageCircle, Share2, Bookmark, Home, PlaySquare, Store, Bell, Menu } from "lucide-react";
import { motion } from "framer-motion";

export function MetaFeed() {
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
                    <div style={{ width: "20px", height: "10px", border: "1px solid #050505", borderRadius: "2px", padding: "1px", boxSizing: "border-box" }}>
                        <div style={{ height: "100%", width: "75%", background: "#050505", borderRadius: "1px" }} />
                    </div>
                </div>
            </div>

            {/* 소셜 피드 헤더 (플랫폼 중립) */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-[#E4E6EB] flex-shrink-0">
                <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold" style={{ fontSize: "11px" }}>s</div>
                    <div className="text-[#1877F2] font-black text-[11px] tracking-tight">socialfeed</div>
                </div>
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
                            style={{ background: "radial-gradient(circle at 30% 30%, #FF8E8E, #E55A1A 60%, #B43A19)" }}>
                            정
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[10px] text-[#050505] leading-tight">OO 정수기 렌탈</div>
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

                    {/* 본문 카피 (Tier 5 카피 보존: 무이자 36개월 렌탈 / 월 요금 · 총액 명시) */}
                    <div className="px-2.5 pb-1.5 text-[8px] text-[#050505] leading-snug">
                        <span className="font-semibold">사은품 말고, 현금이 좋더라구요.</span>{" "}
                        <span>무이자 36개월 렌탈 · 월 요금 · 총액 명시 · 5단계 필터 · 약정 1년</span>
                    </div>

                    {/* 광고 크리에이티브 — 다크 네이비 + 30만원 통계 + SVG 일러스트 */}
                    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.5 }}
                        className="relative overflow-hidden flex-shrink-0"
                        style={{ aspectRatio: "1 / 1", background: "linear-gradient(180deg, #0F172A 0%, #0A1024 100%)" }}>
                        {/* 핀 그리드 패턴 */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: "linear-gradient(to right, rgba(197,165,114,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(197,165,114,0.06) 1px, transparent 1px)",
                            backgroundSize: "18px 18px"
                        }} />
                        {/* 광고 태그 */}
                        <div className="absolute top-2 left-2 bg-black/40 text-white font-bold px-1.5 py-0.5 rounded z-10" style={{ fontSize: "6px", letterSpacing: "0.15em" }}>광고</div>
                        {/* 워터마크 */}
                        <div className="absolute top-2 right-2 z-10" style={{ fontSize: "6px", color: "rgba(255,255,255,0.4)" }}>ot-water.kr</div>
                        {/* 아이브로우 — 코랄 */}
                        <div className="absolute left-0 right-0 flex justify-center z-10" style={{ top: "22px" }}>
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" />
                                <span style={{ fontFamily: "system-ui", fontSize: "8px", fontWeight: 700, color: "#FF6B6B" }}>💰 현금 지원</span>
                            </div>
                        </div>
                        {/* 히어로 스탯 */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ paddingBottom: "32%" }}>
                            <div className="font-bold leading-none text-[#C5A572]" style={{ fontSize: "clamp(26px, 9vw, 40px)", fontFamily: "Georgia, 'Times New Roman', serif", textShadow: "0 2px 10px rgba(0,0,0,0.4)", letterSpacing: "-0.035em" }}>
                                30<span style={{ fontSize: "0.42em", verticalAlign: "0.18em", marginLeft: "4px", fontWeight: 700 }}>만원</span>
                            </div>
                            {/* 골드 룰 */}
                            <div className="my-1.5" style={{ width: "20px", height: "1px", background: "rgba(197,165,114,0.55)" }} />
                            {/* 강조 박스 */}
                            <div className="text-white font-bold text-center" style={{ fontSize: "7px", background: "rgba(197,165,114,0.20)", border: "1px solid rgba(197,165,114,0.45)", padding: "3px 8px", borderRadius: "4px" }}>
                                사은품 X · 현금만 지급
                            </div>
                            <div className="text-center mt-1" style={{ fontSize: "6.5px", color: "rgba(255,255,255,0.82)" }}>설치 당일 즉시 입금 · 약정 1년</div>
                        </div>
                        {/* 하단 SVG 일러스트 */}
                        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 380 140" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYEnd meet" style={{ height: "33%" }}>
                            <line x1="20" y1="135" x2="360" y2="135" stroke="rgba(197,165,114,0.5)" strokeWidth="1"/>
                            {/* 정수기 */}
                            <g transform="translate(40 22)">
                                <rect x="22" y="0" width="46" height="6" rx="1.5" fill="#C5A572"/>
                                <rect x="14" y="6" width="62" height="100" rx="4" fill="#E8DDC4" stroke="#C5A572" strokeWidth="1.2"/>
                                <rect x="22" y="14" width="46" height="40" rx="2" fill="#0F172A" stroke="#C5A572" strokeWidth="0.8"/>
                                <path d="M45 22 C 41 28, 38 32, 38 38 a 7 7 0 0 0 14 0 c 0 -6 -3 -10 -7 -16 z" fill="rgba(197,165,114,0.85)"/>
                                <rect x="38" y="58" width="14" height="4" rx="1" fill="#C5A572"/>
                                <rect x="10" y="106" width="70" height="4" fill="#C5A572"/>
                            </g>
                            {/* 5단계 필터 */}
                            <g transform="translate(145 50)">
                                <text x="45" y="-4" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#C5A572" fontWeight="700" letterSpacing="2">5단계 필터</text>
                                <rect x="0"  y="6" width="12" height="52" rx="2" fill="#1A2540" stroke="#C5A572" strokeWidth="0.9"/>
                                <rect x="20" y="6" width="12" height="52" rx="2" fill="#1A2540" stroke="#C5A572" strokeWidth="0.9"/>
                                <rect x="40" y="6" width="12" height="52" rx="2" fill="#1A2540" stroke="#C5A572" strokeWidth="0.9"/>
                                <rect x="60" y="6" width="12" height="52" rx="2" fill="#1A2540" stroke="#C5A572" strokeWidth="0.9"/>
                                <rect x="80" y="6" width="12" height="52" rx="2" fill="#1A2540" stroke="#C5A572" strokeWidth="0.9"/>
                                <rect x="-1" y="3" width="14" height="5" rx="1.5" fill="#C5A572"/>
                                <rect x="19" y="3" width="14" height="5" rx="1.5" fill="#C5A572"/>
                                <rect x="39" y="3" width="14" height="5" rx="1.5" fill="#C5A572"/>
                                <rect x="59" y="3" width="14" height="5" rx="1.5" fill="#C5A572"/>
                                <rect x="79" y="3" width="14" height="5" rx="1.5" fill="#C5A572"/>
                            </g>
                            {/* 현금 다발 */}
                            <g transform="translate(272 40)">
                                <rect x="6" y="14" width="78" height="44" rx="3" fill="#0F172A" stroke="#C5A572" strokeWidth="1"/>
                                <rect x="0" y="6" width="78" height="44" rx="3" fill="#E0C285" stroke="#0F172A" strokeWidth="0.8"/>
                                <rect x="3" y="9" width="72" height="38" rx="2" fill="none" stroke="rgba(15,23,42,0.45)" strokeWidth="0.6"/>
                                <circle cx="18" cy="28" r="8" fill="none" stroke="#0F172A" strokeWidth="1"/>
                                <text x="18" y="32" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fill="#0F172A" fontWeight="700">₩</text>
                                <text x="52" y="25" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontWeight="700" fill="#0F172A">300,000</text>
                                <rect x="-2" y="30" width="84" height="7" fill="#FF6B6B" opacity="0.85"/>
                                <text x="40" y="36" textAnchor="middle" fontFamily="monospace" fontSize="6" fontWeight="700" fill="#fff" letterSpacing="2">즉시 입금</text>
                            </g>
                        </svg>
                    </motion.div>

                    {/* CTA 바 */}
                    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-[#F0F2F5]">
                        <div className="flex-1 min-w-0">
                            <div style={{ fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.04em", color: "#65676B", fontWeight: 500 }}>ot-water.kr · 1분 견적</div>
                            <div style={{ fontSize: "9px", fontWeight: 700, color: "#050505", lineHeight: 1.25 }}>정수기 렌탈 · 5단계 필터 · 약정 1년</div>
                        </div>
                        <button className="flex-shrink-0 bg-[#1877F2] text-white font-bold rounded-[6px]" style={{ fontSize: "8px", padding: "6px 10px" }}>
                            지금 30만원 받기
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
                            <span>좋아요 4,127개</span>
                        </div>
                        <span>댓글 89 · 공유 24</span>
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
