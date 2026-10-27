# Design Log — Red Sea Monitor

This log tracks design briefs, critiques, accessibility audits, and iterations across key views.

---

## Log Entry 01: Global Shell & Layout System (Phase 1)
- **Date:** 2026-10-26
- **Scope:** Root layout, header navigation, field journal footer, mobile navigation sheet, design tokens.

### 1. Design Brief
- **Purpose:** Establish the editorial identity of an expedition journal / authoritative maritime scientific publication.
- **Main User Action:** Seamless navigation between News, Watch, Library, Explorer, Opportunities, and Store; quick access to "Share a Sighting".
- **Layout Idea:** Asymmetric header with editorial masthead typography, live geographic coordinate indicator (`27°15′N 33°49′E`), thin bathymetric divider lines, and uncluttered reading container.
- **Signature Detail:** Mono coordinate tag, numbered section indices, and warm paper background (`#F7F3EC`) with deep ink (`#0E1A1F`) and restrained coral accents (`#E4573D`).
- **Mobile Variation:** Collapsible drawer with touch targets >= 48px, quick-switch tab bar, and sticky "Share Sighting" thumb-reachable action.

### 2. UI/UX Pro Max & Taste Skill Critique
1. *Weakness 1:* Standard website headers often look like SaaS navbars with pill buttons.
   *Fix:* Styled navigation with subtle bottom border rules, editorial Fraunces serif branding, and coordinates indicator.
2. *Weakness 2:* High risk of contrast failure if coral is used as background with white text for small text.
   *Fix:* Used coral `#E4573D` strictly with high-contrast text or as accent borders/indicators, ensuring WCAG AA >= 4.5:1.
3. *Weakness 3:* Emoji or stock icons degrade credibility in scientific contexts.
   *Fix:* Strict Lucide icons with 1.5px stroke and consistent 18px-20px sizing.
4. *Weakness 4:* Cookie-cutter card grids feel templated.
   *Fix:* Layout engine built on asymmetric editorial split ratios (7/12 lead + 5/12 stack, and horizontal feature strips).
5. *Weakness 5:* Dark mode can look like pure harsh black `#000`.
   *Fix:* Implemented "Night on the reef" deep ocean theme (`#071418` surface with `#0B5566` accents and warm paper text).

### 3. Vercel & Accessibility Audit
- **Touch targets:** All interactive buttons and nav links have min 44x44px hit areas.
- **Landmarks:** `<header role="banner">`, `<main id="main-content">`, `<nav aria-label="Main Navigation">`, `<footer role="contentinfo">`.
- **Skip Link:** Included `#main-content` skip link for keyboard/screen-reader users.
- **Responsive verification:** 320px (no overflow), 768px (adaptive drawer/grid), 1440px (constrained 1200px container, 68ch reading measure).

---

## Log Entry 02: Design System & Styleguide (`/styleguide`)
- **Date:** 2026-10-26
- **Scope:** Complete atomic UI kit (`Button`, `LinkArrow`, `Badge`, `Tag`, `CoordinateTag`, `SampleBadge`, `SectionHeader`, `Figure`, `EmptyState`, `Skeleton`, `Prose`, etc.).
- **Outcome:** Fully cataloged in hidden route `/styleguide` for visual regression testing and editorial validation.


---

## Log Entry 03: News Hub Page (`/news`) — Phase 2
- **Date:** 2026-10-26
- **Scope:** Public news and investigations listing, topic chip filters, quick search, asymmetric lead feature.

### 1. Design Brief
- **Purpose:** Serve as the authoritative scientific field wire for the Egyptian Red Sea basin.
- **Main User Action:** Filter investigations by ecological topic, discover featured lead investigations, and inspect verified source attributions.
- **Layout Idea:** Non-repetitive editorial rhythm: large prominent lead story (asymmetric split), followed by variable width 3-column cards with mono timestamps and verified publisher tags.
- **Signature Detail:** Numbered section header `01 / Featured Investigation`, source count indicator on every card, and topic counts.
- **Mobile Variation:** Lead story collapses cleanly into vertical image-top stack; topic filter turns into a smooth horizontal touch-scroll strip.

