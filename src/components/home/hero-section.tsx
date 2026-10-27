import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, PlusCircle, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SampleBadge } from '@/components/ui/sample-badge';
import { SciName } from '@/components/ui/sciname';
import { HeroIllustrationFallback } from '@/components/art/illustrations';
import { getBasinStats } from '@/lib/basin-stats';

export async function HeroSection() {
  const stats = await getBasinStats();

  return (
    <header
      id="section-hero"
      data-tone="dark"
      className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center bg-sea-900 text-paper overflow-hidden"
    >
      {/* Background Media: High-res reef photo with dark scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80"
          alt="Coral reef drop-off teeming with Anthias fish in the Red Sea"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-55 dark:opacity-40"
        />

        {/* Scrim gradient: bottom-to-top on mobile, left-to-right on desktop for >= 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-sea-900 via-sea-900/85 to-sea-900/30 sm:bg-gradient-to-r sm:from-sea-900 sm:via-sea-900/90 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-900/60 via-transparent to-sea-900/40" />
      </div>

      {/* Hero Content Container (py-12 on mobile = 48px, py-24 on desktop) */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Masthead */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-coral-500/20 text-coral-400 border border-coral-500/30 text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-pulse" />
                Live Field Dispatch
              </span>
              <CoordinateTag lat={20.0} lng={38.0} tone="dark" />
              <SampleBadge tone="dark" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-paper leading-[1.08] max-w-2xl">
              From Suez to Bab-el-Mandeb: one sea, many shores.
            </h1>

            <p className="font-sans text-base sm:text-lg text-paper/85 max-w-2xl leading-relaxed">
              An independent editorial and science archive monitoring marine biodiversity, endemic taxa, artisanal coastal heritage, and coral thermal refugia across the entire Red Sea rift basin.
            </p>

            {/* Action Buttons: Full-width stacked on mobile, side-by-side on desktop, 48px touch targets */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <Link href="/watch" className="w-full sm:w-auto">
                <Button variant="coral" size="lg" className="w-full sm:w-auto min-h-[48px] px-6 text-base gap-2 justify-center font-medium shadow-md">
                  <Eye className="w-5 h-5" />
                  <span>Explore Live Sightings</span>
                </Button>
              </Link>
              <Link href="/watch/submit" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px] px-6 text-base gap-2 justify-center border-paper/40 text-paper hover:bg-paper/10 font-medium"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Submit Observation</span>
                </Button>
              </Link>
            </div>

            {/* Live Telemetry Mini-Counters: Clean 3-Column Grid without orphan bullets */}
            <div className="pt-6 border-t border-paper/15 grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-8 text-xs font-mono text-paper/85">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-semibold text-paper text-base sm:text-sm">{stats.littoral_states}</span>
                </div>
                <span className="text-[11px] sm:text-xs text-paper/75">Coastal Countries</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-paper text-base sm:text-sm">6</span>
                <span className="text-[11px] sm:text-xs text-paper/75">Marine Sub-Basins</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-paper text-base sm:text-sm">12</span>
                <span className="text-[11px] sm:text-xs text-paper/75">Basin Sanctuaries</span>
              </div>
            </div>

            {/* Photo attribution: Real credit directly displayed */}
            <div className="pt-1">
              <p className="text-[11px] font-mono text-paper/60">
                Photo: Sebastian Pena Lambarri (Unsplash License)
              </p>
            </div>
          </div>

          {/* Right Column (Desktop >= 1100px): Floating Field Note Card */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="relative bg-paper/10 backdrop-blur-md border border-paper/20 rounded-md p-5 shadow-2xl space-y-4 hover:border-coral-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-coral-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Field Record</span>
                </span>
                <span className="text-[10px] font-mono bg-paper/20 px-2 py-0.5 rounded text-paper">
                  SAMPLE
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-paper/60">
                  <CoordinateTag lat={27.98} lng={34.45} />
                  <span>• Straits of Tiran</span>
                </div>
                <h2 className="font-serif text-lg font-bold text-paper leading-snug">
                  Hawksbill Turtle Foraging
                </h2>
                <p className="text-xs text-paper/70 font-sans">
                  Taxon: <SciName className="text-coral-300">Eretmochelys imbricata</SciName> · IUCN Critically Endangered (CR). Logged at 14m foraging on reef wall sponges along Jackson Reef.
                </p>
              </div>

              <div className="relative aspect-[16/9] rounded overflow-hidden border border-paper/10">
                <Image
                  src="https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80"
                  alt="Hawksbill sea turtle cruising near Jackson Reef"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute bottom-1 right-2 bg-sea-900/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-paper">
                  Photo: M. Ross (CC BY 4.0)
                </div>
              </div>

              <div className="pt-2 border-t border-paper/10 flex items-center justify-between text-xs font-sans">
                <span className="text-paper/60">Observer: Tiran Field Station</span>
                <Link
                  href="/watch"
                  className="text-coral-400 hover:text-coral-300 flex items-center gap-1 font-medium group"
                >
                  <span>View telemetry</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
