"use client";

import React from "react";
import { Lock } from "lucide-react";

export interface Industry {
    id: string;
    name: string;
    active: boolean;
}

interface IndustryTabsProps {
    industries: Industry[];
    activeId: string;
    onChange: (id: string) => void;
}

export function IndustryTabs({ industries, activeId, onChange }: IndustryTabsProps) {
    return (
        <div className="relative">
            <div
                className="flex gap-2 overflow-x-auto pb-2 md:justify-center md:pb-0"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
                {industries.map((ind) => {
                    const isActive = activeId === ind.id;
                    const isAvailable = ind.active;

                    return (
                        <button
                            key={ind.id}
                            onClick={() => onChange(ind.id)}
                            className={`relative flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                isActive
                                    ? "bg-[var(--navy)] text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {!isAvailable && <Lock className="w-3 h-3 opacity-60" />}
                            <span>{ind.name}</span>
                            {!isAvailable && (
                                <span className="text-[10px] font-normal opacity-60">준비 중</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
