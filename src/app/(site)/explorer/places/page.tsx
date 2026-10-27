import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPlaces } from '@/server/queries/explorer';
import { PlaceType } from '@prisma/client';
import { SampleBadge } from '@/components/ui/sample-badge';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Places Gazetteer — Red Sea Monitor',
  description: 'Gazetteer of marine sanctuaries, coral reefs, and coastal sectors across the Red Sea basin.',
};

export default async function PlacesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentType = params.type as PlaceType | undefined;
  const searchQuery = params.q;

  const places = await getPlaces({
    type: currentType || 'ALL',
    search: searchQuery,
    limit: 60,
  });

  const filterTabs = [
    { label: 'All Places', value: '' },
    { label: 'Protected Areas', value: 'PROTECTED_AREA' },
    { label: 'Reefs & Pinnacles', value: 'REEF' },
    { label: 'Islands', value: 'ISLAND' },
    { label: 'Coastal Towns', value: 'COASTAL_TOWN' },
    { label: 'Heritage Sites', value: 'HERITAGE_SITE' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Explorer', href: '/explorer' },
          { label: 'Places Gazetteer' },
        ]}
      />

      <div className="space-y-4 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Red Sea Places & Coastal Gazetteer
        </h1>
        <p className="font-serif text-base text-stone-600 dark:text-stone-300 leading-relaxed">
          Georeferenced documentation of protected zones, oceanic pinnacles, and ancient trade routes across the Egyptian Red Sea coastline and Eastern Desert.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {filterTabs.map((tab) => {
          const isActive = (params.type || '') === tab.value;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/explorer/places?type=${tab.value}` : '/explorer/places'}
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

      {/* Places Grid */}
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

              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-primary transition-colors">
                <Link href={`/explorer/places/${place.slug}`}>
                  {place.name}
                </Link>
              </h2>

              {place.protection_status && (
                <div className="text-xs font-mono text-stone-500">
                  {place.protection_status}
                </div>
              )}

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

      {places.length === 0 && (
        <div className="text-center py-12 border border-dashed border-stone-300 dark:border-stone-800 rounded p-6">
          <p className="font-serif text-stone-500">No places found matching the selected filter.</p>
          <Link href="/explorer/places" className="mt-2 inline-block font-mono text-xs text-primary underline">
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
}
