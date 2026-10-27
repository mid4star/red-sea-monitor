import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';
import { getArticles, getAllTopics } from '@/server/queries/articles';
import { StoryCard } from '@/components/ui/cards';
import { SectionHeader } from '@/components/ui/section-header';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { ContentStatus, ArticleType } from '@prisma/client';

export const metadata = {
  title: 'Red Sea News & Investigations',
  description: 'Verified environmental reporting, marine biology dispatches, and conservation policies across Egypt’s Red Sea and Eastern Desert.',
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || '1');
  const typeFilter = params.type as ArticleType | undefined;
  const topicFilter = params.topic;
  const searchQuery = params.q;

  const [{ articles, total, totalPages, currentPage }, topics] = await Promise.all([
    getArticles({
      page,
      limit: 9,
      status: ContentStatus.PUBLISHED,
      type: typeFilter,
      topicSlug: topicFilter,
      query: searchQuery,
    }),
    getAllTopics(),
  ]);

  const leadArticle = page === 1 && !typeFilter && !topicFilter && !searchQuery ? articles[0] : null;
  const listArticles = leadArticle ? articles.slice(1) : articles;

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-rule pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="coral">Verified Journal</Badge>
          <span className="font-mono text-xs text-muted">All dispatches require primary sources</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper">
          Red Sea News & Field Investigations
        </h1>
        <p className="font-sans text-base text-muted max-w-2xl leading-relaxed">
          Rigorous science reporting, coral thermal tolerance telemetry, protected area decrees, and artisanal fishing chronicles.
        </p>

        {/* Search & Topic Filters */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Topic chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs font-sans">
            <Link
              href="/news"
              className={`px-3 py-1.5 rounded-sm border select-none transition-colors ${
                !topicFilter
                  ? 'bg-sea-900 border-sea-900 text-paper font-semibold dark:bg-paper dark:text-sea-900'
                  : 'border-rule text-muted hover:border-ink/40'
              }`}
            >
              All Topics
            </Link>

            {topics.map((t) => {
              const isSelected = topicFilter === t.slug;
              return (
                <Link
                  key={t.id}
                  href={`/news?topic=${t.slug}`}
                  className={`px-3 py-1.5 rounded-sm border whitespace-nowrap select-none transition-colors ${
                    isSelected
                      ? 'bg-sea-900 border-sea-900 text-paper font-semibold dark:bg-paper dark:text-sea-900'
                      : 'border-rule text-muted hover:border-ink/40'
                  }`}
                >
                  <span>{t.name}</span>
                  <span className="font-mono text-[10px] opacity-60 ml-1">({t._count.articles})</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Search */}
          <form method="GET" action="/news" className="relative shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              name="q"
              defaultValue={searchQuery || ''}
              placeholder="Search dispatches..."
              className="pl-9 pr-4 py-1.5 text-xs font-sans rounded-md border border-rule bg-paper-card focus:outline-none focus:border-sea-700 w-full sm:w-60"
            />
          </form>
        </div>
      </div>

      {/* Lead Story (Asymmetric 7/12 split on page 1) */}
      {leadArticle && (
        <section aria-labelledby="lead-dispatch" className="border-b border-rule pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-sea-700 dark:text-sea-500 font-semibold block mb-4">
            01 / Featured Investigation
          </span>
          <StoryCard
            featured
            slug={leadArticle.slug}
            title={leadArticle.title}
            dek={leadArticle.dek}
            type={leadArticle.type}
            publishedAt={leadArticle.published_at?.toISOString() || null}
            readingMinutes={leadArticle.reading_minutes}
            authorName={leadArticle.authors[0]?.author.display_name}
            sourcePublisher={leadArticle.sources[0]?.publisher}
            isDemo={leadArticle.is_demo}
          />
        </section>
      )}

      {/* Grid of Stories (Varied Asymmetric Rhythm) */}
      <section aria-labelledby="dispatches-grid" className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-muted border-b border-rule/50 pb-2">
          <span>Displaying {articles.length} of {total} dispatches</span>
          {typeFilter && <span>Filtered by: {typeFilter}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listArticles.map((article) => (
            <StoryCard
              key={article.id}
              slug={article.slug}
              title={article.title}
              dek={article.dek}
              type={article.type}
              publishedAt={article.published_at?.toISOString() || null}
              readingMinutes={article.reading_minutes}
              authorName={article.authors[0]?.author.display_name}
              sourcePublisher={article.sources[0]?.publisher}
              isDemo={article.is_demo}
            />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="py-16 text-center border border-dashed border-rule rounded-md bg-bathymetry-subtle p-8">
            <BookOpen className="w-8 h-8 text-muted mx-auto mb-3" />
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">No Dispatches Found</h3>
            <p className="text-xs text-muted max-w-sm mx-auto mt-1">
              There are currently no published dispatches matching your selected criteria.
            </p>
            <div className="pt-4">
              <Link href="/news" className="text-xs font-mono text-coral-500 hover:underline">
                Clear all filters
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-8 border-t border-rule font-mono text-xs">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              const isCurrent = p === currentPage;
              return (
                <Link
                  key={p}
                  href={`/news?page=${p}${topicFilter ? `&topic=${topicFilter}` : ''}${typeFilter ? `&type=${typeFilter}` : ''}`}
                  className={`w-9 h-9 flex items-center justify-center rounded border font-semibold ${
                    isCurrent
                      ? 'bg-sea-900 border-sea-900 text-paper'
                      : 'border-rule hover:bg-ink/5'
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
