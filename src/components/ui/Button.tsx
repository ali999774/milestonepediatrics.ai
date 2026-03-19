import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

/**
 * Button component for actions and links.
 * 
 * @example
 * <Button variant="primary" size="lg">Join the Waitlist</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, disabled, ...props }, ref) => {
    
    // Base classes applied to all buttons
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";
    
    // Variant classes
    const variantClasses = {
      primary: "bg-primary text-white hover:bg-primary/90 dark:hover:bg-primary/80 shadow-sm hover:shadow active:scale-[0.98] hover:scale-[1.02]",
      secondary: "bg-secondary text-neutral-900 border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700 active:scale-[0.98]",
      ghost: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/50 active:scale-[0.98]"
    };

    // Size classes (Note: primary often needs generous padding, enforced here for lg/md)
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2.5 text-base",
      lg: "px-8 py-3 text-lg" // Generous padding for main CTAs
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
