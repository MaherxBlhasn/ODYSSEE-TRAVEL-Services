import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
    // Rewrite /sitemap without locale prefix
    async rewrites() {
        return [
            {
                source: '/sitemap',       // the URL requested
                destination: '/sitemap',  // handled by route.ts
                locale: false,            // disable automatic locale prefix
            },
        ];
    },

    // Optional: redirect /sitemap.xml → /sitemap
    async redirects() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/sitemap',
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(nextConfig);