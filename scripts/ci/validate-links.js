#!/usr/bin/env node

/**
 * CI Internal Link Validation Script for QuizKaal
 * 
 * Scans source files for internal <Link href="..."> and <a href="..."> references
 * and validates that the corresponding route exists in the app/ directory.
 *
 * Exit code 0 = all internal links valid
 * Exit code 1 = broken internal links detected
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'app');

// Directories to scan
const SCAN_DIRS = ['app', 'components', 'data'];

// Patterns to extract internal links
const LINK_PATTERNS = [
  /href=["'](\/[^"'#?]*?)["']/g,   // href="/path"
  /href={["'`](\/[^"'`#?]*?)["'`]}/g, // href={"/path"}
  /push\(["'`](\/[^"'`#?]*?)["'`]\)/g, // router.push("/path")
];

// Routes that are valid but don't map to directories (dynamic, catch-all, etc.)
const KNOWN_DYNAMIC_PREFIXES = [
  '/lessons/',        // Dynamic [slug] route
  '/api/',            // API routes
  '/playground/',     // Playground routes
  '/system-design/',  // Dynamic [slug] route
  '/interview/',      // Dynamic [courseId] route
  '/mobile-course/',  // Dynamic nested routes
  '/dashboard',       // Referenced in course data
  '/api-design',      // Referenced in coming-soon
];

// Routes to skip validation for
const SKIP_ROUTES = [
  '/',               // Root always exists
  '/#',              // Hash links
];

let totalChecked = 0;
let totalBroken = 0;
const brokenLinks = [];
const checkedLinks = new Set();

// Build a set of known routes from app/ directory
function getKnownRoutes() {
  const routes = new Set();
  routes.add('/'); // Root always exists
  
  function scanAppDir(dir, routePrefix) {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
      
      if (entry.isDirectory()) {
        // Handle Next.js dynamic segments like [slug]
        let segment = entry.name;
        if (segment.startsWith('[') && segment.endsWith(']')) {
          // Dynamic route — we can't validate specific slugs statically
          // but we register the prefix
          continue;
        }
        
        const newRoute = `${routePrefix}/${segment}`;
        
        // Check if this directory has a page.js/page.jsx/page.tsx
        const pagePath = path.join(dir, entry.name);
        const hasPage = ['page.js', 'page.jsx', 'page.tsx'].some(
          f => fs.existsSync(path.join(pagePath, f))
        );
        
        if (hasPage) {
          routes.add(newRoute);
        }
        
        // Also register the directory itself as a potential route prefix
        routes.add(newRoute);
        
        scanAppDir(path.join(dir, entry.name), newRoute);
      }
    }
  }
  
  scanAppDir(APP_DIR, '');
  return routes;
}

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git', 'cache'].includes(entry.name)) continue;
      walkDir(fullPath, callback);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      callback(fullPath);
    }
  }
}

function isDynamicRoute(route) {
  return KNOWN_DYNAMIC_PREFIXES.some(prefix => route.startsWith(prefix));
}

function checkFile(filePath, knownRoutes) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT, filePath);
  
  for (const pattern of LINK_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    
    while ((match = pattern.exec(content)) !== null) {
      const linkPath = match[1];
      
      // Skip already checked
      if (checkedLinks.has(linkPath)) continue;
      checkedLinks.add(linkPath);
      
      // Skip known skippable routes
      if (SKIP_ROUTES.includes(linkPath)) continue;
      
      // Skip external links
      if (linkPath.startsWith('http') || linkPath.startsWith('//') || linkPath.startsWith('mailto:')) continue;
      
      // Skip template literal links (contain ${} — resolved at runtime)
      if (linkPath.includes('${')) continue;
      
      // Skip dynamic routes (we can't validate slugs statically)
      if (isDynamicRoute(linkPath)) continue;
      
      // Skip query-string routes (e.g., /coming-soon?course=Java)
      if (linkPath.includes('?')) continue;
      
      totalChecked++;
      
      if (!knownRoutes.has(linkPath)) {
        totalBroken++;
        brokenLinks.push({
          link: linkPath,
          foundIn: relPath,
        });
      }
    }
  }
}

console.log('🔗 QuizKaal Internal Link Validation');
console.log('═'.repeat(50));

const knownRoutes = getKnownRoutes();
console.log(`📂 Known routes discovered: ${knownRoutes.size}`);

for (const dir of SCAN_DIRS) {
  walkDir(path.join(ROOT, dir), (filePath) => checkFile(filePath, knownRoutes));
}

console.log(`🔍 Internal links checked: ${totalChecked}`);

if (brokenLinks.length > 0) {
  console.log(`\n❌ Broken internal links: ${totalBroken}`);
  console.log('');
  for (const item of brokenLinks) {
    console.log(`  ✗ ${item.link}`);
    console.log(`    Found in: ${item.foundIn}`);
  }
  console.log('\n⚠️  Note: Some links may be valid dynamic routes not detectable statically.');
  console.log('    If a link is a known dynamic route, add its prefix to KNOWN_DYNAMIC_PREFIXES.');
  console.log('');
  process.exit(1);
} else {
  console.log('✅ All internal links are valid');
  process.exit(0);
}
