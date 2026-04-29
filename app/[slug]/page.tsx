import { notFound } from "next/navigation";
import { LandingTemplate } from "@/components/landing/LandingTemplate";
import { getIndustryConfig, getIndustryConfigByNumber, industrySlugs } from "@/lib/industries";
import { isSampleSlug, parseAdvertiserSlug, getAdvertiserBySlug } from "@/lib/advertisers";
import type { Metadata } from "next";

// STEP_27 — sample (select1~6) + 광고주별 (select{N}{n}) 모두 처리
// dynamicParams=true → generateStaticParams 외 slug 도 SSR 시도
export const dynamicParams = true;
export const dynamic = "force-dynamic"; // Tier 1 시트가 갱신되므로 ISR 안전성 위해 dynamic

export function generateStaticParams() {
    return industrySlugs.map((slug) => ({ slug }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    if (isSampleSlug(slug)) {
        const config = getIndustryConfig(slug);
        if (!config) return { title: "랜딩 페이지" };
        return {
            title: `${config.industryName} — 1분 무료 자가진단`,
            description: `${config.industryName} 자가진단 → 등급 분기 → 전담 컨설턴트 1:1 안내.`,
        };
    }

    // 광고주별 — Tier 1 시트에서 회사명 fetch
    const parsed = parseAdvertiserSlug(slug);
    if (parsed) {
        const advertiser = await getAdvertiserBySlug(slug);
        const config = getIndustryConfigByNumber(parsed.industryNumber);
        if (advertiser && config) {
            return {
                title: `${advertiser.companyName} · ${config.industryName} 자가진단`,
                description: `${config.industryName} 1분 자가진단 → 등급 분기 → ${advertiser.companyName} 1:1 상담.`,
            };
        }
    }

    return { title: "랜딩 페이지" };
}

export default async function OperationSlugPage({ params }: PageProps) {
    const { slug } = await params;

    // 샘플 슬러그 (select1~6)
    if (isSampleSlug(slug)) {
        const config = getIndustryConfig(slug);
        if (!config) notFound();
        return <LandingTemplate slug={slug} />;
    }

    // 광고주별 슬러그 (select{N}{n})
    const parsed = parseAdvertiserSlug(slug);
    if (!parsed) notFound();

    const sampleSlug = `select${parsed.industryNumber}`;
    if (!getIndustryConfig(sampleSlug)) notFound();

    const advertiser = await getAdvertiserBySlug(slug);
    if (!advertiser) notFound();

    return (
        <LandingTemplate
            slug={sampleSlug}
            brand={{
                companyName: advertiser.companyName,
                businessNumber: advertiser.businessNumber,
                contactPerson: advertiser.contactPerson,
                phone: advertiser.phone,
                mandatoryNote: advertiser.industryRegistration
                    ? `등록 전문분야: ${advertiser.industryRegistration}`
                    : undefined,
            }}
        />
    );
}
