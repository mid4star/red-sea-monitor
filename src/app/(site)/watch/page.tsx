import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getApprovedSightings, getSightingsStats, getPhotoStories } from '@/server/queries/watch';
import { ObservationType } from '@prisma/client';
import { SampleBadge } from '@/components/ui/sample-badge';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { CoordinateMap } from '@/components/explorer/coordinate-map';
import { Eye, PlusCircle, Camera, Users, Shield, Compass } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

export const metadata: Metadata = {
  title: 'Red Sea Watch — Community Science Wildlife Observatory',
  description:
    'Crowdsourced biodiversity monitoring platform for divers, fishermen, and researchers along the Egyptian Red Sea coast.',
};

export default async function WatchHubPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const currentType = params.type as ObservationType | undefined;

  const [sightings, stats, photos] = await Promise.all([
    getApprovedSightings({ type: currentType || 'ALL', limit: 40 }),
    getSightingsStats(),
    getPhotoStories({ featuredOnly: true, limit: 3 }),
  ]);

  const mapPoints = sightings.map((s) => ({
    id: s.id,
    name: `${s.reported_common_name} (${s.count} observed)`,
    latitude: s.lat_public,
    longitude: s.lng_public,
    type: s.observation_type,
    isSensitive: s.is_sensitive_species,
  }));

  const filterTabs = [
    { label: 'All Observations', value: '' },
    { label: 'Marine Wildlife', value: 'MARINE' },
    { label: 'Coastal Birds', value: 'BIRD' },
    { label: 'Mangrove & Desert', value: 'OTHER_WILDLIFE' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-primary border border-primary px-2.5 py-0.5 rounded font-semibold">
              Community Science Network
            </span>
            <SampleBadge />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Red Sea Watch Observatory
          </h1>
          <p className="font-serif text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            Crowdsourcing verified elasmobranch, sea turtle, and dugong observations with automated spatial protection. Every record undergoes scientific review before public indexing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/watch/submit"
            className="inline-flex items-center gap-2 font-sans font-semibold bg-sea-900 text-paper hover:bg-sea-700 dark:bg-paper dark:text-sea-900 px-5 py-2.5 rounded text-sm shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-coral-500" />
            <span>Share a Sighting</span>
          </Link>

          <Link
            href="/watch/photos"
            className="inline-flex items-center gap-2 font-sans font-medium border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 px-4 py-2.5 rounded text-sm transition-colors"
          >
            <Camera className="w-4 h-4 text-stone-500" />
            <span>Photo Stories</span>
          </Link>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-stone-200 dark:border-stone-800 bg-card p-4 rounded-sm space-y-1">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span>Verified Sightings</span>
          </div>
          <div className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
            {stats.approvedCount}
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-card p-4 rounded-sm space-y-1">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <Compass className="w-3.5 h-3.5 text-coral-500" />
            <span>Species Documented</span>
          </div>
          <div className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
            {stats.speciesCount}
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-card p-4 rounded-sm space-y-1">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <Users className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
            <span>Active Observers</span>
          </div>
          <div className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
            {stats.observerCount}
          </div>
        </div>

        <div className="border border-stone-200 dark:border-stone-800 bg-card p-4 rounded-sm space-y-1">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>Under Moderation</span>
          </div>
          <div className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
            {stats.pendingCount}
          </div>
        </div>
      </div>

      {/* Interactive Sightings Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            Field Sightings Georeference
          </h2>
          <span className="text-xs font-mono text-stone-500 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Yellow rings indicate ±11km blurred coordinates for sensitive taxa
          </span>
        </div>
        <CoordinateMap points={mapPoints} heightClass="h-[420px]" />
      </div>

      {/* Sightings Feed Section */}
      <section className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            index="01"
            title="Recent Scientific Sightings"
            subtitle="Observations verified by our marine ecology board and partner institutions."
          />
          <Link
            href="/watch/submit"
            className="font-mono text-xs text-primary hover:underline font-semibold"
          >
            + Report New Sighting →
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
          {filterTabs.map((tab) => {
            const isActive = (params.type || '') === tab.value;
            return (
              <Link
                key={tab.label}
                href={tab.value ? `/watch?type=${tab.value}` : '/watch'}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Sightings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sightings.map((s) => (
            <article
              key={s.id}
              className="flex flex-col justify-between border border-stone-300 dark:border-stone-800 rounded-sm p-5 bg-card space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    {s.observation_type}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {s.is_sensitive_species && (
                      <span className="text-[9px] font-mono bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-1.5 py-0.5 rounded">
                        ±11km Protected
                      </span>
                    )}
                    {s.is_demo && <SampleBadge />}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                    {s.reported_common_name}
                  </h3>
                  <p className="font-mono text-xs text-stone-500 mt-0.5">
                    Count: {s.count} • {s.location_label}
                  </p>
                </div>

                {s.behavior && (
                  <p className="font-serif text-xs text-stone-700 dark:text-stone-300 leading-relaxed italic">
                    &ldquo;{s.behavior}&rdquo;
                  </p>
                )}

                {s.notes && (
                  <p className="font-sans text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                    {s.notes}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-stone-500">
                <CoordinateTag
                  lat={s.lat_public}
                  lng={s.lng_public}
                  isApproximate={s.is_sensitive_species}
                />
                <span className="text-[11px]">
                  {new Date(s.observed_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Photo Stories Spotlight */}
      {photos.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-end justify-between">
            <SectionHeader
              index="02"
              title="Community Photo Stories"
              subtitle="Visual field dispatches documented by divers and coastal photographers."
            />
            <Link
              href="/watch/photos"
              className="font-mono text-xs text-primary hover:underline font-semibold"
            >
              View Full Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="border border-stone-300 dark:border-stone-800 rounded-sm overflow-hidden bg-card space-y-3 group"
              >
                <div className="aspect-[4/3] bg-stone-950 overflow-hidden relative">
                  <img
                    src={photo.image_url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    {photo.is_demo && <SampleBadge />}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="font-serif text-xs text-stone-800 dark:text-stone-200 line-clamp-3 leading-relaxed">
                    {photo.caption}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <span>{photo.location_label}</span>
                    <span>Photo: {photo.submitter_name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
