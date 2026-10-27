'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Info, ExternalLink } from 'lucide-react';
import { SEED_COUNTRIES } from '@/lib/seed-data';
import { CountryFlag } from '@/components/ui/country-flag';
import { getBasinTelemetry } from '@/lib/basin-stats';
import { BasinMap } from '@/components/home/basin-map';

export const BasinGlanceSection: React.FC = () => {
  const telemetryStats = getBasinTelemetry();
  const publishedCountries = SEED_COUNTRIES.filter((c) => c.status !== 'DISABLED');

  return (
    <section
      aria-labelledby="basin-glance-heading"
      className="w-full border-b border-rule bg-paper-card/70 dark:bg-deep-sea py-14 md:py-20 transition-colors overflow-hidden"
    >
      <div className="max-w-content mx-auto px-4 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-rule">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-sea-700 dark:text-sea-500 uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4 stroke-[1.5]" />
              <span>Regional Overview • حوض البحر الأحمر</span>
            </div>
            <h2
              id="basin-glance-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper"
            >
              The Basin at a Glance
            </h2>
            <p className="font-sans text-base sm:text-lg text-muted leading-relaxed">
              A single tectonic rift and transboundary ecosystem spanning sovereign littoral shores, over 6,400 kilometers of reef crest, and the planet’s premier evolutionary coral thermal refugia.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/explorer"
              className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1 shrink-0 font-medium"
            >
              <span>Open Spatial Gazetteer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Telemetry Metrics (Derived from single source of truth in src/lib/basin-stats.ts) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {telemetryStats.map((stat) => (
            <div
              key={stat.stat_key}
              className="p-4 sm:p-5 rounded-md bg-paper dark:bg-sea-900/40 border border-rule space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
                    {stat.label}
                  </span>
                  <a
                    href={stat.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Source: ${stat.source_name}`}
                    className="text-muted hover:text-sea-700 dark:hover:text-sea-400 p-0.5"
                  >
                    <Info className="w-3 h-3" />
                  </a>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-sea-800 dark:text-sea-400">
                  {stat.value}
                  <span className="text-sm font-sans font-normal text-muted ml-1.5">{stat.unit}</span>
                </div>
              </div>
              <p className="text-[11px] text-muted font-sans leading-tight">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Horizontal Country Chip Bar (Using SVG flags & non-truncated names) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>Sovereign Coastline Dossiers:</span>
            <span className="hidden sm:inline">Click to explore sovereign country hub</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {publishedCountries.map((ctry) => {
              const isComingSoon = ctry.status === 'COMING_SOON';
              return (
                <Link
                  key={ctry.iso2}
                  href={`/countries/${ctry.iso2.toLowerCase()}`}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs whitespace-nowrap transition-all shrink-0 ${
                    isComingSoon
                      ? 'bg-paper dark:bg-sea-900/20 border-dashed border-rule opacity-60 hover:opacity-100'
                      : 'bg-paper dark:bg-sea-900/40 border-rule hover:border-sea-600 hover:shadow-xs'
                  }`}
                >
                  <CountryFlag iso2={ctry.iso2} name={ctry.name} className="w-4 h-3" />
                  <span className="font-medium text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-400">
                    {ctry.name}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    ({ctry.native_name})
                  </span>
                  {isComingSoon && (
                    <span className="px-1.5 py-0.2 bg-sand-200 dark:bg-sea-800 text-[9px] uppercase font-mono rounded text-muted">
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* High-Fidelity Basin Hydrographic Map & Hotspot Inspector */}
        <BasinMap />
      </div>
    </section>
  );
};
