# AGENTS.md

Static personal site (portfolio + CV) — pure HTML/CSS/vanilla JS. No build step, no dependencies, no tests/lint/typecheck.

## Entry points

- `index.html` → portfolio (`js/main.js`, `css/style.css`)
- `cv.html?lang=es|en` → printable CV (`js/cv.js`, `css/cv-print.css`)

## Content lives in one file

All copy is in `js/data.js`: `DATA.es` / `DATA.en` (edit both in sync), plus `UI` (page labels) and `CV_LABELS` (CV section headings). To change text, edit `js/data.js` — not the HTML or CSS.

`cv_uriel_luna.md` at the root is legacy/stale and is NOT wired into the site. Ignore it.

## CV PDF

The PDF is produced by the browser's "Save as PDF" from `cv.html` — there is no build or generator script. Links (`<a href>`) survive into the PDF, so use real anchor tags for anything that must be clickable.

The web URL `https://urielluna.site/` is hardcoded in `js/data.js` → `contact.website` (both languages).

## Local dev

```bash
python3 -m http.server 8000
```

No install step.

## Deploy (Railway — NOT git push)

Live at `https://urielluna.site/` on Railway (project `uriel-page`, service `uriel-page`, environment `production`). The service is NOT connected to GitHub, so `git push` does not deploy.

```bash
railway up        # from the repo root — uploads the directory
```

Verify with `railway deployment list --service uriel-page --json` until the newest deployment shows `SUCCESS`.

## Design conventions

"Apple × editorial": white canvas, Newsreader serif for headings, Inter sans for UI, hairline rules, black-and-white imagery (`filter: grayscale`), one blue accent `--accent: #0071e3` (defined in `:root` of both CSS files). Match this when touching styles.

`assets/img/profile.jpg` is the portrait (grayscale applied via CSS). Project thumbnails are `project-*.svg`.

## Bilingual

Everything ships in ES and EN. Keep `DATA.es` and `DATA.en` in sync, and mirror labels in `UI` / `CV_LABELS`.

## Git-ignored (not part of the site)

`Referencias/` and `NewInspo.jpg` are local inspiration material — do not commit them.
