'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, AlertCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { saveProductAction } from '@/server/actions/store';
import { ProductAvailability, ContentStatus } from '@prisma/client';

interface ProductEditorProps {
  initialData?: any;
  makers?: any[];
}

export function ProductEditor({ initialData, makers = [] }: ProductEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    maker_id: initialData?.maker_id || (makers[0]?.id || 'mkr-01'),
    description: initialData?.description || '',
    price_amount: initialData?.price_amount ? String(initialData.price_amount) : '1500',
    currency: initialData?.currency || 'EGP',
    materials: initialData?.materials || '',
    origin_place: initialData?.origin_place || '',
    availability: initialData?.availability || ProductAvailability.AVAILABLE,
    imageUrl: Array.isArray(initialData?.images) && initialData.images[0]
      ? initialData.images[0]
      : 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    status: initialData?.status || ContentStatus.PUBLISHED,
  });

  const handleSlugify = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .slice(0, 60);
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
        maker_id: formData.maker_id,
        description: formData.description.trim(),
        price_amount: parseFloat(formData.price_amount) || 0,
        currency: formData.currency,
        materials: formData.materials.trim(),
        origin_place: formData.origin_place.trim(),
        availability: formData.availability as ProductAvailability,
        enquiry_only: true,
        images: [formData.imageUrl.trim()],
        status: formData.status as ContentStatus,
        is_demo: true,
      };

      const result = await saveProductAction(payload);
      if (result.success) {
        router.push('/admin/store');
        router.refresh();
      } else {
        setError(result.error || 'Failed to save product.');
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
            Craft Title *
          </label>
          <Input
            type="text"
            required
            value={formData.title}
            onChange={(e) => {
              const val = e.target.value;
              setFormData((prev) => ({
                ...prev,
                title: val,
                slug: prev.id ? prev.slug : handleSlugify(val),
              }));
            }}
            placeholder="e.g. Wadi Doum Palm Handwoven Field Basket"
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
            placeholder="wadi-doum-field-basket"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Artisan / Guild *
          </label>
          <Select
            value={formData.maker_id}
            onChange={(e) => setFormData((prev) => ({ ...prev, maker_id: e.target.value }))}
          >
            {makers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.place_of_origin})
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Availability Status *
          </label>
          <Select
            value={formData.availability}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, availability: e.target.value as ProductAvailability }))
            }
          >
            <option value="AVAILABLE">AVAILABLE (Accepting Direct Inquiries)</option>
            <option value="COMING_SOON">COMING_SOON (Next Harvest / Batch)</option>
            <option value="SOLD_OUT">SOLD_OUT (Quota Exhausted)</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Estimated Field Price *
          </label>
          <Input
            type="number"
            required
            min="0"
            step="10"
            value={formData.price_amount}
            onChange={(e) => setFormData((prev) => ({ ...prev, price_amount: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Currency
          </label>
          <Input
            type="text"
            value={formData.currency}
            onChange={(e) => setFormData((prev) => ({ ...prev, currency: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
            Provenance Location *
          </label>
          <Input
            type="text"
            required
            value={formData.origin_place}
            onChange={(e) => setFormData((prev) => ({ ...prev, origin_place: e.target.value }))}
            placeholder="e.g. Shalatin, Halayeb District"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
          Natural Materials Specification *
        </label>
        <Input
          type="text"
          required
          value={formData.materials}
          onChange={(e) => setFormData((prev) => ({ ...prev, materials: e.target.value }))}
          placeholder="e.g. Wild Doum Palm Fronds, Vegetable-Tanned Camel Leather Thread"
        />
      </div>

      <div>
        <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
          Detailed Craft Description & Cultural Context *
        </label>
        <Textarea
          rows={4}
          required
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Describe harvest method, historical usage among desert/marine clans, and dimensions..."
        />
      </div>

      <div>
        <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
          Image URL
        </label>
        <Input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
          placeholder="https://..."
        />
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
          <span>{loading ? 'Saving...' : formData.id ? 'Update Craft Item' : 'Publish Craft Item'}</span>
        </Button>
      </div>
    </form>
  );
}
