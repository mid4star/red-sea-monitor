'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, MapPin, ArrowRight, ShieldCheck, Waves, Info } from 'lucide-react';
import { SEED_COUNTRIES, SEED_MARINE_REGIONS } from '@/lib/seed-data';
import { CoordinateTag } from '@/components/ui/coordinate-tag';

interface Hotspot {
  id: string;
  name: string;
  country: string;
  flag: string;
  countryIso2: string;
  marineRegion: string;
  lat: number;
  lng: number;
  // Normalized SVG coordinates on a 400x700 viewBox
  svgX: number;
  svgY: number;
  summary: string;
  type: string;
}

const BASIN_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-aqaba',
    name: 'Aqaba Marine Reserve',
    country: 'Jordan',
    flag: '🇯🇴',
    countryIso2: 'jo',
    marineRegion: 'Gulf of Aqaba',
    lat: 29.43,
    lng: 34.97,
    svgX: 168,
    svgY: 55,
    summary: 'Flagship marine reserve protecting hyper-thermotolerant corals resisting global heatwaves.',
    type: 'Marine Reserve',
  },
  {
    id: 'hs-ras-moh',
    name: 'Ras Mohammed',
    country: 'Egypt',
    flag: '🇪🇬',
    countryIso2: 'eg',
    marineRegion: 'Northern Red Sea',
    lat: 27.72,
    lng: 34.25,
    svgX: 130,
    svgY: 105,
    summary: 'Sinai peninsula apex where the Gulf of Suez converges with the deep tectonic Gulf of Aqaba.',
    type: 'National Park',
  },
  {
    id: 'hs-elphinstone',
    name: 'Elphinstone Reef',
    country: 'Egypt',
    flag: '🇪🇬',
    countryIso2: 'eg',
    marineRegion: 'Central Red Sea',
    lat: 25.31,
    lng: 34.86,
    svgX: 155,
    svgY: 180,
    summary: 'Isolated oceanic pinnacle in open water renowned for oceanic whitetip shark telemetry.',
    type: 'Oceanic Pinnacle',
  },
  {
    id: 'hs-yanbu',
    name: 'Yanbu Seven Sisters',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    countryIso2: 'sa',
    marineRegion: 'Central Red Sea',
    lat: 24.08,
    lng: 37.82,
    svgX: 245,
    svgY: 220,
    summary: 'Deep-water barrier drop-offs and hammerhead schooling corridors off the Hejaz coast.',
    type: 'Barrier Pinnacles',
  },
  {
    id: 'hs-dungonab',
    name: 'Dungonab Bay & Mukkawar',
    country: 'Sudan',
    flag: '🇸🇩',
    countryIso2: 'sd',
    marineRegion: 'Central Red Sea',
    lat: 20.97,
    lng: 37.15,
    svgX: 215,
    svgY: 335,
    summary: 'UNESCO World Heritage site harboring a globally vital breeding herd of dugongs and giant manta rays.',
    type: 'World Heritage Site',
  },
  {
    id: 'hs-sanganeb',
    name: 'Sanganeb Atoll',
    country: 'Sudan',
    flag: '🇸🇩',
    countryIso2: 'sd',
    marineRegion: 'Central Red Sea',
    lat: 19.72,
    lng: 37.44,
    svgX: 230,
    svgY: 380,
    summary: 'Isolated oceanic coral atoll rising from 800m depth with 30-year shark philopatry records.',
    type: 'World Heritage Atoll',
  },
  {
    id: 'hs-farasan',
    name: 'Farasan Archipelago',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    countryIso2: 'sa',
    marineRegion: 'Southern Red Sea',
    lat: 16.70,
    lng: 42.12,
    svgX: 335,
    svgY: 480,
    summary: 'UNESCO Biosphere Reserve with 84+ coral islands, mangrove labyrinths, and dugong pastures.',
    type: 'Biosphere Reserve',
  },
  {
    id: 'hs-dahlak',
    name: 'Dahlak Archipelago',
    country: 'Eritrea',
    flag: '🇪🇷',
    countryIso2: 'er',
    marineRegion: 'Southern Red Sea',
    lat: 15.80,
    lng: 40.10,
    svgX: 285,
    svgY: 515,
    summary: 'Over 350 islands in the southwestern shelf, hosting turbid-water coral refugia and turtle rookeries.',
    type: 'Marine Reserve',
  },
  {
    id: 'hs-kamaran',
    name: 'Kamaran Island Shoals',
    country: 'Yemen',
    flag: '🇾🇪',
    countryIso2: 'ye',
    marineRegion: 'Southern Red Sea',
    lat: 15.35,
    lng: 42.60,
    svgX: 345,
    svgY: 535,
    summary: 'Shallow coral shelves and mangrove deltas sustaining essential artisanal nursery grounds.',
    type: 'Coastal Shoals',
  },
  {
    id: 'hs-ghoubbet',
    name: 'Ghoubbet-el-Kharab',
    country: 'Djibouti',
    flag: '🇩🇯',
    countryIso2: 'dj',
    marineRegion: 'Bab-el-Mandeb & Gulf of Aden',
    lat: 11.53,
    lng: 42.58,
    svgX: 350,
    svgY: 650,
    summary: 'The "Devil’s Cauldron" volcanic rift bay hosting world-class juvenile whale shark aggregations.',
    type: 'Whale Shark Sanctuary',
  },
];

