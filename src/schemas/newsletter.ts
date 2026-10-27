import { z } from 'zod';

export const newsletterSubscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  topics: z.array(z.string()).default([]),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;
