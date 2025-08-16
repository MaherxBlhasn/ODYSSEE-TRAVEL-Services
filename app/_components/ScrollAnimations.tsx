'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    // Scroll animations for fade-in elements (excluding hero section)
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in:not(#home .fade-in)') as NodeListOf<HTMLElement>;
      const windowHeight = window.innerHeight;
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    // Event listeners
    window.addEventListener('scroll', animateOnScroll, { passive: true });

    // Initial call
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return null;
}
