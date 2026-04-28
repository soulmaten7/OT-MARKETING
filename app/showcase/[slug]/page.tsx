import { notFound } from "next/navigation";
import { LandingTemplate } from "@/components/landing/LandingTemplate";
import { getIndustryConfig, industrySlugs } from "@/lib/industries";
import type { Metadata } from "next";

export function generateStaticParams() {
    return industrySlugs.map((slug) => ({ slug }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const config = getIndustryConfig(slug);
    if (!config) return { title: "시안 미리보기" };
    return {
        title: `${config.industryName} 시안 — OT MARKETING`,
        description: `${config.industryName} 자가진단 → 등급 분기 → 1:1 상담 흐름 시안.`,
        robots: { index: false, follow: false },
    };
}

export default async function ShowcaseSlugPage({ params }: PageProps) {
    const { slug } = await params;
    const config = getIndustryConfig(slug);
    if (!config) notFound();

    return <LandingTemplate slug={slug} mode="showcase" />;
}
