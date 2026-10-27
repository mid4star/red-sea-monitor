'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { generateIcsFile } from '@/lib/calendar';

interface CalendarButtonProps {
  opportunity: {
    title: string;
    summary?: string | null;
    location_text?: string | null;
    deadline_at?: Date | string | null;
    apply_url: string;
  };
  className?: string;
}

export function CalendarButton({ opportunity, className = '' }: CalendarButtonProps) {
  if (!opportunity.deadline_at) return null;

  const handleDownload = () => {
    const deadline = new Date(opportunity.deadline_at!);
    const icsContent = generateIcsFile({
      title: opportunity.title,
      description: opportunity.summary || 'Application Deadline via Red Sea Monitor',
      location: opportunity.location_text || undefined,
      deadline,
      url: opportunity.apply_url,
    });

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${opportunity.title.slice(0, 20).toLowerCase().replace(/[^a-z0-9]/g, '-')}-deadline.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={`inline-flex items-center gap-1.5 text-xs font-mono text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-300 dark:border-stone-700 hover:border-stone-400 bg-stone-50 dark:bg-stone-900/60 px-2.5 py-1 rounded transition-colors ${className}`}
      title="Add deadline to Apple Calendar, Google Calendar, or Outlook"
    >
      <Calendar className="w-3.5 h-3.5 text-coral-500" />
      <span>Add to Calendar (.ics)</span>
    </button>
  );
}
