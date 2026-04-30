import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "광고 크리에이티브 6 매체 | OT MARKETING",
    description:
        "OT MARKETING 의 6 매체 광고 크리에이티브 갤러리. Meta · Google · 당근 · Naver · 카카오 모먼트. 광고와 랜딩이 한 몸으로 굴러가는 CPA 인프라.",
};

export default function AdsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
