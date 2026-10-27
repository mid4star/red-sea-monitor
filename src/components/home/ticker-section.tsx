import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SciName } from '@/components/ui/sciname';

interface TickerItem {
  id: string;
  country: string;
  text: string;
  sciName?: string;
  isSample: boolean;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    id: 't-1',
    country: 'SA',
    text: 'Regional baseline: Green sea turtle nesting survey logged at Ras Baridi',
    sciName: 'Chelonia mydas',
    isSample: true,
  },
  {
    id: 't-2',
    country: 'SD',
    text: 'Winter thermal monitoring records 24.8°C reef minimum at central transect, Sanganeb Atoll',
    isSample: true,
  },
  {
    id: 't-3',
    country: 'ER',
    text: 'Artisanal dhow hull woodworking documentation completed, Dahlak Archipelago',
    isSample: true,
  },
  {
    id: 't-4',
    country: 'DJ',
    text: 'Larval drift genetic markers mapped across Bab-el-Mandeb Strait, Seven Brothers',
    isSample: true,
  },
  {
    id: 't-5',
    country: 'JO',
    text: 'Coastal coral sanctuary extension ratified by marine authorities, Gulf of Aqaba',
    isSample: true,
  },
  {
    id: 't-6',
    country: 'EG',
    text: 'Acoustic survey notes healthy coral fish chorus on offshore pinnacles, Daedalus Reef',
    isSample: true,
  },
  {
    id: 't-7',
    country: 'YE',
    text: 'Pelagic cetacean sighting transects catalogued along southern Red Sea rift shelf',
    isSample: true,
  },
];

export const TickerSection: React.FC = () => {
  return (
    <div
      id="section-ticker"
      className="w-full border-b border-rule bg-sea-100/80 dark:bg-sea-900/40 text-ink dark:text-paper py-3 px-4 lg:px-8 transition-colors select-none"
    >
      <div className="max-w-content mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
        {/* Left header tag */}
        <div className="flex items-center gap-2 shrink-0 font-semibold tracking-wider uppercase text-sea-700 dark:text-sea-500">
          <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
          <span>Field Wires:</span>
          <span className="bg-coral-500/15 text-coral-600 dark:text-coral-400 border border-coral-500/30 text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold">
            SAMPLE
          </span>
        </div>

        {/* Scrolling items with pause on hover/focus */}
        <div
          tabIndex={0}
          className="flex items-center gap-6 overflow-x-auto whitespace-nowrap text-muted dark:text-paper/80 py-0.5 scrollbar-none focus:outline-none focus:ring-1 focus:ring-coral-500 rounded"
          aria-label="Real-time field wires from basin coastlines"
        >
          {TICKER_ITEMS.map((item, idx) => (
            <React.Fragment key={item.id}>
              <span className="inline-flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-ink dark:text-paper">[{item.country}]</span>
                <span>{item.text}</span>
                {item.sciName && (
                  <SciName className="italic text-sea-700 dark:text-sea-300">
                    ({item.sciName})
                  </SciName>
                )}
                <span className="text-[10px] bg-sand-300/40 dark:bg-sea-100/10 px-1 py-0.2 rounded text-muted">
                  SAMPLE
                </span>
              </span>
              {idx < TICKER_ITEMS.length - 1 && <span className="opacity-30">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Right CTA */}
        <Link
          href="/news"
          className="shrink-0 text-coral-600 dark:text-coral-400 hover:underline flex items-center gap-1 font-sans font-medium"
        >
          <span>All updates</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
