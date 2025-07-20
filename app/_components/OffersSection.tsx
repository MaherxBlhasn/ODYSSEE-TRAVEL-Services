import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function OffersSection({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tOffers = await getTranslations('offers');

  return (
    <section id="offers" className="py-20 px-6 relative" style={{
      backgroundColor: '#FCE6CE',
      backgroundImage: 'url(/bg-2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="absolute inset-0" style={{backgroundColor: 'rgba(252, 230, 206, 0.85)'}}></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#001F3F', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{tOffers('title')}</h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#001F3F', opacity: 0.8, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{tOffers('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </div>
    </section>
  );
}
