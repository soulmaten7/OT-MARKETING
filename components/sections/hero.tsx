import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-background to-background dark:from-blue-950/20 dark:via-background dark:to-background" />

            <div className="container px-4 md:px-6 text-center">
                <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-950 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-50">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                        2026 신규 런칭 · 대표 직접 운영 부티크 에이전시
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                        광고주 한 분씩,
                        <br />
                        <span className="text-accent inline-block mt-2">대표가 직접</span> 운영합니다
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        6 업종 랜딩·스크립트·계약서 자산을 이미 준비해 두었습니다.
                        <br className="hidden md:block" />
                        광고주님은 광고에만 집중하세요.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
                            <Link href="#contact">
                                상담 신청하기
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto group" asChild>
                            <Link href="/showcase" className="flex items-center gap-2">
                                랜딩 시안 미리보기
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                    <p className="text-sm text-muted-foreground pt-4">
                        6 디자인 시안 · 업종별 상담 스크립트 · 을(광고주) 보호 표준계약서
                    </p>
                </div>
            </div>
        </section>
    );
}
