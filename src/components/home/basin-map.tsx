'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Waves,
  ShieldCheck,
  Compass,
  ArrowRight,
  Eye,
  Layers,
  ChevronDown,
  Info,
} from 'lucide-react';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { CountryFlag } from '@/components/ui/country-flag';
import { SampleBadge } from '@/components/ui/sample-badge';

export interface MapHotspot {
  id: string;
  name: string;
  fullName: string;
  country: string;
  iso2: string;
  marineRegion: string;
  lat: number;
  lng: number;
  svgX: number;
  svgY: number;
  category: 'MPA' | 'REEF' | 'SIGHTING';
  categoryLabel: string;
  summary: string;
  slug?: string;
  isSample?: boolean;
}

export const REAL_BASIN_HOTSPOTS: MapHotspot[] = [
  {
    id: 'hs-aqaba',
    name: 'Aqaba Marine Reserve',
    fullName: 'Aqaba Marine Reserve & Japanese Garden',
    country: 'Jordan',
    iso2: 'JO',
    marineRegion: 'Gulf of Aqaba',
    lat: 29.43,
    lng: 34.97,
    svgX: 165,
    svgY: 85,
    category: 'MPA',
    categoryLabel: 'Marine Reserve',
    summary: 'Flagship marine reserve protecting hyper-thermotolerant corals resisting global heatwaves in the northern gulf.',
    slug: 'aqaba-marine-reserve',
  },
  {
    id: 'hs-ras-moh',
    name: 'Ras Mohammed',
    fullName: 'Ras Mohammed National Park',
    country: 'Egypt',
    iso2: 'EG',
    marineRegion: 'Northern Red Sea',
    lat: 27.73,
    lng: 34.25,
    svgX: 134,
    svgY: 156,
    category: 'MPA',
    categoryLabel: 'National Park',
    summary: 'Sinai peninsula apex where the shallow Gulf of Suez converges with the deep tectonic abyss of Aqaba.',
    slug: 'ras-mohammed-national-park',
  },
  {
    id: 'hs-giftun',
    name: 'Giftun Islands',
    fullName: 'Giftun Islands Marine Reserve',
    country: 'Egypt',
    iso2: 'EG',
    marineRegion: 'Northern Red Sea',
    lat: 27.23,
    lng: 33.92,
    svgX: 118,
    svgY: 178,
    category: 'MPA',
    categoryLabel: 'Marine Reserve',
    summary: 'Protected offshore sand cays with fringing coral slopes and nesting western ospreys.',
    slug: 'giftun-islands-hurghada',
  },
  {
    id: 'hs-elphinstone',
    name: 'Elphinstone Reef',
    fullName: 'Elphinstone Reef (Sha’ab Shehr)',
    country: 'Egypt',
    iso2: 'EG',
    marineRegion: 'Central Red Sea',
    lat: 25.32,
    lng: 34.87,
    svgX: 161,
    svgY: 260,
    category: 'REEF',
    categoryLabel: 'Oceanic Pinnacle',
    summary: 'Steep offshore ridge in open sea renowned for long-term acoustic telemetry on oceanic whitetip sharks.',
    slug: 'elphinstone-reef',
  },
  {
    id: 'hs-yanbu',
    name: 'Yanbu Seven Sisters',
    fullName: 'Seven Sisters Offshore Pinnacles',
    country: 'Saudi Arabia',
    iso2: 'SA',
    marineRegion: 'Central Red Sea',
    lat: 24.08,
    lng: 38.05,
    svgX: 292,
    svgY: 310,
    category: 'REEF',
    categoryLabel: 'Oceanic Drop-Off',
    summary: 'A chain of deep-water barrier pinnacles 15km offshore from Yanbu al-Bahr hosting hammerhead schools.',
    slug: 'yanbu-seven-sisters',
  },
  {
    id: 'hs-al-wajh',
    name: 'Al-Wajh Barrier Lagoon',
    fullName: 'Al-Wajh Barrier Reef Lagoon',
    country: 'Saudi Arabia',
    iso2: 'SA',
    marineRegion: 'Central Red Sea',
    lat: 25.6,
    lng: 36.85,
    svgX: 240,
    svgY: 245,
    category: 'REEF',
    categoryLabel: 'Barrier Reef',
    summary: 'Over 90 pristine islands enclosing a hypersaline lagoon with hawksbill turtle nesting dunes and seagrass.',
    slug: 'al-wajh-barrier-reef',
  },
  {
    id: 'hs-dungonab',
    name: 'Dungonab Bay',
    fullName: 'Dungonab Bay & Mukkawar Island',
    country: 'Sudan',
    iso2: 'SD',
    marineRegion: 'Central Red Sea',
    lat: 20.97,
    lng: 37.15,
    svgX: 254,
    svgY: 440,
    category: 'MPA',
    categoryLabel: 'UNESCO World Heritage',
    summary: 'Globally vital nursery pastures for Dugong dugon and seasonal feeding trains of giant oceanic manta rays.',
    slug: 'dungonab-bay-mukkawar',
  },
  {
    id: 'hs-sanganeb',
    name: 'Sanganeb Atoll',
    fullName: 'Sanganeb Atoll Marine National Park',
    country: 'Sudan',
    iso2: 'SD',
    marineRegion: 'Central Red Sea',
    lat: 19.73,
    lng: 37.44,
    svgX: 266,
    svgY: 493,
    category: 'MPA',
    categoryLabel: 'UNESCO World Heritage',
    summary: 'Isolated oceanic atoll rising from 800m depth with a historic stone lighthouse and resident grey reef sharks.',
    slug: 'sanganeb-atoll',
  },
  {
    id: 'hs-farasan',
    name: 'Farasan Archipelago',
    fullName: 'Farasan Islands Marine Sanctuary',
    country: 'Saudi Arabia',
    iso2: 'SA',
    marineRegion: 'Southern Red Sea',
    lat: 16.7,
    lng: 42.12,
    svgX: 461,
    svgY: 620,
    category: 'MPA',
    categoryLabel: 'UNESCO Biosphere',
    summary: 'Archipelago of 84+ uplifted coral islands with Avicennia mangrove channels and the largest southeastern dugong herd.',
    slug: 'farasan-islands-sanctuary',
  },
  {
    id: 'hs-dahlak',
    name: 'Dahlak Archipelago',
    fullName: 'Dahlak Archipelago Marine Reserve',
    country: 'Eritrea',
    iso2: 'ER',
    marineRegion: 'Southern Red Sea',
    lat: 15.8,
    lng: 40.1,
    svgX: 377,
    svgY: 658,
    category: 'MPA',
    categoryLabel: 'Marine Reserve',
    summary: 'Over 350 islands in the southwestern shelf, supporting turbid-water coral adaptations and green turtle nesting.',
    slug: 'dahlak-archipelago',
  },
  {
    id: 'hs-kamaran',
    name: 'Kamaran Island Shoals',
    fullName: 'Kamaran Island Coral Shoals',
    country: 'Yemen',
    iso2: 'YE',
    marineRegion: 'Southern Red Sea',
    lat: 15.35,
    lng: 42.6,
    svgX: 486,
    svgY: 675,
    category: 'REEF',
    categoryLabel: 'Coastal Shoals',
    summary: 'Historic coral reef flats and sheltered mangrove channels acting as vital nurseries for coastal fisheries.',
    slug: 'kamaran-island-shoals',
  },
  {
    id: 'hs-ghoubbet',
    name: 'Ghoubbet-el-Kharab',
    fullName: 'Ghoubbet-el-Kharab Whale Shark Sanctuary',
    country: 'Djibouti',
    iso2: 'DJ',
    marineRegion: 'Bab-el-Mandeb & Gulf of Aden',
    lat: 11.53,
    lng: 42.58,
    svgX: 480,
    svgY: 838,
    category: 'SIGHTING',
    categoryLabel: 'Whale Shark Sanctuary',
    summary: 'The "Devil’s Cauldron" volcanic rift bay where seasonal winter plankton blooms host juvenile whale sharks.',
    slug: 'ghoubbet-el-kharab',
  },
];

