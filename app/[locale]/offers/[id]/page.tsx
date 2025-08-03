import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchOffers } from '../../../lib/offers';
import ImageGalleryPreview from '@/app/_components/ImageGalleryPreview';
import BackButton from '@/app/_components/BackButton';
import type { Offer } from '../../../types/offers';

interface OfferDetailsPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function OfferDetailsPage({ params }: OfferDetailsPageProps) {
  const { locale, id } = await params;
  const tOffers = await getTranslations('offers');

  // Fetch offers and find the specific one
  const offersResponse = await fetchOffers();
  const offer = offersResponse.success 
    ? offersResponse.data.find((o: Offer) => o.id === id)
    : null;

  if (!offer) {
    notFound();
  }

  // Helper function to handle base64 images
  const getImageSrc = (image: string) => {
    if (!image) return '';
    if (image.startsWith('data:image/')) {
      return image;
    } else if (image.startsWith('http')) {
      return image;
    } else {
      return `data:image/jpeg;base64,${image}`;
    }
  };

  return (
    <div className="min-h-screen relative" style={{
      backgroundColor: '#FCE6CE',
      backgroundImage: 'url(/bg-2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Background overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(252, 230, 206, 0.85)' }}></div>
      
      <div className="relative z-10">
        {/* Enhanced Back Button with Loading - More spacing from navbar */}
        <div className="pt-32 px-6 mb-6">
          <div className="container mx-auto max-w-7xl">
            <BackButton href={`/${locale}#offers`} />
          </div>
        </div>

        {/* Main Content with Enhanced Layout */}
        <div className="px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Left Column - Image Gallery and Description */}
              <div className="lg:col-span-2 space-y-10">
                {/* Enhanced Image Gallery Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <ImageGalleryPreview 
                      mainImage={offer.mainImageUrl}
                      images={offer.imageUrls || []}
                      title={offer.title}
                    />
                  </div>
                </div>

                {/* Enhanced Description Section */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100">
                  <div className="p-10">
                    <div className="mb-10">
                      <div className="flex items-center mb-8">
                        <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-2xl mr-6 shadow-lg">
                          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">About This Experience</h2>
                          <p className="text-gray-500 text-base">Discover what makes this journey truly special</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-3xl border border-blue-200 shadow-lg">
                          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-xl mr-3 shadow-lg">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            </span>
                            Quick Overview
                          </h3>
                          <p className="text-gray-700 leading-relaxed text-base">
                            {offer.shortDescription}
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-gray-50 via-slate-50 to-gray-100 p-6 rounded-3xl border border-gray-200 shadow-lg">
                          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                            <span className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-2 rounded-xl mr-3 shadow-lg">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </span>
                            Complete Details
                          </h3>
                          <p className="text-gray-700 leading-relaxed text-base">
                            {offer.bigDescription || offer.shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Enhanced Booking Details */}
              <div className="lg:col-span-1 space-y-8">
                {/* Main Info Card with Enhanced Design */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 sticky top-8">
                  <div className="p-10">
                    {/* Enhanced Title and Rating */}
                    <div className="mb-8">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                        {offer.title}
                      </h1>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-100 px-4 py-2 rounded-xl border border-yellow-200 shadow-lg">
                          <span className="text-yellow-500 text-lg mr-2">⭐</span>
                          <span className="font-bold text-yellow-700 text-lg">{offer.stars}</span>
                          <span className="text-gray-600 ml-2 text-sm">• Excellent rating</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Quick Details */}
                    <div className="space-y-4 mb-8">
                      <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4 rounded-2xl border border-orange-200 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl mr-3 shadow-md">
                            <span className="text-2xl">📍</span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-gray-500 block uppercase tracking-wide">Destination</span>
                            <span className="font-bold text-gray-900 text-lg">{offer.destination}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 rounded-2xl border border-blue-200 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl mr-3 shadow-md">
                            <span className="text-2xl">📅</span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-gray-500 block uppercase tracking-wide">Duration</span>
                            <span className="font-bold text-gray-900 text-lg">{offer.duration} days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Availability Status */}
                    {offer.available && (
                      <div className="mb-8">
                        <div className="flex items-center justify-center bg-gradient-to-r from-green-50 via-emerald-50 to-green-100 border border-green-200 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
                          <span className="text-green-600 text-xl mr-3">✅</span>
                          <div className="text-center">
                            <span className="font-bold text-green-700 text-lg block">Available Now</span>
                            <span className="text-green-600 text-sm">Ready to book instantly</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Additional Services */}
                    <div className="space-y-3 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 rounded-2xl border border-blue-200 text-center shadow-lg transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-center text-blue-700">
                          <span className="mr-3 text-2xl">💼</span>
                          <div>
                            <span className="font-bold text-blue-800 text-base block">Professional Service</span>
                            <span className="text-blue-600 text-sm">Expert guidance throughout your journey</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-4 rounded-2xl border border-purple-200 text-center shadow-lg transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-center text-purple-700">
                          <span className="mr-3 text-2xl">🎯</span>
                          <div>
                            <span className="font-bold text-purple-800 text-base block">Best Price Guarantee</span>
                            <span className="text-purple-600 text-sm">Competitive rates with premium quality</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-lg transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-center text-emerald-700">
                          <span className="mr-3 text-2xl">🛡️</span>
                          <div>
                            <span className="font-bold text-emerald-800 text-base block">100% Secure Booking</span>
                            <span className="text-emerald-600 text-sm">Safe and protected reservations</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ultra-Enhanced Book Button - Moved to last position */}
                    <Link 
                      href={`/${locale}#contact`}
                      className="w-full px-8 py-4 rounded-2xl text-white font-bold text-lg text-center block transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-3xl relative overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, #F28C28 0%, #FF6B35 30%, #E53E3E 70%, #C53030 100%)'
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book This Adventure
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Bottom Spacing */}
          <div className="h-32"></div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: OfferDetailsPageProps) {
  const { locale, id } = await params;
  
  // Fetch the offer for metadata
  const offersResponse = await fetchOffers();
  const offer = offersResponse.success 
    ? offersResponse.data.find((o: Offer) => o.id === id)
    : null;

  if (!offer) {
    return {
      title: 'Offer Not Found',
    };
  }

  return {
    title: `${offer.title} - Odyssee Travel Services`,
    description: offer.shortDescription || offer.bigDescription,
    openGraph: {
      title: offer.title,
      description: offer.shortDescription,
      images: [offer.mainImageUrl || offer.imageUrls?.[0]],
    },
  };
}
