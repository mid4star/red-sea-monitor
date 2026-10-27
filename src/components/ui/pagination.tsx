import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={twMerge(clsx('flex items-center justify-between border-t border-rule pt-4 mt-8', className))}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-medium text-ink dark:text-paper hover:text-sea-700 disabled:opacity-40 disabled:pointer-events-none p-2 min-h-[44px]"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        <span>Previous</span>
      </button>

      <span className="font-mono text-xs text-muted">
        Page <span className="font-semibold text-ink dark:text-paper">{currentPage}</span> of{' '}
        <span className="font-semibold text-ink dark:text-paper">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-medium text-ink dark:text-paper hover:text-sea-700 disabled:opacity-40 disabled:pointer-events-none p-2 min-h-[44px]"
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
      </button>
    </nav>
  );
};
