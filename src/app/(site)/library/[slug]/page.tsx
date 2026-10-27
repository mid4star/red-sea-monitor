import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLibraryItemBySlug } from '@/server/queries/library';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CitationWidget } from '@/components/library/citation-widget';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getLibraryItemBySlug(slug);
  if (!item) return { title: 'Publication Not Found — Red Sea Monitor' };

  return {
    title: `${item.title} — Red Sea Monitor Library`,
    description: item.abstract || `Bibliographic details and citations for ${item.title}.`,
  };
}

export default async function LibraryItemDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getLibraryItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const directUrl = item.doi
    ? `https://doi.org/${item.doi}`
    : item.external_url || null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library', href: '/library' },
          { label: item.title },
        ]}
      />

      {/* Header Profile */}
      <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded">
            {item.type}
          </span>
          <span className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-400 bg-stone-200 dark:bg-stone-700 px-2 py-0.5 rounded">
            Year {item.year}
          </span>
          {item.is_open_access && (
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded font-medium">
              Open Access
            </span>
          )}
          {item.is_demo && <SampleBadge />}
        </div>

        <div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {item.title}
          </h1>
          {item.subtitle && (
            <p className="font-serif italic text-lg text-stone-600 dark:text-stone-300 mt-2">
              {item.subtitle}
            </p>
          )}
        </div>

        <div className="space-y-1 text-sm font-sans pt-2">
          <p className="font-medium text-stone-900 dark:text-stone-100">
            {item.authors_text}
          </p>
          {item.publisher && (
            <p className="text-stone-500 font-mono text-xs">
              Published by {item.publisher} ({item.year})
            </p>
          )}
        </div>
      </header>

      {/* Abstract Section */}
      <div className="space-y-3">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
          Abstract & Bibliographic Summary
        </h2>
        <div className="prose dark:prose-invert font-serif text-stone-800 dark:text-stone-200 max-w-none text-base leading-relaxed bg-stone-50 dark:bg-stone-900/30 p-6 rounded-sm border border-stone-200 dark:border-stone-800">
          <p>{item.abstract}</p>
        </div>
      </div>

      {/* External Access Link if DOI or URL exists */}
      {directUrl && (
        <div className="flex items-center justify-between border border-stone-300 dark:border-stone-800 bg-card p-4 rounded-sm">
          <div>
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              Original Scientific Source
            </h4>
            <p className="text-xs font-mono text-stone-500 mt-0.5">
              {item.doi ? `Direct DOI Resolver: https://doi.org/${item.doi}` : directUrl}
            </p>
          </div>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-sans font-medium bg-sea-900 text-paper hover:bg-sea-700 px-3 py-1.5 rounded-md text-xs font-semibold"
          >
            Access Document ↗
          </a>
        </div>
      )}

      {/* Citation and BibTeX Widget */}
      <div className="space-y-3">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
          Academic Citation & Export
        </h2>
        <CitationWidget item={item} />
      </div>

      <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
        <Link
          href="/library"
          className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
        >
          ← Back to Science Library Catalog
        </Link>
      </div>
    </div>
  );
}
