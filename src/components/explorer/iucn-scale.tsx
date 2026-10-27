'use client';

import React from 'react';
import { IucnStatus } from '@prisma/client';

interface IucnScaleProps {
  status: IucnStatus;
  className?: string;
  showDetails?: boolean;
}

const IUCN_LEVELS: {
  code: IucnStatus;
  label: string;
  name: string;
  color: string;
  bgActive: string;
  textActive: string;
}[] = [
  { code: 'LC', label: 'LC', name: 'Least Concern', color: '#1B7340', bgActive: 'bg-[#1B7340]', textActive: 'text-white' },
  { code: 'NT', label: 'NT', name: 'Near Threatened', color: '#688F26', bgActive: 'bg-[#688F26]', textActive: 'text-white' },
  { code: 'VU', label: 'VU', name: 'Vulnerable', color: '#D99B00', bgActive: 'bg-[#D99B00]', textActive: 'text-stone-900' },
  { code: 'EN', label: 'EN', name: 'Endangered', color: '#D95F02', bgActive: 'bg-[#D95F02]', textActive: 'text-white' },
  { code: 'CR', label: 'CR', name: 'Critically Endangered', color: '#B31B1B', bgActive: 'bg-[#B31B1B]', textActive: 'text-white' },
  { code: 'DD', label: 'DD', name: 'Data Deficient', color: '#666666', bgActive: 'bg-[#666666]', textActive: 'text-white' },
  { code: 'NE', label: 'NE', name: 'Not Evaluated', color: '#999999', bgActive: 'bg-[#999999]', textActive: 'text-stone-900' },
];

export function IucnScale({ status, className = '', showDetails = true }: IucnScaleProps) {
  const current = IUCN_LEVELS.find((lvl) => lvl.code === status) || IUCN_LEVELS[0];

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono uppercase tracking-wider text-stone-500">
          IUCN Red List Status
        </span>
        <span className="font-mono font-semibold" style={{ color: current.color }}>
          {current.code} — {current.name}
        </span>
      </div>

      {/* Segmented bar */}
      <div className="grid grid-cols-7 gap-1 h-3 rounded overflow-hidden bg-stone-200 dark:bg-stone-800 p-0.5 border border-stone-300 dark:border-stone-700">
        {IUCN_LEVELS.map((lvl) => {
          const isActive = lvl.code === status;
          return (
            <div
              key={lvl.code}
              title={`${lvl.code}: ${lvl.name}`}
              className={`h-full rounded-sm flex items-center justify-center transition-all ${
                isActive
                  ? `${lvl.bgActive} shadow-sm scale-y-110 font-bold ring-2 ring-stone-900 dark:ring-stone-100`
                  : 'bg-stone-300 dark:bg-stone-700 opacity-40 hover:opacity-75'
              }`}
            >
              <span className={`text-[8px] font-mono leading-none ${isActive ? lvl.textActive : 'text-stone-600 dark:text-stone-400'}`}>
                {lvl.label}
              </span>
            </div>
          );
        })}
      </div>

      {showDetails && (
        <p className="text-xs text-stone-600 dark:text-stone-400 font-serif italic pt-1">
          Assessed according to IUCN Red List of Threatened Species categories and criteria.
        </p>
      )}
    </div>
  );
}
