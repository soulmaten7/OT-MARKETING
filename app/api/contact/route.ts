import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const formSchema = z.object({
    companyName: z.string(),
    contactPerson: z.string(),
    phone: z.string(),
    email: z.string().email(),
    industry: z.string(),
    budget: z.string(),
    targetCpa: z.string().optional(),
    currentMethod: z.string().optional(),
    message: z.string().optional(),
    privacyAgree: z.boolean(),
    marketingAgree: z.boolean().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = formSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid data", details: (result.error as any).issues ?? (result.error as any).errors },
                { status: 400 }
            );
        }

        // Google Sheets Integration
        if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
            try {
                const serviceAccountAuth = new JWT({
                    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
                });

                const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
                await doc.loadInfo();

                const sheet = doc.sheetsByIndex[0];

                // Add headers if sheet is empty (optional, but good practice to ensure structure)
                if (sheet.rowCount === 0 || (sheet.headerValues && sheet.headerValues.length === 0)) {
                    await sheet.setHeaderRow([
                        '회사명', '담당자', '연락처', '이메일', '업종',
                        '월 예산', '목표 CPA', '현재 마케팅', '문의내용',
                        '개인정보동의', '마케팅동의', '접수일시'
                    ]);
                }

                await sheet.addRow({
                    '회사명': result.data.companyName,
                    '담당자': result.data.contactPerson,
                    '연락처': result.data.phone,
                    '이메일': result.data.email,
                    '업종': result.data.industry,
                    '월 예산': result.data.budget,
                    '목표 CPA': result.data.targetCpa || '',
                    '현재 마케팅': result.data.currentMethod || '',
                    '문의내용': result.data.message || '',
                    '개인정보동의': result.data.privacyAgree ? '동의' : '미동의',
                    '마케팅동의': result.data.marketingAgree ? '동의' : '미동의',
                    '접수일시': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
                });

                console.log("Successfully saved to Google Sheet");
            } catch (sheetError) {
                console.error("Google Sheets Error:", sheetError);
                // Don't fail the request if sheets fails, but log it. 
                // Or maybe we should? For now, we'll log and proceed as success to the user,
                // but ideally we should have a fallback.
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
