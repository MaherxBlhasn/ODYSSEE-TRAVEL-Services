'use client';

import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu}
        className="md:hidden text-beige hover:text-orange transition-colors"
        aria-label="Toggle mobile menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-md border-t border-orange/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#home" 
                onClick={closeMenu}
                className="text-beige hover:text-orange transition-colors"
              >
                Home
              </a>
              <a 
                href="#offers" 
                onClick={closeMenu}
                className="text-beige hover:text-orange transition-colors"
              >
                Offers
              </a>
              <a 
                href="#map" 
                onClick={closeMenu}
                className="text-beige hover:text-orange transition-colors"
              >
                Map
              </a>
              <a 
                href="#about" 
                onClick={closeMenu}
                className="text-beige hover:text-orange transition-colors"
              >
                About
              </a>
              <a 
                href="#contact" 
                onClick={closeMenu}
                className="text-beige hover:text-orange transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
