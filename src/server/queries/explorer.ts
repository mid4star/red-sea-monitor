import { prisma } from '@/lib/db';
import { ContentStatus, PlaceType, SpeciesGroup, IucnStatus } from '@prisma/client';
import { SEED_PLACES, SEED_SPECIES, SEED_ROUTES } from '@/lib/seed-data';

export async function getPlaces(options?: {
  type?: PlaceType | 'ALL';
  search?: string;
  limit?: number;
}) {
  const { type, search, limit = 50 } = options || {};

  try {
    const where: any = {
      status: ContentStatus.PUBLISHED,
      deleted_at: null,
    };

    if (type && type !== 'ALL') {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await prisma.place.findMany({
      where,
      orderBy: { name: 'asc' },
      take: limit,
      include: {
        sources: true,
        reviewed_by: { select: { name: true, role: true, organization: true } },
      },
    });
  } catch {
    let places = [...SEED_PLACES];
    if (type && type !== 'ALL') {
      places = places.filter((p) => p.type === type);
    }
    if (search) {
      const q = search.toLowerCase();
      places = places.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.summary && p.summary.toLowerCase().includes(q))
      );
    }
    return places.slice(0, limit);
  }
}

export async function getPlaceBySlug(slug: string) {
  try {
    const place = await prisma.place.findFirst({
      where: { slug, deleted_at: null },
      include: {
        sources: true,
        reviewed_by: { select: { name: true, role: true, organization: true } },
        species: {
          include: {
            species: true,
          },
        },
      },
    });

    if (place) return place;
  } catch {
    // fallback
  }

  const fallback = SEED_PLACES.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getSpeciesList(options?: {
  group?: SpeciesGroup | 'ALL';
  iucn?: IucnStatus | 'ALL';
  search?: string;
  limit?: number;
}) {
  const { group, iucn, search, limit = 50 } = options || {};

  try {
    const where: any = {
      status: ContentStatus.PUBLISHED,
      deleted_at: null,
    };

    if (group && group !== 'ALL') {
      where.group = group;
    }

    if (iucn && iucn !== 'ALL') {
      where.iucn_status = iucn;
    }

    if (search) {
      where.OR = [
        { common_name: { contains: search, mode: 'insensitive' } },
        { scientific_name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await prisma.species.findMany({
      where,
      orderBy: { common_name: 'asc' },
      take: limit,
      include: {
        sources: true,
        reviewed_by: { select: { name: true, role: true, organization: true } },
      },
    });
  } catch {
    let list = [...SEED_SPECIES];
    if (group && group !== 'ALL') {
      list = list.filter((s) => s.group === group);
    }
    if (iucn && iucn !== 'ALL') {
      list = list.filter((s) => s.iucn_status === iucn);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.common_name.toLowerCase().includes(q) ||
          s.scientific_name.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q))
      );
    }
    return list.slice(0, limit);
  }
}

export async function getSpeciesBySlug(slug: string) {
  try {
    const sp = await prisma.species.findFirst({
      where: { slug, deleted_at: null },
      include: {
        sources: true,
        reviewed_by: { select: { name: true, role: true, organization: true } },
        places: {
          include: {
            place: true,
          },
        },
      },
    });

    if (sp) return sp;
  } catch {
    // fallback
  }

  const fallback = SEED_SPECIES.find((s) => s.slug === slug);
  return fallback || null;
}

export async function getRoutes(options?: {
  difficulty?: string | 'ALL';
  search?: string;
  limit?: number;
}) {
  const { difficulty, search, limit = 50 } = options || {};

  try {
    const where: any = {
      status: ContentStatus.PUBLISHED,
      deleted_at: null,
    };

    if (difficulty && difficulty !== 'ALL') {
      where.difficulty = difficulty;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await prisma.route.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: limit,
      include: {
        stops: {
          include: { place: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  } catch {
    let routes = [...SEED_ROUTES];
    if (difficulty && difficulty !== 'ALL') {
      routes = routes.filter((r) => r.difficulty === difficulty);
    }
    if (search) {
      const q = search.toLowerCase();
      routes = routes.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.summary && r.summary.toLowerCase().includes(q))
      );
    }
    return routes.slice(0, limit);
  }
}

export async function getRouteBySlug(slug: string) {
  try {
    const route = await prisma.route.findFirst({
      where: { slug, deleted_at: null },
      include: {
        stops: {
          include: { place: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (route) return route;
  } catch {
    // fallback
  }

  const fallback = SEED_ROUTES.find((r) => r.slug === slug);
  return fallback || null;
}
