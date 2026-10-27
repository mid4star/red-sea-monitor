'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { sendContactMessageAction, sendContentSuggestionAction } from '@/server/actions/contact';

export const ContactForm: React.FC = () => {
  const [tab, setTab] = useState<'message' | 'tip'>('message');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Message fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Tip fields
  const [tipKind, setTipKind] = useState<'STORY' | 'SOURCE' | 'CORRECTION' | 'OPPORTUNITY'>('STORY');
  const [tipUrl, setTipUrl] = useState('');
  const [tipBody, setTipBody] = useState('');

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await sendContactMessageAction({ name, email, subject, message });
      if (res.success) {
        setStatus({
          type: 'success',
          text: 'Thank you. Your message has been delivered to the editorial desk.',
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message || 'Failed to deliver message.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await sendContentSuggestionAction({
        kind: tipKind,
        body: tipBody,
        url: tipUrl,
        submitter_email: email,
      });
      if (res.success) {
        setStatus({
          type: 'success',
          text: 'Field tip received. An editor will review the reference material.',
        });
        setTipBody('');
        setTipUrl('');
      }
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message || 'Failed to submit field tip.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex border-b border-rule font-mono text-xs">
        <button
          type="button"
          onClick={() => { setTab('message'); setStatus(null); }}
          className={`py-2 px-4 border-b-2 font-semibold transition-colors ${
            tab === 'message'
              ? 'border-sea-700 text-sea-700 dark:border-sea-500 dark:text-sea-500'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          General Editorial Inquiry
        </button>
        <button
          type="button"
          onClick={() => { setTab('tip'); setStatus(null); }}
          className={`py-2 px-4 border-b-2 font-semibold transition-colors ${
            tab === 'tip'
              ? 'border-sea-700 text-sea-700 dark:border-sea-500 dark:text-sea-500'
              : 'border-transparent text-muted hover:text-ink'
          }`}
        >
          Submit Field Lead or Correction
        </button>
      </div>

      {status && (
        <div
          className={`p-4 rounded-md text-xs font-sans flex items-center gap-2 ${
            status.type === 'error'
              ? 'bg-coral-500/10 text-coral-600 border border-coral-500/30'
              : 'bg-[#43A047]/10 text-[#2E7D32] border border-[#43A047]/30'
          }`}
        >
          {status.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{status.text}</span>
        </div>
      )}

      {tab === 'message' ? (
        <form onSubmit={handleMessageSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your Name / Title"
              placeholder="e.g. Dr. Sherif Soliman"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="sherif@institution.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Input
            label="Inquiry Subject"
            placeholder="e.g. Research data inquiry regarding Ras Mohammed coral transects"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <Textarea
            label="Message Details"
            placeholder="Describe your inquiry, institutional background, or collaboration request..."
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <Button type="submit" variant="coral" size="md" isLoading={isSubmitting}>
            <Send className="w-4 h-4 mr-1.5" />
            <span>Send to Editorial Desk</span>
          </Button>
        </form>
      ) : (
        <form onSubmit={handleTipSubmit} className="space-y-4">
          <Select
            label="Nature of Suggestion"
            value={tipKind}
            onChange={(e) => setTipKind(e.target.value as any)}
            options={[
              { label: 'Original Investigative Story Lead', value: 'STORY' },
              { label: 'Scientific Paper / Source Reference', value: 'SOURCE' },
              { label: 'Factual Correction to Published Article', value: 'CORRECTION' },
              { label: 'Conservation Grant / Opportunity Announcement', value: 'OPPORTUNITY' },
            ]}
          />

          <Input
            label="Reference URL (Scientific paper, official decree, dataset)"
            placeholder="https://..."
            type="url"
            value={tipUrl}
            onChange={(e) => setTipUrl(e.target.value)}
          />

          <Textarea
            label="Lead Details & Verification Context"
            placeholder="Provide context, coordinates, involved species, or describe factual inaccuracies..."
            rows={5}
            value={tipBody}
            onChange={(e) => setTipBody(e.target.value)}
            required
          />

          <Input
            label="Contact Email (Optional for follow-up)"
            type="email"
            placeholder="researcher@field.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" variant="coral" size="md" isLoading={isSubmitting}>
            <Send className="w-4 h-4 mr-1.5" />
            <span>Submit Lead to Editors</span>
          </Button>
        </form>
      )}
    </div>
  );
};
