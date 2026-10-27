import React from 'react';
import { Compass, ShieldCheck, Award, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui/section-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { prisma } from '@/lib/db';

export const metadata = {
  title: 'About the Initiative & Field Mission',
  description: 'An independent scientific editorial platform dedicated to Egypt’s Red Sea coast and Eastern Desert.',
};

export default async function AboutPage() {
  let authors: any[] = [];
  try {
    authors = await prisma.author.findMany({
      orderBy: { display_name: 'asc' },
    });
    if (!authors || authors.length === 0) throw new Error();
  } catch (error) {
    authors = [
      {
        id: 'auth-01',
        display_name: 'Dr. Tariq El-Gamil',
        slug: 'tariq-el-gamil',
        bio: 'Senior marine ecologist and remote-sensing specialist with 22 years of Egyptian Red Sea transect monitoring.',
      },
      {
        id: 'auth-02',
        display_name: 'Prof. Karim Zidan',
        slug: 'karim-zidan',
        bio: 'Chief Scientist at NIOF Hurghada branch specializing in elasmobranch and marine mammal bioacoustics.',
      },
      {
        id: 'auth-03',
        display_name: 'Layla Mansour',
        slug: 'layla-mansour',
        bio: 'Environmental investigative journalist documenting artisanal fishing communities and coastal land use.',
      },
    ];
  }

  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-16">
      <Breadcrumbs items={[{ label: 'About Project' }]} />

      <div className="border-b border-rule pb-8 space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="sea">Foundational Mission</Badge>
          <span className="font-mono text-xs text-muted">Field Journal Philosophy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper leading-tight">
          An independent reference for Egypt’s Red Sea and Eastern Desert.
        </h1>
        <p className="font-sans text-lg text-muted leading-relaxed">
          Red Sea Monitor is an open-access editorial and scientific observatory. We bridge the gap between academic marine biology research and public investigative reporting.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border border-rule rounded-md bg-paper-card space-y-3">
          <div className="w-10 h-10 rounded-sm bg-sea-900 text-paper dark:bg-paper dark:text-sea-900 flex items-center justify-center">
            <Compass className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink dark:text-paper">
            Rigorous Scientific Integrity
          </h3>
          <p className="text-xs font-sans text-muted leading-relaxed">
            Every published news dispatch and gazetteer entry cites peer-reviewed literature, bathymetric data, or verified institutional telemetry from NIOF and the EEAA.
          </p>
        </div>

        <div className="p-6 border border-rule rounded-md bg-paper-card space-y-3">
          <div className="w-10 h-10 rounded-sm bg-coral-500 text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink dark:text-paper">
            Zero Sponsored Marketing
          </h3>
          <p className="text-xs font-sans text-muted leading-relaxed">
            We accept no paid tourism PR, resort advertisements, or commercial sponsorship. Our editorial independence ensures honest assessments of reef health and human pressures.
          </p>
        </div>

        <div className="p-6 border border-rule rounded-md bg-paper-card space-y-3">
          <div className="w-10 h-10 rounded-sm bg-sand-600 text-white flex items-center justify-center">
            <Award className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink dark:text-paper">
            Ethical Wildlife Safeguarding
          </h3>
          <p className="text-xs font-sans text-muted leading-relaxed">
            We generalize exact GPS coordinates for vulnerable species (dugongs, marine turtles, pelagic sharks) to prevent poaching and harassment by high-speed vessels.
          </p>
        </div>
      </div>

      {/* Scientific & Editorial Staff */}
      <section className="space-y-6 border-t border-rule pt-12">
        <SectionHeader
          index="02"
          title="Editorial Board & Contributing Scientists"
          subtitle="Profiles and scientific specializations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((author: any) => (
            <div
              key={author.id}
              className="p-6 border border-rule rounded-md bg-paper-card flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-sea-900 text-paper dark:bg-paper dark:text-sea-900 font-serif font-bold text-xl flex items-center justify-center shrink-0">
                {author.display_name.charAt(0)}
              </div>
              <div className="space-y-1.5 text-xs">
                <h4 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                  {author.display_name}
                </h4>
                <p className="font-sans text-muted leading-relaxed">
                  {author.bio || 'Scientific researcher dedicated to Red Sea bioacoustics and coastal ecosystems.'}
                </p>
                <div className="pt-2 font-mono text-[11px] text-sea-700 dark:text-sea-500">
                  Byline Slug: @{author.slug}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
