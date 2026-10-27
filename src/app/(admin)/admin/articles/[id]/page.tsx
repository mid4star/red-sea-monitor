import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { ArticleEditor } from '@/components/admin/article-editor';
import { SEED_ARTICLES, SEED_TOPICS } from '@/lib/seed-data';

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  let article: any = null;
  let topics: any[] = [];
  let authors: any[] = [];

  try {
    [article, topics, authors] = await Promise.all([
      prisma.article.findUnique({
        where: { id },
        include: {
          sources: true,
          topics: true,
          authors: true,
          corrections: true,
        },
      }),
      prisma.topic.findMany({ orderBy: { name: 'asc' } }),
      prisma.author.findMany({ orderBy: { display_name: 'asc' } }),
    ]);
  } catch (error) {
    article = SEED_ARTICLES.find((a) => a.id === id || a.slug === id);
    topics = SEED_TOPICS;
    authors = [
      { id: 'auth-01', display_name: 'Dr. Tariq El-Gamil' },
      { id: 'auth-02', display_name: 'Prof. Karim Zidan' },
      { id: 'auth-03', display_name: 'Layla Mansour' },
    ];
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs font-mono text-muted">
        <Link href="/admin/articles" className="hover:text-ink flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </Link>

        {article.status === 'PUBLISHED' && (
          <Link
            href={`/news/${article.slug}`}
            target="_blank"
            className="text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
          >
            <span>View Public Article</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>

      <h1 className="font-serif text-3xl font-bold tracking-tight text-ink dark:text-paper">
        Edit Article: {article.title}
      </h1>

      <ArticleEditor
        initialData={article}
        availableTopics={topics}
        availableAuthors={authors}
        userRole={user.role}
      />
    </div>
  );
}
