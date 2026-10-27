'use client';

import React from 'react';

export interface CountryFlagProps {
  iso2: string;
  name?: string;
  className?: string;
  showCode?: boolean;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  iso2,
  name,
  className = 'w-4 h-3',
  showCode = false,
}) => {
  const code = (iso2 || '').toUpperCase();
  const countryName = name || code;

  // Render clean vector SVG flags for Red Sea littoral nations
  const renderSvg = () => {
    switch (code) {
      case 'EG': // Egypt: Red, White, Black with Golden Eagle
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-[2px] shadow-xs" role="img" aria-label={`Flag of ${countryName}`}>
            <rect width="600" height="133.3" fill="#C8102E" />
            <rect y="133.3" width="600" height="133.4" fill="#FFFFFF" />
            <rect y="266.7" width="600" height="133.3" fill="#000000" />
            {/* Eagle of Saladin silhouette */}
            <path
              d="M 285,160 Q 300,145 315,160 Q 325,185 320,225 L 305,240 L 295,240 L 280,225 Z"
              fill="#C69214"
            />
          </svg>
        );

      case 'SD': // Sudan: Red, White, Black with Green hoist triangle
        return (
          <svg viewBox="0 0 600 300" className="w-full h-full rounded-[2px] shadow-xs" role="img" aria-label={`Flag of ${countryName}`}>
            <rect width="600" height="100" fill="#D21034" />
            <rect y="100" width="600" height="100" fill="#FFFFFF" />
            <rect y="200" width="600" height="100" fill="#000000" />
            <polygon points="0,0 200,150 0,300" fill="#007229" />
          </svg>
        );

      case 'SA': // Saudi Arabia: Green with White Inscription & Sword
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-[2px] shadow-xs" role="img" aria-label={`Flag of ${countryName}`}>
            <rect width="600" height="400" fill="#006C35" />
            {/* Stylized Shahada Arabic script banner */}
            <path
              d="M 180,170 Q 300,150 420,170 Q 400,190 300,185 Q 200,190 180,170 Z"
              fill="#FFFFFF"
            />
            {/* Sword */}
            <rect x="220" y="225" width="160" height="8" rx="2" fill="#FFFFFF" />
            <rect x="240" y="215" width="8" height="28" rx="2" fill="#FFFFFF" />
          </svg>
        );

      case 'JO': // Jordan: Black, White, Green with Red chevron & 7-pointed star
        return (
          <svg viewBox="0 0 600 300" className="w-full h-full rounded-[2px] shadow-xs" role="img" aria-label={`Flag of ${countryName}`}>
            <rect width="600" height="100" fill="#000000" />
            <rect y="100" width="600" height="100" fill="#FFFFFF" />
            <rect y="200" width="600" height="100" fill="#007A3D" />
            <polygon points="0,0 300,150 0,300" fill="#CE1126" />
            {/* White 7-point star */}
            <circle cx="100" cy="150" r="14" fill="#FFFFFF" />
          </svg>
        );

      case 'ER': // Eritrea: Green & Blue triangles, Red hoist wedge with golden olive wreath
        return (
          <svg viewBox="0 0 600 300" className="w-full h-full rounded-[2px] shadow-xs" role="img" aria-label={`Flag of ${countryName}`}>
            <polygon points="0,0 600,0 600,300 0,300" fill="#0C2340" />
            <polygon points="0,0 600,0 0,300" fill="#128A43" />
            <polygon points="0,0 600,150 0,300" fill="#EB1C24" />
            {/* Olive branch wreath emblem */}
            <circle cx="150" cy="150" r="32" fill="none" stroke="#FFC72C" strokeWidth="6" />
          </svg>
        );

      case 'YE': // Yemen: Red, White, Black triband
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-[2px] shadow-xs" role="img" aria-label={`Flag of ${countryName}`}>
            <rect width="600" height="133.3" fill="#CE1126" />
            <rect y="133.3" width="600" height="133.4" fill="#FFFFFF" />
            <rect y="266.7" width="600" height="133.3" fill="#000000" />
          </svg>
        );

      case 'DJ': // Djibouti: Light blue, Green with white chevron & red star
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-[2px] shadow-xs" role="img" aria-label={`Flag of ${countryName}`}>
            <rect width="600" height="200" fill="#6AB2E7" />
            <rect y="200" width="600" height="200" fill="#128A43" />
            <polygon points="0,0 280,200 0,400" fill="#FFFFFF" />
            {/* Red star */}
            <polygon
              points="100,165 108,190 135,190 113,205 122,230 100,215 78,230 87,205 65,190 92,190"
              fill="#D7141A"
            />
          </svg>
        );

      case 'SO': // Somalia: Light Blue with White 5-point star
        return (
          <svg viewBox="0 0 600 400" className="w-full h-full rounded-[2px] shadow-xs" role="img" aria-label={`Flag of ${countryName}`}>
            <rect width="600" height="400" fill="#4189DD" />
            <polygon
              points="300,120 318,175 375,175 330,210 348,265 300,230 252,265 270,210 225,175 282,175"
              fill="#FFFFFF"
            />
          </svg>
        );

      default:
        return (
          <span className="font-mono text-[9px] font-bold px-1 py-0.5 rounded bg-sea-100 dark:bg-sea-800 text-sea-800 dark:text-sea-200">
            {code}
          </span>
        );
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5 align-middle">
      <span className={`inline-block shrink-0 overflow-hidden ${className}`}>
        {renderSvg()}
      </span>
      {showCode && (
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
          {code}
        </span>
      )}
    </span>
  );
};
