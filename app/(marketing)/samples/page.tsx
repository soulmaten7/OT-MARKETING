import type { Metadata } from "next";
import { SamplesIframe } from "./samples-iframe";

export const metadata: Metadata = {
    title: "CPA 랜딩페이지 디자인 템플릿 10종 | OT MARKETING",
    description:
        "OT MARKETING 의 CPA DB 수집 랜딩페이지 템플릿 갤러리. 10종 중 광고주 업종·고객층에 맞는 디자인 선택. PC·모바일 양쪽 미리보기 + 자가진단 로직 + 명의 + 카피 + 데이터 추적까지 통합 제작.",
};

export default function SamplesPage() {
    return (
        <div className="bg-white">
            <div className="ot-container py-12 md:py-20 pt-44 md:pt-48">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <div className="eyebrow mb-4">CPA · DESIGN TEMPLATES</div>
                    <h1
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.3]"
                        style={{ textWrap: "balance" }}
                    >
                        CPA 랜딩페이지 <span className="text-[var(--gold)]">디자인 템플릿 10종</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        OT MARKETING 의 CPA DB 수집 랜딩페이지 템플릿입니다.
                        <br className="hidden md:block" />
                        아래 10종 중 광고주 업종·고객층에 맞는 디자인을 선택해주세요.
                        <br className="hidden md:block" />
                        10종 모두 활성 — 광고주 업종에 맞는 디자인 + OT 의 자가진단 로직 + 명의 분리 + 카피 + 데이터 추적까지 통합 제작합니다.
                    </p>
                </div>
                <SamplesIframe />
            </div>
        </div>
    );
}
