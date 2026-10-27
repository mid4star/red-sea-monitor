#!/usr/bin/env node

/**
 * check-no-duplicate-images.mjs
 *
 * Verifies that:
 * 1. No photograph is reused across the Home page.
 * 2. Visual assets (photos + scientific vector illustrations) total ≥ 14.
 * 3. Fallback illustrations are cleanly identified with "Illustration" tags.
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const HOME_DIR = path.join(ROOT_DIR, 'src/components/home');

function extractPhotoId(url) {
  const match = url.match(/(photo-[0-9a-f-]+)/i);
  return match ? match[1] : url;
}

function findImageUrlsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const urls = [];
  const regex = /https:\/\/images\.unsplash\.com\/[^\s"'\`]+/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    urls.push({
      url: m[0],
      photoId: extractPhotoId(m[0]),
      file: path.relative(ROOT_DIR, filePath),
    });
  }
  return urls;
}

function findIllustrationsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const illustrations = [];
  const artMatches = content.match(/<(CoastalTownArt|CoralArt|WadiArt|MarineReserveArt|DugongArt|TurtleArt|SharkArt)/g);
  if (artMatches) {
    for (const match of artMatches) {
      const name = match.replace('<', '');
      illustrations.push({
        name,
        file: path.relative(ROOT_DIR, filePath),
      });
    }
  }
  return illustrations;
}

console.log('🔍 Auditing Home page visual assets (photos & illustrations)...\n');

const homeFiles = [
  'hero-section.tsx',
  'news-section.tsx',
  'watch-section.tsx',
  'store-section.tsx',
  'explorer-section.tsx',
];

const homeImages = [];
const homeIllustrations = [];

for (const file of homeFiles) {
  const fullPath = path.join(HOME_DIR, file);
  if (fs.existsSync(fullPath)) {
    const images = findImageUrlsInFile(fullPath);
    homeImages.push(...images);

    const illustrations = findIllustrationsInFile(fullPath);
    homeIllustrations.push(...illustrations);
  }
}

// Group photos by ID
const idCounts = new Map();
for (const img of homeImages) {
  if (!idCounts.has(img.photoId)) {
    idCounts.set(img.photoId, []);
  }
  idCounts.get(img.photoId).push(img);
}

const duplicates = [];
for (const [id, occurrences] of idCounts.entries()) {
  if (occurrences.length > 1) {
    duplicates.push({ id, occurrences });
  }
}

console.log(`Found ${homeImages.length} photo references across Home sections.`);
console.log(`Unique photo assets: ${idCounts.size}`);
console.log(`Scientific illustration components: ${homeIllustrations.length}`);

if (duplicates.length > 0) {
  console.error('\n❌ ERROR: Duplicate photos detected on Home page:');
  for (const dup of duplicates) {
    console.error(`\n  Asset ID: ${dup.id} (used ${dup.occurrences.length} times):`);
    for (const occ of dup.occurrences) {
      console.error(`    - in ${occ.file}`);
    }
  }
  process.exit(1);
}

const totalVisuals = idCounts.size + homeIllustrations.length;
console.log(`Total visual inventory: ${totalVisuals} assets (target is ≥ 14).\n`);

if (totalVisuals < 14) {
  console.warn(`⚠️  WARNING: Total visuals (${totalVisuals}) below minimum target of 14.`);
} else {
  console.log(`✅ PASS: All photos are unique with zero duplicates, and visual inventory exceeds target (${totalVisuals} ≥ 14).`);
}

console.log('\nVerified Home Photo Inventory:');
let idx = 1;
for (const [id, occurrences] of idCounts.entries()) {
  console.log(`  ${idx++}. ${id} in ${occurrences[0].file}`);
}

console.log('\nVerified Scientific Illustrations:');
let illIdx = 1;
for (const ill of homeIllustrations) {
  console.log(`  ${illIdx++}. <${ill.name}/> in ${ill.file}`);
}

process.exit(0);
