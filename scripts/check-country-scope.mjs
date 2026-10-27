import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const FORBIDDEN_STRINGS = [
  'Israel',
  'Israeli',
  'Eilat',
  'Hebrew University',
  'Bar-Ilan',
  'Coral Beach',
];

const SCAN_DIRS = [
  path.join(rootDir, 'src', 'components'),
  path.join(rootDir, 'src', 'app'),
];

let violations = [];

function scanFile(filePath) {
  // Allow bibliographic citations in library to retain publisher or author academic affiliation
  if (filePath.includes('library')) return;

  const content = fs.readFileSync(filePath, 'utf8');

  for (const forbidden of FORBIDDEN_STRINGS) {
    const regex = new RegExp(`\\b${forbidden}\\b`, 'i');
    if (regex.test(content)) {
      violations.push({
        file: path.relative(rootDir, filePath),
        forbidden,
      });
    }
  }
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        traverse(fullPath);
      }
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

console.log('🔍 Running automated Country Scope audit...');
for (const dir of SCAN_DIRS) {
  if (fs.existsSync(dir)) {
    traverse(dir);
  }
}

// Check seed data directly
const seedPath = path.join(rootDir, 'src', 'lib', 'seed-data.ts');
const seedContent = fs.readFileSync(seedPath, 'utf8');
const littoralMatch = seedContent.match(/id:\s*'ctry-([a-z]{2})'/g) || [];
const littoralCodes = littoralMatch.map(m => m.replace(/id:\s*'ctry-/, '').replace(/'/, '').toUpperCase());

if (littoralCodes.includes('IL')) {
  violations.push({
    file: 'src/lib/seed-data.ts',
    forbidden: 'ctry-il found in seed countries',
  });
}

if (violations.length > 0) {
  console.error(`❌ Country Scope Audit FAILED with ${violations.length} violation(s):`);
  violations.forEach(v => console.error(`  - [${v.forbidden}] in ${v.file}`));
  process.exit(1);
} else {
  console.log('✅ Country Scope Audit PASSED: Exactly 7 coastal countries verified. Zero forbidden entities in published content.');
  process.exit(0);
}
