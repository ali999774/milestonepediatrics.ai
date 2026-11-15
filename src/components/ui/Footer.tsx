import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer for the pre-opening informational site.
 * Free of operational claims, certifications, or obsolete contact placeholders.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <div className="font-bold text-lg tracking-tight text-primary">
              Milestone Pediatrics
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Milestone Pediatrics is the DBA of Uptown Pediatrics PLLC.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Planned to open in 2027. Not yet open and not accepting patients.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-neutral-500 dark:text-neutral-400">
            <Link to="/about" className="hover:text-primary transition-colors underline-offset-4 hover:underline">About</Link>
            <Link to="/services" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Services</Link>
            <Link to="/faq" className="hover:text-primary transition-colors underline-offset-4 hover:underline">FAQ</Link>
            <Link
              to="/privacy"
              className="hover:text-primary dark:hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <span>
              &copy; {new Date().getFullYear()} Uptown Pediatrics PLLC. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
