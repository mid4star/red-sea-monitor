import React from 'react';
import Link from 'next/link';
import { getSpeciesList } from '@/server/queries/explorer';
import { Button } from '@/components/ui/button';
import { SampleBadge } from '@/components/ui/sample-badge';
import { IucnScale } from '@/components/explorer/iucn-scale';

export default async function AdminSpeciesPage() {
  const species = await getSpeciesList({ limit: 100 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Biogeographic Species Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
            Manage taxa, IUCN conservation statuses, and coordinate privacy blurring.
          </p>
        </div>
        <Link
          href="/admin/species/new"
          className="inline-flex items-center justify-center font-sans font-medium bg-sea-900 text-paper hover:bg-sea-700 px-3 py-1.5 rounded-md text-xs font-semibold"
        >
          + Add New Species
        </Link>
      </div>

      <div className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-x-auto bg-card">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-100 dark:bg-stone-900/60 font-mono text-stone-500 uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
            <tr>
              <th className="p-3.5">Species</th>
              <th className="p-3.5">Taxonomic Group</th>
              <th className="p-3.5">IUCN Status</th>
              <th className="p-3.5">Privacy Flag</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-sans">
            {species.map((sp) => (
              <tr key={sp.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/30">
                <td className="p-3.5 font-medium text-stone-900 dark:text-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm">{sp.common_name}</span>
                    {sp.is_demo && <SampleBadge />}
                  </div>
                  <div className="text-[11px] font-serif italic text-stone-500 mt-0.5">
                    {sp.scientific_name}
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="font-mono text-[11px] bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    {sp.group}
                  </span>
                </td>
                <td className="p-3.5 w-48">
                  <IucnScale status={sp.iucn_status} showDetails={false} />
                </td>
                <td className="p-3.5">
                  {sp.is_sensitive ? (
                    <span className="text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-2 py-0.5 rounded">
                      ±11km Blurred
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-stone-400">
                      Standard GPS
                    </span>
                  )}
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <Link
                    href={`/explorer/species/${sp.slug}`}
                    target="_blank"
                    className="font-mono text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs"
                  >
                    View ↗
                  </Link>
                  <Link
                    href={`/admin/species/${sp.id || sp.slug}`}
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
