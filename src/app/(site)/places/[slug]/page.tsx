import { redirect } from 'next/navigation';
import { SEED_PLACES } from '@/lib/seed-data';

interface PlaceRedirectProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SEED_PLACES.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PlaceRedirectPage({ params }: PlaceRedirectProps) {
  const { slug } = await params;
  redirect(`/explorer/places/${slug}`);
}
