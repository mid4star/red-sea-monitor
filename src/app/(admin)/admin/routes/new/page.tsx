import React from 'react';
import { RouteEditor } from '@/components/admin/route-editor';

export default function NewRoutePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Create New Field Route / Transect
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Define waypoints, difficulty grades, ranger authorizations, and safety protocols.
        </p>
      </div>

      <RouteEditor />
    </div>
  );
}
