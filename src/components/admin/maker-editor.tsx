'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { saveMakerAction } from '@/server/actions/store';
import { ContentStatus } from '@prisma/client';

interface MakerEditorProps {
  initialData?: any;
}

export function MakerEditor({ initialData }: MakerEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialStory = initialData?.story || {};

  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    place_of_origin: initialData?.place_of_origin || '',
    photo_id:
      initialData?.photo_id ||
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    bio: initialStory.bio || '',
    technique: initialStory.technique || '',
    heritage_region: initialStory.heritage_region || '',
    conservation_note: initialStory.conservation_note || '',
    status: initialData?.status || ContentStatus.PUBLISHED,
  });

  const handleSlugify = (name: string) => {
    return name
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
        name: formData.name.trim(),
        slug: formData.slug.trim() || handleSlugify(formData.name),
        place_of_origin: formData.place_of_origin.trim(),
        photo_id: formData.photo_id.trim() || null,
        story: {
          bio: formData.bio.trim(),
          technique: formData.technique.trim() || undefined,
          heritage_region: formData.heritage_region.trim() || undefined,
          conservation_note: formData.conservation_note.trim() || undefined,
        },
        links: initialData?.links || {},
        status: formData.status as ContentStatus,
        is_demo: true,
      };

      const result = await saveMakerAction(payload);
      if (result.success) {
        router.push('/admin/store');
        router.refresh();
      } else {
        setError(result.error || 'Failed to save maker.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="p-4 rounded-sm border border-coral-500/30 bg-coral-500/10 text-coral-700 dark:text-coral-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Artisan / Guild Name *
          </label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={(e) => {
              const val = e.target.value;
              setFormData((prev) => ({
                ...prev,
                name: val,
                slug: prev.id ? prev.slug : handleSlugify(val),
              }));
            }}
            placeholder="e.g. Fatima Al-Abadi & The Shalatin Palm Guild"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            URL Slug *
          </label>
          <Input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            placeholder="fatima-al-abadi-shalatin"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Place of Origin / Village *
          </label>
          <Input
            type="text"
            required
            value={formData.place_of_origin}
            onChange={(e) => setFormData((prev) => ({ ...prev, place_of_origin: e.target.value }))}
            placeholder="e.g. Shalatin, Halayeb Triangle"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Heritage Region
          </label>
          <Input
            type="text"
            value={formData.heritage_region}
            onChange={(e) => setFormData((prev) => ({ ...prev, heritage_region: e.target.value }))}
            placeholder="e.g. Southern Eastern Desert"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
          Portrait / Workshop Image URL
        </label>
        <Input
          type="url"
          value={formData.photo_id}
          onChange={(e) => setFormData((prev) => ({ ...prev, photo_id: e.target.value }))}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
          Artisan Biography & Lineage *
        </label>
        <Textarea
          rows={4}
          required
          value={formData.bio}
          onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
          placeholder="Generational context, tribal affiliation (Ababda, Bishari, Bedouin, Quseiri), and workshop background..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Traditional Craft Technique
          </label>
          <Textarea
            rows={3}
            value={formData.technique}
            onChange={(e) => setFormData((prev) => ({ ...prev, technique: e.target.value }))}
            placeholder="e.g. Traditional hand-twining with vegetable-tanned camel hide stringing..."
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Conservation Safeguards & Customary Law (Urf)
          </label>
          <Textarea
            rows={3}
            value={formData.conservation_note}
            onChange={(e) => setFormData((prev) => ({ ...prev, conservation_note: e.target.value }))}
            placeholder="e.g. Harvest quotas leave 70% of wild seed heads intact for flora regeneration..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-rule">
        <Link
          href="/admin/store"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ink dark:hover:text-paper"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Return</span>
        </Link>

        <Button type="submit" disabled={loading} variant="coral" className="gap-2">
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : formData.id ? 'Update Artisan Profile' : 'Publish Artisan Profile'}</span>
        </Button>
      </div>
    </form>
  );
}
