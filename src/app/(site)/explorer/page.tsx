import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPlaces, getSpeciesList, getRoutes } from '@/server/queries/explorer';
import { CoordinateMap } from '@/components/explorer/coordinate-map';
import { Badge } from '@/components/ui/badge';
import { SampleBadge } from '@/components/ui/sample-badge';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SectionHeader } from '@/components/ui/section-header';
import { IucnScale } from '@/components/explorer/iucn-scale';
import { blurCoordinates } from '@/lib/geo';

export const metadata: Metadata = {
  title: 'Explorer — Red Sea Gazetteer & Biogeography',
  description:
    'An open spatial repository of marine sanctuaries, coral pinnacles, desert wadis, and vulnerable fauna across Egypt’s Red Sea and Eastern Desert.',
};

export default async function ExplorerHubPage() {
  const [places, species, routes] = await Promise.all([
    getPlaces({ limit: 12 }),
    getSpeciesList({ limit: 12 }),
    getRoutes({ limit: 6 }),
  ]);

  const mapPoints = places.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    type: p.type,
    latitude: p.latitude,
    longitude: p.longitude,
    isSensitive: false,
  }));

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="sea" className="font-mono text-xs uppercase tracking-wider">
            Spatial Gazetteer & Biogeography
          </Badge>
          <SampleBadge />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          The Red Sea Explorer
        </h1>
        <p className="font-serif text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          A peer-verified field gazetteer documenting marine sanctuaries, offshore coral pinnacles, prehistoric Eastern Desert wadis, and vulnerable fauna from the Gulf of Suez to the Sudanese border.
        </p>

        {/* Quick Nav Anchor Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href="#places"
            className="text-xs font-mono px-3 py-1.5 rounded bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors text-stone-800 dark:text-stone-200"
          >
            ↓ Places ({places.length})
          </a>
          <a
            href="#species"
            className="text-xs font-mono px-3 py-1.5 rounded bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors text-stone-800 dark:text-stone-200"
          >
            ↓ Species Catalog ({species.length})
          </a>
          <a
            href="#routes"
            className="text-xs font-mono px-3 py-1.5 rounded bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors text-stone-800 dark:text-stone-200"
          >
            ↓ Field Transects ({routes.length})
          </a>
        </div>
      </div>

      {/* Interactive Regional Overview Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            Hydrographic Map & Monitored Coordinates
          </h2>
          <span className="text-xs font-mono text-stone-500">
            Click pins to inspect site dossiers
          </span>
        </div>
        <CoordinateMap points={mapPoints} heightClass="h-[420px]" />
      </div>

      {/* Places Section */}
      <section id="places" className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            index="01"
            title="Monitored Places & Sanctuaries"
            subtitle="Protected areas, oceanic reefs, coastal bays, and ancient geological wadis."
          />
          <Link
            href="/explorer/places"
            className="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            View Full Gazetteer ({places.length} sites) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <article
              key={place.id}
              className="flex flex-col justify-between border border-stone-300 dark:border-stone-800 rounded-sm p-5 bg-card hover:shadow-md transition-shadow group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    {place.type.replace('_', ' ')}
                  </span>
                  {place.is_demo && <SampleBadge />}
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-primary transition-colors">
                  <Link href={`/explorer/places/${place.slug}`}>
                    {place.name}
                  </Link>
                </h3>

                <p className="font-serif text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                  {place.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
                <CoordinateTag
                  lat={place.latitude}
                  lng={place.longitude}
                />
                {place.area_km2 && (
                  <span className="text-stone-500">
                    {place.area_km2} km²
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Species Section */}
      <section id="species" className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            index="02"
            title="Biogeographic Fauna & Flora Directory"
            subtitle="Cataloging endemic, threatened, and keystone species of the Red Sea marine ecoregion."
          />
          <Link
            href="/explorer/species"
            className="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            View All Species ({species.length} taxa) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {species.map((sp) => (
            <article
              key={sp.id}
              className="flex flex-col justify-between border border-stone-300 dark:border-stone-800 rounded-sm p-4 bg-card hover:border-primary/60 transition-colors group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                    {sp.group}
                  </span>
                  {sp.is_sensitive && (
                    <span
                      title="Coordinates are blurred to protect nesting or aggregation sites"
                      className="text-[9px] font-mono bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-1.5 py-0.2 rounded"
                    >
                      Sensitive Taxon
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-primary transition-colors">
                    <Link href={`/explorer/species/${sp.slug}`}>
                      {sp.common_name}
                    </Link>
                  </h3>
                  <p className="font-serif italic text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {sp.scientific_name}
                  </p>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {sp.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-200 dark:border-stone-800">
                <IucnScale status={sp.iucn_status} showDetails={false} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Field Routes Section */}
      <section id="routes" className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            index="03"
            title="Field Transects & Itineraries"
            subtitle="Verified research expeditions, coastal monitoring routes, and desert wadi trails."
          />
          <Link
            href="/explorer/routes"
            className="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            Explore Routes ({routes.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((rt) => (
            <article
              key={rt.id}
              className="border border-stone-300 dark:border-stone-800 rounded-sm p-5 bg-card space-y-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  {rt.difficulty}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {rt.distance_km} km • {rt.duration_hours}h
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-primary transition-colors">
                  <Link href={`/explorer/routes/${rt.slug}`}>
                    {rt.title}
                  </Link>
                </h3>
                <p className="font-serif text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-3 leading-relaxed">
                  {rt.summary}
                </p>
              </div>

              {rt.stops && rt.stops.length > 0 && (
                <div className="text-xs font-mono text-stone-500 pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center gap-1.5">
                  <span className="font-bold text-primary">{rt.stops.length} Waypoints</span>
                  <span>— {rt.season}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
