'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { RegionSelector } from '@/components/site/region-selector';

const NAV_LINKS = [
  { href: '/news', label: 'News' },
  { href: '/watch', label: 'Watch' },
  { href: '/library', label: 'Library' },
  { href: '/explorer', label: 'Explorer' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/store', label: 'Store' },
];

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode from document or prefers-color-scheme
    const isDarkMode = document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/95 dark:bg-deep-sea/95 backdrop-blur-md border-b border-rule transition-colors">
      {/* Top Field Journal Dispatch Strip */}
      <div className="hidden md:flex items-center justify-between px-4 lg:px-8 py-1.5 bg-paper-card dark:bg-sea-900/40 border-b border-rule/60 text-xs font-mono text-muted">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sea-700 dark:text-sea-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#43A047] animate-pulse" />
            <span>FIELD DISPATCH: RED SEA REGION</span>
          </span>
          <span className="text-rule">•</span>
          <CoordinateTag lat={27.2579} lng={33.8116} />
        </div>

        <div className="flex items-center gap-3">
          <RegionSelector />
          <span className="text-rule">•</span>
          <Link href="/editorial-policy" className="hover:text-ink dark:hover:text-paper transition-colors">
            Editorial Standard & Verification
          </Link>
          <span className="text-rule">•</span>
          <Link href="/contact" className="hover:text-ink dark:hover:text-paper transition-colors">
            Dispatch Desk
          </Link>
        </div>
      </div>

      {/* Main Masthead Navigation */}
      <div className="max-w-content mx-auto px-4 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Brand / Masthead Logo */}
        <Link href="/" className="group flex items-center gap-3 focus:outline-none">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-sm bg-sea-900 dark:bg-paper text-paper dark:text-sea-900 flex items-center justify-center transition-transform group-hover:scale-105">
            <Compass className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="font-serif text-lg md:text-2xl font-bold tracking-tight text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-500 transition-colors block leading-tight">
              Red Sea Monitor
            </span>
            <span className="hidden sm:block font-mono text-[10px] tracking-wider uppercase text-muted">
              Editorial & Science Platform
            </span>
          </div>
        </Link>

        {/* Desktop Global Navigation (6 items max) */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-sea-700 dark:text-sea-500 font-semibold'
                    : 'text-ink/80 dark:text-paper/80 hover:text-ink dark:hover:text-paper'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sea-700 dark:bg-sea-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <Link
            href="/search"
            aria-label="Search articles, species, places"
            className="p-2 text-ink/80 dark:text-paper/80 hover:text-ink dark:hover:text-paper rounded-md hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 text-ink/80 dark:text-paper/80 hover:text-ink dark:hover:text-paper rounded-md hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isDark ? <Sun className="w-4 h-4" strokeWidth={1.5} /> : <Moon className="w-4 h-4" strokeWidth={1.5} />}
          </button>

          {/* Primary CTA: Share a Sighting */}
          <Link href="/watch?modal=submit" className="hidden sm:inline-flex">
            <Button variant="coral" size="sm" className="gap-1.5 text-xs font-semibold">
              <PlusCircle className="w-4 h-4" />
              <span>Share a Sighting</span>
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 text-ink dark:text-paper rounded-md hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-paper dark:bg-deep-sea z-50 p-6 flex flex-col justify-between overflow-y-auto border-t border-rule animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Field Sections</span>
              <CoordinateTag lat={27.2579} lng={33.8116} />
            </div>

            {/* Basin Country Focus Selector */}
            <RegionSelector variant="drawer" />

            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-serif text-2xl py-2 transition-colors ${
                      isActive
                        ? 'text-sea-700 dark:text-sea-500 font-bold'
                        : 'text-ink dark:text-paper hover:text-sea-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-rule space-y-4">
            <Link href="/watch?modal=submit" className="w-full block">
              <Button variant="coral" size="lg" className="w-full gap-2">
                <PlusCircle className="w-5 h-5" />
                <span>Share a Sighting</span>
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-muted pt-2">
              <Link href="/about" className="py-2 hover:text-ink dark:hover:text-paper">About Project</Link>
              <Link href="/editorial-policy" className="py-2 hover:text-ink dark:hover:text-paper">Editorial Policy</Link>
              <Link href="/contact" className="py-2 hover:text-ink dark:hover:text-paper">Dispatch Desk</Link>
              <Link href="/styleguide" className="py-2 hover:text-ink dark:hover:text-paper">Design System</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
