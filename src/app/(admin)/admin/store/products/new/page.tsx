import React from 'react';
import { ProductEditor } from '@/components/admin/product-editor';
import { getMakers } from '@/server/queries/store';

export default async function NewProductPage() {
  const makers = await getMakers();

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-ink dark:text-paper">
          Add New Heritage Craft Item
        </h1>
        <p className="text-xs text-muted font-sans mt-0.5">
          Document an artisanal craft, its natural material provenance, and estimated acquisition value.
        </p>
      </div>

      <ProductEditor makers={makers} />
    </div>
  );
}
