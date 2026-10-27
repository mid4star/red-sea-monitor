import React from 'react';
import Link from 'next/link';
import { Camera, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ContributeSection: React.FC = () => {
  return (
    <section
      id="section-contribute"
      data-tone="dark"
      aria-labelledby="heading-contribute"
      className="w-full bg-sea-700 text-paper py-14 md:py-20 border-y border-sea-500/30 transition-colors"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sea-900/60 text-paper/90 border border-paper/20 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-coral-400" />
            <span>Open Civic Field Network</span>
          </div>

          <h2 id="heading-contribute" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-paper leading-tight">
            Have a story, source, or field observation?
          </h2>

          <p className="font-sans text-base sm:text-lg text-paper/90 leading-relaxed max-w-2xl mx-auto">
            The Red Sea Monitor welcomes verified field dispatches, photographic logs, and investigative documents from marine scientists, artisanal fishermen, and coastal stewards across all 7 basin nations.
          </p>

          {/* Action buttons: Min 48px touch targets */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/watch/submit">
              <Button
                variant="coral"
                size="lg"
                className="min-h-[48px] px-6 text-base font-medium shadow-md gap-2"
              >
                <Camera className="w-5 h-5" />
                <span>Share a Sighting</span>
              </Button>
            </Link>
            <a href="mailto:editor@redseamonitor.org">
              <Button
                variant="outline"
                size="lg"
                className="min-h-[48px] px-6 text-base font-medium border-paper/40 text-paper hover:bg-paper/10 gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send an Editorial Tip</span>
              </Button>
            </a>
          </div>

          {/* Trust and verification workflow notice */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-paper/70">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Every submission undergoes rigorous scientific and EXIF geo-validation prior to public indexing.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
