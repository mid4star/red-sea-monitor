/**
 * Citation Generation Engine
 * Generates APA and BibTeX formatted citations dynamically from database metadata fields.
 * Never hand-types citations into UI components.
 */

export interface CitationRecord {
  title: string;
  authors_text: string;
  year?: number | null;
  publisher?: string | null;
  doi?: string | null;
  isbn?: string | null;
  type?: string | null;
  external_url?: string | null;
}

export function formatApaCitation(item: CitationRecord): string {
  const authors = (item.authors_text || 'Red Sea Monitor Editorial Desk').trim();
  const yearStr = item.year ? `(${item.year})` : '(n.d.)';
  const titleStr = (item.title || '').trim();
  const publisherStr = item.publisher ? `${item.publisher.trim()}.` : '';
  const doiOrUrl = item.doi
    ? `https://doi.org/${item.doi.trim()}`
    : item.external_url
    ? item.external_url.trim()
    : '';

  return `${authors} ${yearStr}. ${titleStr}. ${publisherStr} ${doiOrUrl}`.trim().replace(/\s{2,}/g, ' ');
}

export function formatBibtexCitation(item: CitationRecord, customKey?: string): string {
  const firstAuthor = (item.authors_text || 'author')
    .split(',')[0]
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase() || 'rsm';
  const year = item.year || new Date().getFullYear();
  const key = customKey || `${firstAuthor}${year}`;
  
  const entryType =
    item.type === 'BOOK'
      ? 'book'
      : item.type === 'DATASET'
      ? 'misc'
      : item.type === 'REPORT'
      ? 'techreport'
      : 'article';

  const fields: string[] = [
    `@${entryType}{${key},`,
    `  title={${item.title || ''}},`,
    `  author={${item.authors_text || ''}},`,
  ];

  if (item.year) fields.push(`  year={${item.year}},`);
  if (item.publisher) fields.push(`  publisher={${item.publisher}},`);
  if (item.doi) fields.push(`  doi={${item.doi}},`);
  if (item.isbn) fields.push(`  isbn={${item.isbn}},`);
  if (item.external_url) fields.push(`  url={${item.external_url}},`);

  fields.push(`}`);
  return fields.join('\n');
}
