import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { CountryFlag } from '@/components/ui/country-flag';
import { SciName } from '@/components/ui/sciname';
import { CoastalTownArt, CoralArt, WadiArt, DunesArt, DugongArt } from '@/components/art/illustrations';

interface EntryTile {
  title: string;
  count: string;
  examples: string;
  art: React.ElementType;
  href: string;
}

const ENTRY_TILES: EntryTile[] = [
  {
    title: 'Coastal Towns & Historic Ports',
    count: '8 Ports',
    examples: 'Al-Quseir, Suakin, Yanbu, Aqaba, Massawa',
    art: CoastalTownArt,
    href: '/explorer/places?type=TOWN',
  },
  {
    title: 'Offshore Reefs & Atolls',
    count: '34 Atolls',
    examples: 'Sanganeb, Farasan, Daedalus, Jackson Reef',
    art: CoralArt,
    href: '/explorer/places?type=REEF',
  },
  {
    title: 'Eastern Desert & Littoral Wadis',
    count: '16 Wadis',
    examples: 'Wadi El Gemal, Asir Escarpment, Wadi Lahami',
    art: WadiArt,
    href: '/explorer/places?type=WADI',
  },
  {
    title: 'Marine Protected Areas',
    count: '28 MPAs',
    examples: 'Ras Mohammed, Dahlak Marine Park, Aqaba',
    art: DunesArt,
    href: '/explorer/places?type=PROTECTED_AREA',
  },
];

export async function ExplorerSection() {
  return (
    <section
      id="section-explorer"
      aria-labelledby="heading-explorer"
      className="w-full bg-sand-100 dark:bg-paper-card text-ink dark:text-paper py-16 md:py-24 border-y border-rule transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          index="06"
          title="Red Sea Atlas & Biogeography Explorer"
          subtitle="Explore the geographical ecosystems, geological fracture zones, and endemic species of the rift basin"
          href="/explorer"
          actionText="Open the full basin atlas"
        />

        {/* 4 Entry Category Tiles: Mobile scroll-snap / Desktop 4-col grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {ENTRY_TILES.map((tile) => {
            const Art = tile.art;
            return (
              <Link
                key={tile.title}
                href={tile.href}
                className="min-w-[82vw] sm:min-w-[280px] md:min-w-0 snap-center group p-5 rounded-md border border-rule bg-paper dark:bg-deep-sea hover:border-coral-500/50 flex flex-col justify-between transition-all"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full rounded overflow-hidden border border-rule/50">
                    <Art className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 right-2 bg-sea-900/80 text-paper text-[10px] font-mono px-2 py-0.5 rounded">
                      {tile.count}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-bold text-ink dark:text-paper group-hover:text-coral-500 transition-colors leading-snug">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-muted font-sans mt-1.5 leading-relaxed">
                      {tile.examples}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-rule/50 mt-3 flex items-center justify-between text-xs font-sans text-coral-600 dark:text-coral-400 font-medium">
                  <span>Explore places</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* "Explore the Red Sea" Photo Cards: 2 Places + 1 Species (Large) */}
        <div className="space-y-6 pt-4 border-t border-rule">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Featured Geography & Keystone Taxa
            </h3>
            <span className="text-xs font-mono text-muted">Field Archive Cards</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Place 1: Sanganeb Atoll (Sudan) (4 cols) */}
            <div className="lg:col-span-4 p-5 rounded-md bg-paper dark:bg-deep-sea border border-rule flex flex-col justify-between space-y-4 hover:border-coral-500/40 transition-colors">
              <div className="space-y-3">
                <div className="relative aspect-[16/10] w-full rounded overflow-hidden border border-rule/50">
                  <Image
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                    alt="Sanganeb Atoll coral wall and lighthouse, Sudan"
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <CountryFlag iso2="SD" size="sm" showBadge />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-muted">
                  <CoordinateTag lat={19.728} lng={37.442} />
                  <span>• Central Red Sea</span>
                </div>

                <h4 className="font-serif text-lg font-bold text-ink dark:text-paper leading-snug">
                  Sanganeb Atoll Marine National Park
                </h4>

                <p className="text-xs text-muted font-sans leading-relaxed line-clamp-3">
                  Sudan’s premier oceanic atoll rising abruptly from an 800m abyssal plain 25km northeast of Port Sudan. UNESCO World Heritage designated for sheer reef walls, schooling pelagics, and pristine coral density.
                </p>
              </div>

              <div className="pt-3 border-t border-rule flex items-center justify-between text-xs font-sans">
                <span className="text-muted font-mono text-[11px]">Category: MPA / Atoll</span>
                <Link
                  href="/explorer/places/sanganeb-atoll"
                  className="text-coral-600 dark:text-coral-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Place 2: Aqaba Marine Reserve (Jordan) (4 cols) */}
            <div className="lg:col-span-4 p-5 rounded-md bg-paper dark:bg-deep-sea border border-rule flex flex-col justify-between space-y-4 hover:border-coral-500/40 transition-colors">
              <div className="space-y-3">
                <div className="relative aspect-[16/10] w-full rounded overflow-hidden border border-rule/50">
                  <Image
                    src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=600&q=80"
                    alt="Fringing coral reef gardens in Aqaba Marine Reserve, Jordan"
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <CountryFlag iso2="JO" size="sm" showBadge />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-muted">
                  <CoordinateTag lat={29.43} lng={34.97} />
                  <span>• Gulf of Aqaba</span>
                </div>

                <h4 className="font-serif text-lg font-bold text-ink dark:text-paper leading-snug">
                  Aqaba Marine Reserve & Japanese Garden
                </h4>

                <p className="text-xs text-muted font-sans leading-relaxed line-clamp-3">
                  Guarding Jordan’s northern Gulf of Aqaba coast. Shelters over 150 species of hard corals that demonstrate global-benchmark thermal tolerance against marine heatwaves.
                </p>
              </div>

              <div className="pt-3 border-t border-rule flex items-center justify-between text-xs font-sans">
                <span className="text-muted font-mono text-[11px]">Category: Marine Reserve</span>
                <Link
                  href="/explorer/places/aqaba-marine-reserve"
                  className="text-coral-600 dark:text-coral-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Species (Large Featured Card): Dugong (4 cols) */}
            <div className="lg:col-span-4 p-5 rounded-md bg-paper dark:bg-deep-sea border border-rule flex flex-col justify-between space-y-4 hover:border-coral-500/40 transition-colors">
              <div className="space-y-3">
                <div className="relative aspect-[16/10] w-full rounded overflow-hidden border border-rule/50">
                  <DugongArt className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-amber-500/90 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    IUCN: Vulnerable (VU)
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-muted">
                  <span className="font-semibold text-coral-600 dark:text-coral-400">Keystone Sirenian</span>
                  <span>•</span>
                  <span>Halodule / Halophila Meadows</span>
                </div>

                <h4 className="font-serif text-lg font-bold text-ink dark:text-paper leading-snug">
                  Dugong (Sea Cow)
                </h4>

                <p className="text-xs text-muted font-sans leading-relaxed">
                  Taxon: <SciName className="font-medium text-ink dark:text-paper">Dugong dugon</SciName>. Herbivorous marine mammal requiring sheltered shallow bays with intact seagrass cover. Red Sea populations represent critical genetic refugia.
                </p>
              </div>

              <div className="pt-3 border-t border-rule flex items-center justify-between text-xs font-sans">
                <span className="text-muted font-mono text-[11px]">Protected Pan-Basin</span>
                <Link
                  href="/explorer/species/dugong-dugon"
                  className="text-coral-600 dark:text-coral-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Species profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
