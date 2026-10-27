# Arabic Localization Roadmap — Red Sea Monitor (خارطة طريق التعريب والازدواج اللغوي)

**Version:** 1.0  
**Status:** In Progress (Phase B Regional Architecture)  
**Target:** Full Bi-Directional (LTR/RTL) English & Arabic Platform

---

## 1. Vision & Linguistic Objective

The Red Sea is an Arabic-speaking maritime basin where millions of coastal citizens, artisanal fishers, park rangers, and marine biologists live and work along more than 6,400 km of coastline.

Red Sea Monitor is designed from the foundation as a **bilingual editorial and scientific archive**, ensuring equal dignified access to peer-reviewed marine science in both Arabic and English.

---

## 2. Technical Typography & Font Stack

### Typography Pairing
* **Display / Editorial Headings (Serif equivalent in Arabic):**
  * Primary: `Amiri` (Google Fonts / Variable) — Classic Naskh calligraphy style, ideal for field journal mastheads and scientific dossiers.
  * Fallback: `Noto Naskh Arabic`, `Traditional Arabic`.
* **Interface & Body Text (Sans-serif equivalent):**
  * Primary: `Cairo` or `IBM Plex Sans Arabic` — Highly legible at 14px–16px, optimized for mobile screens, high contrast against paper `#F7F3EC` and dark sea `#0A181C`.
* **Telemetry & Coordinates (Monospace numerals):**
  * Standard Arabic Numerals (`0, 1, 2, ... 9`) retained for universal GPS coordinate tags (`WGS84`) and bathymetric depth soundings (`m`).
  * `IBM Plex Mono` / `Geist Mono` with consistent tabular figures (`font-variant-numeric: tabular-nums`).

---

## 3. CSS Logical Properties & RTL Architecture

1. **Directional Switching:**
   * Controlled via `dir="rtl"` attribute on the `<html>` or sub-tree container.
   * Language selector toggles between `en` (`dir="ltr"`) and `ar` (`dir="rtl"`), stored in cookie `rsm_lang`.
2. **CSS Logical Property Migration:**
   * Replace directional margins/paddings:
     * `pl-*` / `pr-*` → `ps-*` (padding-inline-start) / `pe-*` (padding-inline-end)
     * `ml-*` / `mr-*` → `ms-*` (margin-inline-start) / `me-*` (margin-inline-end)
     * `text-left` / `text-right` → `text-start` / `text-end`
     * `left-*` / `right-*` → `start-*` / `end-*`
   * Directional icons (e.g. `ArrowRight`, `ChevronRight`) mirrored automatically via `rtl:rotate-180`.

---

## 4. Pan-Basin Marine Biology Lexicon (معجم المصطلحات البحرية لحوض البحر الأحمر)

Standardized scientific taxonomy adopted across Egypt, Sudan, Saudi Arabia, Jordan, Yemen, and Djibouti:

| English Scientific Term | Arabic Term (المصطلح العربي المعتمد) | Ecological Context |
| :--- | :--- | :--- |
| **Coral Thermal Refugia** | الملاذات الحرارية للشعاب المرجانية | Gulf of Aqaba and northern basin bleaching resistance |
| **Scleractinian Hard Corals** | المرجان الباني للشعاب (الصلب) | *Acropora*, *Porites*, *Stylophora* taxa |
| **Dugong (*Dugong dugon*)** | الأطوم / بقر البحر / عروس البحر | Hamata, Dungonab, and Farasan seagrass pastures |
| **Hawksbill Sea Turtle** | السلحفاة صقرية المنقار (*Eretmochelys imbricata*) | Spongivorous reef-dwelling sea turtle |
| **Green Sea Turtle** | السلحفاة الخضراء (*Chelonia mydas*) | Seagrass foraging and island nesting rookeries |
| **Oceanic Whitetip Shark** | القرش المحيطي ذو الطرف الأبيض (*Carcharhinus longimanus*) | Pelagic offshore reefs (Elphinstone, Brother Islands) |
| **Whale Shark** | القرش الحوتي / النمر (*Rhincodon typus*) | Ghoubbet-el-Kharab and coastal feeding aggregations |
| **Turbid-Water Refugia** | ملاذات المياه العكرة للشعاب | Dahlak Archipelago suspended sediment shading |
| **Marine Protected Area (MPA)** | محمية بحرية طبيعية | National parks, UNESCO World Heritage and Biosphere reserves |
| **Bathymetric Sill** | العتبة الباثيمترية (الغاطسة) | Hanish sill and Bab-el-Mandeb tectonic bottleneck |
| **Artisanal Fisheries** | الصيد الحرفي التقليدي | Ababda, Beja, and coastal traditional maritime wisdom |

---

## 5. Rollout Timeline & Phasing

* **Phase 1 (Current - Phase B):** Dual-language metadata across all seed records (`native_name`, Arabic place names, national flags, and bilingual country hubs).
* **Phase 2:** Global language switcher toggle in `SiteHeader` with persistent cookie `rsm_lang`.
* **Phase 3:** Full RTL stylesheet audit with Tailwind `rtl:` modifiers.
* **Phase 4:** Community translation workflow for observation forms in `Watch` and species field guide entries in `Explorer`.
