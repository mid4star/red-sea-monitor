import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'coral';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md select-none';

    const variants = {
      primary:
        'bg-sea-900 text-paper hover:bg-sea-700 active:bg-sea-900 focus-visible:ring-sea-700 dark:bg-paper dark:text-sea-900 dark:hover:bg-sand-300',
      coral:
        'bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-700 focus-visible:ring-coral-500 shadow-sm',
      secondary:
        'bg-sea-100 text-sea-900 hover:bg-sand-300 active:bg-sea-100 dark:bg-sea-900 dark:text-sea-100 dark:hover:bg-sea-700',
      outline:
        'border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5 active:bg-ink/10 dark:border-paper/20 dark:text-paper dark:hover:border-paper/50',
      ghost:
        'text-ink hover:bg-ink/5 active:bg-ink/10 dark:text-paper dark:hover:bg-paper/5',
    };

    const sizes = {
      sm: 'text-xs px-2.5 py-1.5 min-h-[36px]',
      md: 'text-sm px-4 py-2 min-h-[44px]', // WCAG touch target
      lg: 'text-base px-6 py-3 min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
