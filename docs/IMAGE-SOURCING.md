# Image Sourcing, Review Gate & Ingestion Pipeline

## 1. Editorial Integrity Standards

To preserve the scientific authority of the **Red Sea Monitor**, all visual assets are governed by a mandatory review gate. Stock photos, aquarium displays, or unverified species representations degrade regional marine science credibility and are strictly barred.

### Visual Check Protocol (`media_assets.visual_check`)
Before any photograph is accepted into production:
1. **Setting Inspection:**
   - Must be verified **in-situ / wild open water** within the Red Sea basin rift or adjacent Gulf of Aden.
   - **Strictly Rejected:** Aquarium tanks, captive enclosures, artificial backgrounds, commercial fish markets, or studio setups.
2. **Species Authenticity:**
   - Taxon must be confirmed by scientific name (*binomial nomenclature*).
   - For example: *Amphiprion bicinctus* (Red Sea clownfish), *Dugong dugon* (Sirenian), *Rhincodon typus* (Whale Shark), *Chelonia mydas* (Green Turtle).
   - Look-alike species from the Pacific or Caribbean are prohibited.
3. **Place Authenticity:**
   - Place photographs must be georeferenced to the exact marine reserve, atoll, or coastal coordinate.
   - Generic coral photos may never represent a designated Marine Protected Area (e.g., Sanganeb Atoll, Aqaba Marine Reserve).
4. **Illustration Fallback:**
   - If an authenticated in-situ photograph is not available under a compliant license (CC-BY, CC-BY-SA, or verified editorial release), the platform displays an illustration from the vector illustration kit (`src/components/art/illustrations.tsx`), clearly badged **"Illustration"**.
   - The record is added to the internal **"Needs Photo"** editorial queue.

---

## 2. Image Manifest (`content/images/manifest.csv`)

Platform imagery can be managed centrally via the local file manifest at `content/images/manifest.csv`.

### Manifest Schema:
| Column | Description | Example |
| :--- | :--- | :--- |
| `file` | Image filename in `content/images/` | `hero-cover.jpg` |
| `record_type` | Schema type (`HERO`, `ARTICLE`, `PLACE`, `SPECIES`, `SIGHTING`) | `PLACE` |
| `record_slug` | Database slug or identifier | `sanganeb-atoll` |
| `alt_text` | Descriptive, accessible alt description | `Steep drop-off reef wall at Sanganeb Oceanic Atoll` |
| `author` | Photographer / copyright holder | `Dr. Tariq El-Gamil` |
| `licence` | Creative Commons or editorial permission | `CC BY-SA 4.0` |
| `source_url` | Original verifiable repository link | `https://whc.unesco.org/en/list/262` |
| `date_taken` | Date of photograph capture | `2024-06-15` |
| `location` | Specific basin location | `Sanganeb Atoll, Sudan` |

---

## 3. Ingestion & Variant Generation Pipeline

The pipeline script is located at `scripts/import-images.ts`.

### Execution:
```bash
pnpm exec tsx scripts/import-images.ts
```

### Automated Steps:
1. **Manifest Validation:** Checks all required columns, validates slugs and file paths.
2. **EXIF Stripping:** Removes all embedded GPS coordinates and camera metadata from public images to safeguard wildlife locations and reporter privacy.
3. **Responsive Variant Generation:** Resizes into 4 standardized widths:
   - `480px` (mobile viewport)
   - `768px` (tablet viewport)
   - `1200px` (desktop standard)
   - `1920px` (wide displays / retina)
4. **Dual Format Encoding:** Emits modern, high-efficiency `.webp` and `.avif` formats alongside fallback JPEG.
5. **Credit Registry:** Synchronizes author credits and license attributes for display across mobile and desktop interfaces, and populates the platform `/credits` index.
