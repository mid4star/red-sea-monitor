'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { moderateSightingAction } from '@/server/actions/watch';
import { SightingStatus } from '@prisma/client';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Button } from '@/components/ui/button';
import { Check, X, Shield, MapPin, Eye } from 'lucide-react';

interface SightingsTableProps {
  initialSightings: any[];
}

export function SightingsTable({ initialSightings }: SightingsTableProps) {
  const router = useRouter();
  const [sightings, setSightings] = useState(initialSightings);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SightingStatus | 'ALL'>('PENDING');

  const filtered = sightings.filter((s) => {
    if (activeTab === 'ALL') return true;
    return s.status === activeTab;
  });

  const handleModerate = async (id: string, status: SightingStatus) => {
    setProcessingId(id);
    try {
      const res = await moderateSightingAction(id, status);
      if (res.success) {
        setSightings((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status } : s))
        );
        router.refresh();
      }
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {(['PENDING', 'APPROVED', 'REJECTED', 'ALL'] as const).map((tab) => {
          const count = sightings.filter((s) => (tab === 'ALL' ? true : s.status === tab)).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-sea-900 text-paper font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <span>{tab}</span>
              <span className="font-bold opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-x-auto bg-card">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-100 dark:bg-stone-900/60 font-mono text-stone-500 uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
            <tr>
              <th className="p-3.5">Species & Behavior</th>
              <th className="p-3.5">Count & Time</th>
              <th className="p-3.5">Location & Raw GPS (Private)</th>
              <th className="p-3.5">Observer Contact</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-sans">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/30">
                <td className="p-3.5 font-medium max-w-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      {s.reported_common_name}
                    </span>
                    {s.is_demo && <SampleBadge />}
                  </div>
                  {s.behavior && (
                    <div className="text-[11px] font-serif italic text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                      &ldquo;{s.behavior}&rdquo;
                    </div>
                  )}
                  {s.is_sensitive_species && (
                    <span className="inline-block mt-1 text-[9px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-1.5 py-0.2 rounded">
                      Sensitive Taxon (Blurred on public map)
                    </span>
                  )}
                </td>

                <td className="p-3.5 whitespace-nowrap">
                  <div className="font-mono font-semibold text-stone-800 dark:text-stone-200">
                    {s.count} individual{s.count > 1 ? 's' : ''}
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                    {new Date(s.observed_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </td>

                <td className="p-3.5">
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    {s.location_label}
                  </div>
                  {/* Scientific Reviewer view: Raw exact coordinates */}
                  <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5" title="Raw unblurred coordinates for review verification">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>Exact: {s.lat_exact.toFixed(4)}°N, {s.lng_exact.toFixed(4)}°E</span>
                  </div>
                </td>

                <td className="p-3.5">
                  <div className="font-medium text-stone-800 dark:text-stone-200">
                    {s.reporter_name}
                  </div>
                  <div className="font-mono text-[11px] text-stone-500 truncate max-w-[140px]">
                    {s.reporter_email}
                  </div>
                </td>

                <td className="p-3.5">
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                      s.status === 'APPROVED'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : s.status === 'REJECTED'
                        ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                  {s.status !== 'APPROVED' && (
                    <button
                      type="button"
                      disabled={processingId === s.id}
                      onClick={() => handleModerate(s.id, 'APPROVED')}
                      className="inline-flex items-center gap-1 font-mono text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded font-medium disabled:opacity-50"
                      title="Approve sighting for public observatory"
                    >
                      <Check className="w-3 h-3" />
                      <span>Approve</span>
                    </button>
                  )}

                  {s.status !== 'REJECTED' && (
                    <button
                      type="button"
                      disabled={processingId === s.id}
                      onClick={() => handleModerate(s.id, 'REJECTED')}
                      className="inline-flex items-center gap-1 font-mono text-[11px] bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-medium disabled:opacity-50"
                      title="Reject unverified or inaccurate report"
                    >
                      <X className="w-3 h-3" />
                      <span>Reject</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 font-serif text-stone-500 text-xs">
            No sightings found under status &ldquo;{activeTab}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
}
