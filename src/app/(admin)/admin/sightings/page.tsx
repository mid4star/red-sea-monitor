import React from 'react';
import { getAllSightingsForAdmin } from '@/server/queries/watch';
import { SightingsTable } from '@/components/admin/sightings-table';

export default async function AdminSightingsPage() {
  const sightings = await getAllSightingsForAdmin({ limit: 100 });

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Red Sea Watch Moderation Queue
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
          Review crowdsourced wildlife sightings, verify species morphology, and inspect private raw GPS coordinates before public publication.
        </p>
      </div>

      <SightingsTable initialSightings={sightings} />
    </div>
  );
}
