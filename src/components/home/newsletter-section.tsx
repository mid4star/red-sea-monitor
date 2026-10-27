import React from 'react';
import { Mail, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NewsletterSection: React.FC = () => {
  return (
    <section
      id="section-newsletter"
      aria-labelledby="heading-newsletter"
      className="w-full bg-paper dark:bg-deep-sea py-14 md:py-20 transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted font-semibold">
            <Mail className="w-4 h-4 text-coral-500" />
            <span>Field Dispatches & Bi-Weekly Digest</span>
          </div>

          <h2 id="heading-newsletter" className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink dark:text-paper leading-tight">
            Direct from the Rift: The Red Sea Dispatch
          </h2>

          <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
            Delivering peer-reviewed marine ecology findings, conservation policy analyses, and archival field monographs straight to your inbox every alternate Thursday.
          </p>

          <form onSubmit={undefined} className="space-y-4 pt-2">
            {/* Topic checkboxes */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 text-xs font-sans text-muted pb-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="topic-news"
                  defaultChecked
                  className="rounded border-rule text-coral-500 focus:ring-coral-500"
                />
                <span>Field News & Science</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="topic-grants"
                  defaultChecked
                  className="rounded border-rule text-coral-500 focus:ring-coral-500"
                />
                <span>Grants & Fellowships</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="topic-sightings"
                  defaultChecked
                  className="rounded border-rule text-coral-500 focus:ring-coral-500"
                />
                <span>Sightings Digest</span>
              </label>
            </div>

            {/* Email input and submit */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="researcher@institute.org"
                required
                className="px-4 py-3 rounded-md bg-paper-card dark:bg-paper-elevated border border-rule text-sm text-ink dark:text-paper placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-coral-500 flex-1 min-h-[48px]"
              />
              <Button
                type="button"
                variant="coral"
                size="lg"
                className="min-h-[48px] px-6 text-sm font-medium shrink-0 shadow-sm"
              >
                <span>Subscribe</span>
              </Button>
            </div>

            <p className="text-[11px] font-mono text-muted flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero telemetry tracking. Unsubscribe at any time with one click.</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
