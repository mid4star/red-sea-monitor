import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getLibraryItems } from '@/server/queries/library';
import { LibraryItemType } from '@prisma/client';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Library & Scientific Archive — Red Sea Monitor',
  description:
    'Peer-reviewed marine biology research papers, historical monographs, bathymetric surveys, and open-access datasets on the Red Sea.',
};

export default async function LibraryIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; open_access?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentType = params.type as LibraryItemType | undefined;
  const openAccessOnly = params.open_access === 'true';
  const searchQuery = params.q;

  const items = await getLibraryItems({
    type: currentType || 'ALL',
    openAccessOnly,
    search: searchQuery,
    limit: 60,
  });

  const typeTabs = [
    { label: 'All Items', value: '' },
    { label: 'Research Papers', value: 'PAPER' },
    { label: 'Technical Reports', value: 'REPORT' },
    { label: 'Books & Monographs', value: 'BOOK' },
    { label: 'Bathymetric Maps', value: 'MAP' },
    { label: 'Datasets', value: 'DATASET' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library & Archive' },
        ]}
      />

      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-primary border border-primary px-2 py-0.5 rounded">
            Scientific Literature Repository
          </span>
          <SampleBadge />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Red Sea Library & Science Archive
        </h1>
        <p className="font-serif text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          Curated bibliographic database cataloging over a century of marine scientific literature, bathymetric expeditions, taxonomic keys, and open-access data matrices.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex flex-wrap gap-2">
          {typeTabs.map((tab) => {
            const isActive = (params.type || '') === tab.value;
            return (
              <Link
                key={tab.label}
                href={tab.value ? `/library?type=${tab.value}` : '/library'}
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

        <div>
          <Link
            href={openAccessOnly ? '/library' : '/library?open_access=true'}
            className={`px-2.5 py-1 rounded text-xs font-mono border transition-colors ${
              openAccessOnly
                ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            {openAccessOnly ? '✓ Open Access Only' : 'Filter Open Access'}
          </Link>
        </div>
      </div>

      {/* Library Items Listing */}
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="border border-stone-300 dark:border-stone-800 rounded-sm p-5 bg-card hover:border-primary/60 transition-colors space-y-3 group"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                  {item.type}
                </span>
                <span className="text-xs font-mono font-semibold text-stone-700 dark:text-stone-300">
                  {item.year}
                </span>
                {item.is_open_access && (
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-1.5 py-0.2 rounded font-medium">
                    Open Access
                  </span>
                )}
              </div>
              {item.is_demo && <SampleBadge />}
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-primary transition-colors">
                <Link href={`/library/${item.slug}`}>
                  {item.title}
                </Link>
              </h2>
              {item.subtitle && (
                <p className="font-serif italic text-sm text-stone-600 dark:text-stone-400 mt-0.5">
                  {item.subtitle}
                </p>
              )}
            </div>

            <p className="font-sans text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-stone-700 dark:text-stone-300">{item.authors_text}</span>
              {item.publisher && ` — ${item.publisher}`}
            </p>

            <p className="font-serif text-xs text-stone-700 dark:text-stone-300 line-clamp-3 leading-relaxed">
              {item.abstract}
            </p>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-3 text-stone-500">
                {item.doi && <span>DOI: {item.doi}</span>}
                {item.isbn && <span>ISBN: {item.isbn}</span>}
              </div>

              <Link
                href={`/library/${item.slug}`}
                className="text-primary hover:underline font-semibold flex items-center gap-1"
              >
                Inspect Citation & Record →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 border border-dashed border-stone-300 dark:border-stone-800 rounded p-6">
          <p className="font-serif text-stone-500">No scientific records match your filter criteria.</p>
          <Link href="/library" className="mt-2 inline-block font-mono text-xs text-primary underline">
            Reset library filters
          </Link>
        </div>
      )}
    </div>
  );
}
