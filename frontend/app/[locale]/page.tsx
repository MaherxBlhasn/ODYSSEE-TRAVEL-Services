import {getTranslations} from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('company');
  const tHome = await getTranslations('home');
  
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-beige mb-6">
            {t('name')}
          </h1>
          <h2 className="text-2xl md:text-3xl text-orange mb-8">
            {t('tagline')}
          </h2>
          <p className="text-lg text-beige/80 max-w-2xl mx-auto mb-12">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange text-navy px-8 py-3 rounded-lg font-semibold hover:bg-orange/90 transition-colors">
              {tHome('getStarted')}
            </button>
            <button className="border border-beige text-beige px-8 py-3 rounded-lg font-semibold hover:bg-beige/10 transition-colors">
              {tHome('learnMore')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-navy/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="text-xl font-semibold text-beige mb-2">{tHome('flightBooking')}</h3>
              <p className="text-beige/70">{tHome('flightBookingDesc')}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏨</span>
              </div>
              <h3 className="text-xl font-semibold text-beige mb-2">{tHome('hotelReservations')}</h3>
              <p className="text-beige/70">{tHome('hotelReservationsDesc')}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-xl font-semibold text-beige mb-2">{tHome('tourPackages')}</h3>
              <p className="text-beige/70">{tHome('tourPackagesDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
