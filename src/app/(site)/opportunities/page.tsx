import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getOpportunities, getVolunteerPrograms } from '@/server/queries/opportunities';
import { OpportunityKind } from '@prisma/client';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CalendarButton } from '@/components/opportunities/calendar-button';
import { SectionHeader } from '@/components/ui/section-header';
import { Clock, MapPin, DollarSign, Award, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Grants, Fellowships & Field Opportunities — Red Sea Monitor',
  description:
    'Directory of marine science research grants, fellowships, conservation jobs, and volunteer programs in Egypt’s Red Sea.',
};

export default async function OpportunitiesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentKind = params.kind as OpportunityKind | undefined;
  const searchQuery = params.q;

  const [opportunities, volunteerPrograms] = await Promise.all([
    getOpportunities({ kind: currentKind || 'ALL', search: searchQuery, limit: 50 }),
    getVolunteerPrograms({ limit: 10 }),
  ]);

  const kindTabs = [
    { label: 'All Opportunities', value: '' },
    { label: 'Grants & Funding', value: 'GRANT' },
    { label: 'Research Fellowships', value: 'FELLOWSHIP' },
    { label: 'Technical Training', value: 'TRAINING' },
    { label: 'Conservation Jobs', value: 'JOB' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Opportunities & Grants' },
        ]}
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-primary border border-primary px-2.5 py-0.5 rounded font-semibold">
            Marine Conservation Funding & Careers
          </span>
          <SampleBadge />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Red Sea Opportunities & Grants
        </h1>
        <p className="font-serif text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          Open-access directory cataloging scientific research fellowships, community oral history grants, dive ranger training, and volunteer wildlife patrols.
        </p>
      </div>

      {/* Kind Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {kindTabs.map((tab) => {
          const isActive = (params.kind || '') === tab.value;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/opportunities?kind=${tab.value}` : '/opportunities'}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Opportunities List */}
      <div className="space-y-6">
        {opportunities.map((opp) => {
          const deadline = opp.deadline_at ? new Date(opp.deadline_at) : null;
          const isExpired = deadline && deadline < new Date();

          return (
            <article
              key={opp.id}
              className="border border-stone-300 dark:border-stone-800 rounded-sm p-6 bg-card space-y-4 hover:border-primary/60 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 rounded font-semibold">
                    {opp.kind}
                  </span>
                  {opp.organization && (
                    <span className="text-xs font-sans text-stone-500">
                      {opp.organization.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {deadline && (
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                        isExpired
                          ? 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                          : 'bg-coral-500/10 text-coral-600 dark:text-coral-400 border border-coral-500/30'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>
                        Deadline: {deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </span>
                  )}
                  {opp.is_demo && <SampleBadge />}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 hover:text-primary transition-colors">
                  <Link href={`/opportunities/${opp.slug}`}>
                    {opp.title}
                  </Link>
                </h2>
                <p className="font-serif text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                  {opp.summary}
                </p>
              </div>

              {/* Badges / Details Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-stone-800/80">
                {opp.amount_text && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-stone-500" />
                    <span>{opp.amount_text}</span>
                  </div>
                )}
                {opp.location_text && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>{opp.location_text}</span>
                  </div>
                )}
                {opp.eligibility && (
                  <div className="flex items-center gap-1.5 sm:col-span-3 text-[11px] text-stone-500 font-sans">
                    <Award className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>Eligibility: {opp.eligibility}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                <CalendarButton opportunity={opp} />

                <div className="flex items-center gap-3">
                  <Link
                    href={`/opportunities/${opp.slug}`}
                    className="font-mono text-xs text-stone-600 dark:text-stone-400 hover:underline"
                  >
                    View Details
                  </Link>
                  <a
                    href={opp.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-sans font-medium bg-sea-900 text-paper hover:bg-sea-700 px-3 py-1.5 rounded-md"
                  >
                    <span>Apply on Official Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Volunteer Programs Section */}
      {volunteerPrograms.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
          <SectionHeader
            index="02"
            title="Volunteer Field Missions"
            subtitle="Hands-on community science expeditions and marine turtle nesting monitoring."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerPrograms.map((vol) => (
              <div
                key={vol.id}
                className="border border-stone-300 dark:border-stone-800 rounded-sm p-5 bg-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    Field Volunteer Mission
                  </span>
                  {vol.spots && (
                    <span className="text-xs font-mono font-semibold text-coral-600 dark:text-coral-400">
                      {vol.spots} Spots Available
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  {vol.title}
                </h3>

                <p className="font-serif text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {vol.summary}
                </p>

                <div className="text-xs font-mono text-stone-500 pt-2 border-t border-stone-200 dark:border-stone-800 space-y-1">
                  <div>Location: {vol.location_text}</div>
                  {vol.skills_needed && <div>Skills: {vol.skills_needed}</div>}
                </div>

                <div className="pt-2">
                  <a
                    href={vol.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-sans font-medium text-primary hover:underline"
                  >
                    <span>Join Volunteer Squad ↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
