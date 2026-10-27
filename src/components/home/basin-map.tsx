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
import clsx from 'clsx';

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
    svgX: 182,
    svgY: 82,
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
    svgX: 148,
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
    svgX: 130,
    svgY: 182,
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
    svgX: 172,
    svgY: 262,
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
    svgX: 298,
    svgY: 312,
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
    svgX: 248,
    svgY: 248,
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
    svgX: 258,
    svgY: 442,
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
    svgX: 270,
    svgY: 494,
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
    svgX: 466,
    svgY: 622,
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
    svgX: 382,
    svgY: 660,
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
    svgX: 490,
    svgY: 676,
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
    svgX: 484,
    svgY: 840,
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
          ).map((tab) => {
            const isSelected = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="button"
                aria-pressed={isSelected}
                aria-label={`Filter by ${tab.label}`}
                onClick={() => setActiveCategory(tab.key)}
                className={clsx(
                  'px-3 py-1.5 rounded-sm border transition-colors whitespace-nowrap text-xs font-mono font-medium',
                  isSelected
                    ? 'bg-sea-800 text-paper border-sea-700 font-semibold shadow-xs dark:bg-coral-950/70 dark:border-coral-400 dark:text-paper'
                    : 'bg-paper-card dark:bg-sea-900/40 text-ink dark:text-paper border-rule hover:border-sea-600 hover:bg-sand-100 dark:hover:bg-sea-800/50'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-muted flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Showing {filteredHotspots.length} Monitored Coordinates</span>
        </div>
      </div>

      {/* 60 / 40 Desktop Split Layout: Equal Height */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left: 60% Map Canvas */}
        <div className="lg:col-span-7 bg-[#EBE7DF] dark:bg-[#07171C] rounded-lg border border-rule overflow-hidden relative shadow-sm flex flex-col justify-between">
          {/* Hydrographic Map Header Info Bar */}
          <div className="p-3 bg-paper/95 dark:bg-sea-950/90 border-b border-rule flex items-center justify-between text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5 font-medium text-sea-800 dark:text-sea-400">
              <Compass className="w-3.5 h-3.5" />
              <span>Red Sea Tectonic Rift & Coastal Bathymetry</span>
            </span>
            <span className="hidden sm:inline">WGS84 • No Political Borders</span>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full max-w-[560px] mx-auto aspect-[600/900] p-4 select-none flex items-center justify-center">
            <svg
              viewBox="0 0 600 900"
              className="w-full h-full drop-shadow-sm"
              role="img"
              aria-label="Accurate Red Sea Basin Map with Monitored Sanctuary Pins and 7 Coastal State Annotations"
            >
              <defs>
                {/* Deep Axial Trough Gradient (>1000m depth) */}
                <linearGradient id="axialTrough" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0B3C46" />
                  <stop offset="50%" stopColor="#052227" />
                  <stop offset="100%" stopColor="#021418" />
                </linearGradient>

                {/* Continental Land Mass Gradient */}
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E6E0D5" />
                  <stop offset="100%" stopColor="#D8D1C3" />
                </linearGradient>

                {/* Shelf Gradient */}
                <linearGradient id="shelfGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1B606E" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0F3B44" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Background: Shallow Littoral Water Base */}
              <rect width="600" height="900" fill="#134C58" opacity="0.28" />

              {/* Bathymetric Shelf Platform Outline (0-200m) */}
              <path
                d="
                  M 58,58
                  L 64,98 L 82,128 L 110,175 L 118,198 L 130,225 L 155,268 L 174,305 L 190,318
                  L 212,377 L 248,440 L 250,499 L 255,520 L 295,558 L 308,566 L 342,667 L 368,684
                  L 480,776 L 504,798 L 508,822 L 476,842 L 504,838 L 544,848 L 585,786
                  L 522,796 L 512,765 L 500,702 L 490,664 L 494,639 L 484,614 L 424,520 L 390,477
                  L 344,421 L 340,387 L 336,366 L 296,312 L 264,273 L 230,223 L 198,174 L 160,147
                  L 186,80 L 180,74 L 148,124 L 138,156 L 105,134 L 84,128 L 58,58 Z
                "
                fill="url(#shelfGradient)"
                stroke="#1B8CA0"
                strokeWidth="1.2"
                opacity="0.8"
              />

              {/* Central Deep Axial Rift Water Polygon (Natural Earth Derived Geometry) */}
              <path
                d="
                  M 67,64
                  L 71,99 L 88,130 L 116,177 L 123,198 L 136,225 L 162,268 L 180,305 L 197,318
                  L 220,377 L 255,440 L 258,499 L 263,520 L 303,558 L 315,566 L 351,667 L 374,684
                  L 488,776 L 511,798 L 514,819 L 481,838 L 505,835 L 541,845 L 581,784
                  L 520,793 L 510,763 L 498,700 L 487,662 L 491,637 L 481,612 L 420,518 L 386,475
                  L 340,419 L 337,385 L 333,364 L 293,310 L 260,271 L 227,221 L 195,172 L 156,145
                  L 182,82 L 178,76 L 145,124 L 135,156 L 108,135 L 87,130 L 67,64 Z
                "
                fill="url(#axialTrough)"
                stroke="#2BB5C8"
                strokeWidth="1.8"
              />

              {/* Sinai Triangular Land Wedge (Separating Gulf of Suez and Gulf of Aqaba) */}
              <polygon
                points="108,135 135,156 145,124 178,76 112,46 88,88"
                fill="url(#landGradient)"
                stroke="#A8A092"
                strokeWidth="1.2"
              />

              {/* Island Groups & Tectonic Features */}
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
              <circle cx="270" cy="494" r="6.5" fill="none" stroke="#2BB5C8" strokeWidth="1.6" />

              {/* Waterway Geographic Labels */}
              <text x="75" y="80" fill="#759FA8" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.85">
                GULF OF SUEZ
              </text>
              <text x="188" y="65" fill="#759FA8" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.85">
                GULF OF AQABA
              </text>
              <text x="210" y="340" fill="#759FA8" fontSize="11" fontFamily="serif" fontStyle="italic" letterSpacing="4" opacity="0.45">
                RED SEA RIFT
              </text>
              <text x="440" y="800" fill="#759FA8" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.85">
                BAB-EL-MANDEB
              </text>
              <text x="520" y="865" fill="#759FA8" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.85">
                GULF OF ADEN
              </text>

              {/* Soft Littoral Country Labels (Strictly 7 Coastal Countries, size ≥ 12px, High-Contrast Halo) */}
              <g
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  letterSpacing: '0.06em',
                  paintOrder: 'stroke fill',
                  strokeWidth: '3.5px',
                  strokeLinejoin: 'round',
                }}
                className="fill-ink/90 stroke-paper dark:fill-paper dark:stroke-sea-950 transition-colors"
              >
                {/* 1. Jordan (Northern Gulf of Aqaba) */}
                <text x="195" y="46" textAnchor="start">JORDAN</text>

                {/* 2. Egypt (Western Littoral, Northern Basin) */}
                <text x="34" y="218" textAnchor="start">EGYPT</text>

                {/* 3. Saudi Arabia (Eastern Littoral, Central Basin) */}
                <text x="362" y="306" textAnchor="start">SAUDI ARABIA</text>

                {/* 4. Sudan (Western Littoral, Central Basin) */}
                <text x="146" y="505" textAnchor="start">SUDAN</text>

                {/* 5. Eritrea (Southwestern Shelf & Dahlak) */}
                <text x="250" y="694" textAnchor="start">ERITREA</text>

                {/* 6. Yemen (Southeastern Littoral & Hanish) */}
                <text x="508" y="675" textAnchor="start">YEMEN</text>

                {/* 7. Djibouti (Southern Strait / Bab-el-Mandeb) */}
                <text x="390" y="872" textAnchor="start">DJIBOUTI</text>
              </g>

              {/* Hotspot Pins (Interactive + Keyboard Navigable) */}
              {filteredHotspots.map((hs) => {
                const isSelected = activeHotspot.id === hs.id;
                return (
                  <g
                    key={hs.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${hs.fullName}, ${hs.country}`}
                    aria-pressed={isSelected}
                    className="cursor-pointer group outline-none focus:outline-none"
                    onClick={() => setActiveHotspot(hs)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveHotspot(hs);
                      }
                    }}
                  >
                    {/* Pulsing ring for active pin */}
                    {isSelected && (
                      <circle
                        cx={hs.svgX}
                        cy={hs.svgY}
                        r="14"
                        fill="#E65100"
                        opacity="0.35"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Pin Body */}
                    <circle
                      cx={hs.svgX}
                      cy={hs.svgY}
                      r={isSelected ? '7' : '4.8'}
                      fill={
                        isSelected
                          ? '#E65100'
                          : hs.category === 'MPA'
                          ? '#E4573D'
                          : hs.category === 'REEF'
                          ? '#2BB5C8'
                          : '#10B981'
                      }
                      stroke="#FFFFFF"
                      strokeWidth="1.6"
                      className="transition-all duration-150 drop-shadow-md group-focus:stroke-coral-400 group-focus:stroke-2"
                    />

                    {/* Pin Core */}
                    <circle
                      cx={hs.svgX}
                      cy={hs.svgY}
                      r={isSelected ? '2.5' : '1.5'}
                      fill="#FFFFFF"
                    />

                    {/* Hover / Active Badge */}
                    <g className={isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none'}>
                      <rect
                        x={hs.svgX > 300 ? hs.svgX - 116 : hs.svgX + 8}
                        y={hs.svgY - 13}
                        width="110"
                        height="22"
                        rx="4"
                        fill="#0A181C"
                        stroke="#165B68"
                        strokeWidth="1.2"
                        opacity="0.96"
                      />
                      <text
                        x={hs.svgX > 300 ? hs.svgX - 61 : hs.svgX + 63}
                        y={hs.svgY + 2}
                        textAnchor="middle"
                        fill="#F7F3EC"
                        fontSize="9"
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

          {/* Hydrographic Sub-Basin Limits Footer */}
          <div className="p-2.5 bg-paper/95 dark:bg-sea-950/90 border-t border-rule flex items-center justify-between text-[11px] font-mono text-muted">
            <span>29.5° N (Gulf of Aqaba Apex)</span>
            <span>11.5° N (Bab-el-Mandeb Gateway)</span>
          </div>
        </div>

        {/* Right: 40% Telemetry Inspector & Complete Hotspot Chips & Mini Legend */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Active Hotspot Inspector Card */}
          <div className="p-5 sm:p-6 rounded-lg bg-paper dark:bg-sea-900/50 border border-rule space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-sea-100 dark:bg-sea-800 text-sea-800 dark:text-sea-200">
                  <MapPin className="w-3 h-3 text-coral-500" />
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
                    <span className="font-semibold text-ink/80 dark:text-paper/80">{activeHotspot.country}</span>
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
                className="text-sea-700 dark:text-sea-400 hover:text-coral-500 hover:underline flex items-center gap-1 font-medium"
              >
                <span>{activeHotspot.country} Coastal Dossier</span>
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

          {/* Complete Hotspot Chips: Fixed Contrast & High Legibility */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted uppercase tracking-wider block font-semibold">
                Monitored Hotspots ({filteredHotspots.length}):
              </span>
              <span className="text-[11px] font-mono text-muted">Click or focus to pin</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {filteredHotspots.map((hs) => {
                const isSelected = activeHotspot.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    type="button"
                    role="button"
                    aria-pressed={isSelected}
                    aria-label={`${hs.name}, ${hs.country} (${hs.iso2})`}
                    onClick={() => setActiveHotspot(hs)}
                    className={clsx(
                      'flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded border text-left transition-all',
                      isSelected
                        ? 'bg-sea-800 text-paper border-sea-700 font-semibold shadow-xs dark:bg-coral-950/70 dark:border-coral-400 dark:text-paper'
                        : 'bg-paper-card dark:bg-sea-900/30 text-ink dark:text-paper border-rule hover:border-sea-600 hover:bg-sand-100 dark:hover:bg-sea-800/40'
                    )}
                  >
                    <CountryFlag iso2={hs.iso2} name={hs.country} className="w-3.5 h-2.5 shrink-0" />
                    <span
                      className={clsx(
                        'font-mono text-[10px] font-bold',
                        isSelected ? 'text-coral-300' : 'text-muted'
                      )}
                    >
                      [{hs.iso2}]
                    </span>
                    <span
                      className={clsx(
                        'font-sans font-medium',
                        isSelected ? 'text-paper' : 'text-ink dark:text-paper'
                      )}
                    >
                      {hs.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini Legend (Section 5 Requirement) */}
          <div className="p-3 rounded border border-rule bg-sand-50 dark:bg-sea-950/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4573D] border border-white shrink-0" />
              <span className="text-muted text-[11px]">Marine Protected Area</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2BB5C8] border border-white shrink-0" />
              <span className="text-muted text-[11px]">Oceanic Reef / Atoll</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-white shrink-0" />
              <span className="text-muted text-[11px]">Telemetry Sighting</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#052227] border border-[#2BB5C8] shrink-0" />
              <span className="text-muted text-[11px]">Axial Rift (&gt;1000m)</span>
            </div>
          </div>

          {/* Accessible Alternative: Details element */}
          <details className="text-xs font-mono pt-1 text-muted">
            <summary className="cursor-pointer text-sea-700 dark:text-sea-400 hover:underline py-1">
              View hotspots as accessible table / list
            </summary>
            <div className="mt-2 p-3 rounded bg-paper-card dark:bg-sea-950/60 border border-rule space-y-1.5 max-h-44 overflow-y-auto">
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
