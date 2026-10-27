import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-mono uppercase tracking-wider font-medium text-ink dark:text-paper">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-3 py-2 text-sm font-sans bg-paper-elevated dark:bg-paper-card border rounded-md text-ink dark:text-paper transition-colors placeholder:text-muted/60 focus:outline-none focus:border-sea-700 min-h-[44px]',
              error ? 'border-coral-500 focus:border-coral-500' : 'border-rule hover:border-ink/30 dark:hover:border-paper/30',
              className
            )
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-coral-600 dark:text-coral-500 font-sans" role="alert">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-mono uppercase tracking-wider font-medium text-ink dark:text-paper">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={twMerge(
            clsx(
              'w-full px-3 py-2 text-sm font-sans bg-paper-elevated dark:bg-paper-card border rounded-md text-ink dark:text-paper transition-colors placeholder:text-muted/60 focus:outline-none focus:border-sea-700',
              error ? 'border-coral-500 focus:border-coral-500' : 'border-rule hover:border-ink/30 dark:hover:border-paper/30',
              className
            )
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-coral-600 dark:text-coral-500 font-sans" role="alert">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, options, children, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-mono uppercase tracking-wider font-medium text-ink dark:text-paper">
            {label}
          </label>
        )}
        <select
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-3 py-2 text-sm font-sans bg-paper-elevated dark:bg-paper-card border rounded-md text-ink dark:text-paper transition-colors focus:outline-none focus:border-sea-700 min-h-[44px]',
              error ? 'border-coral-500 focus:border-coral-500' : 'border-rule hover:border-ink/30 dark:hover:border-paper/30',
              className
            )
          )}
          {...props}
        >
          {options ? options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )) : children}
        </select>
        {error ? (
          <p className="text-xs text-coral-600 dark:text-coral-500 font-sans" role="alert">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = 'Select';
