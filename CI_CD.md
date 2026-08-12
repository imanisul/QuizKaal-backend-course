# QuizKaal CI/CD Documentation

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [CI Pipeline](#ci-pipeline)
3. [Testing](#testing)
4. [Linting](#linting)
5. [Build](#build)
6. [Security Scanning](#security-scanning)
7. [SEO Validation](#seo-validation)
8. [Accessibility Checks](#accessibility-checks)
9. [Deployment](#deployment)
10. [Branching Strategy](#branching-strategy)
11. [Pull Request Workflow](#pull-request-workflow)
12. [Rollback](#rollback)
13. [Troubleshooting](#troubleshooting)

---

## Project Architecture

| Property | Value |
|----------|-------|
| Framework | Next.js 14.2.35 (App Router) |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS 3.4.4 |
| Node.js | v20 LTS (pinned in `.nvmrc`) |
| Package Manager | npm |
| Production URL | https://quizkaal.in |
| Repository | https://github.com/imanisul/QuizKaal-backend-course |

### Key Directories

```
app/              → Next.js App Router pages and routes
components/       → Reusable React components
data/             → Course data, roadmap, quiz content
lib/              → Utilities (SEO, MDX processing)
utils/            → Progress engine, helper functions
content/          → MDX lesson content
public/           → Static assets, favicon, sitemap
scripts/          → Build and CI validation scripts
tests/unit/       → Vitest unit tests
tests/e2e/        → Playwright end-to-end tests
.github/workflows/→ GitHub Actions CI/CD pipelines
```

---

## CI Pipeline

The CI pipeline runs automatically on:

- **Pull Requests** targeting `main`
- **Pushes** to `main`

### Pipeline Steps

```
📥 Checkout
    ↓
🟢 Setup Node.js (from .nvmrc)
    ↓
📦 Install Dependencies (npm ci)
    ↓
🧹 ESLint
    ↓
🧪 Unit Tests (Vitest)
    ↓
🏗️ Production Build (next build)
    ↓
🖼️ Asset Validation
    ↓
🔗 Link Validation
    ↓
🔍 SEO Validation
    ↓
♿ Accessibility Validation
    ↓
🔐 Secret Detection
    ↓
🛡️ Security Audit
    ↓
✅ PASS / ❌ FAIL
```

### Post-Deployment Smoke Test

After a successful CI run on `main`, a separate smoke test workflow:

1. Waits for deployment propagation
2. Checks homepage accessibility (HTTP 200)
3. Validates key course pages
4. Verifies static assets (favicon, logo)
5. Checks robots.txt and sitemap availability

---

## Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm test

# Run in watch mode during development
npm run test:watch
```

**Test Files:**

| File | Coverage |
|------|----------|
| `tests/unit/progress-engine.test.js` | ProgressEngine: completion tracking, access control, XP, streaks, pub/sub |
| `tests/unit/roadmap-data.test.js` | Roadmap data integrity: slug uniqueness, required fields, URL safety, helpers |
| `tests/unit/seo-utils.test.js` | SEO utilities: metadata generation, JSON-LD schemas, siteConfig validation |

### End-to-End Tests (Playwright)

```bash
# Run e2e tests (requires build + server)
npm run test:e2e
```

**Test Files:**

| File | Coverage |
|------|----------|
| `tests/e2e/home.spec.ts` | Homepage load, routing, SEO meta, console errors, accessibility (axe-core) |
| `tests/e2e/course-flow.spec.ts` | Course lesson navigation, mark complete, next lesson progression |

---

## Linting

ESLint is configured via `.eslintrc.json` with the `next/core-web-vitals` preset.

```bash
npm run lint
```

The CI pipeline will fail on lint errors. Two rules are intentionally disabled for content compatibility:

- `react/no-unescaped-entities` — course content contains special characters
- `react/jsx-no-comment-textnodes` — code examples in JSX

---

## Build

```bash
npm run build
```

The CI pipeline runs the production build to catch:

- Missing imports
- Compilation errors
- Invalid routes
- Asset errors
- Build-time rendering failures

The `postbuild` script automatically generates `sitemap.xml` via `next-sitemap`.

---

## Security Scanning

### Dependency Audit

```bash
npm audit --audit-level=high --omit=dev
```

Reports known vulnerabilities in production dependencies. Set to `continue-on-error` in CI because some upstream vulnerabilities may not have immediate patches.

### Secret Detection

```bash
npm run ci:detect-secrets
```

Scans source code for patterns matching:

- API keys
- Private keys
- AWS/GCP credentials
- Database connection strings
- Bearer tokens
- GitHub/Slack/OpenAI tokens

**Security Note:** The script never prints actual secret values — only file locations.

### Environment Variables

| Variable | Type | Notes |
|----------|------|-------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | Google Analytics tracking ID — safe for client-side |

All `NEXT_PUBLIC_*` variables are embedded in the client bundle. Never store sensitive credentials in `NEXT_PUBLIC_*` variables.

---

## SEO Validation

```bash
npm run ci:validate-seo
```

Validates:

- `robots.txt` exists and allows crawling
- `sitemap.xml` exists and is valid XML
- Root layout has title, description metadata
- No accidental `noindex` directives
- SEO library (`lib/seo.js`) has required configuration
- Google Search Console verification is configured
- Web app manifest exists

---

## Accessibility Checks

```bash
npm run ci:validate-a11y
```

Static analysis checks:

- Images missing `alt` text
- Self-closing buttons without accessible text
- Inputs without labels or `aria-label`
- Click handlers on non-interactive elements without `role`/`tabIndex`
- Anchors without `href`

For runtime accessibility testing, the Playwright e2e tests use `@axe-core/playwright` for automated WCAG compliance checking.

---

## Deployment

### Current Setup

QuizKaal is deployed to Apache-based hosting (Hostinger). The deployment mechanism is independent of this CI/CD pipeline.

### Deployment Flow

```
Feature Branch
    ↓
Pull Request → CI Runs
    ↓
CI Passes → Code Review
    ↓
Merge to main
    ↓
Deploy to Production (existing mechanism)
    ↓
Smoke Test (automatic)
    ↓
Production Live ✅
```

The CI pipeline ensures code quality **before** deployment. It does not perform the deployment itself.

---

## Branching Strategy

### Recommended Workflow

```
main ─────────────────────────────────── (production)
  ├── feature/add-new-course ─────────── (new feature)
  ├── feature/fix-progress-bug ───────── (bug fix)
  └── feature/update-seo ────────────── (improvement)
```

### Branch Naming

- `feature/*` — new features
- `fix/*` — bug fixes
- `chore/*` — maintenance, CI updates, dependency updates

### Rules

- Never push directly to `main`
- All changes go through Pull Requests
- CI must pass before merging
- Keep branches focused and short-lived

---

## Pull Request Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Push and open a Pull Request
4. CI runs automatically
5. Fix any failures
6. Request review (if applicable)
7. Merge when CI passes and review is approved

### Branch Protection Settings (Manual Setup Required)

Configure these in GitHub → Settings → Branches → Branch protection rules for `main`:

- [x] Require a pull request before merging
- [x] Require status checks to pass before merging
  - Select: `Build, Test & Validate`
- [x] Require branches to be up to date before merging
- [x] Do not allow force pushes
- [x] Do not allow deletions
- [ ] Require approvals (optional for solo developer)

---

## Rollback

### Quick Rollback Procedure

```
1. Identify the last known-good commit
   git log --oneline -10

2. Revert the bad commit
   git revert <bad-commit-hash>
   
3. Push the revert (opens PR → CI runs)
   git push origin main

4. If hosting has deployment history, use that instead:
   - Hostinger: Redeploy from previous successful build
   
5. Verify production
   - Check https://quizkaal.in loads correctly
   - Run manual smoke test or trigger workflow_dispatch
```

### Emergency Rollback

For critical production issues:

```bash
# 1. Create revert commit
git revert HEAD --no-edit

# 2. Push immediately
git push origin main

# 3. Redeploy via existing mechanism

# 4. Verify production is restored
curl -s -o /dev/null -w "%{http_code}" https://quizkaal.in
```

---

## Troubleshooting

### CI Failures

| Issue | Solution |
|-------|----------|
| `npm ci` fails | Check `package-lock.json` is committed and up to date |
| ESLint fails | Run `npm run lint` locally to see errors |
| Unit tests fail | Run `npm test` locally to debug |
| Build fails | Run `npm run build` locally with `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` |
| Asset validation fails | Check that referenced images exist in `public/` |
| Link validation fails | Verify route exists in `app/` directory |
| SEO validation fails | Check `robots.txt`, `sitemap.xml`, and metadata exports |
| Secret detection fails | Remove the secret, move to environment variable |

### Common Local Development Issues

```bash
# Clear Next.js cache
rm -rf .next

# Clean install
rm -rf node_modules && npm ci

# Check Node.js version matches .nvmrc
nvm use
```

### Running CI Checks Locally

```bash
# Run everything CI does
npm run lint
npm test
npm run build
npm run ci:validate-assets
npm run ci:validate-links
npm run ci:validate-seo
npm run ci:detect-secrets
npm run ci:validate-a11y
npm audit --audit-level=high
```
