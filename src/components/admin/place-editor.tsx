'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { savePlaceAction } from '@/server/actions/explorer';
import { PlaceType, ContentStatus } from '@prisma/client';

interface PlaceEditorProps {
  initialData?: any;
}

export function PlaceEditor({ initialData }: PlaceEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    type: initialData?.type || PlaceType.REEF,
    summary: initialData?.summary || '',
    latitude: initialData?.latitude ? String(initialData.latitude) : '27.2',
    longitude: initialData?.longitude ? String(initialData.longitude) : '33.8',
    protection_status: initialData?.protection_status || '',
    established_year: initialData?.established_year ? String(initialData.established_year) : '',
    area_km2: initialData?.area_km2 ? String(initialData.area_km2) : '',
    status: initialData?.status || ContentStatus.PUBLISHED,
    permits: initialData?.visit_guidance?.permits || '',
    best_season: initialData?.visit_guidance?.best_season || '',
    safety: initialData?.visit_guidance?.safety || '',
    rules: initialData?.visit_guidance?.rules ? initialData.visit_guidance.rules.join('\n') : '',
  });

  const [sources, setSources] = useState<any[]>(
    initialData?.sources || [
      { title: '', publisher: '', url: '' },
    ]
  );

  const handleSlugify = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const addSource = () => {
    setSources([...sources, { title: '', publisher: '', url: '' }]);
  };

  const updateSource = (index: number, field: string, val: string) => {
    const updated = [...sources];
    updated[index][field] = val;
    setSources(updated);
  };

  const removeSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const validSources = sources
        .filter((s) => s.title.trim() && s.url.trim())
        .map((s) => ({
          title: s.title.trim(),
          publisher: s.publisher.trim() || 'Official Record',
          url: s.url.trim(),
        }));

      const parsedRules = formData.rules
        .split('\n')
        .map((r: string) => r.trim())
        .filter(Boolean);

      const payload = {
        id: formData.id,
        name: formData.name.trim(),
        slug: formData.slug.trim() || handleSlugify(formData.name),
        type: formData.type as PlaceType,
        summary: formData.summary.trim(),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        protection_status: formData.protection_status.trim() || null,
        established_year: formData.established_year ? parseInt(formData.established_year, 10) : null,
        area_km2: formData.area_km2 ? parseFloat(formData.area_km2) : null,
        status: formData.status as ContentStatus,
        is_demo: true,
        visit_guidance: {
          permits: formData.permits.trim() || undefined,
          best_season: formData.best_season.trim() || undefined,
          safety: formData.safety.trim() || undefined,
          rules: parsedRules,
        },
        sources: validSources,
      };

      const result = await savePlaceAction(payload);
      if (result.success) {
        router.push('/admin/places');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save place record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded text-sm font-mono">
          {error}
        </div>
      )}

      {/* Main Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input
            label="Place / Sanctuary Name"
            required
            value={formData.name}
            onChange={(e) => {
              const name = e.target.value;
              setFormData((prev) => ({
                ...prev,
                name,
                slug: prev.slug ? prev.slug : handleSlugify(name),
              }));
            }}
            placeholder="e.g. Sha’ab Rumi Reef"
          />
        </div>

        <div>
          <Input
            label="URL Slug"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. shaab-rumi-reef"
          />
        </div>

        <div>
          <Select
            label="Place Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as PlaceType })}
          >
            {Object.values(PlaceType).map((t) => (
              <option key={t} value={t}>
                {t.replace('_', ' ')}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Input
            label="Latitude (WGS84, e.g. 27.7289)"
            required
            type="number"
            step="0.0001"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          />
        </div>

        <div>
          <Input
            label="Longitude (WGS84, e.g. 34.2541)"
            required
            type="number"
            step="0.0001"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          />
        </div>

        <div>
          <Input
            label="Protection Status / Category"
            value={formData.protection_status}
            onChange={(e) => setFormData({ ...formData, protection_status: e.target.value })}
            placeholder="e.g. National Park (IUCN Category II)"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Established Year"
            type="number"
            value={formData.established_year}
            onChange={(e) => setFormData({ ...formData, established_year: e.target.value })}
            placeholder="1983"
          />
          <Input
            label="Area (km²)"
            type="number"
            step="0.1"
            value={formData.area_km2}
            onChange={(e) => setFormData({ ...formData, area_km2: e.target.value })}
            placeholder="480.0"
          />
        </div>
      </div>

      <div>
        <Textarea
          label="Summary & Biogeographic Character"
          required
          rows={3}
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          placeholder="Brief ecological and physical description of the place..."
        />
      </div>

      {/* Visit Guidance */}
      <div className="border border-stone-300 dark:border-stone-800 p-5 rounded space-y-4 bg-stone-50/50 dark:bg-stone-900/30">
        <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
          Responsible Visit Guidance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Permits & Ranger Fees"
            value={formData.permits}
            onChange={(e) => setFormData({ ...formData, permits: e.target.value })}
            placeholder="EEAA environmental pass required..."
          />
          <Input
            label="Optimal Season"
            value={formData.best_season}
            onChange={(e) => setFormData({ ...formData, best_season: e.target.value })}
            placeholder="March to May and October to November..."
          />
        </div>

        <Input
          label="Field Safety & Navigation Warnings"
          value={formData.safety}
          onChange={(e) => setFormData({ ...formData, safety: e.target.value })}
          placeholder="Strong drift currents, advanced diver level..."
        />

        <Textarea
          label="Mandatory Conservation Rules (one per line)"
          rows={3}
          value={formData.rules}
          onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
          placeholder="Zero single-use plastics&#10;Mineral reef-safe sunscreen&#10;No anchoring on live coral"
        />
      </div>

      {/* Sources */}
      <div className="border border-stone-300 dark:border-stone-800 p-5 rounded space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            Verified Scientific & Legal Sources
          </h3>
          <Button type="button" variant="outline" size="sm" onClick={addSource}>
            + Add Source
          </Button>
        </div>

        {sources.map((src, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end border-b border-stone-200 dark:border-stone-800 pb-3">
            <Input
              label="Source Title"
              value={src.title}
              onChange={(e) => updateSource(idx, 'title', e.target.value)}
              placeholder="e.g. EEAA Decree 1068/1983"
            />
            <Input
              label="Publisher"
              value={src.publisher}
              onChange={(e) => updateSource(idx, 'publisher', e.target.value)}
              placeholder="e.g. Ministry of Environment"
            />
            <div className="flex items-center gap-2">
              <Input
                label="URL"
                value={src.url}
                onChange={(e) => updateSource(idx, 'url', e.target.value)}
                placeholder="https://..."
              />
              {sources.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSource(idx)}
                  className="text-red-500 hover:text-red-700 text-xs font-mono mb-2"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/places')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : formData.id ? 'Update Place' : 'Create Place'}
        </Button>
      </div>
    </form>
  );
}
