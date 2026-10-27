import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  Compass,
  MapPin,
  Waves,
  Eye,
  FileText,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  SEED_MARINE_REGIONS,
  SEED_COUNTRIES,
  SEED_PLACES,
  SEED_ARTICLES,
  SEED_SIGHTINGS,
} from '@/lib/seed-data';
import { Badge } from '@/components/ui/badge';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SampleBadge } from '@/components/ui/sample-badge';
import { formatDateDeterministic } from '@/lib/date';

interface RegionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SEED_MARINE_REGIONS.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = SEED_MARINE_REGIONS.find((r) => r.slug === slug);

  if (!region) {
    return { title: 'Marine Region Not Found — Red Sea Monitor' };
  }

  return {
    title: `${region.name} — Marine Sub-Basin Oceanography`,
    description: region.description,
  };
}

export default async function MarineRegionProfilePage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = SEED_MARINE_REGIONS.find((r) => r.slug === slug);

  if (!region) {
    notFound();
  }

  // Filter content matching this marine region
  const regionPlaces = SEED_PLACES.filter(
    (p) => p.marine_region_slug === slug || p.marine_region_id === region.id
  );
  const regionArticles = SEED_ARTICLES.filter(
    (a) => a.marine_region_slug === slug || a.marine_region_id === region.id
  );
  const regionSightings = SEED_SIGHTINGS.filter(
    (s) => s.marine_region_id === region.id
  );

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Trail */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted">
        <Link href="/" className="hover:text-ink dark:hover:text-paper">
          Basin Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-rule" />
        <Link href="/explorer" className="hover:text-ink dark:hover:text-paper">
          Marine Sub-Basins
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-rule" />
        <span className="text-sea-700 dark:text-sea-500 font-semibold">{region.name}</span>
      </nav>

      {/* Sub-Basin Header Masthead */}
      <div className="p-6 md:p-8 rounded-lg bg-paper-card dark:bg-sea-900/40 border border-rule space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="sea">Marine Sub-Basin</Badge>
              <CoordinateTag lat={region.latitude} lng={region.longitude} />
              <SampleBadge />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper">
              {region.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Waves className="w-4 h-4 text-sea-500" />
            <span>Hydrographic Sector</span>
          </div>
        </div>

        <p className="font-sans text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
          {region.description}
        </p>

        {/* Region Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-rule/60 text-xs font-mono">
          <div className="p-3 rounded bg-paper dark:bg-deep-sea border border-rule/60">
            <span className="text-muted block text-[10px] uppercase">Monitored Reefs & MPAs</span>
            <span className="font-bold text-base text-ink dark:text-paper">
              {regionPlaces.length} {regionPlaces.length === 1 ? 'Site' : 'Sites'}
            </span>
          </div>

          <div className="p-3 rounded bg-paper dark:bg-deep-sea border border-rule/60">
            <span className="text-muted block text-[10px] uppercase">Field Investigations</span>
            <span className="font-bold text-base text-ink dark:text-paper">
              {regionArticles.length} {regionArticles.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          <div className="p-3 rounded bg-paper dark:bg-deep-sea border border-rule/60">
            <span className="text-muted block text-[10px] uppercase">Logged Sightings</span>
            <span className="font-bold text-base text-ink dark:text-paper">
              {regionSightings.length} {regionSightings.length === 1 ? 'Record' : 'Records'}
            </span>
          </div>
        </div>
      </div>

      {/* 1. Places in this sub-basin */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-rule">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sea-700 dark:text-sea-500" />
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
              Reef Formations & Sanctuaries in {region.name} ({regionPlaces.length})
            </h2>
          </div>
          <Link
            href="/explorer"
            className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
          >
            <span>View on map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {regionPlaces.length === 0 ? (
          <p className="text-sm font-mono text-muted">No monitored sites published yet in this sub-basin.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionPlaces.map((place) => (
              <article
                key={place.id}
                className="p-5 rounded-lg bg-paper dark:bg-sea-900/30 border border-rule space-y-3 flex flex-col justify-between hover:border-sea-600 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sea-100 dark:bg-sea-800 text-sea-800 dark:text-sea-200">
                      {place.country_name || place.country_iso2} • {place.type}
                    </span>
                    <CoordinateTag lat={place.latitude} lng={place.longitude} />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-ink dark:text-paper leading-snug">
                    {place.name}
                  </h3>

                  <p className="font-sans text-xs text-muted leading-relaxed line-clamp-3">
                    {place.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-rule/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted">{place.protection_status || 'Protected Area'}</span>
                  <Link
                    href={`/explorer/places/${place.slug}`}
                    className="text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Dossier</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 2. Research & Dispatches */}
      {regionArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-rule">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-sea-700 dark:text-sea-500" />
              <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                Research Dispatches & Studies ({regionArticles.length})
              </h2>
            </div>
            <Link
              href="/news"
              className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
            >
              <span>All news</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {regionArticles.map((article) => (
              <article
                key={article.id}
                className="p-5 rounded-lg bg-paper dark:bg-sea-900/30 border border-rule space-y-2 hover:border-sea-600 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs font-mono text-muted">
                  <span className="font-semibold text-sea-700 dark:text-sea-500 uppercase">
                    {article.type}
                  </span>
                  <span>•</span>
                  <span>{formatDateDeterministic(article.published_at)}</span>
                  <span>•</span>
                  <span>{article.reading_minutes} min read</span>
                </div>

                <Link href={`/news/${article.slug}`}>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ink dark:text-paper hover:text-sea-700 dark:hover:text-sea-400 transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>

                <p className="font-sans text-sm text-muted leading-relaxed">
                  {article.dek}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted">
                    {article.country_name ? `${article.country_name} Sector` : 'Pan-Basin'}
                  </span>
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
                  >
                    <span>Read report</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 3. Sub-Basin Sightings */}
      {regionSightings.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-rule">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-sea-700 dark:text-sea-500" />
              <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                Field Observations in this Sub-Basin ({regionSightings.length})
              </h2>
            </div>
            <Link
              href="/watch"
              className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
            >
              <span>Watch map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionSightings.map((sighting) => (
              <div
                key={sighting.id}
                className="p-4 rounded-lg bg-paper dark:bg-sea-900/30 border border-rule space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-muted">
                    {formatDateDeterministic(sighting.observed_at)}
                  </span>
                  <CoordinateTag lat={sighting.lat_public} lng={sighting.lng_public} />
                </div>

                <h4 className="font-serif text-base font-bold text-ink dark:text-paper">
                  {sighting.reported_common_name}
                </h4>

                <p className="font-sans text-muted leading-relaxed line-clamp-2">
                  {sighting.behavior || sighting.notes}
                </p>

                <div className="pt-2 border-t border-rule/60 flex items-center justify-between font-mono text-[11px] text-muted">
                  <span>Count: {sighting.count}</span>
                  <span className="truncate max-w-[120px]">{sighting.location_label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
