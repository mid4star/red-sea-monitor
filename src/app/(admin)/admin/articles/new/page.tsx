import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { ArticleEditor } from '@/components/admin/article-editor';
import { SEED_TOPICS } from '@/lib/seed-data';

export default async function NewArticlePage() {
  const user = await getCurrentUser();

  let topics: any[] = [];
  let authors: any[] = [];

  try {
    [topics, authors] = await Promise.all([
      prisma.topic.findMany({ orderBy: { name: 'asc' } }),
      prisma.author.findMany({ orderBy: { display_name: 'asc' } }),
    ]);
  } catch (error) {
    topics = SEED_TOPICS;
    authors = [
      { id: 'auth-01', display_name: 'Dr. Tariq El-Gamil' },
      { id: 'auth-02', display_name: 'Prof. Karim Zidan' },
      { id: 'auth-03', display_name: 'Layla Mansour' },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-mono text-muted">
        <Link href="/admin/articles" className="hover:text-ink flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </Link>
        <span>/</span>
        <span>Draft New Dispatch</span>
      </div>

      <h1 className="font-serif text-3xl font-bold tracking-tight text-ink dark:text-paper">
        Create New Article Dispatch
      </h1>

      <ArticleEditor
        availableTopics={topics}
        availableAuthors={authors}
        userRole={user.role}
      />
    </div>
  );
}
