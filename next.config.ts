import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [];
    },
    async rewrites() {
        return [
            {
                source: '/sitemap',
                destination: '/sitemap',
                locale: false, // <- important: prevent locale prefix
            },
        ];
    },
};
export default nextConfig;