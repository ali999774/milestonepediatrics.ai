import React from 'react';

export type BadgeVariant = 'success' | 'neutral' | 'accent';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

/**
 * Small pill label component for status, credentials, etc.
 * 
 * @example
 * <Badge variant="success">Accepting New Patients</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', className = '', children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    const variantClasses = {
      success: "bg-primary-light text-primary dark:bg-primary/20 dark:text-primary",
      neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
      accent: "bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-300"
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
      <span
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
