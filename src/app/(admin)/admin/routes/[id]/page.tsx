import React from 'react';
import { notFound } from 'next/navigation';
import { getRouteBySlug, getRoutes } from '@/server/queries/explorer';
import { RouteEditor } from '@/components/admin/route-editor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditRoutePage({ params }: Props) {
  const { id } = await params;

  let rt = await getRouteBySlug(id);
  if (!rt) {
    const all = await getRoutes({ limit: 100 });
    rt = all.find((r) => r.id === id) || null;
  }

  if (!rt) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Edit Route: {rt.title}
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Update waypoints, distance metrics, and safety recommendations.
        </p>
      </div>

      <RouteEditor initialData={rt} />
    </div>
  );
}
