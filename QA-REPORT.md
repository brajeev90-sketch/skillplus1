# Measured Acceptance Tests & Per-URL QA Report — Skill+ Tutors Pune

**Generated Date:** 2026-10-08  
**Target Property:** `https://skillplustutors.com/`  
**Registered Office:** Office 205, Saptrang Akash, Hadapsar, Pune - 412308  

---

## 1. Executive Acceptance Summary & Status Matrix

This report records the actual measured results of our automated technical, content, and geographic release gates. It represents an **internal engineering and editorial acceptance standard**, NOT a guarantee of Google ranking, indexing, or inclusion in AI answers.

| Gate / Check Category | Status | Evidence & Measured Result | Remediation / Next Step |
| :--- | :--- | :--- | :--- |
| **Initial HTTP SSR HTML & Metadata** | **PASS** | `222 / 222` approved public URLs return HTTP 200 with unique `<title>`, `<meta name="description">`, primary `<h1>`, and full body copy in raw initial HTML without requiring client JS. | None required. |
| **Self-Referencing Canonicals** | **PASS** | `222 / 222` approved URLs include an absolute self-referencing `<link rel="canonical" href="https://skillplustutors.com/...">`. Locality pages never canonicalise to `/`. | None required. |
| **True HTTP 404 & Draft Blocking** | **PASS** | Unknown slugs (e.g., `/pune/fake-slug/`) and `59` unverified/staged pages return real `HTTP 404` with `X-Robots-Tag: noindex, nofollow`. | None required. |
| **Single-Hop 301 Redirects** | **PASS** | `20 / 20` spelling aliases (`/pune/fursungi/` -> `/pune/phursungi/`, `/pune/kale-padal/` -> `/pune/kalepadal/`, etc.) execute a 1-hop 301 redirect with zero chains. | None required. |
| **XML Sitemap Hygiene** | **PASS** | `/sitemap.xml` contains exactly the `222` canonical `published` URLs and excludes all `59` draft/unverified routes, redirects, and `/admin`. | None required. |
| **Structured Data (JSON-LD)** | **PASS** | `222 / 222` pages validate `@graph` with stable `EducationalOrganization` (`#organization`), `BreadcrumbList`, `Service` (`areaServed`), or `Article`. Zero fake `AggregateRating` or fake local branches. | None required. |
| **Removal of Suspicious Live Links** | **PASS** | `0` instances of `uk-fortunica.net`, `nixbet-nl.nl`, or injected casino/adult URLs exist in the new codebase. | Perform authorised CMS/database security cleanup on legacy WordPress host before cutover. |
| **10.0 km Geographic Gate** | **PASS** | All `45` candidate localities audited with Haversine and practical road distance from `18.486142, 73.952372`. `35` approved; `10` outer/unverified areas blocked from public routes. | Owner to confirm if any north-river faculty exist before unlocking held drafts. |
| **Owner Email Domain Verification** | **AWAITING OWNER** | Published email `info@skillpustutors.com` differs from domain `skillplustutors.com`. Enquiries are durably saved to `data/enquiries.json`, while SMTP delivery is held until owner confirms spelling. | Owner must confirm active mailbox and set `OWNER_CONFIRMED_EMAIL` in production `.env`. |
| **Office Entrance Map Pin** | **AWAITING OWNER** | Provisional Mappls building coordinate (`18.486142, 73.952372`) used for radius calculation. Not output as verified `GeoCoordinates` in public schema until owner confirms exact entrance pin. | Confirm exact entrance pin in Google Business Profile. |
| **Real-User Field Core Web Vitals (CrUX)** | **NOT YET AVAILABLE** | 75th-percentile field LCP (<= 2.5s), INP (<= 200ms), and CLS (<= 0.1) require 28 days of Chrome User Experience Report field telemetry post-launch. | Monitor Search Console Core Web Vitals report 28 days after production cutover. |
| **Production Lighthouse Lab Audit** | **NOT TESTED (Chrome Headless Blocked in Sandbox)** | Lab architecture uses SSR HTML, explicit `width`/`height` on images, non-lazy hero image, semantic landmarks, and high-contrast WCAG AAA tokens (`#0A192F` / `#334155` on `#FFFFFF`). | Run `npx lighthouse http://localhost:3000 --view` in staging CI runner with Chromium installed. |

---

## 2. Page Inventory Count Honesty Table

Never report a planned inventory as completed live pages. Below is the exact distribution across our editorial lifecycle:

