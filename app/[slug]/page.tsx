import { notFound } from "next/navigation";
import { LandingTemplate } from "@/components/landing/LandingTemplate";
import { getIndustryConfig, industrySlugs } from "@/lib/industries";
import type { Metadata } from "next";

// TURN 1 — sample 라우트 (select1~6)
// TURN 4 (STEP_27) — select{N}{n} 광고주별 라우트로 확장 예정
export const dynamicParams = false;

export function generateStaticParams() {
    return industrySlugs.map((slug) => ({ slug }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const config = getIndustryConfig(slug);
    if (!config) return { title: "랜딩 페이지" };
    return {
        title: `${config.industryName} — 1분 무료 자가진단`,
        description: `${config.industryName} 자가진단 → 등급 분기 → 전담 컨설턴트 1:1 안내.`,
    };
}

export default async function OperationSlugPage({ params }: PageProps) {
    const { slug } = await params;
    const config = getIndustryConfig(slug);
    if (!config) notFound();

    return <LandingTemplate slug={slug} mode="operation" />;
}
