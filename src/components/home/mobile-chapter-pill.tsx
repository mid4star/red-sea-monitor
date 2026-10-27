'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Camera, ChevronUp } from 'lucide-react';

interface Chapter {
  id: string;
  number: string;
  label: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'section-hero', number: '00', label: 'Overview' },
  { id: 'section-glance', number: '00b', label: 'Basin Map' },
  { id: 'section-news', number: '01', label: 'News' },
  { id: 'section-watch', number: '02', label: 'Watch' },
  { id: 'section-library', number: '03', label: 'Library' },
  { id: 'section-store', number: '04', label: 'Store' },
  { id: 'section-opportunities', number: '05', label: 'Opportunities' },
  { id: 'section-explorer', number: '06', label: 'Explorer' },
  { id: 'section-contribute', number: '07', label: 'Contribute' },
];

export const MobileChapterPill: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<Chapter>(CHAPTERS[0]);
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = CHAPTERS.find((c) => c.id === entry.target.id);
            if (found) {
              setActiveChapter(found);
              // Only show once scrolled past hero
              if (found.id !== 'section-hero') {
                setShowPill(true);
              } else {
                setShowPill(false);
              }
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    );

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!showPill) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex items-center justify-between pointer-events-none">
      {/* Chapter Indicator Pill */}
      <div className="pointer-events-auto bg-sea-900/90 dark:bg-deep-sea/95 backdrop-blur-md text-paper border border-sea-700/60 shadow-lg px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-mono transition-all duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-pulse" />
        <span className="text-coral-500 font-bold">{activeChapter.number}</span>
        <span className="text-paper/40">/</span>
        <span className="font-sans font-medium text-paper tracking-wide">{activeChapter.label}</span>
      </div>

      {/* Floating Quick Sighting Button */}
      <Link
        href="/watch/submit"
        className="pointer-events-auto min-h-[44px] min-w-[44px] bg-coral-500 hover:bg-coral-600 text-white rounded-full p-2.5 shadow-xl flex items-center justify-center transition-transform active:scale-95 border border-white/20"
        aria-label="Share a sighting"
      >
        <Camera className="w-5 h-5" />
      </Link>
    </div>
  );
};
