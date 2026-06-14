import { permanentRedirect } from "next/navigation";

// 옛 라우트 = 새 / (홈) 로 영구 redirect (308 Permanent)
// 사장 진단 (6/11): CPA 1 페이지 사이트 = /cpa 서브경로 의미 X → / 가 메인.
// 308 Permanent = SEO 검색엔진 인덱스 = 새 URL 로 영구 이전 (옛 /cpa 인덱스 → / 권한 승계)
export default function LegacyCpaRedirect() {
    permanentRedirect("/");
}
