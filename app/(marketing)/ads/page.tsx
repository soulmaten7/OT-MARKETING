import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "광고 크리에이티브 6 매체 | OT MARKETING",
    description:
        "OT MARKETING 의 6 매체 광고 크리에이티브 갤러리. Meta · Google · 당근 · Naver · 카카오 모먼트 · GDN. 매체별 광고 크리에이티브 mockup + 광고 → 랜딩 흐름 시각화. 광고와 랜딩이 한 몸으로 굴러가는 CPA 인프라.",
};

const channels = [
    { name: "Meta", desc: "피드 · 스토리 · 릴스" },
    { name: "Google", desc: "GDN · 디스커버리" },
    { name: "당근", desc: "비즈프로필 광고" },
    { name: "Naver", desc: "검색광고 · 파워컨텐츠" },
    { name: "카카오 모먼트", desc: "카드뉴스 · 디스플레이" },
    { name: "기타", desc: "트위터 · 유튜브 · 틱톡" },
];

export default function AdsPage() {
    return (
        <div className="bg-white">
            <div className="ot-container py-12 md:py-20 pt-44 md:pt-48">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="eyebrow mb-4">CPA · AD CREATIVES</div>
                    <h1
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.3]"
                        style={{ textWrap: "balance" }}
                    >
                        광고 크리에이티브 <span className="text-[var(--gold)]">6 매체</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        OT MARKETING 은 6 매체에 동시 광고를 운영합니다.
                        <br className="hidden md:block" />
                        매체별 톤·포맷에 맞춘 크리에이티브 + 광고 → 랜딩 일체 설계.
                        <br className="hidden md:block" />
                        광고와 랜딩이 한 몸으로 굴러가는 CPA 인프라.
                    </p>
                </div>

                {/* Coming Soon Notice */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-[var(--coral-50)] to-orange-50 border border-[var(--coral-200)] rounded-2xl p-8 md:p-10 text-center">
                        <Sparkles className="w-10 h-10 text-[var(--coral-500)] mx-auto mb-4" />
                        <h2 className="font-serif text-2xl md:text-3xl text-[var(--navy)] mb-4">
                            크리에이티브 갤러리 준비 중
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                            현재 6 매체 R&D 광고를 운영 중입니다.
                            <br />
                            실제 운영 데이터 기반 크리에이티브 시안을 곧 공개합니다.
                        </p>
                        <p className="text-xs text-gray-500">
                            관심 광고주는 미팅 시 비공개 크리에이티브 deck 으로 별도 안내드립니다.
                        </p>
                    </div>
                </div>

                {/* 6 Channels Preview Grid */}
                <div className="max-w-5xl mx-auto mb-16">
                    <h3 className="text-center font-serif text-xl md:text-2xl text-[var(--navy)] mb-8">
                        운영 매체
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {channels.map((c) => (
                            <div
                                key={c.name}
                                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-[var(--coral-400)] hover:shadow-md transition-all"
                            >
                                <div className="font-bold text-base md:text-lg text-[var(--navy)] mb-1">
                                    {c.name}
                                </div>
                                <div className="text-xs md:text-sm text-gray-500">{c.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center max-w-2xl mx-auto">
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-bold px-8 py-4 rounded-md text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                        광고주 상담 신청
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-xs text-gray-500 mt-4">
                        미팅 시 6 매체 크리에이티브 운영 사례 + CPA 단가 + DB 품질 데이터 공유
                    </p>
                </div>
            </div>
        </div>
    );
}
