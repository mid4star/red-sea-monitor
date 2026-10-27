import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'sea' | 'sand' | 'coral' | 'iucn-cr' | 'iucn-en' | 'iucn-vu' | 'iucn-nt' | 'iucn-lc';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center px-2 py-0.5 text-xs font-mono tracking-tight font-medium rounded-sm border uppercase';

  const variants = {
    neutral: 'bg-paper-card border-ink/15 text-ink dark:bg-paper-card dark:border-paper/15 dark:text-paper',
    sea: 'bg-sea-100/50 border-sea-500/30 text-sea-900 dark:bg-sea-900/40 dark:border-sea-500/40 dark:text-sea-100',
    sand: 'bg-sand-300/40 border-sand-600/30 text-ink dark:bg-sand-600/20 dark:border-sand-300/30 dark:text-sand-300',
    coral: 'bg-coral-500/10 border-coral-500/30 text-coral-600 dark:text-coral-500',

    // IUCN Red List Color Standard
    'iucn-cr': 'bg-[#D32F2F]/15 border-[#D32F2F]/40 text-[#D32F2F] dark:text-[#FF6659]',
    'iucn-en': 'bg-[#F57C00]/15 border-[#F57C00]/40 text-[#E65100] dark:text-[#FFB74D]',
    'iucn-vu': 'bg-[#FBC02D]/20 border-[#FBC02D]/50 text-[#9E6000] dark:text-[#FFE082]',
    'iucn-nt': 'bg-[#00897B]/15 border-[#00897B]/40 text-[#00695C] dark:text-[#80CBC4]',
    'iucn-lc': 'bg-[#43A047]/15 border-[#43A047]/40 text-[#2E7D32] dark:text-[#A5D6A7]',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {children}
    </span>
  );
};
