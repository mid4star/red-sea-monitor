import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  MapPin,
  Feather,
  ShieldCheck,
  Compass,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { getMakerBySlug } from '@/server/queries/store';
import { ProductCard } from '@/components/store/product-card';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Badge } from '@/components/ui/badge';

interface MakerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MakerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const maker = await getMakerBySlug(slug);

  if (!maker) {
    return { title: 'Artisan Not Found | Red Sea Monitor' };
  }

  const bio = (maker.story as any)?.bio || 'Heritage artisan of the Red Sea basin.';

  return {
    title: `${maker.name} | Red Sea Artisan Guilds`,
    description: bio,
    openGraph: {
      title: maker.name,
      description: bio,
      images: maker.photo_id ? [maker.photo_id] : undefined,
    },
  };
}

export default async function MakerDetailPage({ params }: MakerDetailPageProps) {
  const { slug } = await params;
  const maker = await getMakerBySlug(slug);

  if (!maker) {
    notFound();
  }

  const photoUrl =
    maker.photo_id ||
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';

  const story = (maker.story as any) || {};
  const links = (maker.links as any) || {};
  const products = maker.products || [];

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between border-b border-rule pb-4 text-xs font-mono">
        <Link
          href="/store"
          className="inline-flex items-center gap-1.5 text-muted hover:text-ink dark:hover:text-paper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Makers & Crafts</span>
        </Link>

        <div className="flex items-center gap-2">
          {maker.is_demo && <SampleBadge compact />}
          <Badge variant="neutral" className="text-[10px] uppercase font-mono">
            Documented Artisan
          </Badge>
        </div>
      </div>

      {/* Artisan Master Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border-b border-rule pb-12">
        <div className="lg:col-span-4">
          <div className="relative aspect-square w-full rounded-sm overflow-hidden border border-rule bg-sand-200 dark:bg-sea-800 shadow-md">
            <Image
              src={photoUrl}
              alt={maker.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Quick origin & links metadata */}
          <div className="mt-4 p-4 rounded-sm border border-rule bg-paper-card dark:bg-sea-900/30 space-y-3 text-xs font-mono">
            {maker.place_of_origin && (
              <div className="flex items-center justify-between">
                <span className="text-muted">Origin:</span>
                <span className="font-semibold text-ink dark:text-paper">{maker.place_of_origin}</span>
              </div>
            )}

            {story.heritage_region && (
              <div className="flex items-center justify-between">
                <span className="text-muted">Region:</span>
                <span className="font-semibold text-ink dark:text-paper">{story.heritage_region}</span>
              </div>
            )}

            {Object.keys(links).length > 0 && (
              <div className="pt-2 border-t border-rule/60 space-y-1">
                <span className="text-[10px] uppercase text-muted tracking-wider block">Affiliations</span>
                {Object.entries(links).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-[11px]">
                    <span className="capitalize text-muted">{k.replace('_', ' ')}:</span>
                    <span className="text-sand-600 dark:text-sand-300 font-semibold">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-sand-600 dark:text-sand-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>{maker.place_of_origin}</span>
              <span className="text-rule">•</span>
              <span>Indigenous Craft Tradition</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper">
              {maker.name}
            </h1>
          </div>

          {/* Biography */}
          <div className="font-serif text-base md:text-lg text-ink/90 dark:text-paper/90 leading-relaxed space-y-4">
            <p>{story.bio || 'Preserving centuries-old artisanal lineages along the Red Sea basin.'}</p>
          </div>

          {/* Technique and Conservation notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {story.technique && (
              <div className="p-4 rounded-sm border border-rule bg-paper-card dark:bg-sea-900/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-ink dark:text-paper">
                  <Feather className="w-4 h-4 text-coral-500" />
                  <span>Traditional Technique</span>
                </div>
                <p className="text-xs font-sans text-muted leading-relaxed">
                  {story.technique}
                </p>
              </div>
            )}

            {story.conservation_note && (
              <div className="p-4 rounded-sm border border-rule bg-paper-card dark:bg-sea-900/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-ink dark:text-paper">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Ecological Safeguards</span>
                </div>
                <p className="text-xs font-sans text-muted leading-relaxed">
                  {story.conservation_note}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products & Works Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink dark:text-paper">
              Documented Crafts by {maker.name}
            </h2>
            <p className="text-xs text-muted font-sans">
              Handcrafted in limited editions. Enquiries are delivered directly to the guild coordinator.
            </p>
          </div>

          <Badge variant="neutral" className="font-mono text-xs">
            {products.length} {products.length === 1 ? 'Piece' : 'Pieces'}
          </Badge>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center border border-rule rounded-sm bg-paper-card dark:bg-sea-900/20 text-muted text-sm font-sans">
            No craft items currently documented for this artisan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <ProductCard
                key={p.id}
                product={{
                  ...p,
                  maker: {
                    id: maker.id,
                    name: maker.name,
                    slug: maker.slug,
                    place_of_origin: maker.place_of_origin,
                  },
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
