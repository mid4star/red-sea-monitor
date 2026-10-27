'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Sparkles, CheckCircle2, ArrowRight, Eye, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form-controls';
import { Badge } from '@/components/ui/badge';

interface StoreDisabledBannerProps {
  isPreviewMode?: boolean;
}

export const StoreDisabledBanner: React.FC<StoreDisabledBannerProps> = ({ isPreviewMode = false }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  if (isPreviewMode) {
    return (
      <div className="mb-8 p-4 rounded-sm border border-sand-500/30 bg-sand-500/10 dark:bg-sea-800/40 text-sand-800 dark:text-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <Eye className="w-4 h-4 text-sand-600 dark:text-sand-400 shrink-0" />
          <span>
            <strong>FEATURE FLAG PREVIEW ACTIVE:</strong> Viewing Store & Heritage Crafts directory in evaluator preview mode (`store_enabled=false` in production).
          </span>
        </div>
        <Link
          href="/store"
          className="text-coral-500 hover:underline shrink-0 flex items-center gap-1 font-semibold"
        >
          <span>Exit Preview Mode</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30 p-8 my-8 text-center max-w-2xl mx-auto space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-500/10 text-sand-700 dark:text-sand-300 font-mono text-xs border border-sand-500/20">
        <span className="w-2 h-2 rounded-full bg-sand-500 animate-pulse" />
        <span>Phase 5 Feature Flag: STORE_ENABLED = FALSE</span>
      </div>

      <div className="space-y-3">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink dark:text-paper">
          Red Sea Artisan & Heritage Crafts Directory
        </h2>
        <p className="text-sm text-muted font-sans max-w-lg mx-auto leading-relaxed">
          The public storefront is currently in closed evaluation. In v1, Red Sea Monitor operates strictly under a zero-commission artisan enquiry protocol to preserve traditional Bedouin, Ababda, and coastal maritime craft lineages.
        </p>
      </div>

      {subscribed ? (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-sm text-emerald-800 dark:text-emerald-200 text-xs font-sans flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>You are registered on the craft registry dispatch waitlist. We will notify you upon public catalog unlock.</span>
        </div>
      ) : (
        <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email for craft release bulletin..."
            className="text-xs"
          />
          <Button type="submit" variant="coral" size="sm" className="shrink-0 gap-1.5 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>Join Waitlist</span>
          </Button>
        </form>
      )}

      <div className="pt-4 border-t border-rule/60 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <Link
          href="/store?preview=true"
          className="inline-flex items-center gap-1.5 text-coral-500 hover:text-coral-600 font-semibold"
        >
          <Eye className="w-4 h-4" />
          <span>Inspect Active Catalogue (Evaluator Preview)</span>
        </Link>
        <span className="text-rule">•</span>
        <Link
          href="/editorial-policy"
          className="text-muted hover:text-ink dark:hover:text-paper transition-colors"
        >
          Heritage Documentation Ethics
        </Link>
      </div>
    </div>
  );
};
