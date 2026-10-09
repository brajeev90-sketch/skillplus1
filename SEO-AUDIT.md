# Technical & On-Page SEO Audit Report — `https://skillplustutors.com/`

**Audit Date:** 2026-10-08  
**Audited Property:** `https://skillplustutors.com/`  
**Business Entity:** Skill+ Tutors / SkillPlus Tutors  
**Published Office Address:** Office 205, Saptrang Akash, Hadapsar, Pune - 412308  
**Published Helpline:** `+91 8459832971`  
**Published Email:** `info@skillpustutors.com` *(Domain mismatch vs `skillplustutors.com`; flagged for owner confirmation)*

---

## 1. Scope of Inspection & What Was Actually Tested

All public routes, sitemaps, and `robots.txt` listed below were directly inspected via live HTTP `GET`/`HEAD` requests on 2026-10-08. Items requiring internal WordPress administrator credentials, Google Search Console access, Google Business Profile manager access, or hosting server access remain explicitly marked **NOT TESTED**.

| Inspected Asset / Route | Live HTTP Status | Canonical Tag Present? | Audit Status | Key Findings from Live HTTP Response |
| :--- | :---: | :---: | :---: | :--- |
| `/` (Homepage) | `200 OK` | Yes (`https://skillplustutors.com/`) | **TESTED (FAIL -> REMEDIATED)** | 1. **Title Spelling Error:** `<title>Skill+ Tutors – Find Best Tutors | Best Online Tutorss in Pune | Online Tutors</title>` (`Tutorss` typo).<br>2. **Weak Primary H1:** `<h1 class="entry-title" itemprop="headline">Home</h1>`.<br>3. **Stale Admission Notice:** `"Welcome To Skill Plus Tutor's - Stay home stay safeRegistration Open for 2025-26"` (Pandemic-era notice concatenated without spacing).<br>4. **Email Domain Mismatch:** Footer lists `info@skillpustutors.com` (missing `l`).<br>5. **Suspicious Hidden External Links:** Below the registration section, hidden DOM containers inject `<div style="overflow:hidden;height:0;width:0;font-size:0;line-height:0"><a href="https://uk-fortunica.net/">Fortunica</a></div>` and `<div style="position:absolute;left:-7643px"><a href="https://nixbet-nl.nl/nl-nl/">Nixbet</a></div>`. |
| `/jee/` | `200 OK` | Yes (`https://skillplustutors.com/jee/`) | **TESTED (FAIL -> REMEDIATED)** | Contains **copy-pasted NEET medical text** (`"...motivates them throughout the NEET preparation journey... NEET foundation courses... successful medical career"`). Replaced with genuine JEE PCM content in new build while preserving `/jee/` URL. |
| `/neet/` | `200 OK` | Yes (`https://skillplustutors.com/neet/`) | **TESTED (PASS -> ENHANCED)** | Covers NEET foundation (Class 9–10) and Class 11–12/repeater preparation. Retained `/neet/` route and expanded with NCERT Biology, Chemistry, and Physics methodology. |
| `/10th-board/` | `200 OK` | Yes (`https://skillplustutors.com/10th-board/`) | **TESTED (PASS -> ENHANCED)** | Covers Class 10 Science and Mathematics (Algebra, Coordinate Geometry, Statistics, Probability, Trigonometry, SSC). Preserved `/10th-board/` URL. |
| `/12th-board/` | `200 OK` | Yes (`https://skillplustutors.com/12th-board/`) | **TESTED (PASS -> ENHANCED)** | Covers Class 12 Physics, Chemistry, Mathematics (HSC), and Biology (CBSE/HSC). Preserved `/12th-board/` URL. |
| `/about-us/` | `200 OK` | Yes (`https://skillplustutors.com/about-us/`) | **TESTED (PASS -> ENHANCED)** | Confirms founding in 2020 by a group of teachers and coverage of NEET, IIT-JEE, and Boards (CBSE, ICSE, IB, IGCSE, HSC). Preserved `/about-us/`. |
| `/contact-us/` | `200 OK` | Yes (`https://skillplustutors.com/contact-us/`) | **TESTED (PASS -> ENHANCED)** | Lists phone `+91 8459832971`, email `info@skillpustutors.com`, and Hadapsar address. Preserved `/contact-us/`. |
| `/find-tutor/` | `200 OK` | Yes (`https://skillplustutors.com/find-tutor/`) | **TESTED (WARN -> REMEDIATED)** | Heading contains spelling error `"Home Tutor Enquiry From"` (`From` instead of `Form`). Preserved `/find-tutor/` and fixed heading + server-side validation. |
| `/join-us/` | `200 OK` | Yes (`https://skillplustutors.com/join-us/`) | **TESTED (PASS -> ENHANCED)** | Educator registration landing page. Preserved `/join-us/`. |
| `/student-registration/` | `200 OK` | Yes (`https://skillplustutors.com/student-registration/`) | **TESTED (PASS -> ENHANCED)** | Linked from homepage student registration CTA. Preserved `/student-registration/`. |
| `/teacher-registration/` | `200 OK` | Yes (`https://skillplustutors.com/teacher-registration/`) | **TESTED (PASS -> ENHANCED)** | Linked from homepage teacher registration CTA. Preserved `/teacher-registration/`. |
| `/terms-and-conditions/` | `200 OK` | Yes (`https://skillplustutors.com/terms-and-conditions/`) | **TESTED (PASS -> ENHANCED)** | Present in `wp-sitemap-posts-page-1.xml`. Preserved `/terms-and-conditions/`. |
| `/robots.txt` | `200 OK` | N/A | **TESTED** | Standard WordPress core output (`Disallow: /wp-admin/`, `Sitemap: https://skillplustutors.com/wp-sitemap.xml`). |
| `/sitemap.xml` | `301 -> 200` | N/A | **TESTED** | Redirects `301` to `/wp-sitemap.xml`. `/sitemap_index.xml` returns `404`. |
| `/wp-sitemap-posts-post-1.xml` | `200 OK` | N/A | **TESTED (CRITICAL SECURITY / SPAM FINDING)** | Contains **50+ unrelated gambling, casino, and adult spam URLs** published between Sept–Oct 2026 (e.g., `casinozer`, `1win`, `1xbet`, `4rabet`, `onlyfans`, `test-post-a3c48c2f...`). |
| `/wp-sitemap-users-1.xml` | `200 OK` | N/A | **TESTED (SECURITY REVIEW NEEDED)** | Lists three user accounts: `/author/admin/`, `/author/administrator_295d74/`, and `/author/manager_94c6cbfce2edddd7/`. |
| WordPress Admin / DB / Plugins | N/A | N/A | **NOT TESTED** | No backend WordPress/hosting credentials supplied. |
| Google Search Console / GA4 | N/A | N/A | **NOT TESTED** | No Search Console or Analytics property access supplied. |

