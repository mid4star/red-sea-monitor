import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  license?: string;
  aspectRatio?: '3/2' | '4/5' | '16/9' | '1/1';
  priority?: boolean;
  className?: string;
}

export const Figure: React.FC<FigureProps> = ({
  src,
  alt,
  caption,
  credit,
  license,
  aspectRatio = '3/2',
  priority = false,
  className,
}) => {
  const aspectClasses = {
    '3/2': 'aspect-[3/2]',
    '4/5': 'aspect-[4/5]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square',
  };

  return (
    <figure className={twMerge(clsx('group my-4 overflow-hidden', className))}>
      <div
        className={clsx(
          'relative w-full overflow-hidden bg-sand-300/20 dark:bg-sea-900/40 rounded-md border border-rule',
          aspectClasses[aspectRatio]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>

      {(caption || credit || license) && (
        <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 text-xs text-muted font-sans border-t border-rule/50 pt-1.5">
          {caption && <span className="text-ink/90 dark:text-paper/90">{caption}</span>}
          {(credit || license) && (
            <span className="font-mono text-[11px] opacity-75 ml-auto">
              {credit && <span>Photo: {credit}</span>}
              {license && <span className="ml-1.5">({license})</span>}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
