'use client';

import React from 'react';

interface VisitGuidanceProps {
  guidance?: {
    permits?: string;
    best_season?: string;
    safety?: string;
    rules?: string[];
  } | null;
  className?: string;
}

export function VisitGuidance({ guidance, className = '' }: VisitGuidanceProps) {
  if (!guidance || (!guidance.permits && !guidance.best_season && !guidance.safety && (!guidance.rules || guidance.rules.length === 0))) {
    return null;
  }

  return (
    <div className={`border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 p-5 rounded-sm space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
        <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span className="text-primary text-lg">✦</span> Responsible Field Guidance & Protocols
        </h3>
        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded">
          EEAA & Ranger Standards
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {guidance.permits && (
          <div className="space-y-1">
            <span className="font-mono uppercase tracking-wider text-stone-500 block">
              Permits & Environmental Fees
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              {guidance.permits}
            </p>
          </div>
        )}

        {guidance.best_season && (
          <div className="space-y-1">
            <span className="font-mono uppercase tracking-wider text-stone-500 block">
              Optimal Survey Season & Climate
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              {guidance.best_season}
            </p>
          </div>
        )}

        {guidance.safety && (
          <div className="md:col-span-2 space-y-1 bg-amber-500/10 border border-amber-500/20 p-3 rounded">
            <span className="font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold block flex items-center gap-1.5">
              <span>⚠</span> Field Safety & Nautical Caution
            </span>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
              {guidance.safety}
            </p>
          </div>
        )}
      </div>

      {guidance.rules && guidance.rules.length > 0 && (
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
          <span className="font-mono uppercase tracking-wider text-stone-500 text-xs block">
            Mandatory Conservation Regulations
          </span>
          <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
            {guidance.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary font-bold">›</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
