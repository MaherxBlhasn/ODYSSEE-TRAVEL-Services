'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const tNavbar = useTranslations('navbar');
  const tCompany = useTranslations('company');
  const locale = useLocale();

  return (
    <footer className="bg-navy/50 py-12 border-t border-orange/20">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <Link href={`/${locale}`} className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-beige rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-navy">O</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-beige">{tCompany('name')}</h3>
                            <p className="text-sm text-orange">{tCompany('tagline')}</p>
                        </div>
                    </Link>
                    <p className="text-beige/80 mb-4">
                        {tCompany('description')}
                    </p>
                </div>
                
                <div>
                    <h4 className="text-lg font-semibold text-beige mb-4">{t('quickLinks')}</h4>
                    <ul className="space-y-2">
                        <li><Link href={`/${locale}#home`} className="text-beige/80 hover:text-orange transition-colors">{tNavbar('home')}</Link></li>
                        <li><Link href={`/${locale}#offers`} className="text-beige/80 hover:text-orange transition-colors">{tNavbar('offers')}</Link></li>
                        <li><Link href={`/${locale}#about`} className="text-beige/80 hover:text-orange transition-colors">{tNavbar('about')}</Link></li>
                        <li><Link href={`/${locale}#contact`} className="text-beige/80 hover:text-orange transition-colors">{tNavbar('contact')}</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-lg font-semibold text-beige mb-4">{t('services')}</h4>
                    <ul className="space-y-2">
                        <li><Link href={`/${locale}#offers`} className="text-beige/80 hover:text-orange transition-colors">{t('flightBooking')}</Link></li>
                        <li><Link href={`/${locale}#offers`} className="text-beige/80 hover:text-orange transition-colors">{t('hotelReservations')}</Link></li>
                        <li><Link href={`/${locale}#offers`} className="text-beige/80 hover:text-orange transition-colors">{t('tourPackages')}</Link></li>
                        <li><Link href={`/${locale}#contact`} className="text-beige/80 hover:text-orange transition-colors">{t('travelInsurance')}</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-lg font-semibold text-beige mb-4">{t('newsletter')}</h4>
                    <p className="text-beige/80 mb-4">{t('newsletterText')}</p>
                    <div className="flex">
                        <input type="email" className="flex-1 px-4 py-2 rounded-l-full bg-beige/10 border border-orange/20 text-beige focus:border-orange focus:outline-none" placeholder={t('emailPlaceholder')} />
                        <button className="bg-orange px-6 py-2 rounded-r-full text-white font-semibold hover:bg-orange/80 transition-colors">
                            {t('subscribe')}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-orange/20 mt-8 pt-8 text-center">
                <p className="text-beige/80">{t('copyright')}</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;