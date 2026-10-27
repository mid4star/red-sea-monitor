import React from 'react';
import { Mail, MessageSquare, Compass, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactForm } from './contact-form';

export const metadata = {
  title: 'Contact Editorial Desk & Submit Field Tips',
  description: 'Reach our editorial team, report corrections, or submit scientific leads on Red Sea marine conservation.',
};

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact & Field Inquiries' }]} />

      <div className="border-b border-rule pb-8 space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="coral">Editorial Inquiries</Badge>
          <span className="font-mono text-xs text-muted">Direct Desk Dispatch</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-paper leading-tight">
          Contact the Editorial Board
        </h1>
        <p className="font-sans text-lg text-muted leading-relaxed">
          Submit corrections, suggest original field investigative topics, or request open-access research telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Contact Form (7 Cols) */}
        <div className="md:col-span-7">
          <ContactForm />
        </div>

        {/* Bureau Info (5 Cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 border border-rule rounded-md bg-paper-card space-y-3">
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">
              Editorial Field Stations
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Our researchers and contributing editors operate from coastal monitoring nodes between the Gulf of Aqaba and the Sudanese border:
            </p>
            <ul className="space-y-2 text-xs font-mono text-ink dark:text-paper pt-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sea-500" />
                <span>Hurghada Marine Biology Node (NIOF)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sea-500" />
                <span>Marsa Alam & Hamata Coastal Basin</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sea-500" />
                <span>South Sinai Conservation Station (Dahab / Ras Mohammed)</span>
              </li>
            </ul>
          </div>

          <div className="p-6 border border-rule rounded-md bg-paper-card space-y-3 text-xs font-mono">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-muted">
              Secure Communications
            </h4>
            <div className="space-y-1 text-muted">
              <div>Email: <code className="text-ink dark:text-paper font-semibold">desk@redseamonitor.org</code></div>
              <div>Submissions: <code className="text-ink dark:text-paper font-semibold">investigations@redseamonitor.org</code></div>
            </div>
            <p className="text-[11px] text-muted pt-2 border-t border-rule/50">
              For anonymous field whistleblower dispatches regarding protected area infringements or illegal marine collection, our staff honors academic reporter confidentiality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
