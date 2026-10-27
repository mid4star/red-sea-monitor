import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, PlusCircle, Camera, ShieldCheck, MapPin, ArrowUpRight, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SciName } from '@/components/ui/sciname';
import { CountryFlag } from '@/components/ui/country-flag';
import { TurtleArt, DugongArt } from '@/components/art/illustrations';
import { getApprovedSightings } from '@/server/queries/watch';

// IUCN border color helper
function getIucnColor(status?: string): string {
  switch (status?.toUpperCase()) {
    case 'CR':
      return 'border-l-rose-500';
    case 'EN':
      return 'border-l-orange-500';
    case 'VU':
      return 'border-l-amber-500';
    case 'NT':
      return 'border-l-teal-500';
    case 'LC':
    default:
      return 'border-l-emerald-500';
  }
}

const DEFAULT_WATCH_IMAGES = [
  'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1570498839593-e565b3d4f6ee?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=400&q=80',
];

export async function WatchSection() {
  const sightings = await getApprovedSightings({ limit: 3 });

  return (
    <section
      id="section-watch"
      data-tone="dark"
      aria-labelledby="heading-watch"
      className="w-full bg-sea-900 text-paper py-16 md:py-24 border-y border-sea-700/60 transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          index="02"
          tone="dark"
          title="Red Sea Watch: Citizen Field Telemetry"
          subtitle="Real-time geo-located wildlife observations and environmental alerts from across the basin"
          href="/watch"
          actionText="View all sightings"
        />

        {/* 2-Column Grid: Telemetry Cards (Left 7 cols) & Photo Sharing Card (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Recent Observations */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-paper/75 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Recent Observations</span>
              </h3>
              <span className="text-[11px] font-mono text-paper/60">
                Sample Telemetry Feed
              </span>
            </div>

            {/* Mobile horizontal scroll-snap / Desktop stack */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 md:pb-0 md:flex-col md:overflow-visible">
              {sightings.map((stg, idx) => {
                const iucn = stg.species?.iucn_status || 'VU';
                const iucnBorder = getIucnColor(iucn);
                const isDugong = stg.reported_common_name?.toLowerCase().includes('dugong') ||
                  stg.species?.scientific_name?.toLowerCase().includes('dugong');
                const photoSrc = (stg as any).photo_url || DEFAULT_WATCH_IMAGES[idx % DEFAULT_WATCH_IMAGES.length];

                return (
                  <article
                    key={stg.id}
                    className={`min-w-[82vw] sm:min-w-[340px] md:min-w-0 snap-center p-5 rounded-md bg-paper/5 backdrop-blur-sm border border-paper/15 border-l-4 ${iucnBorder} flex flex-col justify-between space-y-4 hover:border-paper/30 transition-all`}
                  >
                    <div className="space-y-3.5">
                      {/* Visual: Image or illustration on top (16:10) */}
                      <div className="relative aspect-[16/10] w-full rounded overflow-hidden border border-paper/20">
                        {isDugong ? (
                          <>
                            <DugongArt className="w-full h-full object-cover" />
                            <div className="absolute bottom-2 left-2 bg-sea-900/80 backdrop-blur-sm text-paper text-[10px] font-mono px-2 py-0.5 rounded border border-paper/20">
                              Illustration: Dugong dugon
                            </div>
                          </>
                        ) : (
                          <>
                            <Image
                              src={photoSrc}
                              alt={stg.reported_common_name}
                              fill
                              sizes="(max-width: 768px) 82vw, 340px"
                              className="object-cover"
                            />
                            <div className="absolute bottom-1 right-1 bg-sea-900/80 backdrop-blur-sm text-paper text-[9px] font-mono px-1.5 py-0.5 rounded">
                              Photo: {stg.reporter_name || 'Field Contributor'}
                            </div>
                          </>
                        )}
                        <div className="absolute top-2 left-2">
                          <CountryFlag iso2={stg.country_iso2} size="sm" showBadge tone="overlay" />
                        </div>
                      </div>

                      {/* Metadata Row: Coordinates & Sector */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-paper/70">
                        <CoordinateTag lat={stg.lat_public} lng={stg.lng_public} tone="dark" />
                        <span className="text-[11px] text-paper/60 truncate max-w-[160px]">{stg.location_label}</span>
                      </div>

                      {/* Title & Taxonomy */}
                      <div>
                        <h4 className="font-serif text-lg font-bold text-paper leading-snug">
                          {stg.reported_common_name}
                        </h4>
                        {stg.species?.scientific_name && (
                          <p className="text-xs text-coral-300 font-sans mt-0.5">
                            <SciName>{stg.species.scientific_name}</SciName>
                          </p>
                        )}
                      </div>

                      {/* Behavior text */}
                      <p className="text-xs text-paper/80 font-sans line-clamp-2 leading-relaxed">
                        {stg.behavior || stg.notes || 'Recorded in field log.'}
                      </p>
                    </div>

                    {/* Bottom Row: Status Badge, Observer, Date, and SAMPLE tag */}
                    <div className="pt-3 border-t border-paper/10 flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-paper/70">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-paper/15 px-1.5 py-0.5 rounded text-paper font-semibold">
                          IUCN: {iucn}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.5 rounded">
                          Sample record
                        </span>
                      </div>
                      <div className="text-[11px] text-paper/60 font-mono">
                        <span>{stg.reporter_name?.split(' ')[0] || 'Observer'}</span>
                        <span className="mx-1">•</span>
                        <time dateTime={stg.observed_at ? new Date(stg.observed_at).toISOString() : ''}>
                          {stg.observed_at ? new Date(stg.observed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Recent'}
                        </time>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile snap dots indicator */}
            <div className="flex justify-center gap-1.5 md:hidden py-1">
              {sightings.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === 0 ? 'w-5 bg-coral-400' : 'w-1.5 bg-paper/30'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="pt-2">
              <Link href="/watch" className="block w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px] border-paper/30 text-paper hover:bg-paper/10 justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  <span>Browse All 84+ Telemetry Records (SAMPLE)</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: "Share your photo of the Red Sea" Form Card */}
          <div className="lg:col-span-5 bg-paper/10 backdrop-blur-md border border-paper/20 rounded-md p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-coral-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <Camera className="w-4 h-4" />
                <span>Field Contribution</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-paper">
                Share your photo of the Red Sea
              </h3>
              <p className="text-xs text-paper/80 font-sans leading-relaxed">
                Divers, boat crew, researchers, and coastal residents: submit verified sightings of marine megafauna, coral spawning, or coastal disturbance.
              </p>
            </div>

            <form
              action="/watch/submit"
              method="GET"
              className="space-y-4 text-xs font-sans"
            >
              {/* Photo dropzone placeholder */}
              <div className="border-2 border-dashed border-paper/30 rounded-md p-6 text-center hover:border-coral-400/80 transition-colors cursor-pointer bg-paper/5">
                <UploadCloud className="w-8 h-8 mx-auto text-paper/60 mb-2" />
                <p className="font-medium text-paper">
                  Drop high-resolution image here or browse
                </p>
                <p className="text-[11px] text-paper/50 mt-1">
                  RAW, JPG, PNG up to 25MB · Location data is removed from public images. Exact coordinates stay private and are used for verification only.
                </p>
              </div>

              {/* Caption field */}
              <div className="space-y-1">
                <label className="block text-paper/80 font-mono text-[11px]">
                  Taxon or Observation Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Whale Shark feeding near surface"
                  className="w-full px-3 py-2.5 rounded bg-paper/10 border border-paper/20 text-paper placeholder:text-paper/40 focus:outline-none focus:ring-1 focus:ring-coral-500 min-h-[44px]"
                  readOnly
                />
              </div>

              {/* Location field */}
              <div className="space-y-1">
                <label className="block text-paper/80 font-mono text-[11px]">
                  Basin Sector / Nearest Littoral State
                </label>
                <select
                  aria-label="Basin Sector / Nearest Littoral State"
                  className="w-full px-3 py-2.5 rounded bg-sea-900 border border-paper/20 text-paper focus:outline-none focus:ring-1 focus:ring-coral-500 min-h-[44px]"
                  defaultValue="EG"
                >
                  <option value="EG">Egypt (Suez / Hurghada / Hamata)</option>
                  <option value="SD">Sudan (Port Sudan / Sanganeb / Suakin)</option>
                  <option value="SA">Saudi Arabia (Farasan / Yanbu / Al Wajh)</option>
                  <option value="JO">Jordan (Aqaba Marine Reserve)</option>
                  <option value="ER">Eritrea (Dahlak Archipelago / Massawa)</option>
                  <option value="YE">Yemen (Hanish Islands / Al Hudaydah)</option>
                  <option value="DJ">Djibouti (Seven Brothers / Bab-el-Mandeb)</option>
                </select>
              </div>

              {/* Split Consent Checkboxes (Unticked by default) */}
              <div className="space-y-2 pt-1 text-paper/80 text-[11px]">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="consent-publish"
                    required
                    className="rounded border-paper/30 bg-paper/10 text-coral-500 focus:ring-coral-500 mt-0.5"
                  />
                  <label htmlFor="consent-publish" className="leading-snug">
                    I allow Red Sea Monitor to publish this photo with credit <span className="text-coral-400">*</span>
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="consent-ccby"
                    className="rounded border-paper/30 bg-paper/10 text-coral-500 focus:ring-coral-500 mt-0.5"
                  />
                  <label htmlFor="consent-ccby" className="leading-snug text-paper/60">
                    I also allow reuse under CC BY-SA 4.0 for open research (optional)
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Link href="/watch/submit" className="block w-full">
                  <Button
                    variant="coral"
                    size="lg"
                    className="w-full min-h-[48px] text-base justify-center font-medium shadow-md"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    <span>Open Submission Form</span>
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
