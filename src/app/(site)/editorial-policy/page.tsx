import React from 'react';
import { ShieldCheck, FileCheck, AlertCircle, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Prose } from '@/components/ui/prose';

export const metadata = {
  title: 'Editorial Standards & Fact-Checking Policy',
  description: 'Our verification protocols, zero-source news ban, corrections transparency, and funding disclosure.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Editorial Policy & Verification' }]} />

      <div className="border-b border-rule pb-8 space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="coral">Standards Charter</Badge>
          <span className="font-mono text-xs text-muted">Version 1.2 • Published 2026</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper leading-tight">
          Editorial & Verification Standards
        </h1>
        <p className="font-sans text-lg text-muted leading-relaxed">
          How Red Sea Monitor verifies observations, cites scientific research, and maintains factual transparency.
        </p>
      </div>

      <div className="max-w-reading">
        <Prose>
          <h2>1. The Zero-Source News Ban</h2>
          <p>
            An article categorized as <code>NEWS</code> <strong>cannot be published</strong> on Red Sea Monitor without at least one verifiable external source URL. This rule is enforced at the database and application layer. Unsubstantiated claims, commercial press releases, and viral social media rumors are excluded.
          </p>

          <h2>2. Scientific Verification & Reviewer Attribution</h2>
          <p>
            Gazetteer entries, species taxonomy profiles, and wildlife sightings undergo peer review by registered oceanographers, rangers, and ecologists. Every published dispatch records:
          </p>
          <ul>
            <li><strong>Verified By:</strong> The name, credential, and institution of the reviewing editor.</li>
            <li><strong>Last Verified Date:</strong> Timestamp of factual re-audit.</li>
            <li><strong>Persistent Identifiers:</strong> DOIs for scientific papers; ISBNs for historical cartography and books.</li>
          </ul>

          <h2>3. Corrections & Amendments Protocol</h2>
          <p>
            When factual inaccuracies or revised taxonomies are identified, we do not quietly edit text. A transparent <em>Correction Notice</em> is permanently affixed to the article header detailing:
          </p>
          <ul>
            <li>Date and time of modification.</li>
            <li>Exact nature of the factual change.</li>
            <li>Responsible editor or source confirming the correction.</li>
          </ul>

          <h2>4. Sensitive Species Coordinate Protection (The 11 km Rule)</h2>
          <p>
            To prevent illegal wildlife collection, poaching, and vessel harassment, exact GPS coordinates of endangered and vulnerable taxa (including dugongs, marine turtles, and oceanic whitetip sharks) are permanently blurred to a ~11 km bounding grid (~0.1°) for public users. High-precision telemetry data is restricted to accredited scientists and environmental authorities.
          </p>

          <h2>5. Regional Basin Neutrality & UN Cartographic Standards</h2>
          <p>
            Red Sea Monitor monitors the Red Sea basin as a unified transboundary marine ecosystem. We report across all coastal littoral nations (Egypt, Sudan, Saudi Arabia, Jordan, Eritrea, Yemen, Djibouti, and Somalia partner) adhering strictly to UN Cartographic section standards and international maritime hydrography. Our sole focus is peer-verified field ecology, climate refugia, and biodiversity conservation free from political polarization.
          </p>

          <h2>6. Funding & Independence Disclosure</h2>
          <p>
            Red Sea Monitor operates as a non-profit open-access research consortium. We do not accept funding from hotel development conglomerates, extractive fossil fuel projects, or unaccredited commercial tourism operators. Institutional partners provide access to research vessels, field laboratories, and academic peer review.
          </p>
        </Prose>
      </div>
    </div>
  );
}
