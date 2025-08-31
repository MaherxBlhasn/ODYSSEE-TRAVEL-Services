// Create this file as app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',           // Block API routes (if you have any sensitive ones)
                    '/admin/',         // Block admin areas (if you have any)
                    '/private/',       // Block private content
                    '/_next/',         // Block Next.js internal files (optional, usually fine to crawl)
                    '/temp/',          // Block temporary files
                    '*.json',         // Block JSON files (optional)
                ],
                crawlDelay: 1,       // Be nice to your server, 1 second delay between requests
            },
            // Special rules for well-behaved search engines
            {
                userAgent: ['Googlebot', 'Bingbot'],
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                ],
                // No crawl delay for major search engines as they're usually well-behaved
            },
        ],
        sitemap: 'https://odysseetravelservices.com/sitemap.xml',  // Make sure this matches your domain
        host: 'https://odysseetravelservices.com',  // Specify your preferred domain
    }
}