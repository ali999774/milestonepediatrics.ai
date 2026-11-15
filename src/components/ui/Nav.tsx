import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Navigation header for the pre-opening informational site.
 * Links to informational pages only; no signup or booking triggers.
 */
const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/faq', label: 'FAQ' },
];

export const Nav: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 transition-all duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="font-bold text-xl sm:text-2xl tracking-tight text-primary hover:opacity-90 transition-opacity"
              aria-label="Milestone Pediatrics Home"
            >
              Milestone Pediatrics
            </Link>
          </div>

          <nav aria-label="Main" className="flex items-center gap-3 sm:gap-6">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-neutral-600 dark:text-neutral-300'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary tracking-wide">
              Opening 2027
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
};
