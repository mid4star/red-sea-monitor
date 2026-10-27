import React from 'react';
import { notFound } from 'next/navigation';
import { MakerEditor } from '@/components/admin/maker-editor';
import { getMakerById } from '@/server/queries/store';

interface EditMakerPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMakerPage({ params }: EditMakerPageProps) {
  const { id } = await params;
  const maker = await getMakerById(id);

  if (!maker) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-ink dark:text-paper">
          Edit Artisan Profile: {maker.name}
        </h1>
        <p className="text-xs text-muted font-sans mt-0.5">
          Update artisan biographical notes, customary ecological safeguards, and craft specialties.
        </p>
      </div>

      <MakerEditor initialData={maker} />
    </div>
  );
}
