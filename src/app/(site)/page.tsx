import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { TickerSection } from '@/components/home/ticker-section';
import { BasinGlanceSection } from '@/components/home/basin-glance-section';
import { NewsSection } from '@/components/home/news-section';
import { WatchSection } from '@/components/home/watch-section';
import { LibrarySection } from '@/components/home/library-section';
import { StoreSection } from '@/components/home/store-section';
import { OpportunitiesSection } from '@/components/home/opportunities-section';
import { ExplorerSection } from '@/components/home/explorer-section';
import { ContributeSection } from '@/components/home/contribute-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { MobileChapterPill } from '@/components/home/mobile-chapter-pill';
import { WaveDivider, ContourDivider } from '@/components/art/illustrations';

export default function HomePage() {
  return (
    <div className="w-full relative pb-24 md:pb-0">
      {/* ------------------------------------------------------------- */}
      {/* Band 0: First-Visit Hero: Basin-Wide Field Journal Masthead */}
      {/* ------------------------------------------------------------- */}
      <HeroSection />

      {/* ------------------------------------------------------------- */}
      {/* Band 0b: Field Wires Ticker Strip */}
      {/* ------------------------------------------------------------- */}
      <TickerSection />

      {/* ------------------------------------------------------------- */}
      {/* Band 1: The Basin at a Glance (Transboundary Overview & Map) */}
      {/* ------------------------------------------------------------- */}
      <div id="section-glance">
        <BasinGlanceSection />
      </div>

      {/* Transition: sea-100 to paper */}
      <div className="bg-sea-100/40 dark:bg-sea-900/20 text-paper dark:text-deep-sea">
        <WaveDivider />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Band 2: 01 / Red Sea News & Field Dispatches */}
      {/* ------------------------------------------------------------- */}
      <NewsSection />

      {/* Transition: paper to sea-900 */}
      <div className="bg-paper dark:bg-deep-sea text-sea-900">
        <WaveDivider />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Band 3: 02 / Red Sea Watch: Citizen Field Telemetry */}
      {/* ------------------------------------------------------------- */}
      <WatchSection />

      {/* Transition: sea-900 to paper */}
      <div className="bg-sea-900 text-paper dark:text-deep-sea">
        <WaveDivider />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Band 4: 03 / Red Sea Library & Open Archive */}
      {/* ------------------------------------------------------------- */}
      <LibrarySection />

      {/* Transition: paper to sand-100 */}
      <div className="bg-paper dark:bg-deep-sea text-rule">
        <ContourDivider />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Band 5: 04 / Red Sea Artisanal Store & Heritage Craft */}
      {/* ------------------------------------------------------------- */}
      <StoreSection />

      {/* Transition: sand-100 to sea-900 */}
      <div className="bg-sand-100 dark:bg-[#12191C] text-sea-900">
        <WaveDivider />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Band 6: 05 / Red Sea Opportunities & Fieldwork */}
      {/* ------------------------------------------------------------- */}
      <OpportunitiesSection />

      {/* Transition: sea-900 to sand-100 */}
      <div className="bg-sea-900 text-sand-100 dark:text-paper-card">
        <WaveDivider />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Band 7: 06 / Red Sea Atlas & Biogeography Explorer */}
      {/* ------------------------------------------------------------- */}
      <ExplorerSection />

      {/* Transition: sand-100 to sea-700 */}
      <div className="bg-sand-100 dark:bg-paper-card text-sea-700">
        <WaveDivider />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Band 8: Contribute Banner (Open Civic Field Network) */}
      {/* ------------------------------------------------------------- */}
      <ContributeSection />

      {/* Transition: sea-700 to paper */}
      <div className="bg-sea-700 text-paper dark:text-deep-sea">
        <WaveDivider />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Band 9: Newsletter & Bi-Weekly Digest */}
      {/* ------------------------------------------------------------- */}
      <NewsletterSection />

      {/* Transition: paper to sea-900 (Footer) */}
      <div className="bg-paper dark:bg-deep-sea text-sea-900">
        <WaveDivider />
      </div>

      {/* Mobile Sticky Chapter Pill & Quick Sighting Action */}
      <MobileChapterPill />
    </div>
  );
}
