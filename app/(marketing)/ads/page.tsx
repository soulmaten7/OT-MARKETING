"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, FadeInUp } from "@/components/ui/motion";

import { PhoneFrame } from "@/components/sections/ads/PhoneFrame";
import { ChannelTabs } from "@/components/sections/ads/ChannelTabs";
import { IndustryTabs, type Industry } from "@/components/sections/ads/IndustryTabs";
import { IndustryComingSoon } from "@/components/sections/ads/IndustryComingSoon";
import { AdToLandingFlow } from "@/components/sections/ads/AdToLandingFlow";
import { MetaFeedMockup } from "@/components/sections/ads/MetaFeedMockup";
import { KarrotMockup } from "@/components/sections/ads/KarrotMockup";
import { NaverSearchMockup } from "@/components/sections/ads/NaverSearchMockup";
import { KakaoMomentMockup } from "@/components/sections/ads/KakaoMomentMockup";
import { GoogleGDNMockup } from "@/components/sections/ads/GoogleGDNMockup";
import { GoogleDiscoveryMockup } from "@/components/sections/ads/GoogleDiscoveryMockup";
import { PerformanceDataPanel } from "@/components/sections/ads/PerformanceDataPanel";

const industries: (Industry & { legalNote?: string })[] = [
    { id: "debt-relief", name: "개인회생",  active: true },
    { id: "rental",      name: "렌탈",      active: false, legalNote: "표시광고법 §3 (할부 조건 명시 의무)" },
    { id: "broadband",   name: "통신",      active: false, legalNote: "전기통신사업법 (요금 명시 의무)" },
    { id: "invest",      name: "리딩",      active: false, legalNote: "자본시장법 §174 (수익률 보장 표현 절대 금지)" },
    { id: "realestate",  name: "부동산",    active: false, legalNote: "공인중개사법 (자격 표기 의무)" },
    { id: "medical",     name: "병의원",    active: false, legalNote: "의료법 §56 (전문 표기·환자 후기 제한)" },
];

const channels = [
    { id: "all",    name: "전체" },
    { id: "meta",   name: "Meta" },
    { id: "google", name: "Google" },
    { id: "karrot", name: "당근" },
    { id: "naver",  name: "Naver" },
    { id: "kakao",  name: "카카오 모먼트" },
];

const mockups = [
    { id: "meta",   name: "Meta 피드",        color: "#1877F2", component: <MetaFeedMockup /> },
    { id: "karrot", name: "당근 비즈프로필",  color: "#FF7E36", component: <KarrotMockup /> },
    { id: "naver",  name: "Naver 검색광고",   color: "#03C75A", component: <NaverSearchMockup /> },
    { id: "kakao",  name: "카카오 모먼트",    color: "#FEE500", component: <KakaoMomentMockup /> },
    { id: "google", name: "Google GDN",       color: "#4285F4", component: <GoogleGDNMockup /> },
    { id: "google", name: "Google Discovery", color: "#EA4335", component: <GoogleDiscoveryMockup /> },
];

