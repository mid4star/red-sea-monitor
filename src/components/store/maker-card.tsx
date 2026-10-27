import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Sparkles, Feather } from 'lucide-react';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Badge } from '@/components/ui/badge';

export interface MakerCardProps {
  maker: {
    id: string;
    slug: string;
    name: string;
    place_of_origin?: string | null;
    photo_id?: string | null;
    story?: any;
    is_demo?: boolean;
    products?: any[];
  };
}

export const MakerCard: React.FC<MakerCardProps> = ({ maker }) => {
  const photoUrl =
    maker.photo_id ||
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';

  const bio = maker.story?.bio || 'Preserving centuries-old Red Sea artisanal traditions.';
  const technique = maker.story?.technique;
  const productCount = maker.products ? maker.products.length : 0;

  return (
    <article className="group border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30 p-5 flex flex-col justify-between transition-all duration-300 hover:border-sea-700/60 dark:hover:border-paper/40 hover:shadow-md">
      <div className="space-y-4">
        {/* Header: Photo and Name */}
        <div className="flex items-start gap-3.5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-rule/80 bg-sand-200 dark:bg-sea-800">
            <Image
              src={photoUrl}
              alt={maker.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5">
              {maker.is_demo && <SampleBadge compact />}
              {maker.place_of_origin && (
                <span className="flex items-center gap-1 text-[11px] font-mono text-sand-600 dark:text-sand-300 truncate">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{maker.place_of_origin}</span>
                </span>
              )}
            </div>

            <h3 className="font-serif text-base font-bold text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-400 transition-colors leading-snug">
              <Link href={`/makers/${maker.slug}`}>
                {maker.name}
              </Link>
            </h3>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-muted font-sans line-clamp-3 leading-relaxed">
          {bio}
        </p>

        {/* Technique highlight if available */}
        {technique && (
          <div className="p-2.5 rounded-sm bg-sand-500/10 dark:bg-sea-800/30 border border-sand-500/20 dark:border-sea-700/40 text-[11px] font-mono text-sand-800 dark:text-sand-200 flex items-start gap-2">
            <Feather className="w-3.5 h-3.5 shrink-0 text-sand-600 dark:text-sand-400 mt-0.5" />
            <span className="line-clamp-2">{technique}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-rule/60 flex items-center justify-between text-xs font-mono">
        <Badge variant="neutral" className="text-[10px]">
          {productCount} {productCount === 1 ? 'Craft Documented' : 'Crafts Documented'}
        </Badge>

        <Link
          href={`/makers/${maker.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-coral-500 hover:text-coral-600 transition-colors group-hover:translate-x-0.5 transform duration-200"
        >
          <span>Artisan Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
