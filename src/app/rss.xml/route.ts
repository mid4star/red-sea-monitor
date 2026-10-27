import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ContentStatus } from '@prisma/client';
import { SEED_ARTICLES } from '@/lib/seed-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://redseamonitor.org';

  let articles: any[] = [];

  try {
    articles = await prisma.article.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        deleted_at: null,
      },
      take: 25,
      orderBy: { published_at: 'desc' },
      include: {
        authors: { include: { author: true } },
      },
    });
  } catch (error) {
    articles = SEED_ARTICLES;
  }

  const rssItems = articles
    .map((article) => {
      const author = article.authors?.[0]?.author?.display_name || 'Red Sea Monitor';
      const pubDate = article.published_at ? new Date(article.published_at).toUTCString() : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/news/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/news/${article.slug}</guid>
      <description><![CDATA[${article.dek || ''}]]></description>
      <author>${author}</author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Red Sea Monitor — Field News &amp; Environmental Intelligence</title>
    <link>${siteUrl}</link>
    <description>An independent scientific and editorial monitoring platform documenting Egypt's Red Sea coast and Eastern Desert.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
