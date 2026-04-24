"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger";
import Link from "next/link";
import { Eye, FileText, ShieldCheck, BookOpen, ArrowRight } from "lucide-react";

const assets = [
    {
        icon: Eye,
        title: "6 업종 랜딩페이지 시안",
        desc: "신뢰·액션·케어·미니멀·다크·비비드. 업종 톤에 맞춰 6 가지 디자인을 즉시 적용 가능합니다.",
        linkHref: "/showcase",
        linkText: "시안 바로 보기",
    },
    {
        icon: FileText,
        title: "업종별 1차콜 상담 스크립트",
        desc: "개인회생·정수기·통신·주식·부동산·병의원. 풀매뉴얼 13섹션, A4 6p 구조. 광고주 브랜드에 맞춰 `{회사명}` 치환.",
        linkHref: "/showcase",
        linkText: "참고 자료",
    },
    {
        icon: ShieldCheck,
        title: "CPA 표준계약서",
        desc: "중복 DB 판정 · 무효율 관리 · 정산 주기 · 해지 조건까지 13조 명문화. 광고주(을) 보호 조항 중심.",
        linkHref: "#contact",
        linkText: "계약서 요청",
    },
    {
        icon: BookOpen,
        title: "광고주용 콘텐츠 가이드",
        desc: "헤드라인·이미지·법적 고지까지 \"무엇을·어디에·얼마나\" 정리. 처음 랜딩 진행하셔도 막막하지 않습니다.",
        linkHref: "/guide",
        linkText: "가이드 읽기",
    },
];

export function WhatWeBring() {
    return (
        <section id="what-we-bring" className="py-32 bg-background relative border-y border-black/5 dark:border-white/5">
            <div className="container px-6 md:px-12">
                <FadeIn className="mb-20 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                        숫자 대신 <span className="text-accent">자산</span>으로 증명합니다
                    </h2>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed">
                        이제 막 런칭한 부티크 에이전시입니다. 실적 숫자는 아직 쌓는 중이지만,
                        <br className="hidden md:block" />
                        광고주님과 함께 시작할 도구·문서·디자인은 이미 전부 준비되어 있습니다.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {assets.map((asset, idx) => (
                        <StaggerItem key={idx}>
                            <div className="h-full p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-accent/40 transition-all duration-300 hover:shadow-xl group">
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                    <asset.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 tracking-tight">{asset.title}</h3>
                                <p className="text-muted-foreground leading-relaxed mb-6">{asset.desc}</p>
                                <Link href={asset.linkHref} className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
                                    {asset.linkText}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
