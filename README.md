# 🌊 Red Sea Monitor

> **An independent, English-language editorial and science platform about Egypt’s Red Sea coast and Eastern Desert.**  
> *A field journal, not a template.*

---

## 📌 Project Overview

**Red Sea Monitor** is a scientific field journal and environmental intelligence platform serving researchers, divers, journalists, students, and conservation stewards. It pairs peer-reviewed scientific verification with investigative environmental journalism across Egypt's Red Sea governorate and Eastern Desert.

### Signature Capabilities
- **A Field Journal, Not a Template:** Warm paper backgrounds (`#F7F3EC`), deep ink (`#0E1A1F`), Fraunces display serif, JetBrains Mono coordinates, and contour bathymetry art. No SaaS gradients or generic card grids.
- **Red Sea Watch Telemetry & Privacy:** Community wildlife observation pipeline with automatic ~11km spatial coordinate blurring for vulnerable species (*Dugong dugon*, *Chelonia mydas*, sharks).
- **Mandatory Source Citation Verification:** News and investigations require verified publisher URLs before publishing.
- **Full Role-Based Access Control (RBAC):** Server-enforced permissions for `ADMIN`, `EDITOR`, `REVIEWER`, and `CONTRIBUTOR`.
- **Flagged Sample Data Engine:** All demo records feature an editorial `is_demo = true` badge and can be wiped with one click from the Admin Console.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Components, Server Actions, Strict TypeScript) |
| **Styling** | Tailwind CSS + CSS Variables for design tokens + `clsx` & `tailwind-merge` |
| **Typography** | Fraunces Display Serif, Source Sans 3, JetBrains Mono |
| **Database** | PostgreSQL 16 + PostGIS extension |
| **ORM** | Prisma ORM with migrations & comprehensive seed dataset |
| **Authentication & RBAC** | Role-based access control with server-side permission guards |
| **Icons** | Lucide React (1.5px stroke) |
| **Deployment** | Docker Compose with PostGIS / Vercel ready |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js >= 20.x (tested on v26.4.0)
- `pnpm` >= 9.x (tested on v12.9.0)

### 2. Setup & Development Server
```bash
# Clone and enter workspace
cd /data/user/0/com.termux/files/home/.gemini/antigravity-cli/scratch/red-sea-monitor

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env

# Generate Prisma Client
pnpm prisma:generate

# Start development server
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Key Navigation Routes
- **Public Field Journal:** [http://localhost:3000](http://localhost:3000)
- **Living Styleguide & Design System:** [http://localhost:3000/styleguide](http://localhost:3000/styleguide)
- **Admin Workspace:** [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Testing Different User Roles
Use the floating **Role Simulator** at the bottom-right corner to test the platform as:
- `ADMIN`: Full authority, user administration, demo data purge.
- `EDITOR`: Content creation, news verification, publishing pipeline.
- `REVIEWER`: Scientific moderation of wildlife sightings and taxonomy.
- `CONTRIBUTOR`: Draft authoring only; cannot publish without editorial signoff.

---

## 📂 Project Architecture

```
red-sea-monitor/
├── docs/
│   ├── ASSUMPTIONS.md          # Architectural assumptions
│   ├── ARCHITECTURE.md         # System design diagrams
│   ├── CONTENT-GUIDE.md        # Editorial verification rules
│   ├── DATA-POLICY.md          # Sighting coordinate blurring rules
│   ├── DESIGN-LOG.md           # Design briefs, critiques & audits
│   └── OPERATIONS.md           # Production deploy & backups
├── prisma/
│   ├── schema.prisma           # Relational PostGIS schema
│   └── seed.ts                 # Verified sample dataset (is_demo = true)
├── src/
│   ├── app/
│   │   ├── (site)/             # Public pages (Home, News, Watch, etc.)
│   │   ├── (admin)/admin/      # Admin workspace & overview
│   │   ├── styleguide/         # Design system documentation
│   │   └── layout.tsx          # Root layout & skip link
│   ├── components/
│   │   ├── ui/                 # Atomic UI primitives
│   │   ├── site/               # Masthead, footer, role switcher
│   │   └── admin/              # Admin sidebar & widgets
│   ├── lib/
│   │   ├── db.ts               # Prisma client singleton
│   │   ├── auth.ts             # Session & role helper
│   │   ├── permissions.ts      # RBAC permission matrix
│   │   └── geo.ts              # Coordinate blurring & DMS formatting
│   └── styles/
│       ├── tokens.css          # Design tokens & fluid clamps
│       └── globals.css         # Typography, bathymetry textures, focus rings
├── docker-compose.yml          # Containerized PostGIS + App
└── package.json
```

---

## 🧪 Phase 1 Foundation Status: COMPLETE
- [x] Project scaffold initialized with Next.js 15, React 19, TypeScript strict.
- [x] Natural field journal design tokens configured (`--paper`, `--ink`, `--sea-700`, `--coral-500`).
- [x] Fraunces display serif, Source Sans 3, and JetBrains Mono integrated with fluid typography clamps.
- [x] Complete atomic UI kit implemented (`Button`, `LinkArrow`, `Badge`, `Tag`, `CoordinateTag`, `SampleBadge`, `SectionHeader`, `Figure`, `EmptyState`, `Skeleton`, `Prose`, `Breadcrumbs`, `Pagination`, `FilterBar`, `FormControls`, `Cards`).
- [x] Full PostgreSQL + PostGIS schema designed in Prisma with UUID keys, soft delete, and `is_demo`.
- [x] Living Styleguide route operational at `/styleguide`.
- [x] Responsive layout shell built (masthead with live coordinates ticker, mobile menu drawer, field footer).
- [x] Admin Workspace shell built at `/admin` with KPI counters, content health alerts, and demo data manager.
- [x] Seed script written with 6 places, 8 species, 3 routes, 6 library items, 4 opportunities, 2 volunteer programs, 5 articles, and 10 sightings.
- [x] `docs/ASSUMPTIONS.md`, `docs/DESIGN-LOG.md`, `docs/CONTENT-GUIDE.md`, `docs/DATA-POLICY.md`, `docs/OPERATIONS.md`, and `docs/ARCHITECTURE.md` populated.
