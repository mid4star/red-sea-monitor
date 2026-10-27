'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CitationWidgetProps {
  item: {
    id: string;
    title: string;
    authors_text: string;
    year: number;
    publisher?: string | null;
    doi?: string | null;
    isbn?: string | null;
    external_url?: string | null;
    type?: string;
  };
  className?: string;
}

export function CitationWidget({ item, className = '' }: CitationWidgetProps) {
  const [format, setFormat] = useState<'APA' | 'BIBTEX' | 'CHICAGO'>('APA');
  const [copied, setCopied] = useState(false);

  // Generate citation strings
  const apa = `${item.authors_text} (${item.year}). ${item.title}.${
    item.publisher ? ` ${item.publisher}.` : ''
  }${item.doi ? ` https://doi.org/${item.doi}` : item.external_url ? ` ${item.external_url}` : ''}`;

  const chicago = `${item.authors_text}. "${item.title}." ${item.publisher || ''} (${item.year}).${
    item.doi ? ` https://doi.org/${item.doi}.` : ''
  }`;

  const citeKey = `${(item.authors_text.split(',')[0] || 'ref')
    .toLowerCase()
    .replace(/[^a-z]/g, '')}${item.year}${item.title
    .slice(0, 8)
    .toLowerCase()
    .replace(/[^a-z]/g, '')}`;

  const bibtex = `@${item.type?.toLowerCase() === 'book' ? 'book' : 'article'}{${citeKey},
  title = {${item.title}},
  author = {${item.authors_text}},
  year = {${item.year}},${item.publisher ? `\n  publisher = {${item.publisher}},` : ''}${
    item.doi ? `\n  doi = {${item.doi}},` : ''
  }${item.isbn ? `\n  isbn = {${item.isbn}},` : ''}${
    item.external_url ? `\n  url = {${item.external_url}}` : ''
  }
}`;

  const getActiveText = () => {
    if (format === 'APA') return apa;
    if (format === 'CHICAGO') return chicago;
    return bibtex;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBib = () => {
    const blob = new Blob([bibtex], { type: 'application/x-bibtex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${citeKey}.bib`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-4 rounded-sm space-y-3 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-stone-500 uppercase tracking-wider">Citation Format:</span>
          {(['APA', 'CHICAGO', 'BIBTEX'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                format === fmt
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="text-xs font-mono h-7 px-2.5"
          >
            {copied ? '✓ Copied' : 'Copy Citation'}
          </Button>

          {format === 'BIBTEX' && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownloadBib}
              className="text-xs font-mono h-7 px-2.5 text-stone-600 dark:text-stone-300"
            >
              ↓ .bib File
            </Button>
          )}
        </div>
      </div>

      <div className="bg-stone-100 dark:bg-stone-950 p-3 rounded font-mono text-xs text-stone-800 dark:text-stone-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all border border-stone-200 dark:border-stone-800">
        {getActiveText()}
      </div>

      <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
        <span>Scientific Archival Record</span>
        {item.doi && <span>DOI: {item.doi}</span>}
      </div>
    </div>
  );
}
