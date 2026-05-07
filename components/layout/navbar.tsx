"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// SaaS 영역 (블로그문자·구독형 랜딩페이지·회원가입·로그인·내 페이지) 표시 토글
// - 로컬 개발 (npm run dev) = NODE_ENV 'development' = 자동으로 보임
// - Production (Vercel) = env 안 박힘 = 안 보임
// - 추후 출시 시 Vercel env 에 NEXT_PUBLIC_SHOW_SAAS_NAV='true' 추가하면 즉시 활성
const SHOW_SAAS_NAV =
    process.env.NEXT_PUBLIC_SHOW_SAAS_NAV === "true" ||
    process.env.NODE_ENV === "development";

const baseNavStructure = [
    {
        label: "CPA 광고",
        items: [
            { label: "차별점", href: "/#features" },
            { label: "프로세스", href: "/#process" },
            { label: "법규 가드레일", href: "/#guardrail" },
            { label: "CPA 모델", href: "/#cpa-model" },
            { label: "업종", href: "/#industries" },
            { label: "광고 크리에이티브", href: "/ads" },
        ],
    },
];

const saasNavStructure = [
    {
        label: "블로그문자",
        items: [
            { label: "소개", href: "/blog-sms" },
            { label: "활용 가이드", href: "/blog-sms/guide" },
        ],
    },
    {
        label: "구독형 랜딩페이지",
        items: [
            { label: "소개 (곧 출시)", href: "/landing-pages" },
            { label: "1순위 알림 신청", href: "/landing-pages#pre-register" },
        ],
    },
];

const navStructure = SHOW_SAAS_NAV
    ? [...baseNavStructure, ...saasNavStructure]
    : baseNavStructure;

// 우측 상단 회원 영역 (블로그문자 + 구독형 랜딩페이지 공유)
const accountLinks = [
    { label: "내 페이지", href: "/blog-sms/dashboard" },
    { label: "로그인", href: "/blog-sms/login" },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMega, setOpenMega] = useState<string | null>(null);
    // Hero 화이트 미니멀 톤과 일관 — 헤더는 항상 흰 배경 + 진한 navy 글씨
    const navOnLight = true;
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenMega(null);
        };
        const handleClickOutside = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setOpenMega(null);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMouseEnter = (label: string) => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setOpenMega(label), 100);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setOpenMega(null), 200);
    };

    const handleToggle = (label: string) => {
        setOpenMega((prev) => (prev === label ? null : label));
    };

    return (
        <>
            <header
                ref={headerRef}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
                    navOnLight
                        ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 py-2"
                        : "bg-transparent py-2.5"
                )}
            >
                <div className="ot-container flex items-center justify-between lg:grid lg:grid-cols-3">
                    {/* Logo — lg: 좌측 (grid-col 1) / md·mobile: flex start */}
                    <Link
                        href="/"
                        aria-label="OT MARKETING"
                        className="flex items-center lg:justify-self-start"
                    >
                        <Image
                            src={navOnLight ? "/logo-ot-marketing-dark.png" : "/logo-ot-marketing-white.png"}
                            alt="OT MARKETING — CPA 마케팅 인프라"
                            width={200}
                            height={48}
                            priority
                            className="h-12 sm:h-14 lg:h-16 w-auto transition-all duration-200"
                        />
                    </Link>

                    {/* Desktop Nav — lg: 정중앙 (grid-col 2) / md: flex 자연 */}
                    <nav className="hidden md:flex items-center gap-1 lg:justify-self-center">
                        {navStructure.map((group) => (
                            <div
                                key={group.label}
                                className="relative"
                                onMouseEnter={() => handleMouseEnter(group.label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    onClick={() => handleToggle(group.label)}
                                    className={cn(
                                        "flex items-center gap-1 px-3 lg:px-4 py-2.5 rounded text-sm lg:text-base font-semibold tracking-tight whitespace-nowrap transition-colors hover:text-[var(--coral-400)]",
                                        navOnLight ? "text-[var(--navy)]" : "text-white/90"
                                    )}
                                >
                                    {group.label}
                                    <ChevronDown
                                        className={cn(
                                            "w-5 h-5 transition-transform duration-200",
                                            openMega === group.label ? "rotate-180" : ""
                                        )}
                                    />
                                </button>
                            </div>
                        ))}
                    </nav>

                    {/* Right — 회원 영역 (블로그문자 + 구독형 랜딩페이지 공유) */}
                    {SHOW_SAAS_NAV ? (
                        <div className="hidden md:flex items-center gap-1 lg:justify-self-end">
                            {accountLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:text-[var(--coral-500)]",
                                        navOnLight ? "text-[var(--navy-900)]/85" : "text-white/85"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/blog-sms/signup"
                                className="ml-1 inline-flex items-center px-4 py-2 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white text-sm font-semibold rounded-full whitespace-nowrap transition-colors"
                            >
                                회원가입
                            </Link>
                        </div>
                    ) : (
                        // SaaS 영역 숨김 시 grid-cols-3 보존용 빈 div
                        <div className="hidden lg:block lg:justify-self-end" aria-hidden />
                    )}

                    {/* Mobile Toggle */}
                    <button
                        className={cn("md:hidden p-2", navOnLight ? "text-[var(--navy)]" : "text-white")}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Desktop Mega Menu — full-width drop · 투명 배경 + 텍스트 강조 (사장 5/6 진단 반영) */}
                {navStructure.map((group) => (
                    <div
                        key={group.label}
                        className={cn(
                            "absolute left-0 right-0 top-full bg-transparent transition-all duration-200",
                            openMega === group.label
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 -translate-y-1 pointer-events-none"
                        )}
                        onMouseEnter={() => handleMouseEnter(group.label)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="max-w-7xl mx-auto px-6 py-5 hidden md:block">
                            <div className="flex flex-wrap justify-center gap-0">
                                {group.items.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setOpenMega(null)}
                                        className={cn(
                                            "block px-4 py-3 text-base font-semibold text-center transition-colors duration-150 hover:text-[var(--coral-500)]",
                                            navOnLight
                                                ? "text-[var(--navy-900)]/85"
                                                : "text-white/90 drop-shadow-sm"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[var(--navy)] pt-20 px-6 md:hidden overflow-y-auto">
                    <div className="flex flex-col">
                        {navStructure.map((group) => (
                            <div key={group.label} className="mb-6">
                                <p className="font-bold text-xl text-white mb-3">{group.label}</p>
                                <div className="flex flex-col pl-4 space-y-1">
                                    {group.items.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="text-white/80 text-lg py-2 border-b border-white/10 hover:text-[var(--coral-400)] transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {/* 회원 영역 — 모바일 (SaaS 영역 표시 시에만) */}
                        {SHOW_SAAS_NAV && (
                            <div className="mt-2 mb-8 pt-4 border-t border-white/15">
                                <p className="font-bold text-xl text-white mb-3">계정</p>
                                <div className="flex flex-col pl-4 space-y-1">
                                    {accountLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-white/80 text-lg py-2 border-b border-white/10 hover:text-[var(--coral-400)] transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/blog-sms/signup"
                                        className="mt-3 inline-flex items-center justify-center px-5 py-3 bg-[var(--coral-500)] text-white font-semibold rounded-full"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        무료 회원가입
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
