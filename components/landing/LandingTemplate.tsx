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

    const effectiveBrand = brand ?? config.defaultBrand;

    let resultBranch: ResultBranch | null = null;
    if (answers) {
        const grade = config.result.logic(answers);
        resultBranch = config.result.branches.find((b) => b.grade === grade) ?? config.result.branches[0];
    }

    return (
        <main className="min-h-screen flex flex-col">
            {!answers && (
                <>
                    <Hero
                        eyebrow={config.hero.eyebrow}
                        title={config.hero.title}
                        titleHighlight={config.hero.titleHighlight}
                        subtitle={config.hero.subtitle}
                    />
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

            <BrandFooter brand={effectiveBrand} lawNote={config.guardrail.law} />
        </main>
    );
}
