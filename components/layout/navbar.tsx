"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// STEP_108 — 사이트 모드 플래그
const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE || 'full'
const IS_CPA_ONLY = SITE_MODE === 'cpa_only'

// STEP_105 — 개발 모드 = 로그인·회원가입 버튼 대신 대시보드 바로가기
const DEV_BYPASS_AUTH = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === "true";

const NAV_ITEMS = IS_CPA_ONLY
    ? [{ label: "CPA 광고", href: "/cpa" }]
    : [
        { label: "랜딩페이지", href: "/landing-pages" },
        { label: "CPA 광고", href: "/cpa" },
        { label: "블로그문자", href: "/blog-sms" },
    ]

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={IS_CPA_ONLY ? "/cpa" : "/"} aria-label="OT MARKETING" className="flex items-center">
                        <Image
                            src="/logo-ot-marketing-dark.png"
                            alt="OT MARKETING"
                            width={160}
                            height={40}
                            priority
                            className="h-10 w-auto"
                        />
                    </Link>

                    {/* Desktop Nav — center */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Right */}
                    <div className="hidden md:flex items-center gap-2">
                        {IS_CPA_ONLY ? (
                            // cpa_only = 로그인·회원가입·대시보드 버튼 숨김
                            null
                        ) : DEV_BYPASS_AUTH ? (
                            // full + 개발 모드 = 대시보드 바로가기
                            <Link
                                href="/dashboard"
                                className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-full transition-colors"
                            >
                                대시보드
                            </Link>
                        ) : (
                            // full + 실제 = 로그인 + 무료 시작하기
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
                                >
                                    로그인
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-full transition-colors"
                                >
                                    무료 시작하기
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="메뉴 열기/닫기"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-16 overflow-y-auto md:hidden">
                    <div className="px-6 py-6 flex flex-col gap-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-3 text-base font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {!IS_CPA_ONLY && (
                            <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col gap-2">
                                {DEV_BYPASS_AUTH ? (
                                    <Link
                                        href="/dashboard"
                                        className="px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white text-base font-semibold rounded-xl transition-colors text-center"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        대시보드
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="px-4 py-3 text-base font-semibold text-neutral-600 hover:bg-neutral-50 rounded-xl transition-colors text-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            로그인
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white text-base font-semibold rounded-xl transition-colors text-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            무료 시작하기
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
