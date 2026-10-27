import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  Calendar,
  Clock,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
  Share2,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '@/server/queries/articles';
import { ReadingProgressBar } from '@/components/site/reading-progress';
import { CitationBlock } from '@/components/site/citation-block';
import { Badge } from '@/components/ui/badge';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Prose } from '@/components/ui/prose';
import { StoryCard } from '@/components/ui/cards';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SEED_ARTICLES } from '@/lib/seed-data';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEED_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.dek || undefined,
    openGraph: {
      title: article.title,
      description: article.dek || undefined,
      type: 'article',
      publishedTime: article.published_at?.toISOString(),
      modifiedTime: article.updated_at.toISOString(),
      authors: (article.authors || []).map((a: any) => a.author?.display_name).filter(Boolean),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || article.deleted_at) {
    notFound();
  }

  const related = await getRelatedArticles(article.id, 3);
  const authorNames = (article.authors || []).map((a: any) => a.author?.display_name).filter(Boolean);
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Draft';

  // Render article body blocks from Tiptap JSON or string
  const renderBodyContent = () => {
    if (!article.body) return null;
    const body = article.body as any;
    if (typeof body === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: body }} />;
    }
    if (body.content && Array.isArray(body.content)) {
      return body.content.map((block: any, idx: number) => {
        if (block.type === 'heading') {
          const text = block.content?.map((c: any) => c.text).join('') || '';
          if (block.attrs?.level === 2) {
            return <h2 key={idx}>{text}</h2>;
          }
          return <h3 key={idx}>{text}</h3>;
        }

        if (block.type === 'paragraph') {
          const text = block.content?.map((c: any) => c.text).join('') || '';
          return <p key={idx}>{text}</p>;
        }

        if (block.type === 'blockquote') {
          const text = block.content?.map((c: any) => c.content?.map((cc: any) => cc.text).join('')).join('') || '';
          return <blockquote key={idx}>{text}</blockquote>;
        }

        return null;
      });
    }
    return <p className="text-muted italic">Content format is adapting to current view.</p>;
  };

  // JSON-LD structured data for academic & news SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.dek,
    datePublished: article.published_at ? new Date(article.published_at).toISOString() : undefined,
    dateModified: new Date(article.updated_at).toISOString(),
    author: (article.authors || []).map((a: any) => ({
      '@type': 'Person',
      name: a.author?.display_name || 'Staff',
    })),
    publisher: {
      '@type': 'Organization',
      name: 'Red Sea Monitor',
      url: process.env.NEXT_PUBLIC_APP_URL || 'https://redseamonitor.org',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Line */}
      <ReadingProgressBar />

      <article className="max-w-content mx-auto px-4 lg:px-8 py-8 md:py-14 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'News & Investigations', href: '/news' },
            { label: article.topics[0]?.topic.name || 'Dispatch', href: article.topics[0] ? `/news?topic=${article.topics[0].topic.slug}` : undefined },
            { label: article.title },
          ]}
        />

        {/* Masthead Article Header */}
        <header className="space-y-4 max-w-reading">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="sea">{article.type.replace('_', ' ')}</Badge>
            {(article.topics || []).map((t: any) => (
              <Badge key={t.topic_id || t.id} variant="neutral">
                {t.topic?.name || t.name}
              </Badge>
            ))}
            {article.is_demo && <SampleBadge />}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-ink dark:text-paper leading-[1.12]">
            {article.title}
          </h1>

          {article.dek && (
            <p className="font-sans text-lg sm:text-xl text-muted leading-relaxed font-normal">
              {article.dek}
            </p>
          )}

          {/* Byline & Metadata Bar */}
          <div className="pt-4 border-t border-rule/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {article.authors.length > 0 && (
                <span className="font-semibold text-ink dark:text-paper">
                  By {authorNames.join(', ')}
                </span>
              )}
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{publishedDate}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.reading_minutes} min read</span>
              </span>
            </div>

            {article.verified_by && (
              <div className="flex items-center gap-1 text-sea-700 dark:text-sea-500 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified by {article.verified_by.name} ({article.verified_by.organization})</span>
              </div>
            )}
          </div>
        </header>

        {/* Post-Publication Corrections Box (if logged) */}
        {article.corrections && article.corrections.length > 0 && (
          <aside className="border border-sand-600/30 rounded-md bg-sand-300/15 p-4 max-w-reading space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sand-600 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>Correction & Amendment Log</span>
            </div>
            {(article.corrections || []).map((corr: any) => (
              <div key={corr.id} className="text-xs font-sans text-ink dark:text-paper leading-relaxed">
                <span className="font-mono text-[11px] text-muted mr-2">
                  [{new Date(corr.corrected_at).toLocaleDateString('en-GB')}]:
                </span>
                <span>{corr.note}</span>
              </div>
            ))}
          </aside>
        )}

        {/* Reading Grid: Body + Desktop Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Reading Column (8 Cols) */}
          <div className="lg:col-span-8">
            <Prose>{renderBodyContent()}</Prose>

            {/* ------------------------------------------------------------- */}
            {/* MANDATORY VERIFIED SOURCES PANEL */}
            {/* ------------------------------------------------------------- */}
            <section className="mt-12 pt-6 border-t border-rule space-y-4 max-w-reading">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sea-700 dark:text-sea-500" />
                  <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                    Verified Sources & Scientific References ({(article.sources || []).length})
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted">Editorial Verification Standard</span>
              </div>

              <div className="space-y-3">
                {(article.sources || []).map((src: any) => (
                  <div
                    key={src.id}
                    className="p-3.5 rounded border border-rule bg-paper-card dark:bg-sea-900/20 text-xs font-sans space-y-1"
                  >
                    <div className="font-semibold text-ink dark:text-paper">{src.title}</div>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                      <span>Publisher: {src.publisher}</span>
                      <span>•</span>
                      <span>Accessed: {new Date(src.accessed_on).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="pt-1">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-sea-700 dark:text-sea-500 hover:underline inline-flex items-center gap-1"
                      >
                        <span className="break-all">{src.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                ))}

                {article.sources.length === 0 && (
                  <p className="text-xs text-muted italic">No external sources logged.</p>
                )}
              </div>
            </section>

            {/* Academic Citation Block */}
            <CitationBlock
              title={article.title}
              authors={authorNames}
              publishedYear={article.published_at ? new Date(article.published_at).getFullYear() : 2026}
              slug={article.slug}
              url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://redseamonitor.org'}/news/${article.slug}`}
            />

            {/* Author Profile Card */}
            {article.authors[0]?.author && (
              <div className="p-6 rounded-md border border-rule bg-paper-card dark:bg-sea-900/20 flex flex-col sm:flex-row gap-4 items-start my-8 max-w-reading">
                <div className="w-12 h-12 rounded-full bg-sea-900 text-paper dark:bg-paper dark:text-sea-900 font-serif font-bold text-lg flex items-center justify-center shrink-0">
                  {article.authors[0].author.display_name.charAt(0)}
                </div>
                <div className="space-y-1 text-xs">
                  <h4 className="font-serif text-base font-semibold text-ink dark:text-paper">
                    {article.authors[0].author.display_name}
                  </h4>
                  <p className="font-sans text-muted leading-relaxed">
                    {article.authors[0].author.bio || 'Independent researcher contributing to Red Sea environmental telemetry.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sticky Sidebar (4 Cols) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-5 border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 space-y-3 text-xs font-mono">
              <h4 className="font-serif text-sm font-semibold text-ink dark:text-paper uppercase tracking-wider">
                Field Quick Facts
              </h4>
              <div className="space-y-2 border-t border-rule/50 pt-2 text-muted">
                <div className="flex justify-between">
                  <span>Classification:</span>
                  <span className="text-ink dark:text-paper font-semibold">{article.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sources Cited:</span>
                  <span className="text-sea-700 dark:text-sea-500 font-semibold">{article.sources.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span className="text-ink dark:text-paper font-semibold">English (en)</span>
                </div>
                <div className="flex justify-between">
                  <span>Peer Verified:</span>
                  <span className="text-[#2E7D32] font-semibold">{article.verified_by ? 'Yes (NIOF/EEAA)' : 'Editorial'}</span>
                </div>
              </div>
            </div>

            {/* Share / Action */}
            <div className="p-4 border border-rule rounded-md bg-paper-card flex items-center justify-between text-xs font-mono">
              <span className="text-muted">Share Field Report:</span>
              <button
                type="button"
                className="text-sea-700 dark:text-sea-500 hover:text-coral-500 flex items-center gap-1 font-semibold"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
            </div>
          </aside>
        </div>

        {/* Related Field Dispatches Strip */}
        {related.length > 0 && (
          <section className="pt-12 border-t border-rule space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold tracking-tight text-ink dark:text-paper">
                Related Field Investigations
              </h3>
              <Link href="/news" className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline">
                View all dispatches →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel: any) => (
                <StoryCard
                  key={rel.id}
                  slug={rel.slug}
                  title={rel.title}
                  dek={rel.dek}
                  type={rel.type}
                  publishedAt={rel.published_at ? new Date(rel.published_at).toISOString() : null}
                  readingMinutes={rel.reading_minutes}
                  authorName={rel.authors?.[0]?.author?.display_name}
                  sourcePublisher={rel.sources?.[0]?.publisher}
                  isDemo={rel.is_demo}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
