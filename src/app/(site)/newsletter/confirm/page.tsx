import React from 'react';
import Link from 'next/link';
import { confirmNewsletterAction } from '@/server/actions/newsletter';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default async function NewsletterConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  let success = false;
  if (token) {
    const res = await confirmNewsletterAction(token);
    success = res.success;
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-xl text-center space-y-6">
      {success ? (
        <div className="border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-8 rounded space-y-4">
          <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
            Subscription Confirmed
          </h1>
          <p className="font-serif text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            Thank you for confirming your email. You will receive our weekly field dispatches, marine conservation reports, and research opportunities.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center font-sans font-medium bg-sea-900 text-paper px-4 py-2 rounded text-xs"
            >
              Return to Red Sea Monitor
            </Link>
          </div>
        </div>
      ) : (
        <div className="border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-8 rounded space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-600 dark:text-amber-400 mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Invalid or Expired Token
          </h1>
          <p className="font-serif text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            The confirmation link appears to be invalid or has already been used.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="font-mono text-xs text-primary hover:underline"
            >
              Return Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
