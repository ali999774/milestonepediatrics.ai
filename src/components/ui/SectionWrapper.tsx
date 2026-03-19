import React from 'react';

export type SectionBackground = 'white' | 'soft' | 'primary-light' | 'primary';

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
  children: React.ReactNode;
}

/**
 * Full-width section container.
 * Enforces generous vertical padding (py-20 desktop, py-12 mobile) and proper text contrast.
 * 
 * @example
 * <SectionWrapper background="soft">
 *   <div className="max-w-2xl mx-auto">Content goes here</div>
 * </SectionWrapper>
 */
export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ background = 'white', className = '', children, ...props }, ref) => {
    
    const bgClasses = {
      // 'white' maps to surface (warm off-white), not pure #FFFFFF
      white: "bg-surface dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800",
      soft: "bg-secondary dark:bg-neutral-900",
      'primary-light': "bg-primary-light dark:bg-primary/5",
      primary: "bg-primary dark:bg-primary/90",
    };

    const classes = `w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 ${bgClasses[background]} ${className}`;

    return (
      <section
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';
