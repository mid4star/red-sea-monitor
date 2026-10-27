import { prisma } from '@/lib/db';
import { ObservationType, SightingStatus } from '@prisma/client';
import { SEED_SIGHTINGS, SEED_PHOTO_STORIES } from '@/lib/seed-data';

export async function getApprovedSightings(options?: {
  type?: ObservationType | 'ALL';
  limit?: number;
}) {
  const { type, limit = 50 } = options || {};

  try {
    const where: any = {
      status: SightingStatus.APPROVED,
      deleted_at: null,
    };

    if (type && type !== 'ALL') {
      where.observation_type = type;
    }

    return await prisma.sighting.findMany({
      where,
      orderBy: { observed_at: 'desc' },
      take: limit,
      include: {
        species: true,
        place: true,
      },
    });
  } catch {
    let list = SEED_SIGHTINGS.filter((s) => s.status === 'APPROVED');
    if (type && type !== 'ALL') {
      list = list.filter((s) => s.observation_type === type);
    }
    return list.slice(0, limit);
  }
}

export async function getAllSightingsForAdmin(options?: {
  status?: SightingStatus | 'ALL';
  limit?: number;
}) {
  const { status, limit = 100 } = options || {};

  try {
    const where: any = {
      deleted_at: null,
    };

    if (status && status !== 'ALL') {
      where.status = status;
    }

    return await prisma.sighting.findMany({
      where,
      orderBy: { observed_at: 'desc' },
      take: limit,
      include: {
        species: true,
        place: true,
      },
    });
  } catch {
    let list = [...SEED_SIGHTINGS];
    if (status && status !== 'ALL') {
      list = list.filter((s) => s.status === status);
    }
    return list.slice(0, limit);
  }
}

export async function getSightingById(id: string) {
  try {
    const sighting = await prisma.sighting.findFirst({
      where: { id, deleted_at: null },
      include: {
        species: true,
        place: true,
      },
    });
    if (sighting) return sighting;
  } catch {
    // fallback
  }

  return SEED_SIGHTINGS.find((s) => s.id === id) || null;
}

export async function getSightingsStats() {
  try {
    const [approved, pending, uniqueSpecies, totalObservers] = await Promise.all([
      prisma.sighting.count({ where: { status: SightingStatus.APPROVED, deleted_at: null } }),
      prisma.sighting.count({ where: { status: SightingStatus.PENDING, deleted_at: null } }),
      prisma.sighting.groupBy({
        by: ['reported_common_name'],
        where: { status: SightingStatus.APPROVED, deleted_at: null },
      }),
      prisma.sighting.groupBy({
        by: ['reporter_email'],
        where: { status: SightingStatus.APPROVED, deleted_at: null },
      }),
    ]);

    return {
      approvedCount: approved,
      pendingCount: pending,
      speciesCount: uniqueSpecies.length,
      observerCount: totalObservers.length,
    };
  } catch {
    const approvedList = SEED_SIGHTINGS.filter((s) => s.status === 'APPROVED');
    const pendingList = SEED_SIGHTINGS.filter((s) => s.status === 'PENDING');
    return {
      approvedCount: approvedList.length,
      pendingCount: pendingList.length,
      speciesCount: 8,
      observerCount: 14,
    };
  }
}

export async function getPhotoStories(options?: {
  featuredOnly?: boolean;
  limit?: number;
}) {
  const { featuredOnly, limit = 20 } = options || {};

  try {
    const where: any = {
      status: SightingStatus.APPROVED,
    };

    if (featuredOnly) {
      where.featured = true;
    }

    return await prisma.photoStory.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: limit,
      include: {
        media: true,
      },
    });
  } catch {
    let list = [...SEED_PHOTO_STORIES];
    if (featuredOnly) {
      list = list.filter((p) => p.featured);
    }
    return list.slice(0, limit);
  }
}
