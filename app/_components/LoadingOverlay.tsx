'use client';

import { useTranslations } from 'next-intl';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function LoadingOverlay({ isVisible, message }: LoadingOverlayProps) {
  const t = useTranslations('common');

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-orange-200 text-center max-w-sm mx-4">
        {/* Animated Loading Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-100 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {message || t('loading')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('pleaseWait')}
        </p>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
