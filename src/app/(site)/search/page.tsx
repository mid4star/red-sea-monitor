import React from 'react';
import Link from 'next/link';
import { Search, BookOpen, Compass, Fish, Calendar, ArrowUpRight } from 'lucide-react';
import { globalSearch } from '@/server/queries/search';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata = {
  title: 'Global Search across Field Archive',
  description: 'Search articles, species taxonomy, gazetteer places, research library items, and grants.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const q = params.q || '';

  const results = await globalSearch(q);

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-10">
      <Breadcrumbs items={[{ label: 'Global Field Search' }]} />

      <div className="border-b border-rule pb-8 space-y-4 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-paper">
          Archive & Gazetteer Search
        </h1>

        {/* Search Bar Input */}
        <form method="GET" action="/search" className="relative max-w-xl">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search corals, dugongs, Ras Mohammed, grants, authors..."
            autoFocus
            className="w-full pl-12 pr-4 py-3 text-sm font-sans rounded-md border border-rule bg-paper-card text-ink dark:text-paper focus:outline-none focus:border-sea-700 shadow-sm"
          />
        </form>

        {q && (
          <p className="font-mono text-xs text-muted">
            Found {results.total} matching records across Red Sea Monitor for &ldquo;{q}&rdquo;.
          </p>
        )}
      </div>

      {q ? (
        <div className="space-y-12">
          {/* 1. News & Investigations */}
          {results.articles.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-rule pb-2">
                <BookOpen className="w-4 h-4 text-sea-700 dark:text-sea-500" />
                <h2 className="font-serif text-xl font-bold text-ink dark:text-paper">
                  Articles & Investigations ({results.articles.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.articles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/news/${art.slug}`}
                    className="p-4 border border-rule rounded-md bg-paper-card hover:border-sea-700 transition-colors block group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="sea">{art.type}</Badge>
                      <span className="font-mono text-xs text-muted">
                        {new Date(art.published_at).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-semibold text-ink dark:text-paper group-hover:text-sea-700">
                      {art.title}
                    </h3>
                    {art.dek && <p className="text-xs text-muted mt-1 line-clamp-2">{art.dek}</p>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 2. Species Taxonomy */}
          {results.species.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-rule pb-2">
                <Fish className="w-4 h-4 text-sea-700 dark:text-sea-500" />
                <h2 className="font-serif text-xl font-bold text-ink dark:text-paper">
                  Species Guide ({results.species.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.species.map((sp) => (
                  <Link
                    key={sp.id}
                    href={`/explorer/species/${sp.slug}`}
                    className="p-4 border border-rule rounded-md bg-paper-card hover:border-sea-700 transition-colors block group"
                  >
                    <Badge variant="neutral">IUCN: {sp.iucn_status}</Badge>
                    <h3 className="font-serif text-base font-semibold text-ink dark:text-paper group-hover:text-sea-700 mt-2">
                      {sp.common_name}
                    </h3>
                    <p className="font-serif italic text-xs text-muted mt-0.5">{sp.scientific_name}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 3. Places & Protected Areas */}
          {results.places.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-rule pb-2">
                <Compass className="w-4 h-4 text-sea-700 dark:text-sea-500" />
                <h2 className="font-serif text-xl font-bold text-ink dark:text-paper">
                  Gazetteer Places ({results.places.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.places.map((place) => (
                  <Link
                    key={place.id}
                    href={`/explorer/places/${place.slug}`}
                    className="p-4 border border-rule rounded-md bg-paper-card hover:border-sea-700 transition-colors block group"
                  >
                    <Badge variant="sand">{place.type.replace('_', ' ')}</Badge>
                    <h3 className="font-serif text-base font-semibold text-ink dark:text-paper group-hover:text-sea-700 mt-2">
                      {place.name}
                    </h3>
                    {place.summary && <p className="text-xs text-muted mt-1 line-clamp-2">{place.summary}</p>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 4. Research Library Items */}
          {results.library.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-rule pb-2">
                <BookOpen className="w-4 h-4 text-sea-700 dark:text-sea-500" />
                <h2 className="font-serif text-xl font-bold text-ink dark:text-paper">
                  Scientific Library ({results.library.length})
                </h2>
              </div>
              <div className="space-y-2">
                {results.library.map((lib) => (
                  <div key={lib.id} className="p-3 border border-rule rounded-md bg-paper-card text-xs">
                    <span className="font-mono text-muted mr-2">[{lib.year}]</span>
                    <span className="font-serif font-semibold text-ink dark:text-paper">{lib.title}</span>
                    <span className="text-muted font-sans ml-2">— {lib.authors_text}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. Opportunities */}
          {results.opportunities.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-rule pb-2">
                <Calendar className="w-4 h-4 text-sea-700 dark:text-sea-500" />
                <h2 className="font-serif text-xl font-bold text-ink dark:text-paper">
                  Grants & Opportunities ({results.opportunities.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.opportunities.map((opp) => (
                  <Link
                    key={opp.id}
                    href={`/opportunities/${opp.slug}`}
                    className="p-4 border border-rule rounded-md bg-paper-card hover:border-sea-700 transition-colors block group"
                  >
                    <Badge variant="sea">{opp.kind}</Badge>
                    <h3 className="font-serif text-base font-semibold text-ink dark:text-paper group-hover:text-sea-700 mt-2">
                      {opp.title}
                    </h3>
                    <p className="text-xs text-muted mt-1">{opp.organization?.name}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.total === 0 && (
            <div className="py-16 text-center border border-dashed border-rule rounded-md p-8">
              <Compass className="w-8 h-8 text-muted mx-auto mb-2" />
              <h3 className="font-serif text-lg font-semibold">No Matching Records Found</h3>
              <p className="text-xs text-muted max-w-sm mx-auto mt-1">
                Try searching for broader marine taxonomic groups like &ldquo;turtle&rdquo;, &ldquo;coral&rdquo;, or places like &ldquo;Hamata&rdquo;.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 border border-rule rounded-md bg-paper-card p-6 text-center text-muted font-sans text-xs">
          Enter a search query above to query across peer-reviewed investigations, species, dive sites, and academic datasets.
        </div>
      )}
    </div>
  );
}
