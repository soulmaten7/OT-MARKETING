// Force Rebuild for Keys
import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

/**
 * ot-marketing.kr 광고주 문의 폼 → OT_광고주_관리 시트 직접 입력
 * 2026-04-27 STEP_20 — 시트 통합
 */

const formSchema = z.object({
    companyName: z.string(),
    contactPerson: z.string(),
    phone: z.string(),
    email: z.string().email(),
    industry: z.string(),
    firmSize: z.string(),
    callIncluded: z.string(),
    budget: z.string(),
    targetCpa: z.string().optional(),
    currentMethod: z.string().optional(),
    message: z.string().optional(),
    privacyAgree: z.boolean(),
    marketingAgree: z.boolean().optional(),
});

const INDUSTRY_MAP: Record<string, string> = {
    'loan': '개인회생',
    'rental': '렌탈·정수기',
    'internet': '통신·인터넷',
    'finance': '주식·코인 리딩',
    'realestate': '부동산·분양',
    'medical': '병의원',
    'etc': '기타',
};

const CALL_INCLUDED_MAP: Record<string, string> = {
    'included': '1차콜 포함',
    'excluded': '1차콜 미포함',
    'undecided': '미정',
};

const FIRM_SIZE_LABEL: Record<string, string> = {
    'solo': '1인 사무소',
    'small': '소형 (변호사 2~5명)',
    'medium': '중형 (변호사 6~20명)',
    'large': '대형 (변호사 20명 이상)',
    'non_law': '법무법인 외',
};

const BUDGET_LABEL: Record<string, string> = {
    'under_300': '300만원 미만',
    '300_1000': '300만원 ~ 1,000만원',
    '1000_3000': '1,000만원 ~ 3,000만원',
    'over_3000': '3,000만원 이상',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateNextAdvertiserId(sheet: any): Promise<string> {
    const rows = await sheet.getRows();
    let maxNum = 0;
    for (const row of rows) {
        const id = row.get('광고주ID');
        if (typeof id === 'string' && id.startsWith('AD')) {
            const num = parseInt(id.replace('AD', ''), 10);
            if (!isNaN(num) && num > maxNum) {
                maxNum = num;
            }
        }
    }
    return `AD${String(maxNum + 1).padStart(3, '0')}`;
}

function formatPhone(raw: string): string {
    let digits = raw.replace(/\D/g, "");
    if (digits.length === 10 && digits.startsWith("1")) digits = "0" + digits;
    digits = digits.slice(0, 11);
    if (digits.startsWith("02")) {
        if (digits.length <= 2) return digits;
        if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        if (digits.length <= 9) return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
        return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
    }
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.startsWith("010")) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function buildMemoText(data: z.infer<typeof formSchema>): string {
    const lines: string[] = [];
    lines.push(`[자동입수: ot-marketing.kr 폼]`);
    if (data.contactPerson) lines.push(`담당자: ${data.contactPerson}`);
    if (data.firmSize) {
        const label = FIRM_SIZE_LABEL[data.firmSize] || data.firmSize;
        lines.push(`사무소 규모: ${label}`);
    }
    if (data.budget) {
        const label = BUDGET_LABEL[data.budget] || data.budget;
        lines.push(`월 예산: ${label}`);
    }
    if (data.targetCpa) lines.push(`목표 CPA: ${data.targetCpa}`);
    if (data.currentMethod) lines.push(`현재 마케팅: ${data.currentMethod}`);
    if (data.message) lines.push(`문의내용: ${data.message}`);
    lines.push(`개인정보 동의: ${data.privacyAgree ? '동의' : '미동의'}`);
    lines.push(`마케팅 수신: ${data.marketingAgree ? '동의' : '미동의'}`);
    return lines.join('\n');
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = formSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                { error: "Invalid data", details: (result.error as any).issues ?? (result.error as any).errors },
                { status: 400 }
            );
        }

        if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
            try {
                let privateKey = process.env.GOOGLE_PRIVATE_KEY!;
                if (privateKey.includes('\\n')) {
                    privateKey = privateKey.replace(/\\n/g, '\n');
                }
                if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
                    privateKey = privateKey.slice(1, -1);
                }

                let pureBase64 = privateKey
                    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
                    .replace(/-----END PRIVATE KEY-----/g, '')
                    .replace(/\s+/g, '');

                const remainder = pureBase64.length % 4;
                if (remainder !== 0) {
                    const padding = 4 - remainder;
                    pureBase64 += '='.repeat(padding);
                }

                const chunkedBase64 = pureBase64.match(/.{1,64}/g)?.join('\n');
                const finalKey = `-----BEGIN PRIVATE KEY-----\n${chunkedBase64}\n-----END PRIVATE KEY-----\n`;

                const serviceAccountAuth = new JWT({
                    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    key: finalKey,
                    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
                });

                const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
                await doc.loadInfo();

                const sheet = doc.sheetsByIndex[0];
                await sheet.loadHeaderRow();

                const advertiserId = await generateNextAdvertiserId(sheet);
                console.log(`Generated advertiser ID: ${advertiserId}`);

                const today = new Date().toLocaleDateString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).replace(/\. /g, '-').replace('.', '');

                const industryLabel = INDUSTRY_MAP[result.data.industry] || result.data.industry;
                const callIncludedLabel = CALL_INCLUDED_MAP[result.data.callIncluded] || result.data.callIncluded;

                await sheet.addRow({
                    '광고주ID': advertiserId,
                    '회사명': result.data.companyName,
                    '법인 정식명': '',
                    '사업자번호': '',
                    '책임 변호사': '',
                    '연락 (전화)': formatPhone(result.data.phone),
                    '연락 (이메일·카톡)': result.data.email,
                    '업종': industryLabel,
                    'USP (광고 반영 강점)': '',
                    '등록 전문분야 키워드': '',
                    '첫 컨택일': today,
                    '컨택 채널': '자사 홈페이지 문의',
                    '현재 단계': '01_문의접수',
                    '단계 진입일': today,
                    '다음 액션 + 기한': '1차 미팅 일정 협의',
                    '1차콜 포함 여부': callIncludedLabel,
                    '합의 CPA 단가 (원)': '',
                    '정산 주기': '미정',
                    '결제 조건': '미정',
                    'otpage 서브경로': '',
                    '메모 (자유 텍스트)': buildMemoText(result.data),
                });

                console.log(`Successfully added row to OT_광고주_관리: ${advertiserId} / ${result.data.companyName}`);

            } catch (sheetError) {
                console.error("Google Sheets Error:", sheetError);
            }
        } else {
            console.warn("Google Sheets credentials missing");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
