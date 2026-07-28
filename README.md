# Backend Engineering Course (Next.js)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `data/roadmap.js` — single source of truth: every phase and lesson (emoji, title, slug, status). Add a lesson here and it appears on the roadmap + gets a route automatically.
- `app/page.js` — roadmap home page, generated from the data file.
- `app/lessons/[slug]/page.js` — dynamic route for every lesson. Renders the real content for lessons that are built (currently Lesson 01), and a "locked" placeholder for the rest.
- `components/lesson1/` — Lesson 01's interactive pieces (HTTP visualizer, lifecycle timeline scrubber, Q&A accordion), each a small standalone component.
- `components/Sidebar.js`, `components/TopNav.js` — shared scroll-spy TOC and reading-progress bar, reused across lessons.
- `app/globals.css` — the shared design tokens/classes (colors, cards, buttons) so new lessons stay visually consistent without rewriting CSS.

## Adding the next lesson

1. Set `status: "available"` for it in `data/roadmap.js`.
2. Create `components/lessonN/LessonNContent.js` following the Lesson 1 pattern.
3. In `app/lessons/[slug]/page.js`, add a branch that renders it for that slug.

Optimizations already wired up: Next.js `next/font` self-hosts Inter + JetBrains Mono (no external font request, no layout shift), static params pre-render every lesson route at build time, and Tailwind purges unused CSS automatically.
