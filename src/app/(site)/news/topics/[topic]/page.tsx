import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getArticles } from '@/server/queries/articles';
import { StoryCard } from '@/components/ui/cards';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContentStatus } from '@prisma/client';
import { SEED_TOPICS } from '@/lib/seed-data';

export default async function TopicHubPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;

  let topicRecord: any = null;
  try {
    topicRecord = await prisma.topic.findUnique({
      where: { slug: topicSlug },
    });
  } catch (error) {
    // Graceful fallback
  }

  if (!topicRecord) {
    topicRecord = SEED_TOPICS.find((t) => t.slug === topicSlug);
  }

  if (!topicRecord) {
    notFound();
  }

  const { articles, total } = await getArticles({
    topicSlug,
    status: ContentStatus.PUBLISHED,
    limit: 12,
  });

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'News & Investigations', href: '/news' },
          { label: 'Topic Hubs', href: '/news' },
          { label: topicRecord.name },
        ]}
      />

      <div className="border-b border-rule pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="coral">Specialized Topic Hub</Badge>
          <span className="font-mono text-xs text-muted">{total} field dispatches</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper">
          {topicRecord.name}
        </h1>
        {topicRecord.description && (
          <p className="font-sans text-base text-muted max-w-2xl leading-relaxed">
            {topicRecord.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: any) => (
          <StoryCard
            key={article.id}
            slug={article.slug}
            title={article.title}
            dek={article.dek}
            type={article.type}
            publishedAt={article.published_at ? new Date(article.published_at).toISOString() : null}
            readingMinutes={article.reading_minutes}
            authorName={article.authors?.[0]?.author?.display_name}
            sourcePublisher={article.sources?.[0]?.publisher}
            isDemo={article.is_demo}
          />
        ))}

        {articles.length === 0 && (
          <div className="col-span-3 py-16 text-center text-muted font-sans border border-dashed border-rule rounded-md">
            No published dispatches under this topic yet.
          </div>
        )}
      </div>
    </div>
  );
}
