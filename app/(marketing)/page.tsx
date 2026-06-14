import type { Metadata } from "next";
import { Check, ShieldCheck, Database, Bell, ArrowRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CpaInquiryForm } from "@/components/cpa/CpaInquiryForm";
import { AdCreativeGallery } from "@/components/home/AdCreativeGallery";
import { AdToLandingFlow } from "@/components/sections/ads-mockup/AdToLandingFlow";
import { LegalGuardrailSection } from "@/components/sections/ads-mockup/LegalGuardrailSection";

export const metadata: Metadata = {
    title: "OT MARKETING — CPA 광고 의뢰 · 건당 정산",
    description:
        "광고 소재 제작부터 랜딩페이지·DB 수집·정산까지. 성과가 나온 만큼만 정산하는 CPA 모델. 건당 정산·검증된 인프라·업종별 맞춤.",
    alternates: {
        canonical: "https://www.ot-marketing.kr/",
    },
    openGraph: {
        title: "OT MARKETING — CPA 광고 의뢰 · 건당 정산",
        description: "검증된 광고 인프라로 실제 DB를. 건당 정산 CPA 모델. 의뢰 후 검토·회신.",
        type: "website",
        url: "https://www.ot-marketing.kr/",
    },
};

const VALUE_PROPS = [
    { icon: Check,        title: "건당 정산",    body: "광고비 선지출 X. 실제 DB 발생 시 정산. 성과가 나온 만큼만." },
    { icon: ShieldCheck,  title: "검증된 인프라", body: "광고 소재·랜딩·시트·텔레그램 풀 셋업. 광고주 손 0개." },
    { icon: Database,     title: "업종별 맞춤",  body: "6 업종 검증된 전환 패턴 적용." },
    { icon: Bell,         title: "실시간 알림",  body: "DB 발생 즉시 광고주·OT 동시 텔레그램. 골든타임 5분." },
];

const HOW_IT_WORKS = [
    { step: "01", title: "광고 의뢰 접수",  body: "업종·예상 물량 검토 + 모델 A/B 선택. 단가·정산 협의." },
    { step: "02", title: "검토 후 회신",    body: "24시간 이내 회신. 광고주 정보 6 항목 수령 → 풀 셋업." },
    { step: "03", title: "광고 송출",       body: "Meta·Google·당근·Naver·카카오 — 업종·예산 맞춤 운영." },
    { step: "04", title: "DB 수집·정산",    body: "시트 자동 기록 + 텔레그램 알림. 건당 정산." },
];

const INFRA_ITEMS = [
    { title: "업종별 법규 가드레일",    body: "변호사법·의료법·표시광고법 자동 검수." },
    { title: "자가진단 + 등급·유형 분기", body: "랜딩 답변 → A/B/C 등급 자동 분류." },
    { title: "광고주 명의 100% 분리",   body: "광고에 OT 0% 노출. 광고주 명의 자동." },
    { title: "DB 분배 자동화",          body: "공통 시트 → 광고주 시트 자동 복사." },
    { title: "텔레그램 실시간 알림",    body: "골든타임 5분 콜 가능." },
    { title: "구글 시트 공유",          body: "광고주에게 실시간 DB 현황 공개." },
];

const FAQ_ITEMS = [
    { q: "단가는 어떻게 책정되나요?",  a: "업종·물량·매체에 따라 협의. 기본 건당 정산 + 모델 B 는 콜센터 비용 포함." },
    { q: "정산 주기는?",               a: "월 1회 또는 양측 합의 주기. 시트 + 통장 입금 내역 양측 확인." },
    { q: "계약 기간은?",               a: "최소 1개월 계약. 사후 월 단위 연장." },
    { q: "광고비는 누가 선지출?",      a: "광고비 = OT 가 선지출. 광고주 = DB 발생 시 건당 정산." },
    { q: "DB 품질 보장은?",            a: "유효 DB 기준 정산. 무효 (허위·중복) = 정산 제외." },
    { q: "법규 위반 책임은?",          a: "광고 카피·랜딩 = OT 운영 = 법규 책임 OT. 광고주 명의 X." },
];

