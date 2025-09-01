import { NextResponse } from 'next/server';
import { fetchOffers } from '../lib/offers'; // adjust path if needed

export const GET = async () => {
    const baseUrl = 'https://www.odysseetravelservices.com';
    const now = new Date().toISOString();

    // 1️⃣ Static main pages
    const staticPages = [
        {
            url: `${baseUrl}/en`,
            lastmod: now,
            changefreq: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/fr`,
            lastmod: now,
            changefreq: 'weekly',
            priority: 1.0,
        },
    ];

    // 2️⃣ Dynamic offer pages
    let offerPages: {
        url: string;
        lastmod: string;
        changefreq: string;
        priority: number;
    }[] = [];

    try {
        const offersResponse = await fetchOffers();
        if (offersResponse.success && offersResponse.data?.length) {
            offerPages = offersResponse.data
                .filter(o => o.available)
                .flatMap(o => [
                    {
                        url: `${baseUrl}/en/offers/${o.id}`,
                        lastmod: new Date(o.updatedAt || o.createdAt || now).toISOString(),
                        changefreq: 'monthly',
                        priority: 0.8,
                    },
                    {
                        url: `${baseUrl}/fr/offers/${o.id}`,
                        lastmod: new Date(o.updatedAt || o.createdAt || now).toISOString(),
                        changefreq: 'monthly',
                        priority: 0.8,
                    },
                ]);
        }
    } catch (e) {
        console.error('Error fetching offers for sitemap:', e);
    }

    // 3️⃣ Section anchors (optional, remove if you want cleaner sitemap)
    const sections = ['hero', 'offers', 'about', 'map', 'contact'];
    const sectionAnchors = sections.flatMap(section => [
        {
            url: `${baseUrl}/en#${section}`,
            lastmod: now,
            changefreq: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/fr#${section}`,
            lastmod: now,
            changefreq: 'weekly',
            priority: 0.9,
        },
    ]);

    // Combine all URLs
    const urls = [...staticPages, ...offerPages, ...sectionAnchors];

    // 4️⃣ Generate XML
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    // 5️⃣ Return XML response
    return new NextResponse(sitemapXml, {
        headers: { 'Content-Type': 'application/xml' },
    });
};
