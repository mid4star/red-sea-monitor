'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { saveRouteAction } from '@/server/actions/explorer';
import { ContentStatus } from '@prisma/client';

interface RouteEditorProps {
  initialData?: any;
}

export function RouteEditor({ initialData }: RouteEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    summary: initialData?.summary || '',
    difficulty: initialData?.difficulty || 'Moderate',
    duration_hours: initialData?.duration_hours ? String(initialData.duration_hours) : '',
    distance_km: initialData?.distance_km ? String(initialData.distance_km) : '',
    season: initialData?.season || '',
    safety_notes: initialData?.safety_notes || '',
    permits_notes: initialData?.permits_notes || '',
    status: initialData?.status || ContentStatus.PUBLISHED,
  });

  const [stops, setStops] = useState<any[]>(
    initialData?.stops || [
      { order: 1, name: '', note: '' },
    ]
  );

  const handleSlugify = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const addStop = () => {
    setStops([...stops, { order: stops.length + 1, name: '', note: '' }]);
  };

  const updateStop = (index: number, field: string, val: any) => {
    const updated = [...stops];
    updated[index][field] = val;
    setStops(updated);
  };

  const removeStop = (index: number) => {
    const filtered = stops.filter((_, i) => i !== index);
    // re-order
    setStops(filtered.map((s, idx) => ({ ...s, order: idx + 1 })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const validStops = stops
        .filter((s) => s.name.trim())
        .map((s, idx) => ({
          order: idx + 1,
          name: s.name.trim(),
          note: s.note?.trim() || null,
        }));

      const payload = {
        id: formData.id,
        title: formData.title.trim(),
        slug: formData.slug.trim() || handleSlugify(formData.title),
        summary: formData.summary.trim(),
        difficulty: formData.difficulty as 'Easy' | 'Moderate' | 'Demanding',
        duration_hours: formData.duration_hours ? parseFloat(formData.duration_hours) : null,
        distance_km: formData.distance_km ? parseFloat(formData.distance_km) : null,
        season: formData.season.trim() || null,
        safety_notes: formData.safety_notes.trim() || null,
        permits_notes: formData.permits_notes.trim() || null,
        stops: validStops,
        status: formData.status as ContentStatus,
        is_demo: true,
      };

      const result = await saveRouteAction(payload);
      if (result.success) {
        router.push('/admin/routes');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save route record.');
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
            label="Route / Transect Title"
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
            placeholder="e.g. Hamata Mangrove to Marsa Nayzak Transect"
          />
        </div>

        <div>
          <Input
            label="URL Slug"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. hamata-mangrove-transect"
          />
        </div>

        <div>
          <Select
            label="Route Difficulty Grade"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
          >
            <option value="Easy">Easy (Coastal Walk / Snorkel)</option>
            <option value="Moderate">Moderate (Desert Trail / Dayboat)</option>
            <option value="Demanding">Demanding (Offshore Liveaboard / Remote)</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Distance (km)"
            type="number"
            step="0.1"
            value={formData.distance_km}
            onChange={(e) => setFormData({ ...formData, distance_km: e.target.value })}
            placeholder="48.0"
          />
          <Input
            label="Duration (hours)"
            type="number"
            step="0.5"
            value={formData.duration_hours}
            onChange={(e) => setFormData({ ...formData, duration_hours: e.target.value })}
            placeholder="6.0"
          />
        </div>

        <div>
          <Input
            label="Recommended Season"
            value={formData.season}
            onChange={(e) => setFormData({ ...formData, season: e.target.value })}
            placeholder="October – April"
          />
        </div>
      </div>

      <div>
        <Textarea
          label="Summary & Route Overview"
          required
          rows={3}
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          placeholder="Brief description of terrain, benthic habitats, and survey objectives..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Textarea
            label="Environmental Permits & Authorizations"
            rows={2}
            value={formData.permits_notes}
            onChange={(e) => setFormData({ ...formData, permits_notes: e.target.value })}
            placeholder="Wadi El Gemal National Park clearance..."
          />
        </div>
        <div>
          <Textarea
            label="Field Safety & Navigation Caution"
            rows={2}
            value={formData.safety_notes}
            onChange={(e) => setFormData({ ...formData, safety_notes: e.target.value })}
            placeholder="Minimum 4L water, GPS beacon required..."
          />
        </div>
      </div>

      {/* Itinerary Waypoints */}
      <div className="border border-stone-300 dark:border-stone-800 p-5 rounded space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            Itinerary Waypoints & Stops
          </h3>
          <Button type="button" variant="outline" size="sm" onClick={addStop}>
            + Add Stop
          </Button>
        </div>

        {stops.map((stop, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end border-b border-stone-200 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-stone-400 w-5">
                #{idx + 1}
              </span>
              <Input
                label="Stop Name"
                value={stop.name}
                onChange={(e) => updateStop(idx, 'name', e.target.value)}
                placeholder="e.g. Qulaan Mangrove Delta"
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <Input
                label="Stop Note / Ecological Feature"
                value={stop.note || ''}
                onChange={(e) => updateStop(idx, 'note', e.target.value)}
                placeholder="Tidal mangrove ecosystem observation..."
              />
              {stops.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStop(idx)}
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
          onClick={() => router.push('/admin/routes')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : formData.id ? 'Update Route' : 'Create Route'}
        </Button>
      </div>
    </form>
  );
}
