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
}

export const CoordinateTag: React.FC<CoordinateTagProps> = ({
  lat,
  lng,
  dms,
  isApproximate = false,
  className,
  ...props
}) => {
  const displayCoordinates =
    dms || (lat !== undefined && lng !== undefined ? formatCoordinatesDMS(lat, lng) : '27°15′N 33°49′E');

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1 font-mono text-[11px] tracking-tight text-sea-700 dark:text-sea-500 bg-sea-100/40 dark:bg-sea-900/30 px-2 py-0.5 rounded-sm border border-sea-500/20',
          className
        )
      )}
      title={isApproximate ? 'Approximated location (~11km grid) to safeguard sensitive marine species' : 'Field coordinates'}
      {...props}
    >
      <MapPin className="w-3 h-3 text-sea-700 dark:text-sea-500 opacity-80" strokeWidth={1.5} />
      <span>{displayCoordinates}</span>
      {isApproximate && <span className="text-[9px] text-muted ml-0.5">(approx)</span>}
    </span>
  );
};
