# Sighting & Sensitive Location Data Policy — Red Sea Monitor

This policy governs the collection, moderation, publication, and scientific sharing of community biodiversity sightings.

## 1. Ethical Commitment to Species Safeguarding
Certain marine and terrestrial species in the Egyptian Red Sea basin are vulnerable to targeted poaching, illegal wildlife collection, or acoustic and physical disturbance by tourist boats.
To prevent exploitation:
- **Species Classified as Sensitive:**
  - *Dugong dugon* (Dugong)
  - *Eretmochelys imbricata* (Hawksbill Sea Turtle)
  - *Chelonia mydas* (Green Sea Turtle)
  - *Rhincodon typus* (Whale Shark)
  - *Carcharhinus longimanus* (Oceanic Whitetip Shark)
  - *Stegostoma tigrinum* (Zebra Shark)
  - Active nesting sites of *Pandion haliaetus* (Western Osprey)

## 2. Spatial Generalization & Coordinate Blurring
- **Exact Coordinates (`lat_exact`, `lng_exact`):**
  Stored privately in the PostgreSQL database. **NEVER** transmitted over public API endpoints or rendered on client-side map markers.
- **Public Coordinates (`lat_public`, `lng_public`):**
  For sensitive species, coordinates are algorithmically rounded to an ~11 km grid centroid (0.1 degree resolution) via `blurCoordinates(lat, lng)`.
- **Public Label Obfuscation:**
  Precise cove/reef names (e.g., "South Pinnacle Cave Entrance") are converted to regional sector labels (e.g., "Marsa Alam Coastal Sector").

## 3. Image Metadata (EXIF GPS Stripping)
- All user-uploaded media files pass through server-side sanitization (`sharp`).
- EXIF metadata containing camera GPS coordinates, device identifiers, and timestamps are stripped prior to storage in S3/media assets.

## 4. Reporter Privacy
- Submitter email addresses (`reporter_email`) and identity details are strictly private.
- Only the display name (or "Anonymous Citizen Scientist") is displayed upon verification.
- Consent for publication (`consent_publish`) and anonymized research dataset sharing (`consent_data_share`) must be explicitly acknowledged on submission.
