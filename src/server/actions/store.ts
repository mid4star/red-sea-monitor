'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import {
  makerSchema,
  MakerInput,
  productSchema,
  ProductInput,
  productEnquirySchema,
} from '@/schemas/store';
import { ProductAvailability, ContentStatus } from '@prisma/client';

export interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

/**
 * Submit an artisan craft enquiry (v1 Inquiry Flow - Zero payments)
 */
export async function submitProductEnquiryAction(
  prevState: any,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = {
      product_id: formData.get('product_id') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      turnstile_token: formData.get('turnstile_token') as string | null,
    };

    const validated = productEnquirySchema.safeParse(rawData);
    if (!validated.success) {
      const firstError = validated.error.errors[0]?.message || 'Invalid form input.';
      return { success: false, error: firstError };
    }

    try {
      await prisma.productEnquiry.create({
        data: {
          product_id: validated.data.product_id,
          name: validated.data.name,
          email: validated.data.email,
          message: validated.data.message,
          status: 'NEW',
        },
      });
    } catch {
      console.info(
        `[Store Demo Fallback] Product enquiry received for ${validated.data.product_id} from ${validated.data.name} <${validated.data.email}>: "${validated.data.message}"`
      );
    }

    revalidatePath('/store');
    revalidatePath('/admin/store');
    revalidatePath('/admin/inbox');

    return {
      success: true,
      message:
        'Your enquiry has been dispatched to our cultural liaison and artisan guild coordinator. We will connect with you via email with availability and dispatch details.',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'An unexpected error occurred while processing your enquiry.',
    };
  }
}

/**
 * Save or update Maker/Artisan
 */
export async function saveMakerAction(data: MakerInput): Promise<ActionResponse> {
  const user = await getCurrentUser();
  if (!hasPermission(user.role, PERMISSIONS.STORE_MANAGE)) {
    throw new Error('Unauthorized: Insufficient permissions to manage store artisans.');
  }

  const validated = makerSchema.parse(data);

  try {
    let maker: any;
    if (validated.id) {
      maker = await prisma.maker.update({
        where: { id: validated.id },
        data: {
          name: validated.name,
          slug: validated.slug,
          place_of_origin: validated.place_of_origin,
          photo_id: validated.photo_id,
          story: validated.story || undefined,
          links: validated.links || undefined,
          status: validated.status as ContentStatus,
          is_demo: validated.is_demo,
        },
      });
    } else {
      maker = await prisma.maker.create({
        data: {
          name: validated.name,
          slug: validated.slug,
          place_of_origin: validated.place_of_origin,
          photo_id: validated.photo_id,
          story: validated.story || undefined,
          links: validated.links || undefined,
          status: validated.status as ContentStatus,
          is_demo: validated.is_demo,
        },
      });
    }

    revalidatePath('/store');
    revalidatePath('/admin/store');
    revalidatePath(`/makers/${maker.slug}`);

    return { success: true, data: maker };
  } catch (err: any) {
    console.error('Failed to save maker:', err);
    return { success: false, error: err.message || 'Failed to save maker.' };
  }
}

/**
 * Save or update Product
 */
export async function saveProductAction(data: ProductInput): Promise<ActionResponse> {
  const user = await getCurrentUser();
  if (!hasPermission(user.role, PERMISSIONS.STORE_MANAGE)) {
    throw new Error('Unauthorized: Insufficient permissions to manage store crafts.');
  }

  const validated = productSchema.parse(data);

  try {
    let product: any;
    if (validated.id) {
      product = await prisma.product.update({
        where: { id: validated.id },
        data: {
          title: validated.title,
          slug: validated.slug,
          maker_id: validated.maker_id,
          description: validated.description,
          price_amount: validated.price_amount,
          currency: validated.currency,
          materials: validated.materials,
          origin_place: validated.origin_place,
          availability: validated.availability as ProductAvailability,
          enquiry_only: validated.enquiry_only,
          images: validated.images,
          status: validated.status as ContentStatus,
          is_demo: validated.is_demo,
        },
      });
    } else {
      product = await prisma.product.create({
        data: {
          title: validated.title,
          slug: validated.slug,
          maker_id: validated.maker_id,
          description: validated.description,
          price_amount: validated.price_amount,
          currency: validated.currency,
          materials: validated.materials,
          origin_place: validated.origin_place,
          availability: validated.availability as ProductAvailability,
          enquiry_only: validated.enquiry_only,
          images: validated.images,
          status: validated.status as ContentStatus,
          is_demo: validated.is_demo,
        },
      });
    }

    revalidatePath('/store');
    revalidatePath('/admin/store');
    revalidatePath(`/store/${product.slug}`);

    return { success: true, data: product };
  } catch (err: any) {
    console.error('Failed to save product:', err);
    return { success: false, error: err.message || 'Failed to save craft item.' };
  }
}

/**
 * Delete a product
 */
export async function deleteProductAction(id: string): Promise<ActionResponse> {
  const user = await getCurrentUser();
  if (!hasPermission(user.role, PERMISSIONS.STORE_MANAGE)) {
    throw new Error('Unauthorized: Insufficient permissions to delete store items.');
  }

  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/store');
    revalidatePath('/admin/store');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete craft item.' };
  }
}

/**
 * Update enquiry status in admin queue
 */
export async function updateEnquiryStatusAction(
  id: string,
  status: string
): Promise<ActionResponse> {
  const user = await getCurrentUser();
  if (!hasPermission(user.role, PERMISSIONS.STORE_MANAGE)) {
    throw new Error('Unauthorized: Insufficient permissions to update enquiries.');
  }

  try {
    await prisma.productEnquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/store');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update enquiry status.' };
  }
}
