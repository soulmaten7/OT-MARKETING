import Link from "next/link";
import { ArrowRight } from "lucide-react";

const assets = [
    {
        num: "01",
        title: "6 업종 랜딩페이지 시안",
        desc: "신뢰·액션·케어·미니멀·다크·비비드. 업종 톤에 맞춰 6 가지 디자인을 즉시 적용 가능합니다.",
        linkHref: "/showcase",
        linkText: "시안 바로 보기",
    },
    {
        num: "02",
        title: "업종별 1차콜 상담 스크립트",
        desc: "개인회생·정수기·통신·주식·부동산·병의원. 풀매뉴얼 13섹션, A4 6p 구조. 광고주 브랜드에 맞춰 치환.",
        linkHref: "/guide",
        linkText: "가이드에서 확인",
    },
    {
        num: "03",
        title: "CPA 표준계약서",
        desc: "중복 DB 판정 · 무효율 관리 · 정산 주기 · 해지 조건까지 13조 명문화. 광고주(을) 보호 조항 중심.",
        linkHref: "/#contact",
        linkText: "계약서 요청",
    },
    {
        num: "04",
        title: "광고주용 콘텐츠 가이드",
        desc: '헤드라인·이미지·법적 고지까지 "무엇을·어디에·얼마나" 정리. 처음 랜딩 진행하셔도 막막하지 않습니다.',
        linkHref: "/guide",
        linkText: "가이드 읽기",
    },
];

export function WhatWeBring() {
    return (
        <section id="what-we-bring" className="py-24 md:py-32 bg-white">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="eyebrow mb-4">WHY US</div>
                    <h2 className="font-serif text-4xl md:text-5xl text-[var(--navy)] mb-6">
                        숫자 대신 <span className="text-[var(--gold)]">자산</span>으로 증명합니다
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        이제 막 런칭한 부티크 에이전시입니다. 실적 숫자는 아직 쌓는 중이지만,
                        <br className="hidden md:block" />
                        광고주님과 함께 시작할 도구·문서·디자인은 이미 전부 준비되어 있습니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 max-w-5xl mx-auto">
                    {assets.map((asset, idx) => (
                        <div
                            key={idx}
                            className="border-t-2 border-[var(--gold)] pt-6"
                        >
                            <div className="font-serif text-5xl text-[var(--gold)] mb-3 leading-none">
                                {asset.num}
                            </div>
                            <h3 className="font-serif text-2xl text-[var(--navy)] mb-3">
                                {asset.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                {asset.desc}
                            </p>
                            <Link
                                href={asset.linkHref}
                                className="inline-flex items-center gap-2 text-[var(--navy)] hover:text-[var(--gold)] font-semibold text-sm border-b border-[var(--gold)] pb-0.5 transition-colors"
                            >
                                {asset.linkText}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
