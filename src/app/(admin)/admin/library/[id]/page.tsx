import React from 'react';
import { notFound } from 'next/navigation';
import { getLibraryItemBySlug, getLibraryItems } from '@/server/queries/library';
import { LibraryEditor } from '@/components/admin/library-editor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLibraryItemPage({ params }: Props) {
  const { id } = await params;

  let item = await getLibraryItemBySlug(id);
  if (!item) {
    const all = await getLibraryItems({ limit: 100 });
    item = all.find((i) => i.id === id) || null;
  }

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Edit Publication: {item.title}
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Update abstract, citation format, and Open Access license status.
        </p>
      </div>

      <LibraryEditor initialData={item} />
    </div>
  );
}
