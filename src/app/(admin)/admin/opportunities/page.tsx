import React from 'react';
import Link from 'next/link';
import { getOpportunities } from '@/server/queries/opportunities';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Clock } from 'lucide-react';

export default async function AdminOpportunitiesPage() {
  const opportunities = await getOpportunities({ limit: 100 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Opportunities & Grants Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
            Manage research fellowships, documentation grants, training residencies, and jobs.
          </p>
        </div>
        <Link
          href="/admin/opportunities/new"
          className="inline-flex items-center justify-center font-sans font-medium bg-sea-900 text-paper hover:bg-sea-700 px-3 py-1.5 rounded-md text-xs font-semibold"
        >
          + Add Opportunity
        </Link>
      </div>

      <div className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-x-auto bg-card">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-100 dark:bg-stone-900/60 font-mono text-stone-500 uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
            <tr>
              <th className="p-3.5">Title</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Funding / Stipend</th>
              <th className="p-3.5">Deadline</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-sans">
            {opportunities.map((opp) => {
              const deadline = opp.deadline_at ? new Date(opp.deadline_at) : null;
              const isExpired = deadline && deadline < new Date();

              return (
                <tr key={opp.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/30">
                  <td className="p-3.5 font-medium text-stone-900 dark:text-stone-100 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm line-clamp-1">{opp.title}</span>
                      {opp.is_demo && <SampleBadge />}
                    </div>
                    <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                      /{opp.slug}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-mono text-[11px] bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                      {opp.kind}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-stone-600 dark:text-stone-400">
                    {opp.amount_text || '—'}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    {deadline ? (
                      <span
                        className={`font-mono text-[11px] flex items-center gap-1 ${
                          isExpired ? 'text-stone-400 line-through' : 'text-coral-600 dark:text-coral-400'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </span>
                    ) : (
                      <span className="font-mono text-stone-400">Open rolling</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className="font-mono text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded">
                      {opp.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <Link
                      href={`/opportunities/${opp.slug}`}
                      target="_blank"
                      className="font-mono text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs"
                    >
                      View ↗
                    </Link>
                    <Link
                      href={`/admin/opportunities/${opp.id || opp.slug}`}
                      className="font-mono text-primary hover:underline font-semibold text-xs"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
