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

export async function WatchSection() {
  const sightings = await getApprovedSightings({ limit: 3 });

  return (
    <section
      id="section-watch"
      aria-labelledby="heading-watch"
      className="w-full bg-sea-900 text-paper py-16 md:py-24 border-y border-sea-700/60 transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          index="02"
          title="Red Sea Watch: Citizen Field Telemetry"
          subtitle="Real-time geo-located wildlife observations and environmental alerts from across the basin"
          href="/watch"
          actionText="View all sightings"
          className="text-paper [&_h2]:text-paper [&_p]:text-paper/75"
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
                Verified Telemetry Feed
              </span>
            </div>

            {/* Mobile horizontal scroll-snap / Desktop stack */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 md:flex-col md:overflow-visible">
              {sightings.map((stg) => {
                const iucn = stg.species?.iucn_status || 'VU';
                const iucnBorder = getIucnColor(iucn);

                return (
                  <article
                    key={stg.id}
                    className={`min-w-[82vw] sm:min-w-[340px] md:min-w-0 snap-center p-5 rounded-md bg-paper/5 backdrop-blur-sm border border-paper/15 border-l-4 ${iucnBorder} space-y-4 hover:border-paper/30 transition-all`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-paper/70 mb-1">
                          <CountryFlag iso2={stg.country_iso2} size="sm" showBadge />
                          <span>•</span>
                          <CoordinateTag lat={stg.lat_public} lng={stg.lng_public} />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-paper leading-snug">
                          {stg.reported_common_name}
                        </h4>
                        {stg.species?.scientific_name && (
                          <p className="text-xs text-coral-300 font-sans mt-0.5">
                            <SciName>{stg.species.scientific_name}</SciName>
                            <span className="ml-2 font-mono text-[10px] bg-paper/15 px-1.5 py-0.2 rounded text-paper">
                              IUCN: {iucn}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-paper/80 font-sans line-clamp-2 leading-relaxed">
                      {stg.behavior || stg.notes || 'Recorded in field log.'}
                    </p>

                    <div className="pt-2 border-t border-paper/10 flex items-center justify-between text-xs font-sans text-paper/60">
                      <span>Observer: {stg.reporter_name || 'Field Researcher'}</span>
                      <time dateTime={stg.observed_at ? new Date(stg.observed_at).toISOString() : ''}>
                        {stg.observed_at ? new Date(stg.observed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Recent'}
                      </time>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="pt-2">
              <Link href="/watch" className="block w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px] border-paper/30 text-paper hover:bg-paper/10 justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  <span>Browse All 84+ Telemetry Records</span>
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
                  RAW, JPG, PNG up to 25MB · EXIF coordinates preserved
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

              {/* Open Science Consent */}
              <div className="flex items-start gap-2 pt-1 text-paper/80 text-[11px]">
                <input
                  type="checkbox"
                  id="consent-open-access"
                  defaultChecked
                  className="rounded border-paper/30 bg-paper/10 text-coral-500 focus:ring-coral-500 mt-0.5"
                />
                <label htmlFor="consent-open-access" className="leading-snug">
                  I agree to publish this record under CC BY-SA 4.0 for open-access marine science research.
                </label>
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
