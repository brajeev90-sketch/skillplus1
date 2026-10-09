# Content Gaps, Keyword Mapping & Publication Gates — Skill+ Tutors Pune

**Document Date:** 2026-10-08  
**Target Domain:** `https://skillplustutors.com/`  

---

## 1. Unresolved Business Facts & Explicit Publication Blockers

Per project governance, unknown or unconfirmed business facts are never silently replaced with fabricated claims. They are isolated below as explicit publication blockers:

| Blocker ID | Unresolved Business Fact | Current Safe Handling in Application | Owner Action Required to Resolve |
| :--- | :--- | :--- | :--- |
| **BLK-01** | **Email Domain Spelling Mismatch:** Live site displays `info@skillpustutors.com` (missing `"l"`) while domain is `skillplustutors.com`. | Displayed transparently with `[Pending domain verification]` notice. Enquiries are durably saved in `data/enquiries.json` on the server; automated SMTP forwarding is held until owner confirmation. | Confirm whether `info@skillplustutors.com` or `info@skillpustutors.com` is the active monitored inbox, then set `OWNER_CONFIRMED_EMAIL` in `.env`. |
| **BLK-02** | **Exact Office Entrance Map Pin:** Mappls building coordinate (`18.486142, 73.952372` for Saptarang Akash, Tukai Darshan / Phursungi) is a provisional research point. | Used for 10.0 km Haversine radius math in `service-areas.csv`, but excluded from public `GeoCoordinates` JSON-LD until owner confirms exact entrance pin. | Confirm exact building entrance latitude/longitude and Google Business Profile link. |
| **BLK-03** | **Outer / North-River Home Tutor Roster:** 11 researched localities (`Koregaon Park`, `Kalyani Nagar`, `Wadgaon Sheri`, `Bibwewadi`, `Swargate`, `Loni Kalbhor`, `Manjari Khurd`, `Camp`, `Wadki`, `Holkarwadi`) either exceed 10.5 km road travel across river bridges or lack confirmed evening home-visit faculty. | Held in private draft (`status: needs_evidence`), blocked from public routing (`HTTP 404` + `noindex`), and excluded from `/sitemap.xml`. | Confirm whether dedicated local home tutors are available in any of these 11 pockets before promoting from draft to published. |
| **BLK-04** | **Additional Subjects (English, Commerce, Coding, Languages):** Live site homepage mentions "academic and competitive disciplines, languages, and classes", but inner curriculum pages only verify **Physics, Chemistry, Mathematics, Biology, and Class 10 Science**. | Public subject hubs and subject-locality pages are strictly restricted to the 5 verified subjects (`Physics`, `Chemistry`, `Mathematics`, `Biology`, `Science`). | Supply syllabus details and verified tutor rosters before adding English, Commerce, or Language hubs. |
| **BLK-05** | **Tuition Fee Cards & Pricing Tiers:** No verified hourly or monthly fee schedule is published on the live site. | Zero fabricated prices or discount banners are shown. Fee discussion is routed to the transparent parent consultation step. | Provide approved class-wise fee bands if public pricing disclosure is desired. |

---

## 2. Anti-Doorway Keyword Mapping Strategy

To comply with Google Spam Policies on doorway pages, overlapping search variations are consolidated into a **single authoritative page per genuine user need**:

| Canonical Target URL | Consolidated Keyword Cluster (Single Page) | Variations Explicitly Merged (Never Given Separate Pages) |
| :--- | :--- | :--- |
| `/pune/hadapsar/chemistry-tutors/` | `chemistry tutors in hadapsar`, `chemistry teacher hadapsar`, `chemistry home tuition hadapsar pune`, `11th 12th neet jee chemistry tutor hadapsar` | *"best chemistry tutor hadapsar"*, *"affordable chemistry tuition near me"*, *"organic chemistry teacher hadapsar"* |
| `/pune/magarpatta-city/physics-tutors/` | `physics tutors in magarpatta city`, `physics home tutor magarpatta`, `cbse jee neet physics tuition magarpatta` | `/pune/magarpatta/` (301 redirected), singular/plural variants |
| `/pune/phursungi/` | `home tutors in phursungi`, `home tutors in fursungi`, `tuition in phursungi pune` | `/pune/fursungi/` (301 permanently redirected to `/pune/phursungi/`) |
| `/pune/kalepadal/` | `home tutors in kalepadal`, `kale padal home tuition`, `kaleborate nagar tutors` | `/pune/kale-padal/` (301 permanently redirected to `/pune/kalepadal/`) |
| `/pune/mohammadwadi/` | `home tutors in mohammadwadi`, `mohammed wadi home tuition pune` | `/pune/mohammed-wadi/` (301 permanently redirected to `/pune/mohammadwadi/`) |
| `/resources/how-to-choose-a-chemistry-tutor/` | `how to choose a chemistry tutor in pune`, `questions to ask chemistry home tutor` | Replaces unsupported *"Top 10 Chemistry Tutors in Pune"* listicles with an honest evaluation rubric and commercial disclosure. |

---

## 3. Staged Editorial Release Plan (~280-Page Architecture)

Rather than dumping 280 boilerplate pages live at once, our content architecture enforces a 3-phase gated rollout:

1. **Phase 1 — Immediate Public Release (`187 Approved Public Pages`):**
   - 10 Core & Preserved Legacy Pages (`/`, `/pune/`, `/about-us/`, `/contact-us/`, `/find-tutor/`, `/join-us/`, `/student-registration/`, `/teacher-registration/`, `/terms-and-conditions/`, `/resources/`)
   - 15 Programme, Subject & Board Hubs (`/jee/`, `/neet/`, `/10th-board/`, `/12th-board/`, 5 Subject Hubs, 6 Board Hubs)
   - 29 Verified East Pune Locality Hubs (`inside_10km` and disclosed `borderline_10km` pockets)
   - 96 Tier-1 Subject-Locality Pages (Physics, Chemistry, Maths, Biology, Science across high-demand East Pune hubs)
   - 30 Distinct Exam/Board-Locality Pages (NEET, JEE, CBSE, ICSE, SSC, HSC in verified localities)
   - 7 Completed Original Parent/Student Advisory Guides
2. **Phase 2 — Secondary Locality & Guide Expansion (`45 Reviewed Staged Pages`):**
   - Remaining subject-locality combinations in smaller residential pockets (`Satar Nagar`, `Ramtekdi`, `Papde Wasti`, `Pisoli`, `Uruli Devachi`, `Ghorpadi`, `BT Kawade Road`, `Lulla Nagar`) plus 5 additional parent guides. Released after inspecting Phase 1 Search Console impressions and tutor slot utilization.
3. **Phase 3 — Evidence-Dependent Outer Pockets (`11 Blocked Locality Hubs + Associated Subject Pages`):**
   - Held as `needs_evidence` (`HTTP 404` publicly) until owner confirms dedicated home-visit faculty for north-river or outer corridors (`Koregaon Park`, `Kalyani Nagar`, `Wadgaon Sheri`, `Camp`, `Swargate`, `Bibwewadi`, `Loni Kalbhor`, `Manjari Khurd`, `Wadki`, `Holkarwadi`).
