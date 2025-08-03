'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

interface BackButtonProps {
  href: string;
  text?: string;
  className?: string;
}

export default function BackButton({ 
  href, 
  text = 'Back to Offers', 
  className = '' 
}: BackButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  return (
    <>
      <Link 
        href={href}
        onClick={handleClick}
        className={`group inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-xl backdrop-blur-sm ${className}`}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" text="" className="mr-3" />
            <span className="text-base">Loading...</span>
          </>
        ) : (
          <>
            <span className="mr-3 text-lg transition-transform duration-300 group-hover:-translate-x-2">←</span>
            <span className="text-base">{text}</span>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      {/* Full page loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[99999] flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200 max-w-sm w-full mx-4">
            <LoadingSpinner size="lg" text="Returning to offers..." className="text-center" />
          </div>
        </div>
      )}
    </>
  );
}
