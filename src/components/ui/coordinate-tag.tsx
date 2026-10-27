import React from 'react';
import { MapPin } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatCoordinatesDMS } from '@/lib/geo';

interface CoordinateTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  lat?: number;
  lng?: number;
  dms?: string;
  isApproximate?: boolean;
  tone?: 'light' | 'dark';
}

export const CoordinateTag: React.FC<CoordinateTagProps> = ({
  lat,
  lng,
  dms,
  isApproximate = false,
  tone = 'light',
  className,
  ...props
}) => {
  const displayCoordinates =
    dms || (lat !== undefined && lng !== undefined ? formatCoordinatesDMS(lat, lng) : '20°00′N 38°00′E');

  const isDark = tone === 'dark';

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1 font-mono text-[11px] tracking-tight px-2 py-0.5 rounded-sm select-none',
          isDark
            ? 'text-paper bg-paper/10 border border-paper/20 [&_svg]:text-coral-400'
            : 'text-sea-700 dark:text-sea-500 bg-sea-100/40 dark:bg-sea-900/30 border border-sea-500/20 [&_svg]:text-sea-700 dark:[&_svg]:text-sea-500',
          className
        )
      )}
      title={isApproximate ? 'Approximated location (~11km grid) to safeguard sensitive marine species' : 'Field coordinates'}
      {...props}
    >
      <MapPin className={clsx("w-3 h-3 shrink-0", isDark ? "text-coral-400" : "text-sea-700 dark:text-sea-500")} strokeWidth={1.5} />
      <span>{displayCoordinates}</span>
      {isApproximate && <span className="text-[9px] text-muted ml-0.5">(approx)</span>}
    </span>
  );
};
