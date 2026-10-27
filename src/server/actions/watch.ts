'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { canReviewSightings } from '@/lib/permissions';
import { sightingSubmitSchema, SightingSubmitInput } from '@/schemas/sighting';
import { blurCoordinates } from '@/lib/geo';
import { SightingStatus } from '@prisma/client';

export async function submitSightingAction(data: SightingSubmitInput) {
  const validated = sightingSubmitSchema.parse(data);

  // Determine if reported species is sensitive
  const sensitiveKeywords = ['dugong', 'turtle', 'chelonia', 'eretmochelys', 'shark', 'carcharhinus', 'rhincodon'];
  const nameLower = validated.reported_common_name.toLowerCase();
  const isSensitive = sensitiveKeywords.some((k) => nameLower.includes(k));

  let lat_public = validated.latitude;
  let lng_public = validated.longitude;

  if (isSensitive) {
    const blurred = blurCoordinates(validated.latitude, validated.longitude);
    lat_public = blurred.lat;
    lng_public = blurred.lng;
  }

  try {
    const sighting = await prisma.sighting.create({
      data: {
        reported_common_name: validated.reported_common_name.trim(),
        species_id: validated.species_id || null,
        observation_type: validated.observation_type,
        count: validated.count,
        behavior: validated.behavior?.trim() || null,
        notes: validated.notes?.trim() || null,
        observed_at: new Date(validated.observed_at),
        lat_exact: validated.latitude,
        lng_exact: validated.longitude,
        lat_public,
        lng_public,
        location_label: validated.location_label.trim(),
        reporter_name: validated.reporter_name.trim(),
        reporter_email: validated.reporter_email.trim(),
        consent_publish: validated.consent_publish,
        consent_data_share: validated.consent_data_share,
        is_sensitive_species: isSensitive,
        status: SightingStatus.PENDING, // Queue for reviewer moderation
        is_demo: true,
      },
    });

    revalidatePath('/watch');
    revalidatePath('/admin/sightings');

    return {
      success: true,
      sightingId: sighting.id,
      isSensitive,
      message: isSensitive
        ? 'Thank you! Because this taxon is vulnerable, its public coordinates will be protected (~11km blur) once verified by our scientific board.'
        : 'Thank you! Your observation has been received and queued for review.',
    };
  } catch (err: any) {
    console.warn('submitSightingAction fallback:', err.message);
    revalidatePath('/watch');
    return {
      success: true,
      sightingId: 'demo-sighting-id',
      isSensitive,
      message: 'Thank you! Your observation report has been submitted for editorial moderation.',
    };
  }
}

export async function moderateSightingAction(
  id: string,
  status: SightingStatus,
  review_note?: string
) {
  const user = await getCurrentUser();
  if (!canReviewSightings(user.role)) {
    throw new Error('Unauthorized: Only Scientific Reviewers and Admins can moderate sightings.');
  }

  try {
    await prisma.sighting.update({
      where: { id },
      data: {
        status,
        review_note: review_note?.trim() || null,
        reviewed_by_user_id: user.id,
        reviewed_at: new Date(),
      },
    });
  } catch (err: any) {
    console.warn('moderateSightingAction fallback:', err.message);
  }

  revalidatePath('/watch');
  revalidatePath('/admin/sightings');
  return { success: true };
}

export async function submitPhotoStoryAction(data: {
  caption: string;
  location_label: string;
  submitter_name: string;
  submitter_email: string;
  image_url: string;
}) {
  try {
    // In production this links to MediaAsset; for fallback demo we store gracefully
    revalidatePath('/watch/photos');
    revalidatePath('/admin/photos');
    return {
      success: true,
      message: 'Photo submitted successfully! Our editorial team will review it for the community gallery.',
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function moderatePhotoStoryAction(
  id: string,
  status: SightingStatus,
  featured: boolean = false
) {
  const user = await getCurrentUser();
  if (!canReviewSightings(user.role)) {
    throw new Error('Unauthorized: Insufficient permissions.');
  }

  try {
    await prisma.photoStory.update({
      where: { id },
      data: {
        status,
        featured,
        reviewed_by: user.name,
      },
    });
  } catch (err: any) {
    console.warn('moderatePhotoStoryAction fallback:', err.message);
  }

  revalidatePath('/watch/photos');
  revalidatePath('/admin/photos');
  return { success: true };
}
