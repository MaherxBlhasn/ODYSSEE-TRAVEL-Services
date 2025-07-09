'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });

            // Close mobile menu if open (like in original JS)
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
            }
          }
        }
      }
    };

    // Update active nav link on scroll
    const updateActiveNavLink = () => {
      const scrollPosition = window.scrollY + 150;
      const sections = document.querySelectorAll('section[id]') as NodeListOf<HTMLElement>;
      const navLinks = document.querySelectorAll('nav a[href^="#"]') as NodeListOf<HTMLAnchorElement>;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    // Handle URL hash on page load
    const handleHashOnLoad = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const targetElement = document.getElementById(hash.substring(1));
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Add event listeners
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    window.addEventListener('hashchange', handleHashOnLoad);
    
    // Initial calls
    handleHashOnLoad();
    updateActiveNavLink();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', updateActiveNavLink);
      window.removeEventListener('hashchange', handleHashOnLoad);
    };
  }, []);

  return null;
}
