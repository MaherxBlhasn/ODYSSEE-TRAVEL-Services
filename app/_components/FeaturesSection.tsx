import { getTranslations } from 'next-intl/server';

export default async function FeaturesSection() {
  const tHome = await getTranslations('home');

  return (
    <section className="py-16 px-6" style={{
      background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)'
    }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
              backgroundColor: 'rgba(242, 140, 40, 0.2)',
              border: '2px solid rgba(242, 140, 40, 0.3)'
            }}>
              <span className="text-2xl">✈️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#FCE6CE' }}>{tHome('flightBooking')}</h3>
            <p style={{ color: '#FCE6CE', opacity: 0.8 }}>{tHome('flightBookingDesc')}</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
              backgroundColor: 'rgba(242, 140, 40, 0.2)',
              border: '2px solid rgba(242, 140, 40, 0.3)'
            }}>
              <span className="text-2xl">🏨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#FCE6CE' }}>{tHome('hotelReservations')}</h3>
            <p style={{ color: '#FCE6CE', opacity: 0.8 }}>{tHome('hotelReservationsDesc')}</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
              backgroundColor: 'rgba(242, 140, 40, 0.2)',
              border: '2px solid rgba(242, 140, 40, 0.3)'
            }}>
              <span className="text-2xl">🗺️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#FCE6CE' }}>{tHome('tourPackages')}</h3>
            <p style={{ color: '#FCE6CE', opacity: 0.8 }}>{tHome('tourPackagesDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
