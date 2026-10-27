import React from 'react';
import { OpportunityEditor } from '@/components/admin/opportunity-editor';
import { getOrganizations } from '@/server/queries/opportunities';

export default async function NewOpportunityPage() {
  const orgs = await getOrganizations();

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Create New Opportunity
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Enter grant details, eligibility requirements, application deadline, and official apply URL.
        </p>
      </div>

      <OpportunityEditor organizations={orgs} />
    </div>
  );
}
