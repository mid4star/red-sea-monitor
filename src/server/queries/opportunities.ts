import { prisma } from '@/lib/db';
import { OpportunityKind, ContentStatus } from '@prisma/client';
import { SEED_OPPORTUNITIES, SEED_VOLUNTEER_PROGRAMS, SEED_ORGANIZATIONS } from '@/lib/seed-data';

export async function getOpportunities(options?: {
  kind?: OpportunityKind | 'ALL';
  search?: string;
  activeOnly?: boolean;
  limit?: number;
}) {
  const { kind, search, activeOnly, limit = 50 } = options || {};

  try {
    const where: any = {
      status: ContentStatus.PUBLISHED,
      deleted_at: null,
    };

    if (kind && kind !== 'ALL') {
      where.kind = kind;
    }

    if (activeOnly) {
      where.OR = [
        { deadline_at: null },
        { deadline_at: { gte: new Date() } },
      ];
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { eligibility: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await prisma.opportunity.findMany({
      where,
      orderBy: [{ is_featured: 'desc' }, { deadline_at: 'asc' }],
      take: limit,
      include: {
        organization: true,
      },
    });
  } catch {
    let list = [...SEED_OPPORTUNITIES];
    if (kind && kind !== 'ALL') {
      list = list.filter((o) => o.kind === kind);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          (o.summary && o.summary.toLowerCase().includes(q))
      );
    }
    return list.slice(0, limit);
  }
}

export async function getOpportunityBySlug(slug: string) {
  try {
    const opp = await prisma.opportunity.findFirst({
      where: { slug, deleted_at: null },
      include: {
        organization: true,
      },
    });
    if (opp) return opp;
  } catch {
    // fallback
  }

  return SEED_OPPORTUNITIES.find((o) => o.slug === slug) || null;
}

export async function getVolunteerPrograms(options?: { limit?: number }) {
  const { limit = 20 } = options || {};

  try {
    return await prisma.volunteerProgram.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        deleted_at: null,
      },
      orderBy: { created_at: 'desc' },
      take: limit,
      include: {
        organization: true,
      },
    });
  } catch {
    return SEED_VOLUNTEER_PROGRAMS.slice(0, limit);
  }
}

export async function getOrganizations() {
  try {
    return await prisma.organization.findMany({
      orderBy: { name: 'asc' },
    });
  } catch {
    return SEED_ORGANIZATIONS;
  }
}
