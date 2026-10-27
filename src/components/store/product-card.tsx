import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Sparkles, ArrowRight, Layers, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SampleBadge } from '@/components/ui/sample-badge';
import { ProductAvailability } from '@prisma/client';

export interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    price_amount?: number | null;
    currency?: string;
    images?: any;
    materials?: string | null;
    origin_place?: string | null;
    availability: ProductAvailability | string;
    is_demo?: boolean;
    maker?: {
      id?: string;
      name: string;
      slug: string;
      place_of_origin?: string | null;
    } | null;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl =
    Array.isArray(product.images) && product.images[0]
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80';

  const isAvailable = product.availability === 'AVAILABLE';
  const isComingSoon = product.availability === 'COMING_SOON';

  return (
    <article className="group flex flex-col border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30 overflow-hidden transition-all duration-300 hover:border-sea-700/60 dark:hover:border-paper/40 hover:shadow-lg">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-200 dark:bg-sea-800">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-sea/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          {product.is_demo && <SampleBadge compact />}
          <Badge
            variant={isAvailable ? 'sea' : isComingSoon ? 'sand' : 'neutral'}
            className="text-[10px] uppercase font-mono tracking-wider font-semibold"
          >
            {product.availability.replace('_', ' ')}
          </Badge>
        </div>

        {/* Price tag in photo corner */}
        {product.price_amount ? (
          <div className="absolute bottom-3 right-3 bg-sea-950/85 backdrop-blur-sm text-paper px-2.5 py-1 rounded-sm border border-paper/10 font-mono text-xs font-semibold">
            {product.price_amount.toLocaleString()} {product.currency || 'EGP'}
          </div>
        ) : null}
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Provenance and Maker */}
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            {product.origin_place && (
              <span className="flex items-center gap-1 text-sand-600 dark:text-sand-300">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[160px]">{product.origin_place}</span>
              </span>
            )}

            {product.maker && (
              <Link
                href={`/makers/${product.maker.slug}`}
                className="hover:text-coral-500 hover:underline transition-colors truncate max-w-[140px]"
              >
                {product.maker.name}
              </Link>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-400 transition-colors line-clamp-2">
            <Link href={`/store/${product.slug}`}>
              {product.title}
            </Link>
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-xs text-muted font-sans line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Footer Meta: Materials & Inquiry Link */}
        <div className="pt-3 border-t border-rule/60 space-y-3">
          {product.materials && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
              <Layers className="w-3 h-3 text-sand-500 shrink-0" />
              <span className="truncate">{product.materials}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>Enquiry Only (v1)</span>
            </span>

            <Link
              href={`/store/${product.slug}`}
              className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-coral-500 hover:text-coral-600 transition-colors group-hover:translate-x-0.5 transform duration-200"
            >
              <span>View Craft</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
