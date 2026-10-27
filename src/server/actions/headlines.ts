'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { headlineSchema, HeadlineInput } from '@/schemas/headline';
import { ContentStatus } from '@prisma/client';

export async function saveHeadlineAction(data: HeadlineInput) {
  const user = await getCurrentUser();

  if (!hasPermission(user.role, PERMISSIONS.HEADLINES_MANAGE)) {
    throw new Error('Unauthorized to manage headlines.');
  }

  const validated = headlineSchema.parse(data);

  const headline = await prisma.headline.create({
    data: {
      title: validated.title,
      publisher: validated.publisher,
      url: validated.url,
      published_on: validated.published_on ? new Date(validated.published_on) : new Date(),
      is_pinned: validated.is_pinned,
      status: validated.status as ContentStatus,
      is_demo: false,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/headlines');
  return { success: true, headline };
}

export async function togglePinHeadlineAction(id: string, isPinned: boolean) {
  const user = await getCurrentUser();

  if (!hasPermission(user.role, PERMISSIONS.HEADLINES_MANAGE)) {
    throw new Error('Unauthorized.');
  }

  await prisma.headline.update({
    where: { id },
    data: { is_pinned: isPinned },
  });

  revalidatePath('/');
  revalidatePath('/admin/headlines');
  return { success: true };
}

export async function deleteHeadlineAction(id: string) {
  const user = await getCurrentUser();

  if (!hasPermission(user.role, PERMISSIONS.HEADLINES_MANAGE)) {
    throw new Error('Unauthorized.');
  }

  await prisma.headline.delete({
    where: { id },
  });

  revalidatePath('/');
  revalidatePath('/admin/headlines');
  return { success: true };
}
