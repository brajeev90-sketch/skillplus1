# Staging, Deployment, Verification & Rollback Runbook — Skill+ Tutors Pune

**Target Domain:** `https://skillplustutors.com/`  
**Application Stack:** TypeScript, Express + React 19 Server-Side Rendering (`renderToString`), Vite Asset Pipeline, File-Based Durable Content & Enquiry Store (`data/`).

---

## 1. Pre-Cutover Backup & Security Hygiene (Mandatory)

Before making any DNS or production hosting changes to `skillplustutors.com`:
1. **Full Legacy Backup:**
   - Export a complete SQL dump of the existing WordPress database and archive `wp-content/` to an encrypted off-server backup location.
   - Export existing Google Search Console coverage, performance, and backlink reports for historical baseline comparison.
2. **Legacy Spam Cleanup:**
   - Ensure the legacy WordPress installation is not left running on an unpatched subdomain.
   - All spam post slugs identified in `SEO-AUDIT.md` (`casinozer`, `1win`, `1xbet`, `onlyfans`, `test-post-*`) automatically return `HTTP 404` with `X-Robots-Tag: noindex, nofollow` in this new application so search engines drop them from the index.

---

## 2. Build, Test & Verification Commands

Run these commands in staging before authorizing production release:

```bash
# 1. Type-check the entire TypeScript codebase
npm run lint

# 2. Run the automated per-URL QA audit and regenerate CSV/JSON manifests
npm run test:qa

# 3. Build optimized production client assets
npm run build

# 4. Start the production SSR server on port 3000
npm run start
```

### Direct HTTP Verification (With JavaScript Disabled)
Verify that initial HTTP responses return complete SSR HTML, titles, self-referencing canonicals, JSON-LD, and proper status codes:

```bash
# Verify Homepage (200 OK + H1 + Canonical + JSON-LD)
curl -sI http://localhost:3000/
curl -s http://localhost:3000/ | grep -E "<title>|<h1|rel=\"canonical\"|application/ld\+json"

# Verify Subject-Locality SSR Page (200 OK)
curl -s http://localhost:3000/pune/hadapsar/chemistry-tutors/ | grep -E "<title>|<h1|rel=\"canonical\""

# Verify Single-Hop 301 Redirect for Alias (/pune/fursungi/ -> /pune/phursungi/)
curl -sI http://localhost:3000/pune/fursungi/

# Verify Real 404 for Unknown or Unverified Locality (/pune/koregaon-park/)
curl -sI http://localhost:3000/pune/koregaon-park/
```

---

## 3. Search Console, Bing Webmaster & IndexNow Workflow

1. **Google Search Console (GSC):**
   - Preserve existing HTML verification meta tag or DNS TXT record for `skillplustutors.com`.
   - Submit `https://skillplustutors.com/sitemap.xml` in the Sitemaps report.
   - Monitor the **Page Indexing** report to confirm that legacy spam URLs drop out via `404` and the approved East Pune pages are crawled.
   - *Note:* Never use Google's Indexing API for tutoring service pages (it is restricted to `JobPosting` and `BroadcastEvent` markup).
2. **Bing Webmaster Tools & IndexNow:**
   - Verify domain ownership in Bing Webmaster Tools and submit `https://skillplustutors.com/sitemap.xml`.
   - When real editorial updates are published to approved URLs, ping IndexNow for participating search engines (Bing/Yandex) only for changed canonical URLs.

---

## 4. Privacy-Conscious Conversion Tracking

Track parent and educator conversions without exposing personal data (names, phone numbers, or minor details) to third-party analytics URLs or query strings:
- `generate_lead_parent_enquiry`: Fired only after `/api/enquiries` returns `HTTP 201 Created` (passes `locality`, `subject`, and `mode` as non-PII dimensions).
- `click_helpline_call`: Triggered on `tel:+918459832971` click.
- `click_whatsapp_chat`: Triggered on verified WhatsApp helpline click.
- `submit_tutor_application`: Fired only after `/api/tutor-applications` returns `HTTP 201 Created`.

---

## 5. Instant Rollback Procedure

If a critical post-deployment regression occurs:
1. Revert reverse-proxy / Cloud Run traffic revision to the previous known-good container image (`gcloud run services update-traffic ... --to-revisions=PREVIOUS=100`).
2. Preserve `/data/enquiries.json` and `/data/tutor-applications.json` persistent volume mounts so zero parent or educator submissions are lost during rollback.