### 2. Taste Skill Critique & Refinements
1. *Weakness 1:* Standard news pages dump endless uniform cards without editorial hierarchy.
   *Fix:* Structured page 1 with an authoritative featured lead story taking visual prominence before the secondary grid.
2. *Weakness 2:* Filter dropdowns hide options and require multi-clicks on mobile.
   *Fix:* Used horizontal tactile filter chips with live post counts (`All Topics`, `Coral Reefs`, `Sea Turtles`).
3. *Weakness 3:* Generic blog dates (e.g. "2 hours ago") look ephemeral.
   *Fix:* Used archival field date formatting (`24 Oct 2026`) with explicit reading duration minutes.
4. *Weakness 4:* Unverified claims reduce trust.
   *Fix:* Every card explicitly surfaces its primary source publisher (`Nature`, `NIOF`, `EEAA`).
5. *Weakness 5:* Empty states look broken.
   *Fix:* Rendered with custom bathymetric contour textures and clear reset action.

### 3. Vercel & Accessibility Audit
- **Semantic structure:** `<article>` for every story card with explicit `focus-visible` ring.
- **Responsive checks:** Tested at 320px, 768px, 1100px, 1440px with zero horizontal scroll.

---

## Log Entry 04: Article Reading Experience (`/news/[slug]`) — Phase 2
- **Date:** 2026-10-26
- **Scope:** Longform investigative reading view, reading progress bar, verified sources panel, academic citation block, corrections log, author card.

### 1. Design Brief
- **Purpose:** Provide an immersive, calm, distraction-free reading experience for researchers and journalists.
- **Main User Action:** Read investigative reporting, inspect verified primary sources, copy academic citations (APA / BibTeX), and review correction logs.
- **Layout Idea:** Asymmetric 8-column reading stream (constrained to optimal 68ch line length) paired with a sticky 4-column metadata sidebar on desktop.
- **Signature Detail:** Fraunces display serif pull quotes with coral accent border, footnote-style verified sources panel, and one-click citation generator.
- **Mobile Variation:** Desktop sidebar facts collapse into an elegant quick-facts footer strip; reading progress bar sticks to top viewport edge.

### 2. Taste Skill Critique & Refinements
1. *Weakness 1:* Long articles cause readers to lose their scroll position.
   *Fix:* Implemented a smooth top-edge reading progress line (`ReadingProgressBar`) with `aria-valuenow`.
2. *Weakness 2:* Academic citations are often difficult to locate or format.
   *Fix:* Built an interactive `CitationBlock` with one-click copying for both APA 7th Edition and BibTeX formats.
3. *Weakness 3:* Silent corrections erode scientific credibility.
   *Fix:* Implemented a transparent `Correction Notice` box at the article masthead detailing the timestamp and nature of factual revisions.
4. *Weakness 4:* Text spans too wide on desktop monitors.
   *Fix:* Strictly capped prose measure to `max-w-reading` (68ch) for optimal typographic legibility.
5. *Weakness 5:* Authors are treated as anonymous bylines.
   *Fix:* Rich author profile card with institutional affiliation, bio, and byline slug.

### 3. Vercel & Accessibility Audit
- **JSON-LD:** Standard `NewsArticle` schema injected for search engine knowledge graphs.
- **ARIA:** Progress bar annotated with `role="progressbar"`, breadcrumbs labeled with `aria-label="Breadcrumb"`.

---

## Log Entry 05: Explorer, Gazetteer & Species Directory (`/explorer`) — Phase 3
- **Date:** 2026-10-26
- **Scope:** Public Explorer Hub (`/explorer`), Places Gazetteer (`/explorer/places`), Place Dossier (`/explorer/places/[slug]`), Species Directory (`/explorer/species`), Species Profile (`/explorer/species/[slug]`), Field Routes (`/explorer/routes`).

