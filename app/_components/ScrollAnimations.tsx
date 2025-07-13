'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    // Scroll animations for fade-in elements
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in') as NodeListOf<HTMLElement>;
      const windowHeight = window.innerHeight;
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Same as original JS
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    // Parallax effect for hero section (disabled to fix spacing issues)
    const handleParallax = () => {
      // Parallax effect disabled - was causing spacing issues
      // const scrolled = window.pageYOffset;
      // const heroSection = document.getElementById('home') as HTMLElement;
      
      // if (heroSection) {
      //   const rate = scrolled * -0.5;
      //   heroSection.style.transform = `translateY(${rate}px)`;
      // }
    };

    // Combined scroll handler for better performance
    const handleScroll = () => {
      animateOnScroll();
      handleParallax();
    };

    // Initial animation trigger for hero section (matching original JS)
    const triggerHeroAnimations = () => {
      setTimeout(() => {
        const heroElements = document.querySelectorAll('#home .fade-in') as NodeListOf<HTMLElement>;
        heroElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 200); // Same timing as original JS
        });
      }, 300); // Same delay as original JS
    };

    // Add loading animation class to body (matching original JS)
    const handleLoad = () => {
      document.body.classList.add('loaded');
      triggerHeroAnimations();
    };

    // Event listeners with passive scrolling for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('load', handleLoad);

    // Initial calls
    animateOnScroll();
    
    // Trigger hero animations if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
}
