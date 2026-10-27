import { z } from 'zod';
import { OpportunityKind, ContentStatus } from '@prisma/client';

export const opportunitySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  kind: z.nativeEnum(OpportunityKind).default(OpportunityKind.GRANT),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  organization_id: z.string().min(1, 'Organization is required'),
  eligibility: z.string().optional().nullable(),
  amount_text: z.string().optional().nullable(),
  location_text: z.string().optional().nullable(),
  is_remote: z.boolean().default(false),
  deadline_at: z.string().optional().nullable(),
  apply_url: z.string().url('Must be a valid application URL'),
  is_featured: z.boolean().default(false),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.PUBLISHED),
  is_demo: z.boolean().default(true),
});

export type OpportunityInput = z.infer<typeof opportunitySchema>;
