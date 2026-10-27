import React from 'react';
import Link from 'next/link';
import { Award, GraduationCap, Megaphone, Calendar, ArrowUpRight, Users, CheckCircle2, PlusCircle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getOpportunities } from '@/server/queries/opportunities';

interface OpportunityCardData {
  id: string;
  kindLabel: string;
  kindIcon: React.ElementType;
  title: string;
  organization: string;
  location: string;
  deadlineDaysLeft: number;
  deadlineFormatted: string;
  summary: string;
  href: string;
}

const FEATURED_OPPORTUNITIES: OpportunityCardData[] = [
  {
    id: 'opp-1',
    kindLabel: 'Research Grant',
    kindIcon: Award,
    title: 'Coral Thermal Refugia Early-Career Research Grant',
    organization: 'Sample Regional Marine Initiative',
    location: 'Regional Basin (Gulf of Aqaba & Northern Red Sea)',
    deadlineDaysLeft: 12,
    deadlineFormatted: 'Nov 8, 2026',
    summary: 'Funding field expeditions decoding genomic markers of high-temperature resilience in Acropora and Porites colonies.',
    href: '/opportunities/opp-grant-coral-refugia',
  },
  {
    id: 'opp-2',
    kindLabel: 'Training Fellowship',
    kindIcon: GraduationCap,
    title: 'Marine Protected Area Field Training Fellowship',
    organization: 'Sample Protected Areas Secretariat',
    location: 'Port Sudan & Sanganeb Marine Park',
    deadlineDaysLeft: 28,
    deadlineFormatted: 'Nov 24, 2026',
    summary: 'Practical residency focusing on coral reef transect methodologies, benthos photogrammetry, and telemetry.',
    href: '/opportunities/opp-fellowship-mpa-port-sudan',
  },
  {
    id: 'opp-3',
    kindLabel: 'Call for Proposals',
    kindIcon: Megaphone,
    title: 'Regional Reef Soundscape Acoustic Recording Call',
    organization: 'Sample Ocean Acoustics Project',
    location: 'Farasan Archipelago & Dahlak Shelf',
    deadlineDaysLeft: 41,
    deadlineFormatted: 'Dec 7, 2026',
    summary: 'Submissions for hydrophone baseline audio datasets characterizing twilight fish choruses and artisanal vessel acoustic profiles.',
    href: '/opportunities/opp-call-soundscapes',
  },
];

export async function OpportunitiesSection() {
  return (
    <section
      id="section-opportunities"
      data-tone="dark"
      aria-labelledby="heading-opportunities"
      className="w-full bg-sea-900 text-paper py-16 md:py-24 border-y border-sea-700/60 transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          index="05"
          tone="dark"
          title="Red Sea Opportunities & Fieldwork"
          subtitle="Grants, fellowships, field training, and civic science calls across all 7 littoral states"
          href="/opportunities"
          actionText="View all opportunities"
        />

        {/* 3 Opportunity Cards: Mobile horizontal scroll-snap / Desktop 3-col grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 md:grid md:grid-cols-3 md:overflow-visible">
          {FEATURED_OPPORTUNITIES.map((opp) => {
            const Icon = opp.kindIcon;
            return (
              <div
                key={opp.id}
                className="min-w-[82vw] sm:min-w-[320px] md:min-w-0 snap-center p-6 rounded-md bg-paper/5 backdrop-blur-sm border border-paper/15 hover:border-coral-500/50 flex flex-col justify-between space-y-6 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-coral-400 font-semibold uppercase">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{opp.kindLabel}</span>
                      </span>
                      <span className="text-[10px] font-mono bg-paper/20 px-1.5 py-0.2 rounded text-paper">
                        SAMPLE
                      </span>
                    </div>
                    {/* Deadline Stub */}
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded bg-coral-500/20 text-coral-300 border border-coral-500/30">
                      <Calendar className="w-3 h-3" />
                      <span>{opp.deadlineDaysLeft} days left</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-paper leading-snug">
                      {opp.title}
                    </h3>
                    <div className="mt-2 text-xs font-mono text-paper/70 space-y-0.5">
                      <p>Org: {opp.organization}</p>
                      <p>Zone: {opp.location}</p>
                    </div>
                    <p className="mt-3 text-xs text-paper/80 font-sans leading-relaxed line-clamp-3">
                      {opp.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-paper/10 flex items-center justify-between text-xs font-sans">
                  <span className="text-paper/60 font-mono text-[11px]">Due {opp.deadlineFormatted}</span>
                  <Link
                    href={opp.href}
                    className="text-coral-400 hover:text-coral-300 flex items-center gap-1 font-medium group"
                  >
                    <span>View guidelines</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volunteers Sub-Block: 3 Numbered Steps */}
        <div className="p-6 md:p-8 rounded-md bg-paper/5 border border-paper/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-coral-400 font-semibold">
                <Users className="w-4 h-4" />
                <span>Field Volunteer Network</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-paper">
                Join the Citizen Field Team in 3 Steps
              </h3>
            </div>
            <Link
              href="/opportunities#volunteer"
              className="text-coral-400 hover:underline flex items-center gap-1 text-xs font-sans font-medium"
            >
              <span>Suggest an opportunity or programme</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2 border-l border-paper/20 pl-4">
              <span className="font-mono text-xs font-bold text-coral-400">01 / Selection</span>
              <h4 className="font-serif text-base font-bold text-paper">Choose a Programme</h4>
              <p className="text-xs text-paper/75 font-sans leading-relaxed">
                Select between coastal transects, mangrove seed nurseries, acoustic monitoring, or community catch logs across 7 basin nations.
              </p>
            </div>

            <div className="space-y-2 border-l border-paper/20 pl-4">
              <span className="font-mono text-xs font-bold text-coral-400">02 / Training</span>
              <h4 className="font-serif text-base font-bold text-paper">Prepare & Remote Training</h4>
              <p className="text-xs text-paper/75 font-sans leading-relaxed">
                Complete self-paced species identification keys, EXIF geo-tagging guidelines, and reef safety & ethics certification.
              </p>
            </div>

            <div className="space-y-2 border-l border-paper/20 pl-4">
              <span className="font-mono text-xs font-bold text-coral-400">03 / Deployment</span>
              <h4 className="font-serif text-base font-bold text-paper">Join the Field Team</h4>
              <p className="text-xs text-paper/75 font-sans leading-relaxed">
                Deploy alongside certified scientific partners and upload telemetry records directly to the Red Sea Monitor archive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
