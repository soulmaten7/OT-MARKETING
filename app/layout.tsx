import type { Metadata } from "next";
import { Inter, Noto_Serif_KR, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import Clarity from "@/components/Clarity";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const notoSerifKr = Noto_Serif_KR({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-serif-kr",
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
});

// Pretendard Variable: head 의 <link> 로 CDN 로드 (next/font 미지원). var(--font-pretendard) 는 globals.css 에서 수동 매핑.

export const metadata: Metadata = {
    title: "OT MARKETING — 마케팅에 필요한 도구, 한 곳에",
    description:
        "구독형 랜딩페이지·CPA 광고·문자문의 만들기. 마케팅 도구를 한 곳에서. 코딩 없이 5분 만에 시작하세요.",
    keywords:
        "구독형 랜딩페이지, CPA 광고대행, 문자문의 만들기, 마케팅 자동화, 랜딩페이지 구독, SMS 문의 버튼, 개인회생 CPA, 다업종 CPA",
    openGraph: {
        title: "OT MARKETING — 마케팅에 필요한 도구, 한 곳에",
        description: "구독형 랜딩페이지·CPA 광고·문자문의 만들기. 마케팅 도구를 한 곳에서.",
        type: "website",
        locale: "ko_KR",
    },
    robots: { index: true, follow: true },
    // STEP_93 — Meta 도메인 인증 메타 태그 (otpage1.com)
    // 환경변수 박힐 때만 활성 = 미박힘 시 noop (안전 deploy)
    other: process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION
        ? { "facebook-domain-verification": process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION }
        : {},
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className="scroll-smooth" style={{ colorScheme: "light" }}>
            <head>
                {/* Pretendard Variable — CDN 로드 (next/font 미지원 폰트) */}
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
            </head>
            <body
                className={`${inter.variable} ${notoSerifKr.variable} ${cormorant.variable} font-sans antialiased bg-background text-foreground`}
            >
                <MetaPixel />
                <GoogleAdsTag />
                <Clarity />
                {children}
            </body>
        </html>
    );
}
