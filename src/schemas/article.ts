import { z } from 'zod';

export const articleSourceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Source title is required'),
  publisher: z.string().min(2, 'Publisher or journal name is required'),
  url: z.string().url('A valid source URL is required (e.g. https://...)'),
  published_on: z.string().optional().nullable(),
});

export const articleSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(5, 'Title must be at least 5 characters'),
    slug: z
      .string()
      .min(3, 'Slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
    dek: z.string().max(300, 'Summary dek must be under 300 characters').optional().nullable(),
    body: z.any(), // JSON document from Tiptap
    cover_media_id: z.string().optional().nullable(),
    cover_url: z.string().optional().nullable(),
    type: z.enum(['NEWS', 'FEATURE', 'FIELD_NOTE', 'INTERVIEW', 'EXPLAINER']),
    status: z.enum(['DRAFT', 'IN_REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']),
    reading_minutes: z.number().int().min(1).default(3),
    is_featured: z.boolean().default(false),
    seo_title: z.string().max(70).optional().nullable(),
    seo_description: z.string().max(160).optional().nullable(),
    topic_ids: z.array(z.string()).default([]),
    author_ids: z.array(z.string()).default([]),
    sources: z.array(articleSourceSchema).default([]),
    locale: z.string().default('en'),
  })
  .refine(
    (data) => {
      // MASTER RULE: A NEWS article CANNOT be published without at least one source URL.
      if (data.status === 'PUBLISHED' && data.type === 'NEWS') {
        return data.sources && data.sources.length > 0;
      }
      return true;
    },
    {
      message: 'Editorial Standard: A NEWS article cannot be published without at least one verified external source URL.',
      path: ['sources'],
    }
  );

export type ArticleInput = z.infer<typeof articleSchema>;
export type ArticleSourceInput = z.infer<typeof articleSourceSchema>;

export const articleCorrectionSchema = z.object({
  article_id: z.string(),
  note: z.string().min(10, 'Correction note must explain the modification clearly'),
});

export type ArticleCorrectionInput = z.infer<typeof articleCorrectionSchema>;
