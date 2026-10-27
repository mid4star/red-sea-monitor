# Technical & Architecture Assumptions — Red Sea Monitor

This document records architectural, design, and environment assumptions made during implementation in accordance with prompt guidelines.

## 1. Environment & Runtime
- **Runtime Platform:** Linux Termux environment (Node.js v26.4.0, pnpm v12.9.0).
- **Package Manager:** `pnpm` is strictly adhered to for all node operations.
- **Docker in Local Termux vs Production:** Docker is not available natively inside standard Android/Termux user space. Therefore, a complete `docker-compose.yml` (PostgreSQL 16 + PostGIS 3.4) and production Dockerfile are provided for server/container deployments. For local development on Termux, a direct PostgreSQL connection string (or local PostgreSQL via Termux services / remote Supabase / Neon connection) is configured in `.env`.
- **Database Engine & PostGIS:** PostgreSQL with PostGIS extensions. For Prisma, coordinates are stored with structured latitude/longitude floating-point pairs alongside PostGIS geometry compatibility fields, allowing both native Prisma Client queries and raw PostGIS spatial queries (`ST_DWithin`, `ST_Point`, etc.).

## 2. Design Tokens & Visual Hierarchy
- **Palette:** Implemented strictly per Part 2 specifications:
  - Ink: `#0E1A1F`
  - Paper: `#F7F3EC`
  - Deep Sea: `#071418` (Dark mode surface)
  - Sea tones: `#06303A` (sea-900), `#0B5566` (sea-700), `#1B8CA0` (sea-500), `#D8EEF0` (sea-100)
  - Desert Sand: `#E3D3B4` (sand-300), `#B08D57` (sand-600)
  - Accent: `#E4573D` (coral-500)
- **Typography Loading:** Web font fallbacks and Google Font CDN links for Fraunces, Source Sans 3, and JetBrains Mono with fluid `clamp()` type scaling in CSS variables.
- **No-Slop Philosophy:** No purple/blue SaaS gradient heroes, no glassmorphism blobs, no emoji as icons, no repeating identical 3-column card grids.

## 3. Privacy & Sensitive Species Obfuscation
- **Public vs Exact Location:** Public sighting endpoints and public species distribution queries always return `location_public` (generalized to ~11km / 0.1° bounding box centroids for sensitive species like Dugongs, Sea Turtles, and Sharks). Raw `location_exact` and submitter email are restricted to `ADMIN`, `EDITOR`, and `REVIEWER` roles server-side.
- **Image EXIF:** Client & server upload processing strips GPS coordinates before storing public assets.

## 4. Role-Based Access Control (RBAC)
- 4 defined roles:
  1. `ADMIN`: System configuration, user management, audit logs, wipe demo data.
  2. `EDITOR`: Full editorial pipeline (Articles, Headlines, Library, Explorer, Opportunities).
  3. `REVIEWER`: Scientific moderation (Sightings, Photo stories, taxonomy verification).
  4. `CONTRIBUTOR`: Draft submission only.
- Mock session / local credentials authentication enabled in Phase 1 to allow immediate testing across all roles.

## 5. Seed Data & Sample Flags
- All seed records set `is_demo = true` and display an editorial "Sample" badge.
- Dashboard includes a single-action demo data manager to purge all demo records.


## 6. Sovereign Basin Littoral States & Editorial Inclusions (v3 Scope)
- **Active Sovereign Littoral States (7 published):**
  1. Egypt (`EG`): `is_littoral: true, is_published: true, status: 'ACTIVE'`
  2. Sudan (`SD`): `is_littoral: true, is_published: true, status: 'ACTIVE'`
  3. Saudi Arabia (`SA`): `is_littoral: true, is_published: true, status: 'ACTIVE'`
  4. Jordan (`JO`): `is_littoral: true, is_published: true, status: 'ACTIVE'`
  5. Eritrea (`ER`): `is_littoral: true, is_published: true, status: 'ACTIVE'`
  6. Yemen (`YE`): `is_littoral: true, is_published: true, status: 'ACTIVE'`
  7. Djibouti (`DJ`): `is_littoral: true, is_published: true, status: 'ACTIVE'` (Editorial note: Flanks Bab-el-Mandeb and Gulf of Tadjoura)
- **Regional Partners (1 baseline):**
  8. Somalia (`SO`): `is_littoral: false, is_published: false, status: 'COMING_SOON'` (Editorial note: Gulf of Aden partner coastline outside the central rift)
- **Country Scope Mandate (Owner Directive):**
  - Country scope set by the platform owner; changes require an admin decision.
  - The platform strictly covers seven coastal countries: Egypt, Sudan, Eritrea, Djibouti, Yemen, Saudi Arabia, and Jordan.
  - Somalia appears only as an optional Gulf of Aden partner (not counted in coastal totals, hidden unless `show_partners = true`).
  - Israel is completely deleted and excluded from all country rows, datasets, marine-region links, places, sightings, headlines, opportunities, volunteer programmes, organizations, routes, navigation, maps, and sitemaps. Route `/countries/il` returns 404.
- **Single Source of Truth:**
  - `src/lib/basin-stats.ts` dynamically derives the active littoral state count (`COUNT(is_littoral AND is_published) = 7`) and provides provenance sources (PERSGA, UNEP-WCMC, WDPA, IHO) for every figure. Counts agree consistently across hero stats, basin stat cards, country chips, and footer lists.
