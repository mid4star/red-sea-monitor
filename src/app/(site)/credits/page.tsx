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
            All media published across dispatches, gazetteer entries, and species dossiers adhere to strict licensing standards. We never hotlink, scrape copyrighted media, or use restrictive NC/ND media:
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

          <h2>3. Verified Home Page Media Inventory (14 Distinct Visuals)</h2>
          <div className="overflow-x-auto not-prose my-6 border border-rule rounded-md">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-sand-100 dark:bg-sea-900/60 font-mono text-[11px] uppercase border-b border-rule text-ink dark:text-paper">
                <tr>
                  <th className="p-2.5">Placement</th>
                  <th className="p-2.5">Subject</th>
                  <th className="p-2.5">Source & ID</th>
                  <th className="p-2.5">License</th>
                  <th className="p-2.5">Match Verification Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule/40 text-[11px]">
                <tr>
                  <td className="p-2.5 font-mono">Hero Background</td>
                  <td className="p-2.5">Panoramic coral reef wall & schooling anthias</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1544551763-46a013bb70d5)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Red Sea reef wall with Anthias fish</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">Hero Field Card</td>
                  <td className="p-2.5">Hawksbill sea turtle foraging</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1518467166778-b88f373ffec7)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Sea turtle swimming over coral reef</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">News Lead Story</td>
                  <td className="p-2.5">Northern Red Sea thermal refugia hard corals</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1546026423-cc4642628d2b)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Dense tropical hard coral benthos</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">News Secondary 1</td>
                  <td className="p-2.5">Littoral mangrove lagoon & shoreline</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1507525428034-b723cf961d3e)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Pristine tropical shoreline waters</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">News Secondary 2</td>
                  <td className="p-2.5">Historic stone coastal port architecture</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1570077188670-e3a8d69ac5ff)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Coastal harbor and traditional stone masonry</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">News Newly Pub 1</td>
                  <td className="p-2.5">Northern Red Sea pelagic waters & dropoff</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1682687220063-4742bd7fd538)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Deep pelagic water current transect</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">News Newly Pub 2</td>
                  <td className="p-2.5">Coastal raptor / western osprey</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1557008075-7f2c5efa4cfd)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Raptor bird perched over coastline</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">News Newly Pub 3</td>
                  <td className="p-2.5">Branching hard coral colonies</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1582967788606-a171c1080cb0)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Sunlit branching Acropora corals</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">Watch Card 1</td>
                  <td className="p-2.5">Dugong feeding on shallow Halodule meadow</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1583212292454-1fe6229603b7)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Marine sirenian feeding in shallow water</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">Watch Card 2</td>
                  <td className="p-2.5">Spinner dolphins pod in open lagoon</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1570498839593-e565b3d4f6ee)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Dolphin pod swimming together</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">Watch Card 3</td>
                  <td className="p-2.5">Green sea turtle cruising reef crest</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1437622368342-7a3d73a34c8f)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Sea turtle swimming over tropical benthos</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">Explorer Card 1</td>
                  <td className="p-2.5">Sanganeb Atoll oceanic pinnacle & shelf (Sudan)</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1516683037151-9a17603a8dc7)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Oceanic atoll reef wall and pelagic water</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">Explorer Card 2</td>
                  <td className="p-2.5">Aqaba Marine Reserve fringing reef (Jordan)</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1544552866-d3ed42536cfd)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Northern Gulf coral garden with high visibility</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono">Store Feature</td>
                  <td className="p-2.5">Wadi Doum Palm Handwoven Field Basket</td>
                  <td className="p-2.5 font-mono">Unsplash (photo-1595461135849-bf08893d45c0)</td>
                  <td className="p-2.5">Unsplash License</td>
                  <td className="p-2.5 text-muted">File description: Handwoven natural palm-fiber basket</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>4. Taxonomic & Conservation Authority Data</h2>
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
