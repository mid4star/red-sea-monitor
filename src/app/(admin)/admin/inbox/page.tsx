import React from 'react';
import { prisma } from '@/lib/db';
import { Mail, MessageSquare, Clock } from 'lucide-react';
import { SampleBadge } from '@/components/ui/sample-badge';

const DEMO_INBOX = [
  {
    id: 'msg-01',
    name: 'Capt. Tarek Amin',
    email: 'tarek.amin@dive-liveaboard.eg',
    subject: 'Report of unregistered bottom trawl vessel near Zabargad',
    message: 'While anchored off the northern reef of Zabargad on Oct 25 at 21:00, our watch crew logged an unlit steel vessel operating bottom gear inside the marine park zone.',
    created_at: new Date('2026-10-26T07:30:00Z'),
    type: 'STORY_TIP',
    is_demo: true,
  },
  {
    id: 'msg-02',
    name: 'Dr. Sarah Connor',
    email: 'sconnor@oxford-marine.ac.uk',
    subject: 'Data sharing request: Red Sea coral thermotolerance dataset',
    message: 'Hello RSM editorial team. We are compiling an ocean-wide meta-analysis of reef refugia and would like to request access to your raw transect temperature logs from Elphinstone.',
    created_at: new Date('2026-10-25T14:10:00Z'),
    type: 'RESEARCH_INQUIRY',
    is_demo: true,
  },
];

export default async function AdminInboxPage() {
  let messages = DEMO_INBOX;

  try {
    const dbMessages = await prisma.contactMessage.findMany({
      orderBy: { created_at: 'desc' },
      take: 50,
    });
    if (dbMessages && dbMessages.length > 0) {
      messages = dbMessages.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        created_at: m.created_at,
        type: 'CONTACT_MESSAGE',
        is_demo: false,
      }));
    }
  } catch {
    // fallback
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Field Leads & Communications Inbox
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
          Review incoming field tips, anonymous story leads, and research partnership inquiries.
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((item) => (
          <div
            key={item.id}
            className="border border-stone-200 dark:border-stone-800 rounded-sm p-5 bg-card space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded font-semibold">
                  {item.type}
                </span>
                <span className="font-sans font-bold text-sm text-stone-900 dark:text-stone-100">
                  {item.name}
                </span>
                <span className="font-mono text-xs text-stone-500">
                  &lt;{item.email}&gt;
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {new Date(item.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {item.is_demo && <SampleBadge />}
              </div>
            </div>

            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              {item.subject}
            </h3>

            <p className="font-serif text-xs text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-wrap bg-stone-50 dark:bg-stone-900/40 p-4 rounded border border-stone-200 dark:border-stone-800">
              {item.message}
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <a
                href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Secure Email</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
