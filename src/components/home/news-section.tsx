import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock, Calendar, Quote, ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { StoryCard } from '@/components/ui/cards';
import { Badge } from '@/components/ui/badge';
import { SampleBadge } from '@/components/ui/sample-badge';
import { getArticles } from '@/server/queries/articles';
import { getCuratedHeadlines } from '@/server/queries/headlines';

const DEFAULT_SECONDARY_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80',
];

const DEFAULT_NEWLY_PUBLISHED_IMAGES = [
  'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=400&q=80',
];

export async function NewsSection() {
  const { articles } = await getArticles({ limit: 6 });
  const headlines = await getCuratedHeadlines(5);

  const leadStory = articles[0] || null;
  const secondaryStories = articles.slice(1, 3);
  const newlyPublished = articles.slice(3, 6);

  return (
    <section
      id="section-news"
      aria-labelledby="heading-news"
      className="w-full bg-paper dark:bg-deep-sea py-16 md:py-24 transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          index="01"
          title="Red Sea News & Investigations"
          subtitle="Verified field dispatches, marine science, and coastal reporting from across the rift basin"
          href="/news"
          actionText="View all dispatches"
        />

        {/* Lead + Secondary Grid (Asymmetric 7/12 + 5/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Lead Story (7 cols) */}
          {leadStory && (
            <div className="lg:col-span-7 flex flex-col justify-between">
              <StoryCard
                featured
                slug={leadStory.slug}
                title={leadStory.title}
                dek={leadStory.dek || leadStory.excerpt}
                coverUrl={leadStory.cover_image_url || (leadStory as any).cover_media_url || 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80'}
                type={leadStory.type || 'FEATURE'}
                publishedAt={leadStory.published_at?.toISOString() || new Date().toISOString()}
                readingMinutes={leadStory.reading_time_minutes || 6}
                authorName={leadStory.author_name || 'Field Research Desk'}
                isDemo={leadStory.is_sample ?? true}
              />
            </div>
          )}

          {/* Secondary Column: 2 Stacked Stories + 1 Pull-Quote Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {secondaryStories.map((story, idx) => (
                <article
                  key={story.id}
                  className="group flex flex-col sm:flex-row gap-4 p-4 rounded-md border border-rule bg-paper-card dark:bg-paper-elevated/40 hover:border-coral-500/50 transition-colors"
                >
                  <div className="relative w-full sm:w-28 h-28 shrink-0 overflow-hidden rounded border border-rule/50">
                    <Image
                      src={story.cover_image_url || (story as any).cover_media_url || DEFAULT_SECONDARY_IMAGES[idx % DEFAULT_SECONDARY_IMAGES.length]}
                      alt={story.title}
                      fill
                      sizes="120px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
                        <span className="uppercase text-coral-600 dark:text-coral-400 font-semibold">{story.type}</span>
                        <span>•</span>
                        <span>{story.reading_time_minutes || 5}m read</span>
                      </div>
                      <Link href={`/news/${story.slug}`}>
                        <h3 className="font-serif text-base font-bold text-ink dark:text-paper group-hover:text-coral-500 transition-colors line-clamp-2 leading-snug">
                          {story.title}
                        </h3>
                      </Link>
                    </div>
                    <p className="text-xs text-muted line-clamp-2 font-sans">
                      {story.dek || story.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Editorial Statement Card (In Platform's Own Voice) */}
            <div className="relative p-6 rounded-md bg-sea-900 text-paper border border-sea-700/60 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-coral-400 font-semibold flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Editorial Field Charter</span>
                </span>
                <span className="text-[10px] font-mono bg-paper/20 px-2 py-0.5 rounded text-paper">
                  EDITORIAL
                </span>
              </div>
              <blockquote className="font-serif italic text-sm md:text-base leading-relaxed text-paper/95">
                &ldquo;The Red Sea rift represents an invaluable natural laboratory for marine science. Across all seven coastal nations, documenting thermal resilience, endemic biodiversity, and vernacular maritime knowledge remains our central editorial commitment.&rdquo;
              </blockquote>
              <div className="pt-2 border-t border-paper/15 flex items-center justify-between text-xs font-sans">
                <span className="text-paper/75">
                  Red Sea Monitor Editorial Desk
                </span>
                <Link
                  href="/editorial-policy"
                  className="text-coral-400 hover:text-coral-300 font-mono text-[11px] hover:underline"
                >
                  Standards & Sources →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Headlines Strip & Newly Published Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-rule">
          {/* Latest Headlines List (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                Latest Basin Headlines
              </h4>
              <span className="text-[11px] font-mono text-muted">Curated Feeds</span>
            </div>

            <ul className="space-y-3">
              {headlines.map((item) => (
                <li
                  key={item.id}
                  className="pb-3 border-b border-rule/50 last:border-b-0 space-y-1.5"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start justify-between gap-2 text-sm font-sans font-medium text-ink dark:text-paper hover:text-coral-500 transition-colors leading-snug"
                  >
                    <span>{item.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-coral-500 transition-opacity mt-0.5" />
                  </a>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-muted">
                    <span className="bg-coral-500/10 text-coral-600 dark:text-coral-400 border border-coral-500/20 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                      SAMPLE
                    </span>
                    <span>{item.publisher}</span>
                    <span>•</span>
                    <time dateTime={item.published_on.toISOString()}>
                      {item.published_on.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Newly Published Row (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Newly Published Field Dispatches
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {newlyPublished.map((story, idx) => (
                <Link
                  key={story.id}
                  href={`/news/${story.slug}`}
                  className="group flex flex-col justify-between p-4 rounded-md border border-rule bg-paper-card dark:bg-paper-elevated/40 hover:border-coral-500/40 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="relative aspect-[3/2] w-full rounded overflow-hidden border border-rule/50">
                      <Image
                        src={story.cover_image_url || (story as any).cover_media_url || DEFAULT_NEWLY_PUBLISHED_IMAGES[idx % DEFAULT_NEWLY_PUBLISHED_IMAGES.length]}
                        alt={story.title}
                        fill
                        sizes="240px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-muted">
                      <span className="text-coral-600 dark:text-coral-400 uppercase font-semibold">{story.type}</span>
                      <span>•</span>
                      <span>{story.reading_time_minutes || 5}m</span>
                    </div>
                    <h5 className="font-serif text-sm font-bold text-ink dark:text-paper group-hover:text-coral-500 line-clamp-2 leading-snug">
                      {story.title}
                    </h5>
                  </div>
                  <div className="pt-2 text-xs font-sans text-muted group-hover:text-ink dark:group-hover:text-paper flex items-center gap-1 font-medium mt-2">
                    <span>Read dispatch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
