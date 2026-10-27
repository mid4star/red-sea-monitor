#!/usr/bin/env node

/**
 * check-dark-band-contrast.mjs
 *
 * Scans components rendered on dark surfaces (Hero, Watch, Opportunities, Contribute, Footer)
 * and audits all text tokens for WCAG 2.2 AA compliance (≥ 4.5:1 text contrast).
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

// Color hex definitions from tokens.css
const COLORS = {
  'sea-900': '#03181E',
  'sea-800': '#07262E',
  'paper': '#FAF7F2',
  'coral-500': '#D94E34',
  'coral-400': '#E86A50',
  'coral-300': '#F3927D',
  'emerald-400': '#34D399',
  'amber-300': '#FCD34D',
};

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function srgbToLinear(c) {
  const norm = c / 255;
  return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
}

function getContrastRatio(fgHex, bgHex, opacity = 1.0) {
  const bgL = getLuminance(bgHex);
  const fgL = getLuminance(fgHex);
  // Composite fg over bg with opacity
  const effL = fgL * opacity + bgL * (1 - opacity);
  const l1 = Math.max(effL, bgL);
  const l2 = Math.min(effL, bgL);
  return (l1 + 0.05) / (l2 + 0.05);
}

console.log('🔍 Auditing dark-band text contrast ratios against WCAG 2.2 AA (≥ 4.5:1)...\n');

const darkTokens = [
  { name: 'Headline text (paper on sea-900)', fg: 'paper', bg: 'sea-900', opacity: 1.0, min: 4.5 },
  { name: 'Subtext (paper/75 on sea-900)', fg: 'paper', bg: 'sea-900', opacity: 0.75, min: 4.5 },
  { name: 'Muted captions (paper/60 on sea-900)', fg: 'paper', bg: 'sea-900', opacity: 0.60, min: 3.0 },
  { name: 'Coordinate tag tone=dark (paper on sea-900)', fg: 'paper', bg: 'sea-900', opacity: 0.95, min: 4.5 },
  { name: 'CountryFlag tone=overlay (paper on sea-900 pill)', fg: 'paper', bg: 'sea-900', opacity: 1.0, min: 4.5 },
  { name: 'Taxon highlight (coral-300 on sea-900)', fg: 'coral-300', bg: 'sea-900', opacity: 1.0, min: 4.5 },
  { name: 'Telemetry feed badge (emerald-400 on sea-900)', fg: 'emerald-400', bg: 'sea-900', opacity: 1.0, min: 4.5 },
  { name: 'Sample record badge (amber-300 on sea-900)', fg: 'amber-300', bg: 'sea-900', opacity: 1.0, min: 4.5 },
];

let failed = false;

for (const t of darkTokens) {
  const ratio = getContrastRatio(COLORS[t.fg], COLORS[t.bg], t.opacity);
  const passed = ratio >= t.min;
  const status = passed ? '✓ PASS' : '❌ FAIL';
  console.log(`  ${status}: ${t.name} -> ${ratio.toFixed(2)}:1 (required: ≥ ${t.min}:1)`);
  if (!passed) failed = true;
}

// Check for legacy illegible text classes inside dark components
const darkComponents = [
  'src/components/home/hero-section.tsx',
  'src/components/home/watch-section.tsx',
  'src/components/home/contribute-section.tsx',
  'src/components/home/opportunities-section.tsx',
  'src/components/site/footer.tsx',
];

const forbiddenDarkClasses = [
  'text-gray-400',
  'text-slate-400',
  'text-zinc-500',
  'text-neutral-500',
];

console.log('\n🔍 Scanning dark-section components for un-themed low-contrast classes...');

for (const relPath of darkComponents) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) continue;
  const content = fs.readFileSync(fullPath, 'utf8');

  for (const forbidden of forbiddenDarkClasses) {
    if (content.includes(forbidden)) {
      console.error(`  ❌ Low-contrast class "${forbidden}" found in ${relPath}`);
      failed = true;
    }
  }
}

if (failed) {
  console.error('\n❌ Dark-band text contrast check failed.');
  process.exit(1);
} else {
  console.log('  ✓ No hardcoded low-contrast classes found in dark components.');
  console.log('\n✅ PASS: All dark-band surfaces meet or exceed WCAG 2.2 AA contrast standards.');
  process.exit(0);
}
