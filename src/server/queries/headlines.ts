import { prisma } from '@/lib/db';
import { ContentStatus } from '@prisma/client';
import { SEED_HEADLINES } from '@/lib/seed-data';

export async function getCuratedHeadlines(limit: number = 8) {
  try {
    const headlines = await prisma.headline.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
      },
      take: limit,
      orderBy: [
        { is_pinned: 'desc' },
        { published_on: 'desc' },
      ],
    });

    if (headlines && headlines.length > 0) return headlines;
  } catch (error) {
    // Fallback to seed headlines
  }

  return SEED_HEADLINES.slice(0, limit);
}
