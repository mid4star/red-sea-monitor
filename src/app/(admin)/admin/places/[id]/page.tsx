import React from 'react';
import { notFound } from 'next/navigation';
import { getPlaceBySlug, getPlaces } from '@/server/queries/explorer';
import { PlaceEditor } from '@/components/admin/place-editor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPlacePage({ params }: Props) {
  const { id } = await params;
  
  // Try looking up by id or slug
  let place = await getPlaceBySlug(id);
  if (!place) {
    const all = await getPlaces({ limit: 100 });
    place = all.find((p) => p.id === id) || null;
  }

  if (!place) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Edit Place: {place.name}
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Update coordinates, safety rules, and conservation literature.
        </p>
      </div>

      <PlaceEditor initialData={place} />
    </div>
  );
}
