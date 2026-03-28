import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export interface NavProps {
  // Can accept additional props if needed for routing
}

/**
 * Main application navigation component.
 * Features a sticky header with blur, desktop links, and a mobile full-screen drawer menu.
 */
export const Nav: React.FC<NavProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold text-xl tracking-tight text-primary">
              Milestone Pediatrics
              <span className="text-primary-light">.ai</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button variant="primary" size="md">Join Waitlist</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu overlay — always rendered, animated via CSS */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-white dark:bg-neutral-900 h-screen w-screen flex flex-col transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
          <div className="flex justify-between items-center px-4 sm:px-6 h-20 border-b border-neutral-100 dark:border-neutral-800">
            <span className="font-bold text-xl tracking-tight text-primary">Milestone Pediatrics</span>
            <button
              type="button"
              onClick={toggleMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-label="Close main menu"
            >
              <span className="sr-only">Close main menu</span>
              {/* X Icon */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="px-4 pt-8 pb-6 space-y-2 overflow-y-auto flex-grow flex flex-col justify-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={toggleMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className="block px-3 py-4 text-3xl font-medium text-neutral-800 hover:text-primary dark:text-neutral-100 dark:hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 px-3">
              <Link to="/contact" onClick={toggleMenu} tabIndex={isMobileMenuOpen ? 0 : -1}>
                <Button variant="primary" size="lg" className="w-full" tabIndex={isMobileMenuOpen ? 0 : -1}>
                  Join the Waitlist
                </Button>
              </Link>
            </div>
          </div>
      </div>

    </header>
  );
};
