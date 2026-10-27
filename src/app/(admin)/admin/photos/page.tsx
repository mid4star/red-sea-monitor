import React from 'react';
import { getPhotoStories } from '@/server/queries/watch';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Camera } from 'lucide-react';

export default async function AdminPhotosPage() {
  const photos = await getPhotoStories({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Photo Stories Curation
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
          Curate community visual dispatches, feature highlight stories on the Watch hub, and verify location attributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-hidden bg-card space-y-3"
          >
            <div className="aspect-[4/3] bg-stone-950 relative">
              <img
                src={photo.image_url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                {photo.is_demo && <SampleBadge />}
              </div>
            </div>

            <div className="p-4 space-y-2 text-xs">
              <p className="font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
                {photo.caption}
              </p>
              <div className="font-mono text-[11px] text-stone-500 pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between">
                <span>{photo.location_label}</span>
                <span>By: {photo.submitter_name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
