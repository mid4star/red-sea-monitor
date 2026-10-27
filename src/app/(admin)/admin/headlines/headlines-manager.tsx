'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, ExternalLink, Pin, Trash2, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form-controls';
import { saveHeadlineAction, togglePinHeadlineAction, deleteHeadlineAction } from '@/server/actions/headlines';

interface HeadlinesManagerProps {
  initialHeadlines: any[];
}

export const HeadlinesManager: React.FC<HeadlinesManagerProps> = ({ initialHeadlines }) => {
  const router = useRouter();
  const [headlines, setHeadlines] = useState(initialHeadlines);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title || !publisher) {
      setMessage({ type: 'error', text: 'All fields (Title, Publisher, URL) are required.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await saveHeadlineAction({
        title,
        publisher,
        url,
        is_pinned: false,
        status: 'PUBLISHED',
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Headline added to field ticker strip!' });
        setTitle('');
        setPublisher('');
        setUrl('');
        router.refresh();
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save headline.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePin = async (id: string, currentPin: boolean) => {
    try {
      await togglePinHeadlineAction(id, !currentPin);
      router.refresh();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to update pin.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHeadlineAction(id);
      router.refresh();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to delete.' });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Add Form (1 Col) */}
      <div className="border border-rule rounded-md bg-paper-card p-5 space-y-4 h-fit">
        <h3 className="font-serif text-base font-semibold">Curate New Headline Wire</h3>

        {message && (
          <div
            className={`p-3 rounded text-xs font-sans flex items-center gap-1.5 ${
              message.type === 'error'
                ? 'bg-coral-500/10 text-coral-600 border border-coral-500/30'
                : 'bg-[#43A047]/10 text-[#2E7D32] border border-[#43A047]/30'
            }`}
          >
            {message.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleAdd} className="space-y-3">
          <Input
            label="Headline Summary"
            placeholder="e.g. NIOF logs 24.8°C winter minimum at Elphinstone"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            label="Publisher / Wire Source"
            placeholder="e.g. Reuters / Al-Ahram / NIOF"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />

          <Input
            label="Verified Destination URL"
            placeholder="https://..."
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <Button type="submit" variant="coral" size="sm" className="w-full" isLoading={isSubmitting}>
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Publish to Ticker</span>
          </Button>
        </form>
      </div>

      {/* Headlines List (2 Cols) */}
      <div className="md:col-span-2 space-y-3">
        <h3 className="font-serif text-base font-semibold">Active Masthead Headlines ({headlines.length})</h3>

        <div className="space-y-2">
          {headlines.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-md border flex items-center justify-between gap-4 transition-colors ${
                item.is_pinned
                  ? 'border-sea-700/40 bg-sea-100/30 dark:bg-sea-900/40'
                  : 'border-rule bg-paper-card'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {item.is_pinned && (
                    <span className="font-mono text-[10px] text-coral-600 bg-coral-500/10 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
                      <Pin className="w-2.5 h-2.5 fill-current" />
                      <span>Pinned</span>
                    </span>
                  )}
                  <span className="font-mono text-xs text-muted">{item.publisher}</span>
                  <span className="text-rule">•</span>
                  <span className="font-mono text-xs text-muted">
                    {new Date(item.published_on).toLocaleDateString('en-GB')}
                  </span>
                </div>

                <div className="font-sans text-sm font-medium text-ink dark:text-paper truncate">
                  {item.title}
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-sea-700 dark:text-sea-500 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span className="truncate">{item.url}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleTogglePin(item.id, item.is_pinned)}
                  className={`p-1.5 rounded text-xs font-mono border transition-colors ${
                    item.is_pinned
                      ? 'bg-sea-900 text-paper border-sea-900'
                      : 'border-rule text-muted hover:text-ink'
                  }`}
                  title={item.is_pinned ? 'Unpin headline' : 'Pin to front'}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded text-xs text-coral-500 hover:bg-coral-500/10 transition-colors"
                  title="Delete headline"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {headlines.length === 0 && (
            <div className="p-8 text-center border border-rule rounded-md text-muted text-sm font-sans">
              No headlines in current feed. Add one using the form on the left.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
