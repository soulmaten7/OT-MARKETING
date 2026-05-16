import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CpaInquiryForm } from "@/components/cpa/CpaInquiryForm";

export const metadata: Metadata = {
    title: "CPA 광고 — One Trillion",
    description:
        "광고 소재 제작부터 랜딩페이지·DB 수집·정산까지. 성과가 나온 만큼만 정산하는 CPA 모델. 건당 정산·검증된 인프라·업종별 맞춤.",
    openGraph: {
        title: "CPA 광고 — One Trillion",
        description: "검증된 광고 인프라로 실제 DB를. 건당 정산 CPA 모델.",
        type: "website",
    },
};

const VALUE_PROPS = [
    {
        title: "건당 정산",
        body: "광고비 선지출 X. 실제 DB 발생 시 정산. 성과가 나온 만큼만.",
    },
    {
        title: "검증된 인프라",
        body: "광고 소재·랜딩페이지·시트 분배·텔레그램 알림 = 풀 셋업. 광고주 손 1개도 X.",
    },
    {
        title: "업종별 맞춤",
        body: "개인회생·정수기·인터넷·주식·부동산·의료 — 업종별 검증된 전환 패턴 적용.",
    },
    {
        title: "투명한 데이터",
        body: "실시간 DB 현황·전환 데이터 구글 시트 + 텔레그램 공유. 깔때기 전 구간 공개.",
    },
];

const HOW_IT_WORKS = [
    {
        step: "01",
        title: "광고 문의·상담",
        body: "업종·사업장 규모·예상 물량 검토 후 모델 A (자체 콜팀) / 모델 B (OT 콜센터 1차콜 포함) 선택. 단가·정산 주기·결제 조건 협의.",
    },
    {
        step: "02",
        title: "셋업·소재 제작",
        body: "광고주 정보 6 항목 수령 → 광고주 명의 랜딩페이지·소재·시트 자동 셋업. 광고주가 추가로 할 일 없음.",
    },
    {
        step: "03",
        title: "광고 송출",
        body: "Meta·Google·당근·Naver·카카오 모먼트 — 업종·예산에 맞춰 매체 운영. 매체별 카피·이미지·CTA 별도 제작.",
    },
    {
        step: "04",
        title: "DB 수집·정산",
        body: "신청 → 구글 시트 자동 기록 + 텔레그램 실시간 알림. 건당 또는 확정 미팅 기준 정산.",
    },
];

const INFRA_ITEMS = [
    {
        title: "업종별 법규 가드레일",
        body: "광고 카피 단계에서 업종별 금지 표현 자동 차단. 변호사법·의료법·표시광고법 등 준수.",
    },
    {
        title: "자가진단 + 등급·유형 자동 분기",
        body: "랜딩 신청자 답변 → 점수·조건 자동 계산 → A/B/C 등급 또는 가입 유형 분류.",
    },
    {
        title: "광고주 명의 100% 분리",
        body: "광고에 OT 브랜드 0% 노출. 광고주 상호·사업자번호·의무 표기 자동 처리.",
    },
    {
        title: "DB 분배 자동화",
        body: "공통 시트 → 광고주 시트 자동 복사 분배. Apps Script 트리거 = 분류 즉시 실행.",
    },
    {
        title: "텔레그램 실시간 알림",
        body: "신청 발생 즉시 광고주·OT 폰에 동시 발송. 골든타임(5분 이내) 콜 가능.",
    },
    {
        title: "Meta Pixel + Google 전환 추적",
        body: "이벤트 6개 + 도메인 인증 + Clarity 추적. 전 구간 데이터 기반 운영.",
    },
];

export default function CpaPage() {
    return (
        <>
            {/* Hero */}
            <Section variant="white" size="xl" className="pt-24 md:pt-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Badge variant="neutral" className="mb-4">CPA 광고 · 건당 정산</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mt-3">
                        검증된 광고 인프라로<br />실제 DB를 받으세요
                    </h1>
                    <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
                        광고 소재 제작부터 랜딩페이지·DB 수집·정산까지.<br />
                        성과가 나온 만큼만 정산하는 CPA 모델.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                        >
                            광고 문의하기
                        </a>
                        <Link
                            href="/ads"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold rounded-full text-base transition-colors"
                        >
                            광고 크리에이티브 예시 <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </Section>

            {/* 가치 제안 4개 */}
            <Section variant="muted" size="md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {VALUE_PROPS.map((v) => (
                        <Card key={v.title} className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-primary-600" />
                                </div>
                                <h3 className="font-bold text-neutral-900 text-sm">{v.title}</h3>
                            </div>
                            <p className="text-sm text-neutral-500 leading-relaxed">{v.body}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* 작동 방식 4단계 */}
            <Section variant="white" size="lg">
                <SectionHeader>
                    <SectionTitle>작동 방식</SectionTitle>
                    <SectionDescription>광고 문의부터 DB 수집·정산까지 4단계.</SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {HOW_IT_WORKS.map((item) => (
                        <div key={item.step} className="flex flex-col gap-3">
                            <span className="text-4xl font-bold text-primary-100">{item.step}</span>
                            <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* 검증된 인프라 강조 */}
            <Section variant="muted" size="lg">
                <SectionHeader>
                    <SectionTitle>검증된 인프라</SectionTitle>
                    <SectionDescription>
                        사장이 직접 운영하며 검증한 시스템. 광고주는 계약만 하면 됩니다.
                    </SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {INFRA_ITEMS.map((item) => (
                        <Card key={item.title} className="p-6">
                            <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{item.body}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* 광고 크리에이티브 갤러리 링크 (Case A) */}
            <Section variant="white" size="md">
                <div className="max-w-2xl mx-auto text-center">
                    <Badge variant="primary" className="mb-4">6 업종 × 6 매체 = 36 크리에이티브</Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-3">
                        광고 크리에이티브 예시
                    </h2>
                    <p className="mt-4 text-neutral-500 text-base leading-relaxed">
                        개인회생·정수기·인터넷·주식·부동산·의료 — 6 업종 × Meta·Google·당근·Naver·카카오·OG 6 매체.<br />
                        실제 운영 중인 크리에이티브 36개를 직접 확인하세요.
                    </p>
                    <Link
                        href="/ads"
                        className="inline-flex items-center justify-center gap-2 mt-8 px-8 py-3.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold rounded-full text-base transition-colors"
                    >
                        광고 크리에이티브 전체 보기 <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </Section>

            {/* 광고 문의 폼 */}
            <Section variant="muted" size="lg" id="contact">
                <div className="max-w-2xl mx-auto">
                    <SectionHeader>
                        <SectionTitle>광고 문의</SectionTitle>
                        <SectionDescription>
                            담당자가 내용 확인 후 영업일 기준 24시간 이내 회신드립니다.
                        </SectionDescription>
                    </SectionHeader>
                    <Card className="p-8">
                        <CpaInquiryForm />
                    </Card>
                </div>
            </Section>
        </>
    );
}