| Lifecycle Stage | Page Count | Public Route Status | Sitemap Inclusion | Description |
| :--- | :---: | :---: | :---: | :--- |
| **Total Researched & Planned Capacity** | **281** | Mixed | Filtered | Full architecture across core, hubs, localities, subject-localities, exam-localities, and guides. |
| **1. Approved & Publicly Deployed (`published`)** | **222** | `HTTP 200` (`index, follow`) | **Included** | Pages with verified tutor coverage, road transit data, and complete distinct content. |
| **2. Reviewed & Staged (`reviewed`)** | **47** | `HTTP 404` (`noindex`) | Excluded | Secondary subject-locality combinations and Phase 2 guides awaiting batch release. |
| **3. Blocked: Needs Evidence (`needs_evidence`)** | **10** | `HTTP 404` (`noindex`) | Excluded | Outer/borderline localities (Koregaon Park, Kalyani Nagar, Wadgaon Sheri, Swargate, Bibwewadi, etc.) lacking verified home-visit coverage. |
| **4. Editorial Drafts (`draft`)** | **2** | `HTTP 404` (`noindex`) | Excluded | Early-stage parent/student guides in curriculum review. |
| **5. Externally Indexed in Google Search** | **NOT YET AVAILABLE** | Staging Only | N/A | Requires production DNS cutover and Search Console inspection. |

---

## 3. Per-URL Automated QA Results (222 Approved Public URLs)