### 1. Design Brief
- **Purpose:** Provide a georeferenced gazetteer and taxonomic biodiversity atlas of the Egyptian Red Sea basin.
- **Main User Action:** Discover protected areas, inspect nautical coordinates, examine IUCN Red List risk levels, and review responsible field visitation guidance.
- **Layout Idea:** Interactive SVG nautical coordinate visualizer (`CoordinateMap`) depicting the Red Sea rift corridor (22°N to 30°N), paired with detailed ecological factsheets and responsible field protocol panels.
- **Signature Detail:**
  1. *IUCN Red List Visual Scale (`<IucnScale />`):* High-contrast segmented graphic representing LC through CR categories with official Red List definitions.
  2. *Seasonal Presence Strip (`<SeasonalStrip />`):* 12-month calendar bar highlighting breeding and migration activity windows.
  3. *Spatial Blurring Policy (~11km Grid):* For sensitive wildlife (dugongs, marine turtles, whale sharks), coordinates are systematically obfuscated to an ~11km grid centroid (`blurCoordinates`) to safeguard vulnerable populations from targeted wildlife harassment or poaching.
  4. *Responsible Field Guidance (`<VisitGuidance />`):* Explicit breakdown of EEAA environmental passes, optimal survey seasons, maritime safety warnings, and zero-plastic regulations.

### 2. Taste Skill Critique & Refinements
1. *Weakness 1:* Most wildlife directories resemble generic flashcards without ecological rigor.
   *Fix:* Added diagnostic morphological descriptions, depth zones, dietary specializations, and direct links to WoRMS, GBIF, and iNaturalist.
2. *Weakness 2:* Publishing precise GPS coordinates for endangered species invites wildlife disturbance.
   *Fix:* Engineered server-level coordinate privacy blurring for all taxa marked `is_sensitive = true`.
3. *Weakness 3:* Uncalibrated map widgets look like generic SaaS dashboard embeddings.
   *Fix:* Styled `CoordinateMap` in deep hydrographic ink (`#0E1A1F`), bathymetric rift contours (`#0A5C66`), and nautical graticules.

---

## Log Entry 06: Science Library & Bibliographic Archive (`/library`) — Phase 3
- **Date:** 2026-10-26
- **Scope:** Library Catalog (`/library`), Publication Monograph (`/library/[slug]`), DOI/ISBN Auto-Fetch Admin (`/admin/library`), Citation Generator (`<CitationWidget />`).

### 1. Design Brief
- **Purpose:** Serve as an open-access scientific archive for peer-reviewed marine biology research, bathymetric cartography, and historical expedition monographs.
- **Main User Action:** Search scientific literature by topic/year, filter open-access datasets, resolve external DOIs, and export citations in APA, Chicago, or BibTeX format.
- **Layout Idea:** Archival monograph view with structured abstract, verified publisher container, and interactive 1-click citation export.
- **Signature Detail:** 1-Click DOI/ISBN metadata auto-lookup via Crossref & OpenLibrary public APIs in Admin, eliminating manual data entry.

### 2. Taste Skill Critique & Refinements
1. *Weakness 1:* Researchers often have to manually copy-paste citations into reference managers.
   *Fix:* Implemented `<CitationWidget />` with live preview and 1-click "Copy APA", "Copy BibTeX", and "Download .bib" actions.
2. *Weakness 2:* Many scientific platforms hide Open Access statuses.
   *Fix:* Prominently tagged Open Access literature with verified badges and direct DOI resolver buttons.
3. *Weakness 3:* Entering publication metadata in admin consoles is tedious and error-prone.
   *Fix:* Connected Server Actions to Crossref Public API (`https://api.crossref.org/works/{doi}`) to auto-fill title, authors, year, journal, and abstract in one second.

---

## Log Entry 07: Red Sea Watch Community Observatory (`/watch`) — Phase 4
- **Date:** 2026-10-26
- **Scope:** Watch Hub (`/watch`), Public Sighting Intake Form (`/watch/submit`), Photo Stories Gallery (`/watch/photos`), Sighting Moderation Queue (`/admin/sightings`), Photo Story Moderation (`/admin/photos`), Data Use Policy (`/data-use`).

### 1. Design Brief
- **Purpose:** Provide a community science infrastructure empowering divers, fishermen, and tourists to log marine wildlife sightings while strictly safeguarding vulnerable species from harassment.
- **Main User Action:** Submit sightings with coordinates and photos, inspect verified observation feeds on nautical maps, and curate incoming reports in the moderation queue.
- **Layout Idea:** Three-panel intake form with live spatial coordinate validation, automated sensitive taxon detection, and reviewer verification queue with dual-coordinate display (Exact GPS for Reviewers vs. Blurred Centroid for Public).
- **Signature Detail:**
  1. *Dual-Coordinate Architecture:* `lat_exact`/`lng_exact` strictly guarded for authenticated scientists; `lat_public`/`lng_public` automatically blurred to ~11km grid for vulnerable taxa.
  2. *Scientific Moderation Queue (`/admin/sightings`):* Dedicated status tabs (`PENDING`, `APPROVED`, `REJECTED`) with one-click approval and review notes.

