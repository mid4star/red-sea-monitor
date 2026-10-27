'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { saveLibraryItemAction, lookupDoiAction, lookupIsbnAction } from '@/server/actions/library';
import { LibraryItemType, ContentStatus } from '@prisma/client';

interface LibraryEditorProps {
  initialData?: any;
}

export function LibraryEditor({ initialData }: LibraryEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [lookupDoiInput, setLookupDoiInput] = useState('');
  const [lookupIsbnInput, setLookupIsbnInput] = useState('');

  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    slug: initialData?.slug || '',
    type: initialData?.type || LibraryItemType.PAPER,
    authors_text: initialData?.authors_text || '',
    publisher: initialData?.publisher || '',
    year: initialData?.year ? String(initialData.year) : String(new Date().getFullYear()),
    language: initialData?.language || 'en',
    abstract: initialData?.abstract || '',
    doi: initialData?.doi || '',
    isbn: initialData?.isbn || '',
    external_url: initialData?.external_url || '',
    is_open_access: initialData?.is_open_access ?? true,
    status: initialData?.status || ContentStatus.PUBLISHED,
  });

  const handleSlugify = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .slice(0, 50);
  };

  const handleDoiLookup = async () => {
    if (!lookupDoiInput.trim()) return;
    setLookupLoading(true);
    setError(null);
    setSuccessMsg(null);

    const res = await lookupDoiAction(lookupDoiInput);
    setLookupLoading(false);

    if (res.success && res.data) {
      setFormData((prev) => ({
        ...prev,
        title: res.data.title || prev.title,
        subtitle: res.data.subtitle || prev.subtitle,
        slug: prev.slug || handleSlugify(res.data.title || 'pub'),
        authors_text: res.data.authors_text || prev.authors_text,
        publisher: res.data.publisher || prev.publisher,
        year: String(res.data.year || prev.year),
        abstract: res.data.abstract || prev.abstract,
        doi: res.data.doi || prev.doi,
        external_url: res.data.external_url || prev.external_url,
        type: LibraryItemType.PAPER,
        is_open_access: res.data.is_open_access ?? true,
      }));
      setSuccessMsg('Successfully imported publication metadata from Crossref!');
    } else {
      setError(res.error || 'DOI lookup failed.');
    }
  };

  const handleIsbnLookup = async () => {
    if (!lookupIsbnInput.trim()) return;
    setLookupLoading(true);
    setError(null);
    setSuccessMsg(null);

    const res = await lookupIsbnAction(lookupIsbnInput);
    setLookupLoading(false);

    if (res.success && res.data) {
      setFormData((prev) => ({
        ...prev,
        title: res.data.title || prev.title,
        slug: prev.slug || handleSlugify(res.data.title || 'book'),
        publisher: res.data.publisher || prev.publisher,
        year: String(res.data.year || prev.year),
        isbn: res.data.isbn || prev.isbn,
        type: LibraryItemType.BOOK,
        is_open_access: false,
      }));
      setSuccessMsg('Successfully retrieved book metadata from OpenLibrary!');
    } else {
      setError(res.error || 'ISBN lookup failed.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        id: formData.id,
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim() || null,
        slug: formData.slug.trim() || handleSlugify(formData.title),
        type: formData.type as LibraryItemType,
        authors_text: formData.authors_text.trim(),
        publisher: formData.publisher.trim() || null,
        year: parseInt(formData.year, 10),
        language: formData.language.trim() || 'en',
        abstract: formData.abstract.trim(),
        doi: formData.doi.trim() || null,
        isbn: formData.isbn.trim() || null,
        external_url: formData.external_url.trim() || null,
        is_open_access: formData.is_open_access,
        topic_ids: [],
        status: formData.status as ContentStatus,
        is_demo: true,
      };

      const result = await saveLibraryItemAction(payload);
      if (result.success) {
        router.push('/admin/library');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save publication record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1-Click DOI / ISBN Auto-Lookup Toolbar */}
      <div className="border border-primary/30 bg-primary/5 p-5 rounded space-y-4">
        <div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span className="text-primary text-lg">⚡</span> Instant Metadata Auto-Lookup
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 font-sans mt-0.5">
            Query Crossref or OpenLibrary to populate title, authors, journal, year, and abstract in 1 click.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-end gap-2">
            <Input
              label="Crossref DOI"
              value={lookupDoiInput}
              onChange={(e) => setLookupDoiInput(e.target.value)}
              placeholder="e.g. 10.1111/gcb.12198"
            />
            <Button
              type="button"
              variant="outline"
              disabled={lookupLoading}
              onClick={handleDoiLookup}
              className="text-xs font-mono h-9 px-3 shrink-0"
            >
              Lookup DOI
            </Button>
          </div>

          <div className="flex items-end gap-2">
            <Input
              label="OpenLibrary ISBN"
              value={lookupIsbnInput}
              onChange={(e) => setLookupIsbnInput(e.target.value)}
              placeholder="e.g. 978-0907151876"
            />
            <Button
              type="button"
              variant="outline"
              disabled={lookupLoading}
              onClick={handleIsbnLookup}
              className="text-xs font-mono h-9 px-3 shrink-0"
            >
              Lookup ISBN
            </Button>
          </div>
        </div>

        {successMsg && (
          <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
            ✓ {successMsg}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded text-sm font-mono">
            {error}
          </div>
        )}

        {/* Title & Subtitle */}
        <div className="space-y-4">
          <Input
            label="Publication Title"
            required
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              setFormData((prev) => ({
                ...prev,
                title,
                slug: prev.slug ? prev.slug : handleSlugify(title),
              }));
            }}
            placeholder="e.g. Coral reefs of the Red Sea: High tolerance to thermal stress"
          />

          <Input
            label="Subtitle / Scope"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="e.g. Evidence of evolutionary thermal memory..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="URL Slug"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>

          <div>
            <Select
              label="Document Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as LibraryItemType })}
            >
              {Object.values(LibraryItemType).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Input
              label="Publication Year"
              required
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Authors String (Formatted for Citation)"
            required
            value={formData.authors_text}
            onChange={(e) => setFormData({ ...formData, authors_text: e.target.value })}
            placeholder="e.g. Fine, M., Gildor, H., & Genin, A."
          />

          <Input
            label="Publisher / Journal Container"
            value={formData.publisher}
            onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
            placeholder="e.g. Global Change Biology"
          />
        </div>

        <div>
          <Textarea
            label="Abstract / Full Bibliographic Synopsis"
            required
            rows={5}
            value={formData.abstract}
            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
            placeholder="Detailed scientific abstract and methodology..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="DOI (Digital Object Identifier)"
            value={formData.doi}
            onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
            placeholder="10.1111/gcb.12198"
          />

          <Input
            label="ISBN (for Books)"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            placeholder="978-0907151876"
          />

          <Input
            label="External URL / Full-Text Link"
            value={formData.external_url}
            onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
            placeholder="https://..."
          />
        </div>

        {/* Open Access Toggle */}
        <div className="border border-stone-300 dark:border-stone-800 p-4 rounded bg-stone-50 dark:bg-stone-900/40 flex items-center justify-between">
          <div>
            <label className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 block cursor-pointer">
              Open Access Public License
            </label>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Identifies publications with unrestricted full-text access under Creative Commons or public repository licenses.
            </p>
          </div>
          <input
            type="checkbox"
            checked={formData.is_open_access}
            onChange={(e) => setFormData({ ...formData, is_open_access: e.target.checked })}
            className="h-5 w-5 rounded border-stone-300 text-primary focus:ring-primary cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-800">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/library')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : formData.id ? 'Update Record' : 'Create Record'}
          </Button>
        </div>
      </form>
    </div>
  );
}
