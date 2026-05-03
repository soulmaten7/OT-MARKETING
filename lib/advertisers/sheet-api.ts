import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { type Advertiser, INDUSTRY_NUMBER_MAP, parseAdvertiserSlug } from "./index";

/**
 * Tier 1 시트 (OT_광고주_관리) 에서 slug 로 광고주 정보 가져오기.
 *
 * Tier 1 시트 컬럼 (Session #4 + STEP_44 v2 갱신):
 *   A 광고주ID / B 회사명 / C 법인 정식명 / D 사업자번호 / E 책임 변호사 ...
 *   F 연락 (전화) / G 연락 (이메일·카톡) / H 업종
 *   ...
 *   V otpage 서브경로 (= slug 역할, 옛 "자동 slug" 라벨에서 정정)
 *   W 운영 URL
 *   22 광고주 시트 ID (STEP_44 v2 신규 — 광고주 전용 시트 ID)
 *   23 활성 (STEP_44 v2 신규 — TRUE/FALSE, FALSE 시 광고 차단)
 */

const TIER1_SHEET_ID = "18sfaKSB5KQBemNvc4wOx6FeMtvNVB9kTxyZOSY-ZDkI";

function buildPrivateKey(raw: string): string {
    let privateKey = raw;
    if (privateKey.includes("\\n")) privateKey = privateKey.replace(/\\n/g, "\n");
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
    }
    let pureBase64 = privateKey
        .replace(/-----BEGIN PRIVATE KEY-----/g, "")
        .replace(/-----END PRIVATE KEY-----/g, "")
        .replace(/\s+/g, "");
    const remainder = pureBase64.length % 4;
    if (remainder !== 0) pureBase64 += "=".repeat(4 - remainder);
    const chunked = pureBase64.match(/.{1,64}/g)?.join("\n");
    return `-----BEGIN PRIVATE KEY-----\n${chunked}\n-----END PRIVATE KEY-----\n`;
}

export async function getAdvertiserBySlug(slug: string): Promise<Advertiser | null> {
    const parsed = parseAdvertiserSlug(slug);
    if (!parsed) return null;

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        return null;
    }

    try {
        const finalKey = buildPrivateKey(process.env.GOOGLE_PRIVATE_KEY!);
        const auth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: finalKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const doc = new GoogleSpreadsheet(TIER1_SHEET_ID, auth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.loadHeaderRow();
        const rows = await sheet.getRows();

        for (const row of rows) {
            const rowSlug = row.get("otpage 서브경로");
            if (rowSlug !== slug) continue;

            // STEP_44 v2 — 비활성 광고주 = 광고 송출 차단
            const isActive = row.get("활성");
            if (isActive === "FALSE" || isActive === false) {
                console.warn(`[getAdvertiserBySlug] 비활성 광고주 ${slug} — 광고 차단`);
                return null;
            }

            const industry = row.get("업종") || "";
            const industryNumber = INDUSTRY_NUMBER_MAP[industry] ?? parsed.industryNumber;
            return {
                advertiserId: row.get("광고주ID") || "",
                industry,
                industryNumber,
                seqNumber: parsed.seqNumber,
                slug,
                operationUrl: row.get("운영 URL") || `https://otpage1.com/${slug}`,
                companyName: row.get("회사명") || "",
                legalName: row.get("법인 정식명") || undefined,
                businessNumber: row.get("사업자번호") || undefined,
                contactPerson: row.get("책임 변호사") || undefined,
                phone: row.get("연락 (전화)") || undefined,
                industryRegistration: row.get("등록 전문분야 키워드") || undefined,
                // STEP_44 v2 — distributeRow 가 광고주 전용 시트에 row 복사 시 사용
                partnerSheetId: row.get("광고주 시트 ID") || undefined,
            };
        }

        return null;
    } catch (error) {
        console.error("getAdvertiserBySlug error:", error);
        return null;
    }
}
