# Architecture & System Design — Red Sea Monitor

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Red Sea Monitor Platform                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌──────────────────────┐                          ┌──────────────────────┐
│  Public Field Site   │                          │   Admin Workspace    │
│  (Next.js App Route) │                          │  (Protected /admin)  │
│                      │                          │                      │
│ - Field Hero Masthead│                          │ - Overview & Audits  │
│ - Verified News      │                          │ - Sightings Queue    │
│ - Watch GIS Map      │                          │ - Tiptap News Editor │
│ - Explorer Gazetteer │                          │ - Species/Places Map │
│ - Science Library    │                          │ - Library & DOI      │
│ - Opportunities      │                          │ - Demo Data Purge    │
└──────────┬───────────┘                          └──────────┬───────────┘
           │                                                 │
           └────────────────────────┬────────────────────────┘
                                    │ Server Actions & API Handlers
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Data & Security Services                        │
│                                                                        │
│  - RBAC Security Guard: ADMIN | EDITOR | REVIEWER | CONTRIBUTOR        │
│  - Sensitive Spatial Obfuscation: blurCoordinates(lat, lng) ~11km grid │
│  - EXIF GPS Stripping & Image Normalization                            │
│  - Mandatory Citation Verification for News Articles                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  PostgreSQL 16 + PostGIS Architecture                  │
│                                                                        │
│  - Relational Models: Articles, Sightings, Places, Species, Library    │
│  - All Content Tables: `is_demo boolean default false`                 │
│  - Soft Delete: `deleted_at timestamp null`                            │
│  - Spatial Geometry: PostGIS points, polygons, linestrings             │
└────────────────────────────────────────────────────────────────────────┘
```

## Security & Privacy Highlights
1. **Coordinate Safeguarding:** Endangered marine fauna coordinates are rounded server-side before reaching any public route or serialized JSON response.
2. **Double-Opt-In Subscriptions:** Newsletter subscribers require cryptographic token confirmation.
3. **Audit Trails:** Administrative mutations generate immutable audit logs recording user ID, action, diff, and hashed IP.
