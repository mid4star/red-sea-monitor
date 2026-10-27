import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SectionHeaderProps {
  index: string; // e.g. "01", "02"
  title: string;
  subtitle?: string;
  href?: string;
  actionText?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  title,
  subtitle,
  href,
  actionText,
  tone = 'light',
  className,
}) => {
  const isDark = tone === 'dark';

  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 mb-6 gap-2',
          isDark ? 'border-b border-paper/20' : 'border-b border-rule',
          className
        )
      )}
    >
      <div className="flex items-baseline gap-3">
        <span
          className={
            isDark
              ? 'font-mono text-xs tracking-widest text-coral-300 font-bold px-2 py-0.5 rounded bg-coral-500/20 border border-coral-500/30'
              : 'font-mono text-xs tracking-widest text-sea-700 dark:text-sea-500 font-bold'
          }
        >
          {index}
        </span>
        <span className={isDark ? 'text-paper/40 font-mono text-xs' : 'text-muted/40 font-mono text-xs'}>/</span>
        <h2
          className={
            isDark
              ? 'font-serif text-2xl md:text-3xl font-bold tracking-tight text-paper'
              : 'font-serif text-2xl md:text-3xl font-semibold tracking-tight text-ink dark:text-paper'
          }
        >
          {title}
        </h2>
        {subtitle && (
          <span
            className={
              isDark
                ? 'hidden md:inline font-sans text-sm text-paper/80 ml-2'
                : 'hidden md:inline font-sans text-sm text-muted ml-2'
            }
          >
            — {subtitle}
          </span>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className={twMerge(
            clsx(
              'group inline-flex items-center justify-center gap-1.5 font-mono text-xs tracking-wider uppercase font-semibold px-3 py-2 sm:px-0 sm:py-0 rounded-sm transition-all min-h-[44px] sm:min-h-0 w-full sm:w-auto mt-2 sm:mt-0',
              isDark
                ? 'text-coral-300 hover:text-coral-200 border border-paper/20 sm:border-0 bg-paper/5 sm:bg-transparent'
                : 'border border-rule/80 sm:border-0 bg-sand-500/10 sm:bg-transparent text-coral-600 dark:text-coral-400 hover:bg-coral-500 hover:text-white sm:hover:bg-transparent sm:hover:text-coral-500'
            )
          )}
        >
          <span>{actionText || 'Explore all'}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
};
