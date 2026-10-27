import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getRoutes } from '@/server/queries/explorer';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Field Routes & Transects — Red Sea Monitor',
  description: 'Documented ecological research transects, liveaboard expeditions, and desert archaeological trails.',
};

export default async function RoutesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string }>;
}) {
  const params = await searchParams;
  const currentDiff = params.difficulty;

  const routes = await getRoutes({
    difficulty: currentDiff || 'ALL',
    limit: 50,
  });

  const diffTabs = [
    { label: 'All Routes', value: '' },
    { label: 'Easy (Coastal/Snorkel)', value: 'Easy' },
    { label: 'Moderate (Desert/Wadi)', value: 'Moderate' },
    { label: 'Demanding (Offshore/Liveaboard)', value: 'Demanding' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Explorer', href: '/explorer' },
          { label: 'Field Routes' },
        ]}
      />

      <div className="space-y-4 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Field Routes & Research Transects
        </h1>
        <p className="font-serif text-base text-stone-600 dark:text-stone-300 leading-relaxed">
          Standardized coastal transects, offshore marine liveaboard routes, and ancient Eastern Desert trails with environmental safety notes and ranger clearances.
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {diffTabs.map((tab) => {
          const isActive = (params.difficulty || '') === tab.value;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/explorer/routes?difficulty=${tab.value}` : '/explorer/routes'}
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

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((rt) => (
          <article
            key={rt.id}
            className="flex flex-col justify-between border border-stone-300 dark:border-stone-800 rounded-sm p-5 bg-card hover:shadow-md transition-shadow group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded font-semibold">
                  {rt.difficulty}
                </span>
                {rt.is_demo && <SampleBadge />}
              </div>

              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-primary transition-colors">
                <Link href={`/explorer/routes/${rt.slug}`}>
                  {rt.title}
                </Link>
              </h2>

              <p className="font-serif text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                {rt.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span>Distance: {rt.distance_km} km</span>
                <span>Duration: {rt.duration_hours}h</span>
              </div>
              {rt.season && (
                <div className="text-[11px] text-stone-500">
                  Best Window: {rt.season}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
