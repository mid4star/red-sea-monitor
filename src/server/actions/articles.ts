'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { canPublishContent, hasPermission, PERMISSIONS } from '@/lib/permissions';
import { articleSchema, articleCorrectionSchema, ArticleInput, ArticleCorrectionInput } from '@/schemas/article';
import { ContentStatus } from '@prisma/client';

export async function saveArticleAction(data: ArticleInput) {
  const user = await getCurrentUser();

  // Validate input schema including the mandatory source rule for published news
  const validated = articleSchema.parse(data);

  // Server-side RBAC validation: Contributors CANNOT publish directly
  if (validated.status === 'PUBLISHED' && !canPublishContent(user.role)) {
    throw new Error('Unauthorized: Contributors cannot publish directly. Please submit your draft for editorial review.');
  }

  let article: any;

  if (validated.id) {
    // Update existing article
    article = await prisma.article.update({
      where: { id: validated.id },
      data: {
        title: validated.title,
        slug: validated.slug,
        dek: validated.dek,
        body: validated.body,
        cover_media_id: validated.cover_media_id,
        type: validated.type,
        status: validated.status as ContentStatus,
        reading_minutes: validated.reading_minutes,
        is_featured: validated.is_featured,
        seo_title: validated.seo_title,
        seo_description: validated.seo_description,
        published_at: validated.status === 'PUBLISHED' ? new Date() : undefined,
        verified_by_user_id: validated.status === 'PUBLISHED' ? user.id : undefined,
        last_verified_at: validated.status === 'PUBLISHED' ? new Date() : undefined,
      },
    });

    // Re-link topics
    await prisma.articleTopic.deleteMany({ where: { article_id: article.id } });
    if (validated.topic_ids && validated.topic_ids.length > 0) {
      await prisma.articleTopic.createMany({
        data: validated.topic_ids.map((tid) => ({
          article_id: article.id,
          topic_id: tid,
        })),
      });
    }

    // Re-link authors
    await prisma.articleAuthor.deleteMany({ where: { article_id: article.id } });
    if (validated.author_ids && validated.author_ids.length > 0) {
      await prisma.articleAuthor.createMany({
        data: validated.author_ids.map((aid, idx) => ({
          article_id: article.id,
          author_id: aid,
          order: idx,
        })),
      });
    }

    // Upsert sources
    await prisma.articleSource.deleteMany({ where: { article_id: article.id } });
    if (validated.sources && validated.sources.length > 0) {
      await prisma.articleSource.createMany({
        data: validated.sources.map((s) => ({
          article_id: article.id,
          title: s.title,
          publisher: s.publisher,
          url: s.url,
          published_on: s.published_on ? new Date(s.published_on) : null,
        })),
      });
    }

    // Record audit log
    await prisma.auditLog.create({
      data: {
        user_id: user.id,
        action: 'UPDATE',
        entity_type: 'ARTICLE',
        entity_id: article.id,
        diff: { status: validated.status, title: validated.title },
      },
    });
  } else {
    // Create new article
    article = await prisma.article.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        dek: validated.dek,
        body: validated.body,
        cover_media_id: validated.cover_media_id,
        type: validated.type,
        status: validated.status as ContentStatus,
        reading_minutes: validated.reading_minutes,
        is_featured: validated.is_featured,
        seo_title: validated.seo_title,
        seo_description: validated.seo_description,
        published_at: validated.status === 'PUBLISHED' ? new Date() : undefined,
        verified_by_user_id: validated.status === 'PUBLISHED' ? user.id : undefined,
        last_verified_at: validated.status === 'PUBLISHED' ? new Date() : undefined,
        is_demo: false,
      },
    });

    if (validated.topic_ids && validated.topic_ids.length > 0) {
      await prisma.articleTopic.createMany({
        data: validated.topic_ids.map((tid) => ({
          article_id: article.id,
          topic_id: tid,
        })),
      });
    }

    if (validated.author_ids && validated.author_ids.length > 0) {
      await prisma.articleAuthor.createMany({
        data: validated.author_ids.map((aid, idx) => ({
          article_id: article.id,
          author_id: aid,
          order: idx,
        })),
      });
    }

    if (validated.sources && validated.sources.length > 0) {
      await prisma.articleSource.createMany({
        data: validated.sources.map((s) => ({
          article_id: article.id,
          title: s.title,
          publisher: s.publisher,
          url: s.url,
          published_on: s.published_on ? new Date(s.published_on) : null,
        })),
      });
    }

    await prisma.auditLog.create({
      data: {
        user_id: user.id,
        action: 'CREATE',
        entity_type: 'ARTICLE',
        entity_id: article.id,
        diff: { status: validated.status, title: validated.title },
      },
    });
  }

  revalidatePath('/news');
  revalidatePath(`/news/${article.slug}`);
  revalidatePath('/admin/articles');
  revalidatePath('/rss.xml');

  return { success: true, article };
}

export async function addArticleCorrectionAction(data: ArticleCorrectionInput) {
  const user = await getCurrentUser();
  const validated = articleCorrectionSchema.parse(data);

  if (!hasPermission(user.role, PERMISSIONS.ARTICLE_EDIT)) {
    throw new Error('Unauthorized to record article corrections.');
  }

  const correction = await prisma.articleCorrection.create({
    data: {
      article_id: validated.article_id,
      note: validated.note,
      created_by: user.name,
    },
  });

  await prisma.auditLog.create({
    data: {
      user_id: user.id,
      action: 'CORRECTION',
      entity_type: 'ARTICLE',
      entity_id: validated.article_id,
      diff: { note: validated.note },
    },
  });

  revalidatePath('/news');
  return { success: true, correction };
}

export async function deleteArticleAction(articleId: string) {
  const user = await getCurrentUser();

  if (!hasPermission(user.role, PERMISSIONS.ARTICLE_DELETE)) {
    throw new Error('Unauthorized: Only administrators can delete published records.');
  }

  // Soft delete
  await prisma.article.update({
    where: { id: articleId },
    data: { deleted_at: new Date() },
  });

  await prisma.auditLog.create({
    data: {
      user_id: user.id,
      action: 'DELETE',
      entity_type: 'ARTICLE',
      entity_id: articleId,
    },
  });

  revalidatePath('/news');
  revalidatePath('/admin/articles');
  return { success: true };
}