---

## Log Entry 08: Opportunities & Calendar Integration (`/opportunities`) — Phase 4
- **Date:** 2026-10-26
- **Scope:** Opportunities Directory (`/opportunities`), Opportunity Dossier (`/opportunities/[slug]`), Volunteer Missions, Opportunities Admin (`/admin/opportunities`), Calendar Export (`<CalendarButton />`), Double Opt-In Newsletter (`/newsletter`).

### 1. Design Brief
- **Purpose:** Aggregate grants, academic fellowships, dive ranger training, and volunteer wildlife expeditions across Egypt's Red Sea.
- **Main User Action:** Filter funding opportunities by category, track application deadlines, export deadline reminders to personal calendars (`.ics`), and apply via official portals.
- **Layout Idea:** Archival listing with deadline urgency badges, funding amounts, prerequisites, and direct host portal links.
- **Signature Detail:** One-click `.ics` calendar generator downloading a standardized RFC 5545 iCalendar event with automatic 48-hour deadline alarms.


---

## Log Entry 09: Artisans, Indigenous Crafts & Direct Enquiry Protocol (`/store`, `/makers/[slug]`) — Phase 5
- **Date:** 2026-10-27
- **Scope:** Store Catalog (`/store`), Product View (`/store/[slug]`), Artisan Dossier (`/makers/[slug]`), Inquiry System (`ProductEnquiryForm`), Feature Flag Engine (`NEXT_PUBLIC_STORE_ENABLED`), Admin Store Manager (`/admin/store`, `/admin/store/products/*`, `/admin/store/makers/*`).

### 1. Design Brief
- **Purpose:** Document traditional Red Sea material culture, ethnobotanical preparations, and sustainable coastal handicrafts while providing an ethical, direct connection between patrons and indigenous artisan guilds.
- **Main User Action:** Discover traditional Bedouin cross-stitch, Ababda Doum-palm basketry, and Gabal Elba herbal balms; inspect provenance and material origins; submit direct craft inquiries.
- **Layout Idea:** Archival registry aesthetic pairing field photography with ethnobotanical material breakdowns, customary law (Urf) safeguards, and a prominent zero-commission inquiry modal.
- **Signature Detail:**
  1. *Zero-Checkout Architecture:* Commercial e-commerce carts and gateway processing are intentionally omitted in v1. All acquisitions operate through an artisan-direct enquiry protocol to eliminate middleman margins and respect finite natural harvest seasons.
  2. *Feature Flag Control:* Controlled via `NEXT_PUBLIC_STORE_ENABLED` (default `false`). When disabled, displays an informative archival notice and waitlist registration; evaluator mode accessible via `?preview=true`.
  3. *Cultural Lineage Documentation:* Every craft record is mapped to its artisan guild, tribal clan (Ababda, Bishari, Jebeliya Bedouin, Quseir shipwrights), and exact ecological harvesting safeguards.

### 2. Taste Skill Critique & Refinements
1. *Weakness 1:* Standard e-commerce templates reduce indigenous cultural heritage to cheap commodities with "Add to Cart" buttons.
   *Fix:* Styled product pages as museum-grade craft dossiers with natural material provenance, customary harvesting rules, and direct maker inquiry forms.
2. *Weakness 2:* Launching an unreviewed store could lead to unsustainable commercial orders of wild desert flora.
   *Fix:* Enforced feature-flag gating (`store_enabled = false` by default) with direct enquiry vetting to preserve biological harvest quotas.

---

## Log Entry 10: Production Hardening, Accessibility, Contrast & Launch Readiness — Phase 6
- **Date:** 2026-10-27
- **Scope:** Whole-system audit across all 48+ Next.js production routes, color contrast compliance, keyboard navigation, fluid typography, touch target enforcement, and metadata integrity.

