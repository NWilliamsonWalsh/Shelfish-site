# Shelf-ish static site

This folder contains a simple static marketing site for Shelf-ish, ready to host on GitHub Pages.

Live URL: `https://shelfishclipboard.com/`

## Structure

- `index.html` - home and app overview
- `support.html` - support contact details, FAQ, and bug-report guidance
- `privacy.html` - privacy policy page
- `404.html` - fallback page for missing routes on GitHub Pages
- `styles.css` - shared site styling
- `script.js` - small progressive-enhancement script for reveal animations and the footer year
- `assets/brand/` - Shelf-ish logo and app icon
- `assets/images/` - branded screenshot placeholder SVGs
- `site.webmanifest` - install metadata and icon references
- `.nojekyll` - tells GitHub Pages to serve the site as plain static files

## Publishing checks

1. Confirm the support address remains `nate@weareopenr.com`.
2. Confirm the Mac App Store link resolves to the current Shelf-ish listing.
3. Keep unreleased platform claims out of the live site.
4. Update `privacy.html` whenever the app’s data handling or permissions change.

## GitHub Pages

1. Create a new repository for the site.
2. Copy the contents of this folder into the repository root.
3. Push to GitHub.
4. In the repository settings, enable GitHub Pages from the `main` branch root.
5. Leave `.nojekyll` in place so GitHub Pages serves the files exactly as-is.

All links in the site are relative, so it should work on a standard GitHub Pages project site without further path changes.
