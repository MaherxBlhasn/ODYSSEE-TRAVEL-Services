import { getTranslations } from "next-intl/server";

// Simple loading component
export async function OffersLoading({ }: { locale: string }) {
    const tOffers = await getTranslations('offers');

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
                {/* Header with translated titles */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#001F3F', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        {tOffers('title')}
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: '#001F3F', opacity: 0.8, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        {tOffers('subtitle')}
                    </p>
                </div>

                {/* Cards skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                        >
                            {/* Image skeleton */}
                            <div className="h-48 bg-gray-200 animate-pulse relative">
                                <div className="absolute bottom-4 left-4">
                                    <div className="h-8 w-32 bg-black/20 rounded-lg animate-pulse"></div>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <div className="h-7 w-16 bg-white/30 rounded-full animate-pulse"></div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <div className="h-7 w-20 bg-white/30 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            {/* Content skeleton */}
                            <div className="p-6 bg-white">
                                <div className="h-8 bg-gray-200 rounded mb-3 animate-pulse"></div>
                                <div className="space-y-2 mb-4">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
                                </div>

                                {/* Badges skeleton */}
                                <div className="flex gap-3 mb-4">
                                    <div className="h-8 w-24 bg-blue-100 rounded-full animate-pulse"></div>
                                </div>

                                {/* Buttons skeleton */}
                                <div className="flex flex-col gap-3">
                                    <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}