import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Mail,
  PlusCircle,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SampleBadge } from '@/components/ui/sample-badge';
import { getCurrentUser } from '@/lib/auth';

export default async function AdminOverviewPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-8">
      {/* Overview Masthead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="sea">Operational Overview</Badge>
            <span className="font-mono text-xs text-muted">Role: {user.role}</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink dark:text-paper">
            Editorial & Verification Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/articles/new">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <PlusCircle className="w-4 h-4" />
              <span>New Article Draft</span>
            </Button>
          </Link>
          <Link href="/admin/sightings">
            <Button variant="coral" size="sm" className="gap-1.5 text-xs">
              <Eye className="w-4 h-4" />
              <span>Review Queue (3)</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. KPI Counts Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>Pending Sightings</span>
            <Eye className="w-4 h-4 text-coral-500" />
          </div>
          <div className="font-serif text-3xl font-bold text-coral-600 dark:text-coral-500">3</div>
          <p className="text-[11px] font-sans text-muted">Requires scientist review</p>
        </div>

        <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>Drafts in Review</span>
            <FileText className="w-4 h-4 text-sea-700" />
          </div>
          <div className="font-serif text-3xl font-bold text-ink dark:text-paper">4</div>
          <p className="text-[11px] font-sans text-muted">2 awaiting source citations</p>
        </div>

        <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>Expiring Grants</span>
            <Clock className="w-4 h-4 text-sand-600" />
          </div>
          <div className="font-serif text-3xl font-bold text-ink dark:text-paper">2</div>
          <p className="text-[11px] font-sans text-muted">Deadlines within 14 days</p>
        </div>

        <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>New Inquiries</span>
            <Mail className="w-4 h-4 text-muted" />
          </div>
          <div className="font-serif text-3xl font-bold text-ink dark:text-paper">2</div>
          <p className="text-[11px] font-sans text-muted">Contact & corrections logs</p>
        </div>
      </div>

      {/* 2. Content Health Warnings (Editorial Standards) */}
      <section className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-coral-500" />
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">
              Content Health & Verification Audits
            </h3>
          </div>
          <span className="font-mono text-xs text-muted">Standards Engine</span>
        </div>

        <div className="space-y-3 font-sans text-xs">
          <div className="flex items-center justify-between p-3 rounded-md bg-coral-500/10 border border-coral-500/20 text-ink dark:text-paper">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-coral-500" />
              <span><strong>Draft Warning:</strong> &ldquo;Coral Bleaching Survey 2026&rdquo; lacks mandatory source publication URL.</span>
            </div>
            <Link href="/admin/articles" className="font-mono text-coral-600 underline">Resolve citation</Link>
          </div>

          <div className="flex items-center justify-between p-3 rounded-md bg-sand-300/20 border border-sand-600/30 text-ink dark:text-paper">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sand-600" />
              <span><strong>Media Audit:</strong> 1 image asset is missing required scientific alt-text and copyright license.</span>
            </div>
            <Link href="/admin/media" className="font-mono text-sand-600 dark:text-sand-300 underline">Add metadata</Link>
          </div>

          <div className="flex items-center justify-between p-3 rounded-md bg-sea-100/40 border border-sea-500/30 text-ink dark:text-paper">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sea-500" />
              <span><strong>Taxonomy Status:</strong> All 8 seed species verified against IUCN Red List API v4.</span>
            </div>
            <span className="font-mono text-[#2E7D32]">Up to date</span>
          </div>
        </div>
      </section>

      {/* 3. Demo Data Management Module */}
      <section className="border border-rule rounded-md bg-sand-300/15 dark:bg-sea-900/30 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sand-600 dark:text-sand-300" />
            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">
              Sample Data Engine (`is_demo = true`)
            </h3>
          </div>
          <SampleBadge />
        </div>

        <p className="font-sans text-xs text-muted max-w-2xl leading-relaxed">
          In compliance with master rules, all seeded demo content is explicitly marked with `is_demo = true`. Editors can review or wipe all sample articles, sightings, species, and places in a single operation when real production data is imported.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/admin/demo">
            <Button variant="outline" size="sm" className="text-xs font-mono">
              View All 38 Demo Records
            </Button>
          </Link>
          <Button variant="coral" size="sm" className="text-xs font-mono">
            Wipe All Demo Records
          </Button>
        </div>
      </section>
    </div>
  );
}
