import type { Metadata } from "next";
import { Inter, Noto_Serif_KR, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
    title: "OT MARKETING — CPA 광고 의뢰",
    description: "CPA 광고 의뢰를 받습니다. 검토 후 회신 드립니다.",
    openGraph: {
        title: "OT MARKETING — CPA 광고 의뢰",
        description: "CPA 광고 의뢰를 받습니다. 검토 후 회신 드립니다.",
        url: "https://ot-marketing.kr",
        siteName: "OT MARKETING",
        type: "website",
    },
    icons: {
        icon: "/favicon.ico",
    },
    robots: { index: true, follow: true },
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
                {children}
            </body>
        </html>
    );
}
