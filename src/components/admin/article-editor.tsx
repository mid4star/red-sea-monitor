'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Send,
  Trash2,
  Plus,
  ExternalLink,
  ShieldAlert,
  AlertCircle,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { TiptapEditor } from './tiptap-editor';
import { saveArticleAction, addArticleCorrectionAction } from '@/server/actions/articles';
import { ArticleInput, ArticleSourceInput } from '@/schemas/article';
import { Role, canPublishContent } from '@/lib/permissions';

interface ArticleEditorProps {
  initialData?: any;
  availableTopics: { id: string; name: string; slug: string }[];
  availableAuthors: { id: string; display_name: string }[];
  userRole: Role;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({
  initialData,
  availableTopics,
  availableAuthors,
  userRole,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [dek, setDek] = useState(initialData?.dek || '');
  const [type, setType] = useState(initialData?.type || 'NEWS');
  const [status, setStatus] = useState(initialData?.status || 'DRAFT');
  const [readingMinutes, setReadingMinutes] = useState(initialData?.reading_minutes || 4);
  const [body, setBody] = useState(initialData?.body || null);
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    initialData?.topics?.map((t: any) => t.topic_id || t.topic?.id) || []
  );
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(
    initialData?.authors?.map((a: any) => a.author_id || a.author?.id) || []
  );

  // Mandatory Sources State
  const [sources, setSources] = useState<ArticleSourceInput[]>(
    initialData?.sources?.map((s: any) => ({
      title: s.title,
      publisher: s.publisher,
      url: s.url,
      published_on: s.published_on ? new Date(s.published_on).toISOString().split('T')[0] : '',
    })) || []
  );

  // New source inputs
  const [newSourceTitle, setNewSourceTitle] = useState('');
  const [newSourcePublisher, setNewSourcePublisher] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');

  // Correction state
  const [correctionNote, setCorrectionNote] = useState('');

  const autoGenerateSlug = (val: string) => {
    setTitle(val);
    if (!initialData) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  };

  const handleAddSource = () => {
    if (!newSourceTitle || !newSourcePublisher || !newSourceUrl) {
      setErrorMessage('Please fill in title, publisher, and URL for the source.');
      return;
    }
    try {
      new URL(newSourceUrl);
    } catch {
      setErrorMessage('Source URL must be a valid http/https address.');
      return;
    }

    setSources([
      ...sources,
      {
        title: newSourceTitle,
        publisher: newSourcePublisher,
        url: newSourceUrl,
      },
    ]);
    setNewSourceTitle('');
    setNewSourcePublisher('');
    setNewSourceUrl('');
    setErrorMessage(null);
  };

  const handleRemoveSource = (index: number) => {
    setSources(sources.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (targetStatus: 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED') => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // Enforce Rule: A NEWS article CANNOT be published without at least one source URL
    if (targetStatus === 'PUBLISHED' && type === 'NEWS' && sources.length === 0) {
      setErrorMessage(
        'Editorial Policy Violation: A NEWS article cannot be published without at least one verified external source URL.'
      );
      setIsSubmitting(false);
      return;
    }

    // Role check: Contributors cannot publish
    if (targetStatus === 'PUBLISHED' && !canPublishContent(userRole)) {
      setErrorMessage('Permission Denied: Contributors cannot publish. Please click "Submit for Review".');
      setIsSubmitting(false);
      return;
    }

    const payload: ArticleInput = {
      id: initialData?.id,
      title,
      slug,
      dek,
      body: body || { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
      type,
      status: targetStatus,
      reading_minutes: Number(readingMinutes),
      is_featured: isFeatured,
      topic_ids: selectedTopics,
      author_ids: selectedAuthors,
      sources,
      locale: 'en',
    };

    try {
      const res = await saveArticleAction(payload);
      if (res.success) {
        setSuccessMessage(`Article successfully saved as ${targetStatus}!`);
        setStatus(targetStatus);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred saving article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCorrection = async () => {
    if (!initialData?.id || !correctionNote.trim()) return;
    try {
      await addArticleCorrectionAction({
        article_id: initialData.id,
        note: correctionNote,
      });
      setSuccessMessage('Correction note recorded successfully.');
      setCorrectionNote('');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to record correction.');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Messages */}
      {errorMessage && (
        <div className="p-4 rounded-md bg-coral-500/10 border border-coral-500/30 text-coral-600 dark:text-coral-500 text-sm font-sans flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-md bg-[#43A047]/10 border border-[#43A047]/30 text-[#2E7D32] dark:text-[#A5D6A7] text-sm font-sans flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
        <div className="flex items-center gap-2">
          <Badge variant={status === 'PUBLISHED' ? 'sea' : status === 'IN_REVIEW' ? 'coral' : 'neutral'}>
            {status}
          </Badge>
          <span className="font-mono text-xs text-muted">Role: {userRole}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSubmit('DRAFT')}
            isLoading={isSubmitting}
          >
            <Save className="w-4 h-4 mr-1.5" />
            <span>Save Draft</span>
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => handleSubmit('IN_REVIEW')}
            isLoading={isSubmitting}
          >
            <Send className="w-4 h-4 mr-1.5" />
            <span>Submit for Review</span>
          </Button>

          {canPublishContent(userRole) && (
            <Button
              type="button"
              variant="coral"
              size="sm"
              onClick={() => handleSubmit('PUBLISHED')}
              isLoading={isSubmitting}
            >
              <CheckCircle className="w-4 h-4 mr-1.5" />
              <span>Publish Article</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Title, Dek, Editor */}
        <div className="md:col-span-2 space-y-6">
          <Input
            label="Article Headline"
            value={title}
            onChange={(e) => autoGenerateSlug(e.target.value)}
            placeholder="e.g. Inside the Thermal Refugia: Northern Red Sea Coral Adaptation"
            required
          />

          <div className="space-y-1">
            <label className="block text-xs font-mono uppercase tracking-wider font-medium text-muted">
              URL Slug
            </label>
            <div className="flex items-center rounded-md border border-rule bg-paper-card px-3 py-2 text-xs font-mono text-muted">
              <span>https://redseamonitor.org/news/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent text-ink dark:text-paper font-mono focus:outline-none flex-1 ml-1"
              />
            </div>
          </div>

          <Textarea
            label="Summary Deck (Dek)"
            value={dek}
            onChange={(e) => setDek(e.target.value)}
            placeholder="A 2-3 sentence overview providing context and key scientific findings..."
            rows={3}
          />

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider font-medium text-ink dark:text-paper">
              Article Body (Tiptap Rich Text)
            </label>
            <TiptapEditor content={body} onChange={setBody} />
          </div>

          {/* ------------------------------------------------------------- */}
          {/* MANDATORY SOURCES PANEL (Part 6.2 Module 2 requirement) */}
          {/* ------------------------------------------------------------- */}
          <section className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-coral-500" />
                <h3 className="font-serif text-base font-semibold text-ink dark:text-paper">
                  Mandatory Source Citations ({sources.length})
                </h3>
              </div>
              <Badge variant={type === 'NEWS' && sources.length === 0 ? 'coral' : 'neutral'}>
                {type === 'NEWS' ? 'Required for News' : 'Recommended'}
              </Badge>
            </div>

            <p className="font-sans text-xs text-muted leading-relaxed">
              Every news dispatch requires at least one primary source URL (scientific journal paper, government decree, or institutional research dataset).
            </p>

            {/* List of existing sources */}
            {sources.length > 0 && (
              <div className="space-y-2">
                {sources.map((src, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded border border-rule bg-paper dark:bg-deep-sea text-xs font-sans"
                  >
                    <div>
                      <div className="font-semibold text-ink dark:text-paper">{src.title}</div>
                      <div className="text-muted font-mono text-[11px] flex items-center gap-2 mt-0.5">
                        <span>{src.publisher}</span>
                        <span>•</span>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sea-700 dark:text-sea-500 underline flex items-center gap-0.5"
                        >
                          <span>{src.url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSource(idx)}
                      className="text-coral-500 hover:text-coral-600 p-1"
                      title="Remove source"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new source inputs */}
            <div className="pt-3 border-t border-rule/50 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block">
                Add External Source:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input
                  placeholder="Source Title (e.g. NIOF Coral Survey Report 2026)"
                  value={newSourceTitle}
                  onChange={(e) => setNewSourceTitle(e.target.value)}
                />
                <Input
                  placeholder="Publisher (e.g. Nature / NIOF / EEAA)"
                  value={newSourcePublisher}
                  onChange={(e) => setNewSourcePublisher(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Direct URL (https://...)"
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="secondary" size="md" onClick={handleAddSource}>
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Add</span>
                </Button>
              </div>
            </div>
          </section>

          {/* Corrections Log (for published articles) */}
          {initialData?.id && (
            <section className="border border-rule rounded-md bg-paper-card p-5 space-y-3">
              <h3 className="font-serif text-base font-semibold">Post-Publication Correction Log</h3>
              <p className="text-xs text-muted">
                Transparently record any amendments or factual corrections made after publication.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Explain correction (e.g. Updated species count based on NIOF revised logs)..."
                  value={correctionNote}
                  onChange={(e) => setCorrectionNote(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="md" onClick={handleAddCorrection}>
                  Record Correction
                </Button>
              </div>
            </section>
          )}
        </div>

        {/* Right Column (1 Col): Meta, Taxonomy, Author */}
        <div className="space-y-6">
          <Select
            label="Article Type"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            options={[
              { label: 'News Dispatch (Sources Required)', value: 'NEWS' },
              { label: 'Longform Feature', value: 'FEATURE' },
              { label: 'Field Note', value: 'FIELD_NOTE' },
              { label: 'Interview', value: 'INTERVIEW' },
              { label: 'Scientific Explainer', value: 'EXPLAINER' },
            ]}
          />

          <Input
            label="Reading Time (Minutes)"
            type="number"
            min={1}
            max={60}
            value={readingMinutes}
            onChange={(e) => setReadingMinutes(Number(e.target.value))}
          />

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider font-medium text-ink dark:text-paper">
              Topics Tagging
            </label>
            <div className="flex flex-wrap gap-1.5 p-3 rounded-md border border-rule bg-paper-elevated max-h-48 overflow-y-auto">
              {availableTopics.map((topic) => {
                const isSelected = selectedTopics.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTopics(selectedTopics.filter((id) => id !== topic.id));
                      } else {
                        setSelectedTopics([...selectedTopics, topic.id]);
                      }
                    }}
                    className={`px-2 py-1 text-xs rounded-sm border font-sans select-none transition-colors ${
                      isSelected
                        ? 'bg-sea-900 border-sea-900 text-paper font-semibold'
                        : 'border-rule text-muted hover:border-ink/40'
                    }`}
                  >
                    {topic.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider font-medium text-ink dark:text-paper">
              Byline Authors
            </label>
            <div className="space-y-1 p-3 rounded-md border border-rule bg-paper-elevated">
              {availableAuthors.map((author) => {
                const isSelected = selectedAuthors.includes(author.id);
                return (
                  <label key={author.id} className="flex items-center gap-2 text-xs font-sans cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAuthors([...selectedAuthors, author.id]);
                        } else {
                          setSelectedAuthors(selectedAuthors.filter((id) => id !== author.id));
                        }
                      }}
                      className="rounded border-rule text-sea-700 focus:ring-sea-700"
                    />
                    <span>{author.display_name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-md border border-rule bg-paper-card space-y-2">
            <label className="flex items-center gap-2 text-xs font-mono font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-rule text-coral-500 focus:ring-coral-500"
              />
              <span>Feature on Masthead Lead Story</span>
            </label>
            <p className="text-[11px] text-muted">Displays this item in the prominent 7/12 split on the homepage.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
