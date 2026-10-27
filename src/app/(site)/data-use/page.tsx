import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Shield, Lock, MapPin, Database, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sighting Data & Wildlife Privacy Policy — Red Sea Monitor',
  description:
    'Principles governing citizen science data collection, spatial coordinate obfuscation, and institutional research sharing.',
};

export default function DataUsePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Data Policy & Privacy' },
        ]}
      />

      <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-primary border border-primary px-2.5 py-0.5 rounded font-semibold">
            Scientific Stewardship Standards
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Red Sea Watch Sighting Data Policy
        </h1>
        <p className="font-serif text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          How Red Sea Monitor balances open scientific collaboration with the critical need to safeguard endangered wildlife from targeted disturbance, unpermitted commercial boat traffic, and poaching.
        </p>
      </header>

      <div className="space-y-8 font-serif text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <span>1. The Sensitive Taxa Coordinate Blurring Rule (~11km Grid)</span>
          </h2>
          <p>
            When observers submit sightings of threatened, legally protected, or high-value marine organisms (including Dugongs, Green Sea Turtles, Hawksbill Turtles, Whale Sharks, and Oceanic Whitetip Sharks), exact GPS coordinates are <strong>never rendered on public web maps</strong>.
          </p>
          <p>
            Instead, coordinates are mathematically generalized to the centroid of an ~11 kilometer grid cell (0.1 degree precision). This allows oceanographers and planners to observe regional distribution trends while preventing unscrupulous operators or poachers from pinpointing critical nesting beaches or nursery channels.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-coral-500" />
            <span>2. Observer Privacy & Anonymity</span>
          </h2>
          <p>
            Your email address is confidential. It is encrypted in our PostgreSQL database and is strictly accessible to verified scientific moderators solely for observation verification (e.g. requesting additional photographic documentation of identifying markings). Your email is never sold, publicly displayed, or shared with commercial entities.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-500" />
            <span>3. Academic & Institutional Data Sharing</span>
          </h2>
          <p>
            Anonymized observation matrices and aggregated seasonal presence statistics are provided free of charge to accredited academic institutions, including the National Institute of Oceanography and Fisheries (NIOF) and the Egyptian Environmental Affairs Agency (EEAA). Researchers requesting access to unblurred coordinate layers must sign a formal scientific data-use agreement.
          </p>
        </section>
      </div>
    </div>
  );
}
