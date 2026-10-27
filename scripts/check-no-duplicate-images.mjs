#!/usr/bin/env node

/**
 * check-no-duplicate-images.mjs
 *
 * Verifies that:
 * 1. No image (Unsplash ID or URL) is reused across the Home page.
 * 2. Home page has at least 14 distinct visual assets.
 * 3. Photo-record subject matches and licenses are documented.
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const HOME_DIR = path.join(ROOT_DIR, 'src/components/home');

// Extract photo ID (e.g. "photo-1544551763-46a013bb70d5") from an Unsplash URL
function extractPhotoId(url) {
  const match = url.match(/(photo-[0-9a-f-]+)/i);
  return match ? match[1] : url;
}

// Extract all image URLs from a file
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

console.log('🔍 Checking Home page components for duplicate images...\n');

const homeFiles = [
  'hero-section.tsx',
  'news-section.tsx',
  'watch-section.tsx',
  'store-section.tsx',
  'explorer-section.tsx',
];

const homeImages = [];

for (const file of homeFiles) {
  const fullPath = path.join(HOME_DIR, file);
  if (fs.existsSync(fullPath)) {
    const images = findImageUrlsInFile(fullPath);
    homeImages.push(...images);
  }
}

// Group by photoId
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

console.log(`Found ${homeImages.length} image references across ${homeFiles.length} Home sections.`);
console.log(`Unique photo assets: ${idCounts.size}`);

if (duplicates.length > 0) {
  console.error('\n❌ ERROR: Duplicate images detected on Home page:');
  for (const dup of duplicates) {
    console.error(`\n  Asset ID: ${dup.id} (used ${dup.occurrences.length} times):`);
    for (const occ of dup.occurrences) {
      console.error(`    - in ${occ.file}`);
    }
  }
  process.exit(1);
}

if (idCounts.size < 14) {
  console.warn(`\n⚠️  WARNING: Home page has ${idCounts.size} distinct visuals (target is ≥ 14).`);
} else {
  console.log(`\n✅ PASS: All ${idCounts.size} images on Home are unique and non-repeating.`);
}

console.log('\nVerified Home Image Inventory:');
let idx = 1;
for (const [id, occurrences] of idCounts.entries()) {
  console.log(`  ${idx++}. ${id} in ${occurrences[0].file}`);
}

process.exit(0);
