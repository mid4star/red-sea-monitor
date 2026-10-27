import { prisma } from '@/lib/db';
import { ContentStatus } from '@prisma/client';
import { SEED_ARTICLES, SEED_PLACES, SEED_SPECIES, SEED_LIBRARY_ITEMS } from '@/lib/seed-data';

export interface GroupedSearchResults {
  query: string;
  total: number;
  articles: any[];
  species: any[];
  places: any[];
  library: any[];
  opportunities: any[];
}

export async function globalSearch(query: string): Promise<GroupedSearchResults> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      query: '',
      total: 0,
      articles: [],
      species: [],
      places: [],
      library: [],
      opportunities: [],
    };
  }

  try {
    const [articles, species, places, library, opportunities] = await Promise.all([
      prisma.article.findMany({
        where: {
          status: ContentStatus.PUBLISHED,
          deleted_at: null,
          OR: [
            { title: { contains: trimmed, mode: 'insensitive' } },
            { dek: { contains: trimmed, mode: 'insensitive' } },
          ],
        },
        take: 6,
        include: {
          authors: { include: { author: true } },
        },
      }),

      prisma.species.findMany({
        where: {
          status: ContentStatus.PUBLISHED,
          deleted_at: null,
          OR: [
            { common_name: { contains: trimmed, mode: 'insensitive' } },
            { scientific_name: { contains: trimmed, mode: 'insensitive' } },
            { description: { contains: trimmed, mode: 'insensitive' } },
          ],
        },
        take: 6,
      }),

      prisma.place.findMany({
        where: {
          status: ContentStatus.PUBLISHED,
          deleted_at: null,
          OR: [
            { name: { contains: trimmed, mode: 'insensitive' } },
            { summary: { contains: trimmed, mode: 'insensitive' } },
          ],
        },
        take: 6,
      }),

      prisma.libraryItem.findMany({
        where: {
          status: ContentStatus.PUBLISHED,
          deleted_at: null,
          OR: [
            { title: { contains: trimmed, mode: 'insensitive' } },
            { authors_text: { contains: trimmed, mode: 'insensitive' } },
            { abstract: { contains: trimmed, mode: 'insensitive' } },
          ],
        },
        take: 6,
      }),

      prisma.opportunity.findMany({
        where: {
          status: ContentStatus.PUBLISHED,
          deleted_at: null,
          OR: [
            { title: { contains: trimmed, mode: 'insensitive' } },
            { summary: { contains: trimmed, mode: 'insensitive' } },
          ],
        },
        take: 6,
        include: {
          organization: true,
        },
      }),
    ]);

    const total =
      articles.length +
      species.length +
      places.length +
      library.length +
      opportunities.length;

    return {
      query: trimmed,
      total,
      articles,
      species,
      places,
      library,
      opportunities,
    };
  } catch {
    const q = trimmed.toLowerCase();
    const articles = SEED_ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(q) || (a.dek && a.dek.toLowerCase().includes(q))
    ).slice(0, 6);

    const species = (SEED_SPECIES || []).filter(
      (s) =>
        s.common_name.toLowerCase().includes(q) ||
        s.scientific_name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q))
    ).slice(0, 6);

    const places = (SEED_PLACES || []).filter(
      (p) => p.name.toLowerCase().includes(q) || (p.summary && p.summary.toLowerCase().includes(q))
    ).slice(0, 6);

    const library = (SEED_LIBRARY_ITEMS || []).filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.authors_text && l.authors_text.toLowerCase().includes(q)) ||
        (l.abstract && l.abstract.toLowerCase().includes(q))
    ).slice(0, 6);

    const total = articles.length + species.length + places.length + library.length;

    return {
      query: trimmed,
      total,
      articles,
      species,
      places,
      library,
      opportunities: [],
    };
  }
}
