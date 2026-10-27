import React from 'react';
import { Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SampleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  compact?: boolean;
}

export const SampleBadge: React.FC<SampleBadgeProps> = ({
  compact = false,
  className,
  ...props
}) => {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase font-semibold text-sand-600 dark:text-sand-300 bg-sand-300/30 dark:bg-sand-600/20 px-2 py-0.5 rounded-sm border border-sand-600/40 select-none',
          className
        )
      )}
      title="This record is verified sample data for demonstration. Can be purged in one click from Admin."
      {...props}
    >
      <Sparkles className="w-2.5 h-2.5 opacity-70" strokeWidth={1.5} />
      <span>{compact ? 'Sample' : 'Sample Record'}</span>
    </span>
  );
};
