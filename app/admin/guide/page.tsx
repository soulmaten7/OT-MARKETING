import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "운영자 매뉴얼 | OT Marketing (내부용)",
    description: "OT Marketing 운영자 전용 매뉴얼",
    robots: { index: false, follow: false },
};

export default function AdminGuidePage() {
    return (
        <div className="min-h-screen bg-white">
            <iframe
                src="/admin-guide.html"
                title="OT Marketing 운영자 매뉴얼"
                className="w-full border-0"
                style={{ height: "100vh", minHeight: "900px" }}
            />
        </div>
    );
}
