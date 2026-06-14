"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IndustryTabs }     from "@/components/sections/ads-mockup/IndustryTabs";
import type { Industry }    from "@/components/sections/ads-mockup/IndustryTabs";
import { ChannelTabs }      from "@/components/sections/ads-mockup/ChannelTabs";
import { PhoneFrame }       from "@/components/sections/ads-mockup/PhoneFrame";
import { industryMockups }  from "@/components/sections/ads-mockup/industry/index";

const INDUSTRIES: Industry[] = [
    { id: "debt-relief", name: "개인회생", active: true },
    { id: "rental",      name: "렌탈",     active: true },
    { id: "broadband",   name: "통신",     active: true },
    { id: "invest",      name: "리딩",     active: true },
    { id: "realestate",  name: "부동산",   active: true },
    { id: "medical",     name: "병의원",   active: true },
];

const CHANNELS = [
    { id: "all",    name: "전체" },
    { id: "meta",   name: "Meta" },
    { id: "karrot", name: "당근" },
    { id: "naver",  name: "Naver" },
    { id: "kakao",  name: "카카오" },
    { id: "google", name: "Google" },
];

export function AdCreativeGallery() {
    const [industry, setIndustry] = useState("debt-relief");
    const [channel, setChannel]   = useState("all");

    const handleIndustryChange = (id: string) => {
        setIndustry(id);
        setChannel("all");
    };

    const currentMockups = industryMockups[industry] ?? [];
    const visibleMockups = channel === "all"
        ? currentMockups
        : currentMockups.filter((m) => m.id === channel);

    return (
        <div className="space-y-8">
            {/* 탭 */}
            <div className="space-y-3">
                <div className="text-[10px] text-neutral-400 font-bold tracking-widest text-center">
                    업종 · INDUSTRY
                </div>
                <IndustryTabs
                    industries={INDUSTRIES}
                    activeId={industry}
                    onChange={handleIndustryChange}
                />
            </div>
            <div className="space-y-3">
                <div className="text-[10px] text-neutral-400 font-bold tracking-widest text-center">
                    매체 · CHANNEL
                </div>
                <ChannelTabs channels={CHANNELS} active={channel} onChange={setChannel} />
            </div>

            {/* mockup 그리드 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${industry}-${channel}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.28 }}
                    className={`gap-12 md:gap-16 max-w-6xl mx-auto ${
                        visibleMockups.length === 1
                            ? "flex justify-center"
                            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
                    }`}
                >
                    {visibleMockups.map((m, i) => (
                        <PhoneFrame key={`${m.id}-${i}`} label={m.name} accentColor={m.color}>
                            {m.component}
                        </PhoneFrame>
                    ))}
                </motion.div>
            </AnimatePresence>

            <p className="text-center text-xs text-neutral-400 pt-2">
                6 업종 × 6 매체 = 36 시안 매트릭스 · 광고주 명의 100% 분리
            </p>
        </div>
    );
}
