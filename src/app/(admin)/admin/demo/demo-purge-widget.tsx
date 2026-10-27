'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Trash2, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { purgeAllDemoDataAction } from '@/server/actions/demo';
import { Role, canPurgeDemoData } from '@/lib/permissions';

interface DemoPurgeWidgetProps {
  counts: {
    total: number;
    articles: number;
    sightings: number;
    species: number;
    places: number;
    library: number;
    opportunities: number;
  };
  userRole: Role;
}

export const DemoPurgeWidget: React.FC<DemoPurgeWidgetProps> = ({ counts, userRole }) => {
  const router = useRouter();
  const [isPurging, setIsPurging] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const canPurge = canPurgeDemoData(userRole);

  const handlePurge = async () => {
    if (confirmText !== 'PURGE DEMO') {
      alert('Please type "PURGE DEMO" to confirm.');
      return;
    }

    setIsPurging(true);
    setResultMessage(null);

    try {
      const res = await purgeAllDemoDataAction();
      if (res.success) {
        setResultMessage('All demo records successfully wiped from the database.');
        router.refresh();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to purge demo data.');
    } finally {
      setIsPurging(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Counts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="p-3 border border-rule rounded bg-paper-card text-center">
          <div className="font-mono text-xl font-bold">{counts.articles}</div>
          <div className="text-[11px] text-muted">Articles</div>
        </div>
        <div className="p-3 border border-rule rounded bg-paper-card text-center">
          <div className="font-mono text-xl font-bold">{counts.sightings}</div>
          <div className="text-[11px] text-muted">Sightings</div>
        </div>
        <div className="p-3 border border-rule rounded bg-paper-card text-center">
          <div className="font-mono text-xl font-bold">{counts.places}</div>
          <div className="text-[11px] text-muted">Places</div>
        </div>
        <div className="p-3 border border-rule rounded bg-paper-card text-center">
          <div className="font-mono text-xl font-bold">{counts.species}</div>
          <div className="text-[11px] text-muted">Species</div>
        </div>
        <div className="p-3 border border-rule rounded bg-paper-card text-center">
          <div className="font-mono text-xl font-bold">{counts.library}</div>
          <div className="text-[11px] text-muted">Library</div>
        </div>
        <div className="p-3 border border-rule rounded bg-paper-card text-center">
          <div className="font-mono text-xl font-bold">{counts.opportunities}</div>
          <div className="text-[11px] text-muted">Grants</div>
        </div>
      </div>

      {resultMessage && (
        <div className="p-4 rounded-md bg-[#43A047]/10 border border-[#43A047]/30 text-[#2E7D32] text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{resultMessage}</span>
        </div>
      )}

      {/* Danger Zone */}
      <div className="border border-coral-500/40 rounded-md bg-coral-500/5 p-6 space-y-4">
        <div className="flex items-center gap-2 text-coral-600 dark:text-coral-500 font-serif font-semibold">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>One-Click Demo Data Purge Action</span>
        </div>

        <p className="font-sans text-xs text-muted leading-relaxed">
          This operation will permanently delete all {counts.total} database records flagged with <code className="font-mono text-ink">is_demo = true</code>. Only real production articles, sightings, and gazetteer records will remain.
        </p>

        {canPurge ? (
          <div className="space-y-3 pt-2">
            <div className="max-w-sm">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1">
                Type &ldquo;PURGE DEMO&rdquo; to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="PURGE DEMO"
                className="w-full px-3 py-1.5 font-mono text-xs border border-rule rounded bg-paper"
              />
            </div>

            <Button
              type="button"
              variant="coral"
              size="md"
              onClick={handlePurge}
              isLoading={isPurging}
              disabled={confirmText !== 'PURGE DEMO' || counts.total === 0}
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              <span>Purge All {counts.total} Demo Records</span>
            </Button>
          </div>
        ) : (
          <div className="p-3 rounded bg-sand-300/20 text-xs font-mono text-sand-600 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Restricted: Only users with the ADMIN role can execute demo data purge. Current role: {userRole}.</span>
          </div>
        )}
      </div>
    </div>
  );
};
