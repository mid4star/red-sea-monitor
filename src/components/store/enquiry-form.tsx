'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShoppingBag, ShieldCheck, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/form-controls';
import { submitProductEnquiryAction } from '@/server/actions/store';

interface ProductEnquiryFormProps {
  productId: string;
  productTitle: string;
  makerName: string;
  priceAmount?: number | null;
  currency?: string;
}

export const ProductEnquiryForm: React.FC<ProductEnquiryFormProps> = ({
  productId,
  productTitle,
  makerName,
  priceAmount,
  currency = 'EGP',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    `Hello, I would like to enquire about acquiring "${productTitle}" crafted by ${makerName}. Please let me know current availability, dispatch timelines, and field pickup options.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    try {
      const res = await submitProductEnquiryAction(null, formData);
      if (res.success) {
        setStatus({
          type: 'success',
          message:
            res.message ||
            'Enquiry dispatched. Our cultural coordinator will contact you via email with logistics and maker coordination.',
        });
        setName('');
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to dispatch enquiry. Please verify the fields.',
        });
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An error occurred while dispatching your enquiry.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-rule rounded-sm bg-paper-card dark:bg-sea-900/30 p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-coral-500" />
            <h3 className="font-serif text-lg font-bold text-ink dark:text-paper">
              Enquire About This Heritage Craft
            </h3>
          </div>
          <p className="text-xs text-muted font-sans">
            Direct artisan liaison protocol. Zero payment processing or third-party margins.
          </p>
        </div>

        {priceAmount ? (
          <div className="text-right shrink-0">
            <div className="font-mono text-xl font-bold text-ink dark:text-paper">
              {priceAmount.toLocaleString()} <span className="text-xs font-normal text-muted">{currency}</span>
            </div>
            <div className="font-mono text-[10px] text-muted uppercase">Estimated Field Value</div>
          </div>
        ) : null}
      </div>

      <div className="p-3 mb-6 bg-sand-500/10 dark:bg-sea-800/40 border border-sand-500/20 dark:border-sea-700/50 rounded-sm text-xs font-sans text-sand-800 dark:text-sand-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-sand-600 dark:text-sand-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-ink dark:text-paper">Artisan Direct Protocol:</strong> Red Sea Monitor does not process commercial checkout transactions. We facilitate direct communication between patrons, conservation researchers, and traditional community artisans in Shalatin, Gabal Elba, and Al-Quseir.
        </p>
      </div>

      {status?.type === 'success' ? (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-sm text-emerald-800 dark:text-emerald-200 text-xs font-sans space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Enquiry Dispatched Successfully</span>
          </div>
          <p className="leading-relaxed">{status.message}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatus(null)}
            className="mt-2 text-xs"
          >
            Send Another Enquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status?.type === 'error' && (
            <div className="p-3 bg-coral-500/10 border border-coral-500/30 rounded-sm text-coral-700 dark:text-coral-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
                Your Full Name *
              </label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Maya Hassan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
                Contact Email *
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@institution.org"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-ink dark:text-paper mb-1">
              Enquiry Details & Logistics Notes *
            </label>
            <Textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Specify intended quantity, delivery preference (Red Sea coast pickup vs Cairo courier), or bespoke sizing requirements..."
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-sea-600 dark:text-sea-400" />
              <span>Direct craft liaison • No payment card needed</span>
            </div>

            <Button type="submit" disabled={isSubmitting} variant="coral" className="gap-2">
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting...' : 'Submit Craft Enquiry'}</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
