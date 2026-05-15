import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LandingBuilderClient } from "./LandingBuilderClient";
import { getIndustryDefault, INDUSTRY_LABELS } from "@/lib/landing/industry-defaults";
import type { IndustryKey } from "@/lib/landing/industry-defaults";

export const metadata: Metadata = {
    title: "랜딩페이지 빌더 — OT MARKETING",
    robots: { index: false, follow: false },
};

const ACTIVE_INDUSTRIES: IndustryKey[] = ["debt", "rental", "broadband"];

export default async function IndustryBuilderPage({
    params,
}: {
    params: Promise<{ industry: string }>;
}) {
    const { industry } = await params;

    if (!ACTIVE_INDUSTRIES.includes(industry as IndustryKey)) {
        notFound();
    }

    const industryKey = industry as IndustryKey;
    const industryName = INDUSTRY_LABELS[industryKey];
    const defaultConfig = getIndustryDefault(industryKey);

    return (
        <LandingBuilderClient
            industry={industryKey}
            industryName={industryName}
            defaultConfig={defaultConfig}
        />
    );
}
