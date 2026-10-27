import React from 'react';
import { SpeciesEditor } from '@/components/admin/species-editor';

export default function NewSpeciesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Add New Species to Biogeographic Directory
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Record scientific nomenclature, IUCN assessment, active breeding months, and sensitivity flags.
        </p>
      </div>

      <SpeciesEditor />
    </div>
  );
}
