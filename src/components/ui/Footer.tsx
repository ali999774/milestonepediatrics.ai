import React from 'react';
import { Link } from 'react-router-dom';

export interface FooterProps {
  // Reserved for future props (custom links, schema override, etc.)
}

/**
 * Footer component containing practice info, links, and copyright.
 */
export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-surface dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

          {/* Brand Col */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="font-bold text-xl tracking-tight text-primary">
              Milestone Pediatrics
              <span className="text-primary-light">.ai</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-sm">
              Modern pediatric care for modern families. Warm, trustworthy, and forward-thinking.
            </p>
            <div
              className="mt-4 opacity-70 hover:opacity-100 transition-opacity"
              style={{ 
                background: 'transparent', 
                display: 'inline-block',
                mixBlendMode: 'multiply',
                colorScheme: 'light'
              }}
            >
              <div dangerouslySetInnerHTML={{
                __html: `<iframe height="94" width="100" src="https://www.mycertifiedpediatrician.org/widgets/pediatrician" style="height: 94px; width: 100px; border: none; padding: 5px 5px 0 5px; border-radius: 5px; background: transparent;" allowtransparency="true"></iframe>`
              }} />
            </div>
          </div>

          {/* Links Col */}
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Practice</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/services" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Location</h3>
            <address className="not-italic flex flex-col space-y-3 text-neutral-600 dark:text-neutral-400">
              <p>Houston, TX</p>
              <a href="mailto:hello@milestonepediatrics.ai" className="hover:text-primary transition-colors">hello@milestonepediatrics.ai</a>
            </address>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-neutral-500 dark:text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Milestone Pediatrics. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-neutral-800 dark:hover:text-neutral-200">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
