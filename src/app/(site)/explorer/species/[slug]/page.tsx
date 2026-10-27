import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getSpeciesBySlug } from '@/server/queries/explorer';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { IucnScale } from '@/components/explorer/iucn-scale';
import { SeasonalStrip } from '@/components/explorer/seasonal-strip';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sp = await getSpeciesBySlug(slug);
  if (!sp) return { title: 'Species Not Found — Red Sea Monitor' };

  return {
    title: `${sp.common_name} (${sp.scientific_name}) — Red Sea Monitor Species Catalog`,
    description: sp.description || `Taxonomy, ecological niche, and conservation status for ${sp.common_name}.`,
  };
}

export default async function SpeciesDetailPage({ params }: Props) {
  const { slug } = await params;
  const sp = await getSpeciesBySlug(slug);

  if (!sp) {
    notFound();
  }

  const externalIds = sp.external_ids || {};
  const activeMonths = sp.seasonal_months || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Explorer', href: '/explorer' },
          { label: 'Species', href: '/explorer/species' },
          { label: sp.common_name },
        ]}
      />

      {/* Header Profile */}
      <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded">
            {sp.group}
          </span>
          {sp.is_demo && <SampleBadge />}
          {sp.is_sensitive && (
            <span className="text-xs font-mono bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-2 py-0.5 rounded">
              Sensitive Taxon — Public Coordinates Blurred ±11km
            </span>
          )}
        </div>

        <div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {sp.common_name}
          </h1>
          <p className="font-serif italic text-xl text-stone-600 dark:text-stone-300 mt-1">
            {sp.scientific_name}
          </p>
        </div>
      </header>

      {/* Sensitive Taxon Caution Banner if applicable */}
      {sp.is_sensitive && (
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-sm space-y-1">
          <h4 className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2">
            <span>🛡</span> Conservation Sensitive Taxon Policy
          </h4>
          <p className="text-xs text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
            Due to the vulnerability of this species to wildlife harassment, illegal egg harvesting, or unpermitted commercial excursions, exact GPS sighting coordinates are systematically obfuscated to an ~11 km regional grid cell.
          </p>
        </div>
      )}

      {/* Main Grid: Details & IUCN Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          {/* IUCN Graphic */}
          <div className="border border-stone-300 dark:border-stone-800 bg-card p-5 rounded-sm">
            <IucnScale status={sp.iucn_status} showDetails={true} />
          </div>

          {/* Seasonal Activity Strip */}
          <div className="border border-stone-300 dark:border-stone-800 bg-card p-5 rounded-sm">
            <SeasonalStrip
              activeMonths={activeMonths}
              label="Red Sea Seasonal Presence & Reproductive Activity"
            />
          </div>

          {/* Biological Description */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              Ecological Profile & Morphological Summary
            </h2>
            <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {sp.description}
            </p>
          </div>

          {/* Habitat & Diet Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sp.habitat && (
              <div className="border border-stone-300 dark:border-stone-800 p-4 rounded-sm bg-stone-50 dark:bg-stone-900/40 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                  Habitat & Bathymetric Zone
                </span>
                <p className="text-xs text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
                  {sp.habitat}
                </p>
              </div>
            )}

            {sp.diet && (
              <div className="border border-stone-300 dark:border-stone-800 p-4 rounded-sm bg-stone-50 dark:bg-stone-900/40 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                  Foraging Ecology & Diet
                </span>
                <p className="text-xs text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
                  {sp.diet}
                </p>
              </div>
            )}
          </div>

          {/* Threats */}
          {sp.threats && (
            <div className="border-l-2 border-red-600 bg-stone-50 dark:bg-stone-900/30 p-4 rounded-r-sm space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold block">
                Principal Conservation Threats
              </span>
              <p className="text-xs text-stone-800 dark:text-stone-200 font-serif leading-relaxed">
                {sp.threats}
              </p>
            </div>
          )}

          {/* Verified Literature Sources */}
          {sp.sources && sp.sources.length > 0 && (
            <div className="border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/30 p-5 rounded-sm space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Peer Sources & Verification Records ({sp.sources.length})
              </h3>
              <ul className="space-y-2 text-xs">
                {sp.sources.map((src: any) => (
                  <li key={src.id} className="flex items-start justify-between gap-3 border-b border-stone-200 dark:border-stone-800/60 pb-2 last:border-none last:pb-0">
                    <div>
                      <span className="font-serif font-bold text-stone-800 dark:text-stone-200 block">
                        {src.title}
                      </span>
                      <span className="text-stone-500 font-mono text-[11px]">
                        {src.publisher}
                      </span>
                    </div>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-primary hover:underline shrink-0 text-[11px]"
                    >
                      Source ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar: Taxonomy Links & Reviewer Credit */}
        <aside className="space-y-6">
          {/* External Taxonomy IDs */}
          <div className="border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-4 rounded-sm space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block">
              External Biodiversity Identifiers
            </span>
            <div className="space-y-2 text-xs font-mono">
              {externalIds.worms && (
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-1.5">
                  <span className="text-stone-500">WoRMS</span>
                  <a
                    href={`https://www.marinespecies.org/aphia.php?p=taxdetails&id=${externalIds.worms}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    urn:lsid:{externalIds.worms} ↗
                  </a>
                </div>
              )}

              {externalIds.gbif && (
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-1.5">
                  <span className="text-stone-500">GBIF</span>
                  <a
                    href={`https://www.gbif.org/species/${externalIds.gbif}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    gbif:{externalIds.gbif} ↗
                  </a>
                </div>
              )}

              {externalIds.inaturalist && (
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-1.5">
                  <span className="text-stone-500">iNaturalist</span>
                  <a
                    href={`https://www.inaturalist.org/taxa/${externalIds.inaturalist}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    taxon:{externalIds.inaturalist} ↗
                  </a>
                </div>
              )}

              {externalIds.iucn && (
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">IUCN Red List</span>
                  <a
                    href={`https://www.iucnredlist.org/species/${externalIds.iucn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    assessment:{externalIds.iucn} ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Reviewer / Verification Credit */}
          {sp.reviewed_by && (
            <div className="border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900/60 p-4 rounded-sm space-y-1.5 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Scientific Verification
              </span>
              <p className="font-serif font-bold text-stone-900 dark:text-stone-100">
                {sp.reviewed_by.name}
              </p>
              {sp.reviewed_by.organization && (
                <p className="text-stone-600 dark:text-stone-400 font-sans text-[11px]">
                  {sp.reviewed_by.organization}
                </p>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <Link
              href="/explorer/species"
              className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
            >
              ← Back to Species Directory
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