---

## 2. Critical Security & Integrity Advisory (Unrelated Links & Spam Posts)

During our non-intrusive public HTTP audit of `https://skillplustutors.com/`, we recorded two categories of unrelated content:
1. **Hidden Offscreen External Links on `/`:**
   - `<div style="overflow:hidden;height:0;width:0;font-size:0;line-height:0"><a href="https://uk-fortunica.net/">Fortunica</a></div>`
   - `<div style="position:absolute;left:-7643px"><a href="https://nixbet-nl.nl/nl-nl/">Nixbet</a></div>`
2. **Unrelated Posts & Randomized User Slugs in Public WordPress Sitemaps:**
   - `wp-sitemap-posts-post-1.xml` lists dozens of foreign-language gambling and adult articles (`1xbet`, `1win`, `casinozer`, `onlyfans`, etc.) alongside automated UUID test posts (`test-post-a3c48c2f-b3bc-4895-b64e-541ae9753957-5fe3f303cb6dccf7`).
   - `wp-sitemap-users-1.xml` exposes `/author/administrator_295d74/` and `/author/manager_94c6cbfce2edddd7/`.

### Remediation & Authorised Security Review Recommendation
- **In this new build:** Every suspicious external link and unrelated post has been **100% excluded**. Only verified educational routes from the approved content registry can resolve; all unapproved/spam slugs return a strict `HTTP 404` with `X-Robots-Tag: noindex, nofollow`.
- **Recommended Action for Site Owner:** While external links alone are not conclusive proof of how they were introduced, the combination of hidden CSS offscreen links (`left:-7643px`), randomized administrator usernames (`administrator_295d74`), and automated `test-post-<uuid>` entries strongly warrants an **authorised CMS, plugin, database, and hosting security review**:
  1. Take a full forensic backup of the existing WordPress files and MySQL database before modifying production.
  2. Audit `wp_users` and `wp_usermeta` for unauthorized administrator accounts (`administrator_295d74`, `manager_94c6cbfce2edddd7`) and revoke all application passwords / REST API tokens.
  3. Inspect installed Elementor/ElementsKit/theme templates and `wp_posts` for injected HTML blocks and spam post rows, and return `404` or `410 Gone` for all non-educational spam slugs so Google de-indexes them cleanly.

