import { z } from 'zod';
import { ContentStatus } from '@prisma/client';

export const routeStopSchema = z.object({
  order: z.number().int().min(1),
  name: z.string().min(2, 'Stop name is required'),
  note: z.string().optional().nullable(),
});

export const routeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Route title must be at least 3 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  difficulty: z.enum(['Easy', 'Moderate', 'Demanding']).default('Moderate'),
  duration_hours: z.number().positive().optional().nullable(),
  distance_km: z.number().positive().optional().nullable(),
  season: z.string().optional().nullable(),
  safety_notes: z.string().optional().nullable(),
  permits_notes: z.string().optional().nullable(),
  stops: z.array(routeStopSchema).default([]),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.PUBLISHED),
  is_demo: z.boolean().default(true),
});

export type RouteInput = z.infer<typeof routeSchema>;
export type RouteStopInput = z.infer<typeof routeStopSchema>;
