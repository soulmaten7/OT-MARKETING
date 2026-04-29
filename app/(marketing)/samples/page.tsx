import type { Metadata } from "next";
import { SamplesIframe } from "./samples-iframe";

export const metadata: Metadata = {
    title: "랜딩페이지 디자인 시안 6종 | OT MARKETING",
    description:
        "OT 가 만들어드리는 랜딩페이지 디자인 시안 갤러리. 6종 (신뢰·법률형 / 액션·전환형 / 케어·친근형 / 미니멀·에디토리얼 / 다크·테크형 / 비비드·모바일형) 중 광고주 업종에 맞는 디자인 선택.",
};

export default function SamplesPage() {
    return (
        <div className="bg-white">
            <div className="ot-container py-12 md:py-20 pt-28 md:pt-32">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <div className="eyebrow mb-4">DESIGN SAMPLES</div>
                    <h1
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.3]"
                        style={{ textWrap: "balance" }}
                    >
                        랜딩페이지 <span className="text-[var(--gold)]">디자인 시안 6종</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        OT 가 만들어드리는 랜딩페이지 디자인 시안입니다.
                        <br className="hidden md:block" />
                        아래 6종 중 광고주 업종·고객층에 맞는 디자인을 선택해주세요.
                        <br className="hidden md:block" />
                        선택된 디자인 + 광고주 정보 + 자가진단 로직 = 실제 작동 라이브 페이지로 제작.
                    </p>
                </div>
                <SamplesIframe />
            </div>
        </div>
    );
}