---

## 3. Structured Data & Local Business Entity Architecture

1. **Single Truthful Organization Entity (`https://skillplustutors.com/#organization`):**
   - Represented as `EducationalOrganization` with `name: "Skill+ Tutors"`, `alternateName: "SkillPlus Tutors"`, `telephone: "+91 8459832971"`, and `address` set strictly to `Office 205, Saptrang Akash, Hadapsar, Pune - 412308`.
   - **Zero Fake Branch Addresses:** Locality pages (`/pune/magarpatta-city/`, `/pune/amanora-park-town/`, `/pune/undri/`, etc.) use `Service` schema with `provider: { "@id": "https://skillplustutors.com/#organization" }` and `areaServed: { "@type": "Place", "name": "<Locality>, Pune" }`. We never fabricate local branch addresses.
   - **Zero Fabricated Review Stars:** We do not output self-serving `AggregateRating` or unverified schema review snippets.
   - **Provisional Coordinates Held Back from Public Schema:** Because `18.486142, 73.952372` is a provisional Mappls building coordinate rather than an owner-confirmed office entrance pin, it is used for our 10.0 km radius research and documented in `service-areas.csv`, but withheld from public `GeoCoordinates` schema until owner confirmation.

---

## 4. Google Business Profile (GBP) Alignment Checklist

Before launch cutover, the business owner should verify the following in Google Business Profile (`https://support.google.com/business/answer/7091`):
- [ ] **Exact Business Name:** Use `Skill+ Tutors` (or `SkillPlus Tutors`) consistently without stuffing keywords or locality lists into the GBP business title.
- [ ] **Primary Address & Pin:** Verify `Office 205, Saptrang Akash, Hadapsar, Pune, Maharashtra 412308` and place the map pin accurately at the building entrance.
- [ ] **Service Areas:** Configure GBP Service Areas to match our verified ~10 km East Pune localities (Hadapsar, Magarpatta City, Amanora Park Town, Phursungi, Bhekrai Nagar, Wanowrie, Fatima Nagar, NIBM Road, Undri, Handewadi, Mohammadwadi, Mundhwa, Keshav Nagar). Do not create separate GBP listings for service-area localities where no staffed branch exists.
- [ ] **Primary Phone & Website:** Set primary phone to `+91 8459832971` and website to `https://skillplustutors.com/`.
- [ ] **Authentic Reviews Only:** Request genuine reviews from verified parents and students; never purchase or incentivize bulk reviews.

---

## 5. GEO / AI-Search Readiness & Bot Governance

- **Clear Entity & Service Facts:** Every page leads with a structured Summary Facts block stating the exact subject, supported boards/classes, learning mode (1-on-1 home vs live online), and practical road distance from our Hadapsar office.
- **No `llms.txt` Hype:** In accordance with Google Search documentation, we rely on standard crawlable HTML, semantic headings, self-referencing canonicals, and accurate Schema.org JSON-LD rather than claiming `llms.txt` or proprietary tags guarantee AI citations.
- **Separate Search vs Training Bot Controls (`robots.txt`):**
  - `OAI-SearchBot` (used for search link citations) is explicitly set to `Allow: /`.
  - `GPTBot` (used for model training scraping) is explicitly set to `Disallow: /`.
