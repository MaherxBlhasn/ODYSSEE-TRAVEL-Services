import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';
import HeroAnimationWrapper from './HeroAnimationWrapper';

const HeroSection = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    const tHome = await getTranslations('home');

    return (
        <HeroAnimationWrapper>
            <div 
                id="home" 
                className="flex items-center relative overflow-hidden"
                style={{
                    background: `linear-gradient(rgba(1, 29, 59, 0.85), rgba(1, 29, 59, 0.65)), url('/bg.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100%',
                    margin: 0,
                padding: 0
            }}
        >
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-beige mb-6 fade-in" suppressHydrationWarning>
                        {tHome('heroTitle')}
                        <span className="text-orange block">{tHome('heroTitleSpan')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-beige/80 mb-8 max-w-2xl fade-in" suppressHydrationWarning>
                        {tHome('heroDescription')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 fade-in" suppressHydrationWarning>
                        <Link href={`/${locale}#offers`} className="btn-primary px-8 py-4 rounded-full text-white font-semibold text-lg text-center">
                            {tHome('exploreDestinations')}
                        </Link>
                        <Link href={`/${locale}#contact`} className="border-2 border-orange text-orange px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange hover:text-white transition-all text-center">
                            {tHome('planYourTrip')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            {/* <div className="absolute top-20 right-20 w-20 h-20 bg-orange/20 rounded-full animate-float"></div>
            <div className="absolute bottom-40 right-40 w-12 h-12 bg-beige/20 rounded-full animate-float-delay"></div>
            <div className="absolute top-1/2 right-10 w-6 h-6 bg-orange/40 rounded-full animate-float-delay-2"></div> */}
            </div>
        </HeroAnimationWrapper>
    )
}

export default HeroSection