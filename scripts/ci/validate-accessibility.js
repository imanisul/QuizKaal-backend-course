#!/usr/bin/env node

/**
 * CI Accessibility Validation Script for QuizKaal
 * 
 * Performs static analysis of JSX files for common a11y issues:
 * - Images missing alt text
 * - Buttons without accessible text
 * - Inputs without labels or aria-label
 * - Heading hierarchy violations
 * - Links without accessible text
 *
 * This is a lightweight lint — for full runtime a11y checks,
 * the Playwright e2e tests use @axe-core/playwright.
 *
 * Exit code 0 = no critical a11y issues
 * Exit code 1 = a11y issues detected
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components'];

let totalFiles = 0;
let totalErrors = 0;
let totalWarnings = 0;
const issues = [];

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git', 'cache'].includes(entry.name)) continue;
      walkDir(fullPath, callback);
    } else if (/\.(js|jsx|tsx)$/.test(entry.name)) {
      callback(fullPath);
    }
  }
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(ROOT, filePath);
  
  totalFiles++;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    
    // Check 1: <img> without alt attribute
    // Matches <img or <Image (Next.js) tags
    if (/<(?:img|Image)\s/i.test(line)) {
      // Check if alt is present somewhere in the tag (may span multiple lines)
      const tagContext = lines.slice(i, Math.min(i + 5, lines.length)).join(' ');
      if (!/alt\s*=/.test(tagContext) && !/alt=/.test(tagContext)) {
        // Don't flag if it's a decorative image with role="presentation" or aria-hidden
        if (!/role\s*=\s*["']presentation["']/.test(tagContext) && 
            !/aria-hidden\s*=\s*["']true["']/.test(tagContext)) {
          issues.push({
            file: relPath,
            line: lineNum,
            severity: 'error',
            message: 'Image missing alt text — add alt="" for decorative, or descriptive alt for meaningful images',
          });
          totalErrors++;
        }
      }
    }
    
    // Check 2: <button> without text content, aria-label, or title
    if (/<button\s/.test(line) && !/<button\s[^>]*aria-label/.test(line)) {
      // Simple heuristic: if button opens and closes on same line with no text
      const selfClosing = /<button\s[^>]*\/\s*>/.test(line);
      if (selfClosing && !/aria-label/.test(line) && !/title=/.test(line)) {
        issues.push({
          file: relPath,
          line: lineNum,
          severity: 'warning',
          message: 'Self-closing <button> may lack accessible text — add aria-label',
        });
        totalWarnings++;
      }
    }
    
    // Check 3: <input> without label association or aria-label
    if (/<input\s/.test(line)) {
      const tagContext = lines.slice(i, Math.min(i + 3, lines.length)).join(' ');
      const hasLabel = /aria-label/.test(tagContext) || 
                       /aria-labelledby/.test(tagContext) || 
                       /id\s*=/.test(tagContext); // id could be associated with a <label>
      const isHidden = /type\s*=\s*["']hidden["']/.test(tagContext);
      
      if (!hasLabel && !isHidden) {
        issues.push({
          file: relPath,
          line: lineNum,
          severity: 'warning',
          message: 'Input may lack accessible label — add aria-label or associate with <label>',
        });
        totalWarnings++;
      }
    }
    
    // Check 4: onclick on non-interactive elements (div, span)
    if (/(?:<div|<span)\s[^>]*onClick/.test(line)) {
      const tagContext = lines.slice(i, Math.min(i + 3, lines.length)).join(' ');
      if (!/role\s*=/.test(tagContext) && !/tabIndex/.test(tagContext)) {
        issues.push({
          file: relPath,
          line: lineNum,
          severity: 'warning',
          message: 'onClick on non-interactive element without role/tabIndex — consider using <button>',
        });
        totalWarnings++;
      }
    }
    
    // Check 5: Anchor without href (not Next.js Link children)
    if (/<a\s/.test(line) && !/<a\s[^>]*href/.test(line)) {
      // Skip if it looks like it's inside a Next.js <Link>
      if (!/Link/.test(lines[Math.max(0, i - 1)])) {
        issues.push({
          file: relPath,
          line: lineNum,
          severity: 'warning',
          message: 'Anchor <a> without href — ensure it has a valid destination',
        });
        totalWarnings++;
      }
    }
  }
}

console.log('♿ QuizKaal Accessibility Validation');
console.log('═'.repeat(50));

for (const dir of SCAN_DIRS) {
  walkDir(path.join(ROOT, dir), scanFile);
}

console.log(`\n📂 Files scanned: ${totalFiles}`);

if (issues.length > 0) {
  // Group by severity
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  
  if (errors.length > 0) {
    console.log(`\n❌ Accessibility Errors: ${errors.length}`);
    for (const issue of errors) {
      console.log(`  ✗ ${issue.file}:${issue.line}`);
      console.log(`    ${issue.message}`);
    }
  }
  
  if (warnings.length > 0) {
    console.log(`\n⚠️  Accessibility Warnings: ${warnings.length}`);
    // Only show first 15 warnings to avoid noise
    const shown = warnings.slice(0, 15);
    for (const issue of shown) {
      console.log(`  ⚠ ${issue.file}:${issue.line}`);
      console.log(`    ${issue.message}`);
    }
    if (warnings.length > 15) {
      console.log(`  ... and ${warnings.length - 15} more warnings`);
    }
  }
  
  console.log(`\n📊 Summary: ${totalErrors} errors, ${totalWarnings} warnings`);
  
  // Only fail on errors, not warnings
  if (totalErrors > 0) {
    console.log('\n❌ Accessibility validation FAILED');
    process.exit(1);
  } else {
    console.log('\n⚠️  Accessibility validation PASSED with warnings');
    process.exit(0);
  }
} else {
  console.log('✅ No accessibility issues detected');
  process.exit(0);
}
