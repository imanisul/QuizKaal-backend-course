#!/usr/bin/env node

/**
 * CI Secret Detection Script for QuizKaal
 * 
 * Scans committed source files for patterns that look like:
 * - API keys
 * - Private keys
 * - Passwords / tokens
 * - Database connection strings
 * - AWS/GCP/Azure credentials
 *
 * NEVER prints the actual secret value — only the file and line number.
 *
 * Exit code 0 = no secrets detected
 * Exit code 1 = potential secrets found
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

// Directories to scan
const SCAN_DIRS = ['app', 'components', 'lib', 'utils', 'data', 'scripts', 'context'];

// Directories/files to skip
const SKIP_DIRS = ['node_modules', '.next', '.git', 'cache', 'playwright-report', 'test-results'];
const SKIP_FILES = ['package-lock.json', 'detect-secrets.js']; // Don't flag ourselves

// Patterns that indicate potential secrets
// Each pattern has: regex, description, and optional allowlist
const SECRET_PATTERNS = [
  {
    regex: /(?:api[_-]?key|apikey)\s*[:=]\s*["'][A-Za-z0-9_\-]{20,}["']/gi,
    description: 'Potential API key',
  },
  {
    regex: /(?:secret|password|passwd|pwd)\s*[:=]\s*["'][^"']{8,}["']/gi,
    description: 'Potential password/secret',
  },
  {
    regex: /-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----/g,
    description: 'Private key',
  },
  {
    regex: /(?:AKIA|ASIA)[A-Z0-9]{16}/g,
    description: 'Potential AWS Access Key',
  },
  {
    regex: /(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{36,}/g,
    description: 'Potential GitHub token',
  },
  {
    regex: /sk-[A-Za-z0-9]{32,}/g,
    description: 'Potential OpenAI/Stripe secret key',
  },
  {
    regex: /(?:mongodb(?:\+srv)?:\/\/)[^\s"']+/gi,
    description: 'Potential MongoDB connection string',
  },
  {
    regex: /(?:postgres(?:ql)?:\/\/)[^\s"']+/gi,
    description: 'Potential PostgreSQL connection string',
  },
  {
    regex: /(?:mysql:\/\/)[^\s"']+/gi,
    description: 'Potential MySQL connection string',
  },
  {
    regex: /Bearer\s+[A-Za-z0-9\-._~+\/]{20,}/g,
    description: 'Potential Bearer token',
  },
  {
    regex: /xox[bpsa]-[A-Za-z0-9-]{10,}/g,
    description: 'Potential Slack token',
  },
];

// Known safe patterns (false positives)
const ALLOWLIST = [
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',  // Public Google Analytics ID
  'G-WVCJB9FF6J',                   // The actual GA ID (public)
  'G-XXXXXXXXXX',                   // Placeholder
  'process.env.',                    // Environment variable references (not values)
  'example',                         // Example code
  'placeholder',                     // Placeholder text
  'your-api-key',                    // Common placeholder
  'sk-xxxx',                         // Masked key
  'my_secret_key',                   // Educational example in AuthVisualizer
  'secret123',                       // Educational example in Java course
  'Hidden message',                  // Educational example in JS course hoisting
  'password123',                     // Educational example in lesson content
  'initialCode',                     // Code editor starter code (educational)
  'starterCode',                     // Code editor starter code (educational)
  'solution:',                       // Solution code blocks (educational)
];

let totalFiles = 0;
let totalFindings = 0;
const findings = [];

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) continue;
      walkDir(fullPath, callback);
    } else {
      if (SKIP_FILES.includes(entry.name)) continue;
      if (/\.(js|jsx|ts|tsx|json|env|yml|yaml|toml|cfg|conf|ini|sh)$/.test(entry.name)) {
        callback(fullPath);
      }
    }
  }
}

function isAllowlisted(line) {
  const lowerLine = line.toLowerCase();
  return ALLOWLIST.some(safe => lowerLine.includes(safe.toLowerCase()));
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(ROOT, filePath);
  
  totalFiles++;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip comments
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('#')) {
      // Still scan — secrets in comments are still secrets
    }
    
    for (const pattern of SECRET_PATTERNS) {
      pattern.regex.lastIndex = 0;
      
      if (pattern.regex.test(line)) {
        // Check allowlist
        if (isAllowlisted(line)) continue;
        
        totalFindings++;
        findings.push({
          file: relPath,
          line: i + 1,
          type: pattern.description,
        });
      }
    }
  }
}

console.log('🔐 QuizKaal Secret Detection');
console.log('═'.repeat(50));

// Scan source directories
for (const dir of SCAN_DIRS) {
  walkDir(path.join(ROOT, dir), scanFile);
}

// Also scan root-level config files
const rootConfigs = ['.env.example', '.env.template', 'docker-compose.yml', 'docker-compose.yaml'];
for (const file of rootConfigs) {
  const filePath = path.join(ROOT, file);
  if (fs.existsSync(filePath)) {
    scanFile(filePath);
  }
}

console.log(`\n📂 Files scanned: ${totalFiles}`);

if (findings.length > 0) {
  console.log(`\n🚨 Potential secrets detected: ${totalFindings}`);
  console.log('');
  for (const finding of findings) {
    console.log(`  ⚠️  ${finding.type}`);
    console.log(`     File: ${finding.file}:${finding.line}`);
    console.log(`     (Secret value NOT printed for security)`);
    console.log('');
  }
  console.log('📋 Action required:');
  console.log('   1. Verify if these are real secrets or false positives');
  console.log('   2. Move real secrets to environment variables');
  console.log('   3. Add false positives to the ALLOWLIST in this script');
  console.log('');
  process.exit(1);
} else {
  console.log('✅ No secrets detected in source code');
  process.exit(0);
}
