"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    // 홈(/)에서만 네이비 히어로 위에 투명 상태 시작. 다른 페이지는 처음부터 흰 배경 상태.
    const isHome = pathname === "/";
    const navOnLight = !isHome || isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
                    navOnLight
                        ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="ot-container flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className={cn(
                            "font-serif text-2xl tracking-tight transition-colors",
                            navOnLight ? "text-[var(--navy)]" : "text-white"
                        )}
                    >
                        OT <span className="text-[var(--gold)]">MARKETING</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {[
                            { label: "차별점", href: "/#what-we-bring" },
                            { label: "프로세스", href: "/#how-it-works" },
                            { label: "법규 가드레일", href: "/#guardrail" },
                            { label: "CPA 모델", href: "/#cpa-model" },
                            { label: "업종", href: "/#industries" },
                            { label: "시안", href: "/showcase" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-[var(--gold)]",
                                    navOnLight ? "text-[var(--navy)]" : "text-white/90"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/#contact"
                            className="hidden md:inline-flex bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--navy)] text-sm font-bold px-5 py-2.5 rounded transition-colors"
                        >
                            광고주 문의
                        </Link>
                        <button
                            className={cn("md:hidden p-2", navOnLight ? "text-[var(--navy)]" : "text-white")}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[var(--navy)] pt-24 px-6 md:hidden">
                    <div className="flex flex-col space-y-2 text-center">
                        {[
                            { label: "차별점", href: "/#what-we-bring" },
                            { label: "프로세스", href: "/#how-it-works" },
                            { label: "법규 가드레일", href: "/#guardrail" },
                            { label: "CPA 모델", href: "/#cpa-model" },
                            { label: "업종", href: "/#industries" },
                            { label: "시안", href: "/showcase" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="font-serif text-2xl text-white py-3 border-b border-white/10 hover:text-[var(--gold)]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            className="bg-[var(--gold)] text-[var(--navy)] font-bold py-4 mt-6 rounded text-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            광고주 문의
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
