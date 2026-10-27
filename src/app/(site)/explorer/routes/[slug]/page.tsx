import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getRouteBySlug } from '@/server/queries/explorer';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rt = await getRouteBySlug(slug);
  if (!rt) return { title: 'Route Not Found — Red Sea Monitor' };

  return {
    title: `${rt.title} — Red Sea Monitor Field Routes`,
    description: rt.summary || `Field itinerary, stops, and safety advice for ${rt.title}.`,
  };
}

export default async function RouteDetailPage({ params }: Props) {
  const { slug } = await params;
  const rt = await getRouteBySlug(slug);

  if (!rt) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Explorer', href: '/explorer' },
          { label: 'Routes', href: '/explorer/routes' },
          { label: rt.title },
        ]}
      />

      <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200 bg-stone-200 dark:bg-stone-800 px-2.5 py-1 rounded">
            {rt.difficulty} Grade
          </span>
          {rt.is_demo && <SampleBadge />}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          {rt.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-500">
          {rt.distance_km && <span>Distance: {rt.distance_km} km</span>}
          {rt.duration_hours && <span>Duration: {rt.duration_hours} hours</span>}
          {rt.season && <span>Optimal Season: {rt.season}</span>}
        </div>
      </header>

      {/* Summary */}
      <div className="prose dark:prose-invert font-serif text-stone-800 dark:text-stone-200 max-w-none text-base leading-relaxed">
        <p className="text-lg leading-relaxed text-stone-900 dark:text-stone-100 font-medium">
          {rt.summary}
        </p>
      </div>

      {/* Permits & Safety Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {rt.permits_notes && (
          <div className="border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 p-4 rounded-sm space-y-1">
            <span className="font-mono uppercase tracking-wider text-stone-500 font-semibold block">
              Required Environmental & Police Clearances
            </span>
            <p className="font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
              {rt.permits_notes}
            </p>
          </div>
        )}

        {rt.safety_notes && (
          <div className="border border-amber-300 dark:border-amber-800/60 bg-amber-500/10 p-4 rounded-sm space-y-1">
            <span className="font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold block">
              Field Caution & Navigation Safety
            </span>
            <p className="font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
              {rt.safety_notes}
            </p>
          </div>
        )}
      </div>

      {/* Stops Timeline */}
      {rt.stops && rt.stops.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Itinerary Waypoints & Transect Stations
          </h2>

          <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-300 dark:before:bg-stone-700">
            {rt.stops.map((stop: any, idx: number) => (
              <div key={idx} className="relative flex items-start gap-4 pl-10">
                <div className="absolute left-2 top-0.5 -translate-x-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground font-mono text-[10px] font-bold shadow">
                  {stop.order || idx + 1}
                </div>
                <div className="space-y-1 border border-stone-200 dark:border-stone-800 bg-card p-3 rounded flex-1">
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    {stop.name || stop.place?.name}
                  </h3>
                  {stop.note && (
                    <p className="font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {stop.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
        <Link
          href="/explorer/routes"
          className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
        >
          ← Back to Field Routes Directory
        </Link>
      </div>
    </div>
  );
}
