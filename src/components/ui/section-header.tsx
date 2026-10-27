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
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  title,
  subtitle,
  href,
  actionText,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-rule pb-3 mb-6 gap-2',
          className
        )
      )}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs tracking-widest text-sea-700 dark:text-sea-500 font-medium">
          {index}
        </span>
        <span className="text-muted/40 font-mono text-xs">/</span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-ink dark:text-paper">
          {title}
        </h2>
        {subtitle && (
          <span className="hidden md:inline font-sans text-sm text-muted ml-2">
            — {subtitle}
          </span>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1 font-sans text-xs uppercase tracking-wider font-semibold text-sea-700 dark:text-sea-500 hover:text-coral-500 dark:hover:text-coral-500 transition-colors"
        >
          <span>{actionText || 'Explore all'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
};
