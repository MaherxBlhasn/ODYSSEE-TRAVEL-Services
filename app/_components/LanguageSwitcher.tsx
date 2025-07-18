'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import {useState} from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Create the new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-orange/10 hover:bg-orange/20 transition-colors text-beige"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="text-sm font-medium">
          {locale === 'en' ? t('english') : t('french')}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-navy/95 backdrop-blur-md border border-orange/20 rounded-md shadow-lg z-50">
          <button
            onClick={() => switchLocale('en')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-orange/10 transition-colors ${
              locale === 'en' ? 'text-orange' : 'text-beige'
            }`}
          >
            {t('english')}
          </button>
          <button
            onClick={() => switchLocale('fr')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-orange/10 transition-colors ${
              locale === 'fr' ? 'text-orange' : 'text-beige'
            }`}
          >
            {t('french')}
          </button>
        </div>
      )}
    </div>
  );
}