export default function HomePage() {
    return (
        <>
            {/* 1. Hero */}
            <Section variant="white" size="xl" className="pt-24 md:pt-32">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeInUp>
                        <Badge variant="neutral" className="mb-4">CPA 광고 의뢰 · 건당 정산</Badge>
                    </FadeInUp>
                    <FadeInUp delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mt-3">
                            검증된 광고 인프라로<br />실제 DB를 받으세요
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={0.2}>
                        <p className="mt-6 text-lg md:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">
                            광고 소재 제작부터 랜딩페이지·DB 수집·정산까지.<br />
                            광고주는 의뢰만 하면 됩니다.
                        </p>
                    </FadeInUp>
                    <FadeInUp delay={0.3}>
                        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                            >
                                광고 의뢰하기
                            </a>
                            <a
                                href="#creative"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-neutral-900 font-semibold rounded-full text-base ring-1 ring-neutral-300 hover:bg-neutral-50 transition-colors"
                            >
                                광고 크리에이티브 보기
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </div>
                    </FadeInUp>
                </div>
            </Section>

            {/* 2. 가치 제안 4 카드 */}
            <Section variant="muted" size="md">
                <StaggerContainer
                    stagger={0.08}
                    delayChildren={0.05}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {VALUE_PROPS.map((v) => (
                        <StaggerItem key={v.title}>
                            <Card className="p-6 h-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                                        <v.icon className="w-3 h-3 text-primary-600" />
                                    </div>
                                    <h3 className="font-bold text-neutral-900 text-sm">{v.title}</h3>
                                </div>
                                <p className="text-sm text-neutral-500 leading-relaxed">{v.body}</p>
                            </Card>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </Section>

            {/* 3. 광고 크리에이티브 — 6 매체 × 6 업종 36 mockup 갤러리 */}
            <Section variant="white" size="lg" id="creative">
                <SectionHeader>
                    <FadeInUp>
                        <SectionTitle>광고 크리에이티브 — 6 매체 풀 셋업</SectionTitle>
                        <SectionDescription>
                            Meta · Google · 당근 · Naver · 카카오 — 업종별 검증된 광고 시안. 광고주 명의 100% 분리.
                        </SectionDescription>
                    </FadeInUp>
                </SectionHeader>
                <FadeInUp delay={0.2}>
                    <AdCreativeGallery />
                </FadeInUp>
            </Section>

            {/* 4. 광고 → 랜딩 → DB 흐름 */}
            <Section variant="muted" size="lg">
                <SectionHeader>
                    <FadeInUp>
                        <SectionTitle>광고 → 랜딩 → DB 자동 흐름</SectionTitle>
                        <SectionDescription>
                            클릭 즉시 자가진단 깔때기 → 등급 자동 분기 → 시트 적재 → 텔레그램 알림.
                        </SectionDescription>
                    </FadeInUp>
                </SectionHeader>
                <FadeInUp delay={0.2}>
                    <AdToLandingFlow />
                </FadeInUp>
            </Section>

            {/* 5. 작동 방식 4 단계 */}
            <Section variant="white" size="lg">
                <SectionHeader>
                    <FadeInUp>
                        <SectionTitle>작동 방식</SectionTitle>
                        <SectionDescription>광고 의뢰부터 DB 수집·정산까지 4 단계.</SectionDescription>
                    </FadeInUp>
                </SectionHeader>
                <StaggerContainer
                    stagger={0.1}
                    delayChildren={0.1}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {HOW_IT_WORKS.map((item) => (
                        <StaggerItem key={item.step}>
                            <div className="flex flex-col gap-3">
                                <span className="text-4xl font-bold text-primary-100">{item.step}</span>
                                <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{item.body}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </Section>

            {/* 6. 검증된 인프라 6 항목 */}
            <Section variant="muted" size="lg">
                <SectionHeader>
                    <FadeInUp>
                        <SectionTitle>검증된 인프라</SectionTitle>
                        <SectionDescription>
                            직접 운영하며 검증한 시스템. 광고주는 의뢰만 하면 됩니다.
                        </SectionDescription>
                    </FadeInUp>
                </SectionHeader>
                <StaggerContainer
                    stagger={0.06}
                    delayChildren={0.1}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {INFRA_ITEMS.map((item) => (
                        <StaggerItem key={item.title}>
                            <Card className="p-6 h-full">
                                <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{item.body}</p>
                            </Card>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </Section>

            {/* 7. 법규 가드레일 */}
            <LegalGuardrailSection />

            {/* 9. 광고 의뢰 폼 */}
            <Section variant="white" size="lg" id="contact">
                <div className="max-w-2xl mx-auto">
                    <SectionHeader>
                        <FadeInUp>
                            <SectionTitle>광고 의뢰</SectionTitle>
                            <SectionDescription>내용 확인 후 영업일 24시간 이내 회신.</SectionDescription>
                        </FadeInUp>
                    </SectionHeader>
                    <FadeInUp delay={0.2}>
                        <Card className="p-8">
                            <CpaInquiryForm />
                        </Card>
                    </FadeInUp>
                </div>
            </Section>
        </>
    );
}
