// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',        // your API routes
                    '/admin/',      // if you have any admin dashboard inside this domain
                    '/private/',    // any private sections
                ],
            },
        ],
        sitemap: 'https://www.odysseetravelservices.com/sitemap',
        host: 'https://www.odysseetravelservices.com',
    };
}
