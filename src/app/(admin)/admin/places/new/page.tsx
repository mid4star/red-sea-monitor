import React from 'react';
import { PlaceEditor } from '@/components/admin/place-editor';

export default function NewPlacePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Create New Place Record
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Enter geographic coordinates, protection decrees, and responsible visit guidance.
        </p>
      </div>

      <PlaceEditor />
    </div>
  );
}
