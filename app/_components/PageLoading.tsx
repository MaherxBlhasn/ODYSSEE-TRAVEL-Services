'use client';

import LoadingSpinner from './LoadingSpinner';

interface PageLoadingProps {
  isLoading: boolean;
  text?: string;
}

export default function PageLoading({ isLoading, text = 'Loading...' }: PageLoadingProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[99999] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200 max-w-sm w-full mx-4">
        <LoadingSpinner size="lg" text={text} className="text-center" />
      </div>
    </div>
  );
}
