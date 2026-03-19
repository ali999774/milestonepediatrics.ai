import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Card component for containing grouped content.
 * Has a soft shadow, rounded corners, and warm surface background.
 * Max 3 columns recommended in grid layouts.
 * 
 * @example
 * <Card className="p-6">
 *   <h3 className="text-xl">Content Title</h3>
 *   <p>Description goes here.</p>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-surface rounded-card shadow-card dark:bg-neutral-900 dark:border dark:border-neutral-800 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
