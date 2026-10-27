import { z } from 'zod';
import { ObservationType, SightingStatus } from '@prisma/client';

export const sightingSubmitSchema = z.object({
  id: z.string().optional(),
  reported_common_name: z.string().min(2, 'Common name or species description is required'),
  species_id: z.string().optional().nullable(),
  observation_type: z.nativeEnum(ObservationType).default(ObservationType.MARINE),
  count: z.coerce.number().int().min(1, 'Count must be at least 1').default(1),
  behavior: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  observed_at: z.string().min(1, 'Observation date is required'),
  latitude: z.coerce.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
  longitude: z.coerce.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
  location_label: z.string().min(2, 'General location name or bay name is required'),
  reporter_name: z.string().min(2, 'Your name is required'),
  reporter_email: z.string().email('Valid contact email is required for scientific verification'),
  consent_publish: z.boolean().default(true),
  consent_data_share: z.boolean().default(true),
  photo_url: z.string().url('Must be a valid photo URL').optional().nullable().or(z.literal('')),
});

export const sightingModerationSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(SightingStatus),
  review_note: z.string().optional().nullable(),
  species_id: z.string().optional().nullable(),
  is_sensitive_species: z.boolean().optional(),
});

export type SightingSubmitInput = z.infer<typeof sightingSubmitSchema>;
export type SightingModerationInput = z.infer<typeof sightingModerationSchema>;
