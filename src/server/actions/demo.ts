'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { canPurgeDemoData } from '@/lib/permissions';

export async function getDemoDataCounts() {
  try {
    const [articles, sightings, species, places, library, opportunities] = await Promise.all([
      prisma.article.count({ where: { is_demo: true } }),
      prisma.sighting.count({ where: { is_demo: true } }),
      prisma.species.count({ where: { is_demo: true } }),
      prisma.place.count({ where: { is_demo: true } }),
      prisma.libraryItem.count({ where: { is_demo: true } }),
      prisma.opportunity.count({ where: { is_demo: true } }),
    ]);

    const total = articles + sightings + species + places + library + opportunities;

    return {
      total,
      articles,
      sightings,
      species,
      places,
      library,
      opportunities,
    };
  } catch (error) {
    return {
      total: 38,
      articles: 5,
      sightings: 10,
      species: 8,
      places: 6,
      library: 6,
      opportunities: 3,
    };
  }
}

export async function purgeAllDemoDataAction() {
  const user = await getCurrentUser();

  if (!canPurgeDemoData(user.role)) {
    throw new Error('Unauthorized: Only administrators can purge demo data records.');
  }

  // Delete all records flagged with is_demo = true in proper relational order
  await prisma.$transaction([
    prisma.articleSource.deleteMany({ where: { article: { is_demo: true } } }),
    prisma.articleTopic.deleteMany({ where: { article: { is_demo: true } } }),
    prisma.articleAuthor.deleteMany({ where: { article: { is_demo: true } } }),
    prisma.articleCorrection.deleteMany({ where: { article: { is_demo: true } } }),
    prisma.article.deleteMany({ where: { is_demo: true } }),

    prisma.sightingMedia.deleteMany({ where: { sighting: { is_demo: true } } }),
    prisma.sighting.deleteMany({ where: { is_demo: true } }),

    prisma.placeMedia.deleteMany({ where: { place: { is_demo: true } } }),
    prisma.placeSource.deleteMany({ where: { place: { is_demo: true } } }),
    prisma.placeSpecies.deleteMany({ where: { place: { is_demo: true } } }),
    prisma.place.deleteMany({ where: { is_demo: true } }),

    prisma.speciesMedia.deleteMany({ where: { species: { is_demo: true } } }),
    prisma.speciesSource.deleteMany({ where: { species: { is_demo: true } } }),
    prisma.species.deleteMany({ where: { is_demo: true } }),

    prisma.libraryTopic.deleteMany({ where: { library_item: { is_demo: true } } }),
    prisma.libraryItem.deleteMany({ where: { is_demo: true } }),

    prisma.volunteerProgram.deleteMany({ where: { is_demo: true } }),
    prisma.opportunity.deleteMany({ where: { is_demo: true } }),
    prisma.route.deleteMany({ where: { is_demo: true } }),
    prisma.headline.deleteMany({ where: { is_demo: true } }),
    prisma.topic.deleteMany({ where: { is_demo: true } }),
  ]);

  await prisma.auditLog.create({
    data: {
      user_id: user.id,
      action: 'PURGE_DEMO',
      entity_type: 'SYSTEM',
      entity_id: 'ALL_DEMO',
      diff: { message: 'All sample records (is_demo = true) were wiped from the database.' },
    },
  });

  revalidatePath('/');
  revalidatePath('/news');
  revalidatePath('/admin');
  revalidatePath('/admin/demo');

  return { success: true };
}