| URL | Page Type | HTTP | Initial HTML H1 | Title & Meta | Self-Canonical | Robots | In Sitemap | Internal Links | JSON-LD | No Placeholders | Result |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/` | `regional_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/about-us/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/contact-us/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/find-tutor/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/student-registration/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/join-us/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/teacher-registration/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/terms-and-conditions/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/resources/` | `core` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/jee/` | `programme_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/neet/` | `programme_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/10th-board/` | `programme_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/12th-board/` | `programme_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/subjects/chemistry/` | `subject_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/subjects/physics/` | `subject_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/subjects/mathematics/` | `subject_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/subjects/biology/` | `subject_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/subjects/science/` | `subject_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/boards/cbse/` | `board_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/boards/icse/` | `board_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/boards/ssc/` | `board_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/boards/hsc/` | `board_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/boards/ib/` | `board_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/boards/igcse/` | `board_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar-gadital/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sasane-nagar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/malwadi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/satavwadi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/gondhale-nagar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kalepadal/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/satar-nagar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/ramtekdi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sade-satra-nali/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mundhwa/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/keshav-nagar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kharadi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/fatima-nagar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/salunke-vihar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/handewadi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/satav-nagar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mohammadwadi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/pisoli/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kondhwa/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bt-kawade-road/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/ghorpadi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/lulla-nagar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/phursungi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bhekrai-nagar/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/tukai-darshan/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/papde-wasti/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/shewalewadi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/manjari-budruk/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/uruli-devachi/` | `locality_hub` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar-gadital/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar-gadital/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar-gadital/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar-gadital/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar-gadital/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sasane-nagar/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sasane-nagar/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sasane-nagar/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sasane-nagar/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sasane-nagar/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/malwadi/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/malwadi/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/malwadi/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/malwadi/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/malwadi/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/satavwadi/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/satavwadi/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/satavwadi/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/satavwadi/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/satavwadi/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/gondhale-nagar/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/gondhale-nagar/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/gondhale-nagar/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/gondhale-nagar/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/gondhale-nagar/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kalepadal/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kalepadal/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kalepadal/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kalepadal/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kalepadal/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sade-satra-nali/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sade-satra-nali/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sade-satra-nali/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sade-satra-nali/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/sade-satra-nali/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mundhwa/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mundhwa/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mundhwa/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mundhwa/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mundhwa/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/keshav-nagar/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/keshav-nagar/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/keshav-nagar/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/keshav-nagar/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/keshav-nagar/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/fatima-nagar/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/fatima-nagar/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/fatima-nagar/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/fatima-nagar/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/fatima-nagar/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/salunke-vihar/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/salunke-vihar/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/salunke-vihar/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/salunke-vihar/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/salunke-vihar/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/handewadi/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/handewadi/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/handewadi/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/handewadi/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/handewadi/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mohammadwadi/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mohammadwadi/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mohammadwadi/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mohammadwadi/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/mohammadwadi/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kondhwa/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kondhwa/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kondhwa/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kondhwa/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kondhwa/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/phursungi/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/phursungi/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/phursungi/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/phursungi/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/phursungi/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bhekrai-nagar/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bhekrai-nagar/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bhekrai-nagar/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bhekrai-nagar/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bhekrai-nagar/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/tukai-darshan/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/tukai-darshan/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/tukai-darshan/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/tukai-darshan/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/tukai-darshan/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/shewalewadi/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/shewalewadi/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/shewalewadi/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/shewalewadi/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/shewalewadi/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/manjari-budruk/physics-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/manjari-budruk/chemistry-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/manjari-budruk/maths-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/manjari-budruk/biology-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/manjari-budruk/science-tutors/` | `subject_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/jee-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/cbse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/ssc-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/hadapsar/hsc-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/jee-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/cbse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/magarpatta-city/icse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/jee-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/cbse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/amanora-park-town/icse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/jee-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/cbse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/undri/icse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/jee-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/wanowrie/icse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/jee-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/nibm-road/cbse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/phursungi/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/phursungi/ssc-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bhekrai-nagar/ssc-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/bhekrai-nagar/hsc-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/keshav-nagar/cbse-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/handewadi/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/pune/kondhwa/neet-tutors/` | `exam_locality` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/resources/how-to-choose-a-chemistry-tutor/` | `parent_guide` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/resources/home-vs-online-tuition-east-pune/` | `parent_guide` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/resources/neet-biology-ncert-study-framework/` | `parent_guide` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/resources/jee-main-physics-problem-solving-guide/` | `parent_guide` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/resources/class-10-board-exam-preparation-checklist/` | `parent_guide` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/resources/hsc-vs-cbse-class-11-12-science-transition/` | `parent_guide` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `/resources/parent-checklist-home-tutor-safety-and-progress-tracking/` | `parent_guide` | `200` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |

---

## 4. Failed / Blocked Geography & Content Gate Log (59 Held Routes)

The following routes are intentionally blocked from public deployment (`HTTP 404`, excluded from `/sitemap.xml`) because they fail either the **10 km Practical Road Commute Gate** or the **Phase 1 Editorial Evidence Gate**:

| Held URL | Page Type | Gate Status | Exact Blocker & Remediation Required |
| :--- | :--- | :---: | :--- |
| `/pune/holkarwadi/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: Inside 10 km straight-line circle (4.05 km), but active doorstep tutor roster for interior Holkarwadi lanes is unverified. Held as private draft. |
| `/pune/wadki/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 5.56 km straight-line along Saswad Hwy, but industrial/peri-urban stretch lacks verified evening home tutor coverage. Excluded from public routes. |
| `/pune/camp/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 7.97 km straight-line / ~10 km road travel. Held in private draft pending owner confirmation of dedicated Cantonment West home faculty. |
| `/pune/manjari-khurd/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 7.20 km straight-line, but practical road distance exceeds 10.5 km via rural river approach. Excluded from public routes. |
| `/pune/koregaon-park/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 8.30 km straight-line, but 11.2 km practical road travel across congested Mundhwa/Ghorpadi bottlenecks. Excluded from public service-area pages. |
| `/pune/kalyani-nagar/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 8.45 km straight-line, but 11.6 km practical road commute across Mula-Mutha river bridge congestion. Excluded from public routes. |
| `/pune/wadgaon-sheri/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 8.21 km straight-line, 11.4 km road distance north of river. Kept as private draft; excluded from sitemap. |
| `/pune/bibwewadi/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 9.32 km straight-line, 12.4 km road distance. Exceeds practical home-visit transit threshold from Hadapsar HQ. Excluded from public routes. |
| `/pune/swargate/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 9.52 km straight-line, 11.8 km road distance into dense central Pune traffic. Excluded from public service-area pages. |
| `/pune/loni-kalbhor/` | `locality_hub` | `NEEDS_EVIDENCE` | PUBLICATION GATE BLOCKED: 7.50 km straight-line east along NH-65, but highway toll corridor evening home-visit roster requires owner confirmation. Held as private draft. |
| `/pune/satar-nagar/maths-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/satar-nagar/science-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/satar-nagar/physics-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/satar-nagar/chemistry-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/ramtekdi/maths-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/ramtekdi/science-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/ramtekdi/chemistry-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/kharadi/physics-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/kharadi/chemistry-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/kharadi/maths-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/kharadi/biology-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/satav-nagar/physics-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/satav-nagar/chemistry-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/satav-nagar/maths-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/satav-nagar/biology-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/satav-nagar/science-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/pisoli/maths-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/pisoli/science-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/pisoli/physics-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/pisoli/chemistry-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/pisoli/biology-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/bt-kawade-road/physics-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/bt-kawade-road/chemistry-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/bt-kawade-road/maths-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
| `/pune/bt-kawade-road/biology-tutors/` | `subject_locality` | `REVIEWED` | Staged for Phase 2 publication batch after Tier-1 locality performance review. |
