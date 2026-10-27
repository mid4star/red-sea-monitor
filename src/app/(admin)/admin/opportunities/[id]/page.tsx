import React from 'react';
import { notFound } from 'next/navigation';
import { getOpportunityBySlug, getOpportunities, getOrganizations } from '@/server/queries/opportunities';
import { OpportunityEditor } from '@/components/admin/opportunity-editor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditOpportunityPage({ params }: Props) {
  const { id } = await params;

  let opp = await getOpportunityBySlug(id);
  if (!opp) {
    const all = await getOpportunities({ limit: 100 });
    opp = all.find((o) => o.id === id) || null;
  }

  if (!opp) {
    notFound();
  }

  const orgs = await getOrganizations();

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Edit Opportunity: {opp.title}
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Update application deadline, eligibility criteria, and host portal link.
        </p>
      </div>

      <OpportunityEditor initialData={opp} organizations={orgs} />
    </div>
  );
}
