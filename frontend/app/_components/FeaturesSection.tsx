import { getTranslations } from 'next-intl/server';

export default async function FeaturesSection() {
  const tHome = await getTranslations('home');

  return (
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
  );
}
