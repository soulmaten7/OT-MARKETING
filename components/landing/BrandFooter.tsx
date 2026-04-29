interface AdvertiserInfo {
    advertiserName?: string;
    lawyerName?: string;
    address?: string;
    phone?: string;
    businessNumber?: string;
}

interface BrandFooterProps {
    lawNote?: string;
    advertiser?: AdvertiserInfo;
}

export function BrandFooter({ lawNote, advertiser }: BrandFooterProps) {
    return (
        <footer className="bg-[var(--navy)] text-white/70 pt-8 pb-6">
            <div className="ot-container max-w-5xl text-center">
                {lawNote && (
                    <p className="text-xs text-white/50 leading-relaxed">
                        ※ 본 광고는 {lawNote} 에 따라 검증되었습니다.
                    </p>
                )}
                {advertiser?.advertiserName && (
                    <div className="mt-4 text-xs text-white/60 leading-relaxed">
                        <p className="font-bold">{advertiser.advertiserName}</p>
                        {advertiser.lawyerName && (
                            <p>광고책임 변호사 · {advertiser.lawyerName}</p>
                        )}
                        {advertiser.address && <p>{advertiser.address}</p>}
                        {advertiser.phone && <p>{advertiser.phone}</p>}
                        {advertiser.businessNumber && (
                            <p>사업자등록번호 · {advertiser.businessNumber}</p>
                        )}
                    </div>
                )}
            </div>
        </footer>
    );
}
