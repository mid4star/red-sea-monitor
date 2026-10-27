import { prisma } from '@/lib/db';
import { SEED_QUOTES } from '@/lib/seed-data';

export interface QuoteInput {
  text: string;
  speaker_name: string;
  speaker_role: string;
  source_url?: string | null;
  is_demo?: boolean;
}

const REAL_PERSON_KNOWN_NAMES = [
  'fine',
  'veron',
  'randall',
  'genin',
  'gildor',
  'sidebotham',
  'cousteau',
];

export function validateQuoteInput(input: QuoteInput) {
  if (!input.text || input.text.trim().length === 0) {
    throw new Error('Quote text cannot be empty');
  }

  // Rule 1: A non-demo quote cannot be saved without source_url
  if (!input.is_demo && (!input.source_url || input.source_url.trim().length === 0)) {
    throw new Error('Credibility violation: A non-demo quote cannot be saved without a verified source_url.');
  }

  // Rule 2: A demo quote cannot use a real person's name
  if (input.is_demo) {
    const lowerSpeaker = (input.speaker_name || '').toLowerCase();
    const isRealPerson = REAL_PERSON_KNOWN_NAMES.some((name) => lowerSpeaker.includes(name));
    if (isRealPerson) {
      throw new Error(`Credibility violation: Demo quotes must use neutral fictional roles, not real persons (${input.speaker_name}).`);
    }
  }
}

export async function getFeaturedQuote() {
  try {
    const quote = await (prisma as any).quote.findFirst({
      orderBy: { created_at: 'desc' },
    });
    if (quote) return quote;
  } catch {
    // Database fallback
  }

  return SEED_QUOTES[0] || null;
}