export default function AdsPage() {
    const [industry, setIndustry] = useState("debt-relief");
    const [active, setActive] = useState("all");

    const currentIndustry = industries.find((i) => i.id === industry)!;

    const handleIndustryChange = (id: string) => {
        setIndustry(id);
        setActive("all");
    };

    const visibleMockups =
        active === "all" ? mockups : mockups.filter((m) => m.id === active);

    return (
        <div className="bg-white">
            {/* 1. Hero */}
            <section className="hero-gradient-bg text-white pt-44 md:pt-48 pb-20">
                <div className="ot-container text-center max-w-3xl mx-auto">
                    <FadeIn>
                        <div className="text-[var(--coral-400)] text-xs tracking-widest font-bold mb-4">
                            CPA · AD CREATIVES
                        </div>
                    </FadeIn>
                    <FadeInUp>
                        <h1
                            className="font-display text-3xl md:text-5xl mb-6 leading-[1.2] text-white"
                            style={{ textWrap: "balance" } as React.CSSProperties}
                        >
                            광고 크리에이티브{" "}
                            <span className="text-gradient-coral font-semibold">6 매체</span>
                        </h1>
                    </FadeInUp>
                    <FadeIn delay={0.3}>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed">
                            OT MARKETING 은 6 매체에 동시 광고를 운영합니다.
                            <br className="hidden md:block" />
                            매체별 톤·포맷에 맞춘 크리에이티브 + 광고 → 랜딩 일체 설계.
                            <br className="hidden md:block" />
                            <span className="text-[var(--coral-400)] font-semibold">
                                광고와 랜딩이 한 몸으로 굴러가는 CPA 인프라.
                            </span>
                        </p>
                        <p className="mt-6 text-sm md:text-base text-white/60 font-mono tracking-wide">
                            6 업종 × 6 매체 = 36 시안 매트릭스
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 2. 업종 탭 (1차 분류) — sticky 상단 */}
            <section className="py-6 md:py-8 border-b border-gray-100 sticky top-[72px] bg-white z-30 shadow-sm">
                <div className="ot-container space-y-3 md:space-y-4">
                    {/* 1차: 업종 */}
                    <div>
                        <div className="text-[10px] md:text-xs text-gray-400 font-bold tracking-widest mb-2 text-center md:text-left max-w-6xl mx-auto">
                            업종 · INDUSTRY
                        </div>
                        <IndustryTabs
                            industries={industries}
                            activeId={industry}
                            onChange={handleIndustryChange}
                        />
                    </div>

                    {/* 2차: 매체 — 활성 업종일 때만 표시 */}
                    {currentIndustry.active && (
                        <div>
                            <div className="text-[10px] md:text-xs text-gray-400 font-bold tracking-widest mb-2 text-center md:text-left max-w-6xl mx-auto">
                                매체 · CHANNEL
                            </div>
                            <ChannelTabs channels={channels} active={active} onChange={setActive} />
                        </div>
                    )}
                </div>
            </section>

            {/* 3. 분기 렌더 — 활성 업종이면 mockup, 비활성이면 ComingSoon */}
            <section className="py-16 md:py-24">
                <div className="ot-container">
                    <AnimatePresence mode="wait">
                        {currentIndustry.active ? (
                            <motion.div
                                key={`mockups-${industry}-${active}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={`gap-12 md:gap-16 max-w-6xl mx-auto ${
                                    visibleMockups.length === 1
                                        ? "flex justify-center"
                                        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
                                }`}>
                                    {visibleMockups.map((m, idx) => (
                                        <PhoneFrame
                                            key={`${m.id}-${idx}`}
                                            label={m.name}
                                            accentColor={m.color}
                                        >
                                            {m.component}
                                        </PhoneFrame>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`coming-soon-${industry}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <IndustryComingSoon
                                    industryName={currentIndustry.name}
                                    legalNote={currentIndustry.legalNote}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* 4. 광고 → 랜딩 흐름 */}
            <section className="py-20 md:py-28 bg-gray-50">
                <div className="ot-container">
                    <FadeInUp className="text-center max-w-3xl mx-auto mb-12">
                        <div className="eyebrow mb-4">AD-TO-LANDING MATCH</div>
                        <h2 className="font-display text-2xl md:text-4xl text-[var(--navy)] mb-4 leading-[1.3]">
                            광고와 랜딩은{" "}
                            <span className="text-gradient-coral font-semibold">한 몸</span>입니다
                        </h2>
                        <p className="text-base md:text-lg text-[var(--slate-600)] leading-relaxed">
                            다이나믹한 시각 효과는 광고 화면에. 정확하고 디테일한 정보는 랜딩에.
                            <br className="hidden md:block" />
                            매체별 톤을 일치시켜 광고주의 브랜드 인식이 끊기지 않도록 설계합니다.
                        </p>
                    </FadeInUp>
                    <AdToLandingFlow />
                    <p className="text-center text-sm text-[var(--slate-600)] mt-8">
                        광고 클릭 → 0.3초 → 랜딩 도착 — 광고와 랜딩이 한 몸으로 굴러갑니다
                    </p>
                </div>
            </section>

            {/* 5. 성능 데이터 */}
            <section className="py-20 md:py-28">
                <div className="ot-container max-w-5xl mx-auto">
                    <FadeInUp className="text-center max-w-3xl mx-auto mb-12">
                        <div className="eyebrow mb-4">PERFORMANCE DATA</div>
                        <h2 className="font-display text-2xl md:text-4xl text-[var(--navy)] mb-4 leading-[1.3]">
                            R&D 운영 데이터로 검증
                        </h2>
                        <p className="text-base md:text-lg text-[var(--slate-600)] leading-relaxed">
                            현재 6 매체 R&D 광고 운영 중. 실제 운영 결과 기반 CPA·CTR·CVR 데이터를 곧 공개합니다.
                        </p>
                    </FadeInUp>
                    <PerformanceDataPanel />
                </div>
            </section>

            {/* 6. CTA */}
            <section className="py-20 md:py-28 hero-gradient-bg text-white">
                <div className="ot-container text-center max-w-3xl mx-auto">
                    <FadeInUp>
                        <h2 className="font-display text-2xl md:text-4xl mb-6 leading-[1.3] text-white">
                            6 매체 운영 deck,{" "}
                            <span className="text-gradient-coral font-semibold">미팅에서 공개</span>
                        </h2>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10">
                            매체별 best-performer 크리에이티브 + CPA 단가 + DB 품질 데이터.
                            <br className="hidden md:block" />
                            광고주 미팅 시 비공개 deck 으로 별도 안내드립니다.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-bold px-8 py-4 rounded-md text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        >
                            광고주 상담 신청
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </FadeInUp>
                </div>
            </section>
        </div>
    );
}
