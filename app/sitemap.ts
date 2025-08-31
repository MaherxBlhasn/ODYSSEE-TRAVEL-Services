// Create this file as app/sitemap.ts
import { MetadataRoute } from 'next'
import { fetchOffers } from './lib/offers' // Import your existing fetchOffers function

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://odysseetravelservices.com' // Make sure this matches your actual domain

    // Static pages (your main landing page)
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
            alternates: {
                languages: {
                    en: `${baseUrl}/en`,
                    fr: `${baseUrl}/fr`,
                },
            },
        },
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/fr`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
    ];

    // Fetch actual offers from your database
    try {
        const offersResponse = await fetchOffers();

        let offerPages: MetadataRoute.Sitemap = [];

        if (offersResponse.success && offersResponse.data?.length) {
            // Create sitemap entries for each available offer
            offerPages = offersResponse.data
                .filter(offer => offer.available) // Only include available offers (same logic as your component)
                .flatMap(offer => [
                    {
                        url: `${baseUrl}/en/offers/${offer.id}`,
                        lastModified: new Date(offer.updatedAt || offer.createdAt || new Date()),
                        changeFrequency: 'monthly' as const,
                        priority: 0.8,
                    },
                    {
                        url: `${baseUrl}/fr/offers/${offer.id}`,
                        lastModified: new Date(offer.updatedAt || offer.createdAt || new Date()),
                        changeFrequency: 'monthly' as const,
                        priority: 0.8,
                    },
                ]);
        }

        // Optional: Add anchor links for sections on your landing page
        const sectionAnchors = [
            { section: 'hero', priority: 0.9 },
            { section: 'offers', priority: 0.9 },
            { section: 'about', priority: 0.8 },
            { section: 'map', priority: 0.7 },
            { section: 'contact', priority: 0.8 }
        ].flatMap(({ section, priority }) => [
            {
                url: `${baseUrl}/en#${section}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority,
            },
            {
                url: `${baseUrl}/fr#${section}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority,
            },
        ]);

        return [...staticPages, ...offerPages, ...sectionAnchors];

    } catch (error) {
        console.error('Error fetching offers for sitemap:', error);
        // Return static pages only if offers fetch fails
        return staticPages;
    }
}