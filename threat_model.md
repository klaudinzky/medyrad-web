# Threat Model

## Project Overview

This project is a public-facing clinic marketing website built with React, Vite, and static assets under `client/`. The repository also contains an Express/Drizzle backend template under `server/` and `shared/`, but the current deployment target in `.replit` is **static** with `publicDir = "dist/public"`, so the deployed production surface is the generated frontend, not the Express server.

Users are anonymous public visitors browsing clinic information, contact details, service descriptions, maps, and outbound links for appointment booking and exam results. The deployed site does not currently process user accounts, forms, uploaded files, or application-managed patient records.

## Assets

- **Site integrity and visitor trust** — visitors rely on the site content, branding, and outbound links to reach the correct clinic-owned resources. Defacement or injection would undermine trust and could redirect users to malicious destinations.
- **Static build contents** — bundled JavaScript, HTML metadata, embedded links, and media assets must not expose secrets or unintended internal data.
- **Outbound navigation targets** — WhatsApp booking links, social links, Google Maps embeds, and the external exam-results portal are trust-sensitive because users may assume they are clinic-approved destinations.
- **Future backend/auth template code** — `server/`, `shared/schema.ts`, and related dependencies indicate possible future dynamic features. They are not production-reachable under the current static deployment, but become high-value assets if deployment mode changes.

## Trust Boundaries

- **Browser to static site** — all public visitors download HTML, JS, CSS, and media from the deployment. Any injected script or tampered asset would execute in visitors' browsers.
- **Browser to third-party destinations** — the site sends users to WhatsApp, Google Maps, Facebook, Instagram, and an external exam-results portal. These are outside the application's trust boundary and must be linked explicitly and safely.
- **Repository code to deployment configuration** — `.replit` determines that production is a static build. Code in `server/` is out of production scope unless the deployment target or runtime changes.

## Scan Anchors

- Production entry points: `client/index.html`, `client/src/main.tsx`, `client/src/App.tsx`, `client/src/pages/home.tsx`
- Highest-risk production files: `client/index.html`, `client/src/components/layout/Navbar.tsx`, `client/src/components/layout/Footer.tsx`, `client/src/components/sections/Contact.tsx`
- Public surface: entire static frontend under `client/src/**`
- Dev-only / usually ignore unless deployment changes: `server/**`, `shared/schema.ts`, `script/build.ts` backend bundle path

## Threat Categories

### Tampering

For this project, tampering primarily means modifying static content or introducing browser-executed script into the deployed frontend. The site must not render attacker-controlled HTML, script, CSS, or URLs in a way that would let a third party alter visible clinic content or hijack visitor navigation. Any dynamic HTML or style injection patterns in reusable components must remain unreachable from untrusted input.

### Information Disclosure

The deployed static build must not expose secrets, private API endpoints, environment variables, unpublished internal URLs, or sensitive operational data. Since the site is public and static, any secret embedded into client code would be immediately recoverable by any visitor.

### Spoofing

Because the site links to external services for bookings and exam results, visitors may treat those destinations as part of the clinic experience. The site must clearly and safely direct users only to intended external domains and must not contain attacker-controlled redirect targets or misleading in-app authentication surfaces.

### Elevation of Privilege

There is no live authenticated/admin application surface in the current static deployment. However, if the deployment changes to serve `server/`, all backend routes, user storage, and password handling immediately become in-scope and would require server-side authentication, authorization, parameterized queries, and secure password storage before production use.
