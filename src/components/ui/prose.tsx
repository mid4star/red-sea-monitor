import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Prose: React.FC<ProseProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'max-w-reading font-sans text-ink/90 dark:text-paper/90 text-lg leading-relaxed space-y-6',
          // Editorial typography styles
          '[&>p]:leading-[1.75]',
          '[&>h2]:font-serif [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:pt-4 [&>h2]:border-t [&>h2]:border-rule',
          '[&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3',
          '[&>blockquote]:font-serif [&>blockquote]:text-xl [&>blockquote]:md:text-2xl [&>blockquote]:italic [&>blockquote]:text-sea-900 [&>blockquote]:dark:text-sea-100 [&>blockquote]:border-l-2 [&>blockquote]:border-coral-500 [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:my-8',
          '[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2',
          '[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2',
          '[&_a]:text-sea-700 [&_a]:dark:text-sea-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-coral-500',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
