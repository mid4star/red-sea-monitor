#!/usr/bin/env node

/**
 * check-chips-and-labels.mjs
 *
 * Verifies that:
 * 1. All map hotspot chips and layer buttons have non-empty labels and accessible names.
 * 2. No chip label evaluates to empty or whitespace.
 * 3. Hotspot ISO2 codes belong exclusively to the 7 approved coastal countries.
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const basinMapFile = path.join(ROOT_DIR, 'src/components/home/basin-map.tsx');

if (!fs.existsSync(basinMapFile)) {
  console.error(`❌ ERROR: Could not find ${basinMapFile}`);
  process.exit(1);
}

const content = fs.readFileSync(basinMapFile, 'utf8');

// Parse REAL_BASIN_HOTSPOTS array using regex
const hotspotsBlockMatch = content.match(/export const REAL_BASIN_HOTSPOTS: MapHotspot\[\] = \[([\s\S]*?)\];/);
if (!hotspotsBlockMatch) {
  console.error('❌ ERROR: Could not parse REAL_BASIN_HOTSPOTS array.');
  process.exit(1);
}

const hotspotsBlock = hotspotsBlockMatch[1];
const hotspotRegex = /{\s*id:\s*'([^']+)',\s*name:\s*'([^']*)',\s*fullName:\s*'([^']*)',\s*country:\s*'([^']*)',\s*iso2:\s*'([^']*)'/g;

const ALLOWED_ISO2 = new Set(['EG', 'SD', 'ER', 'DJ', 'YE', 'SA', 'JO']);
const hotspots = [];
let match;

while ((match = hotspotRegex.exec(hotspotsBlock)) !== null) {
  hotspots.push({
    id: match[1],
    name: match[2].trim(),
    fullName: match[3].trim(),
    country: match[4].trim(),
    iso2: match[5].trim(),
  });
}

console.log(`🔍 Auditing ${hotspots.length} basin map hotspot chips and buttons...\n`);

let hasErrors = false;

if (hotspots.length === 0) {
  console.error('❌ ERROR: No hotspots found in REAL_BASIN_HOTSPOTS.');
  hasErrors = true;
}

for (const hs of hotspots) {
  if (!hs.name || hs.name.length === 0) {
    console.error(`❌ ERROR: Hotspot [${hs.id}] has an EMPTY 'name'!`);
    hasErrors = true;
  }
  if (!hs.fullName || hs.fullName.length === 0) {
    console.error(`❌ ERROR: Hotspot [${hs.id}] has an EMPTY 'fullName'!`);
    hasErrors = true;
  }
  if (!hs.country || hs.country.length === 0) {
    console.error(`❌ ERROR: Hotspot [${hs.id}] has an EMPTY 'country'!`);
    hasErrors = true;
  }
  if (!hs.iso2 || hs.iso2.length === 0) {
    console.error(`❌ ERROR: Hotspot [${hs.id}] has an EMPTY 'iso2'!`);
    hasErrors = true;
  }
  if (!ALLOWED_ISO2.has(hs.iso2)) {
    console.error(`❌ ERROR: Hotspot [${hs.id}] has forbidden or unapproved country code '${hs.iso2}'!`);
    hasErrors = true;
  }

  // Check chip computed label
  const chipLabel = `[${hs.iso2}] ${hs.name}`;
  if (chipLabel.trim().length <= 4) {
    console.error(`❌ ERROR: Hotspot [${hs.id}] renders empty chip label: '${chipLabel}'!`);
    hasErrors = true;
  }
}

// Check layer buttons in file
const layerButtons = [
  { key: 'ALL', label: 'All Hotspots' },
  { key: 'MPA', label: 'Marine Protected Areas' },
  { key: 'REEF', label: 'Oceanic Reefs' },
  { key: 'SIGHTING', label: 'Telemetry & Sightings' },
];

for (const btn of layerButtons) {
  if (!content.includes(`'${btn.label}'`)) {
    console.error(`❌ ERROR: Missing layer button label '${btn.label}' in basin-map.tsx!`);
    hasErrors = true;
  }
}

// Verify aria-label and aria-pressed attributes exist on chips
if (!content.includes('aria-pressed={isSelected}')) {
  console.error('❌ ERROR: Basin map chips are missing aria-pressed attribute!');
  hasErrors = true;
}
if (!content.includes('aria-label={`${hs.name}, ${hs.country} (${hs.iso2})`}')) {
  console.error('❌ ERROR: Basin map chips are missing descriptive aria-label!');
  hasErrors = true;
}

if (hasErrors) {
  console.error('\n❌ Chip label audit FAILED.');
  process.exit(1);
}

console.log(`✅ PASS: All ${hotspots.length} hotspot chips and layer buttons have valid, accessible, non-empty names.`);
for (const hs of hotspots) {
  console.log(`   ✓ [${hs.iso2}] ${hs.name} (${hs.country}) — Full: ${hs.fullName}`);
}

process.exit(0);
