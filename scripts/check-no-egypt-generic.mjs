import fs from 'node:fs';
import path from 'node:path';

// Directories and files to check for generic Egypt-only strings
const TARGETS = [
  'src/components/site',
  'src/components/home',
  'src/app/layout.tsx',
  'src/app/(site)/page.tsx',
  'src/app/(site)/about/page.tsx',
  'src/app/(site)/news/page.tsx',
  'src/app/(site)/explorer/page.tsx',
  'src/app/(site)/explorer/places/page.tsx',
  'src/app/(site)/explorer/species/page.tsx',
  'src/app/(site)/watch/photos/page.tsx',
  'src/app/(site)/opportunities/page.tsx',
  'src/app/(site)/store/page.tsx',
  'src/app/rss.xml/route.ts',
];

const FORBIDDEN_PATTERNS = [
  /Egypt['’]s Red Sea/i,
  /dedicated to Egypt['’]s/i,
  /documenting Egypt['’]s/i,
];

let errorsFound = 0;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  FORBIDDEN_PATTERNS.forEach((pattern) => {
    if (pattern.test(content)) {
      console.error(`❌ Generic Egypt-only violation in: ${filePath} matching ${pattern}`);
      errorsFound++;
    }
  });
}

function scanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      scanFile(fullPath);
    }
  }
}

for (const target of TARGETS) {
  const resolved = path.resolve(target);
  if (!fs.existsSync(resolved)) continue;
  const stat = fs.statSync(resolved);
  if (stat.isDirectory()) {
    scanDir(resolved);
  } else {
    scanFile(resolved);
  }
}

if (errorsFound > 0) {
  console.error(`\nCheck failed: Found ${errorsFound} instances of generic Egypt-only wording.`);
  process.exit(1);
} else {
  console.log('✅ Automated check passed: Zero generic Egypt-only language found in core components.');
  process.exit(0);
}
