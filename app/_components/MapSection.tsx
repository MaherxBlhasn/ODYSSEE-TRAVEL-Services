import { getTranslations } from 'next-intl/server';

export default async function MapSection() {
  const tMap = await getTranslations('map');

  return (
    <section id="map" className="py-20 px-6 bg-navy">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-beige mb-4">{tMap('title')}</h2>
        <p className="text-xl text-beige/70 mb-12 max-w-3xl mx-auto">{tMap('subtitle')}</p>

        <div className="bg-beige/10 rounded-2xl p-12 backdrop-blur-sm">
          <div className="text-6xl mb-6">🗺️</div>
          <h3 className="text-2xl font-bold text-beige mb-4">{tMap('comingSoon')}</h3>
          <p className="text-beige/70">{tMap('description')}</p>
        </div>
      </div>
    </section>
  );
}
