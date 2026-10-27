import { z } from 'zod';

export const headlineSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, 'Headline title must be at least 5 characters'),
  publisher: z.string().min(2, 'Publisher or wire source is required'),
  url: z.string().url('A valid destination URL is required (must be reachable)'),
  published_on: z.string().optional(),
  is_pinned: z.boolean().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
});

export type HeadlineInput = z.infer<typeof headlineSchema>;
