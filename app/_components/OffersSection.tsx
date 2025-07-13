import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function OffersSection({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tOffers = await getTranslations('offers');

  return (
    <section id="offers" className="py-20 px-6" style={{background: 'linear-gradient(135deg, #f4dcc2 0%, #f7e8d3 50%, #f4dcc2 100%)'}}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4" style={{color: '#011d3b', textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>{tOffers('title')}</h2>
          <p className="text-xl max-w-3xl mx-auto" style={{color: '#011d3b', opacity: 0.8}}>{tOffers('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-navy/10">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-lg font-semibold">Europe Explorer</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3" style={{color: '#011d3b'}}>{tOffers('europeanExplorer.title')}</h3>
              <p className="mb-4" style={{color: '#011d3b', opacity: 0.8, lineHeight: 1.5}}>{tOffers('europeanExplorer.description')}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange">{tOffers('europeanExplorer.price')}</span>
                <Link href={`/${locale}#contact`} className="bg-navy hover:bg-navy/90 px-6 py-2 rounded-full text-beige font-semibold transition-colors">
                  {tOffers('bookNow')}
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-navy/10">
            <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-700 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-lg font-semibold">Tropical Paradise</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3" style={{color: '#011d3b'}}>{tOffers('tropicalParadise.title')}</h3>
              <p className="mb-4" style={{color: '#011d3b', opacity: 0.8, lineHeight: 1.5}}>{tOffers('tropicalParadise.description')}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange">{tOffers('tropicalParadise.price')}</span>
                <Link href={`/${locale}#contact`} className="bg-navy hover:bg-navy/90 px-6 py-2 rounded-full text-beige font-semibold transition-colors">
                  {tOffers('bookNow')}
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-navy/10">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-lg font-semibold">Cultural Journey</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3" style={{color: '#011d3b'}}>{tOffers('culturalImmersion.title')}</h3>
              <p className="mb-4" style={{color: '#011d3b', opacity: 0.8, lineHeight: 1.5}}>{tOffers('culturalImmersion.description')}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange">{tOffers('culturalImmersion.price')}</span>
                <Link href={`/${locale}#contact`} className="bg-navy hover:bg-navy/90 px-6 py-2 rounded-full text-beige font-semibold transition-colors">
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
