import { prisma } from '@/lib/db';
import { ProductAvailability, ContentStatus } from '@prisma/client';
import { SEED_MAKERS, SEED_PRODUCTS, SEED_PRODUCT_ENQUIRIES } from '@/lib/seed-data';

export function isStoreFeatureEnabled(): boolean {
  return process.env.NEXT_PUBLIC_STORE_ENABLED === 'true';
}

export async function getMakers() {
  try {
    const makers = await prisma.maker.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
      },
      include: {
        products: {
          where: { status: ContentStatus.PUBLISHED },
          select: { id: true, title: true, slug: true, availability: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    return makers;
  } catch {
    return SEED_MAKERS.map((m) => ({
      ...m,
      products: SEED_PRODUCTS.filter((p) => p.maker_id === m.id || p.maker_id === m.slug),
    }));
  }
}

export async function getMakerBySlug(slug: string) {
  try {
    const maker = await prisma.maker.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: ContentStatus.PUBLISHED },
          orderBy: { created_at: 'desc' },
        },
      },
    });
    if (maker) return maker;
  } catch {
    // fallback
  }

  const found = SEED_MAKERS.find((m) => m.slug === slug || m.id === slug);
  if (!found) return null;

  const products = SEED_PRODUCTS.filter(
    (p) => p.maker_id === found.id || p.maker_id === found.slug
  );

  return {
    ...found,
    products,
  };
}

export async function getMakerById(id: string) {
  try {
    return await prisma.maker.findUnique({
      where: { id },
      include: { products: true },
    });
  } catch {
    const found = SEED_MAKERS.find((m) => m.id === id || m.slug === id);
    if (!found) return null;
    return {
      ...found,
      products: SEED_PRODUCTS.filter((p) => p.maker_id === found.id),
    };
  }
}

export async function getProducts(options?: {
  makerId?: string;
  availability?: ProductAvailability | 'ALL';
  search?: string;
  limit?: number;
}) {
  const { makerId, availability, search, limit = 50 } = options || {};

  try {
    const where: any = {
      status: ContentStatus.PUBLISHED,
    };

    if (makerId && makerId !== 'ALL') {
      where.maker_id = makerId;
    }

    if (availability && availability !== 'ALL') {
      where.availability = availability;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { materials: { contains: search, mode: 'insensitive' } },
        { origin_place: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await prisma.product.findMany({
      where,
      include: {
        maker: {
          select: { id: true, name: true, slug: true, place_of_origin: true },
        },
      },
      orderBy: { created_at: 'desc' },
      take: limit,
    });
  } catch {
    let list = [...SEED_PRODUCTS].map((p) => {
      const maker = SEED_MAKERS.find((m) => m.id === p.maker_id || m.slug === p.maker_id);
      return {
        ...p,
        maker: maker
          ? { id: maker.id, name: maker.name, slug: maker.slug, place_of_origin: maker.place_of_origin }
          : { id: 'mkr-01', name: 'Field Artisan Guild', slug: 'artisan-guild', place_of_origin: 'Red Sea' },
      };
    });

    if (makerId && makerId !== 'ALL') {
      list = list.filter((p) => p.maker_id === makerId || p.maker?.slug === makerId);
    }

    if (availability && availability !== 'ALL') {
      list = list.filter((p) => p.availability === availability);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials?.toLowerCase().includes(q) ||
          p.origin_place?.toLowerCase().includes(q)
      );
    }

    return list.slice(0, limit);
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        maker: true,
      },
    });
    if (product) return product;
  } catch {
    // fallback
  }

  const p = SEED_PRODUCTS.find((item) => item.slug === slug || item.id === slug);
  if (!p) return null;

  const maker = SEED_MAKERS.find((m) => m.id === p.maker_id || m.slug === p.maker_id);
  return {
    ...p,
    maker: maker || {
      id: 'mkr-01',
      name: 'Field Artisan Guild',
      slug: 'artisan-guild',
      place_of_origin: 'Red Sea',
      story: { bio: 'Traditional Red Sea artisan collaborative.' },
    },
  };
}

export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: { maker: true },
    });
  } catch {
    const p = SEED_PRODUCTS.find((item) => item.id === id || item.slug === id);
    if (!p) return null;
    const maker = SEED_MAKERS.find((m) => m.id === p.maker_id || m.slug === p.maker_id);
    return {
      ...p,
      maker: maker || null,
    };
  }
}

export async function getStoreEnquiries() {
  try {
    return await prisma.productEnquiry.findMany({
      include: {
        product: {
          select: { id: true, title: true, slug: true, price_amount: true, currency: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  } catch {
    return SEED_PRODUCT_ENQUIRIES.map((enq) => ({
      ...enq,
      product: {
        id: enq.product_id,
        title: enq.product_title,
        slug: enq.product_id === 'prd-01' ? 'wadi-doum-harvest-basket' : 'hand-carved-acacia-compass-box',
        price_amount: enq.product_id === 'prd-01' ? 1450 : 2200,
        currency: 'EGP',
      },
    }));
  }
}

export async function getStoreStats() {
  try {
    const [productsCount, makersCount, enquiriesCount] = await Promise.all([
      prisma.product.count({ where: { status: ContentStatus.PUBLISHED } }),
      prisma.maker.count({ where: { status: ContentStatus.PUBLISHED } }),
      prisma.productEnquiry.count(),
    ]);
    return { productsCount, makersCount, enquiriesCount };
  } catch {
    return {
      productsCount: SEED_PRODUCTS.length,
      makersCount: SEED_MAKERS.length,
      enquiriesCount: SEED_PRODUCT_ENQUIRIES.length,
    };
  }
}
