import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  MapPin,
  Layers,
  Sparkles,
  ShieldCheck,
  Compass,
  Feather,
  Info,
  Clock,
  Send,
} from 'lucide-react';
import { getProductBySlug } from '@/server/queries/store';
import { ProductEnquiryForm } from '@/components/store/enquiry-form';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Badge } from '@/components/ui/badge';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Craft Not Found | Red Sea Monitor' };
  }

  return {
    title: `${product.title} | Red Sea Heritage Crafts`,
    description: product.description || 'Traditional artisan craft from the Red Sea basin.',
    openGraph: {
      title: product.title,
      description: product.description || undefined,
      images: Array.isArray(product.images) && product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const imageUrl =
    Array.isArray(product.images) && product.images[0]
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80';

  const makerPhoto =
    product.maker?.photo_id ||
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';

  return (
    <article className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-10">
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
          {product.is_demo && <SampleBadge compact />}
          <Badge variant="neutral" className="text-[10px] uppercase tracking-wider">
            {product.availability.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Main Left Column: Image, Story, Cultural Heritage */}
        <div className="lg:col-span-7 space-y-8">
          {/* Hero Image Frame */}
          <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-rule bg-sand-200 dark:bg-sea-800">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-sea/40 via-transparent to-transparent" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-sand-600 dark:text-sand-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>{product.origin_place}</span>
              <span className="text-rule">•</span>
              <span>Heritage Craft Registry</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-ink dark:text-paper leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Description & Cultural Context */}
          <div className="prose dark:prose-invert max-w-none text-ink/90 dark:text-paper/90 font-serif leading-relaxed text-base space-y-4">
            <p>{product.description}</p>
          </div>

          {/* Materials & Technique Specification Box */}
          <div className="border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30 p-6 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-ink dark:text-paper flex items-center gap-2">
              <Layers className="w-4 h-4 text-coral-500" />
              <span>Material Provenance & Specifications</span>
            </h3>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-paper/60 dark:bg-sea-800/40 border border-rule/50 rounded-sm">
                <dt className="text-muted text-[10px] uppercase mb-1">Harvested Materials</dt>
                <dd className="font-semibold text-ink dark:text-paper">{product.materials || 'Natural Regional Materials'}</dd>
              </div>

              <div className="p-3 bg-paper/60 dark:bg-sea-800/40 border border-rule/50 rounded-sm">
                <dt className="text-muted text-[10px] uppercase mb-1">Geographic Provenance</dt>
                <dd className="font-semibold text-ink dark:text-paper">{product.origin_place || 'Eastern Desert Coast'}</dd>
              </div>

              <div className="p-3 bg-paper/60 dark:bg-sea-800/40 border border-rule/50 rounded-sm">
                <dt className="text-muted text-[10px] uppercase mb-1">Estimated Dispatch Period</dt>
                <dd className="font-semibold text-ink dark:text-paper">7–14 days (Handcrafted to order)</dd>
              </div>

              <div className="p-3 bg-paper/60 dark:bg-sea-800/40 border border-rule/50 rounded-sm">
                <dt className="text-muted text-[10px] uppercase mb-1">Transaction Protocol</dt>
                <dd className="font-semibold text-ink dark:text-paper">Direct Maker Enquiry (No checkout)</dd>
              </div>
            </dl>
          </div>

          {/* Maker Profile Embed */}
          {product.maker && (
            <div className="border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-ink dark:text-paper flex items-center gap-2">
                  <Feather className="w-4 h-4 text-coral-500" />
                  <span>About the Artisan</span>
                </h3>

                <Link
                  href={`/makers/${product.maker.slug}`}
                  className="text-xs font-mono text-coral-500 hover:underline"
                >
                  View Full Dossier →
                </Link>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-rule bg-sand-200">
                  <Image
                    src={makerPhoto}
                    alt={product.maker.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <h4 className="font-serif text-lg font-bold text-ink dark:text-paper">
                    {product.maker.name}
                  </h4>
                  <p className="text-xs font-sans text-muted leading-relaxed line-clamp-3">
                    {(product.maker as any).story?.bio || 'Master craftsman preserving cultural heritage in the Egyptian Red Sea basin.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Column: Price, Ethics, and Enquiry Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Interactive Enquiry Form */}
            <ProductEnquiryForm
              productId={product.id}
              productTitle={product.title}
              makerName={product.maker?.name || 'Artisan Guild'}
              priceAmount={product.price_amount ? Number(product.price_amount) : null}
              currency={product.currency}
            />

            {/* Fair-Trade Commitment Notice */}
            <div className="p-5 border border-rule/80 rounded-sm bg-paper-card dark:bg-sea-900/20 text-xs font-sans space-y-3">
              <div className="flex items-center gap-2 font-mono font-semibold text-sand-700 dark:text-sand-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Our Heritage Custodianship Charter</span>
              </div>
              <p className="text-muted leading-relaxed">
                By ordering through Red Sea Monitor’s community liaison, 100% of agreed fees are wired directly to the artisan cooperative without portal commissions or advertising overhead.
              </p>
              <div className="pt-2 border-t border-rule/40 font-mono text-[11px] text-muted flex items-center justify-between">
                <span>Inquiries monitored by:</span>
                <span className="font-semibold text-ink dark:text-paper">RSM Cultural Desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
