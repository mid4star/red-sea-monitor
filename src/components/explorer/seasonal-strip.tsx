'use client';

import React from 'react';

interface SeasonalStripProps {
  activeMonths: number[]; // 1-12
  label?: string;
  className?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function SeasonalStrip({
  activeMonths = [],
  label = 'Observed Regional Presence / Activity Window',
  className = '',
}: SeasonalStripProps) {
  const isYearRound = activeMonths.length === 12;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono uppercase tracking-wider text-stone-500">
          {label}
        </span>
        <span className="font-mono text-stone-700 dark:text-stone-300">
          {isYearRound ? 'Resident Year-Round' : `${activeMonths.length} Active Months`}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-1 border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900/60 p-1 rounded-sm">
        {MONTHS.map((m, idx) => {
          const monthNum = idx + 1;
          const isActive = activeMonths.includes(monthNum);
          return (
            <div
              key={m}
              className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-sm transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm ring-1 ring-primary/40'
                  : 'bg-stone-200/50 dark:bg-stone-800/40 text-stone-400 dark:text-stone-600'
              }`}
            >
              <span className="text-[10px] font-mono leading-none tracking-tight">{m}</span>
              <span
                className={`mt-1 block h-1 w-1 rounded-full ${
                  isActive ? 'bg-amber-400' : 'bg-transparent'
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-primary" /> Active observation / breeding window
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-stone-300 dark:bg-stone-700" /> Dormant / dispersed
        </span>
      </div>
    </div>
  );
}
