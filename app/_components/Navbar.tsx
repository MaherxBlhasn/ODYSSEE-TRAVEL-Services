'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const t = useTranslations('navbar');
  const tCompany = useTranslations('company');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkStyle = {
    color: '#FCE6CE',
    transition: 'all 0.3s ease',
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-lg transition-all duration-300 ${isScrolled ? 'py-0' : 'py-1'
          }`}
        style={{
          background: isScrolled
            ? 'rgba(0, 31, 63, 0.98)'
            : 'rgba(0, 31, 63, 0.95)',
          borderColor: 'rgba(242, 140, 40, 0.3)'
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="overflow-hidden shadow-lg rounded-md">
                <Image
                  src="/Logo_Navbar.png"
                  alt="Odyssee Travel Services Logo"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
                  className="w-auto h-auto object-contain max-h-7 sm:max-h-8 md:max-h-10 lg:max-h-12 xl:max-h-14 transition-all duration-300"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            {/* Desktop Navigation (lg and up only) */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                href={`/${locale}#home`}
                className="nav-link text-sm xl:text-base font-medium transition-all duration-300 hover:text-orange-400 hover:scale-105 relative group"
                style={navLinkStyle}
              >
                {t('home')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={`/${locale}#offers`}
                className="nav-link text-sm xl:text-base font-medium transition-all duration-300 hover:text-orange-400 hover:scale-105 relative group"
                style={navLinkStyle}
              >
                {t('offers')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={`/${locale}#map`}
                className="nav-link text-sm xl:text-base font-medium transition-all duration-300 hover:text-orange-400 hover:scale-105 relative group"
                style={navLinkStyle}
              >
                {t('map')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={`/${locale}#about`}
                className="nav-link text-sm xl:text-base font-medium transition-all duration-300 hover:text-orange-400 hover:scale-105 relative group"
                style={navLinkStyle}
              >
                {t('about')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={`/${locale}#contact`}
                className="nav-link text-sm xl:text-base font-medium transition-all duration-300 hover:text-orange-400 hover:scale-105 relative group"
                style={navLinkStyle}
              >
                {t('contact')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Phone Number - Desktop */}
              <div className="flex items-center space-x-2 xl:space-x-3 ml-6 xl:ml-8 pl-6 xl:pl-8 border-l border-orange-500/30">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 xl:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <svg className="w-4 h-4 xl:w-6 xl:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <a href="tel:+21671750475"
                  className="text-orange-400 font-black text-lg xl:text-2xl tracking-wider hover:text-orange-300 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                  71 750 475
                </a>
              </div>

              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Tablet Navigation (md to lg) - Only phone and language switcher */}
            <div className="hidden md:flex lg:hidden items-center space-x-4">
              {/* Phone Number - Tablet */}
              <a href="tel:+21671750475"
                className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Controls */}
            <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
              {/* Phone Number - Mobile */}
              <a href="tel:+21671750475"
                className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>
              <LanguageSwitcher />
              <button
                onClick={toggleMobileMenu}
                className="transition-all duration-300 hover:text-orange-400 hover:scale-105 p-1"
                style={navLinkStyle}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} style={{ top: '50%', transform: 'translateY(-50%)' }}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : '-translate-y-1.5'}`} style={{ bottom: '0' }}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
            ? 'max-h-96 opacity-100 pb-4'
            : 'max-h-0 opacity-0 pb-0'
            }`}>
            <div className="flex flex-col space-y-3 pt-2 border-t border-orange-500/20">
              <Link
                href={`/${locale}#home`}
                className="transition-all duration-300 hover:text-orange-400 py-2 px-1 hover:bg-orange-500/10 rounded-md text-base font-medium"
                style={navLinkStyle}
                onClick={closeMobileMenu}
              >
                {t('home')}
              </Link>
              <Link
                href={`/${locale}#offers`}
                className="transition-all duration-300 hover:text-orange-400 py-2 px-1 hover:bg-orange-500/10 rounded-md text-base font-medium"
                style={navLinkStyle}
                onClick={closeMobileMenu}
              >
                {t('offers')}
              </Link>
              <Link
                href={`/${locale}#map`}
                className="transition-all duration-300 hover:text-orange-400 py-2 px-1 hover:bg-orange-500/10 rounded-md text-base font-medium"
                style={navLinkStyle}
                onClick={closeMobileMenu}
              >
                {t('map')}
              </Link>
              <Link
                href={`/${locale}#about`}
                className="transition-all duration-300 hover:text-orange-400 py-2 px-1 hover:bg-orange-500/10 rounded-md text-base font-medium"
                style={navLinkStyle}
                onClick={closeMobileMenu}
              >
                {t('about')}
              </Link>
              <Link
                href={`/${locale}#contact`}
                className="transition-all duration-300 hover:text-orange-400 py-2 px-1 hover:bg-orange-500/10 rounded-md text-base font-medium"
                style={navLinkStyle}
                onClick={closeMobileMenu}
              >
                {t('contact')}
              </Link>

              {/* Mobile Phone Display */}
              <div className="flex items-center justify-center pt-3 mt-3 border-t border-orange-500/20">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-full shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <span className="text-orange-400 font-bold text-lg tracking-wider">
                    71 750 475
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
          style={{ top: '64px' }}
        ></div>
      )}
    </>
  );
};

export default Navbar;