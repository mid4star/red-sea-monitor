import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getOpportunityBySlug } from '@/server/queries/opportunities';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SampleBadge } from '@/components/ui/sample-badge';
import { CalendarButton } from '@/components/opportunities/calendar-button';
import { Clock, MapPin, DollarSign, Award, ArrowUpRight, Building } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const opp = await getOpportunityBySlug(slug);
  if (!opp) return { title: 'Opportunity Not Found — Red Sea Monitor' };

  return {
    title: `${opp.title} — Red Sea Monitor Opportunities`,
    description: opp.summary || `Application details, eligibility, and deadline for ${opp.title}.`,
  };
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const opp = await getOpportunityBySlug(slug);

  if (!opp) {
    notFound();
  }

  const deadline = opp.deadline_at ? new Date(opp.deadline_at) : null;
  const isExpired = deadline && deadline < new Date();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Opportunities', href: '/opportunities' },
          { label: opp.title },
        ]}
      />

      <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded font-semibold">
            {opp.kind}
          </span>
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
                {isExpired ? 'Application Closed' : `Deadline: ${deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
              </span>
            </span>
          )}
          {opp.is_demo && <SampleBadge />}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          {opp.title}
        </h1>

        {opp.organization && (
          <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
            <Building className="w-4 h-4 text-stone-500" />
            <span className="font-medium text-stone-900 dark:text-stone-100">{opp.organization.name}</span>
            {opp.organization.website && (
              <a
                href={opp.organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-primary hover:underline ml-2"
              >
                Official Website ↗
              </a>
            )}
          </div>
        )}
      </header>

      {/* Overview & Application Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {opp.amount_text && (
          <div className="border border-stone-200 dark:border-stone-800 bg-card p-4 rounded-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Funding / Stipend
            </span>
            <p className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              {opp.amount_text}
            </p>
          </div>
        )}

        {opp.location_text && (
          <div className="border border-stone-200 dark:border-stone-800 bg-card p-4 rounded-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Location / Modality
            </span>
            <p className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              {opp.location_text} {opp.is_remote && '(Remote Eligible)'}
            </p>
          </div>
        )}

        {deadline && (
          <div className="border border-stone-200 dark:border-stone-800 bg-card p-4 rounded-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Calendar Integration
            </span>
            <div className="pt-0.5">
              <CalendarButton opportunity={opp} />
            </div>
          </div>
        )}
      </div>

      {/* Summary & Eligibility */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-mono text-xs uppercase tracking-wider text-stone-500 font-semibold">
            Opportunity Scope & Objectives
          </h2>
          <div className="prose dark:prose-invert font-serif text-stone-800 dark:text-stone-200 max-w-none text-base leading-relaxed">
            <p className="text-lg leading-relaxed text-stone-900 dark:text-stone-100 font-medium">
              {opp.summary}
            </p>
          </div>
        </div>

        {opp.eligibility && (
          <div className="border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 p-5 rounded-sm space-y-2">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>Eligibility & Academic Prerequisites</span>
            </h3>
            <p className="text-xs font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
              {opp.eligibility}
            </p>
          </div>
        )}
      </div>

      {/* Direct Application CTA */}
      <div className="border border-stone-300 dark:border-stone-800 bg-card p-6 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            Submit Your Application
          </h4>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            Applications are submitted directly through the verified institutional host portal.
          </p>
        </div>

        <a
          href={opp.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 font-sans font-semibold bg-sea-900 text-paper hover:bg-sea-700 dark:bg-paper dark:text-sea-900 px-6 py-2.5 rounded-md text-sm shrink-0"
        >
          <span>Apply on Host Portal</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
        <Link
          href="/opportunities"
          className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
        >
          ← Back to All Opportunities
        </Link>
      </div>
    </div>
  );
}
