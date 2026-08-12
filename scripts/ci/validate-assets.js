#!/usr/bin/env node

/**
 * CI Asset Validation Script for QuizKaal
 * 
 * Scans source files (app/, components/) for references to static assets
 * (images, SVGs, favicons) and verifies they exist in the public/ directory.
 *
 * Exit code 0 = all assets found
 * Exit code 1 = missing assets detected
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');

// Directories to scan for asset references
const SCAN_DIRS = ['app', 'components', 'lib', 'data'];

// Patterns that reference public assets
const ASSET_PATTERNS = [
  /src=["']\/([^"']+)["']/g,           // src="/something"
  /href=["']\/([^"'#?]+\.\w+)["']/g,   // href="/file.ext" (only files with extensions)
  /url\(["']?\/([^"')]+)["']?\)/g,      // url("/something")
  /["']\/([^"']+\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp4|webm|woff|woff2|ttf|eot))["']/g, // String refs to media files
];

// Files/patterns to skip (Next.js generated, external URLs)
const SKIP_PATTERNS = [
  /^\/_next\//,      // Next.js internal assets
  /^\/api\//,        // API routes
  /^\/favicon\.ico/, // Handled by Next.js app/icon
];

let totalChecked = 0;
let totalMissing = 0;
const missingAssets = [];
const checkedAssets = new Set();

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, .next, .git
      if (['node_modules', '.next', '.git', 'cache'].includes(entry.name)) continue;
      walkDir(fullPath, callback);
    } else if (/\.(js|jsx|ts|tsx|css)$/.test(entry.name)) {
      callback(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT, filePath);
  
  for (const pattern of ASSET_PATTERNS) {
    // Reset regex lastIndex
    pattern.lastIndex = 0;
    let match;
    
    while ((match = pattern.exec(content)) !== null) {
      const assetPath = match[1];
      
      // Skip already checked
      if (checkedAssets.has(assetPath)) continue;
      checkedAssets.add(assetPath);
      
      // Skip patterns we don't need to check
      if (SKIP_PATTERNS.some(p => p.test('/' + assetPath))) continue;
      
      // Skip external URLs that somehow matched
      if (assetPath.startsWith('http') || assetPath.startsWith('//')) continue;
      
      totalChecked++;
      
      const fullAssetPath = path.join(PUBLIC_DIR, assetPath);
      if (!fs.existsSync(fullAssetPath)) {
        totalMissing++;
        missingAssets.push({
          asset: '/' + assetPath,
          referencedIn: relPath,
        });
      }
    }
  }
}

console.log('🔍 QuizKaal Asset Validation');
console.log('═'.repeat(50));

for (const dir of SCAN_DIRS) {
  walkDir(path.join(ROOT, dir), checkFile);
}

console.log(`\n📦 Assets checked: ${totalChecked}`);

if (missingAssets.length > 0) {
  console.log(`\n❌ Missing assets: ${totalMissing}`);
  console.log('');
  for (const item of missingAssets) {
    console.log(`  ✗ ${item.asset}`);
    console.log(`    Referenced in: ${item.referencedIn}`);
  }
  console.log('');
  process.exit(1);
} else {
  console.log('✅ All referenced assets exist in public/');
  process.exit(0);
}
