import React from 'react';
import { notFound } from 'next/navigation';
import { getSpeciesBySlug, getSpeciesList } from '@/server/queries/explorer';
import { SpeciesEditor } from '@/components/admin/species-editor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSpeciesPage({ params }: Props) {
  const { id } = await params;

  let sp = await getSpeciesBySlug(id);
  if (!sp) {
    const all = await getSpeciesList({ limit: 100 });
    sp = all.find((s) => s.id === id) || null;
  }

  if (!sp) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Edit Species: {sp.common_name} ({sp.scientific_name})
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Update Red List classification, active seasons, and WoRMS/GBIF taxonomy links.
        </p>
      </div>

      <SpeciesEditor initialData={sp} />
    </div>
  );
}
