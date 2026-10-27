import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  ArrowUpRight,
  MapPin,
  Clock,
  Calendar,
  AlertCircle,
  Eye,
  PlusCircle,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SampleBadge } from '@/components/ui/sample-badge';
import { SectionHeader } from '@/components/ui/section-header';
import { StoryCard } from '@/components/ui/cards';
import { SciName } from '@/components/ui/sciname';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* ------------------------------------------------------------- */}
      {/* 1. First-Visit Hero: Basin-Wide Field Journal Masthead */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full border-b border-rule bg-sand-300/15 dark:bg-sea-900/30 overflow-hidden">
        {/* Subtle contour bathymetry background */}
        <div className="absolute inset-0 bg-bathymetry-subtle opacity-70 pointer-events-none" />

        <div className="max-w-content mx-auto px-4 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="coral">Live Field Dispatch</Badge>
              <CoordinateTag lat={22.0} lng={38.0} />
              <SampleBadge />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink dark:text-paper leading-[1.08]">
              From Suez to Bab-el-Mandeb: one sea, many shores.
            </h1>

            <p className="font-sans text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
              An independent editorial and science archive monitoring marine biodiversity, endemic taxa, artisanal coastal heritage, and coral thermal refugia across the entire Red Sea rift basin.
            </p>

            {/* Direct side-by-side action buttons directly beneath text */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/watch">
                <Button variant="coral" size="md" className="gap-2 min-h-[44px]">
                  <Eye className="w-4 h-4" />
                  <span>Explore Live Sightings</span>
                </Button>
              </Link>
              <Link href="/watch/submit">
                <Button variant="outline" size="md" className="gap-2 min-h-[44px]">
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit Observation</span>
                </Button>
              </Link>
            </div>

            {/* Live Telemetry Mini-Counters */}
            <div className="pt-4 border-t border-rule/60 flex flex-wrap items-center gap-6 text-xs font-mono text-muted">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-ink dark:text-paper">8</span>
                <span>Littoral Coastlines</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-rule">•</span>
                <span className="font-semibold text-ink dark:text-paper">6</span>
                <span>Marine Sub-Basins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-rule">•</span>
                <span className="font-semibold text-ink dark:text-paper">100%</span>
                <span>Open-Access Science</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. Curated Headlines Ticker Strip */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full border-b border-rule bg-paper-card dark:bg-deep-sea py-3 px-4 lg:px-8">
        <div className="max-w-content mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 shrink-0 text-sea-700 dark:text-sea-500 font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-coral-500" />
            <span>Field Wires:</span>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap text-muted py-0.5">
            <span className="text-ink dark:text-paper">
              Regional baseline: Green sea turtle <SciName inParentheses>Chelonia mydas</SciName> nesting survey logged
            </span>
            <span className="opacity-40">•</span>
            <span>Winter thermal monitoring records 24.8°C reef minimum at central transect</span>
            <span className="opacity-40">•</span>
            <span>Coastal habitat protection zoning ratified for northern archipelago reefs</span>
          </div>

          <Link href="/news" className="shrink-0 text-coral-500 hover:underline flex items-center gap-1 font-sans">
            <span>All updates</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-14">
        {/* ------------------------------------------------------------- */}
        {/* 3. Lead Story & Stacked Stories (Asymmetric 7/12 + 5/12) */}
        {/* ------------------------------------------------------------- */}
        <section aria-labelledby="section-news">
          <SectionHeader
            index="01"
            title="Red Sea News & Investigations"
            subtitle="Verified reporting and field dispatches"
            href="/news"
            actionText="Read all dispatches"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Lead Story (7 cols) with balanced image frame */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <StoryCard
                featured
                slug="coral-resilience-gulf-aqaba-super-reefs"
                title="Inside the Thermal Refugia: Why Northern Red Sea Corals Resist Global Bleaching"
                dek="While global reef systems endure catastrophic bleaching events, scientific surveys between Ras Mohammed and the Straits of Tiran show historic thermo-tolerance. Researchers are decoding their genetic evolutionary advantage."
                coverUrl="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
                type="FEATURE"
                publishedAt="2026-10-24T09:00:00Z"
                readingMinutes={7}
                authorName="Field Research Desk"
                isDemo
              />
            </div>

            {/* Stacked Stories (5 cols) without artificial stretching */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <StoryCard
                slug="dugong-population-surveys-wadi-el-gemal"
                title="Acoustic Tracking Confirms Resilient Dugong Grazing Corridors in Hamata"
                dek="Hydrophone arrays positioned in sheltered seagrass meadows reveal persistent foraging behaviors among resident dugong populations."
                coverUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                type="FIELD_NOTE"
                publishedAt="2026-10-22T14:30:00Z"
                readingMinutes={4}
                authorName="Marine Ecology Working Group"
                isDemo
              />

              <StoryCard
                slug="artisanal-ababbda-fisheries-eastern-desert"
                title="Wadi El Gemal: Oral Histories of the Ababda Maritime Wayfarers"
                dek="Documenting indigenous navigation, seasonal winds, and sustainable net-casting traditions before modern port expansion."
                type="INTERVIEW"
                publishedAt="2026-10-18T11:15:00Z"
                readingMinutes={5}
                authorName="Cultural Heritage Archive"
                isDemo
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 4. Red Sea Watch Strip (Community Science) */}
        {/* ------------------------------------------------------------- */}
        <section aria-labelledby="section-watch" className="border-t border-rule pt-10">
          <SectionHeader
            index="02"
            title="Red Sea Watch: Wildlife Telemetry"
            subtitle="Verified community sightings and spatial logs"
            href="/watch"
            actionText="Open interactive GIS map"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sighting Card 1 */}
            <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="iucn-vu">IUCN: VU</Badge>
                <CoordinateTag lat={24.6754} lng={35.0912} isApproximate />
              </div>

              <div>
                <h4 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                  Dugong <SciName inParentheses>Dugong dugon</SciName>
                </h4>
                <p className="font-mono text-xs text-muted">Marsa Abu Dabbab, Marsa Alam</p>
              </div>

              <p className="text-sm text-muted leading-relaxed">
                Observed solitary individual grazing on Halophila stipulacea meadow at 6m depth. No boat-strike scars.
              </p>

              <div className="pt-2 border-t border-rule/40 flex items-center justify-between text-[11px] font-mono text-muted">
                <span>Verified by Sample Ranger Unit</span>
                <span>24 Oct 2026</span>
              </div>
            </div>

            {/* Sighting Card 2 */}
            <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="iucn-cr">IUCN: CR</Badge>
                <CoordinateTag lat={27.7289} lng={34.2541} />
              </div>

              <div>
                <h4 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                  Hawksbill Turtle <SciName inParentheses>Eretmochelys imbricata</SciName>
                </h4>
                <p className="font-mono text-xs text-muted">Shark Reef, Ras Mohammed</p>
              </div>

              <p className="text-sm text-muted leading-relaxed">
                Sub-adult foraging on soft sponges along outer wall drop-off. Alert and active swimming.
              </p>

              <div className="pt-2 border-t border-rule/40 flex items-center justify-between text-[11px] font-mono text-muted">
                <span>Verified by Coastal Research Team</span>
                <span>22 Oct 2026</span>
              </div>
            </div>

            {/* Sighting Card 3 */}
            <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="iucn-en">IUCN: EN</Badge>
                <CoordinateTag lat={25.1234} lng={34.8721} isApproximate />
              </div>

              <div>
                <h4 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                  Whale Shark <SciName inParentheses>Rhincodon typus</SciName>
                </h4>
                <p className="font-mono text-xs text-muted">Elphinstone Reef Offshore</p>
              </div>

              <p className="text-sm text-muted leading-relaxed">
                Surface filter-feeding observed during calm sea state (Beaufort 1). Estimated length ~5.5 meters.
              </p>

              <div className="pt-2 border-t border-rule/40 flex items-center justify-between text-[11px] font-mono text-muted">
                <span>Verified by Field Station Hub</span>
                <span>20 Oct 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 5. Explorer: Featured Place & Species */}
        {/* ------------------------------------------------------------- */}
        <section aria-labelledby="section-explorer" className="border-t border-rule pt-10">
          <SectionHeader
            index="03"
            title="Red Sea Explorer"
            subtitle="Gazetteer of reefs, wadis, and endemic taxa"
            href="/explorer"
            actionText="Explore gazetteer"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Protected Area */}
            <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="sea">Protected Area</Badge>
                <CoordinateTag lat={24.693} lng={35.088} />
              </div>

              <h3 className="font-serif text-2xl font-semibold text-ink dark:text-paper">
                Wadi El Gemal National Park
              </h3>

              <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                Spanning 7,450 km² from the Red Sea offshore barrier islands to the emerald mines of Mons Smaragdus in the Eastern Desert. Prime sanctuary for dugongs, ospreys, and Dorcas gazelles.
              </p>

              <div className="pt-3 border-t border-rule/40 flex items-center justify-between text-xs font-mono">
                <span className="text-muted">Established: 2003 • Area: 7,450 km²</span>
                <Link href="/explorer/places/wadi-el-gemal" className="text-coral-500 font-semibold hover:underline flex items-center gap-1">
                  <span>Responsible Visit Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Featured Taxon */}
            <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="iucn-en">IUCN: EN (Endangered)</Badge>
                <span className="font-mono text-xs text-muted">Taxon ID: RSM-8092</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-ink dark:text-paper">
                  <SciName className="text-2xl not-italic-markers text-ink dark:text-paper font-semibold">
                    Stegostoma tigrinum
                  </SciName>
                </h3>
                <p className="font-sans text-sm text-muted">Zebra / Leopard Shark</p>
              </div>

              <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                Nocturnal benthic predator resting on sandy patches adjacent to deep pinnacle reefs. Highly vulnerable to demersal gillnets and commercial aquarium harvesting.
              </p>

              <div className="pt-3 border-t border-rule/40 flex items-center justify-between text-xs font-mono">
                <span className="text-muted">Season: May – October (Peak sightings)</span>
                <Link href="/explorer/species/zebra-shark" className="text-coral-500 font-semibold hover:underline flex items-center gap-1">
                  <span>Species Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 6. Opportunities & Field Research Grants */}
        {/* ------------------------------------------------------------- */}
        <section aria-labelledby="section-opportunities" className="border-t border-rule pt-10">
          <SectionHeader
            index="04"
            title="Red Sea Opportunities"
            subtitle="Grants, fellowships, and training"
            href="/opportunities"
            actionText="View all grants"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="coral">Research Grant</Badge>
                  <span className="font-mono text-xs text-coral-600 font-semibold">Closing in 12 days</span>
                </div>
                <h4 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                  Red Sea Coral Genetic Resiliency Research Fellowship 2026/27
                </h4>
                <p className="font-sans text-xs text-muted mt-1">Regional Marine Conservation Initiative</p>
                <p className="font-mono text-xs text-ink dark:text-paper font-semibold mt-2">
                  Funding: $45,000 USD (Includes boat transect charter & lab access)
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-rule/40 flex items-center justify-between text-xs font-mono">
                <span className="text-muted">Deadline: 15 Nov 2026</span>
                <Link href="/opportunities/coral-genetic-resiliency-grant" className="text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1">
                  <span>Eligibility & Apply</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="sea">Training Fellowship</Badge>
                  <span className="font-mono text-xs text-muted">Open Application</span>
                </div>
                <h4 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                  Marine Ranger Spatial GIS & Seagrass Monitoring Residency
                </h4>
                <p className="font-sans text-xs text-muted mt-1">Sample Protected Area Management Unit</p>
                <p className="font-mono text-xs text-ink dark:text-paper font-semibold mt-2">
                  Duration: 3 Months • Fully Funded (Marine Field Station)
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-rule/40 flex items-center justify-between text-xs font-mono">
                <span className="text-muted">Deadline: 01 Dec 2026</span>
                <Link href="/opportunities/marine-ranger-spatial-gis-residency" className="text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1">
                  <span>Details & Program</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 7. Newsletter Field Subscription */}
        {/* ------------------------------------------------------------- */}
        <section className="rounded-md border border-rule bg-sand-300/20 dark:bg-sea-900/40 p-8 md:p-12 text-center bg-bathymetry-subtle">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-sea-700 dark:text-sea-500 font-semibold">
              The Field Dispatch
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink dark:text-paper">
              Receive verified monthly Red Sea data and investigative reporting.
            </h3>
            <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
              No sponsored tourism marketing. Curated updates on marine protected areas, ecological alerts, scientific papers, and grant deadlines.
            </p>

            <form className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="researcher@institution.org"
                aria-label="Email address for dispatch"
                required
                className="flex-1 px-4 py-2.5 text-sm font-sans bg-paper dark:bg-deep-sea border border-rule rounded-md text-ink dark:text-paper focus:outline-none focus:border-sea-700"
              />
              <Button type="submit" variant="coral" size="md">
                Subscribe
              </Button>
            </form>

            <p className="font-mono text-[11px] text-muted">
              Double opt-in verified. Unsubscribe at any time. Respects scientific citation ethics.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
