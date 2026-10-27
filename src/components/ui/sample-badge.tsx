import React from 'react';
import { Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SampleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  compact?: boolean;
  tone?: 'light' | 'dark';
}

export const SampleBadge: React.FC<SampleBadgeProps> = ({
  compact = false,
  tone = 'light',
  className,
  ...props
}) => {
  const isDark = tone === 'dark';

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase font-semibold px-2 py-0.5 rounded-sm select-none',
          isDark
            ? 'text-paper bg-paper/15 border border-paper/30'
            : 'text-sand-600 dark:text-sand-300 bg-sand-300/30 dark:bg-sand-600/20 border border-sand-600/40',
          className
        )
      )}
      title="This record is sample data for demonstration."
      {...props}
    >
      <Sparkles className={clsx("w-2.5 h-2.5", isDark ? "text-coral-300" : "opacity-70")} strokeWidth={1.5} />
      <span>{compact ? 'Sample' : 'Sample Record'}</span>
    </span>
  );
};
