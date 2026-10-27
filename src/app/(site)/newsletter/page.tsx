'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form-controls';
import { subscribeNewsletterAction } from '@/server/actions/newsletter';
import { Mail, CheckCircle, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await subscribeNewsletterAction(email);
      if (res.success) {
        setSuccess(res.message);
        setEmail('');
      } else {
        setError('Subscription failed. Please verify your email.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Field Newsletter' },
        ]}
      />

      <div className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-6 text-center">
        <div className="w-12 h-12 rounded-full bg-sea-100 dark:bg-sea-900/60 text-sea-700 dark:text-sea-300 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          The Red Sea Monitor Field Dispatch
        </h1>
        <p className="font-serif text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-lg mx-auto">
          Weekly curated briefings on marine conservation decrees, coral thermal tolerance data, elasmobranch tracking, and verified research grants.
        </p>
      </div>

      {success ? (
        <div className="border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded text-center space-y-3">
          <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Check Your Email
          </h3>
          <p className="font-serif text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            {success}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-stone-300 dark:border-stone-800 p-6 rounded-sm">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded text-xs font-mono">
              {error}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="researcher@institute.org"
          />

          <div className="flex items-start gap-2 pt-1 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>Strict double opt-in verification. No tracking pixels, zero marketing spam, and one-click unsubscribe at any time.</span>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending Confirmation Link...' : 'Subscribe to Field Dispatches'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
