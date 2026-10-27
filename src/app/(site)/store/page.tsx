import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag, Users, Sparkles, Filter, ShieldCheck, Compass, Info } from 'lucide-react';
import { getProducts, getMakers, isStoreFeatureEnabled } from '@/server/queries/store';
import { ProductCard } from '@/components/store/product-card';
import { MakerCard } from '@/components/store/maker-card';
import { StoreDisabledBanner } from '@/components/store/store-disabled-banner';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Makers & Heritage Crafts | Red Sea Monitor',
  description:
    'Documenting the traditional artisans, coastal weavers, and maritime craftspeople across the Red Sea basin. Direct community enquiry protocol.',
};

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const isFeatureEnabled = isStoreFeatureEnabled();
  const isPreview = resolvedParams.preview === 'true';

  const selectedMaker = typeof resolvedParams.maker === 'string' ? resolvedParams.maker : undefined;
  const selectedAvailability = typeof resolvedParams.availability === 'string' ? (resolvedParams.availability as any) : undefined;
  const searchQuery = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;

  const [products, makers] = await Promise.all([
    getProducts({
      makerId: selectedMaker,
      availability: selectedAvailability,
      search: searchQuery,
    }),
    getMakers(),
  ]);

  const showFullCatalog = isFeatureEnabled || isPreview;

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="space-y-4 border-b border-rule pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-sand-600 dark:text-sand-400 font-semibold flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-coral-500" />
            <span>Ethnobotany & Coastal Material Culture</span>
          </span>
          <span className="text-rule">•</span>
          <SampleBadge compact />
          <Badge variant="neutral" className="text-[10px] font-mono">
            {isFeatureEnabled ? 'PUBLIC DIRECTORY' : 'FEATURE FLAGGED (v1 ENQUIRY)'}
          </Badge>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper">
              Makers & Heritage Crafts
            </h1>
            <p className="font-sans text-base md:text-lg text-muted leading-relaxed">
              An archival registry connecting researchers and patrons directly with traditional Ababda palm weavers, Gabal Elba medicinal herbalists, and Al-Quseir maritime woodcarvers. All items are produced in strictly bounded, sustainable quantities without middleman margins.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 border border-rule rounded-sm bg-paper-card dark:bg-sea-900/40 text-center">
              <div className="font-mono text-xl font-bold text-ink dark:text-paper">{makers.length}</div>
              <div className="font-mono text-[10px] text-muted uppercase">Guild Artisans</div>
            </div>
            <div className="p-3 border border-rule rounded-sm bg-paper-card dark:bg-sea-900/40 text-center">
              <div className="font-mono text-xl font-bold text-ink dark:text-paper">{products.length}</div>
              <div className="font-mono text-[10px] text-muted uppercase">Craft Dossiers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Flag Condition */}
      {!isFeatureEnabled && (
        <StoreDisabledBanner isPreviewMode={isPreview} />
      )}

      {/* If feature flag disabled and not in preview, show curated teaser archive */}
      {!showFullCatalog ? (
        <div className="space-y-12">
          {/* Featured Guild Artisans Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                  Participating Artisanal Guilds
                </h2>
                <p className="text-xs text-muted font-sans">
                  Custodians of indigenous craftsmanship across South Sinai, Al-Quseir, and Halayeb.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {makers.map((maker) => (
                <MakerCard key={maker.id} maker={maker} />
              ))}
            </div>
          </div>

          {/* Ethics Callout */}
          <div className="p-6 rounded-sm border border-rule bg-paper-card dark:bg-sea-900/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sand-600 dark:text-sand-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Fair-Trade Field Protocol & Zero Commission Policy</span>
              </div>
              <p className="text-xs font-sans text-muted leading-relaxed">
                100% of craft acquisition value goes directly to the indigenous makers and their local cooperatives. Red Sea Monitor levies zero listing or transaction fees.
              </p>
            </div>

            <Link
              href="/store?preview=true"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold bg-sea-900 text-paper dark:bg-paper dark:text-sea-900 rounded-sm hover:opacity-95 transition-opacity shrink-0"
            >
              <span>Preview Crafts Catalogue</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Full Catalogue View */
        <div className="space-y-10">
          {/* Filters Bar */}
          <div className="p-4 border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-muted flex items-center gap-1 mr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>

              <Link
                href={isPreview ? '/store?preview=true' : '/store'}
                className={`px-3 py-1 rounded-sm text-xs font-mono transition-colors ${
                  !selectedMaker && !selectedAvailability
                    ? 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900 font-semibold'
                    : 'border border-rule text-muted hover:text-ink dark:hover:text-paper'
                }`}
              >
                All Crafts ({products.length})
              </Link>

              {makers.map((m) => (
                <Link
                  key={m.id}
                  href={`/store?maker=${m.id}${isPreview ? '&preview=true' : ''}`}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-colors ${
                    selectedMaker === m.id
                      ? 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900 font-semibold'
                      : 'border border-rule text-muted hover:text-ink dark:hover:text-paper'
                  }`}
                >
                  {m.name.split(' ')[0]} ({m.products?.length || 0})
                </Link>
              ))}
            </div>

            <div className="text-xs font-mono text-muted">
              Displaying {products.length} documented pieces
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="p-12 text-center border border-rule rounded-sm bg-paper-card dark:bg-sea-900/20 space-y-3">
              <p className="text-sm font-sans text-muted">No craft records match your current filter.</p>
              <Link href={isPreview ? '/store?preview=true' : '/store'} className="text-xs font-mono text-coral-500 underline">
                Reset filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Artisans Section */}
          <div className="pt-10 border-t border-rule space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                  Artisan Guilds & Coastal Collectives
                </h2>
                <p className="text-xs text-muted font-sans">
                  The communities behind traditional basketry, herbal medicine, and marine carpentry.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {makers.map((maker) => (
                <MakerCard key={maker.id} maker={maker} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
