import React from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Compass, Anchor, ArrowUpRight, Download, CheckCircle, FileCode } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getLibraryItems } from '@/server/queries/library';

interface LibraryCategory {
  title: string;
  count: number;
  description: string;
  icon: React.ElementType;
  href: string;
}

const CATEGORIES: LibraryCategory[] = [
  {
    title: 'Books & Monographic Papers',
    count: 14,
    description: 'Peer-reviewed treatises, historical naturalists journals, and definitive taxonomic revisions.',
    icon: BookOpen,
    href: '/library?type=BOOK',
  },
  {
    title: 'Studies & Expedition Reports',
    count: 22,
    description: 'PERSGA baseline surveys, oceanographic cruise records, and benthic transect datasets.',
    icon: FileText,
    href: '/library?type=REPORT',
  },
  {
    title: 'Nautical Charts & Field Maps',
    count: 9,
    description: 'Bathymetric contours, marine protected area coordinate maps, and satellite habitat charts.',
    icon: Compass,
    href: '/library?type=MAP',
  },
  {
    title: 'Maritime Memory & Heritage',
    count: 11,
    description: 'Oral histories of artisanal felucca fishers, pearling dhow routes, and vernacular coastal craft.',
    icon: Anchor,
    href: '/library?type=ORAL_HISTORY',
  },
];

export async function LibrarySection() {
  const items = await getLibraryItems({ limit: 1 });
  const featured = items[0] || null;

  return (
    <section
      id="section-library"
      aria-labelledby="heading-library"
      className="w-full bg-paper dark:bg-deep-sea py-16 md:py-24 transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          index="03"
          title="Red Sea Library & Open Archive"
          subtitle="Curated scientific literature, hydrographic maps, and cultural documentation for the rift basin"
          href="/library"
          actionText="Browse full archive"
        />

        {/* 4 Category Tiles: Mobile scroll-snap row / Desktop 4-col grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className="min-w-[82vw] sm:min-w-[280px] md:min-w-0 snap-center group p-6 rounded-md border border-rule bg-paper-card dark:bg-paper-elevated/40 hover:border-coral-500/50 flex flex-col justify-between transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded bg-sea-100 dark:bg-sea-900/60 text-sea-700 dark:text-sea-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-sand-300/30 dark:bg-sea-900/40 text-muted">
                      {cat.count} items
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink dark:text-paper group-hover:text-coral-500 transition-colors leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-muted font-sans mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-rule/50 mt-4 flex items-center justify-between text-xs font-sans text-coral-600 dark:text-coral-400 font-medium">
                  <span>Explore category</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured Item with Formal Citation Snippet */}
        {featured && (
          <div className="p-6 md:p-8 rounded-md bg-paper-card dark:bg-paper-elevated/50 border border-rule space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="neutral">Featured Milestone Citation</Badge>
                {featured.is_open_access && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3" />
                    <span>Open Access Science</span>
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-muted">
                DOI: {featured.doi || '10.1111/gcb.12198'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink dark:text-paper leading-snug">
                  {featured.title}
                </h3>
                <p className="text-xs font-mono text-muted">
                  Authors: {featured.authors_text} ({featured.year}) · Published in {featured.publisher}
                </p>
                <p className="text-xs sm:text-sm text-muted font-sans line-clamp-3 leading-relaxed pt-1">
                  {featured.abstract}
                </p>
              </div>

              {/* Citation Snippet Box */}
              <div className="lg:col-span-4 bg-paper dark:bg-deep-sea p-4 rounded border border-rule space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-muted text-[11px] pb-2 border-b border-rule">
                  <span className="flex items-center gap-1 font-semibold uppercase">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>APA Citation Ready</span>
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-ink/90 dark:text-paper/90 select-all">
                  {featured.citation_apa || `${featured.authors_text} (${featured.year}). ${featured.title}. ${featured.publisher}.`}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={featured.external_url || `https://doi.org/${featured.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coral-600 dark:text-coral-400 hover:underline flex items-center gap-1 font-sans text-xs font-medium"
                  >
                    <span>Read via Publisher</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