export const BasinGlanceSection: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(BASIN_HOTSPOTS[0]);

  return (
    <section
      aria-labelledby="basin-glance-heading"
      className="w-full border-b border-rule bg-paper-card/70 dark:bg-deep-sea py-12 md:py-16 transition-colors overflow-hidden"
    >
      <div className="max-w-content mx-auto px-4 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-rule">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-sea-700 dark:text-sea-500 uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4 stroke-[1.5]" />
              <span>Regional Overview • حوض البحر الأحمر</span>
            </div>
            <h2
              id="basin-glance-heading"
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink dark:text-paper"
            >
              The Basin at a Glance
            </h2>
            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
              A single tectonic rift and transboundary ecosystem spanning eight littoral shores, over 6,400 kilometers of reef crest, and the planet’s premier evolutionary coral thermal refugia.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/explorer"
              className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Open Spatial Gazetteer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md bg-paper dark:bg-sea-900/40 border border-rule space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
              Littoral Coast
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-sea-800 dark:text-sea-400">
              6,450+
              <span className="text-sm font-sans font-normal text-muted ml-1">km</span>
            </div>
            <p className="text-[11px] text-muted">From Suez & Aqaba to Bab-el-Mandeb</p>
          </div>

          <div className="p-4 rounded-md bg-paper dark:bg-sea-900/40 border border-rule space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
              Marine Protected Areas
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-sea-800 dark:text-sea-400">
              28+
              <span className="text-sm font-sans font-normal text-muted ml-1">MPAs</span>
            </div>
            <p className="text-[11px] text-muted">UNESCO atolls, reserves & biosphere zones</p>
          </div>

          <div className="p-4 rounded-md bg-paper dark:bg-sea-900/40 border border-rule space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
              Hard Coral Taxa
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-sea-800 dark:text-sea-400">
              350+
              <span className="text-sm font-sans font-normal text-muted ml-1">Species</span>
            </div>
            <p className="text-[11px] text-muted">Thermo-tolerant scleractinian diversity</p>
          </div>

          <div className="p-4 rounded-md bg-paper dark:bg-sea-900/40 border border-rule space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
              Basin Members
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-sea-800 dark:text-sea-400">
              7 Active
              <span className="text-sm font-sans font-normal text-muted ml-1">States</span>
            </div>
            <p className="text-[11px] text-muted">+ 1 Gulf of Aden partner in baseline</p>
          </div>
        </div>

        {/* Horizontal Country Chip Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>Sovereign Coastline Dossiers:</span>
            <span className="hidden sm:inline">Click to explore country hub</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {SEED_COUNTRIES.map((ctry) => {
              const isComingSoon = ctry.status === 'COMING_SOON';
              return (
                <Link
                  key={ctry.iso2}
                  href={`/countries/${ctry.iso2.toLowerCase()}`}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs whitespace-nowrap transition-all shrink-0 ${
                    isComingSoon
                      ? 'bg-paper dark:bg-sea-900/20 border-dashed border-rule opacity-60 hover:opacity-100'
                      : 'bg-paper dark:bg-sea-900/40 border-rule hover:border-sea-600 hover:shadow-sm'
                  }`}
                >
                  <span className="text-base">{ctry.flag_emoji}</span>
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

        {/* Interactive Basin Map & Hotspot Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Map Left: SVG Visualization of the Red Sea Rift */}
          <div className="lg:col-span-7 bg-paper dark:bg-sea-950/60 p-4 sm:p-6 rounded-lg border border-rule relative">
            <div className="flex items-center justify-between text-xs font-mono text-muted pb-3 border-b border-rule">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Interactive Hydrographic Hotspots</span>
              </span>
              <span className="text-[11px]">Hover or tap a pin</span>
            </div>

            <div className="relative w-full max-w-md mx-auto aspect-[4/6] py-2 flex items-center justify-center">
              {/* Stylized SVG Map of the Red Sea Rift */}
              <svg
                viewBox="0 0 400 700"
                className="w-full h-full max-h-[520px] select-none"
                aria-label="Red Sea Basin Map"
              >
                <defs>
                  {/* Subtle bathymetry gradients */}
                  <linearGradient id="riftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0D3B43" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#08282E" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#051B20" stopOpacity="1" />
                  </linearGradient>

                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Continental Land Mass Outlines (Stylized Red Sea Tectonic Rift) */}
                {/* African Western Coastline */}
                <path
                  d="M 105,30
                     C 100,50 95,80 115,115
                     C 125,135 135,160 140,195
                     C 145,230 160,265 180,310
                     C 195,340 205,370 215,405
                     C 225,440 240,480 260,520
                     C 275,550 300,590 325,620
                     C 335,635 345,655 350,670"
                  fill="none"
                  stroke="#9AAEB4"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  className="opacity-40"
                />

                {/* Arabian Eastern Coastline */}
                <path
                  d="M 180,45
                     C 170,80 165,110 185,145
                     C 200,175 220,210 245,245
                     C 265,275 285,320 305,370
                     C 325,415 345,465 365,515
                     C 380,555 390,600 380,640
                     C 375,655 365,665 355,675"
                  fill="none"
                  stroke="#9AAEB4"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  className="opacity-40"
                />

                {/* The Red Sea Deep Water Body Polygon */}
                <polygon
                  points="
                    110,35 135,85 155,145 175,205 205,270 225,335 245,395 275,465 305,530 335,595 352,655
                    370,645 355,590 335,510 310,430 285,350 255,270 225,190 195,120 180,50 170,45 150,75 125,45
                  "
                  fill="url(#riftGradient)"
                  stroke="#165B68"
                  strokeWidth="1.5"
                  className="opacity-75"
                />

                {/* Northern Twin Gulfs (Suez on West, Aqaba on East) */}
                {/* Gulf of Suez */}
                <path
                  d="M 95,20 Q 110,40 125,75"
                  fill="none"
                  stroke="#165B68"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="opacity-60"
                />
                {/* Gulf of Aqaba */}
                <path
                  d="M 172,35 Q 165,60 148,90"
                  fill="none"
                  stroke="#165B68"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="opacity-60"
                />

                {/* Bathymetry Depth Axis Line */}
                <line
                  x1="140"
                  y1="90"
                  x2="352"
                  y2="655"
                  stroke="#2BB5C8"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  className="opacity-30"
                />

                {/* Hotspot Markers */}
                {BASIN_HOTSPOTS.map((hs) => {
                  const isSelected = activeHotspot.id === hs.id;
                  return (
                    <g
                      key={hs.id}
                      className="cursor-pointer transition-transform group"
                      onClick={() => setActiveHotspot(hs)}
                      onMouseEnter={() => setActiveHotspot(hs)}
                    >
                      {/* Pulse Circle for active hotspot */}
                      {isSelected && (
                        <circle
                          cx={hs.svgX}
                          cy={hs.svgY}
                          r="14"
                          fill="#E65100"
                          opacity="0.25"
                          className="animate-ping"
                        />
                      )}

                      {/* Base pin outer ring */}
                      <circle
                        cx={hs.svgX}
                        cy={hs.svgY}
                        r={isSelected ? '7' : '5'}
                        fill={isSelected ? '#E65100' : '#2BB5C8'}
                        stroke="#F7F3EC"
                        strokeWidth="1.5"
                        className="transition-all duration-150 drop-shadow"
                      />

                      {/* Inner core */}
                      <circle
                        cx={hs.svgX}
                        cy={hs.svgY}
                        r={isSelected ? '3' : '2'}
                        fill="#FFFFFF"
                      />

                      {/* Hotspot label on desktop hover/select */}
                      {isSelected && (
                        <g>
                          <rect
                            x={hs.svgX > 200 ? hs.svgX - 110 : hs.svgX + 12}
                            y={hs.svgY - 14}
                            width="100"
                            height="22"
                            rx="3"
                            fill="#0A181C"
                            stroke="#165B68"
                            strokeWidth="1"
                            opacity="0.95"
                          />
                          <text
                            x={hs.svgX > 200 ? hs.svgX - 60 : hs.svgX + 62}
                            y={hs.svgY + 1}
                            textAnchor="middle"
                            fill="#F7F3EC"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {hs.flag} {hs.name.split(' ')[0]}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-2 border-t border-rule/60">
              <span>Suez / Aqaba (29.5° N)</span>
              <span>Bab-el-Mandeb (11.5° N)</span>
            </div>
          </div>

          {/* Map Right: Selected Hotspot Telemetry Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-lg bg-paper dark:bg-sea-900/50 border border-rule space-y-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-sea-100 dark:bg-sea-800 text-sea-800 dark:text-sea-200">
                    <MapPin className="w-3 h-3" />
                    <span>{activeHotspot.type}</span>
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink dark:text-paper pt-1">
                    {activeHotspot.flag} {activeHotspot.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted">
                    <span>{activeHotspot.country}</span>
                    <span className="text-rule">•</span>
                    <span>{activeHotspot.marineRegion}</span>
                  </div>
                </div>

                <CoordinateTag lat={activeHotspot.lat} lng={activeHotspot.lng} />
              </div>

              <p className="font-sans text-sm text-muted leading-relaxed">
                {activeHotspot.summary}
              </p>

              <div className="pt-2 border-t border-rule/60 flex items-center justify-between">
                <Link
                  href={`/countries/${activeHotspot.countryIso2}`}
                  className="text-xs font-mono font-medium text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
                >
                  <span>Explore {activeHotspot.country} Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/explorer"
                  className="text-xs font-mono text-muted hover:text-ink dark:hover:text-paper"
                >
                  Gazetteer →
                </Link>
              </div>
            </div>

            {/* Quick Pin Selector List for Mobile Touch */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">
                Quick Hotspots:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {BASIN_HOTSPOTS.map((hs) => {
                  const isSelected = activeHotspot.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setActiveHotspot(hs)}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        isSelected
                          ? 'bg-sea-800 text-paper border-sea-700 font-semibold'
                          : 'bg-paper-card dark:bg-sea-900/30 text-ink dark:text-paper border-rule hover:border-sea-600'
                      }`}
                    >
                      <span className="mr-1">{hs.flag}</span>
                      <span>{hs.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
