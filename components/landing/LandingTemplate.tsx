"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { Diagnosis } from "./Diagnosis";
import { ResultBranching } from "./ResultBranching";
import { ContactForm } from "./ContactForm";
import { BrandFooter } from "./BrandFooter";
import { getIndustryConfig, type AnswerMap, type BrandInfo, type ResultBranch } from "@/lib/industries";

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

    let resultBranch: ResultBranch | null = null;
    if (answers) {
        const grade = config.result.logic(answers);
        resultBranch = config.result.branches.find((b) => b.grade === grade) ?? config.result.branches[0];
    }

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
                    <Hero title={config.hero.title} />
                    <Diagnosis
                        questions={config.diagnosis.questions}
                        progressSteps={config.diagnosis.progressSteps}
                        stepLabels={config.diagnosis.stepLabels}
                        onComplete={(a) => setAnswers(a)}
                    />
                </>
            )}

            {answers && resultBranch && (
                <>
                    <ResultBranching branch={resultBranch} />
                    <ContactForm
                        additionalFields={config.contact.additionalFields}
                        sheetId={config.contact.sheetId}
                        industryId={config.industryId}
                        answers={answers}
                        grade={resultBranch.grade}
                    />
                </>
            )}

            <BrandFooter lawNote={config.guardrail.law} advertiser={advertiserInfo} />
        </main>
    );
}
