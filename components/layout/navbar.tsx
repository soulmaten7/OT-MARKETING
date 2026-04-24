"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-white/70 backdrop-blur-xl border-b border-black/5 dark:bg-black/70 dark:border-white/5 py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="container mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-semibold tracking-tighter text-foreground">
                        OT <span className="text-accent">MARKETING</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/#what-we-bring" className="text-[15px] font-medium text-foreground/80 hover:text-accent transition-colors">
                            준비된 자산
                        </Link>
                        <Link href="/showcase" className="text-[15px] font-medium text-foreground/80 hover:text-accent transition-colors">
                            시안 미리보기
                        </Link>
                        <Link href="/guide" className="text-[15px] font-medium text-foreground/80 hover:text-accent transition-colors">
                            콘텐츠 가이드
                        </Link>
                        <Link href="/#how-it-works" className="text-[15px] font-medium text-foreground/80 hover:text-accent transition-colors">
                            운영 방식
                        </Link>
                        <Link href="/#industries" className="text-[15px] font-medium text-foreground/80 hover:text-accent transition-colors">
                            업종
                        </Link>
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Button size="sm" className="hidden md:inline-flex rounded-full px-6 bg-foreground text-background hover:bg-foreground/80 font-medium" asChild>
                            <Link href="#contact">광고주 문의</Link>
                        </Button>
                        <button
                            className="md:hidden p-2 text-foreground"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col space-y-5 text-center">
                            <Link
                                href="/#what-we-bring"
                                className="text-xl font-semibold text-foreground/90 py-2 border-b border-border/50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                준비된 자산
                            </Link>
                            <Link
                                href="/showcase"
                                className="text-xl font-semibold text-foreground/90 py-2 border-b border-border/50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                시안 미리보기
                            </Link>
                            <Link
                                href="/guide"
                                className="text-xl font-semibold text-foreground/90 py-2 border-b border-border/50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                콘텐츠 가이드
                            </Link>
                            <Link
                                href="/#how-it-works"
                                className="text-xl font-semibold text-foreground/90 py-2 border-b border-border/50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                운영 방식
                            </Link>
                            <Link
                                href="/#industries"
                                className="text-xl font-semibold text-foreground/90 py-2 border-b border-border/50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                업종
                            </Link>
                            <Button className="w-full mt-6 rounded-full h-12 text-lg" size="lg" asChild>
                                <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
                                    지금 문의하기
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
