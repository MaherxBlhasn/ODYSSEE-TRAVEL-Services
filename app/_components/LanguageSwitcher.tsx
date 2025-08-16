'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export type Language = 'en' | 'fr';

// High-quality SVG Flag Components
const USFlag = ({ className = "" }: { className?: string }) => (
  <svg className={`w-6 h-4 rounded-sm ${className}`} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#B22234" />
    <rect width="24" height="1.23" y="1.23" fill="white" />
    <rect width="24" height="1.23" y="3.69" fill="white" />
    <rect width="24" height="1.23" y="6.15" fill="white" />
    <rect width="24" height="1.23" y="8.62" fill="white" />
    <rect width="24" height="1.23" y="11.08" fill="white" />
    <rect width="24" height="1.23" y="13.54" fill="white" />
    <rect width="9.6" height="8.61" fill="#3C3B6E" />
  </svg>
);

const FranceFlag = ({ className = "" }: { className?: string }) => (
  <svg className={`w-6 h-4 rounded-sm ${className}`} viewBox="0 0 24 16" fill="none">
    <rect width="8" height="16" fill="#002395" />
    <rect x="8" width="8" height="16" fill="white" />
    <rect x="16" width="8" height="16" fill="#ED2939" />
  </svg>
);

const languageOptions = [
  {
    code: 'en' as Language,
    name: 'English',
    nativeName: 'English',
    flag: USFlag,
    shortCode: 'EN'
  },
  {
    code: 'fr' as Language,
    name: 'French',
    nativeName: 'Français',
    flag: FranceFlag,
    shortCode: 'FR'
  }
];

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale() as Language;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentOption = languageOptions.find(option => option.code === locale);
  const CurrentFlag = currentOption?.flag;

  const switchLocale = (newLocale: Language) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(false);

    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Create the new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="relative">
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="
            h-10 px-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 
            focus:border-orange focus:ring-2 focus:ring-orange/20 rounded-lg transition-all duration-200 
            flex items-center gap-2.5 font-medium text-white hover:bg-white/20 shadow-lg 
            hover:shadow-xl focus:outline-none group justify-between min-w-[90px]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label={`Current language: ${currentOption?.name}`}
          type="button"
        >
          <div className="flex items-center gap-2">
            {CurrentFlag && <CurrentFlag className="shadow-sm border border-white/20" />}
            <span className="font-semibold text-white tracking-wide text-sm">{currentOption?.shortCode}</span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-white/70 group-hover:text-white`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Dropdown Menu */}
        {isOpen && !isLoading && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden min-w-[200px] animate-in slide-in-from-top-2 duration-200">
            <div className="py-2">
              {languageOptions.map((option) => {
                const OptionFlag = option.flag;
                return (
                  <button
                    key={option.code}
                    onClick={() => switchLocale(option.code)}
                    disabled={isLoading}
                    className={`
                      w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-all duration-150 text-left group
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${locale === option.code
                        ? 'bg-orange/10 text-orange border-r-4 border-orange'
                        : 'text-gray-700 hover:text-gray-900'
                      }
                    `}
                    type="button"
                  >
                    <OptionFlag className="shadow-sm border border-gray-200 group-hover:shadow-md transition-shadow" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm tracking-wide">{option.shortCode}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm font-medium">{option.nativeName}</span>
                      </div>
                    </div>
                    {locale === option.code && (
                      <svg className="w-4 h-4 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-3 bg-gradient-to-r from-gray-50 to-orange/5">
              <p className="text-xs text-gray-600 flex items-center gap-2 font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Select your preferred language
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
