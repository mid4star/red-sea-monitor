'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Globe, ChevronDown, Check, ExternalLink } from 'lucide-react';
import { SEED_COUNTRIES } from '@/lib/seed-data';
import { CountryFlag } from '@/components/ui/country-flag';

interface RegionSelectorProps {
  className?: string;
  variant?: 'compact' | 'drawer';
}

function RegionSelectorFallback({ className = '', variant = 'compact' }: RegionSelectorProps) {
  if (variant === 'drawer') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between font-mono text-xs text-muted uppercase tracking-wider pb-1">
          <span>Active Basin Focus</span>
          <span>Pan-Basin</span>
        </div>
        <div className="h-10 rounded border border-rule bg-paper-card animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        disabled
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-paper-card dark:bg-sea-900/60 border border-rule text-ink dark:text-paper opacity-80"
      >
        <Globe className="w-3.5 h-3.5 text-sea-700 dark:text-sea-500 shrink-0" />
        <span className="font-medium">All Red Sea Basin</span>
        <ChevronDown className="w-3 h-3 text-muted" />
      </button>
    </div>
  );
}

function RegionSelectorInner({ className = '', variant = 'compact' }: RegionSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIso2, setSelectedIso2] = useState<string>('ALL');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Check URL query param first
    const paramCountry = searchParams.get('country');
    if (paramCountry) {
      setSelectedIso2(paramCountry.toUpperCase());
      return;
    }

    // 2. Fall back to cookie
    const match = document.cookie.match(/(?:^|; )rsm_country=([^;]*)/);
    if (match && match[1]) {
      setSelectedIso2(decodeURIComponent(match[1]).toUpperCase());
    }
  }, [searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectCountry = (iso2: string) => {
    const nextIso = iso2.toUpperCase();
    setSelectedIso2(nextIso);
    setIsOpen(false);

    // Save to cookie
    if (nextIso === 'ALL') {
      document.cookie = 'rsm_country=; path=/; max-age=0; SameSite=Lax';
    } else {
      document.cookie = `rsm_country=${nextIso}; path=/; max-age=31536000; SameSite=Lax`;
    }

    // If on home, watch, explorer, or news, we can update or push query
    if (pathname === '/' || pathname === '/watch' || pathname === '/explorer' || pathname === '/news') {
      const params = new URLSearchParams(searchParams.toString());
      if (nextIso === 'ALL') {
        params.delete('country');
      } else {
        params.set('country', nextIso.toLowerCase());
      }
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      router.push(`${pathname}${queryStr}`);
    }
  };

  const currentCountry = SEED_COUNTRIES.find(
    (c) => c.iso2.toUpperCase() === selectedIso2
  );

  if (variant === 'drawer') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between font-mono text-xs text-muted uppercase tracking-wider pb-1">
          <span>Active Basin Focus</span>
          <span>{selectedIso2 === 'ALL' ? 'Pan-Basin' : selectedIso2}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => handleSelectCountry('ALL')}
            className={`flex items-center justify-between px-3 py-2 text-xs rounded border text-left transition-colors ${
              selectedIso2 === 'ALL'
                ? 'bg-sea-800 text-paper border-sea-700 font-semibold'
                : 'bg-paper-card dark:bg-sea-900/40 text-ink dark:text-paper border-rule hover:border-sea-600'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Globe className="w-3.5 h-3.5 shrink-0 text-sea-500" />
              <span>All Basin</span>
            </span>
            {selectedIso2 === 'ALL' && <Check className="w-3.5 h-3.5 shrink-0" />}
          </button>

          {SEED_COUNTRIES.map((ctry) => {
            const isSelected = selectedIso2 === ctry.iso2.toUpperCase();
            return (
              <button
                key={ctry.iso2}
                onClick={() => {
                  if (ctry.status === 'ACTIVE') {
                    handleSelectCountry(ctry.iso2);
                  }
                }}
                disabled={ctry.status !== 'ACTIVE'}
                className={`flex items-center justify-between px-2.5 py-2 text-xs rounded border text-left transition-colors ${
                  ctry.status !== 'ACTIVE'
                    ? 'opacity-40 cursor-not-allowed bg-paper-card/40 border-dashed border-rule text-muted'
                    : isSelected
                    ? 'bg-sea-800 text-paper border-sea-700 font-semibold'
                    : 'bg-paper-card dark:bg-sea-900/40 text-ink dark:text-paper border-rule hover:border-sea-600'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <CountryFlag iso2={ctry.iso2} name={ctry.name} className="w-3.5 h-2.5" />
                  <span className="truncate">{ctry.name}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter Red Sea region"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-paper-card dark:bg-sea-900/60 border border-rule hover:border-sea-600 transition-colors text-ink dark:text-paper"
      >
        <Globe className="w-3.5 h-3.5 text-sea-700 dark:text-sea-500 shrink-0" />
        <span className="font-medium truncate max-w-[140px] sm:max-w-none flex items-center gap-1.5">
          {currentCountry ? (
            <>
              <CountryFlag iso2={currentCountry.iso2} name={currentCountry.name} className="w-3.5 h-2.5" />
              <span className="truncate">{currentCountry.name}</span>
            </>
          ) : (
            'All Red Sea Basin'
          )}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-muted transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-72 rounded-md shadow-xl bg-paper dark:bg-deep-sea border border-rule z-50 p-2 space-y-1 animate-in fade-in duration-100">
          <div className="px-2.5 py-1.5 text-[11px] font-mono uppercase text-muted tracking-wider border-b border-rule flex items-center justify-between">
            <span>Filter Red Sea Basin</span>
            <span className="text-[10px] text-sea-700 dark:text-sea-500 font-medium">8 Coastlines</span>
          </div>

          {/* Option: All Countries */}
          <button
            onClick={() => handleSelectCountry('ALL')}
            className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded text-left transition-colors ${
              selectedIso2 === 'ALL'
                ? 'bg-sea-800 text-paper font-semibold'
                : 'text-ink dark:text-paper hover:bg-paper-card dark:hover:bg-sea-900/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sea-500 shrink-0" />
              <div>
                <div className="font-medium">All Red Sea Basin</div>
                <div className="text-[10px] text-muted">Transboundary Rift Ecosystem</div>
              </div>
            </div>
            {selectedIso2 === 'ALL' && <Check className="w-4 h-4 shrink-0 text-paper" />}
          </button>

          {/* Individual Coastal Countries */}
          <div className="max-h-60 overflow-y-auto space-y-0.5 pt-1 border-t border-rule/60">
            {SEED_COUNTRIES.map((ctry) => {
              const isSelected = selectedIso2 === ctry.iso2.toUpperCase();
              const isComingSoon = ctry.status === 'COMING_SOON';

              return (
                <div
                  key={ctry.iso2}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-colors ${
                    isComingSoon
                      ? 'opacity-40 cursor-not-allowed text-muted'
                      : isSelected
                      ? 'bg-sea-800 text-paper font-semibold'
                      : 'text-ink dark:text-paper hover:bg-paper-card dark:hover:bg-sea-900/60'
                  }`}
                >
                  <button
                    disabled={isComingSoon}
                    onClick={() => handleSelectCountry(ctry.iso2)}
                    className="flex items-center gap-2 text-left flex-1 min-w-0"
                  >
                    <CountryFlag iso2={ctry.iso2} name={ctry.name} className="w-4 h-3 shrink-0" />
                    <div className="min-w-0 flex-1 truncate">
                      <div className="truncate font-medium flex items-center gap-1.5">
                        <span>{ctry.name}</span>
                        <span className="text-[10px] font-mono text-muted">({ctry.native_name})</span>
                      </div>
                      <div className="text-[10px] text-muted truncate">
                        {isComingSoon
                          ? 'Baseline surveys in progress'
                          : `${ctry.coast_length_km?.toLocaleString()} km coastline`}
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {isSelected && <Check className="w-3.5 h-3.5 text-paper" />}
                    {!isComingSoon && (
                      <Link
                        href={`/countries/${ctry.iso2.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        title={`View ${ctry.name} Dossier`}
                        className="p-1 hover:text-sea-500 text-muted rounded transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export const RegionSelector: React.FC<RegionSelectorProps> = (props) => {
  return (
    <Suspense fallback={<RegionSelectorFallback {...props} />}>
      <RegionSelectorInner {...props} />
    </Suspense>
  );
};
