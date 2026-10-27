import { z } from 'zod';
import { ProductAvailability, ContentStatus } from '@prisma/client';

export const makerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Artisan or guild name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  place_of_origin: z.string().min(2, 'Place of origin is required'),
  photo_id: z.string().optional().nullable(),
  story: z
    .object({
      bio: z.string().min(10, 'Artisan bio must be at least 10 characters'),
      technique: z.string().optional(),
      heritage_region: z.string().optional(),
      conservation_note: z.string().optional(),
    })
    .optional()
    .nullable(),
  links: z.record(z.string(), z.string()).optional().nullable(),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.PUBLISHED),
  is_demo: z.boolean().default(true),
});

export type MakerInput = z.infer<typeof makerSchema>;

export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Product title must be at least 3 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  maker_id: z.string().min(1, 'Maker/artisan selection is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price_amount: z.number().min(0, 'Price must be a positive amount'),
  currency: z.string().default('EGP'),
  materials: z.string().min(2, 'Natural materials breakdown is required'),
  origin_place: z.string().min(2, 'Provenance location is required'),
  availability: z.nativeEnum(ProductAvailability).default(ProductAvailability.AVAILABLE),
  enquiry_only: z.boolean().default(true),
  images: z.array(z.string()).default([]),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.PUBLISHED),
  is_demo: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;

export const productEnquirySchema = z.object({
  product_id: z.string().min(1, 'Product reference is required'),
  name: z.string().min(2, 'Your name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Enquiry message must be at least 10 characters'),
  turnstile_token: z.string().optional().nullable(),
});

export type ProductEnquiryInput = z.infer<typeof productEnquirySchema>;
