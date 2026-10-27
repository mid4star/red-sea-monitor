import React from 'react';
import { LibraryEditor } from '@/components/admin/library-editor';

export default function NewLibraryItemPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Add Scientific Publication to Library
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Use the 1-click DOI or ISBN auto-lookup, or enter bibliographic data manually.
        </p>
      </div>

      <LibraryEditor />
    </div>
  );
}
