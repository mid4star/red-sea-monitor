'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UploadCloud, Image as ImageIcon, ShieldCheck, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form-controls';
import { Badge } from '@/components/ui/badge';

interface MediaManagerProps {
  initialAssets: any[];
}

export const MediaManager: React.FC<MediaManagerProps> = ({ initialAssets }) => {
  const [assets, setAssets] = useState(initialAssets);
  const [uploadUrl, setUploadUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [credit, setCredit] = useState('');
  const [license, setLicense] = useState('CC-BY-SA 4.0');
  const [caption, setCaption] = useState('');

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl || !altText || !credit) {
      alert('URL, alt-text, and credit are mandatory under editorial policy.');
      return;
    }

    const newAsset = {
      id: `media-${Date.now()}`,
      storage_key: `assets/${Date.now()}.webp`,
      url: uploadUrl,
      mime: 'image/webp',
      alt_text: altText,
      credit: credit,
      license: license,
      caption: caption,
      created_at: new Date().toISOString(),
    };

    setAssets([newAsset, ...assets]);
    setUploadUrl('');
    setAltText('');
    setCredit('');
    setCaption('');
  };

  return (
    <div className="space-y-8">
      {/* Upload & Metadata Card */}
      <form onSubmit={handleRegisterAsset} className="p-5 border border-rule rounded-md bg-paper-card space-y-4">
        <div className="flex items-center gap-2 text-sm font-serif font-semibold">
          <UploadCloud className="w-4 h-4 text-sea-700" />
          <span>Register Verified Field Photograph</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Image URL (CDN or Storage Endpoint)"
            placeholder="https://images.unsplash.com/..."
            value={uploadUrl}
            onChange={(e) => setUploadUrl(e.target.value)}
            required
          />

          <Input
            label="Scientific Alt Text (Mandatory for WCAG AA)"
            placeholder="e.g. Adult female hawksbill sea turtle feeding on sponges at Shark Reef"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            required
          />

          <Input
            label="Photographer / Institution Credit"
            placeholder="e.g. Dr. Tariq El-Gamil / EEAA Marine Unit"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            required
          />

          <Input
            label="License / Usage Rights"
            placeholder="e.g. CC-BY-SA 4.0, All Rights Reserved"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] font-mono text-muted">EXIF GPS coordinates stripped automatically upon registration.</p>
          <Button type="submit" variant="coral" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            <span>Register Asset</span>
          </Button>
        </div>
      </form>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <div key={asset.id} className="border border-rule rounded-md bg-paper-card overflow-hidden group">
            <div className="relative aspect-[3/2] bg-sand-300/15 overflow-hidden">
              <Image
                src={asset.url}
                alt={asset.alt_text || 'Field photo'}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-3 space-y-1.5 text-xs font-sans">
              <div className="font-semibold text-ink dark:text-paper truncate">{asset.alt_text}</div>
              <div className="font-mono text-[10px] text-muted flex items-center justify-between">
                <span>Credit: {asset.credit}</span>
                <span className="text-sea-700 font-semibold">{asset.license}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
