import { getTranslations } from 'next-intl/server';
import AnimatedCounter from './AnimatedCounter';

export default async function AboutSection() {
  const tAbout = await getTranslations('about');
  // Dynamically calculate years of experience
  const foundingYear = 1999;
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - foundingYear;

  return (
    <section id="about" className="py-20 px-6 relative" style={{
      backgroundColor: '#FCE6CE',
      backgroundImage: 'url(/bg-2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(252, 230, 206, 0.85)' }}></div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{
            color: '#001F3F',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>{tAbout('title')}</h2>
          <p className="text-lg mb-6" style={{
            color: '#001F3F',
            opacity: 0.85,
            lineHeight: 1.6
          }}>{tAbout('description1', { years: yearsExperience })}</p>
          <p className="text-lg" style={{
            color: '#001F3F',
            opacity: 0.85,
            lineHeight: 1.6
          }}>{tAbout('description2')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" id="stats-section">
          <div className="text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="stats-counter mb-4">
              <AnimatedCounter end={150} suffix="+" duration={2500} />
            </div>
            <div className="text-2xl font-semibold" style={{ color: '#001F3F' }}>{tAbout('stats.destinations')}</div>
          </div>
          <div className="text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="stats-counter mb-4">
              <AnimatedCounter end={10000} suffix="+" duration={3000} />
            </div>
            <div className="text-2xl font-semibold" style={{ color: '#001F3F' }}>{tAbout('stats.travelers')}</div>
          </div>
          <div className="text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="stats-counter mb-4">
              <AnimatedCounter end={yearsExperience} suffix="+" duration={2000} />
            </div>
            <div className="text-2xl font-semibold" style={{ color: '#001F3F' }}>{tAbout('stats.experience')}</div>
          </div>
        </div>

        {/* Features with clean design and larger icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="group cursor-pointer text-center">
            <div className="bg-white rounded-3xl p-8 shadow-lg transition-all duration-500 ease-out transform group-hover:-translate-y-3 group-hover:scale-105 group-hover:shadow-2xl">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 animate-pulse-shadow" style={{
                background: 'linear-gradient(135deg, #F28C28 0%, #F4A549 50%, #FF6B35 100%)',
                boxShadow: '0 12px 40px rgba(242, 140, 40, 0.4)'
              }}>
                <svg className="w-16 h-16 text-white transition-all duration-500 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 transition-all duration-300 group-hover:text-orange-500" style={{ color: '#001F3F' }}>
                {tAbout('features.personalizedService.title')}
              </h3>
              <p className="text-lg leading-relaxed transition-all duration-300 group-hover:opacity-80 max-w-xs mx-auto" style={{ color: '#001F3F', opacity: 0.75 }}>
                {tAbout('features.personalizedService.description')}
              </p>
            </div>
          </div>

          <div className="group cursor-pointer text-center">
            <div className="bg-white rounded-3xl p-8 shadow-lg transition-all duration-500 ease-out transform group-hover:-translate-y-3 group-hover:scale-105 group-hover:shadow-2xl">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 animate-pulse-shadow-delayed" style={{
                background: 'linear-gradient(135deg, #F28C28 0%, #F4A549 50%, #FF6B35 100%)',
                boxShadow: '0 12px 40px rgba(242, 140, 40, 0.4)'
              }}>
                <svg className="w-16 h-16 text-white transition-all duration-500 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M 12 2 C 7.582 2 4 5.582 4 10 L 4 11 L 4 11.902344 C 3.426291 12.449411 3 13.153146 3 14 C 3 15.241968 3.8575508 16.162904 4.9433594 16.613281 C 6.2443933 19.723094 8.8502365 22 12 22 L 15 22 L 15 20 L 12 20 C 9.7415517 20 7.6909574 18.299502 6.6601562 15.613281 L 6.4472656 15.0625 L 5.8613281 14.980469 C 5.3688308 14.912712 5 14.515121 5 14 C 5 13.615008 5.1944088 13.312973 5.4980469 13.138672 L 6 12.851562 L 6 12 L 6 11 C 6 10.448 6.448 10 7 10 L 17 10 C 17.552 10 18 10.448 18 11 L 18 12 L 18 16 L 13.912109 16 C 13.700475434997228 15.40140789479718 13.134901945451302 15.000891015756025 12.5 15 C 11.67157287525381 15 11 15.67157287525381 11 16.5 C 11.00105197596295 17.285972337531422 11.60862299320339 17.93785450662403 12.392578 17.994141 C 12.428254280206279 17.998019894003967 12.46411348165846 17.999975722989728 12.5 18 L 19 18 L 20 18 C 21.1 18 22 17.1 22 16 L 22 14 C 22 12.9 21.1 12 20 12 L 20 10 C 20 5.582 16.418 2 12 2 z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 transition-all duration-300 group-hover:text-orange-500" style={{ color: '#001F3F' }}>
                {tAbout('features.support.title')}
              </h3>
              <p className="text-lg leading-relaxed transition-all duration-300 group-hover:opacity-80 max-w-xs mx-auto" style={{ color: '#001F3F', opacity: 0.75 }}>
                {tAbout('features.support.description')}
              </p>
            </div>
          </div>

          <div className="group cursor-pointer text-center">
            <div className="bg-white rounded-3xl p-8 shadow-lg transition-all duration-500 ease-out transform group-hover:-translate-y-3 group-hover:scale-105 group-hover:shadow-2xl">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 animate-pulse-shadow-more-delayed" style={{
                background: 'linear-gradient(135deg, #F28C28 0%, #F4A549 50%, #FF6B35 100%)',
                boxShadow: '0 12px 40px rgba(242, 140, 40, 0.4)'
              }}>
                <svg className="w-16 h-16 text-white transition-all duration-500 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 transition-all duration-300 group-hover:text-orange-500" style={{ color: '#001F3F' }}>
                {tAbout('features.bestValue.title')}
              </h3>
              <p className="text-lg leading-relaxed transition-all duration-300 group-hover:opacity-80 max-w-xs mx-auto" style={{ color: '#001F3F', opacity: 0.75 }}>
                {tAbout('features.bestValue.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}