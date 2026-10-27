import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Users,
  Mail,
  Plus,
  ExternalLink,
  Edit,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
} from 'lucide-react';
import {
  getProducts,
  getMakers,
  getStoreEnquiries,
  getStoreStats,
  isStoreFeatureEnabled,
} from '@/server/queries/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SampleBadge } from '@/components/ui/sample-badge';

export default async function AdminStorePage() {
  const isFeatureEnabled = isStoreFeatureEnabled();
  const [products, makers, enquiries, stats] = await Promise.all([
    getProducts(),
    getMakers(),
    getStoreEnquiries(),
    getStoreStats(),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-ink dark:text-paper">
              Makers & Heritage Crafts Administration
            </h1>
            <SampleBadge compact />
          </div>
          <p className="text-xs text-muted font-sans">
            Manage traditional artisans, craft dossiers, and direct acquisition inquiries (v1 zero-payment enquiry flow).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/store/makers/new"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono border border-rule rounded-sm hover:bg-paper-card dark:hover:bg-sea-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Artisan</span>
          </Link>

          <Link
            href="/admin/store/products/new"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold bg-coral-500 text-paper rounded-sm hover:bg-coral-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Craft Item</span>
          </Link>

          <Link
            href="/store?preview=true"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-muted hover:text-ink dark:hover:text-paper transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Storefront</span>
          </Link>
        </div>
      </div>

      {/* Feature Flag Banner */}
      <div className="p-4 rounded-sm border border-sand-500/30 bg-sand-500/10 dark:bg-sea-800/40 text-xs font-mono text-sand-800 dark:text-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sand-500" />
          <span>
            <strong>Feature Flag:</strong> `NEXT_PUBLIC_STORE_ENABLED` is currently{' '}
            <span className="uppercase font-bold underline">
              {isFeatureEnabled ? 'ENABLED (Live Catalogue)' : 'DISABLED (Waitlist & Evaluator Preview Only)'}
            </span>
          </span>
        </div>
        <span className="text-[11px] text-muted">
          v1 Architecture: Direct maker inquiry protocol • Zero checkout processing
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30">
          <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
            <span>Craft Items</span>
            <ShoppingBag className="w-4 h-4 text-coral-500" />
          </div>
          <div className="font-mono text-2xl font-bold text-ink dark:text-paper">
            {stats.productsCount}
          </div>
          <div className="font-mono text-[10px] text-muted mt-1">Available in catalog</div>
        </div>

        <div className="p-4 border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30">
          <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
            <span>Guild Artisans</span>
            <Users className="w-4 h-4 text-sand-500" />
          </div>
          <div className="font-mono text-2xl font-bold text-ink dark:text-paper">
            {stats.makersCount}
          </div>
          <div className="font-mono text-[10px] text-muted mt-1">Shalatin, Elba, Quseir, Sinai</div>
        </div>

        <div className="p-4 border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30">
          <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
            <span>Direct Inquiries</span>
            <Mail className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-mono text-2xl font-bold text-ink dark:text-paper">
            {stats.enquiriesCount}
          </div>
          <div className="font-mono text-[10px] text-muted mt-1">Inquiry queue logs</div>
        </div>
      </div>

      {/* Section 1: Craft Items Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">
            Craft Items Catalog ({products.length})
          </h2>
          <Link
            href="/admin/store/products/new"
            className="text-xs font-mono text-coral-500 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add Craft</span>
          </Link>
        </div>

        <div className="border border-rule rounded-sm overflow-hidden bg-paper-card dark:bg-sea-900/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-paper/80 dark:bg-sea-800/60 border-b border-rule text-muted">
                <tr>
                  <th className="p-3 w-12">Photo</th>
                  <th className="p-3">Title & Provenance</th>
                  <th className="p-3">Artisan</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Availability</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule/60">
                {products.map((item) => {
                  const img =
                    Array.isArray(item.images) && item.images[0]
                      ? item.images[0]
                      : 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80';
                  return (
                    <tr key={item.id} className="hover:bg-sand-500/5 transition-colors">
                      <td className="p-3">
                        <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-sand-200 shrink-0">
                          <Image src={img} alt={item.title} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-ink dark:text-paper font-sans">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{item.origin_place || 'Eastern Desert'}</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted">
                        {item.maker?.name || 'Artisan Guild'}
                      </td>
                      <td className="p-3 font-semibold text-ink dark:text-paper">
                        {item.price_amount ? `${item.price_amount} ${item.currency || 'EGP'}` : '—'}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={item.availability === 'AVAILABLE' ? 'sea' : 'sand'}
                          className="text-[10px]"
                        >
                          {item.availability}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/admin/store/products/${item.id}`}
                            className="p-1 hover:text-coral-500 transition-colors"
                            title="Edit craft"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/store/${item.slug}`}
                            target="_blank"
                            className="p-1 hover:text-sea-500 transition-colors"
                            title="View public"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 2: Guild Artisans Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">
            Guild Artisans & Communities ({makers.length})
          </h2>
          <Link
            href="/admin/store/makers/new"
            className="text-xs font-mono text-coral-500 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add Artisan</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {makers.map((m) => (
            <div
              key={m.id}
              className="p-4 border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-sand-200 shrink-0">
                  <Image
                    src={m.photo_id || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-sm font-bold text-ink dark:text-paper truncate">
                    {m.name}
                  </h3>
                  <div className="text-[10px] font-mono text-muted truncate">
                    {m.place_of_origin}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-rule/60 text-xs font-mono">
                <span className="text-[10px] text-muted">
                  {m.products?.length || 0} Crafts
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/store/makers/${m.id}`}
                    className="hover:text-coral-500 font-semibold"
                  >
                    Edit
                  </Link>
                  <span className="text-rule">•</span>
                  <Link
                    href={`/makers/${m.slug}`}
                    target="_blank"
                    className="hover:text-sea-500"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Direct Inquiries Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">
            Artisan Direct Enquiries Queue ({enquiries.length})
          </h2>
          <Badge variant="neutral" className="font-mono text-[10px]">
            Inquiry Protocol v1
          </Badge>
        </div>

        <div className="border border-rule rounded-sm overflow-hidden bg-paper-card dark:bg-sea-900/20">
          <div className="divide-y divide-rule/60">
            {enquiries.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-muted">
                No inquiries in the queue.
              </div>
            ) : (
              enquiries.map((enq) => (
                <div key={enq.id} className="p-4 space-y-2 hover:bg-sand-500/5 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink dark:text-paper font-sans">
                        {enq.name}
                      </span>
                      <span className="text-muted">({enq.email})</span>
                      <span className="text-rule">•</span>
                      <span className="text-sand-600 dark:text-sand-300 font-semibold">
                        Re: {enq.product?.title || 'Heritage Craft'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-muted">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </span>
                      <Badge
                        variant={enq.status === 'NEW' ? 'coral' : 'neutral'}
                        className="text-[9px] uppercase"
                      >
                        {enq.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-ink/80 dark:text-paper/80 bg-paper/60 dark:bg-sea-800/40 p-3 rounded-sm border border-rule/40 leading-relaxed">
                    {enq.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
