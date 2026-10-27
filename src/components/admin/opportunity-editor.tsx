'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { saveOpportunityAction } from '@/server/actions/opportunities';
import { OpportunityKind, ContentStatus } from '@prisma/client';

interface OpportunityEditorProps {
  initialData?: any;
  organizations?: any[];
}

export function OpportunityEditor({ initialData, organizations = [] }: OpportunityEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    kind: initialData?.kind || OpportunityKind.GRANT,
    summary: initialData?.summary || '',
    organization_id: initialData?.organization_id || (organizations[0]?.id || 'org-01'),
    eligibility: initialData?.eligibility || '',
    amount_text: initialData?.amount_text || '',
    location_text: initialData?.location_text || '',
    is_remote: initialData?.is_remote ?? false,
    deadline_at: initialData?.deadline_at
      ? new Date(initialData.deadline_at).toISOString().slice(0, 10)
      : '',
    apply_url: initialData?.apply_url || '',
    is_featured: initialData?.is_featured ?? false,
    status: initialData?.status || ContentStatus.PUBLISHED,
  });

  const handleSlugify = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .slice(0, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        id: formData.id,
        title: formData.title.trim(),
        slug: formData.slug.trim() || handleSlugify(formData.title),
        kind: formData.kind as OpportunityKind,
        summary: formData.summary.trim(),
        organization_id: formData.organization_id,
        eligibility: formData.eligibility.trim() || null,
        amount_text: formData.amount_text.trim() || null,
        location_text: formData.location_text.trim() || null,
        is_remote: formData.is_remote,
        deadline_at: formData.deadline_at ? new Date(formData.deadline_at).toISOString() : null,
        apply_url: formData.apply_url.trim(),
        is_featured: formData.is_featured,
        status: formData.status as ContentStatus,
        is_demo: true,
      };

      const result = await saveOpportunityAction(payload);
      if (result.success) {
        router.push('/admin/opportunities');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save opportunity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded text-sm font-mono">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Opportunity Title"
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
          placeholder="e.g. Red Sea Coral Genetic Resiliency Research Fellowship"
        />

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
              label="Category / Kind"
              value={formData.kind}
              onChange={(e) => setFormData({ ...formData, kind: e.target.value as OpportunityKind })}
            >
              {Object.values(OpportunityKind).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Input
              label="Application Deadline"
              type="date"
              value={formData.deadline_at}
              onChange={(e) => setFormData({ ...formData, deadline_at: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Funding / Salary / Stipend Text"
          value={formData.amount_text}
          onChange={(e) => setFormData({ ...formData, amount_text: e.target.value })}
          placeholder="e.g. $45,000 USD stipend + fully funded research vessel time"
        />

        <Input
          label="Location Text"
          value={formData.location_text}
          onChange={(e) => setFormData({ ...formData, location_text: e.target.value })}
          placeholder="e.g. Hurghada Field Station & Ras Mohammed"
        />
      </div>

      <div>
        <Textarea
          label="Summary & Scope"
          required
          rows={3}
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          placeholder="Brief description of objectives, research scope, and responsibilities..."
        />
      </div>

      <div>
        <Input
          label="Eligibility & Academic Prerequisites"
          value={formData.eligibility}
          onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
          placeholder="e.g. PhD in Marine Biology or Molecular Ecology within last 5 years"
        />
      </div>

      <div>
        <Input
          label="Official Application / Portal URL"
          required
          value={formData.apply_url}
          onChange={(e) => setFormData({ ...formData, apply_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      {/* Feature & Remote checkboxes */}
      <div className="flex flex-wrap gap-6 pt-2">
        <label className="flex items-center gap-2 text-xs font-mono text-stone-700 dark:text-stone-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_featured}
            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
            className="h-4 w-4 rounded border-stone-300 text-primary"
          />
          <span>Feature on Home & Directory Masthead</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-mono text-stone-700 dark:text-stone-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_remote}
            onChange={(e) => setFormData({ ...formData, is_remote: e.target.checked })}
            className="h-4 w-4 rounded border-stone-300 text-primary"
          />
          <span>Remote / Desk Eligible</span>
        </label>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/opportunities')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : formData.id ? 'Update Opportunity' : 'Create Opportunity'}
        </Button>
      </div>
    </form>
  );
}
