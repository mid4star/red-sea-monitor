import React from 'react';
import Link from 'next/link';
import { PlusCircle, Search, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SampleBadge } from '@/components/ui/sample-badge';
import { SEED_ARTICLES } from '@/lib/seed-data';

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();

  const query = params.q || '';
  const statusFilter = params.status || '';

  const where: any = {
    deleted_at: null,
  };

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { slug: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (statusFilter) {
    where.status = statusFilter;
  }

  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where,
      orderBy: { updated_at: 'desc' },
      include: {
        authors: { include: { author: true } },
        topics: { include: { topic: true } },
        sources: true,
      },
    });
  } catch (error) {
    articles = SEED_ARTICLES;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="sea">Editorial Management</Badge>
            <span className="font-mono text-xs text-muted">{articles.length} records</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink dark:text-paper">
            Articles & Investigations
          </h1>
        </div>

        <Link href="/admin/articles/new">
          <Button variant="coral" size="sm" className="gap-1.5 text-xs">
            <PlusCircle className="w-4 h-4" />
            <span>Create Article</span>
          </Button>
        </Link>
      </div>

      {/* Articles Table */}
      <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-paper-card border-b border-rule font-mono uppercase tracking-wider text-muted text-[11px]">
              <tr>
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sources</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/60">
              {articles.map((article) => {
                const hasMissingSourceWarning = article.type === 'NEWS' && article.sources.length === 0;

                return (
                  <tr key={article.id} className="hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="font-serif text-sm font-semibold text-ink dark:text-paper hover:text-sea-700 dark:hover:text-sea-500"
                        >
                          {article.title}
                        </Link>
                        {article.is_demo && <SampleBadge compact />}
                        {article.is_featured && (
                          <span className="font-mono text-[9px] bg-sand-300 text-ink px-1 rounded">Lead</span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-muted mt-0.5">/news/{article.slug}</div>
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <Badge variant="neutral">{article.type.replace('_', ' ')}</Badge>
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <Badge
                        variant={
                          article.status === 'PUBLISHED'
                            ? 'sea'
                            : article.status === 'IN_REVIEW'
                            ? 'coral'
                            : 'neutral'
                        }
                      >
                        {article.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 font-mono">
                      {hasMissingSourceWarning ? (
                        <span className="inline-flex items-center gap-1 text-coral-600 font-semibold" title="Required to publish news">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>0 sources</span>
                        </span>
                      ) : (
                        <span className="text-muted">{article.sources.length} verified</span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-mono text-muted">
                      {new Date(article.updated_at).toLocaleDateString('en-GB')}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {article.status === 'PUBLISHED' && (
                          <Link
                            href={`/news/${article.slug}`}
                            target="_blank"
                            className="text-muted hover:text-ink font-mono text-[11px] underline"
                          >
                            View
                          </Link>
                        )}
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="text-sea-700 dark:text-sea-500 hover:underline font-mono text-[11px] font-semibold"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {articles.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted font-sans">
                    No articles found matching the current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
