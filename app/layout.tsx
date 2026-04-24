import type { Metadata } from "next";
import { Inter, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

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
  title: "OT MARKETING | 업종 전문 CPA 마케팅 에이전시",
  description: "랜딩 제작·광고 운영·DB 전달·CPA 정산까지 직접 운영하는 부티크 CPA 에이전시. 대표가 광고주 한 분씩 담당합니다.",
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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
