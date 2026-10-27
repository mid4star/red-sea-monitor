import { z } from 'zod';
import { PlaceType, ContentStatus } from '@prisma/client';

export const placeSourceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Source title is required'),
  publisher: z.string().min(2, 'Publisher is required'),
  url: z.string().url('Must be a valid URL'),
});

export const visitGuidanceSchema = z.object({
  permits: z.string().optional(),
  best_season: z.string().optional(),
  safety: z.string().optional(),
  rules: z.array(z.string()).default([]),
});

export const placeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Place name must be at least 3 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  type: z.nativeEnum(PlaceType),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
  longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
  protection_status: z.string().optional().nullable(),
  established_year: z.number().int().min(1800).max(2100).optional().nullable(),
  area_km2: z.number().positive().optional().nullable(),
  visit_guidance: visitGuidanceSchema.optional().nullable(),
  cover_media_url: z.string().url().optional().nullable(),
  sources: z.array(placeSourceSchema).default([]),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.PUBLISHED),
  is_demo: z.boolean().default(true),
});

export type PlaceInput = z.infer<typeof placeSchema>;
export type PlaceSourceInput = z.infer<typeof placeSourceSchema>;
