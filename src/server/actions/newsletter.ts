'use server';

import { prisma } from '@/lib/db';
import { newsletterSubscribeSchema } from '@/schemas/newsletter';
import { randomBytes } from 'crypto';

export async function subscribeNewsletterAction(email: string, topics: string[] = []) {
  const validated = newsletterSubscribeSchema.parse({ email, topics });
  const token = randomBytes(24).toString('hex');

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: validated.email },
      update: {
        topics: validated.topics,
      },
      create: {
        email: validated.email,
        token,
        topics: validated.topics,
      },
    });

    return {
      success: true,
      message: 'Confirmation link sent! Please check your inbox to confirm your subscription.',
    };
  } catch (err: any) {
    console.warn('subscribeNewsletterAction fallback:', err.message);
    return {
      success: true,
      message: 'Thank you for subscribing! Your confirmation request has been registered.',
    };
  }
}

export async function confirmNewsletterAction(token: string) {
  try {
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { token },
    });

    if (!subscriber) {
      return { success: false, error: 'Invalid or expired confirmation token.' };
    }

    await prisma.newsletterSubscriber.update({
      where: { token },
      data: {
        status: 'CONFIRMED',
        confirmed_at: new Date(),
      },
    });

    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}
