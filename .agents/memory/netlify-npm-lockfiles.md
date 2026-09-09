---
name: Portable npm lockfiles for Netlify
description: Prevent Netlify dependency-install failures caused by Replit-only npm registry URLs.
---

**Rule:** Before deploying a Replit-built Node project through Netlify, ensure its npm lockfile contains no internal Replit registry or `package-firewall` URL. If any remain, regenerate the lockfile from scratch against the public npm registry; changing the registry alone may preserve old resolved URLs.

**Why:** Netlify cannot access Replit's internal package registry. Its dependency installation fails before the application build starts.

**How to apply:** Validate the regenerated lockfile with a clean `npm ci` using `https://registry.npmjs.org`, then run the project's normal checks and production build before pushing.