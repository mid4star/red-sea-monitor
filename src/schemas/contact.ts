import { z } from 'zod';

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const contentSuggestionSchema = z.object({
  kind: z.enum(['STORY', 'SOURCE', 'OPPORTUNITY', 'CORRECTION']),
  body: z.string().min(10, 'Suggestion details must be at least 10 characters'),
  url: z.string().url('A valid reference URL is required').optional().or(z.literal('')),
  submitter_email: z.string().email('Valid email is required').optional().or(z.literal('')),
});

export type ContentSuggestionInput = z.infer<typeof contentSuggestionSchema>;

export const mediaAssetSchema = z.object({
  id: z.string().optional(),
  storage_key: z.string(),
  url: z.string().url('Valid URL is required'),
  mime: z.string(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  size_bytes: z.number().int().optional().nullable(),
  alt_text: z.string().min(5, 'Scientific alt-text is required for publication'),
  caption: z.string().optional().nullable(),
  credit: z.string().min(2, 'Photographer or institution credit is mandatory'),
  license: z.string().min(2, 'License terms (e.g. CC-BY-SA 4.0) are mandatory'),
  source_url: z.string().url().optional().nullable().or(z.literal('')),
});

export type MediaAssetInput = z.infer<typeof mediaAssetSchema>;
