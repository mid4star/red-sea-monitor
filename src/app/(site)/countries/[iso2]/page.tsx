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
  Briefcase,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  SEED_COUNTRIES,
  SEED_PLACES,
  SEED_ARTICLES,
  SEED_SIGHTINGS,
  SEED_OPPORTUNITIES,
} from '@/lib/seed-data';
import { Badge } from '@/components/ui/badge';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { SampleBadge } from '@/components/ui/sample-badge';
import { formatDateDeterministic } from '@/lib/date';
import { SciName } from '@/components/ui/sciname';

interface CountryPageProps {
  params: Promise<{
    iso2: string;
  }>;
}

export async function generateStaticParams() {
  return SEED_COUNTRIES.map((c) => ({
    iso2: c.iso2.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { iso2 } = await params;
  const country = SEED_COUNTRIES.find(
    (c) => c.iso2.toLowerCase() === iso2.toLowerCase()
  );

  if (!country) {
    return { title: 'Country Not Found — Red Sea Monitor' };
  }

  return {
    title: `${country.name} (${country.native_name}) — Red Sea Basin Dossier`,
    description: country.summary,
  };
}

export default async function CountryDossierPage({ params }: CountryPageProps) {
  const { iso2 } = await params;
  const isoUpper = iso2.toUpperCase();
  const country = SEED_COUNTRIES.find(
    (c) => c.iso2.toUpperCase() === isoUpper
  );

  if (!country) {
    notFound();
  }

  // Filter content matching this country
  const countryPlaces = SEED_PLACES.filter(
    (p) => p.country_iso2 === isoUpper
  );
  const countryArticles = SEED_ARTICLES.filter(
    (a) =>
      a.country_iso2 === isoUpper ||
      (a.country_ids && a.country_ids.includes(isoUpper))
  );
  const countrySightings = SEED_SIGHTINGS.filter(
    (s) => s.country_iso2 === isoUpper
  );
  const countryOpps = SEED_OPPORTUNITIES.filter(
    (o) =>
      o.country_iso2 === isoUpper ||
      (o.country_name && o.country_name.toLowerCase().includes(country.name.toLowerCase()))
  );

  const isComingSoon = country.status === 'COMING_SOON';

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Trail */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted">
        <Link href="/" className="hover:text-ink dark:hover:text-paper">
          Basin Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-rule" />
        <Link href="/explorer" className="hover:text-ink dark:hover:text-paper">
          Basin Countries
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-rule" />
        <span className="text-sea-700 dark:text-sea-500 font-semibold">{country.name}</span>
      </nav>

      {/* Country Masthead Header */}
      <div className="p-6 md:p-8 rounded-lg bg-paper-card dark:bg-sea-900/40 border border-rule space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-3xl sm:text-4xl">{country.flag_emoji}</span>
              <Badge variant={isComingSoon ? 'neutral' : 'sea'}>
                {isComingSoon ? 'Coming Soon / Baseline Survey' : 'Active Sovereign Basin Member'}
              </Badge>
              <CoordinateTag lat={country.latitude} lng={country.longitude} />
              <SampleBadge />
            </div>

            <div className="pt-1">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper">
                {country.name}
              </h1>
              <span className="font-serif text-xl sm:text-2xl text-muted font-normal block pt-1">
                {country.native_name}
              </span>
            </div>
          </div>

          <div className="flex md:flex-col items-end gap-2 text-right">
            <span className="text-xs font-mono text-muted uppercase">ISO-2 Code:</span>
            <span className="font-mono text-xl font-bold text-sea-800 dark:text-sea-400">
              {country.iso2}
            </span>
          </div>
        </div>

        <p className="font-sans text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
          {country.summary}
        </p>

        {/* Basin Profile Key Figures */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-rule/60 text-xs font-mono">
          <div className="p-3 rounded bg-paper dark:bg-deep-sea border border-rule/60">
            <span className="text-muted block text-[10px] uppercase">Coastline</span>
            <span className="font-bold text-base text-ink dark:text-paper">
              {country.coast_length_km ? `${country.coast_length_km.toLocaleString()} km` : 'Pending'}
            </span>
          </div>

          <div className="p-3 rounded bg-paper dark:bg-deep-sea border border-rule/60">
            <span className="text-muted block text-[10px] uppercase">Monitored MPAs</span>
            <span className="font-bold text-base text-ink dark:text-paper">
              {countryPlaces.length} {countryPlaces.length === 1 ? 'Site' : 'Sites'}
            </span>
          </div>

          <div className="p-3 rounded bg-paper dark:bg-deep-sea border border-rule/60">
            <span className="text-muted block text-[10px] uppercase">Field Dispatches</span>
            <span className="font-bold text-base text-ink dark:text-paper">
              {countryArticles.length} {countryArticles.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          <div className="p-3 rounded bg-paper dark:bg-deep-sea border border-rule/60">
            <span className="text-muted block text-[10px] uppercase">Logged Observations</span>
            <span className="font-bold text-base text-ink dark:text-paper">
              {countrySightings.length} {countrySightings.length === 1 ? 'Record' : 'Records'}
            </span>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      {isComingSoon && (
        <div className="p-8 rounded-lg bg-sand-200/50 dark:bg-sea-900/20 border border-dashed border-rule text-center space-y-4">
          <Compass className="w-10 h-10 text-muted mx-auto stroke-[1.5]" />
          <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
            Ecological Baseline Surveys in Progress
          </h2>
          <p className="font-sans text-sm text-muted max-w-xl mx-auto leading-relaxed">
            Marine transect data, mangrove canopy mapping, and coral health assessments for the {country.name} coastline are currently being synthesized in collaboration with regional oceanographic institutes.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded bg-sea-800 text-paper hover:bg-sea-700 transition-colors"
            >
              <span>Contribute Research for {country.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Active Country Sections */}
      {!isComingSoon && (
        <div className="space-y-12">
          {/* 1. Places & Marine Reserves */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sea-700 dark:text-sea-500" />
                <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                  Protected Havens & Marine Reserves ({countryPlaces.length})
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

            {countryPlaces.length === 0 ? (
              <p className="text-sm font-mono text-muted">No places published yet for this country.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countryPlaces.map((place) => (
                  <article
                    key={place.id}
                    className="p-5 rounded-lg bg-paper dark:bg-sea-900/30 border border-rule space-y-3 flex flex-col justify-between hover:border-sea-600 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sea-100 dark:bg-sea-800 text-sea-800 dark:text-sea-200">
                          {place.type}
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
                      <span className="text-muted">{place.protection_status || 'Protected'}</span>
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

          {/* 2. Scientific Articles & Field Dispatches */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sea-700 dark:text-sea-500" />
                <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                  Scientific Reporting & Investigations ({countryArticles.length})
                </h2>
              </div>
              <Link
                href="/news"
                className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
              >
                <span>All basin news</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {countryArticles.length === 0 ? (
              <p className="text-sm font-mono text-muted">No articles published yet for this country.</p>
            ) : (
              <div className="space-y-4">
                {countryArticles.map((article) => (
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
                        Author:{' '}
                        {article.authors && article.authors[0]
                          ? article.authors[0].author.display_name
                          : 'Editorial Staff'}
                      </span>
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
                      >
                        <span>Read investigation</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* 3. Field Observations & Sighting Records */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-sea-700 dark:text-sea-500" />
                <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                  Field Observations Logged ({countrySightings.length})
                </h2>
              </div>
              <Link
                href="/watch"
                className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
              >
                <span>Live watch map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {countrySightings.length === 0 ? (
              <p className="text-sm font-mono text-muted">No sightings recorded yet for this country.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {countrySightings.map((sighting) => (
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
            )}
          </section>

          {/* 4. Conservation Opportunities & Grants */}
          {countryOpps.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sea-700 dark:text-sea-500" />
                  <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                    Active Fellowships & Grants ({countryOpps.length})
                  </h2>
                </div>
                <Link
                  href="/opportunities"
                  className="text-xs font-mono text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1"
                >
                  <span>All opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {countryOpps.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-5 rounded-lg bg-paper dark:bg-sea-900/30 border border-rule space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-coral-100 dark:bg-coral-900/40 text-coral-800 dark:text-coral-200">
                          {opp.kind}
                        </span>
                        <span className="text-xs font-mono text-muted">
                          Deadline: {formatDateDeterministic(opp.deadline_at)}
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-ink dark:text-paper leading-snug">
                        {opp.title}
                      </h3>

                      <p className="font-sans text-xs text-muted leading-relaxed line-clamp-2">
                        {opp.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-rule/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-sea-800 dark:text-sea-400 font-semibold truncate max-w-[200px]">
                        {opp.amount_text}
                      </span>
                      <Link
                        href={`/opportunities/${opp.slug}`}
                        className="text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1 shrink-0 font-medium"
                      >
                        <span>Apply</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
