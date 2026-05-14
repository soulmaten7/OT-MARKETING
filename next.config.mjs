/** @type {import('next').NextConfig} */
const nextConfig = {
    // STEP_105 — 개발 모드 bypass 플래그를 모든 번들(middleware 포함)에 정적 주입
    env: {
        BYPASS_AUTH_DEV: (process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH || 'false').trim(),
    },
};

export default nextConfig;