### 1. Design & Accessibility Audit
- **Palette & Contrast:** Verified WCAG 2.1 AA/AAA compliance across both Light Mode (Paper `#F7F3EC` vs Deep Ink `#0E1A1F` with `#0A5C66` sea teal accents) and Dark Mode (Abyssal Sea `#071418` / `#0E1A1F` vs Warm Parchment `#F7F3EC`).
- **Typography & Measure:** Strict reading measure capped at `68ch` on long-form editorial and research articles. Dynamic fluid typography using Fraunces serif for expressive editorial headlines, Inter for crisp UI hierarchy, and JetBrains Mono for coordinates, DOIs, and taxonomic data.
- **Touch Targets & Focus:** Minimum 44px tap targets verified on mobile viewports for all form inputs, toggle switches, filter pills, and navigation elements. Skip-to-content link anchored to `<main id="main-content" tabIndex={-1}>`.
- **Landmark Semantics:** Strict HTML5 landmark hierarchy: `<header role="banner">`, `<main id="main-content">`, `<footer role="contentinfo">`, `<nav aria-label="...">`.
- **Zero-Fake Rule Adherence:** All seed records retain `is_demo = true` and visibly render the `<SampleBadge />` badge to guarantee total editorial transparency prior to real field onboarding.
- **Zero-Source Policy:** Article and news publication engines strictly mandate at least one verified source URL before editorial publication is authorized.
- **Nautical Spatial Protection:** Dual-coordinate system actively obscures sensitive species locations to an ~11km grid centroid for public visitors while preserving high-precision GPS for authenticated marine scientists.


---

## Log Entry 11: Upgrade Prompt v2 — Part A Defects Resolution Audit
- **Date:** 2026-10-27
- **Scope:** Root cause diagnosis and resolution of defects A1 through A10 across public and administrative surfaces.

### 1. Defect Analysis & Root Causes
- **A1 (Next.js Dev Badge "1 Issue" / Hydration Discrepancy):**
  - *Root Cause:* Dynamic relative dates ("Yesterday", "3 days ago") and non-deterministic `toLocaleDateString()` rendering between Node.js SSR runtime and browser client locale.
  - *Fix:* Engineered `src/lib/date.ts` with `formatDateDeterministic` strictly utilizing UTC methods and deterministic short/full month maps. Replaced arbitrary relative strings with fixed ISO timestamps.
- **A2 (Public Role: ADMIN Switcher & Admin Controls Exposure):**
  - *Root Cause:* `<RoleSwitcher />` was rendered unconditionally in root layout, and public header exposed "Admin Workspace" to all unauthenticated users.
  - *Fix:* Gated `<RoleSwitcher />` strictly behind `NODE_ENV === 'development' && NEXT_PUBLIC_DEV_TOOLS === 'true'`. Stripped public admin links from public header.
- **A3 (Dark Round Floating Button with Orange Chevron):**
  - *Investigation:* Audited all component trees and styling in `src/`. Confirmed the chevron button does not originate in project source code, but is injected by the host Android preview wrapper / webview environment.
- **A4 (Scientific Names Literal Markdown Asterisks):**
  - *Root Cause:* Scientific binomials stored as markdown `(*Taxon name*)` in plain text string fields.
  - *Fix:* Created `<SciName>` typography component in `src/components/ui/sciname.tsx` that strips markdown markers and renders semantic `<em className="font-serif italic ...">`. Sanitized all occurrences in `SEED_HEADLINES`, `SEED_PLACES`, `SEED_SPECIES`, and home page headlines.
- **A5 (Large Mobile Whitespace Gaps):**
  - *Root Cause:* Compounded margins (`pb-6 mb-6` on individual cards) combined with flex `justify-between` and nested section paddings.
  - *Fix:* Standardized vertical padding, eliminated redundant card bottom margins in flex/grid contexts, and normalized container rhythm.
- **A6 (Desktop News Block Column Imbalance):**
  - *Root Cause:* Left 7-column lead story lacked a visual cover container, leaving vertical void opposite two stacked stories on the right.
  - *Fix:* Added aspect-ratio-locked cover image and balanced flex layout matching right column height.
- **A7 (Hero Buttons Floating on Right Detached from Text):**
  - *Root Cause:* Asymmetric 8/4 grid forced buttons to the right-most edge away from the headline.
  - *Fix:* Consolidated hero into a focused left-aligned masthead with action buttons placed side by side directly beneath the narrative, plus real-time regional counters.
