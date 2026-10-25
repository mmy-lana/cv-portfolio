# Security Policy

## Reporting a Vulnerability

Please report security issues **privately** — do not open a public issue or pull
request for an unpatched vulnerability.

- Email: `mmaulanayusuf777@gmail.com` (subject line prefix `[SECURITY]`), or use
  GitHub Security Advisories ("Report a vulnerability") on this repository.
- Please include affected files/URLs, a description of the impact, and steps to
  reproduce.
- You can expect an acknowledgement within about 7 days and a coordinated fix and
  disclosure timeline thereafter. Reports are handled on a best-effort basis.

## Supported Versions

Security fixes are applied to the latest `main` branch, which tracks the deployed
site at https://www.mmylana.my.id. Older commits are not patched.

## Scope and Attack Surface

This repository is a fully static, client-rendered website. It has no backend,
no API, no authentication, no user accounts, and no server-side data storage —
the server-side attack surface is limited to static asset hosting (Vercel).
The only client-side persistence is browser `localStorage` for UI preferences.

Dependency advisories for the runtime bundle are tracked with `npm audit`; build
and CI tooling advisories are monitored separately because they never ship to
production.

## Privacy and Data Handling

- **Analytics:** Vercel Analytics and Vercel Speed Insights are loaded on every
  page; they collect standard web-vitals and usage data (see
  https://vercel.com/legal/privacy-policy).
- **Fonts:** Inter and JetBrains Mono are requested from Google Fonts at runtime;
  Google may receive basic request metadata (e.g. IP address) for those requests.
- **Local storage:** only UI preferences are stored in the browser
  (`preferred-theme`, `preferred-mode`, `preferred-lang`). They never leave the
  browser and are not transmitted anywhere.
- **Contact data:** the downloadable CV PDF and contact sections intentionally
  publish the author's professional contact details.

## Configuration Notes

Security-relevant HTTP behavior is configured in `vercel.json`: Content-Security
Policy (third-party script allow-list), HSTS, frame-ancestors/X-Frame-Options,
`nosniff`, Referrer-Policy, Permissions-Policy, and long-lived caching for
fingerprinted bundles.
