# TV fix integration

This folder contains a small, non-invasive quick-fix for animation issues on Android TV / SmartTV devices (including Yandex Browser on TV). All files are intentionally placed under `dev/tv-fix/` so you can review and integrate them into your main application where appropriate.

Files:
- `tv-detect.js` — adds `tv-browser` class to `<html>` when the user-agent looks like an Android TV / SmartTV.
- `tv-fallback.css` — CSS rules that simplify or disable heavy animations when `html.tv-browser` is present.

Goal:
- Fix animations not showing or causing jank on TV devices without changing behavior on desktop or mobile.

How to integrate

1) Plain HTML

 - Put `tv-detect.js` into a public/static folder and include it before any other bundle in the `<head>`:

 ```html
 <head>
   <script src="/static/tv-detect.js" defer></script>
   <link rel="stylesheet" href="/static/tv-fallback.css">
   <!-- остальные теги -->
 </head>
 ```

 The `defer` ensures the script runs early but doesn't block parsing too long. If you need the class to be present before paint, inline the small script into `<head>` instead.

2) Next.js (app router)

 - Option A (recommended): Place files into `public/` and add the CSS import in `src/app/globals.css` or using a `<link>` in `app/layout.tsx`. Add the script tag in `app/layout.tsx` inside `<head>` (use `dangerouslySetInnerHTML`) or import the script from a client component early in the page.

 Example (in `app/layout.tsx` head):
 ```tsx
 <head>
   <script dangerouslySetInnerHTML={{ __html: `(function(){/* paste tv-detect.js contents here */})()` }} />
   <link rel="stylesheet" href="/tv-fallback.css" />
 </head>
 ```

 - Option B: Import `tv-detect.js` from a top-level client component (e.g. `src/app/page.tsx`) — ensure it's executed on client.

Notes and safety
- The detection targets devices that look like TV (keywords like `TV`, `SmartTV`, `BRAVIA`, `Android TV`). It also uses an extra heuristic for Android devices with large screens but no `Mobile` token.
- The CSS rules only apply when `html` has class `tv-browser`, so desktop and mobile remain unaffected.
- This quick fix is intentionally conservative: it disables heavy animations for TV to avoid unsupported APIs or performance issues and provides a simple opacity/transform fallback for hero-like elements.

If you want, I can:
- Open a PR that applies an inline script + CSS link into your `app/layout.tsx` or `index.html` under `dev/` (if you want the change staged there), or
- Apply the same change directly into the main app (I will not do this unless you explicitly allow edits outside `./dev/`).


