'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SEED_COUNTRIES } from '@/lib/seed-data';

function ActiveCoordinatesInner({ className = '' }: { className?: string }) {
  const searchParams = useSearchParams();
  const [activeCountry, setActiveCountry] = useState<any>(null);

  useEffect(() => {
    const param = searchParams.get('country');
    let countryCode = param ? param.toUpperCase() : null;

    if (!countryCode) {
      const match = document.cookie.match(/(?:^|; )rsm_country=([^;]*)/);
      if (match && match[1]) {
        countryCode = decodeURIComponent(match[1]).toUpperCase();
      }
    }

    if (countryCode && countryCode !== 'ALL') {
      const found = SEED_COUNTRIES.find((c) => c.iso2.toUpperCase() === countryCode);
      setActiveCountry(found || null);
    } else {
      setActiveCountry(null);
    }
  }, [searchParams]);

  if (activeCountry) {
    return (
      <div className={`flex items-center gap-1.5 font-mono text-xs ${className}`}>
        <span className="text-[10px] uppercase text-sea-700 dark:text-sea-400 font-semibold">
          {activeCountry.name}:
        </span>
        <CoordinateTag lat={activeCountry.latitude} lng={activeCountry.longitude} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 font-mono text-xs ${className}`}>
      <span className="text-[10px] uppercase text-muted font-medium">Basin Center:</span>
      <CoordinateTag lat={20.0} lng={38.0} />
    </div>
  );
}

export const ActiveBasinCoordinates: React.FC<{ className?: string }> = (props) => {
  return (
    <Suspense
      fallback={
        <div className={`flex items-center gap-1.5 font-mono text-xs ${props.className || ''}`}>
          <span className="text-[10px] uppercase text-muted font-medium">Basin Center:</span>
          <CoordinateTag lat={20.0} lng={38.0} />
        </div>
      }
    >
      <ActiveCoordinatesInner {...props} />
    </Suspense>
  );
};
