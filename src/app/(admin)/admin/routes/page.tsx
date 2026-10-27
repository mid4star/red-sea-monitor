import React from 'react';
import Link from 'next/link';
import { getRoutes } from '@/server/queries/explorer';
import { Button } from '@/components/ui/button';
import { SampleBadge } from '@/components/ui/sample-badge';

export default async function AdminRoutesPage() {
  const routes = await getRoutes({ limit: 100 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Field Routes & Research Transects
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
            Manage research expeditions, coastal monitoring routes, and desert wadi trails.
          </p>
        </div>
        <Link
          href="/admin/routes/new"
          className="inline-flex items-center justify-center font-sans font-medium bg-sea-900 text-paper hover:bg-sea-700 px-3 py-1.5 rounded-md text-xs font-semibold"
        >
          + Add New Route
        </Link>
      </div>

      <div className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-x-auto bg-card">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-100 dark:bg-stone-900/60 font-mono text-stone-500 uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
            <tr>
              <th className="p-3.5">Route Title</th>
              <th className="p-3.5">Difficulty</th>
              <th className="p-3.5">Metrics</th>
              <th className="p-3.5">Season</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-sans">
            {routes.map((rt) => (
              <tr key={rt.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/30">
                <td className="p-3.5 font-medium text-stone-900 dark:text-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm">{rt.title}</span>
                    {rt.is_demo && <SampleBadge />}
                  </div>
                  <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                    /{rt.slug}
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="font-mono text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    {rt.difficulty}
                  </span>
                </td>
                <td className="p-3.5 font-mono text-stone-600 dark:text-stone-400">
                  {rt.distance_km} km • {rt.duration_hours}h
                </td>
                <td className="p-3.5 font-mono text-stone-500">
                  {rt.season || 'Year-round'}
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <Link
                    href={`/explorer/routes/${rt.slug}`}
                    target="_blank"
                    className="font-mono text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs"
                  >
                    View ↗
                  </Link>
                  <Link
                    href={`/admin/routes/${rt.id || rt.slug}`}
                    className="font-mono text-primary hover:underline font-semibold text-xs"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
