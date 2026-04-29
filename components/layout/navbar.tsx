"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navStructure = [
    {
        label: "CPA 광고",
        items: [
            { label: "차별점", href: "/#features" },
            { label: "프로세스", href: "/#process" },
            { label: "법규 가드레일", href: "/#guardrail" },
            { label: "CPA 모델", href: "/#cpa-model" },
            { label: "업종", href: "/#industries" },
            { label: "디자인 시안", href: "/samples" },
        ],
    },
    // 미래: { label: "랜딩 구독", items: [...] },
    // 미래: { label: "통합 마케팅", items: [...] },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMega, setOpenMega] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const navOnLight = !isHome || isScrolled;
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                        ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 py-1.5"
                        : "bg-transparent py-2.5"
                )}
            >
                <div className="ot-container flex items-center justify-between">
                    {/* Logo — dark/white 조건부 src (래퍼 없음) */}
                    <Link href="/" aria-label="OT MARKETING" className="flex items-center">
                        <Image
                            src={navOnLight ? "/logo-ot-marketing-dark.png" : "/logo-ot-marketing-white.png"}
                            alt="OT MARKETING — CPA 마케팅 인프라"
                            width={200}
                            height={48}
                            priority
                            className="h-14 sm:h-16 lg:h-20 w-auto transition-all duration-200"
                        />
                    </Link>

                    {/* Desktop Nav — center */}
                    <nav className="hidden md:flex items-center gap-1">
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
                                        "flex items-center gap-1 px-5 py-2.5 rounded text-base lg:text-lg font-semibold tracking-wide transition-colors hover:text-[var(--coral-400)]",
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

                    {/* Right — empty placeholder */}
                    <div className="hidden md:block w-[120px]">
                        {/* TODO: Phase 2 SaaS 출시 시 로그인·회원가입 버튼 위치 */}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={cn("md:hidden p-2", navOnLight ? "text-[var(--navy)]" : "text-white")}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Desktop Mega Menu — full-width drop · Navy 톤 통일 (헤더와 같은 배경 + 외곽선 강조) */}
                {navStructure.map((group) => (
                    <div
                        key={group.label}
                        className={cn(
                            "absolute left-0 right-0 top-full bg-[var(--navy-900)]/30 backdrop-blur-xl shadow-2xl border-t border-white/10 transition-all duration-200",
                            openMega === group.label
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 -translate-y-1 pointer-events-none"
                        )}
                        onMouseEnter={() => handleMouseEnter(group.label)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="max-w-7xl mx-auto px-6 py-6 hidden md:block">
                            <div className="grid grid-cols-6 gap-0">
                                {group.items.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setOpenMega(null)}
                                        className="block px-4 py-4 text-base font-semibold text-white/90 text-center rounded hover:bg-white/10 hover:text-[var(--coral-400)] transition-colors duration-150"
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
                    </div>
                </div>
            )}
        </>
    );
}
