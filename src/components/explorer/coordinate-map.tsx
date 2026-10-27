'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { blurCoordinates } from '@/lib/geo';

interface MapPoint {
  id: string;
  name: string;
  slug?: string;
  type?: string;
  latitude: number;
  longitude: number;
  isSensitive?: boolean;
}

interface CoordinateMapProps {
  points?: MapPoint[];
  singlePoint?: {
    name: string;
    latitude: number;
    longitude: number;
    isSensitive?: boolean;
    area_km2?: number | null;
  };
  className?: string;
  heightClass?: string;
  showCardPreview?: boolean;
}

export function CoordinateMap({
  points = [],
  singlePoint,
  className = '',
  heightClass = 'h-96',
  showCardPreview = true,
}: CoordinateMapProps) {
  const [activePoint, setActivePoint] = useState<MapPoint | null>(
    singlePoint ? { id: 'single', slug: '', ...singlePoint } : points[0] || null
  );

  // Geographic bounds for the Egyptian Red Sea corridor
  // Lat: 22.0°N (Sudan border) to 30.0°N (Suez/Aqaba tip)
  // Lng: 32.0°E (Nile/Desert fringe) to 36.5°E (Straits of Tiran / Zabargad)
  const MIN_LAT = 22.0;
  const MAX_LAT = 30.0;
  const MIN_LNG = 32.0;
  const MAX_LNG = 36.5;

  const projectToSvg = (lat: number, lng: number) => {
    const x = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100;
    const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * 100; // SVG y is inverted
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const renderPoints = singlePoint ? [{ id: 'single', slug: '', ...singlePoint }] : points;

  return (
    <div className={`relative overflow-hidden border border-stone-300 dark:border-stone-800 bg-[#0E1A1F] text-stone-100 rounded-sm ${heightClass} ${className}`}>
      {/* Nautical Grid Graticules Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#23424A" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Bathymetric rift trench stylized contour */}
        <path
          d="M 65 5 Q 60 25 50 45 T 45 75 T 40 98"
          fill="none"
          stroke="#0A5C66"
          strokeWidth="6"
          strokeDasharray="2,2"
          opacity="0.4"
        />
        <path
          d="M 68 5 Q 62 25 52 45 T 47 75 T 42 98"
          fill="none"
          stroke="#0A5C66"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>

      {/* Graticule Legend / Compass Indicator */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 text-[10px] font-mono text-stone-400 bg-stone-900/80 p-2 rounded backdrop-blur-sm border border-stone-700/60 pointer-events-none">
        <span className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Red Sea Hydrographic Sector
        </span>
        <span>LAT: 22°00&apos;N — 30°00&apos;N</span>
        <span>LNG: 32°00&apos;E — 36°30&apos;E</span>
        <span className="text-stone-500 text-[9px] pt-0.5">WGS84 • PostGIS 16 / Spatial Ref 4326</span>
      </div>

      {/* Markers Layer */}
      <div className="absolute inset-0 z-20">
        {renderPoints.map((pt) => {
          let lat = pt.latitude;
          let lng = pt.longitude;
          const isSens = pt.isSensitive;

          if (isSens) {
            const blurred = blurCoordinates(lat, lng);
            lat = blurred.lat;
            lng = blurred.lng;
          }

          const { x, y } = projectToSvg(lat, lng);
          const isSelected = activePoint?.name === pt.name;

          return (
            <div
              key={pt.id + pt.name}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onClick={() => setActivePoint(pt)}
            >
              {/* If sensitive taxon, show blurred 11km circle */}
              {isSens && (
                <div
                  className="absolute -inset-6 rounded-full border border-dashed border-amber-400/60 bg-amber-400/10 pointer-events-none animate-pulse"
                  title="Spatial coordinates blurred ~11km to safeguard sensitive taxa"
                />
              )}

              {/* Pin */}
              <div
                className={`relative flex items-center justify-center h-5 w-5 rounded-full border-2 transition-transform duration-200 ${
                  isSelected
                    ? 'bg-amber-400 border-white scale-125 shadow-lg shadow-amber-400/30'
                    : isSens
                    ? 'bg-amber-600/80 border-stone-200 hover:scale-110'
                    : 'bg-primary border-stone-100 hover:scale-110'
                }`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    isSelected ? 'bg-stone-950' : 'bg-white'
                  }`}
                />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute left-1/2 -top-7 -translate-x-1/2 whitespace-nowrap bg-stone-950 text-stone-100 text-[10px] font-mono px-2 py-0.5 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border border-stone-700">
                {pt.name} {isSens && '±11km'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card Detail Overlay */}
      {showCardPreview && activePoint && (
        <div className="absolute bottom-3 right-3 left-3 md:left-auto md:w-80 z-30 bg-stone-900/95 border border-stone-700/80 p-3.5 rounded shadow-xl backdrop-blur-md text-stone-200">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                {activePoint.type || 'Field Observation Site'}
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-100 mt-0.5">
                {activePoint.name}
              </h4>
            </div>
            {activePoint.isSensitive && (
              <span className="text-[9px] font-mono bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.5 rounded">
                ±11km Protected
              </span>
            )}
          </div>

          <div className="mt-2.5 pt-2 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
            <span>
              {activePoint.isSensitive
                ? `${blurCoordinates(activePoint.latitude, activePoint.longitude).lat.toFixed(2)}°N, ${blurCoordinates(activePoint.latitude, activePoint.longitude).lng.toFixed(2)}°E ±11km (Protected)`
                : `${activePoint.latitude.toFixed(4)}°N, ${activePoint.longitude.toFixed(4)}°E`}
            </span>
            {activePoint.slug && (
              <Link
                href={`/explorer/places/${activePoint.slug}`}
                className="text-amber-400 hover:underline flex items-center gap-1 font-sans text-xs font-medium"
              >
                Inspect Place →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
