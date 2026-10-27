import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export const Tag: React.FC<TagProps> = ({ className, active = false, children, ...props }) => {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-1 text-xs font-sans font-medium transition-colors cursor-pointer rounded-sm border',
          active
            ? 'bg-sea-900 border-sea-900 text-paper dark:bg-paper dark:border-paper dark:text-sea-900'
            : 'bg-transparent border-ink/15 text-muted hover:border-ink/40 hover:text-ink dark:border-paper/20 dark:text-muted dark:hover:text-paper',
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};
