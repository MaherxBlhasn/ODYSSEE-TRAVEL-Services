import { getTranslations } from 'next-intl/server';

export default async function MapSection() {
  const tMap = await getTranslations('map');

  return (
    <section id="map" className="py-20 px-6" style={{
      background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)'
    }}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
          color: '#FCE6CE',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>{tMap('title')}</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto" style={{ 
          color: '#FCE6CE', 
          opacity: 0.8 
        }}>{tMap('subtitle')}</p>

        <div className="rounded-2xl p-12 backdrop-blur-sm border border-orange/20" style={{
          backgroundColor: 'rgba(252, 230, 206, 0.1)'
        }}>
          <div className="text-6xl mb-6">🗺️</div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#FCE6CE' }}>{tMap('comingSoon')}</h3>
          <p style={{ color: '#FCE6CE', opacity: 0.8 }}>{tMap('description')}</p>
        </div>
      </div>
    </section>
  );
}
