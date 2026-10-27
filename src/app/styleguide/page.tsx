import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LinkArrow } from '@/components/ui/link-arrow';
import { Badge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SampleBadge } from '@/components/ui/sample-badge';
import { SectionHeader } from '@/components/ui/section-header';
import { Figure } from '@/components/ui/figure';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { FilterBar } from '@/components/ui/filter-bar';
import { Input, Select, Textarea } from '@/components/ui/form-controls';
import { Prose } from '@/components/ui/prose';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-deep-sea dark:text-paper">
      <SiteHeader />

      <main className="max-w-content mx-auto px-4 lg:px-8 py-12 space-y-16">
        {/* Styleguide Masthead */}
        <div className="border-b border-rule pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="coral">Design System v1.0</Badge>
            <span className="font-mono text-xs text-muted">A Field Journal, Not a Template</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Red Sea Monitor — Living Styleguide
          </h1>
          <p className="font-sans text-lg text-muted max-w-2xl leading-relaxed">
            Atomic components, typography tokens, color hierarchies, and interaction behaviors calibrated for scientific clarity, WCAG 2.2 AA accessibility, and editorial distinction.
          </p>
        </div>

        {/* 1. Palette Tokens */}
        <section className="space-y-6">
          <SectionHeader index="01" title="Color System & Tokens" subtitle="Restrained natural field palette" />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 font-mono text-xs">
            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink">
              <div className="h-12 w-full rounded-sm bg-[#F7F3EC] border border-ink/20" />
              <div className="font-semibold">--paper</div>
              <div className="text-muted">#F7F3EC (Light BG)</div>
            </div>

            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink">
              <div className="h-12 w-full rounded-sm bg-[#0E1A1F]" />
              <div className="font-semibold text-ink">--ink</div>
              <div className="text-muted">#0E1A1F (Primary)</div>
            </div>

            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink">
              <div className="h-12 w-full rounded-sm bg-[#071418]" />
              <div className="font-semibold text-ink">--deep-sea</div>
              <div className="text-muted">#071418 (Dark BG)</div>
            </div>

            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink">
              <div className="h-12 w-full rounded-sm bg-[#0B5566]" />
              <div className="font-semibold text-ink">--sea-700</div>
              <div className="text-muted">#0B5566 (Deep Marine)</div>
            </div>

            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink">
              <div className="h-12 w-full rounded-sm bg-[#1B8CA0]" />
              <div className="font-semibold text-ink">--sea-500</div>
              <div className="text-muted">#1B8CA0 (Oceanic)</div>
            </div>

            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink">
              <div className="h-12 w-full rounded-sm bg-[#D8EEF0] border border-ink/10" />
              <div className="font-semibold text-ink">--sea-100</div>
              <div className="text-muted">#D8EEF0 (Reef Tint)</div>
            </div>

            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink">
              <div className="h-12 w-full rounded-sm bg-[#E3D3B4]" />
              <div className="font-semibold text-ink">--sand-300</div>
              <div className="text-muted">#E3D3B4 (Desert Dune)</div>
            </div>

            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink">
              <div className="h-12 w-full rounded-sm bg-[#B08D57]" />
              <div className="font-semibold text-ink">--sand-600</div>
              <div className="text-muted">#B08D57 (Wadi Earth)</div>
            </div>

            <div className="p-4 rounded-md border border-rule bg-paper space-y-1 text-ink col-span-2 sm:col-span-1">
              <div className="h-12 w-full rounded-sm bg-[#E4573D]" />
              <div className="font-semibold text-ink">--coral-500</div>
              <div className="text-muted">#E4573D (Single Accent)</div>
            </div>
          </div>
        </section>

        {/* 2. Typography & Hierarchy */}
        <section className="space-y-6">
          <SectionHeader index="02" title="Typography & Fluid Clamps" subtitle="Fraunces, Source Sans 3, JetBrains Mono" />

          <div className="space-y-6 p-6 rounded-md border border-rule bg-paper-card dark:bg-sea-900/20">
            <div>
              <span className="font-mono text-xs text-muted block mb-1">Display Serif / Fraunces 700</span>
              <p className="font-serif text-3xl md:text-5xl font-bold leading-tight">
                Ras Mohammed Coral Thermal Refugia Transect
              </p>
            </div>

            <div className="pt-4 border-t border-rule/50">
              <span className="font-mono text-xs text-muted block mb-1">Section Subheading / Fraunces 600</span>
              <p className="font-serif text-2xl font-semibold">
                Benthic Macro-invertebrate Biomass Surveys in Elphinstone Deep
              </p>
            </div>

            <div className="pt-4 border-t border-rule/50">
              <span className="font-mono text-xs text-muted block mb-1">Body Reading Text / Source Sans 3 (68ch Measure)</span>
              <p className="font-sans text-base md:text-lg text-ink/90 dark:text-paper/90 max-w-reading leading-relaxed">
                Egypt’s northern Red Sea reefs exhibit anomalous resistance to thermal stress events that have decimated comparable Indo-Pacific biomes. Genetic analysis confirms selective retention of high-temperature photosynthetic symbionts (*Cladocopium* spp.).
              </p>
            </div>

            <div className="pt-4 border-t border-rule/50">
              <span className="font-mono text-xs text-muted block mb-1">Data & Coordinates / JetBrains Mono</span>
              <p className="font-mono text-sm text-sea-700 dark:text-sea-500">
                LAT: 27°15′04″N • LNG: 33°49′18″E • DEPTH: -42.8m • SALINITY: 40.2 PSU
              </p>
            </div>
          </div>
        </section>

        {/* 3. Buttons & Interactive Primitives */}
        <section className="space-y-6">
          <SectionHeader index="03" title="Buttons & Links" subtitle="Tactile, high-contrast actions" />

          <div className="flex flex-wrap items-center gap-4 p-6 rounded-md border border-rule bg-paper-card dark:bg-sea-900/20">
            <Button variant="primary">Primary Field Action</Button>
            <Button variant="coral">Coral CTA (Alert/Submit)</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" isLoading>Loading State</Button>
          </div>

          <div className="flex items-center gap-8 px-6 py-4 rounded-md border border-rule">
            <LinkArrow href="/news">Read complete dispatch</LinkArrow>
            <LinkArrow href="https://gbif.org" external>GBIF Global Biodiversity Record</LinkArrow>
          </div>
        </section>

        {/* 4. Badges, Tags & Signature Details */}
        <section className="space-y-6">
          <SectionHeader index="04" title="Editorial Tags & Badges" subtitle="IUCN Red List & sample data indicators" />

          <div className="space-y-4 p-6 rounded-md border border-rule bg-paper-card dark:bg-sea-900/20">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="sea">Marine Biome</Badge>
              <Badge variant="sand">Eastern Desert</Badge>
              <Badge variant="coral">Critical Alert</Badge>
              <Badge variant="iucn-cr">IUCN: CR (Critically Endangered)</Badge>
              <Badge variant="iucn-en">IUCN: EN (Endangered)</Badge>
              <Badge variant="iucn-vu">IUCN: VU (Vulnerable)</Badge>
              <Badge variant="iucn-nt">IUCN: NT (Near Threatened)</Badge>
              <Badge variant="iucn-lc">IUCN: LC (Least Concern)</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-rule/50">
              <CoordinateTag lat={27.7289} lng={34.2541} />
              <CoordinateTag lat={24.6754} lng={35.0912} isApproximate />
              <SampleBadge />
              <SampleBadge compact />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-rule/50">
              <Tag active>All Regions</Tag>
              <Tag>Straits of Tiran</Tag>
              <Tag>Ras Mohammed</Tag>
              <Tag>Wadi El Gemal</Tag>
              <Tag>Hamata & Zabargad</Tag>
            </div>
          </div>
        </section>

        {/* 5. Form Controls */}
        <section className="space-y-6">
          <SectionHeader index="05" title="Form Controls" subtitle="Input, Textarea, Select with validation" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-md border border-rule bg-paper-card dark:bg-sea-900/20">
            <Input
              label="Observation Species / Common Name"
              placeholder="e.g. Green Sea Turtle"
              helperText="Common Egyptian Red Sea name or Latin binomen"
            />

            <Input
              label="Reporter Email Address"
              type="email"
              placeholder="researcher@niof.sci.eg"
              error="Valid academic or institutional email required for record verification"
            />

            <Select
              label="Habitat Category"
              options={[
                { label: 'Outer Barrier Pinnacle Reef', value: 'reef' },
                { label: 'Coastal Seagrass Meadow', value: 'seagrass' },
                { label: 'Mangrove Lagoon (Avicennia marina)', value: 'mangrove' },
                { label: 'Eastern Desert Wadi Outwash', value: 'wadi' },
              ]}
            />

            <Textarea
              label="Behavioral Field Notes"
              placeholder="Record water visibility, presence of juveniles, foraging activities, current strength..."
              helperText="Field observation logs will be reviewed by registered marine biologists before publication."
            />
          </div>
        </section>

        {/* 6. Empty States & Skeletons */}
        <section className="space-y-6">
          <SectionHeader index="06" title="Empty States & Skeletons" subtitle="Contour bathymetry textures" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EmptyState
              title="No Pending Sightings Awaiting Review"
              description="The observation verification queue is currently clear. All submitted community logs have been evaluated by registered rangers and biologists."
              action={<Button variant="primary" size="sm">Submit New Observation</Button>}
            />

            <div className="space-y-4 p-6 rounded-md border border-rule bg-paper-card dark:bg-sea-900/20">
              <span className="font-mono text-xs text-muted block">Loading Shimmer Preview</span>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </section>

        {/* 7. Article Prose Typography Sample */}
        <section className="space-y-6">
          <SectionHeader index="07" title="Article Prose Typography" subtitle="Pull quotes, headings, and lists" />

          <div className="p-8 rounded-md border border-rule bg-paper-elevated dark:bg-paper-card">
            <Prose>
              <h2>The Thermal Sanctuary Hypothesis</h2>
              <p>
                Unlike equatorial reefs that experience catastrophic mass bleaching upon a 1.0°C rise above maximum summer mean, corals in the Gulf of Aqaba and northern Red Sea thrive at temperatures up to 32°C. Their ancestors underwent a selective evolutionary filter during migration through the hyper-saline, warm southern sill during the mid-Holocene.
              </p>
              <blockquote>
                &ldquo;We are looking at an extraordinary evolutionary bank. The Red Sea is not just a regional sea; it is potentially the last surviving coral reef ecosystem on Earth.&rdquo;
              </blockquote>
              <p>
                Field stations at Ras Mohammed and Dahab continue regular monitoring of Symbiodiniaceae density and photophysiological efficiency (*Fv/Fm* parameters) through seasonal cycles.
              </p>
            </Prose>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
