'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { saveSpeciesAction } from '@/server/actions/explorer';
import { SpeciesGroup, IucnStatus, ContentStatus } from '@prisma/client';

interface SpeciesEditorProps {
  initialData?: any;
}

const ALL_MONTHS = [
  { num: 1, name: 'Jan' },
  { num: 2, name: 'Feb' },
  { num: 3, name: 'Mar' },
  { num: 4, name: 'Apr' },
  { num: 5, name: 'May' },
  { num: 6, name: 'Jun' },
  { num: 7, name: 'Jul' },
  { num: 8, name: 'Aug' },
  { num: 9, name: 'Sep' },
  { num: 10, name: 'Oct' },
  { num: 11, name: 'Nov' },
  { num: 12, name: 'Dec' },
];

export function SpeciesEditor({ initialData }: SpeciesEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    common_name: initialData?.common_name || '',
    scientific_name: initialData?.scientific_name || '',
    slug: initialData?.slug || '',
    group: initialData?.group || SpeciesGroup.FISH,
    iucn_status: initialData?.iucn_status || IucnStatus.LC,
    description: initialData?.description || '',
    habitat: initialData?.habitat || '',
    diet: initialData?.diet || '',
    threats: initialData?.threats || '',
    is_sensitive: initialData?.is_sensitive ?? false,
    gbif: initialData?.external_ids?.gbif || '',
    worms: initialData?.external_ids?.worms || '',
    inaturalist: initialData?.external_ids?.inaturalist || '',
    iucn_id: initialData?.external_ids?.iucn || '',
    status: initialData?.status || ContentStatus.PUBLISHED,
  });

  const [seasonalMonths, setSeasonalMonths] = useState<number[]>(
    initialData?.seasonal_months || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  );

  const [sources, setSources] = useState<any[]>(
    initialData?.sources || [{ title: '', publisher: '', url: '' }]
  );

  const handleSlugify = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const toggleMonth = (num: number) => {
    if (seasonalMonths.includes(num)) {
      setSeasonalMonths(seasonalMonths.filter((m) => m !== num));
    } else {
      setSeasonalMonths([...seasonalMonths, num].sort((a, b) => a - b));
    }
  };

  const selectAllMonths = () => {
    setSeasonalMonths([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
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
          publisher: s.publisher.trim() || 'Scientific Assessment',
          url: s.url.trim(),
        }));

      const payload = {
        id: formData.id,
        common_name: formData.common_name.trim(),
        scientific_name: formData.scientific_name.trim(),
        slug: formData.slug.trim() || handleSlugify(formData.common_name),
        group: formData.group as SpeciesGroup,
        iucn_status: formData.iucn_status as IucnStatus,
        description: formData.description.trim(),
        habitat: formData.habitat.trim() || null,
        diet: formData.diet.trim() || null,
        threats: formData.threats.trim() || null,
        is_sensitive: formData.is_sensitive,
        external_ids: {
          gbif: formData.gbif.trim() || null,
          worms: formData.worms.trim() || null,
          inaturalist: formData.inaturalist.trim() || null,
          iucn: formData.iucn_id.trim() || null,
        },
        seasonal_months: seasonalMonths,
        sources: validSources,
        status: formData.status as ContentStatus,
        is_demo: true,
      };

      const result = await saveSpeciesAction(payload);
      if (result.success) {
        router.push('/admin/species');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save species record.');
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

      {/* Main Taxonomic Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Common Name"
            required
            value={formData.common_name}
            onChange={(e) => {
              const common_name = e.target.value;
              setFormData((prev) => ({
                ...prev,
                common_name,
                slug: prev.slug ? prev.slug : handleSlugify(common_name),
              }));
            }}
            placeholder="e.g. Green Sea Turtle"
          />
        </div>

        <div>
          <Input
            label="Scientific Name"
            required
            value={formData.scientific_name}
            onChange={(e) => setFormData({ ...formData, scientific_name: e.target.value })}
            placeholder="e.g. Chelonia mydas"
          />
        </div>

        <div>
          <Input
            label="URL Slug"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. green-sea-turtle"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Select
            label="Taxonomic Group"
            value={formData.group}
            onChange={(e) => setFormData({ ...formData, group: e.target.value as SpeciesGroup })}
          >
            {Object.values(SpeciesGroup).map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>

          <Select
            label="IUCN Red List Status"
            value={formData.iucn_status}
            onChange={(e) => setFormData({ ...formData, iucn_status: e.target.value as IucnStatus })}
          >
            {Object.values(IucnStatus).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Textarea
          label="Morphology & Biological Overview"
          required
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Morphological description, ecological niche, distinguishing features..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            label="Habitat & Depth Zone"
            value={formData.habitat}
            onChange={(e) => setFormData({ ...formData, habitat: e.target.value })}
            placeholder="e.g. Shallow seagrass beds 1m–15m"
          />
        </div>
        <div>
          <Input
            label="Diet & Foraging Ecology"
            value={formData.diet}
            onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
            placeholder="e.g. Herbivorous on Halophila"
          />
        </div>
        <div>
          <Input
            label="Primary Threats"
            value={formData.threats}
            onChange={(e) => setFormData({ ...formData, threats: e.target.value })}
            placeholder="e.g. Boat strikes, plastic debris"
          />
        </div>
      </div>

      {/* Sensitive Taxon Toggle */}
      <div className="border border-stone-300 dark:border-stone-800 p-4 rounded bg-stone-50 dark:bg-stone-900/40 flex items-center justify-between gap-4">
        <div>
          <label className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 block cursor-pointer">
            Sensitive Taxon (Enable Coordinate Spatial Blurring)
          </label>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            When enabled, public observation sighting coordinates will be automatically blurred to an ~11km grid cell to safeguard nesting or nursery sites from harassment and poaching.
          </p>
        </div>
        <input
          type="checkbox"
          checked={formData.is_sensitive}
          onChange={(e) => setFormData({ ...formData, is_sensitive: e.target.checked })}
          className="h-5 w-5 rounded border-stone-300 text-primary focus:ring-primary cursor-pointer"
        />
      </div>

      {/* Seasonal Months Selector */}
      <div className="border border-stone-300 dark:border-stone-800 p-4 rounded space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold">
            Seasonal Presence & Active Breeding Months
          </label>
          <button
            type="button"
            onClick={selectAllMonths}
            className="text-xs font-mono text-primary hover:underline"
          >
            Select All Year
          </button>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {ALL_MONTHS.map((m) => {
            const active = seasonalMonths.includes(m.num);
            return (
              <button
                key={m.num}
                type="button"
                onClick={() => toggleMonth(m.num)}
                className={`py-1.5 px-1 rounded text-xs font-mono transition-colors text-center ${
                  active
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* External Biodiversity Identifiers */}
      <div className="border border-stone-300 dark:border-stone-800 p-4 rounded space-y-3">
        <h4 className="font-mono text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold">
          Taxonomic Registry Identifiers
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Input
            label="WoRMS AphiaID"
            value={formData.worms}
            onChange={(e) => setFormData({ ...formData, worms: e.target.value })}
            placeholder="137206"
          />
          <Input
            label="GBIF Taxon Key"
            value={formData.gbif}
            onChange={(e) => setFormData({ ...formData, gbif: e.target.value })}
            placeholder="2442220"
          />
          <Input
            label="iNaturalist ID"
            value={formData.inaturalist}
            onChange={(e) => setFormData({ ...formData, inaturalist: e.target.value })}
            placeholder="39666"
          />
          <Input
            label="IUCN Taxon ID"
            value={formData.iucn_id}
            onChange={(e) => setFormData({ ...formData, iucn_id: e.target.value })}
            placeholder="4615"
          />
        </div>
      </div>

      {/* Sources */}
      <div className="border border-stone-300 dark:border-stone-800 p-5 rounded space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            Verified Scientific Literature & Assessments
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
              placeholder="e.g. IUCN Red List Assessment"
            />
            <Input
              label="Publisher"
              value={src.publisher}
              onChange={(e) => updateSource(idx, 'publisher', e.target.value)}
              placeholder="e.g. IUCN SSC"
            />
            <div className="flex items-center gap-2">
              <Input
                label="URL / DOI"
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
          onClick={() => router.push('/admin/species')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : formData.id ? 'Update Species' : 'Create Species'}
        </Button>
      </div>
    </form>
  );
}
