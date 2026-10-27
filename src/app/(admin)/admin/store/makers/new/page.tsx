import React from 'react';
import { MakerEditor } from '@/components/admin/maker-editor';

export default function NewMakerPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-ink dark:text-paper">
          Document New Artisan or Guild
        </h1>
        <p className="text-xs text-muted font-sans mt-0.5">
          Record artisan clan lineage, traditional technique, customary conservation law, and geographic community.
        </p>
      </div>

      <MakerEditor />
    </div>
  );
}
