import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function OffersSection({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tOffers = await getTranslations('offers');

  return (
    <section id="offers" className="py-20 px-6 bg-beige">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">{tOffers('title')}</h2>
          <p className="text-xl text-navy/70 max-w-3xl mx-auto">{tOffers('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-navy mb-3">{tOffers('europeanExplorer.title')}</h3>
              <p className="text-navy/70 mb-4">{tOffers('europeanExplorer.description')}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange">{tOffers('europeanExplorer.price')}</span>
                <Link href={`/${locale}#contact`} className="btn-primary px-6 py-2 rounded-full text-white font-semibold">
                  {tOffers('bookNow')}
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-green-400 to-teal-600"></div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-navy mb-3">{tOffers('tropicalParadise.title')}</h3>
              <p className="text-navy/70 mb-4">{tOffers('tropicalParadise.description')}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange">{tOffers('tropicalParadise.price')}</span>
                <Link href={`/${locale}#contact`} className="btn-primary px-6 py-2 rounded-full text-white font-semibold">
                  {tOffers('bookNow')}
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-600"></div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-navy mb-3">{tOffers('culturalImmersion.title')}</h3>
              <p className="text-navy/70 mb-4">{tOffers('culturalImmersion.description')}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-orange">{tOffers('culturalImmersion.price')}</span>
                <Link href={`/${locale}#contact`} className="btn-primary px-6 py-2 rounded-full text-white font-semibold">
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
