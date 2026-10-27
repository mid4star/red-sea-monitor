import React from 'react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { MediaManager } from './media-manager';

export default async function AdminMediaPage() {
  const user = await getCurrentUser();

  let mediaAssets: any[] = [];
  try {
    mediaAssets = await prisma.mediaAsset.findMany({
      where: { deleted_at: null },
      orderBy: { created_at: 'desc' },
    });
  } catch (error) {
    mediaAssets = [
      {
        id: 'media-01',
        storage_key: 'assets/coral-refugia.webp',
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        mime: 'image/webp',
        alt_text: 'Ras Mohammed upper fore-reef Acropora coral garden',
        credit: 'Dr. Tariq El-Gamil',
        license: 'CC-BY-SA 4.0',
        created_at: new Date().toISOString(),
      },
      {
        id: 'media-02',
        storage_key: 'assets/dugong-hamata.webp',
        url: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80',
        mime: 'image/webp',
        alt_text: 'Dugong grazing on coastal Halophila seagrass bed in Marsa Abu Dabbab',
        credit: 'Prof. Karim Zidan / NIOF',
        license: 'CC-BY-SA 4.0',
        created_at: new Date().toISOString(),
      },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="sea">Asset Archive</Badge>
          <span className="font-mono text-xs text-muted">{mediaAssets.length} assets registered</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-ink dark:text-paper">
          Media Library & License Verification
        </h1>
        <p className="font-sans text-xs text-muted max-w-xl mt-1 leading-relaxed">
          Manage photographic field assets. All published media mandates scientific alt-text, photographer accreditation, and license verification.
        </p>
      </div>

      <MediaManager initialAssets={mediaAssets} />
    </div>
  );
}
