import { notFound } from "next/navigation";
import { LandingTemplate } from "@/components/landing/LandingTemplate";
import { BoglawLandingTemplate } from "@/components/landing/BoglawLandingTemplate";
import { getIndustryConfig, getIndustryConfigByNumber, industrySlugs } from "@/lib/industries";
import { isSampleSlug, parseAdvertiserSlug, getAdvertiserBySlug } from "@/lib/advertisers";
import type { Metadata, Viewport } from "next";

// STEP_70 — select11 (보광) viewport user-scalable=no (모바일 폼 UX 강제)
export async function generateViewport({ params }: PageProps): Promise<Viewport> {
    const { slug } = await params;
    if (slug === "select11") {
        return {
            width: "device-width",
            initialScale: 1,
            maximumScale: 1,
            userScalable: false,
        };
    }
    return {
        width: "device-width",
        initialScale: 1,
    };
}

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

// STEP_61 — 사용자 친화 og 메타 (B2B → 소비자 메시지 swap)
// 옛 root layout.tsx 의 "OT MARKETING — 광고가 끝나는 자리까지 책임지는 CPA" 가 광고 미리보기에 노출되어 사용자 거부 → 165 클릭 0 DB 진단
// 5 업종 매핑. og:image 절대 URL. 5 업종 이미지 없을 시 Facebook fallback 처리 (이미지 없는 카드).
function getOgInfoByIndustry(industryNumber: number) {
    const map: Record<number, {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
        siteName: string;
        ogImage: string;
        ogAlt: string;
    }> = {
        1: {
            title: "개인회생 1분 자가진단",
            description: "1분 9문항 자가진단으로 회생 가능 여부 무료 확인. 변호사 무료 상담 안내. 익명 처리.",
            ogTitle: "개인회생 1분 자가진단",
            ogDescription: "1분 9문항 자가진단으로 회생 가능 여부 무료 확인. 변호사 무료 상담 안내. 익명 처리.",
            siteName: "개인회생 안내",
            ogImage: "https://otpage1.com/ads-creatives/01-debt-relief/DR-022-A.png",
            ogAlt: "개인회생 자가진단 안내 (변호사 무료 상담)",
        },
        2: {
            title: "정수기 1분 비교 견적",
            description: "1분 자가진단으로 우리 집 맞춤 정수기 무료 비교. 코웨이·SK매직·LG 정식 판매대리점 견적.",
            ogTitle: "정수기 1분 비교 견적",
            ogDescription: "1분 자가진단으로 우리 집 맞춤 정수기 무료 비교. 코웨이·SK매직·LG 견적.",
            siteName: "정수기 비교 안내",
            ogImage: "https://otpage1.com/ads-creatives/02-rental-water/WR-022-A.png",
            ogAlt: "정수기 비교 견적 안내",
        },
        3: {
            title: "통신비 1분 절감 진단",
            description: "1분 자가진단으로 우리 집 맞춤 결합 상품 무료 비교. KT·SKT·LG 정식 가입처 견적.",
            ogTitle: "통신비 1분 절감 진단",
            ogDescription: "1분 자가진단으로 우리 집 맞춤 결합 상품 무료 비교.",
            siteName: "통신비 절감 안내",
            ogImage: "https://otpage1.com/ads-creatives/03-broadband/BB-022-A.png",
            ogAlt: "통신비 절감 진단 안내",
        },
        4: {
            title: "주식 투자 무료 강좌",
            description: "기술적 분석·펀더멘탈·가치투자 무료 강좌. 금융투자협회 등록 강사 안내.",
            ogTitle: "주식 투자 무료 강좌",
            ogDescription: "기술적 분석·펀더멘탈·가치투자 무료 강좌.",
            siteName: "투자 교육 안내",
            ogImage: "https://otpage1.com/ads-creatives/04-invest-lead/IL-022-A.png",
            ogAlt: "주식 투자 교육 안내",
        },
        5: {
            title: "분양·청약 1분 진단",
            description: "신축·재건축·재개발 1분 비교. 공인중개사 정식 등록 안전 거래 안내.",
            ogTitle: "분양·청약 1분 진단",
            ogDescription: "신축·재건축·재개발 1분 비교. 공인중개사 정식 등록.",
            siteName: "분양 안내",
            ogImage: "https://otpage1.com/ads-creatives/05-realestate/RE-022-A.png",
            ogAlt: "분양·청약 진단 안내",
        },
        6: {
            title: "병의원 1분 상담 진단",
            description: "전문의 자격 인증 + 의료법 사전심의 인증병원 무료 상담 안내.",
            ogTitle: "병의원 1분 상담 진단",
            ogDescription: "전문의 자격 인증 + 의료법 사전심의 인증병원 무료 상담.",
            siteName: "의료 상담 안내",
            ogImage: "https://otpage1.com/ads-creatives/06-medical/MD-022-A.png",
            ogAlt: "병의원 상담 진단 안내 (사전심의 인증)",
        },
    };
    return map[industryNumber] ?? map[1]!;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // STEP_71 — select11 = 채무회복 탕감센터 (보광 AD001) OG meta
    if (slug === "select11") {
        const url = `https://otpage1.com/select11`;
        const title = "채무회복 탕감센터 — 1분 무료 자가진단";
        const description = "최대 95% 탕감 가능액 1분 자가진단으로 확인. 가족·직장 모르게 안내.";
        const ogDescription = "최대 95% 탕감 가능액 1분 자가진단으로 확인.";
        const ogImage = "https://otpage1.com/ads-creatives/01-debt-relief/DR-022-A.png";
        return {
            title,
            description,
            openGraph: {
                title,
                description: ogDescription,
                url,
                siteName: "채무회복 탕감센터",
                images: [{ url: ogImage, width: 1254, height: 1254, alt: "채무회복 탕감센터 1분 무료 자가진단" }],
                type: "website",
                locale: "ko_KR",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description: ogDescription,
                images: [ogImage],
            },
        };
    }

    // 샘플 slug (select1~6) — 사용자 친화 메타
    if (isSampleSlug(slug)) {
        const config = getIndustryConfig(slug);
        if (!config) return { title: "랜딩 페이지" };

        const ogInfo = getOgInfoByIndustry(config.industryNumber);
        const url = `https://otpage1.com/${slug}`;

        return {
            title: ogInfo.title,
            description: ogInfo.description,
            openGraph: {
                title: ogInfo.ogTitle,
                description: ogInfo.ogDescription,
                url,
                siteName: ogInfo.siteName,
                images: [
                    {
                        url: ogInfo.ogImage,
                        width: 1254,
                        height: 1254,
                        alt: ogInfo.ogAlt,
                    },
                ],
                type: "website",
                locale: "ko_KR",
            },
            twitter: {
                card: "summary_large_image",
                title: ogInfo.ogTitle,
                description: ogInfo.ogDescription,
                images: [ogInfo.ogImage],
            },
        };
    }

    // 광고주별 — Tier 1 시트에서 회사명 fetch
    const parsed = parseAdvertiserSlug(slug);
    if (parsed) {
        const advertiser = await getAdvertiserBySlug(slug);
        const config = getIndustryConfigByNumber(parsed.industryNumber);
        if (advertiser && config) {
            const ogInfo = getOgInfoByIndustry(parsed.industryNumber);
            const url = `https://otpage1.com/${slug}`;
            const advertiserDescription = `${ogInfo.ogDescription} ${advertiser.companyName} 안내.`;
            return {
                title: `${ogInfo.title} - ${advertiser.companyName}`,
                description: `${ogInfo.description} ${advertiser.companyName} 1:1 상담 안내.`,
                openGraph: {
                    title: ogInfo.ogTitle,
                    description: advertiserDescription,
                    url,
                    siteName: ogInfo.siteName,
                    images: [
                        {
                            url: ogInfo.ogImage,
                            width: 1254,
                            height: 1254,
                            alt: ogInfo.ogAlt,
                        },
                    ],
                    type: "website",
                    locale: "ko_KR",
                },
                twitter: {
                    card: "summary_large_image",
                    title: ogInfo.ogTitle,
                    description: advertiserDescription,
                    images: [ogInfo.ogImage],
                },
            };
        }
    }

    return { title: "랜딩 페이지" };
}

export default async function OperationSlugPage({ params }: PageProps) {
    const { slug } = await params;

    // STEP_70 — select11 = 법률사무소 보광 (AD001) 전용 4 단계 progressive form
    if (slug === "select11") {
        return <BoglawLandingTemplate slug={slug} />;
    }

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
