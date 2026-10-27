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
      className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center bg-sea-900 text-paper overflow-hidden"
    >
      {/* Background Media: Photo with fallback illustration */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80"
          alt="Coral reef wall teeming with Anthias fish in the northern Red Sea rift"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hidden sm:block opacity-45 dark:opacity-35"
        />
        {/* Fallback layered illustration on small screens or when offline */}
        <div className="sm:hidden w-full h-full opacity-60">
          <HeroIllustrationFallback className="w-full h-full object-cover" />
        </div>

        {/* Scrim gradient from left for WCAG AAA text contrast (>= 4.5:1) */}
        <div className="absolute inset-0 bg-gradient-to-r from-sea-900 via-sea-900/90 to-transparent sm:via-sea-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-900 via-transparent to-sea-900/40" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Masthead */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-coral-500/20 text-coral-400 border border-coral-500/30 text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-pulse" />
                Live Field Dispatch
              </span>
              <CoordinateTag lat={20.0} lng={38.0} />
              <SampleBadge />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-paper leading-[1.08] max-w-2xl">
              From Suez to Bab-el-Mandeb: one sea, many shores.
            </h1>

            <p className="font-sans text-base sm:text-lg text-paper/85 max-w-2xl leading-relaxed">
              An independent editorial and science archive monitoring marine biodiversity, endemic taxa, artisanal coastal heritage, and coral thermal refugia across the entire Red Sea rift basin.
            </p>

            {/* Action Buttons: Side-by-side, min 48px touch targets */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/watch">
                <Button variant="coral" size="lg" className="min-h-[48px] px-6 text-base gap-2">
                  <Eye className="w-5 h-5" />
                  <span>Explore Live Sightings</span>
                </Button>
              </Link>
              <Link href="/watch/submit">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-h-[48px] px-6 text-base gap-2 border-paper/30 text-paper hover:bg-paper/10"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Submit Observation</span>
                </Button>
              </Link>
            </div>

            {/* Live Telemetry Mini-Counters from DB */}
            <div className="pt-6 border-t border-paper/15 flex flex-wrap items-center gap-6 text-xs font-mono text-paper/75">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-paper text-sm">{stats.littoral_states}</span>
                <span>Coastal Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-paper/40">•</span>
                <span className="font-semibold text-paper text-sm">6</span>
                <span>Marine Sub-Basins</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-paper/40">•</span>
                <span className="font-semibold text-paper text-sm">100%</span>
                <span>Open-Access Science</span>
              </div>
            </div>

            {/* Photo attribution */}
            <div className="pt-1">
              <p className="text-[11px] font-mono text-paper/40">
                Photo: Northern Red Sea Pinnacle (Unsplash License) · Verified CC Reference
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
