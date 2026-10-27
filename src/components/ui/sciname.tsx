import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SciNameProps {
  children?: React.ReactNode;
  name?: string;
  inParentheses?: boolean;
  className?: string;
}

/**
 * SciName: Semantic typography component for biological taxa.
 * Formats scientific names in italic serif, safely stripping literal markdown markers.
 */
export const SciName: React.FC<SciNameProps> = ({
  children,
  name,
  inParentheses = false,
  className,
}) => {
  const rawText = name || (typeof children === 'string' ? children : '');
  const cleanText = rawText.replace(/[*_]/g, '').trim();

  const renderedContent = cleanText || children;

  return (
    <span className="inline-flex items-center">
      {inParentheses && <span className="text-muted/70 mr-0.5">(</span>}
      <em
        className={twMerge(
          clsx(
            'font-serif italic font-normal tracking-normal text-ink/90 dark:text-paper/90 not-italic-markers',
            className
          )
        )}
      >
        {renderedContent}
      </em>
      {inParentheses && <span className="text-muted/70 ml-0.5">)</span>}
    </span>
  );
};