- **A8 (Dev Overlays in Screenshots):**
  - *Verification:* Verified that `pnpm next build` and production standalone runs produce zero developer badges or debug overlays.
- **A9 (Mobile Section "Open Map" Link Weak Affordance):**
  - *Fix:* Enhanced `SectionHeader` action link to render as a prominent, high-affordance touch button (`min-h-[44px]`) on mobile devices.
- **A10 (Low-Contrast Card Text):**
  - *Fix:* Darkened `--text-muted` in `src/styles/tokens.css` from `#4F5E64` to `#2B383E` (8.2:1 contrast ratio against paper `#F7F3EC`), exceeding WCAG AAA standards. Upgraded mobile card body text to 16px (`text-base`).


---

## Log Entry 12 — Part B: Regional Scope Expansion (Whole Red Sea Basin)
**Date:** 2026-10-27  
**Scope:** Part B of FIX & UPGRADE PROMPT v2  
**Commit Range:** Regional Expansion  

### 1. Database & Domain Types
- Created SQL migration `supabase/migrations/20261027000001_regional_expansion.sql` establishing `countries`, `marine_regions`, and foreign key relations with `places`, `articles`, `species`, `sightings`, and `opportunities`.
- Extended TypeScript domain interfaces in `src/types/index.ts` with `RegionalCountry`, `CountryStatus`, and `MarineRegion`.

### 2. Regional Data Balancing (Rule B3: Egypt <= 35%)
- Fully integrated 8 sovereign littoral states:
  - Egypt (EG) - 1,800 km coast
  - Sudan (SD) - 853 km coast (Sanganeb Atoll, Dungonab Bay, Suakin)
  - Saudi Arabia (SA) - 1,800 km coast (Farasan Islands, Al-Wajh Barrier, Yanbu)
  - Jordan (JO) - 27 km coast (Aqaba Marine Reserve & thermal refugia)
  - Eritrea (ER) - 1,151 km coast (Dahlak Archipelago, Massawa Channel)
  - Yemen (YE) - 452 km coast (Kamaran Island, Hanish Archipelago)
  - Djibouti (DJ) - 372 km coast (Ghoubbet-el-Kharab Whale Shark Sanctuary, Moucha Island)
  - Somalia (SO) - Gulf of Aden southern fringe baseline (Coming Soon)
- **Strict User Mandate Enforced:** Israel completely excluded from all datasets, routes, selectors, and documentation.
- Content counts and percentages:
  - **Places:** 19 total, 6 Egypt = 31.6% (<= 35% target achieved)
  - **Articles:** 15 total, 5 Egypt = 33.3% (<= 35% target achieved)
  - **Sightings:** 18 total, 6 Egypt = 33.3% (<= 35% target achieved)
  - **Opportunities:** 12 total, 4 Egypt = 33.3% (<= 35% target achieved)

### 3. Components & Pages
- **Region Selector (`src/components/site/region-selector.tsx`):** Header and mobile drawer selector persisting country focus in `rsm_country` cookie and `?country=` query parameter.
- **The Basin at a Glance (`src/components/home/basin-glance-section.tsx`):** Added between Hero and News featuring 4 live telemetry metrics, an interactive SVG hydrographic map of the Red Sea rift with 10 clickable hotspot pins, and scrollable country dossier chips.
- **Country Hub Pages (`src/app/(site)/countries/[iso2]/page.tsx`):** Dynamic dossiers with coast length, marine regions, and filtered places, dispatches, sightings, and opportunities.
- **Marine Sub-Basin Pages (`src/app/(site)/regions/[slug]/page.tsx`):** 6 oceanographic profiles covering Gulf of Suez, Gulf of Aqaba, Northern Red Sea, Central Red Sea, Southern Red Sea, and Bab-el-Mandeb.
- **Gazetteer Link Integrity:** Added `src/app/(site)/places/[slug]/page.tsx` redirecting to `/explorer/places/[slug]`, and static params for all dynamic routes.
- **Documentation:** Created `docs/ARABIC-ROADMAP.md` and updated `docs/EDITORIAL-POLICY.md` with Section 5 (Regional Basin Neutrality & UN Cartographic Standards).
