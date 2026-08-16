# Lagnaa SEO and speed recovery record

This note records the SEO/performance changes made during the production-readiness work so a future AI or developer can diagnose or safely restore the earlier baseline.

## Current approved state

The current branch is `agent/reservation-request-system` at:

```txt
aefbb38 Restore SEO defaults and eager homepage loading
```

The current state keeps the production-readiness features from `f615631`, while restoring the two changes that affected the Lighthouse/Vercel report:

- Homepage and route components are eagerly imported again. This avoids an extra lazy-load request before the animated homepage hero can render.
- The approved `https://www.lagnaa.com` fallback is restored for canonical URLs and SEO file generation when Vercel variables are absent.
- `robots.txt` allows crawling again and `sitemap.xml` contains all 21 public routes.
- The initial `index.html` canonical, Open Graph, Twitter, and title metadata is present again.

## What changed in `f615631`

Commit `f615631 Add Lagnaa production marketing foundation` introduced useful work, including analytics events, reservation conversion improvements, structured-data cleanup, and a mobile Reserve CTA. It also introduced two regressions when the new Vercel variables were not configured:

### SEO regression

The build script changed from the approved domain fallback to environment-only values:

```txt
VITE_SITE_URL must exist
VITE_ROBOTS_INDEX must equal true
```

Without those variables, the build generated:

```txt
User-agent: *
Disallow: /
```

It also generated an empty sitemap, removed the initial canonical metadata, and emitted `noindex,nofollow`. This explains the SEO score changing from 100 to 66 and Agentic Browsing changing from 2/2 to 1/2.

### Performance regression

All route components were changed to `React.lazy()` imports. That reduced the main JavaScript chunk, but added a request/waterfall before the homepage component and hero could render. On the reported Lighthouse run, this corresponded with performance falling to approximately 73 mobile and 76 desktop.

## What `aefbb38` fixed

`aefbb38 Restore SEO defaults and eager homepage loading` kept the useful production features but reversed the risky SEO defaults and lazy-loading change.

The resulting report was approximately:

| Version | Mobile performance | Desktop performance | SEO | Agentic Browsing |
| --- | ---: | ---: | ---: | ---: |
| Before both commits (`3274f7a`) | 96 | 100 | 100 | 2/2 |
| After `f615631` | 73 | 76 | 66 | 1/2 |
| Current after `aefbb38` | 94 | 99 | 100 | 2/2 |

Lighthouse scores vary between runs. The current scores are considered equivalent to the earlier baseline for practical purposes, while retaining the new conversion and tracking work.

## How to ask an AI to restore the earlier exact baseline

Use this instruction:

> Inspect `docs/SEO_AND_SPEED_RECOVERY.md`. The current branch includes commits `f615631` and `aefbb38`. If the goal is to return to the exact code before the production-readiness work, do not use `git reset --hard`. Create normal revert commits for `aefbb38` and then `f615631`, preserving the unrelated working-tree file `docs/client-meeting-summary.md`. Run the production build and lint, then push the revert commits for Vercel testing.

The safe Git operation is:

```bash
git revert --no-edit aefbb38 f615631
```

This reverses both commits and returns the branch content to commit `3274f7a` while preserving history. If conflicts occur, stop and inspect them; do not force-reset or discard unrelated user files.

## How to restore SEO only without reverting the production work

If SEO drops again, inspect these first:

1. `public/robots.txt` must contain `Allow: /` for production.
2. `public/sitemap.xml` must contain the 21 public route URLs.
3. `index.html` must contain a canonical URL and initial title/description metadata.
4. `VITE_ROBOTS_INDEX` must not accidentally be `false` in production.
5. `VITE_SITE_URL` may be set to the confirmed production domain; if absent, the current code uses `https://www.lagnaa.com`.

Run `npm run build` before checking generated `public/robots.txt` and `public/sitemap.xml`; the `prebuild` script regenerates both files.

## Files central to this diagnosis

- `src/App.tsx` — eager versus lazy route loading.
- `src/config/restaurant.ts` — canonical site URL and indexability defaults.
- `src/components/seo/PageMetadata.tsx` — runtime canonical, robots, Open Graph, and Twitter tags.
- `scripts/generate-seo-files.mjs` — build-time sitemap and robots generation.
- `index.html` — initial metadata available before React runs.
- `public/robots.txt` and `public/sitemap.xml` — generated production crawler files.

