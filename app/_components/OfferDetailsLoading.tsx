'use client';

import { useTranslations } from 'next-intl';

export default function OfferDetailsLoading() {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen relative" style={{
      backgroundColor: '#FCE6CE',
      backgroundImage: 'url(/bg-2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Background overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(252, 230, 206, 0.85)' }}></div>
      
      <div className="relative z-10">
        {/* Loading indicator positioned in the center */}
        <div className="pt-32 px-6 mb-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-center space-x-3 text-orange-600">
              <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-medium">{t('loadingDetails')}</span>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Left Column - Image and Description Skeleton */}
              <div className="lg:col-span-2 space-y-10">
                {/* Image Gallery Skeleton */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <div className="w-full h-80 bg-gray-200 rounded-2xl animate-pulse mb-4"></div>
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse"></div>
                      <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse"></div>
                      <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Description Skeleton */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100">
                  <div className="p-10">
                    <div className="mb-8">
                      <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-4 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-3xl">
                        <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-3 w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-3xl">
                        <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-3 w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Details Skeleton */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 sticky top-8">
                  <div className="p-10">
                    {/* Title Skeleton */}
                    <div className="mb-8">
                      <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-4 w-full"></div>
                      <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
                    </div>

                    {/* Quick Details Skeleton */}
                    <div className="space-y-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse mb-2 w-1/3"></div>
                        <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse mb-2 w-1/3"></div>
                        <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
                      </div>
                    </div>

                    {/* Availability Skeleton */}
                    <div className="bg-gray-50 p-4 rounded-2xl mb-8">
                      <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto"></div>
                    </div>

                    {/* Services Skeleton */}
                    <div className="space-y-3 mb-6">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-2/3 mx-auto"></div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto"></div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-2/3 mx-auto"></div>
                      </div>
                    </div>

                    {/* Book Button Skeleton */}
                    <div className="h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-32"></div>
        </div>
      </div>
    </div>
  );
}
