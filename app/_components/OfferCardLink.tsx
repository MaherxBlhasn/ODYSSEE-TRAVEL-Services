'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

interface OfferCardLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function OfferCardLink({ href, children, className = '', style }: OfferCardLinkProps) {
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
      <Link href={href} onClick={handleClick} className={className} style={style}>
        {children}
      </Link>
      
      {/* Loading overlay for this specific navigation */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[99999] flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200 max-w-sm w-full mx-4">
            <LoadingSpinner size="lg" text="Loading offer details..." className="text-center" />
          </div>
        </div>
      )}
    </>
  );
}
