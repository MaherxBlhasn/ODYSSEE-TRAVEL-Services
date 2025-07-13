'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  const t = useTranslations('footer');
  const tNavbar = useTranslations('navbar');
  const tCompany = useTranslations('company');
  const locale = useLocale();

  return (
    <footer className="py-6 sm:py-8 border-t border-orange/30" style={{background: 'linear-gradient(135deg, #011d3b 0%, #1a365d 50%, #2a4365 100%)'}}>
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="w-full max-w-6xl">
                <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <div className="col-span-2 lg:col-span-1 text-center lg:text-left mb-8 lg:mb-0">
                    <Link href={`/${locale}`} className="flex items-center justify-center lg:justify-start space-x-2 mb-4 sm:mb-6">
                        <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full overflow-hidden shadow-lg">
                            <Image
                                src="/LOGO.png"
                                alt="Odyssee Travel Services Logo"
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                                priority
                                unoptimized
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-beige leading-tight">{tCompany('name')}</h3>
                            <p className="text-xs sm:text-sm text-orange mt-1">{tCompany('tagline')}</p>
                        </div>
                    </Link>
                    <p className="text-beige/90 leading-relaxed text-sm max-w-xs sm:max-w-sm mx-auto lg:mx-0">
                        {tCompany('description')}
                    </p>
                </div>
                
                <div className="col-span-1 text-center lg:text-left mb-8 lg:mb-0">
                    <h4 className="text-base sm:text-lg font-semibold text-beige mb-4 sm:mb-6 border-b border-orange/20 pb-2 sm:pb-3 inline-block">{t('quickLinks')}</h4>
                    <ul className="space-y-2 sm:space-y-3">
                        <li><Link href={`/${locale}#home`} className="text-beige/90 hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm"><span>→</span><span>{tNavbar('home')}</span></Link></li>
                        <li><Link href={`/${locale}#offers`} className="text-beige/90 hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm"><span>→</span><span>{tNavbar('offers')}</span></Link></li>
                        <li><Link href={`/${locale}#about`} className="text-beige/90 hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm"><span>→</span><span>{tNavbar('about')}</span></Link></li>
                        <li><Link href={`/${locale}#contact`} className="text-beige/90 hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm"><span>→</span><span>{tNavbar('contact')}</span></Link></li>
                    </ul>
                </div>
                
                <div className="col-span-1 text-center lg:text-left mb-8 lg:mb-0">
                    <h4 className="text-base sm:text-lg font-semibold text-beige mb-4 sm:mb-6 border-b border-orange/20 pb-2 sm:pb-3 inline-block">{t('services')}</h4>
                    <ul className="space-y-2 sm:space-y-3">
                        <li><Link href={`/${locale}#offers`} className="text-beige/90 hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm"><span>✈️</span><span>{t('flightBooking')}</span></Link></li>
                        <li><Link href={`/${locale}#offers`} className="text-beige/90 hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm"><span>🏨</span><span>{t('hotelReservations')}</span></Link></li>
                        <li><Link href={`/${locale}#offers`} className="text-beige/90 hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm"><span>🗺️</span><span>{t('tourPackages')}</span></Link></li>
                        <li><Link href={`/${locale}#contact`} className="text-beige/90 hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm"><span>🛡️</span><span>{t('travelInsurance')}</span></Link></li>
                    </ul>
                </div>
                
                <div className="col-span-2 lg:col-span-1 text-center lg:text-left">
                    <h4 className="text-base sm:text-lg font-semibold text-beige mb-4 sm:mb-6 border-b border-orange/20 pb-2 sm:pb-3 inline-block">{t('newsletter')}</h4>
                    <p className="text-beige/90 mb-4 sm:mb-6 leading-relaxed text-sm max-w-xs sm:max-w-sm mx-auto lg:mx-0">{t('newsletterText')}</p>
                    <div className="w-full max-w-sm mx-auto lg:mx-0">
                        <NewsletterForm />
                    </div>
                </div>
            </div>
            
            <div className="border-t border-orange/30 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center">
                <div className="bg-gradient-to-r from-navy/20 via-navy/30 to-navy/20 rounded-xl py-4 sm:py-6 px-4 sm:px-6 lg:px-8 border border-orange/20 shadow-lg backdrop-blur-sm max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
                    <p className="text-beige/95 text-xs sm:text-sm font-medium tracking-wide">{t('copyright')}</p>
                </div>
            </div>
        </div>
    </div>
    </footer>
  );
};

export default Footer;