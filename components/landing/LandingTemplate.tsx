"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { Diagnosis } from "./Diagnosis";
import { ContactForm } from "./ContactForm";
import { BrandFooter } from "./BrandFooter";
import { getIndustryConfig, type AnswerMap, type BrandInfo } from "@/lib/industries";

interface LandingTemplateProps {
    slug: string;
    brand?: BrandInfo;
}

export function LandingTemplate({ slug, brand }: LandingTemplateProps) {
    const config = getIndustryConfig(slug);
    const [answers, setAnswers] = useState<AnswerMap | null>(null);

    if (!config) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6 bg-[var(--navy)] text-white">
                <p>업종 슬러그를 찾을 수 없습니다: {slug}</p>
            </main>
        );
    }

    // 자가진단 완료 시 등급 계산 (시트 기록용 — 사용자에겐 노출 X)
    const grade = answers ? config.result.logic(answers) : "";

    // R&D 단계: brand prop 미전달 → BrandFooter 의 회사 정보 영역 자동 비표시
    // 광고주 매칭 시: brand 의 BrandInfo 를 advertiser 형태로 변환 전달
    const advertiserInfo = brand
        ? {
              advertiserName: brand.companyName,
              lawyerName: brand.contactPerson,
              phone: brand.phone,
              businessNumber: brand.businessNumber,
          }
        : undefined;

    return (
        <main className="min-h-screen flex flex-col bg-[var(--navy)]">
            {!answers && (
                <>
                    <Hero title={config.hero.title} industryName={config.industryName} />
                    <Diagnosis
                        questions={config.diagnosis.questions}
                        onComplete={(a) => setAnswers(a)}
                    />
                </>
            )}

            {answers && (
                <ContactForm
                    additionalFields={config.contact.additionalFields}
                    sheetId={config.contact.sheetId}
                    industryId={config.industryId}
                    answers={answers}
                    grade={grade}
                />
            )}

            <BrandFooter lawNote={config.guardrail.law} advertiser={advertiserInfo} />
        </main>
    );
}
