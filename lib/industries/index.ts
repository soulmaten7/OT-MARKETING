/**
 * 6 업종 config 라우터 + 타입 정의
 * STEP_25 — 업종별 랜딩 페이지 props 기반 시스템 (미래 SaaS 호환)
 */

import { debtReliefConfig } from "./debt-relief";
import { rentalConfig } from "./rental";
import { mobileConfig } from "./mobile";
import { realestateConfig } from "./realestate";
import { investmentConfig } from "./investment";
import { medicalConfig } from "./medical";

// ───────────────────────────── Types ─────────────────────────────

export interface QuestionOption {
    value: string;
    label: string;
}

export interface Question {
    id: string;
    step: number; // 1~4 (멀티스텝 그룹)
    type: "select" | "multi" | "radio";
    label: string;
    options: QuestionOption[];
    required: boolean;
}

export interface ResultBranch {
    grade: string;
    title: string;
    description: string;
    cta: string;
}

export type AnswerValue = string | string[];
export type AnswerMap = Record<string, AnswerValue>;
export type ResultLogic = (answers: AnswerMap) => string;

export interface BrandInfo {
    companyName: string;
    businessNumber?: string;
    contactPerson?: string;
    phone?: string;
    mandatoryNote?: string;
}

export interface IndustryConfig {
    industryId: string;
    industryNumber: number;
    industryName: string;
    hero: {
        eyebrow: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        ctaText: string;
    };
    diagnosis: {
        questions: Question[];
        progressSteps: number;
        stepLabels: string[];
    };
    result: {
        branches: ResultBranch[];
        logic: ResultLogic;
    };
    contact: {
        sheetId: string | null;
        additionalFields: { key: string; label: string; required: boolean }[];
    };
    guardrail: {
        forbidden: string[];
        allowed: string[];
        law: string;
        warning: string;
    };
    defaultBrand: BrandInfo;
}

// ───────────────────────────── Router ─────────────────────────────

const configs: Record<string, IndustryConfig> = {
    select1: debtReliefConfig,
    select2: rentalConfig,
    select3: mobileConfig,
    select4: realestateConfig,
    select5: investmentConfig,
    select6: medicalConfig,
};

export function getIndustryConfig(slug: string): IndustryConfig | null {
    return configs[slug] ?? null;
}

export function getIndustryConfigByNumber(num: number): IndustryConfig | null {
    return configs[`select${num}`] ?? null;
}

export function getAllIndustryConfigs(): IndustryConfig[] {
    return [
        debtReliefConfig,
        rentalConfig,
        mobileConfig,
        realestateConfig,
        investmentConfig,
        medicalConfig,
    ];
}

export const industrySlugs = ["select1", "select2", "select3", "select4", "select5", "select6"];
