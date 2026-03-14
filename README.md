# Shelf-ish static site

This folder contains a simple static marketing site for Shelf-ish, ready to host on GitHub Pages.

Live URL: `https://nwilliamsonwalsh.github.io/Shelfish-site/`

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

## Before publishing

1. Replace the placeholder email addresses if needed:
   - `shelfishapp@gmail.com`
   - `shelfishapp@gmail.com`
2. Replace the temporary App Store button state with your real App Store URL when the app is live.
3. Swap the SVG screenshot placeholders for your exported App Store or product screenshots if you want final product imagery.
4. If you later add a custom domain, you can also add a `CNAME` file and update any social metadata with the final URL.

## GitHub Pages

1. Create a new repository for the site.
2. Copy the contents of this folder into the repository root.
3. Push to GitHub.
4. In the repository settings, enable GitHub Pages from the `main` branch root.
5. Leave `.nojekyll` in place so GitHub Pages serves the files exactly as-is.

All links in the site are relative, so it should work on a standard GitHub Pages project site without further path changes.
