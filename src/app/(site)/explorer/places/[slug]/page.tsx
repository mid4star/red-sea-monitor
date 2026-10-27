import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPlaceBySlug } from '@/server/queries/explorer';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CoordinateMap } from '@/components/explorer/coordinate-map';
import { VisitGuidance } from '@/components/explorer/visit-guidance';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);
  if (!place) return { title: 'Place Not Found — Red Sea Monitor' };

  return {
    title: `${place.name} — Red Sea Monitor Gazetteer`,
    description: place.summary || `Geographic facts, coordinates, and visit guidance for ${place.name}.`,
  };
}

export default async function PlaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Explorer', href: '/explorer' },
          { label: 'Places', href: '/explorer/places' },
          { label: place.name },
        ]}
      />

      {/* Header Profile */}
      <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded">
            {place.type.replace('_', ' ')}
          </span>
          {place.protection_status && (
            <span className="text-xs font-mono text-stone-700 dark:text-stone-300 bg-stone-200 dark:bg-stone-700 px-2 py-0.5 rounded">
              {place.protection_status}
            </span>
          )}
          {place.is_demo && <SampleBadge />}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          {place.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-500">
          <CoordinateTag
            lat={place.latitude}
            lng={place.longitude}
          />
          {place.established_year && <span>Established {place.established_year}</span>}
          {place.area_km2 && <span>Protected Area: {place.area_km2} km²</span>}
        </div>
      </header>

      {/* Main Grid: Overview & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* Summary / Body */}
          <div className="prose dark:prose-invert font-serif text-stone-800 dark:text-stone-200 max-w-none text-base leading-relaxed">
            <p className="text-lg leading-relaxed text-stone-900 dark:text-stone-100 font-medium">
              {place.summary}
            </p>
          </div>

          {/* Responsible Field Guidance */}
          <VisitGuidance guidance={place.visit_guidance} />

          {/* Verified Literature Sources */}
          {place.sources && place.sources.length > 0 && (
            <div className="border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-5 rounded-sm space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Peer Sources & Verification Records ({place.sources.length})
              </h3>
              <ul className="space-y-2 text-xs">
                {place.sources.map((src: any) => (
                  <li key={src.id} className="flex items-start justify-between gap-3 border-b border-stone-200 dark:border-stone-800/60 pb-2 last:border-none last:pb-0">
                    <div>
                      <span className="font-serif font-bold text-stone-800 dark:text-stone-200 block">
                        {src.title}
                      </span>
                      <span className="text-stone-500 font-mono text-[11px]">
                        {src.publisher}
                      </span>
                    </div>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-primary hover:underline shrink-0 text-[11px]"
                    >
                      Source ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar: Map & Reviewer Box */}
        <aside className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block">
              Cartographic Placement
            </span>
            <CoordinateMap
              singlePoint={{
                name: place.name,
                latitude: place.latitude,
                longitude: place.longitude,
                area_km2: place.area_km2,
              }}
              heightClass="h-72"
              showCardPreview={false}
            />
            <div className="text-[11px] font-mono text-stone-500 flex justify-between">
              <span>WGS84 Coordinates</span>
              <span>{place.latitude.toFixed(4)}°N, {place.longitude.toFixed(4)}°E</span>
            </div>
          </div>

          {/* Reviewer / Verification Credit */}
          {place.reviewed_by && (
            <div className="border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/60 p-4 rounded-sm space-y-1.5 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Field Reviewer Verification
              </span>
              <p className="font-serif font-bold text-stone-900 dark:text-stone-100">
                {place.reviewed_by.name}
              </p>
              {place.reviewed_by.organization && (
                <p className="text-stone-600 dark:text-stone-400 font-sans text-[11px]">
                  {place.reviewed_by.organization}
                </p>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <Link
              href="/explorer/places"
              className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
            >
              ← Back to Places Gazetteer
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
