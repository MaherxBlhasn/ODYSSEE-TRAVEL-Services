import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { fetchOffers, processOfferData } from '../lib/offers';
import { getOfferInLanguage } from '../lib/offerLanguageUtils';
import type { ProcessedOffer } from '../types/offers';
import OfferCardLink from './OfferCardLink';

export async function OffersContent({ locale }: { locale: string }) {
    const tOffers = await getTranslations('offers');

    // Fetch offers from backend API
    const offersResponse = await fetchOffers();

    // Process the offers data to match component format - optimized for server-side
    const processedOffers = offersResponse.success && offersResponse.data?.length
        ? offersResponse.data
            .filter(offer => offer.available) // Only show available offers
            .map(offer => {
                const processedOffer = processOfferData(offer);
                // Get localized version based on current locale
                const localizedOffer = getOfferInLanguage(processedOffer, locale as 'en' | 'fr');
                // Return both processed data and original duration as number for formatting
                return {
                    ...processedOffer,
                    ...localizedOffer,
                    duration: offer.duration // Keep original duration as number for proper formatting
                };
            })
        : [];

    // Helper function to handle base64 images
    const getImageSrc = (image: string) => {
        if (image.startsWith('data:image/')) {
            return image; // Already a base64 data URL
        } else if (image.startsWith('http')) {
            return image; // Regular URL
        } else {
            // Assume it's base64 without data URL prefix
            return `data:image/jpeg;base64,${image}`;
        }
    };

    return (
        <section id="offers" className="py-20 px-6 relative" style={{
            backgroundColor: '#FCE6CE',
            backgroundImage: 'url(/bg-2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(252, 230, 206, 0.85)' }}></div>
            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#001F3F', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{tOffers('title')}</h2>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: '#001F3F', opacity: 0.8, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{tOffers('subtitle')}</p>
                </div>

                {processedOffers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto justify-items-center">
                        {processedOffers.map((offer: ProcessedOffer, index: number) => (
                            <div
                                key={offer.id}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:border-white/40 hover:-translate-y-2 flex flex-col h-full w-full max-w-sm"
                            >
                                {/* Image Container with Overlay */}
                                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url(${getImageSrc(offer.image)})`
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    
                                    {/* Top Badges */}
                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                        <div className="flex flex-col gap-2">
                                            {/* Stars Badge */}
                                            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20">
                                                <span className="flex items-center gap-1">
                                                    ⭐ {offer.stars}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Available Badge */}
                                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-white/20">
                                            <span className="flex items-center gap-1">
                                                ✓ Available
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white text-xl font-bold drop-shadow-lg leading-tight">
                                            {offer.title}
                                        </h3>
                                        {offer.destination && (
                                            <div className="flex items-center mt-2 text-white/90 text-sm">
                                                <span className="mr-1">📍</span>
                                                <span className="font-medium">{offer.destination}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    {/* Description */}
                                    <div className="mb-6 flex-1">
                                        <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                                            {offer.shortDescription}
                                        </p>
                                    </div>

                                    {/* Action Buttons - Now at bottom */}
                                    <div className="space-y-3 mt-auto">
                                        <OfferCardLink
                                            href={`/${locale}/offers/${offer.id}`}
                                            className="block w-full px-6 py-3 text-center rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform"
                                            style={{ 
                                                backgroundColor: '#001F3F',
                                                color: 'white'
                                            }}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <span>📖</span>
                                                {tOffers('details.more')}
                                            </span>
                                        </OfferCardLink>
                                        
                                        <Link
                                            href={`/${locale}#contact`}
                                            className="block w-full px-6 py-3 text-center rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-blue-900 bg-transparent"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <span>✈️</span>
                                                {tOffers('bookNow')}
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Subtle Corner Accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                                    <div className="absolute top-4 right-4 w-6 h-6 transform rotate-45 opacity-10" style={{ backgroundColor: '#F28C28' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Enhanced No offers available state
                    <div className="flex justify-center">
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-10 max-w-md w-full mx-4 text-center border border-white/30 hover:shadow-2xl transition-all duration-500">
                            <div className="mb-8">
                                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-50 to-orange-50 border border-white/50">
                                    <span className="text-4xl">✈️</span>
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold mb-4" style={{ color: '#001F3F' }}>
                                {tOffers('noOffers.title')}
                            </h3>

                            <p className="text-lg mb-8 leading-relaxed text-gray-600">
                                {tOffers('noOffers.description')}
                            </p>

                            <Link
                                href={`/${locale}#contact`}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform bg-gradient-to-r from-orange-500 to-amber-500"
                            >
                                <span>🔔</span>
                                {tOffers('noOffers.getNotified')}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}