'use client';

import React, { useState } from 'react';
import { Copy, Check, Quote, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CitationBlockProps {
  title: string;
  authors: string[];
  publishedYear: number;
  slug: string;
  url: string;
}

export const CitationBlock: React.FC<CitationBlockProps> = ({
  title,
  authors,
  publishedYear,
  slug,
  url,
}) => {
  const [copiedFormat, setCopiedFormat] = useState<'apa' | 'bibtex' | null>(null);

  const authorString = authors.length > 0 ? authors.join(', ') : 'Red Sea Monitor Editorial Board';

  // APA 7th Edition format
  const apaCitation = `${authorString} (${publishedYear}). ${title}. Red Sea Monitor. ${url}`;

  // BibTeX format
  const bibtexCitation = `@article{rsm_${slug.replace(/[^a-zA-Z0-9]/g, '_')},
  title = {${title}},
  author = {${authorString}},
  journal = {Red Sea Monitor},
  year = {${publishedYear}},
  url = {${url}}
}`;

  const copyToClipboard = (text: string, format: 'apa' | 'bibtex') => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div className="border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-6 space-y-4 my-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-sea-700 dark:text-sea-500" />
          <h4 className="font-serif text-base font-semibold text-ink dark:text-paper">
            Cite this Investigation
          </h4>
        </div>
        <span className="font-mono text-xs text-muted">Academic Reference</span>
      </div>

      <p className="font-sans text-xs text-muted leading-relaxed">
        Red Sea Monitor publishes original field investigations under scientific citation ethics. You may reference this work in academic research, reports, and journalism.
      </p>

      {/* Formats Copy Buttons */}
      <div className="space-y-3 font-mono text-xs">
        {/* APA */}
        <div className="p-3 rounded border border-rule/60 bg-paper dark:bg-deep-sea flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-muted leading-relaxed select-all overflow-x-auto text-[11px]">
            {apaCitation}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(apaCitation, 'apa')}
            className="shrink-0 text-[11px] h-8"
          >
            {copiedFormat === 'apa' ? (
              <span className="flex items-center gap-1 text-[#2E7D32]">
                <Check className="w-3.5 h-3.5" />
                <span>Copied APA</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy className="w-3.5 h-3.5" />
                <span>Copy APA</span>
              </span>
            )}
          </Button>
        </div>

        {/* BibTeX */}
        <div className="p-3 rounded border border-rule/60 bg-paper dark:bg-deep-sea flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-muted text-[11px]">BibTeX format for LaTeX / Reference Managers</div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(bibtexCitation, 'bibtex')}
            className="shrink-0 text-[11px] h-8"
          >
            {copiedFormat === 'bibtex' ? (
              <span className="flex items-center gap-1 text-[#2E7D32]">
                <Check className="w-3.5 h-3.5" />
                <span>Copied BibTeX</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy className="w-3.5 h-3.5" />
                <span>Copy BibTeX</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
