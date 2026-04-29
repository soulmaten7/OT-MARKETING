import type { BrandInfo } from "@/lib/industries";

interface BrandFooterProps {
    brand: BrandInfo;
}

export function BrandFooter({ brand }: BrandFooterProps) {
    return (
        <footer className="bg-[var(--navy)] text-white/70 py-10">
            <div className="ot-container max-w-5xl">
                <div className="grid md:grid-cols-2 gap-6 text-xs">
                    <div>
                        <div className="font-serif text-lg text-white mb-2">{brand.companyName}</div>
                        {brand.businessNumber && (
                            <p className="leading-relaxed">사업자등록번호 · {brand.businessNumber}</p>
                        )}
                        {brand.contactPerson && (
                            <p className="leading-relaxed">담당 · {brand.contactPerson}</p>
                        )}
                        {brand.phone && <p className="leading-relaxed">Tel · {brand.phone}</p>}
                    </div>
                    <div>
                        {brand.mandatoryNote && (
                            <p className="leading-relaxed text-white/60">
                                ⚖ {brand.mandatoryNote}
                            </p>
                        )}
                        <p className="mt-3 text-white/40">
                            ※ 본 페이지의 모든 표현은 업종 법규에 따라 검증되었습니다.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
