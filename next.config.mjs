/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        localPatterns: [
            { pathname: '/**' },
        ],
    },
    async redirects() {
        return [
            // non-www → www (canonical www)
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'ot-marketing.kr' }],
                destination: 'https://www.ot-marketing.kr/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
