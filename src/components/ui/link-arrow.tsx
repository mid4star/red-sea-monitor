import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LinkArrowProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export const LinkArrow: React.FC<LinkArrowProps> = ({
  href,
  children,
  external = false,
  className,
}) => {
  const content = (
    <span
      className={twMerge(
        clsx(
          'group inline-flex items-center gap-1 font-sans text-sm font-medium text-ink dark:text-paper hover:text-sea-700 dark:hover:text-sea-500 transition-colors',
          className
        )
      )}
    >
      <span className="border-b border-ink/20 group-hover:border-sea-700 dark:border-paper/20 dark:group-hover:border-sea-500 transition-all">
        {children}
      </span>
      <ArrowUpRight
        className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
      />
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
};
