'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LoadingSpinner from './LoadingSpinner';

interface BackButtonProps {
  href: string;
  text?: string;
  className?: string;
}

export default function BackButton({
  href,
  text,
  className = ''
}: BackButtonProps) {
  const router = useRouter();
  const tOffers = useTranslations('offers');
  const tCommon = useTranslations('common');

  // Use provided text or default translation
  const buttonText = text || tOffers('details.backToOffers');
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <Link
        href={href}
        onClick={handleClick}
        className={`group inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-xl backdrop-blur-sm ${className}`}
      >
        <>
          <span className="mr-3 text-lg transition-transform duration-300 group-hover:-translate-x-2">←</span>
          <span className="text-base">{buttonText}</span>
        </>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>


    </>
  );
}
