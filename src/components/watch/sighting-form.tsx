'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea, Select } from '@/components/ui/form-controls';
import { submitSightingAction } from '@/server/actions/watch';
import { ObservationType } from '@prisma/client';
import { blurCoordinates } from '@/lib/geo';
import { MapPin, Shield, CheckCircle } from 'lucide-react';

export function SightingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    reported_common_name: '',
    observation_type: ObservationType.MARINE as ObservationType,
    count: '1',
    behavior: '',
    notes: '',
    observed_at: new Date().toISOString().slice(0, 16),
    latitude: '25.0667',
    longitude: '34.8833',
    location_label: '',
    reporter_name: '',
    reporter_email: '',
    photo_url: '',
    consent_publish: true,
    consent_data_share: true,
  });

  const sensitiveKeywords = ['dugong', 'turtle', 'chelonia', 'eretmochelys', 'shark', 'carcharhinus', 'rhincodon'];
  const isSensitive = sensitiveKeywords.some((k) =>
    formData.reported_common_name.toLowerCase().includes(k)
  );

  const latNum = parseFloat(formData.latitude) || 25.0667;
  const lngNum = parseFloat(formData.longitude) || 34.8833;
  const blurredPreview = blurCoordinates(latNum, lngNum);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmittedMessage(null);

    try {
      const res = await submitSightingAction({
        reported_common_name: formData.reported_common_name.trim(),
        observation_type: formData.observation_type,
        count: parseInt(formData.count, 10) || 1,
        behavior: formData.behavior.trim() || undefined,
        notes: formData.notes.trim() || undefined,
        observed_at: formData.observed_at,
        latitude: latNum,
        longitude: lngNum,
        location_label: formData.location_label.trim(),
        reporter_name: formData.reporter_name.trim(),
        reporter_email: formData.reporter_email.trim(),
        consent_publish: formData.consent_publish,
        consent_data_share: formData.consent_data_share,
        photo_url: formData.photo_url.trim() || undefined,
      });

      if (res.success) {
        setSubmittedMessage(res.message);
        // Reset form
        setFormData({
          reported_common_name: '',
          observation_type: ObservationType.MARINE,
          count: '1',
          behavior: '',
          notes: '',
          observed_at: new Date().toISOString().slice(0, 16),
          latitude: '25.0667',
          longitude: '34.8833',
          location_label: '',
          reporter_name: '',
          reporter_email: '',
          photo_url: '',
          consent_publish: true,
          consent_data_share: true,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  if (submittedMessage) {
    return (
      <div className="border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-8 rounded text-center space-y-4 max-w-2xl mx-auto">
        <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
        <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
          Field Observation Successfully Received
        </h3>
        <p className="font-serif text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
          {submittedMessage}
        </p>
        <div className="pt-2">
          <Button onClick={() => setSubmittedMessage(null)} variant="outline">
            Submit Another Sighting
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded text-sm font-mono">
          {error}
        </div>
      )}

      {/* Observation Species & Type */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <span className="font-mono text-xs font-bold text-primary uppercase">01 /</span>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Wildlife Identification
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Reported Species / Common Name"
              required
              value={formData.reported_common_name}
              onChange={(e) => setFormData({ ...formData, reported_common_name: e.target.value })}
              placeholder="e.g. Dugong, Green Sea Turtle, Oceanic Whitetip Shark..."
            />
          </div>

          <div>
            <Select
              label="Observation Category"
              value={formData.observation_type}
              onChange={(e) => setFormData({ ...formData, observation_type: e.target.value as ObservationType })}
            >
              <option value="MARINE">Marine Organism</option>
              <option value="BIRD">Coastal / Sea Bird</option>
              <option value="OTHER_WILDLIFE">Desert / Mangrove Wildlife</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Individual Count"
            type="number"
            min="1"
            required
            value={formData.count}
            onChange={(e) => setFormData({ ...formData, count: e.target.value })}
          />

          <Input
            label="Observation Date & Time"
            type="datetime-local"
            required
            value={formData.observed_at}
            onChange={(e) => setFormData({ ...formData, observed_at: e.target.value })}
          />
        </div>

        <Input
          label="Observed Behavior"
          value={formData.behavior}
          onChange={(e) => setFormData({ ...formData, behavior: e.target.value })}
          placeholder="e.g. Foraging on Halophila seagrass, cruising along outer wall..."
        />

        <Textarea
          label="Field Notes & Conditions"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Estimated depth, water clarity, vessel proximity, injuries or tags..."
        />
      </div>

      {/* Geospatial Placement & Privacy */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <span className="font-mono text-xs font-bold text-primary uppercase">02 /</span>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Field Location & Spatial Privacy
          </h3>
        </div>

        <Input
          label="Location Name / Bay / Reef"
          required
          value={formData.location_label}
          onChange={(e) => setFormData({ ...formData, location_label: e.target.value })}
          placeholder="e.g. Marsa Abu Dabbab, Elphinstone North Plateau, Ras Mohammed..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Latitude (WGS84)"
            type="number"
            step="0.0001"
            required
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          />

          <Input
            label="Longitude (WGS84)"
            type="number"
            step="0.0001"
            required
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          />
        </div>

        {/* Spatial Privacy Indicator */}
        <div className="border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 p-4 rounded text-xs space-y-2">
          <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-medium">
            <Shield className="w-4 h-4 text-primary shrink-0" />
            <span>Automatic Wildlife Safeguard System</span>
          </div>

          {isSensitive ? (
            <div className="space-y-1">
              <span className="font-mono font-semibold text-amber-700 dark:text-amber-400 block">
                Sensitive Taxon Detected: Public coordinates will be blurred to ~11km grid centroid.
              </span>
              <p className="text-stone-600 dark:text-stone-400 font-mono text-[11px]">
                Public Map Display: {blurredPreview.lat}°N, {blurredPreview.lng}°E ±11km (Protected)
              </p>
            </div>
          ) : (
            <p className="text-stone-600 dark:text-stone-400 font-sans">
              Exact GPS coordinates are visible only to verified scientific reviewers. Public map markers for non-sensitive species display at site precision.
            </p>
          )}
        </div>
      </div>

      {/* Photo Attachment */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <span className="font-mono text-xs font-bold text-primary uppercase">03 /</span>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Photo Documentation (Optional)
          </h3>
        </div>

        <Input
          label="Photo Image URL"
          value={formData.photo_url}
          onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
          placeholder="https://..."
          helperText="Direct URL to photograph or cloud drive preview"
        />
      </div>

      {/* Observer Credentials */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <span className="font-mono text-xs font-bold text-primary uppercase">04 /</span>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Observer Verification
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Observer Full Name"
            required
            value={formData.reporter_name}
            onChange={(e) => setFormData({ ...formData, reporter_name: e.target.value })}
            placeholder="e.g. Mahmoud Soliman"
          />

          <Input
            label="Contact Email (Private)"
            type="email"
            required
            value={formData.reporter_email}
            onChange={(e) => setFormData({ ...formData, reporter_email: e.target.value })}
            placeholder="e.g. soliman@domain.eg"
            helperText="Never shared publicly; used solely if our scientists need photo verification"
          />
        </div>

        <div className="space-y-2.5 pt-2">
          <label className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consent_publish}
              onChange={(e) => setFormData({ ...formData, consent_publish: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-stone-300 text-primary"
            />
            <span>I allow Red Sea Monitor to publish this photo and observation record with credit. (Required)</span>
          </label>

          <label className="flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-400 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent_data_share}
              onChange={(e) => setFormData({ ...formData, consent_data_share: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-stone-300 text-primary"
            />
            <span>I also allow reuse under CC BY-SA 4.0 for open marine science research and regional conservation archives. (Optional)</span>
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
        <Button type="submit" disabled={loading} size="lg">
          {loading ? 'Submitting Observation...' : 'Submit Sighting to Red Sea Watch'}
        </Button>
      </div>
    </form>
  );
}
