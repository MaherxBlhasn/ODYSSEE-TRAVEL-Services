import { getTranslations } from 'next-intl/server';

export default async function AboutSection() {
  const tAbout = await getTranslations('about');

  return (
    <section id="about" className="py-20 px-6 bg-beige">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">{tAbout('title')}</h2>
          <p className="text-lg text-navy/80 mb-6">{tAbout('description1')}</p>
          <p className="text-lg text-navy/80">{tAbout('description2')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">150+</div>
            <div className="text-xl text-navy">{tAbout('stats.destinations')}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">10,000+</div>
            <div className="text-xl text-navy">{tAbout('stats.travelers')}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">15+</div>
            <div className="text-xl text-navy">{tAbout('stats.experience')}</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">{tAbout('features.personalizedService.title')}</h3>
            <p className="text-navy/70">{tAbout('features.personalizedService.description')}</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕐</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">{tAbout('features.support.title')}</h3>
            <p className="text-navy/70">{tAbout('features.support.description')}</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">{tAbout('features.bestValue.title')}</h3>
            <p className="text-navy/70">{tAbout('features.bestValue.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
