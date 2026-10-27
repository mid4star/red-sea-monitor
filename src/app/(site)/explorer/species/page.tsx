import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSpeciesList } from '@/server/queries/explorer';
import { SpeciesGroup, IucnStatus } from '@prisma/client';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { IucnScale } from '@/components/explorer/iucn-scale';

export const metadata: Metadata = {
  title: 'Species Biogeographic Catalog — Red Sea Monitor',
  description:
    'Comprehensive directory of marine and terrestrial fauna and flora across Egypt’s Red Sea and Eastern Desert, with IUCN conservation statuses.',
};

export default async function SpeciesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string; iucn?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentGroup = params.group as SpeciesGroup | undefined;
  const currentIucn = params.iucn as IucnStatus | undefined;
  const searchQuery = params.q;

  const species = await getSpeciesList({
    group: currentGroup || 'ALL',
    iucn: currentIucn || 'ALL',
    search: searchQuery,
    limit: 60,
  });

  const groupTabs = [
    { label: 'All Taxa', value: '' },
    { label: 'Reptiles', value: 'REPTILE' },
    { label: 'Marine Mammals', value: 'MAMMAL' },
    { label: 'Fish & Elasmobranchs', value: 'FISH' },
    { label: 'Corals & Invertebrates', value: 'CORAL' },
    { label: 'Birds', value: 'BIRD' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Explorer', href: '/explorer' },
          { label: 'Species Catalog' },
        ]}
      />

      <div className="space-y-4 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Red Sea Biogeographic Species Catalog
        </h1>
        <p className="font-serif text-base text-stone-600 dark:text-stone-300 leading-relaxed">
          Peer-reviewed taxonomic directory documenting resident, migratory, and endemic marine organisms. For threatened taxa, coordinates are protected using regional spatial obfuscation.
        </p>
      </div>

      {/* Group Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {groupTabs.map((tab) => {
          const isActive = (params.group || '') === tab.value;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/explorer/species?group=${tab.value}` : '/explorer/species'}
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

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {species.map((sp) => (
          <article
            key={sp.id}
            className="flex flex-col justify-between border border-stone-300 dark:border-stone-800 rounded-sm p-5 bg-card hover:shadow-md transition-shadow group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                  {sp.group}
                </span>
                <div className="flex items-center gap-1.5">
                  {sp.is_sensitive && (
                    <span
                      title="Coordinates blurred to protect wildlife"
                      className="text-[9px] font-mono bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-1.5 py-0.5 rounded"
                    >
                      Sensitive Taxon
                    </span>
                  )}
                  {sp.is_demo && <SampleBadge />}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-primary transition-colors">
                  <Link href={`/explorer/species/${sp.slug}`}>
                    {sp.common_name}
                  </Link>
                </h2>
                <p className="font-serif italic text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {sp.scientific_name}
                </p>
              </div>

              <p className="font-serif text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                {sp.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-200 dark:border-stone-800">
              <IucnScale status={sp.iucn_status} showDetails={false} />
            </div>
          </article>
        ))}
      </div>

      {species.length === 0 && (
        <div className="text-center py-12 border border-dashed border-stone-300 dark:border-stone-800 rounded p-6">
          <p className="font-serif text-stone-500">No species found matching the selected group.</p>
          <Link href="/explorer/species" className="mt-2 inline-block font-mono text-xs text-primary underline">
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
}
