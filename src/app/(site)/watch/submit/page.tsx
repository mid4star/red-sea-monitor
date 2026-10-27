import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SightingForm } from '@/components/watch/sighting-form';
import { SampleBadge } from '@/components/ui/sample-badge';

export const metadata: Metadata = {
  title: 'Share a Sighting — Red Sea Watch',
  description: 'Submit a verified wildlife observation to the Red Sea marine conservation research database.',
};

export default function SubmitSightingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Watch', href: '/watch' },
          { label: 'Share a Sighting' },
        ]}
      />

      <div className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-primary border border-primary px-2 py-0.5 rounded">
            Citizen Science Intake
          </span>
          <SampleBadge />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Report a Marine Wildlife Sighting
        </h1>
        <p className="font-serif text-base text-stone-600 dark:text-stone-300 leading-relaxed">
          Your field reports empower marine biologists to monitor migration corridors, breeding seasons, and population baselines. Sensitive species locations are automatically protected before publication.
        </p>
      </div>

      <SightingForm />
    </div>
  );
}
