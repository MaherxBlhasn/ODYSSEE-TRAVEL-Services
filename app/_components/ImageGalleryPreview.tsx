'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ImageGalleryPreviewProps {
  mainImage: string;
  images: string[];
  title: string;
}

export default function ImageGalleryPreview({ mainImage, images, title }: ImageGalleryPreviewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('offers.details.gallery');
  
  // Combine main image with gallery images
  const allImages = [mainImage, ...images];
  
  // Helper function to handle base64 images
  const getImageSrc = (image: string) => {
    if (!image) return '';
    if (image.startsWith('data:image/')) {
      return image;
    } else if (image.startsWith('http')) {
      return image;
    } else {
      return `data:image/jpeg;base64,${image}`;
    }
  };

  // Handle keyboard navigation for both gallery and modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys if not typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (isModalOpen) {
        // Modal navigation
        if (e.key === 'Escape') {
          setIsModalOpen(false);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSelectedImage((prev) => (prev + 1) % allImages.length);
        }
      } else {
        // Gallery selection navigation (when modal is closed)
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSelectedImage((prev) => (prev + 1) % allImages.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, allImages.length]);

  // Hide navbar and prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // Add class to hide navbar
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="w-full space-y-6">
        {/* Main Preview Image */}
        <div className="relative group">
          <div 
            className="relative h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={getImageSrc(allImages[selectedImage])}
              alt={`${title} - Image ${selectedImage + 1}`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
            
            {/* Click to expand indicator - ONLY zoom icon */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            
            {/* Image counter */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-3 py-2 rounded-xl text-sm font-semibold border border-white/20">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                {selectedImage + 1} of {allImages.length}
              </span>
            </div>
            
            {/* Navigation arrows - for changing preview image */}
            {allImages.length > 1 && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-10"
                  aria-label={t('previousImage')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev + 1) % allImages.length);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-10"
                  aria-label={t('nextImage')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Main Image indicator */}
            {selectedImage === 0 && (
              <div className="absolute bottom-4 left-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg border border-blue-500/30 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    MAIN PHOTO
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Gallery Section */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-gray-700">
              <div className="bg-orange-100 p-2 rounded-xl mr-3">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">{t('photoGallery')}</h3>
                <p className="text-sm text-gray-500">{allImages.length} high-quality images</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center text-sm text-gray-500 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="flex items-center gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">←</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">→</span>
                Navigate
              </span>
            </div>
          </div>
          
          {/* Enhanced Thumbnail Grid with Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative group transition-all duration-300 ${
                  selectedImage === index 
                    ? 'ring-3 ring-blue-500 ring-offset-3 ring-offset-gray-50 scale-105' 
                    : 'hover:ring-2 hover:ring-gray-400 hover:ring-offset-2 hover:ring-offset-gray-50 hover:scale-105'
                }`}
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg">
                  <img
                    src={getImageSrc(image)}
                    alt={`${title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                  />
                  {/* Selection indicator */}
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Hover overlay with zoom icon only */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <svg className="w-3 h-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* MAIN indicator */}
                {index === 0 && (
                  <div className="absolute -top-2 -left-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-2 py-1 rounded-lg font-bold shadow-lg border border-blue-500/30 z-10">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      MAIN
                    </span>
                  </div>
                )}
                
                {/* Image number indicator */}
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-medium backdrop-blur-sm">
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Full Screen Modal with Proper X Button */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* SLEEK Small Close button - Elegant and compact */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="fixed top-4 right-4 bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 p-2 rounded-full transition-all duration-300 hover:scale-110 z-[99999] border border-gray-300 shadow-lg"
              style={{
                position: 'fixed',
                top: '16px',
                right: '16px',
                zIndex: 99999,
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '50%',
                padding: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              aria-label={t('closeModal')}
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* ESC key indicator - Aligned with close button */}
            <div className="fixed top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-xl backdrop-blur-md text-sm border border-white/20 z-[99999]">
              <span className="flex items-center gap-2">
                <span className="bg-white/20 px-2 py-1 rounded font-mono text-xs">ESC</span>
                <span>{t('toClose')}</span>
              </span>
            </div>
            
            {/* Main modal image container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={getImageSrc(allImages[selectedImage])}
                alt={`${title} - Image ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
              
              {/* Enhanced Navigation arrows for modal */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20 shadow-xl"
                    aria-label={t('previousImage')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % allImages.length)}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20 shadow-xl"
                    aria-label={t('nextImage')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
              
            {/* Enhanced Image info overlay */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-xl backdrop-blur-md border border-white/20 shadow-xl z-[10001]">
              <div className="text-center">
                <div className="text-base font-bold mb-1">{title}</div>
                <div className="text-sm opacity-90 mb-2">
                  Image {selectedImage + 1} of {allImages.length}
                  {selectedImage === 0 && (
                    <span className="ml-2 bg-blue-600 px-2 py-1 rounded text-xs font-semibold">{t('main')}</span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-4 text-xs opacity-75">
                  <span className="flex items-center gap-1">
                    <span className="bg-white/20 px-2 py-1 rounded font-mono">←</span>
                    <span className="bg-white/20 px-2 py-1 rounded font-mono">→</span>
                    <span>{t('navigate')}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="bg-white/20 px-2 py-1 rounded font-mono">ESC</span>
                    <span>{t('close')}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
