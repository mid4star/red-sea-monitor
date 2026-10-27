import { prisma } from '@/lib/db';
import { ContentStatus, LibraryItemType } from '@prisma/client';
import { SEED_LIBRARY_ITEMS } from '@/lib/seed-data';

export async function getLibraryItems(options?: {
  type?: LibraryItemType | 'ALL';
  year?: number;
  search?: string;
  openAccessOnly?: boolean;
  topicSlug?: string;
  limit?: number;
}) {
  const { type, year, search, openAccessOnly, topicSlug, limit = 50 } = options || {};

  try {
    const where: any = {
      status: ContentStatus.PUBLISHED,
      deleted_at: null,
    };

    if (type && type !== 'ALL') {
      where.type = type;
    }

    if (year) {
      where.year = year;
    }

    if (openAccessOnly) {
      where.is_open_access = true;
    }

    if (topicSlug) {
      where.topics = {
        some: {
          topic: {
            slug: topicSlug,
          },
        },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { authors_text: { contains: search, mode: 'insensitive' } },
        { abstract: { contains: search, mode: 'insensitive' } },
        { publisher: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await prisma.libraryItem.findMany({
      where,
      orderBy: { year: 'desc' },
      take: limit,
      include: {
        topics: {
          include: {
            topic: true,
          },
        },
      },
    });
  } catch {
    let items = [...SEED_LIBRARY_ITEMS];
    if (type && type !== 'ALL') {
      items = items.filter((i) => i.type === type);
    }
    if (year) {
      items = items.filter((i) => i.year === year);
    }
    if (openAccessOnly) {
      items = items.filter((i) => i.is_open_access);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.authors_text.toLowerCase().includes(q) ||
          (i.abstract && i.abstract.toLowerCase().includes(q)) ||
          (i.publisher && i.publisher.toLowerCase().includes(q))
      );
    }
    return items.slice(0, limit);
  }
}

export async function getLibraryItemBySlug(slug: string) {
  try {
    const item = await prisma.libraryItem.findFirst({
      where: { slug, deleted_at: null },
      include: {
        topics: {
          include: {
            topic: true,
          },
        },
      },
    });

    if (item) return item;
  } catch {
    // fallback
  }

  const fallback = SEED_LIBRARY_ITEMS.find((i) => i.slug === slug);
  return fallback || null;
}
