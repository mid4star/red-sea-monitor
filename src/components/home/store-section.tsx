import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowUpRight, Bell, Sparkles, Hammer } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CraftTextileArt } from '@/components/art/illustrations';
import { getMakers, getProducts } from '@/server/queries/store';

export async function StoreSection() {
  const makers = await getMakers();
  const products = await getProducts({ limit: 2 });
  const featuredMaker = makers[0] || null;
  const featuredProduct = products[0] || null;

  return (
    <section
      id="section-store"
      aria-labelledby="heading-store"
      className="w-full bg-sand-100 dark:bg-[#12191C] text-ink dark:text-paper py-16 md:py-24 border-y border-rule transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          index="04"
          title="Red Sea Artisanal Store & Heritage Craft"
          subtitle="Honouring vernacular material culture: fair-trade maritime woodcraft, woven palm textiles, and desert ceramics"
          href="/store"
          actionText="Visit the workshop index"
        />

        {/* 3 Category Chips Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          <span className="text-xs font-mono text-muted uppercase font-bold tracking-wider mr-2">
            Artisanal Guilds:
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper dark:bg-deep-sea border border-rule text-xs font-sans font-medium text-ink dark:text-paper">
            <span className="w-1.5 h-1.5 rounded-full bg-sand-600" />
            Maritime Woodcraft (Dhow & Acacia)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper dark:bg-deep-sea border border-rule text-xs font-sans font-medium text-ink dark:text-paper">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
            Woven Palm Textiles (Doum Palm)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper dark:bg-deep-sea border border-rule text-xs font-sans font-medium text-ink dark:text-paper">
            <span className="w-1.5 h-1.5 rounded-full bg-sea-500" />
            Desert Mineral Pigments & Ceramics
          </span>
        </div>

        {/* 2-Column Grid: Maker Story (Left 7 cols) & Craft Showcase / Coming Soon (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Featured Maker Story */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-md bg-paper dark:bg-deep-sea border border-rule flex flex-col justify-between space-y-6 h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-sand-600 dark:text-sand-300 font-bold">
                  <Hammer className="w-3.5 h-3.5" />
                  <span>Artisanal Profile (Sample)</span>
                </span>
                <span className="text-xs font-mono text-muted bg-sand-300/20 dark:bg-sea-900/40 px-2 py-0.5 rounded">
                  SAMPLE
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-ink dark:text-paper leading-tight">
                  Sample Coastal Palm Craft Collective
                </h3>
                <p className="text-sm font-sans text-muted leading-relaxed mt-2">
                  A demo craft collective profile illustrating vernacular palm-frond weaving techniques. Across Red Sea coastal wadis, Doum palm (Hyphaene thebaica) fronds have historically been harvested to braid resilient specimen baskets, bread coolers, and water-carrying vessels.
                </p>
              </div>

              <div className="p-4 rounded bg-sand-100/60 dark:bg-sea-900/30 border border-rule text-xs font-sans space-y-1.5">
                <div className="font-semibold text-ink dark:text-paper flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sand-600" />
                  <span>Heritage Technique & Botanical Material:</span>
                </div>
                <p className="text-muted leading-relaxed">
                  Traditional hand-twining with unbleached natural bast fibres, dried under coastal sunlight without chemical varnishes or synthetic coatings.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-rule flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted">
              <span>Ethical heritage documentation prototype</span>
              <Link
                href="/store"
                className="text-coral-600 dark:text-coral-400 hover:underline flex items-center gap-1 text-xs font-medium font-sans group"
              >
                <span>View crafts archive</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Craft Product Preview & Coming Soon Notify Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-md bg-paper dark:bg-deep-sea border border-rule flex flex-col justify-between space-y-6 h-full">
            <div className="space-y-4">
              <div className="relative aspect-[3/2] w-full rounded overflow-hidden border border-rule bg-sand-300/10">
                <Image
                  src="https://images.unsplash.com/photo-1595461135849-bf08893d45c0?auto=format&fit=crop&w=800&q=80"
                  alt="Handwoven natural palm fiber basket crafted by traditional methods"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-sea-900/90 text-paper text-[10px] font-mono px-2 py-0.5 rounded border border-white/20">
                  Coming Soon
                </div>
                <div className="absolute bottom-2 left-2 bg-sea-900/80 text-paper text-[9px] font-mono px-1.5 py-0.5 rounded">
                  Photo: Woven palm basket (Unsplash)
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-coral-500/10 text-coral-600 dark:text-coral-400 border border-coral-500/20 px-1.5 py-0.2 rounded font-semibold">
                    SAMPLE
                  </span>
                  <h4 className="font-serif text-lg font-bold text-ink dark:text-paper leading-snug">
                    Wadi Doum Palm Handwoven Field Basket
                  </h4>
                </div>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  Traditional breathable utility basket braided from sun-cured wild palm fronds with vegetable-tanned handles.
                </p>
              </div>
            </div>

            {/* Email notification field for shop launch */}
            <div className="space-y-2 pt-2 border-t border-rule">
              <label className="block text-xs font-mono text-muted">
                Notify me when the seasonal craft edition opens:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your.email@domain.com"
                  className="px-3 py-2 rounded bg-paper-card dark:bg-paper-elevated border border-rule text-xs text-ink dark:text-paper focus:outline-none focus:ring-1 focus:ring-coral-500 flex-1 min-h-[44px]"
                  readOnly
                />
                <Button
                  variant="coral"
                  size="md"
                  className="min-h-[44px] px-4 text-xs font-medium shrink-0 gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
