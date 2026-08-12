#!/usr/bin/env node

/**
 * CI SEO Validation Script for QuizKaal
 * 
 * Validates essential SEO requirements:
 * - robots.txt exists and allows indexing
 * - sitemap.xml exists and is valid
 * - Root layout has title and description metadata
 * - No accidental noindex directives
 * - siteConfig has required fields
 * - Open Graph metadata is configured
 *
 * Exit code 0 = all SEO checks pass
 * Exit code 1 = SEO issues detected
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
let errors = 0;
let warnings = 0;
let checks = 0;

function pass(msg) {
  checks++;
  console.log(`  ✅ ${msg}`);
}

function fail(msg) {
  checks++;
  errors++;
  console.log(`  ❌ ${msg}`);
}

function warn(msg) {
  checks++;
  warnings++;
  console.log(`  ⚠️  ${msg}`);
}

console.log('🔍 QuizKaal SEO Validation');
console.log('═'.repeat(50));

// ─── Check 1: robots.txt ───────────────────────
console.log('\n📄 robots.txt');

const robotsPath = path.join(ROOT, 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  
  if (robots.includes('User-agent:')) {
    pass('robots.txt has User-agent directive');
  } else {
    fail('robots.txt missing User-agent directive');
  }
  
  if (robots.includes('Allow: /')) {
    pass('robots.txt allows crawling of root');
  } else {
    fail('robots.txt does not allow crawling of root');
  }
  
  if (robots.includes('Sitemap:')) {
    pass('robots.txt references sitemap');
  } else {
    warn('robots.txt does not reference sitemap');
  }
  
  // Check for accidental full-site blocking
  if (robots.includes('Disallow: /\n') || robots.includes('Disallow: / \n')) {
    fail('robots.txt blocks all crawling with "Disallow: /"');
  } else {
    pass('robots.txt does not accidentally block entire site');
  }
} else {
  fail('robots.txt not found in public/');
}

// ─── Check 2: sitemap.xml ──────────────────────
console.log('\n🗺️  sitemap.xml');

const sitemapPath = path.join(ROOT, 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  
  if (sitemap.includes('<?xml') || sitemap.includes('<sitemapindex') || sitemap.includes('<urlset')) {
    pass('sitemap.xml is valid XML');
  } else {
    fail('sitemap.xml does not appear to be valid XML');
  }
  
  if (sitemap.includes('quizkaal.in')) {
    pass('sitemap.xml references correct domain (quizkaal.in)');
  } else {
    warn('sitemap.xml does not reference quizkaal.in');
  }
} else {
  fail('sitemap.xml not found in public/');
}

// Check for sitemap-0.xml (next-sitemap generates index + detail sitemaps)
const sitemap0Path = path.join(ROOT, 'public', 'sitemap-0.xml');
if (fs.existsSync(sitemap0Path)) {
  pass('sitemap-0.xml exists (next-sitemap detail sitemap)');
} else {
  warn('sitemap-0.xml not found — may need to run build + postbuild');
}

// ─── Check 3: Root Layout Metadata ─────────────
console.log('\n📋 Root Layout Metadata');

const layoutPath = path.join(ROOT, 'app', 'layout.js');
if (fs.existsSync(layoutPath)) {
  const layout = fs.readFileSync(layoutPath, 'utf8');
  
  if (layout.includes('export const metadata')) {
    pass('Root layout exports metadata');
  } else {
    fail('Root layout does not export metadata object');
  }
  
  if (layout.includes('title:') || layout.includes('title :')) {
    pass('Root layout has title in metadata');
  } else {
    fail('Root layout missing title in metadata');
  }
  
  if (layout.includes('description:') || layout.includes('description :')) {
    pass('Root layout has description in metadata');
  } else {
    fail('Root layout missing description in metadata');
  }
  
  if (layout.includes('lang="en"') || layout.includes("lang='en'")) {
    pass('HTML has lang attribute set');
  } else {
    warn('HTML may be missing lang attribute');
  }
  
  if (layout.includes('icons:')) {
    pass('Favicon/icons configured in metadata');
  } else {
    warn('No favicon/icons configuration found in metadata');
  }
  
  if (layout.includes('verification:')) {
    pass('Google Search Console verification configured');
  } else {
    warn('No search engine verification configured');
  }
} else {
  fail('app/layout.js not found');
}

// ─── Check 4: SEO Library ──────────────────────
console.log('\n🏗️  SEO Library (lib/seo.js)');

const seoPath = path.join(ROOT, 'lib', 'seo.js');
if (fs.existsSync(seoPath)) {
  const seo = fs.readFileSync(seoPath, 'utf8');
  
  if (seo.includes('siteConfig')) {
    pass('siteConfig object exists');
    
    if (seo.includes('url:') && seo.includes('quizkaal.in')) {
      pass('siteConfig has correct production URL');
    } else {
      fail('siteConfig may have incorrect production URL');
    }
    
    if (seo.includes('ogImage:')) {
      pass('siteConfig has Open Graph image configured');
    } else {
      warn('siteConfig missing Open Graph image');
    }
    
    if (seo.includes('twitterHandle:')) {
      pass('siteConfig has Twitter handle configured');
    } else {
      warn('siteConfig missing Twitter handle');
    }
  } else {
    fail('siteConfig not found in lib/seo.js');
  }
  
  if (seo.includes('generateSEOMetadata')) {
    pass('generateSEOMetadata function exists');
  } else {
    warn('generateSEOMetadata function not found');
  }
  
  if (seo.includes('generateSchema')) {
    pass('generateSchema function exists for JSON-LD');
  } else {
    warn('generateSchema function not found');
  }
} else {
  warn('lib/seo.js not found — SEO utilities may be handled elsewhere');
}

// ─── Check 5: next-sitemap config ──────────────
console.log('\n⚙️  next-sitemap Configuration');

const nextSitemapPath = path.join(ROOT, 'next-sitemap.config.js');
if (fs.existsSync(nextSitemapPath)) {
  const config = fs.readFileSync(nextSitemapPath, 'utf8');
  
  if (config.includes('quizkaal.in')) {
    pass('next-sitemap configured with correct siteUrl');
  } else {
    fail('next-sitemap may have incorrect siteUrl');
  }
  
  if (config.includes('generateRobotsTxt: true') || config.includes('generateRobotsTxt:true')) {
    pass('next-sitemap configured to generate robots.txt');
  } else {
    warn('next-sitemap may not generate robots.txt');
  }
} else {
  warn('next-sitemap.config.js not found');
}

// ─── Check 6: No accidental noindex ────────────
console.log('\n🚫 noindex Check');

let noindexFound = false;

function scanForNoindex(dir) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git', 'cache'].includes(entry.name)) continue;
      scanForNoindex(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Look for robots: 'noindex' in metadata exports
      if (content.includes("robots:") && content.includes("noindex")) {
        const relPath = path.relative(ROOT, fullPath);
        warn(`Potential noindex found in ${relPath} — verify this is intentional`);
        noindexFound = true;
      }
    }
  }
}

scanForNoindex(path.join(ROOT, 'app'));
if (!noindexFound) {
  pass('No accidental noindex directives found');
}

// ─── Check 7: Manifest ────────────────────────
console.log('\n📱 Web App Manifest');

const manifestPath = path.join(ROOT, 'app', 'manifest.js');
if (fs.existsSync(manifestPath)) {
  pass('Web app manifest configured (app/manifest.js)');
} else {
  warn('No web app manifest found');
}

// ─── Summary ───────────────────────────────────
console.log('\n' + '═'.repeat(50));
console.log(`📊 SEO Validation Summary`);
console.log(`   Checks: ${checks}  |  Passed: ${checks - errors - warnings}  |  Warnings: ${warnings}  |  Errors: ${errors}`);
console.log('');

if (errors > 0) {
  console.log('❌ SEO validation FAILED — fix the errors above');
  process.exit(1);
} else if (warnings > 0) {
  console.log('⚠️  SEO validation PASSED with warnings');
  process.exit(0);
} else {
  console.log('✅ All SEO checks passed');
  process.exit(0);
}
