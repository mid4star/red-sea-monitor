import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPhotoStories } from '@/server/queries/watch';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SampleBadge } from '@/components/ui/sample-badge';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Photo Stories — Red Sea Watch',
  description: 'Visual field stories and underwater documentation from observers across the Red Sea basin.',
};

export default async function PhotoStoriesPage() {
  const stories = await getPhotoStories({ limit: 40 });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Watch', href: '/watch' },
          { label: 'Photo Stories' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-primary border border-primary px-2.5 py-0.5 rounded">
              Visual Field Journal
            </span>
            <SampleBadge />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Community Photo Stories
          </h1>
          <p className="font-serif text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            Photographic records contributed by divers, marine rangers, and expedition crews documenting benthic health and species behavior.
          </p>
        </div>

        <div>
          <Link
            href="/watch/submit"
            className="inline-flex items-center gap-2 font-sans font-medium bg-sea-900 text-paper hover:bg-sea-700 px-4 py-2 rounded text-xs"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Submit a Photo Story</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <article
            key={story.id}
            className="border border-stone-300 dark:border-stone-800 rounded-sm overflow-hidden bg-card space-y-3 group"
          >
            <div className="aspect-[4/3] bg-stone-950 overflow-hidden relative">
              <img
                src={story.image_url}
                alt={story.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                {story.is_demo && <SampleBadge />}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="font-serif text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                {story.caption}
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 pt-3 border-t border-stone-200 dark:border-stone-800">
                <span>{story.location_label}</span>
                <span>Photo: {story.submitter_name}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
