import type { Metadata } from "next";
import { DefaultLandingTemplate } from "@/components/landing/DefaultLandingTemplate";

// STEP_85.5 — otpage1.com 메인 = OG metadata 0건 (사장 결정, 도메인 인프라 — 미리보기 0)
// STEP_94 — default 베이스 LP placeholder 박힘 (DefaultLandingTemplate, 미래 광고주 영업 데모용)
//   robots = noindex (검색 노출 X) + OG 0건 유지 (카톡 미리보기 박힘 X)
export const metadata: Metadata = {
    title: "otpage1.com",
    description: "",
    openGraph: {
        title: "",
        description: "",
        images: [],
    },
    twitter: {
        card: "summary",
        title: "",
        description: "",
        images: [],
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function HomePage() {
    return <DefaultLandingTemplate />;
}
