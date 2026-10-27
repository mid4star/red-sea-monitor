import React from 'react';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { DemoPurgeWidget } from './demo-purge-widget';
import { getDemoDataCounts } from '@/server/actions/demo';

export default async function AdminDemoPage() {
  const user = await getCurrentUser();
  const counts = await getDemoDataCounts();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-rule pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="coral">System Maintenance</Badge>
          <span className="font-mono text-xs text-muted">is_demo = true Engine</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-ink dark:text-paper">
          Demo Data Manager
        </h1>
        <p className="font-sans text-xs text-muted max-w-xl mt-1 leading-relaxed">
          Master Rule: Never present fake content as real. All seed and demo content is strictly flagged with `is_demo = true`. Use this console to audit or wipe all sample data in one operation when transitioning to live editorial production.
        </p>
      </div>

      <DemoPurgeWidget counts={counts} userRole={user.role} />
    </div>
  );
}