export const BasinMap: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'MPA' | 'REEF' | 'SIGHTING'>('ALL');
  const [activeHotspot, setActiveHotspot] = useState<MapHotspot>(REAL_BASIN_HOTSPOTS[0]);

  const filteredHotspots =
    activeCategory === 'ALL'
      ? REAL_BASIN_HOTSPOTS
      : REAL_BASIN_HOTSPOTS.filter((h) => h.category === activeCategory);

  return (
    <div className="w-full space-y-6">
      {/* Layer Filter Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-rule">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          <span className="text-muted text-[11px] uppercase tracking-wider mr-1 hidden sm:inline">Layers:</span>
          {(
            [
              { key: 'ALL', label: 'All Hotspots' },
              { key: 'MPA', label: 'Marine Protected Areas' },
              { key: 'REEF', label: 'Oceanic Reefs' },
              { key: 'SIGHTING', label: 'Telemetry & Sightings' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3 py-1.5 rounded-sm border transition-colors whitespace-nowrap text-xs ${
                activeCategory === tab.key
                  ? 'bg-sea-800 text-paper border-sea-700 font-semibold'
                  : 'bg-paper-card dark:bg-sea-900/40 text-ink dark:text-paper border-rule hover:border-sea-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-muted flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Showing {filteredHotspots.length} Monitored Coordinates</span>
        </div>
      </div>

      {/* 60 / 40 Desktop Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: 60% Map Canvas */}
        <div className="lg:col-span-7 bg-[#EBE7DF] dark:bg-[#07171C] rounded-lg border border-rule overflow-hidden relative shadow-sm">
          {/* Hydrographic Map Header Info Bar */}
          <div className="p-3 bg-paper/90 dark:bg-sea-950/80 border-b border-rule flex items-center justify-between text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5 font-medium text-sea-800 dark:text-sea-400">
              <Compass className="w-3.5 h-3.5" />
              <span>Red Sea Tectonic Rift & Coastal Bathymetry</span>
            </span>
            <span>WGS84 • No Political Borders</span>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full max-w-[540px] mx-auto aspect-[600/900] p-4 select-none">
            <svg
              viewBox="0 0 600 900"
              className="w-full h-full drop-shadow-sm"
              role="img"
              aria-label="Accurate Red Sea Basin Map with Monitored Sanctuary Pins"
            >
              <defs>
                {/* Deep Rift Bathymetry Gradient */}
                <linearGradient id="deepRift" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0B3C46" />
                  <stop offset="50%" stopColor="#06252B" />
                  <stop offset="100%" stopColor="#041A1F" />
                </linearGradient>

                {/* Continental Land Mass Gradient */}
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E4DFD5" />
                  <stop offset="100%" stopColor="#DBD5C9" />
                </linearGradient>
              </defs>

              {/* Background: Shallow Littoral Water Base */}
              <rect width="600" height="900" fill="#134C58" opacity="0.35" />

              {/* Realistic Red Sea Water Body Polygon (Natural Earth Coastline Path) */}
              <path
                d="
                  M 63,62
                  L 67,99 L 86,130 L 115,177 L 121,198 L 135,225 L 161,268 L 179,305 L 196,318
                  L 219,377 L 254,440 L 257,499 L 262,520 L 302,558 L 314,566 L 350,667 L 373,684
                  L 487,776 L 510,798 L 513,819 L 480,838 L 504,835 L 540,845 L 580,784
                  L 519,793 L 509,763 L 497,700 L 486,662 L 490,637 L 480,612 L 419,518 L 385,475
                  L 339,419 L 336,385 L 332,364 L 292,310 L 259,271 L 226,221 L 194,172 L 155,145
                  L 163,90 L 161,82 L 144,124 L 134,156 L 107,135 L 86,130 L 63,62 Z
                "
                fill="url(#deepRift)"
                stroke="#1B8CA0"
                strokeWidth="1.75"
              />

              {/* Sinai Triangular Land Wedge (Separating Gulf of Suez and Gulf of Aqaba) */}
              <polygon
                points="107,135 134,156 144,124 161,82 100,50 86,90"
                fill="url(#landGradient)"
                stroke="#A8A092"
                strokeWidth="1.2"
              />

              {/* Major Island Groups */}
              {/* Dahlak Archipelago Shelf (Eritrea) */}
              <ellipse cx="385" cy="650" rx="22" ry="16" fill="#0E4450" stroke="#1B8CA0" strokeWidth="1" />
              <circle cx="380" cy="648" r="4" fill="url(#landGradient)" />
              <circle cx="392" cy="655" r="3" fill="url(#landGradient)" />
              <circle cx="372" cy="652" r="2.5" fill="url(#landGradient)" />

              {/* Farasan Archipelago Shelf (Saudi Arabia) */}
              <ellipse cx="455" cy="620" rx="20" ry="14" fill="#0E4450" stroke="#1B8CA0" strokeWidth="1" />
              <circle cx="452" cy="618" r="4.5" fill="url(#landGradient)" />
              <circle cx="462" cy="625" r="3" fill="url(#landGradient)" />

              {/* Hanish Volcanic Islands (Yemen) */}
              <circle cx="498" cy="745" r="3.5" fill="url(#landGradient)" />

              {/* Sanganeb Isolated Atoll Ring (Sudan) */}
              <circle cx="266" cy="493" r="6" fill="none" stroke="#2BB5C8" strokeWidth="1.5" />

              {/* Waterway Geographic Labels */}
              <text x="75" y="80" fill="#759FA8" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.8">
                GULF OF SUEZ
              </text>
              <text x="175" y="65" fill="#759FA8" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.8">
                GULF OF AQABA
              </text>
              <text x="210" y="340" fill="#759FA8" fontSize="11" fontFamily="serif" fontStyle="italic" letterSpacing="4" opacity="0.45">
                RED SEA RIFT
              </text>
              <text x="440" y="800" fill="#759FA8" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.8">
                BAB-EL-MANDEB
              </text>
              <text x="520" y="865" fill="#759FA8" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.8">
                GULF OF ADEN
              </text>

              {/* Soft Littoral Country Location Annotations */}
              <text x="35" y="240" fill="#888175" fontSize="9" fontFamily="monospace" opacity="0.7">EGYPT</text>
              <text x="170" y="520" fill="#888175" fontSize="9" fontFamily="monospace" opacity="0.7">SUDAN</text>
              <text x="270" y="690" fill="#888175" fontSize="9" fontFamily="monospace" opacity="0.7">ERITREA</text>
              <text x="410" y="860" fill="#888175" fontSize="8" fontFamily="monospace" opacity="0.7">DJIBOUTI</text>
              <text x="370" y="320" fill="#888175" fontSize="9" fontFamily="monospace" opacity="0.7">SAUDI ARABIA</text>
              <text x="520" y="680" fill="#888175" fontSize="9" fontFamily="monospace" opacity="0.7">YEMEN</text>
              <text x="180" y="45" fill="#888175" fontSize="8" fontFamily="monospace" opacity="0.7">JORDAN</text>

              {/* Hotspot Pins */}
              {filteredHotspots.map((hs) => {
                const isSelected = activeHotspot.id === hs.id;
                return (
                  <g
                    key={hs.id}
                    className="cursor-pointer group"
                    onClick={() => setActiveHotspot(hs)}
                  >
                    {/* Pulsing ring for active pin */}
                    {isSelected && (
                      <circle
                        cx={hs.svgX}
                        cy={hs.svgY}
                        r="14"
                        fill="#E65100"
                        opacity="0.3"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Pin Body */}
                    <circle
                      cx={hs.svgX}
                      cy={hs.svgY}
                      r={isSelected ? '6.5' : '4.5'}
                      fill={isSelected ? '#E65100' : '#2BB5C8'}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="transition-all duration-150 drop-shadow-md"
                    />

                    {/* Pin Core */}
                    <circle
                      cx={hs.svgX}
                      cy={hs.svgY}
                      r={isSelected ? '2.5' : '1.5'}
                      fill="#FFFFFF"
                    />

                    {/* Desktop Hover Label */}
                    <g className={isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}>
                      <rect
                        x={hs.svgX > 300 ? hs.svgX - 110 : hs.svgX + 8}
                        y={hs.svgY - 12}
                        width="102"
                        height="20"
                        rx="3"
                        fill="#0A181C"
                        stroke="#165B68"
                        strokeWidth="1"
                        opacity="0.95"
                      />
                      <text
                        x={hs.svgX > 300 ? hs.svgX - 59 : hs.svgX + 59}
                        y={hs.svgY + 2}
                        textAnchor="middle"
                        fill="#F7F3EC"
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        [{hs.iso2}] {hs.name.split(' ')[0]}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="p-2.5 bg-paper/90 dark:bg-sea-950/80 border-t border-rule flex items-center justify-between text-[11px] font-mono text-muted">
            <span>29.5° N (Gulf of Aqaba)</span>
            <span>11.5° N (Bab-el-Mandeb Strait)</span>
          </div>
        </div>

        {/* Right: 40% Telemetry Inspector & Complete Hotspot Chips */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active Hotspot Inspector Card */}
          <div className="p-5 sm:p-6 rounded-lg bg-paper dark:bg-sea-900/50 border border-rule space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-sea-100 dark:bg-sea-800 text-sea-800 dark:text-sea-200">
                  <MapPin className="w-3 h-3" />
                  <span>{activeHotspot.categoryLabel}</span>
                </span>
                <CoordinateTag lat={activeHotspot.lat} lng={activeHotspot.lng} />
              </div>

              <div className="pt-1 flex items-start gap-2.5">
                <CountryFlag iso2={activeHotspot.iso2} name={activeHotspot.country} className="w-5 h-3.5 mt-1 shrink-0" />
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink dark:text-paper leading-snug">
                    {activeHotspot.fullName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted pt-0.5">
                    <span>{activeHotspot.country}</span>
                    <span className="text-rule">•</span>
                    <span>{activeHotspot.marineRegion}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-sans text-sm text-muted leading-relaxed">
              {activeHotspot.summary}
            </p>

            <div className="pt-3 border-t border-rule/60 flex items-center justify-between text-xs font-mono">
              <Link
                href={`/countries/${activeHotspot.iso2.toLowerCase()}`}
                className="text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1 font-medium"
              >
                <span>{activeHotspot.country} Dossier</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              {activeHotspot.slug && (
                <Link
                  href={`/explorer/places/${activeHotspot.slug}`}
                  className="text-muted hover:text-ink dark:hover:text-paper flex items-center gap-1"
                >
                  <span>Site Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>

          {/* Complete Hotspot Chips (Full Names, Never Truncated, Clean Wrap) */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted uppercase tracking-wider block">
              Monitored Basin Hotspots ({filteredHotspots.length}):
            </span>

            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
              {filteredHotspots.map((hs) => {
                const isSelected = activeHotspot.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded border text-left transition-colors ${
                      isSelected
                        ? 'bg-sea-800 text-paper border-sea-700 font-semibold shadow-xs'
                        : 'bg-paper-card dark:bg-sea-900/30 text-ink dark:text-paper border-rule hover:border-sea-600'
                    }`}
                  >
                    <CountryFlag iso2={hs.iso2} name={hs.country} className="w-3.5 h-2.5 shrink-0" />
                    <span className="font-mono text-[10px] text-muted font-bold">[{hs.iso2}]</span>
                    <span className="font-sans font-medium">{hs.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accessible Alternative: Details element */}
          <details className="text-xs font-mono pt-1 text-muted">
            <summary className="cursor-pointer text-sea-700 dark:text-sea-500 hover:underline py-1">
              View hotspots as accessible table / list
            </summary>
            <div className="mt-2 p-3 rounded bg-paper-card dark:bg-sea-950/60 border border-rule space-y-1.5 max-h-48 overflow-y-auto">
              {REAL_BASIN_HOTSPOTS.map((hs) => (
                <div key={hs.id} className="flex items-center justify-between text-[11px] py-1 border-b border-rule/40 last:border-0">
                  <span className="font-medium">[{hs.iso2}] {hs.name}</span>
                  <span className="text-muted">{hs.lat.toFixed(2)}°N, {hs.lng.toFixed(2)}°E</span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};
