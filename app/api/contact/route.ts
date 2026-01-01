import { NextResponse } from "next/server";
import { z } from "zod";

// Schema sharing possible via lib/schema.ts ideally
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
                { error: "Invalid data", details: (result.error as any).issues ?? (result.error as any).errors
 },
                { status: 400 }
            );
        }

        // Placeholder: Google Sheets Logic
        // In production:
        // 1. Auth with Google Service Account (using env vars)
        // 2. Load doc by ID
        // 3. Append row

        // const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, jwt);
        // await doc.loadInfo();
        // const sheet = doc.sheetsByIndex[0];
        // await sheet.addRow(result.data);

        console.log("Form Submitted:", result.data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
