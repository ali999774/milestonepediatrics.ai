import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Minimal navigation header for the planning stage.
 * Clean, branded, with all marketing navigation and signup triggers removed.
 */
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
              <span className="text-primary/60 font-semibold">.ai</span>
            </Link>
          </div>

          {/* Planning Badge indicator */}
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary tracking-wide">
              In Planning
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
