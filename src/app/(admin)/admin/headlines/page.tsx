import React from 'react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Radio, ExternalLink, Pin, Trash2, Plus } from 'lucide-react';
import { HeadlinesManager } from './headlines-manager';
import { SEED_HEADLINES } from '@/lib/seed-data';

export default async function AdminHeadlinesPage() {
  const user = await getCurrentUser();

  let headlines: any[] = [];
  try {
    headlines = await prisma.headline.findMany({
      orderBy: [{ is_pinned: 'desc' }, { published_on: 'desc' }],
    });
  } catch (error) {
    headlines = SEED_HEADLINES;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="sea">Curated Wires</Badge>
          <span className="font-mono text-xs text-muted">Masthead Ticker Strip</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-ink dark:text-paper">
          Headlines Curation
        </h1>
        <p className="font-sans text-xs text-muted max-w-xl mt-1 leading-relaxed">
          Manage the rapid field wire ticker appearing below the masthead. All entries require a verified destination URL.
        </p>
      </div>

      <HeadlinesManager initialHeadlines={headlines} />
    </div>
  );
}
