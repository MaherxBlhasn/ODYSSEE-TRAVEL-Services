import { getTranslations } from 'next-intl/server';

export default async function AboutSection() {
  const tAbout = await getTranslations('about');

  return (
    <section id="about" className="py-20 px-6" style={{background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 30%, #e9ecef 70%, #f4dcc2 100%)'}}>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#011d3b', textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>{tAbout('title')}</h2>
          <p className="text-lg mb-6" style={{color: '#011d3b', opacity: 0.85, lineHeight: 1.6}}>{tAbout('description1')}</p>
          <p className="text-lg" style={{color: '#011d3b', opacity: 0.85, lineHeight: 1.6}}>{tAbout('description2')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">150+</div>
            <div className="text-xl" style={{color: '#011d3b', fontWeight: 600}}>{tAbout('stats.destinations')}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">10,000+</div>
            <div className="text-xl" style={{color: '#011d3b', fontWeight: 600}}>{tAbout('stats.travelers')}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange mb-2">15+</div>
            <div className="text-xl" style={{color: '#011d3b', fontWeight: 600}}>{tAbout('stats.experience')}</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-navy/10 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{color: '#011d3b'}}>{tAbout('features.personalizedService.title')}</h3>
            <p style={{color: '#011d3b', opacity: 0.8, lineHeight: 1.5}}>{tAbout('features.personalizedService.description')}</p>
          </div>

          <div className="text-center p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-navy/10 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕐</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{color: '#011d3b'}}>{tAbout('features.support.title')}</h3>
            <p style={{color: '#011d3b', opacity: 0.8, lineHeight: 1.5}}>{tAbout('features.support.description')}</p>
          </div>

          <div className="text-center p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-navy/10 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{color: '#011d3b'}}>{tAbout('features.bestValue.title')}</h3>
            <p style={{color: '#011d3b', opacity: 0.8, lineHeight: 1.5}}>{tAbout('features.bestValue.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
