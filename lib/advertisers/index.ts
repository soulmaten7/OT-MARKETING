/**
 * STEP_27 — 광고주별 자동 slug + 광고주 정보 fetch
 *
 * Tier 1 시트 (OT_광고주_관리) 의 광고주 데이터 → otpage1.com/select{N}{n} 매칭
 */

export interface Advertiser {
    advertiserId: string; // AD001
    industry: string; // 개인회생·법률 등 (Tier 1 한국어 라벨)
    industryNumber: number; // 1~6
    seqNumber: number; // 해당 업종 내 광고주 순번
    slug: string; // select{N}{n}
    operationUrl: string; // https://otpage1.com/{slug}
    companyName: string;
    legalName?: string;
    businessNumber?: string;
    contactPerson?: string;
    phone?: string;
    industryRegistration?: string; // 변호사 자격번호·통신판매업 등록번호 등
    partnerSheetId?: string; // STEP_44 v2 — Tier 1 의 "광고주 시트 ID" 컬럼 read 결과
}

export const INDUSTRY_NUMBER_MAP: Record<string, number> = {
    "개인회생·법률": 1,
    "정수기·렌탈": 2,
    "인터넷·통신·휴대폰": 3,
    "부동산·분양": 4,
    "주식·투자": 5,
    "병의원": 6,
};

export function parseAdvertiserSlug(slug: string): { industryNumber: number; seqNumber: number } | null {
    const match = slug.match(/^select(\d)(\d+)$/);
    if (!match) return null;
    const industryNumber = parseInt(match[1], 10);
    const seqNumber = parseInt(match[2], 10);
    if (industryNumber < 1 || industryNumber > 6 || seqNumber < 1) return null;
    return { industryNumber, seqNumber };
}

export function isSampleSlug(slug: string): boolean {
    return /^select[1-6]$/.test(slug);
}

export function isAdvertiserSlug(slug: string): boolean {
    return parseAdvertiserSlug(slug) !== null;
}

export { getAdvertiserBySlug } from "./sheet-api";
