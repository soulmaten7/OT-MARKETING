import type { Metadata } from "next";

// STEP_85.5 — otpage1.com 메인 = OG metadata 0건 (사장 결정)
//   사장 본질: "otpage1.com = 도메인 인프라 = 이미지·제목·설명 X"
//   광고주에게 도메인 박을 때 = 미리보기 0 = 단순 URL 텍스트 링크
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
    return (
        <main className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center px-6">
                <p className="text-sm text-gray-400 font-mono tracking-tight">
                    otpage1.com
                </p>
            </div>
        </main>
    );
}
