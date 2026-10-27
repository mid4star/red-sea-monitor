import React from 'react';
import { notFound } from 'next/navigation';
import { ProductEditor } from '@/components/admin/product-editor';
import { getProductById, getMakers } from '@/server/queries/store';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, makers] = await Promise.all([getProductById(id), getMakers()]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-ink dark:text-paper">
          Edit Craft Item: {product.title}
        </h1>
        <p className="text-xs text-muted font-sans mt-0.5">
          Update specifications, pricing estimate, materials provenance, and artisan association.
        </p>
      </div>

      <ProductEditor initialData={product} makers={makers} />
    </div>
  );
}
