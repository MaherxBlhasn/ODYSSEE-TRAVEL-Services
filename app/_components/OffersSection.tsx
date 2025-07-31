import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { fetchOffers, processOfferData } from '../lib/offers';
import type { ProcessedOffer } from '../types/offers';

export default async function OffersSection({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tOffers = await getTranslations('offers');

  // Fetch offers from backend API
  const offersResponse = await fetchOffers();
  console.log('offersResponse:', offersResponse);
  
  // Process the offers data to match component format - optimized for server-side
  const processedOffers = offersResponse.success && offersResponse.data?.length
    ? offersResponse.data
        .filter(offer => offer.available) // Only show available offers
        .map(offer => processOfferData(offer))
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processedOffers.length > 0 ? (
            processedOffers.map((offer: ProcessedOffer, index: number) => (
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
                  <p className="mb-4 line-clamp-3" 
                     style={{ 
                       color: '#001F3F', 
                       opacity: 0.8, 
                       lineHeight: 1.5
                     }}>
                    {offer.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    {offer.duration && (
                      <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                        <span className="text-orange-600 mr-1">🕒</span>
                        <span className="text-sm font-semibold" style={{ color: '#F28C28' }}>
                          {offer.duration}
                        </span>
                      </div>
                    )}
                    {offer.location && (
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                        <span className="text-blue-600 mr-1">📍</span>
                        <span className="text-sm font-semibold" style={{ color: '#001F3F' }}>
                          {offer.location}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link href={`/${locale}#contact`} className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full text-center" style={{ backgroundColor: '#F28C28' }}>
                      {tOffers('bookNow')}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Fallback to static offers if API fails
            <>
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl hover:bg-white/95 transition-all duration-500 border border-gray-200 hover:scale-105 hover:rotate-1">
                <div className="h-48 relative" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white bg-black/30 rounded-lg px-3 py-1 border border-white/20">
                    <span className="text-lg font-semibold drop-shadow-lg">Europe Explorer</span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#001F3F' }}>{tOffers('europeanExplorer.title')}</h3>
                  <p className="mb-4" style={{ color: '#001F3F', opacity: 0.8, lineHeight: 1.5 }}>{tOffers('europeanExplorer.description')}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold drop-shadow-lg" style={{ color: '#F28C28' }}>{tOffers('europeanExplorer.price')}</span>
                    <Link href={`/${locale}#contact`} className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" style={{ backgroundColor: '#F28C28' }}>
                      {tOffers('bookNow')}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl hover:bg-white/95 transition-all duration-500 border border-gray-200 hover:scale-105 hover:-rotate-1">
                <div className="h-48 relative" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white bg-black/30 rounded-lg px-3 py-1 border border-white/20">
                    <span className="text-lg font-semibold drop-shadow-lg">Tropical Paradise</span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#001F3F' }}>{tOffers('tropicalParadise.title')}</h3>
                  <p className="mb-4" style={{ color: '#001F3F', opacity: 0.8, lineHeight: 1.5 }}>{tOffers('tropicalParadise.description')}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold drop-shadow-lg" style={{ color: '#F28C28' }}>{tOffers('tropicalParadise.price')}</span>
                    <Link href={`/${locale}#contact`} className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" style={{ backgroundColor: '#F28C28' }}>
                      {tOffers('bookNow')}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl hover:bg-white/95 transition-all duration-500 border border-gray-200 hover:scale-105 hover:rotate-1">
                <div className="h-48 relative" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white bg-black/30 rounded-lg px-3 py-1 border border-white/20">
                    <span className="text-lg font-semibold drop-shadow-lg">Cultural Journey</span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#001F3F' }}>{tOffers('culturalImmersion.title')}</h3>
                  <p className="mb-4" style={{ color: '#001F3F', opacity: 0.8, lineHeight: 1.5 }}>{tOffers('culturalImmersion.description')}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold drop-shadow-lg" style={{ color: '#F28C28' }}>{tOffers('culturalImmersion.price')}</span>
                    <Link href={`/${locale}#contact`} className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" style={{ backgroundColor: '#F28C28' }}>
                      {tOffers('bookNow')}
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
