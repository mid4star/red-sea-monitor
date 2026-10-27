import { z } from 'zod';
import { LibraryItemType, ContentStatus } from '@prisma/client';

export const libraryItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subtitle: z.string().optional().nullable(),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  type: z.nativeEnum(LibraryItemType).default(LibraryItemType.PAPER),
  authors_text: z.string().min(2, 'Authors text is required'),
  publisher: z.string().optional().nullable(),
  year: z.number().int().min(1800).max(new Date().getFullYear() + 2),
  language: z.string().default('en'),
  abstract: z.string().min(10, 'Abstract must be at least 10 characters'),
  doi: z.string().optional().nullable(),
  isbn: z.string().optional().nullable(),
  external_url: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  is_open_access: z.boolean().default(true),
  topic_ids: z.array(z.string()).default([]),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.PUBLISHED),
  is_demo: z.boolean().default(true),
});

export type LibraryItemInput = z.infer<typeof libraryItemSchema>;
