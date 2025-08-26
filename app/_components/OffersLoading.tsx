import { getTranslations } from "next-intl/server";

// Enhanced loading component matching the new card design
export async function OffersLoading({ locale }: { locale: string }) {
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

                {/* Enhanced Cards skeleton matching new design */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto justify-items-center">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden border border-white/20 w-full max-w-sm"
                        >
                            {/* Enhanced Image skeleton - matching h-56 */}
                            <div className="relative h-56 bg-gray-200 animate-pulse rounded-t-3xl">
                                {/* Top badges skeletons */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                    <div className="flex flex-col gap-2">
                                        {/* Stars badge skeleton */}
                                        <div className="h-8 w-16 bg-white/30 rounded-full animate-pulse"></div>
                                    </div>
                                    {/* Available badge skeleton */}
                                    <div className="h-8 w-20 bg-white/30 rounded-full animate-pulse"></div>
                                </div>

                                {/* Title overlay skeleton */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="h-6 w-40 bg-black/20 rounded mb-2 animate-pulse"></div>
                                    <div className="h-4 w-32 bg-black/15 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* Enhanced Content skeleton */}
                            <div className="p-6">
                                {/* Description skeleton */}
                                <div className="mb-6 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
                                </div>

                                {/* Enhanced Buttons skeleton */}
                                <div className="space-y-3">
                                    {/* Primary button skeleton */}
                                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    {/* Secondary button skeleton */}
                                    <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl animate-pulse"></div>
                                </div>
                            </div>

                            {/* Corner accent skeleton */}
                            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                                <div className="absolute top-4 right-4 w-6 h-6 transform rotate-45 bg-gray-100 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}