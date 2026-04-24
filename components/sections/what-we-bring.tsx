import Link from "next/link";
import { ArrowRight } from "lucide-react";

const assets = [
    {
        num: "01",
        title: "업종별 랜딩페이지 시안",
        desc: "신뢰·액션·케어·미니멀·다크·비비드. 업종 톤에 맞춰 즉시 적용 가능한 디자인 시스템.",
        linkHref: "/showcase",
        linkText: "시안 바로 보기",
    },
    {
        num: "02",
        title: "업종별 1차콜 상담 스크립트",
        desc: "개인회생·정수기·통신·주식·부동산·병의원. 풀매뉴얼 구조로 광고주 브랜드에 맞춰 치환.",
        linkHref: "/#contact",
        linkText: "상담 후 제공",
    },
    {
        num: "03",
        title: "CPA 표준계약서",
        desc: "중복 DB 판정 · 무효율 관리 · 정산 주기 · 해지 조건까지 명문화. 광고주(을) 보호 조항 중심.",
        linkHref: "/#contact",
        linkText: "계약서 요청",
    },
    {
        num: "04",
        title: "업종별 광고 패키지",
        desc: "광고 이미지 규격 · 법적 고지 문구 · 콘텐츠 가이드를 업종별 PDF로 상담 후 발송해 드립니다.",
        linkHref: "/#contact",
        linkText: "상담 후 발송",
    },
];

export function WhatWeBring() {
    return (
        <section id="what-we-bring" className="py-24 md:py-32 bg-white">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="eyebrow mb-4">OUR ASSETS</div>
                    <h2
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.25]"
                        style={{ textWrap: "balance" }}
                    >
                        <span className="text-[var(--gold)]">검증된 운영 자산</span>이 준비되어 있습니다
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        업종별 전문성과 법적 컴플라이언스를 갖춘 OT MARKETING 의 운영 자산.
                        <br className="hidden md:block" />
                        광고주사가 필요로 하는 도구 일체가 즉시 사용 가능한 상태로 제공됩니다.
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
