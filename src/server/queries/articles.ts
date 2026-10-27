import { prisma } from '@/lib/db';
import { ArticleType, ContentStatus } from '@prisma/client';
import { SEED_ARTICLES, SEED_TOPICS } from '@/lib/seed-data';

export interface ArticleFilterOptions {
  page?: number;
  limit?: number;
  status?: ContentStatus;
  type?: ArticleType;
  topicSlug?: string;
  query?: string;
}

export async function getArticles(options: ArticleFilterOptions = {}) {
  const { page = 1, limit = 10, status = ContentStatus.PUBLISHED, type, topicSlug, query } = options;
  const skip = (page - 1) * limit;

  try {
    const where: any = {
      deleted_at: null,
    };

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
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

    if (query && query.trim()) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { dek: { contains: query, mode: 'insensitive' } },
      ];
    }

    const [total, articles] = await Promise.all([
      prisma.article.count({ where }),
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ is_featured: 'desc' }, { published_at: 'desc' }, { created_at: 'desc' }],
        include: {
          authors: {
            include: {
              author: true,
            },
            orderBy: {
              order: 'asc',
            },
          },
          topics: {
            include: {
              topic: true,
            },
          },
          sources: true,
          verified_by: {
            select: {
              name: true,
              role: true,
              organization: true,
            },
          },
        },
      }),
    ]);

    return {
      articles,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    // Graceful fallback to verified seed data when DB engine is not reachable
    let filtered = SEED_ARTICLES;
    if (type) {
      filtered = filtered.filter((a) => a.type === type);
    }
    if (topicSlug) {
      filtered = filtered.filter((a) => a.topics?.some((t: any) => t.topic.slug === topicSlug));
    }
    if (query && query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (a) => a.title.toLowerCase().includes(q) || (a.dek && a.dek.toLowerCase().includes(q))
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      articles: paginated,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
    };
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        authors: {
          include: {
            author: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        topics: {
          include: {
            topic: true,
          },
        },
        sources: true,
        corrections: {
          orderBy: {
            corrected_at: 'desc',
          },
        },
        verified_by: {
          select: {
            name: true,
            role: true,
            organization: true,
          },
        },
      },
    });

    if (article) return article;
  } catch (error) {
    // Fallback to seed data
  }

  const fallback = SEED_ARTICLES.find((a) => a.slug === slug);
  return fallback || null;
}

export async function getRelatedArticles(currentArticleId: string, limit: number = 3) {
  try {
    return await prisma.article.findMany({
      where: {
        id: { not: currentArticleId },
        status: ContentStatus.PUBLISHED,
        deleted_at: null,
      },
      take: limit,
      orderBy: { published_at: 'desc' },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        topics: {
          include: {
            topic: true,
          },
        },
        sources: true,
      },
    });
  } catch (error) {
    return SEED_ARTICLES.filter((a) => a.id !== currentArticleId).slice(0, limit);
  }
}

export async function getAllTopics() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    if (topics && topics.length > 0) return topics;
  } catch (error) {
    // Fallback to seed topics
  }

  return SEED_TOPICS;
}
