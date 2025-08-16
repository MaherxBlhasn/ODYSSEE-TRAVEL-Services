'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function useHeroAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const triggerHeroAnimations = () => {
      // Wait a bit for the DOM to be ready
      setTimeout(() => {
        const heroElements = document.querySelectorAll('#home .fade-in') as NodeListOf<HTMLElement>;
        
        // Reset all animations first
        heroElements.forEach(element => {
          element.classList.remove('visible');
        });

        // Then trigger them with staggered timing
        heroElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, (index + 1) * 200);
        });
      }, 200);
    };

    // Trigger animations on pathname change (language switch)
    triggerHeroAnimations();
  }, [pathname]);

  // Also trigger on component mount
  useEffect(() => {
    const triggerOnMount = () => {
      setTimeout(() => {
        const heroElements = document.querySelectorAll('#home .fade-in') as NodeListOf<HTMLElement>;
        heroElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, (index + 1) * 200);
        });
      }, 300);
    };

    triggerOnMount();
  }, []);
}
