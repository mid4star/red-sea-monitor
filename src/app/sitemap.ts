import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';
import { ContentStatus } from '@prisma/client';
import { SEED_ARTICLES } from '@/lib/seed-data';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://redseamonitor.org';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/watch`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/watch/photos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/watch/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/explorer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/explorer/places`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/explorer/species`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/explorer/routes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/library`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/opportunities`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/store`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/editorial-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/data-use`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/partners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  let articleRoutes: MetadataRoute.Sitemap = [];

  try {
    const articles = await prisma.article.findMany({
      where: { status: ContentStatus.PUBLISHED, deleted_at: null },
      select: { slug: true, updated_at: true },
    });

    articleRoutes = articles.map((art) => ({
      url: `${siteUrl}/news/${art.slug}`,
      lastModified: art.updated_at,
      changeFrequency: 'weekly',
      priority: 0.85,
    }));
  } catch (error) {
    articleRoutes = SEED_ARTICLES.map((art) => ({
      url: `${siteUrl}/news/${art.slug}`,
      lastModified: new Date(art.updated_at),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));
  }

  return [...staticRoutes, ...articleRoutes];
}
