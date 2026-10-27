'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import clsx from 'clsx';

interface Chapter {
  id: string;
  number: string;
  label: string;
  tone: 'light' | 'dark';
}

const CHAPTERS: Chapter[] = [
  { id: 'section-hero', number: '00', label: 'Overview', tone: 'dark' },
  { id: 'section-glance', number: '00b', label: 'Basin Map', tone: 'light' },
  { id: 'section-news', number: '01', label: 'News', tone: 'light' },
  { id: 'section-watch', number: '02', label: 'Watch', tone: 'dark' },
  { id: 'section-library', number: '03', label: 'Library', tone: 'light' },
  { id: 'section-store', number: '04', label: 'Store', tone: 'light' },
  { id: 'section-opportunities', number: '05', label: 'Opportunities', tone: 'dark' },
  { id: 'section-explorer', number: '06', label: 'Explorer', tone: 'light' },
  { id: 'section-contribute', number: '07', label: 'Contribute', tone: 'dark' },
];

export const MobileChapterPill: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<Chapter>(CHAPTERS[0]);
  const [showPill, setShowPill] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isShareFormInView, setIsShareFormInView] = useState(false);

  useEffect(() => {
    // 1. Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 2. Chapter tracking observer
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = CHAPTERS.find((c) => c.id === entry.target.id);
            if (found) {
              setActiveChapter(found);
              // Only show once scrolled past hero
              setShowPill(found.id !== 'section-hero');
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
      if (el) chapterObserver.observe(el);
    });

    // 3. Share form observer to hide camera button when form is on screen
    const formEl = document.querySelector('form[action="/watch/submit"]');
    let formObserver: IntersectionObserver | null = null;
    if (formEl) {
      formObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsShareFormInView(entry.isIntersecting);
          });
        },
        { threshold: 0.1 }
      );
      formObserver.observe(formEl);
    }

    // 4. Keyboard / input focus listener to hide floating camera button
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      chapterObserver.disconnect();
      if (formObserver) formObserver.disconnect();
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  if (!showPill) return null;

  const isDarkSurface = activeChapter.tone === 'dark';
  const shouldHideCameraButton =
    isInputFocused || isShareFormInView || activeChapter.id === 'section-contribute';

  return (
    <div
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-4 right-4 z-40 md:hidden flex items-center justify-between pointer-events-none gap-3"
      aria-label="Mobile Navigation Bar"
    >
      {/* Chapter Indicator Pill (Solid Opaque, No Transparency, Text >= 13px) */}
      <div
        className={clsx(
          'pointer-events-auto px-4 py-2.5 rounded-full flex items-center gap-2 border shadow-lg transition-colors duration-200 select-none',
          isDarkSurface
            ? 'bg-sea-900 text-paper border-sea-700/80 shadow-sea-950/40'
            : 'bg-paper dark:bg-deep-sea text-ink dark:text-paper border-rule shadow-black/10'
        )}
      >
        <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse shrink-0" />
        <span
          className={clsx(
            'font-mono font-bold text-[13px]',
            isDarkSurface ? 'text-coral-300' : 'text-coral-600 dark:text-coral-400'
          )}
        >
          {activeChapter.number}
        </span>
        <span
          className={clsx(
            'text-[13px] font-mono',
            isDarkSurface ? 'text-paper/40' : 'text-muted/40'
          )}
        >
          /
        </span>
        <span className="font-sans font-semibold text-[13px] tracking-wide whitespace-nowrap">
          {activeChapter.label}
        </span>
      </div>

      {/* Floating Quick Sighting Button (Exact 48px, 12px gap, hidden on focus/form) */}
      <div className="pointer-events-auto">
        <Link
          href="/watch/submit"
          className={clsx(
            'w-12 h-12 min-w-[48px] min-h-[48px] bg-coral-500 hover:bg-coral-600 text-white rounded-full flex items-center justify-center shadow-xl active:scale-95 border border-white/20 transition-all duration-200',
            shouldHideCameraButton
              ? 'opacity-0 pointer-events-none scale-75 translate-y-4'
              : 'opacity-100 scale-100 translate-y-0'
          )}
          aria-label="Share a field sighting"
        >
          <Camera className="w-5 h-5" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
};
