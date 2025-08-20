import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { fetchOffers, processOfferData } from '../lib/offers';
import { getOfferInLanguage, formatDuration } from '../lib/offerLanguageUtils';
import type { ProcessedOffer } from '../types/offers';
import OfferCardLink from './OfferCardLink';

export default async function OffersSection({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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

  // Rotation classes for the hover effect
  const getRotationClass = (index: number) => {
    const rotations = ['hover:rotate-1', 'hover:-rotate-1', 'hover:rotate-1'];
    return rotations[index % rotations.length];
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processedOffers.map((offer: ProcessedOffer, index: number) => (
              <div
                key={offer.id}
                className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl hover:bg-white/95 transition-all duration-500 border border-gray-200 hover:scale-105 ${getRotationClass(index)}`}
              >
                <div className="h-48 relative" style={{
                  backgroundImage: `url(${getImageSrc(offer.image)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white bg-black/30 rounded-lg px-3 py-1 border border-white/20">
                    <span className="text-lg font-semibold drop-shadow-lg">{offer.title}</span>
                  </div>
                  {/* Stars badge */}
                  <div className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg" style={{ backgroundColor: '#F28C28' }}>
                    {offer.stars}
                  </div>
                  {/* Available badge for all offers since we filter by available */}
                  <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg" style={{ backgroundColor: '#001F3F' }}>
                    Available
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#001F3F' }}>{offer.title}</h3>
                  <div className="mb-4 h-[4.5rem] overflow-hidden">
                    <p className="line-clamp-3"
                      style={{
                        color: '#001F3F',
                        opacity: 0.8,
                        lineHeight: 1.5
                      }}>
                      {offer.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {offer.duration && (
                      <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                        <span className="text-orange-600 mr-1">🕒</span>
                        <span className="text-sm font-semibold" style={{ color: '#F28C28' }}>
                          {typeof offer.duration === 'number'
                            ? formatDuration(offer.duration, locale as 'en' | 'fr')
                            : offer.duration
                          }
                        </span>
                      </div>
                    )}
                    {offer.destination && (
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                        <span className="text-blue-600 mr-1">📍</span>
                        <span className="text-sm font-semibold" style={{ color: '#001F3F' }}>
                          {offer.destination}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <OfferCardLink
                      href={`/${locale}/offers/${offer.id}`}
                      className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-center"
                      style={{ backgroundColor: '#001F3F' }}
                    >
                      {tOffers('details.more')}
                    </OfferCardLink>
                    <Link
                      href={`/${locale}#contact`}
                      className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-center"
                      style={{ backgroundColor: '#F28C28' }}
                    >
                      {tOffers('bookNow')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No offers available state - positioned closer to header
          <div className="flex justify-center">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 max-w-lg w-full mx-4 text-center border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FCE6CE' }}>
                  <span className="text-3xl sm:text-4xl">✈️</span>
                </div>
              </div>

              {/* Message */}
              <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#001F3F' }}>
                {tOffers('noOffers.title')}
              </h3>

              <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: '#001F3F', opacity: 0.7 }}>
                {tOffers('noOffers.description')}
              </p>

              {/* Call to action */}
              <Link
                href={`/${locale}#contact`}
                className="inline-block px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                style={{ backgroundColor: '#F28C28' }}
              >
                {tOffers('noOffers.getNotified')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
