import type { Metadata } from "next";
import { Inter, Noto_Serif_KR } from "next/font/google";
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

export const metadata: Metadata = {
  title: "OT MARKETING — 광고가 끝나는 자리까지 책임지는 CPA 인프라",
  description: "DB 단순 전달이 아닌 업종별 자가진단 + 등급·유형 분기 + 1차콜까지. 6 업종 법규 가드레일 · 광고주 명의 100% 분리 운영. Meta · Google · 당근 · Naver · 카카오 모먼트 다매체 운영.",
  keywords: "CPA 광고대행, 다업종 CPA, 개인회생 CPA, 핸드폰 CPA, 인터넷 통신 CPA, 정수기 렌탈 CPA, 부동산 분양 CPA, 병의원 CPA, 자가진단 분기, 6 업종 가드레일, 다매체 운영",
  openGraph: {
    title: "OT MARKETING — 광고가 끝나는 자리까지 책임지는 CPA",
    description: "업종별 자가진단 + 등급·유형 분기 + 1차콜까지 풀 처리. 6 업종 법규 가드레일 · 광고주 명의 분리.",
    type: "website",
    locale: "ko_KR",
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
      <body
        className={`${inter.variable} ${notoSerifKr.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
