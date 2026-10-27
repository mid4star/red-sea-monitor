import React from 'react';
import Link from 'next/link';
import { Building2, ExternalLink, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { prisma } from '@/lib/db';

export const metadata = {
  title: 'Institutional Partners & Scientific Affiliations',
  description: 'Academic, conservation, and government research bodies collaborating with Red Sea Monitor.',
};

export default async function PartnersPage() {
  let organizations: any[] = [];
  try {
    organizations = await prisma.organization.findMany({
      orderBy: { name: 'asc' },
    });
    if (!organizations || organizations.length === 0) throw new Error();
  } catch (error) {
    organizations = [
      {
        id: 'org-01',
        name: 'National Institute of Oceanography and Fisheries (NIOF)',
        type: 'GOVERNMENT',
        country: 'Egypt',
        website: 'https://niof.sci.eg',
        description: 'Egypt’s national oceanographic scientific authority founded in 1918 with marine stations in Hurghada and Suez.',
      },
      {
        id: 'org-02',
        name: 'Nature Conservation Sector (EEAA)',
        type: 'GOVERNMENT',
        country: 'Egypt',
        website: 'https://www.eeaa.gov.eg',
        description: 'Ministry of Environment department overseeing national parks, rangers, and marine protected areas.',
      },
    ];
  }

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Institutional Partners' }]} />

      <div className="border-b border-rule pb-8 space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="sea">Collaborative Network</Badge>
          <span className="font-mono text-xs text-muted">Scientific Alliances</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper leading-tight">
          Institutional Partners & Field Research Bodies
        </h1>
        <p className="font-sans text-lg text-muted leading-relaxed">
          We collaborate with Egyptian governmental authorities, universities, and marine research institutes to share data and coordinate ecological telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {organizations.map((org: any) => (
          <div
            key={org.id}
            className="p-6 border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="neutral">{org.type}</Badge>
                <span className="font-mono text-xs text-muted">{org.country}</span>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-ink dark:text-paper">
                {org.name}
              </h3>

              <p className="font-sans text-xs text-muted leading-relaxed">
                {org.description || 'Egyptian marine and conservation research organization providing scientific peer review and telemetry monitoring.'}
              </p>
            </div>

            {org.website && (
              <div className="pt-4 border-t border-rule/50">
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-sea-700 dark:text-sea-500 hover:underline font-semibold"
                >
                  <span>Visit Official Institutional Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
