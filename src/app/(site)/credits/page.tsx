import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Camera, MapPin, Database, Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Prose } from '@/components/ui/prose';

export const metadata: Metadata = {
  title: 'Credits & Data Provenance — Red Sea Monitor',
  description: 'Complete attribution for imagery, bathymetric cartography, and scientific taxonomy used across the platform.',
};

export default function CreditsPage() {
  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Credits & Provenance' }]} />

      <div className="border-b border-rule pb-8 space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="sea">Attribution & Open Access</Badge>
          <span className="font-mono text-xs text-muted">Version 2.0 • Updated October 2026</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper leading-tight">
          Image & Data Credits
        </h1>
        <p className="font-sans text-base sm:text-lg text-muted leading-relaxed">
          Red Sea Monitor operates under open-science principles. Every photograph, spatial polygon, and taxonomic record is transparently attributed to its creator and source repository.
        </p>
      </div>

      <div className="max-w-reading space-y-10">
        <Prose>
          <h2>1. Cartography & Bathymetric Data</h2>
          <p>
            Coastal geometry, tectonic rift bathymetry, and hydrographic soundings are derived from public domain and open-access spatial repositories:
          </p>
          <ul>
            <li>
              <strong>Natural Earth:</strong> Public domain 1:10m physical vector coastline and land boundaries.
            </li>
            <li>
              <strong>GEBCO (General Bathymetric Chart of the Oceans):</strong> Sub-surface axial rift depth contours and submarine sill thresholds.
            </li>
            <li>
              <strong>OpenStreetMap Contributors:</strong> Coastal town centers and terrestrial wadi trails (ODbL).
            </li>
          </ul>

          <h2>2. Photography & Scientific Media</h2>
          <p>
            All media published across dispatches, gazetteer entries, and species dossiers adhere to strict licensing standards. We never hotlink, scrap copyrighted media, or use restrictive NC/ND media:
          </p>
          <ul>
            <li>
              <strong>Wikimedia Commons:</strong> Species and reef documentation under Creative Commons Attribution (CC BY 4.0), CC BY-SA 4.0, and Public Domain Dedication (CC0).
            </li>
            <li>
              <strong>Unsplash & Pexels:</strong> Curated high-resolution underwater and coastal photography licensed for open educational and editorial use.
            </li>
            <li>
              <strong>Field Contributor Submissions:</strong> Volunteer photos submitted through Red Sea Watch with explicit CC BY-SA author consent.
            </li>
          </ul>

          <h2>3. Taxonomic & Conservation Authority Data</h2>
          <ul>
            <li>
              <strong>IUCN Red List of Threatened Species:</strong> Global extinction risk categorizations and regional population assessments.
            </li>
            <li>
              <strong>WoRMS (World Register of Marine Species):</strong> Accepted scientific binomial nomenclature, authorities, and taxonomic hierarchies.
            </li>
            <li>
              <strong>GBIF (Global Biodiversity Information Facility):</strong> Occurrence records and spatial distribution keys.
            </li>
          </ul>

          <h2>4. Typography & Icons</h2>
          <ul>
            <li>
              <strong>Typography:</strong> Google Fonts open-source variable typefaces (Amiri, Newsreader, Inter, IBM Plex Mono).
            </li>
            <li>
              <strong>Iconography:</strong> Lucide Icons (ISC License).
            </li>
          </ul>
        </Prose>

        <div className="p-6 rounded-lg bg-paper-card dark:bg-sea-900/40 border border-rule space-y-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-sea-700 dark:text-sea-500 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>COPYRIGHT & CORRECTION NOTICE</span>
          </div>
          <p className="text-muted leading-relaxed font-sans">
            If you are a photographer, researcher, or institution and believe a media credit requires amendment or license updating, please contact our dispatch desk at <Link href="/contact" className="text-sea-700 dark:text-sea-500 underline">contact@redseamonitor.org</Link>. Corrections are handled within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
