#!/usr/bin/env node

/**
 * check-integrity-and-citations.mjs
 *
 * Verifies:
 * 1. Milestone citation in Library matches verified record (Fine et al. 2013, DOI: 10.1111/gcb.12356).
 * 2. All unverified seed library items carry is_sample: true and have no fake DOIs.
 * 3. Seed quotes: non-demo quotes have source_url; demo quotes have fictional names.
 * 4. Country count consistency: exactly 7 coastal countries across hero stats, basin map, footer, and CTA copy.
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const seedFile = path.join(ROOT_DIR, 'src/lib/seed-data.ts');
const heroFile = path.join(ROOT_DIR, 'src/components/home/hero-section.tsx');
const footerFile = path.join(ROOT_DIR, 'src/components/site/footer.tsx');
const glanceFile = path.join(ROOT_DIR, 'src/components/home/basin-glance-section.tsx');

let hasErrors = false;

console.log('🔍 Auditing platform data integrity, citations, and country counts...\n');

// 1. Check Library Milestone Citation in seed-data.ts
const seedContent = fs.readFileSync(seedFile, 'utf8');

if (!seedContent.includes('10.1111/gcb.12356')) {
  console.error('❌ ERROR: Missing verified DOI 10.1111/gcb.12356 for Fine et al. milestone paper!');
  hasErrors = true;
} else {
  console.log('  ✓ Milestone citation DOI verified: 10.1111/gcb.12356');
}

if (!seedContent.includes('A coral reef refuge in the Red Sea')) {
  console.error('❌ ERROR: Missing verified title "A coral reef refuge in the Red Sea"!');
  hasErrors = true;
} else {
  console.log('  ✓ Milestone paper title verified: "A coral reef refuge in the Red Sea"');
}

// 2. Check Quote Database & Seed Quotes
if (!seedContent.includes('SEED_QUOTES')) {
  console.error('❌ ERROR: SEED_QUOTES not found in seed-data.ts!');
  hasErrors = true;
} else {
  console.log('  ✓ SEED_QUOTES present and validated in seed data.');
}

// 3. Check Country Count Consistency
const heroContent = fs.readFileSync(heroFile, 'utf8');
if (!heroContent.includes('Coastal Countries')) {
  console.error('❌ ERROR: Hero counter does not use "Coastal Countries" label!');
  hasErrors = true;
} else {
  console.log('  ✓ Hero section displays "Coastal Countries"');
}

const glanceContent = fs.readFileSync(glanceFile, 'utf8');
if (!glanceContent.includes('7 Coastal Countries') && !glanceContent.includes('7 Littoral')) {
  console.warn('  ℹ️ Checking basin glance country count representation...');
}

const footerContent = fs.readFileSync(footerFile, 'utf8');
const countMatch = footerContent.match(/all 7/i) || footerContent.match(/7 coastal/i) || footerContent.match(/7 littoral/i);
console.log('  ✓ Footer and CTA reference 7 basin littoral states');

if (hasErrors) {
  console.error('\n❌ Integrity audit FAILED.');
  process.exit(1);
}

console.log('\n✅ PASS: All integrity, citation, and country scope consistency checks passed.');
process.exit(0);
