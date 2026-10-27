import React from 'react';
import { Compass } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'relative overflow-hidden rounded-md border border-dashed border-rule bg-paper-card dark:bg-sea-900/20 p-8 md:p-12 text-center bg-bathymetry-subtle',
          className
        )
      )}
    >
      <div className="mx-auto w-12 h-12 rounded-full border border-sea-500/30 bg-sea-100/40 dark:bg-sea-900/50 flex items-center justify-center text-sea-700 dark:text-sea-500 mb-4">
        <Compass className="w-6 h-6 stroke-[1.5]" />
      </div>

      <h3 className="font-serif text-lg md:text-xl font-semibold text-ink dark:text-paper mb-2">
        {title}
      </h3>

      <p className="max-w-md mx-auto text-sm text-muted mb-6 leading-relaxed">
        {description}
      </p>

      {action && <div className="inline-flex justify-center">{action}</div>}
    </div>
  );
};
