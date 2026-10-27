import { z } from 'zod';
import { SpeciesGroup, IucnStatus, ContentStatus } from '@prisma/client';

export const speciesSourceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Source title is required'),
  publisher: z.string().min(2, 'Publisher is required'),
  url: z.string().url('Must be a valid URL'),
});

export const externalIdsSchema = z.object({
  gbif: z.string().optional().nullable(),
  worms: z.string().optional().nullable(),
  inaturalist: z.string().optional().nullable(),
  iucn: z.string().optional().nullable(),
});

export const speciesSchema = z.object({
  id: z.string().optional(),
  common_name: z.string().min(2, 'Common name is required'),
  scientific_name: z.string().min(2, 'Scientific name is required'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  group: z.nativeEnum(SpeciesGroup),
  iucn_status: z.nativeEnum(IucnStatus),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  habitat: z.string().optional().nullable(),
  diet: z.string().optional().nullable(),
  threats: z.string().optional().nullable(),
  is_sensitive: z.boolean().default(false),
  cover_media_url: z.string().url().optional().nullable(),
  external_ids: externalIdsSchema.optional().nullable(),
  seasonal_months: z.array(z.number().int().min(1).max(12)).default([]),
  sources: z.array(speciesSourceSchema).default([]),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.PUBLISHED),
  is_demo: z.boolean().default(true),
});

export type SpeciesInput = z.infer<typeof speciesSchema>;
export type SpeciesSourceInput = z.infer<typeof speciesSourceSchema>;
