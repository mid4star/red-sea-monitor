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
import { ActiveBasinCoordinates } from '@/components/site/active-coordinates';
import clsx from 'clsx';

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
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode from document or prefers-color-scheme
    const isDarkMode =
      document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // IntersectionObserver & Scroll listener to detect dark sections under header
  useEffect(() => {
    const checkDarkSection = () => {
      const darkSections = document.querySelectorAll('[data-tone="dark"]');
      let foundDark = false;
      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Check if the sticky header zone (0 to 70px) overlaps this dark section
        if (rect.top <= 70 && rect.bottom >= 70) {
          foundDark = true;
        }
      });
      setIsOverDark(foundDark);
    };

    window.addEventListener('scroll', checkDarkSection, { passive: true });
    window.addEventListener('resize', checkDarkSection, { passive: true });
    checkDarkSection();

    return () => {
      window.removeEventListener('scroll', checkDarkSection);
      window.removeEventListener('resize', checkDarkSection);
    };
  }, [pathname]);

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

  const isDarkVariant = isDark || isOverDark;

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 w-full 1px border-b transition-colors duration-200 select-none',
        isDarkVariant
          ? 'bg-sea-900 border-sea-800 text-paper shadow-sm'
          : 'bg-paper dark:bg-deep-sea border-rule text-ink dark:text-paper shadow-xs'
      )}
    >
      {/* Top Field Journal Dispatch Strip */}
      <div
        className={clsx(
          'hidden md:flex items-center justify-between px-4 lg:px-8 py-1.5 border-b text-xs font-mono transition-colors duration-200',
          isDarkVariant
            ? 'bg-sea-950 border-sea-800 text-paper/75'
            : 'bg-paper-card dark:bg-sea-900/40 border-rule/60 text-muted'
        )}
      >
        <div className="flex items-center gap-4">
          <span
            className={clsx(
              'flex items-center gap-1.5 font-medium',
              isDarkVariant ? 'text-coral-300' : 'text-sea-700 dark:text-sea-400'
            )}
          >
            <span className="w-2 h-2 rounded-full bg-[#43A047] animate-pulse" />
            <span>FIELD DISPATCH: RED SEA BASIN</span>
          </span>
          <span className={isDarkVariant ? 'text-paper/20' : 'text-rule'}>•</span>
          <ActiveBasinCoordinates />
        </div>

        <div className="flex items-center gap-3">
          <RegionSelector />
          <span className={isDarkVariant ? 'text-paper/20' : 'text-rule'}>•</span>
          <Link
            href="/editorial-policy"
            className={clsx(
              'transition-colors',
              isDarkVariant ? 'text-paper/75 hover:text-paper' : 'hover:text-ink dark:hover:text-paper'
            )}
          >
            Editorial Standards
          </Link>
          <span className={isDarkVariant ? 'text-paper/20' : 'text-rule'}>•</span>
          <Link
            href="/contact"
            className={clsx(
              'transition-colors',
              isDarkVariant ? 'text-paper/75 hover:text-paper' : 'hover:text-ink dark:hover:text-paper'
            )}
          >
            Dispatch Desk
          </Link>
        </div>
      </div>

      {/* Main Masthead Navigation */}
      <div className="max-w-content mx-auto px-4 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Brand / Masthead Logo */}
        <Link href="/" className="group flex items-center gap-3 focus:outline-none">
          <div
            className={clsx(
              'w-9 h-9 md:w-10 md:h-10 rounded-sm flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs',
              isDarkVariant
                ? 'bg-paper text-sea-900'
                : 'bg-sea-900 dark:bg-paper text-paper dark:text-sea-900'
            )}
          >
            <Compass className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
          </div>
          <div>
            <span
              className={clsx(
                'font-serif text-lg md:text-2xl font-bold tracking-tight block leading-tight transition-colors duration-200',
                isDarkVariant
                  ? 'text-paper group-hover:text-coral-300'
                  : 'text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-400'
              )}
            >
              Red Sea Monitor
            </span>
            <span
              className={clsx(
                'hidden sm:block font-mono text-[10px] tracking-wider uppercase',
                isDarkVariant ? 'text-paper/60' : 'text-muted'
              )}
            >
              Editorial & Science Platform
            </span>
          </div>
        </Link>

        {/* Desktop Global Navigation (6 items) */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-sans text-sm font-medium transition-colors relative py-1',
                  isDarkVariant
                    ? isActive
                      ? 'text-coral-300 font-semibold'
                      : 'text-paper/85 hover:text-coral-200'
                    : isActive
                    ? 'text-sea-700 dark:text-sea-400 font-semibold'
                    : 'text-ink/80 dark:text-paper/80 hover:text-ink dark:hover:text-paper'
                )}
              >
                {link.label}
                {isActive && (
                  <span
                    className={clsx(
                      'absolute bottom-0 left-0 w-full h-0.5 rounded-full',
                      isDarkVariant ? 'bg-coral-400' : 'bg-sea-700 dark:bg-sea-400'
                    )}
                  />
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
            className={clsx(
              'p-2 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
              isDarkVariant
                ? 'text-paper/85 hover:text-paper hover:bg-paper/10'
                : 'text-ink/80 dark:text-paper/80 hover:text-ink dark:hover:text-paper hover:bg-ink/5 dark:hover:bg-paper/5'
            )}
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className={clsx(
              'p-2 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
              isDarkVariant
                ? 'text-paper/85 hover:text-paper hover:bg-paper/10'
                : 'text-ink/80 dark:text-paper/80 hover:text-ink dark:hover:text-paper hover:bg-ink/5 dark:hover:bg-paper/5'
            )}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
            ) : (
              <Moon className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>

          {/* Primary CTA: Share a Sighting */}
          <Link href="/watch?modal=submit" className="hidden sm:inline-flex">
            <Button
              variant="coral"
              size="sm"
              className="gap-1.5 text-xs font-semibold min-h-[38px] px-3.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share Sighting</span>
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className={clsx(
              'lg:hidden p-2 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
              isDarkVariant
                ? 'text-paper hover:bg-paper/10'
                : 'text-ink dark:text-paper hover:bg-ink/5 dark:hover:bg-paper/5'
            )}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Sheet (Solid opaque background) */}
      {mobileMenuOpen && (
        <div
          className={clsx(
            'lg:hidden fixed inset-x-0 top-[65px] bottom-0 z-50 p-6 flex flex-col justify-between overflow-y-auto border-t transition-colors duration-200 animate-in fade-in',
            isDarkVariant
              ? 'bg-sea-900 border-sea-800 text-paper'
              : 'bg-paper dark:bg-deep-sea border-rule text-ink dark:text-paper'
          )}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-rule/50">
              <span
                className={clsx(
                  'font-mono text-xs uppercase tracking-wider',
                  isDarkVariant ? 'text-paper/60' : 'text-muted'
                )}
              >
                Basin Sections
              </span>
              <ActiveBasinCoordinates />
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
                    className={clsx(
                      'font-serif text-2xl py-2 transition-colors',
                      isDarkVariant
                        ? isActive
                          ? 'text-coral-300 font-bold'
                          : 'text-paper hover:text-coral-200'
                        : isActive
                        ? 'text-sea-700 dark:text-sea-400 font-bold'
                        : 'text-ink dark:text-paper hover:text-sea-700'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div
            className={clsx(
              'pt-6 border-t space-y-4',
              isDarkVariant ? 'border-sea-800' : 'border-rule'
            )}
          >
            <Link href="/watch?modal=submit" className="w-full block">
              <Button variant="coral" size="lg" className="w-full gap-2 min-h-[48px]">
                <PlusCircle className="w-5 h-5" />
                <span>Share a Sighting</span>
              </Button>
            </Link>

            <div
              className={clsx(
                'grid grid-cols-2 gap-2 text-xs font-mono pt-2',
                isDarkVariant ? 'text-paper/60' : 'text-muted'
              )}
            >
              <Link href="/about" className="py-2 hover:underline">
                About Project
              </Link>
              <Link href="/editorial-policy" className="py-2 hover:underline">
                Editorial Policy
              </Link>
              <Link href="/contact" className="py-2 hover:underline">
                Dispatch Desk
              </Link>
              <Link href="/credits" className="py-2 hover:underline">
                Media Credits
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
