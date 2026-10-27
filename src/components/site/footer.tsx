import React from 'react';
import Link from 'next/link';
import { Compass, Rss, ShieldCheck, Award, FileText, Globe } from 'lucide-react';
import { CoordinateTag } from '@/components/ui/coordinate-tag';
import { CountryFlag } from '@/components/ui/country-flag';
import { SEED_COUNTRIES } from '@/lib/seed-data';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-sea-900 text-paper dark:bg-deep-sea border-t border-rule mt-20 transition-colors">
      <div className="max-w-content mx-auto px-4 lg:px-8 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-paper/10">
          {/* Mission & Brand (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-paper text-sea-900 flex items-center justify-center">
                <Compass className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">Red Sea Monitor</span>
            </div>

            <p className="font-sans text-sm text-paper/75 leading-relaxed max-w-sm">
              An independent, English-language editorial and science platform covering the Red Sea basin: the Gulf of Suez, the Gulf of Aqaba and Bab-el-Mandeb. For researchers, divers, journalists and conservation stewards.
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-sand-300">
              <span className="text-[10px] uppercase tracking-wider text-paper/60">Basin Center:</span>
              <CoordinateTag lat={20.0} lng={38.0} className="bg-sea-700/40 text-sand-300 border-sea-500/30" />
            </div>
          </div>

          {/* Navigation Links (8 Cols, 4 sub-columns) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 font-sans text-xs">
            {/* 1. Sections */}
            <div className="space-y-3">
              <h4 className="font-mono uppercase tracking-widest text-sand-300 font-semibold text-[11px]">
                Sections
              </h4>
              <ul className="space-y-2 text-paper/80">
                <li><Link href="/news" className="hover:text-coral-400 transition-colors">Red Sea News</Link></li>
                <li><Link href="/watch" className="hover:text-coral-400 transition-colors">Red Sea Watch</Link></li>
                <li><Link href="/library" className="hover:text-coral-400 transition-colors">Red Sea Library</Link></li>
                <li><Link href="/explorer" className="hover:text-coral-400 transition-colors">Spatial Explorer</Link></li>
                <li><Link href="/opportunities" className="hover:text-coral-400 transition-colors">Opportunities</Link></li>
                <li><Link href="/store" className="hover:text-coral-400 transition-colors">Craft Store</Link></li>
              </ul>
            </div>

            {/* 2. Countries */}
            <div className="space-y-3">
              <h4 className="font-mono uppercase tracking-widest text-sand-300 font-semibold text-[11px]">
                Basin Countries
              </h4>
              <ul className="space-y-2 text-paper/80">
                {SEED_COUNTRIES.map((ctry) => (
                  <li key={ctry.iso2}>
                    <Link
                      href={`/countries/${ctry.iso2.toLowerCase()}`}
                      className="hover:text-coral-400 transition-colors flex items-center gap-1.5"
                    >
                      <CountryFlag iso2={ctry.iso2} name={ctry.name} className="w-3 h-2" />
                      <span>{ctry.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Trust & Standards */}
            <div className="space-y-3">
              <h4 className="font-mono uppercase tracking-widest text-sand-300 font-semibold text-[11px]">
                Trust & Standards
              </h4>
              <ul className="space-y-2 text-paper/80">
                <li><Link href="/about" className="hover:text-coral-400 transition-colors">Mission & Team</Link></li>
                <li><Link href="/editorial-policy" className="hover:text-coral-400 transition-colors">Editorial Standards</Link></li>
                <li><Link href="/data-use" className="hover:text-coral-400 transition-colors">Sighting Data Policy</Link></li>
                <li><Link href="/partners" className="hover:text-coral-400 transition-colors">Institutional Partners</Link></li>
                <li><Link href="/credits" className="hover:text-coral-400 transition-colors font-medium text-sand-300">Image & Data Credits</Link></li>
                <li><Link href="/styleguide" className="hover:text-coral-400 transition-colors">UI Design System</Link></li>
              </ul>
            </div>

            {/* 4. Access & Feeds */}
            <div className="space-y-3">
              <h4 className="font-mono uppercase tracking-widest text-sand-300 font-semibold text-[11px]">
                Access & Feeds
              </h4>
              <ul className="space-y-2 text-paper/80">
                <li>
                  <Link href="/rss.xml" className="flex items-center gap-1.5 hover:text-coral-400 transition-colors">
                    <Rss className="w-3.5 h-3.5 text-coral-500" />
                    <span>RSS 2.0 Feed</span>
                  </Link>
                </li>
                <li><Link href="/sitemap.xml" className="hover:text-coral-400 transition-colors">XML Sitemap</Link></li>
                <li><Link href="/newsletter" className="hover:text-coral-400 transition-colors">Field Dispatch Newsletter</Link></li>
                <li><Link href="/contact" className="hover:text-coral-400 transition-colors">Dispatch Desk</Link></li>
                <li>
                  <Link href="/admin" className="text-coral-400 hover:text-coral-300 font-medium transition-colors">
                    Editor Login (Admin)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-paper/60 font-mono gap-4">
          <p>© {new Date().getFullYear()} Red Sea Monitor. Published under open research principles across all sovereign Red Sea littoral states. Non-commercial scientific citation permitted.</p>
          <div className="flex items-center gap-4">
            <Link href="/credits" className="hover:text-paper transition-colors">Credits</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-paper transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-paper transition-colors">Terms of Use</Link>
            <span>•</span>
            <Link href="/accessibility" className="hover:text-paper transition-colors">WCAG 2.2 AA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
