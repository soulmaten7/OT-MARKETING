"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-white/10 dark:border-white/5">
                <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-semibold tracking-tight">
                        OT <span className="text-accent">MARKETING</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            운영 방식
                        </Link>
                        <Link href="#industries" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            가능 업종
                        </Link>
                        <Link href="#metrics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            핵심 성과
                        </Link>
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Button size="sm" className="hidden md:inline-flex" asChild>
                            <Link href="#contact">광고주 문의</Link>
                        </Button>
                        <button
                            className="md:hidden p-2 text-foreground"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background pt-20 px-4 md:hidden"
                    >
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="#how-it-works"
                                className="text-lg font-medium p-2 border-b border-border"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                운영 방식
                            </Link>
                            <Link
                                href="#industries"
                                className="text-lg font-medium p-2 border-b border-border"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                가능 업종
                            </Link>
                            <Link
                                href="#metrics"
                                className="text-lg font-medium p-2 border-b border-border"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                핵심 성과
                            </Link>
                            <Button className="w-full mt-4" size="lg" asChild>
                                <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
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
