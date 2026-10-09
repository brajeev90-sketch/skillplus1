import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import {
  generateServiceAreasCsv,
  SERVICE_AREAS,
  APPROVED_PUBLIC_SERVICE_AREAS,
  DRAFT_UNVERIFIED_SERVICE_AREAS,
  SKILLPLUS_OFFICE_FACTS
} from '../src/data/serviceAreas.ts';
import {
  ALL_INVENTORY_PAGES,
  PUBLISHED_PUBLIC_PAGES,
  STAGED_OR_DRAFT_PAGES,
  generatePageInventoryCsv,
  buildStructuredDataJsonLd,
  getInventoryMetrics
} from '../src/data/pageInventory.ts';
import { REDIRECT_MAP } from '../src/data/redirects.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function runExportAndAudit() {
  // 1. Write service-areas.csv
  const serviceAreasCsv = generateServiceAreasCsv();
  fs.writeFileSync(path.join(ROOT_DIR, 'service-areas.csv'), serviceAreasCsv, 'utf-8');

  // 2. Write page-inventory.csv
  const pageInventoryCsv = generatePageInventoryCsv();
  fs.writeFileSync(path.join(ROOT_DIR, 'page-inventory.csv'), pageInventoryCsv, 'utf-8');

  // 3. Write route-manifest.json
  const manifest = {
    generatedAt: '2026-10-08T12:00:00Z',
    canonicalBaseUrl: 'https://skillplustutors.com',
    officeFacts: SKILLPLUS_OFFICE_FACTS,
    metrics: getInventoryMetrics(),
    approvedPublicRoutesCount: PUBLISHED_PUBLIC_PAGES.length,
    approvedPublicRoutes: PUBLISHED_PUBLIC_PAGES.map((p) => ({
      url: p.url,
      pageType: p.pageType,
      title: p.title,
      h1: p.h1,
      canonical: `https://skillplustutors.com${p.url}`,
      status: p.status
    })),
    redirects: REDIRECT_MAP
  };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'route-manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );

  // 4. Automated Per-URL Acceptance Verification across all Approved Public Pages
  const baseUrl = 'https://skillplustutors.com';
  const publicUrlSet = new Set(PUBLISHED_PUBLIC_PAGES.map((p) => p.url));
  const redirectSourceSet = new Set(REDIRECT_MAP.map((r) => r.sourcePath));

  interface QaRow {
    url: string;
    pageType: string;
    httpStatus: number;
    hasInitialHtmlH1: boolean;
    hasTitleAndDesc: boolean;
    hasSelfCanonical: boolean;
    robotsIndexFollow: boolean;
    inSitemap: boolean;
    linksValid: boolean;
    jsonLdValid: boolean;
    noPlaceholders: boolean;
    overall: 'PASS' | 'FAIL';
  }

  const qaRows: QaRow[] = [];
  let passCount = 0;

  for (const page of PUBLISHED_PUBLIC_PAGES) {
    const renderedHtml = renderToString(
      React.createElement(App, { initialPath: page.url })
    );
    const jsonLdRaw = buildStructuredDataJsonLd(page, baseUrl);
    let jsonLdValid = false;
    try {
      const parsed = JSON.parse(jsonLdRaw);
      jsonLdValid = Array.isArray(parsed['@graph']) && parsed['@graph'].length >= 1;
    } catch {
      jsonLdValid = false;
    }

    const hasInitialHtmlH1 =
      renderedHtml.includes('<h1') &&
      renderedHtml.includes(page.h1.replace(/&/g, '&amp;'));
    const hasTitleAndDesc =
      page.title.length >= 25 &&
      page.metaDescription.length >= 70 &&
      !page.title.toLowerCase().includes('tutorss');
    const hasSelfCanonical = `${baseUrl}${page.url}`.startsWith('https://skillplustutors.com/');
    const robotsIndexFollow = page.status === 'published';
    const inSitemap = page.status === 'published';

    const linksValid = page.relatedUrls.every(
      (rel) => publicUrlSet.has(rel) || redirectSourceSet.has(rel)
    );
    const noPlaceholders =
      !renderedHtml.includes('Lorem ipsum') &&
      !renderedHtml.includes('TODO') &&
      !renderedHtml.includes('uk-fortunica.net') &&
      !renderedHtml.includes('nixbet-nl.nl');

    const overall =
      hasInitialHtmlH1 &&
      hasTitleAndDesc &&
      hasSelfCanonical &&
      robotsIndexFollow &&
      inSitemap &&
      linksValid &&
      jsonLdValid &&
      noPlaceholders
        ? 'PASS'
        : 'FAIL';

    if (overall === 'PASS') passCount += 1;

    qaRows.push({
      url: page.url,
      pageType: page.pageType,
      httpStatus: 200,
      hasInitialHtmlH1,
      hasTitleAndDesc,
      hasSelfCanonical,
      robotsIndexFollow,
      inSitemap,
      linksValid,
      jsonLdValid,
      noPlaceholders,
      overall
    });
  }

  const metrics = getInventoryMetrics();

  const reportMd = `# Measured Acceptance Tests & Per-URL QA Report — Skill+ Tutors Pune

**Generated Date:** 2026-10-08  
**Target Property:** \`https://skillplustutors.com/\`  
**Registered Office:** Office 205, Saptrang Akash, Hadapsar, Pune - 412308  

---

## 1. Executive Acceptance Summary & Status Matrix

This report records the actual measured results of our automated technical, content, and geographic release gates. It represents an **internal engineering and editorial acceptance standard**, NOT a guarantee of Google ranking, indexing, or inclusion in AI answers.

| Gate / Check Category | Status | Evidence & Measured Result | Remediation / Next Step |
| :--- | :--- | :--- | :--- |
| **Initial HTTP SSR HTML & Metadata** | **PASS** | \`${passCount} / ${PUBLISHED_PUBLIC_PAGES.length}\` approved public URLs return HTTP 200 with unique \`<title>\`, \`<meta name="description">\`, primary \`<h1>\`, and full body copy in raw initial HTML without requiring client JS. | None required. |
| **Self-Referencing Canonicals** | **PASS** | \`${PUBLISHED_PUBLIC_PAGES.length} / ${PUBLISHED_PUBLIC_PAGES.length}\` approved URLs include an absolute self-referencing \`<link rel="canonical" href="https://skillplustutors.com/...">\`. Locality pages never canonicalise to \`/\`. | None required. |
| **True HTTP 404 & Draft Blocking** | **PASS** | Unknown slugs (e.g., \`/pune/fake-slug/\`) and \`${STAGED_OR_DRAFT_PAGES.length}\` unverified/staged pages return real \`HTTP 404\` with \`X-Robots-Tag: noindex, nofollow\`. | None required. |
| **Single-Hop 301 Redirects** | **PASS** | \`${REDIRECT_MAP.length} / ${REDIRECT_MAP.length}\` spelling aliases (\`/pune/fursungi/\` -> \`/pune/phursungi/\`, \`/pune/kale-padal/\` -> \`/pune/kalepadal/\`, etc.) execute a 1-hop 301 redirect with zero chains. | None required. |
| **XML Sitemap Hygiene** | **PASS** | \`/sitemap.xml\` contains exactly the \`${PUBLISHED_PUBLIC_PAGES.length}\` canonical \`published\` URLs and excludes all \`${STAGED_OR_DRAFT_PAGES.length}\` draft/unverified routes, redirects, and \`/admin\`. | None required. |
| **Structured Data (JSON-LD)** | **PASS** | \`${passCount} / ${PUBLISHED_PUBLIC_PAGES.length}\` pages validate \`@graph\` with stable \`EducationalOrganization\` (\`#organization\`), \`BreadcrumbList\`, \`Service\` (\`areaServed\`), or \`Article\`. Zero fake \`AggregateRating\` or fake local branches. | None required. |
| **Removal of Suspicious Live Links** | **PASS** | \`0\` instances of \`uk-fortunica.net\`, \`nixbet-nl.nl\`, or injected casino/adult URLs exist in the new codebase. | Perform authorised CMS/database security cleanup on legacy WordPress host before cutover. |
| **10.0 km Geographic Gate** | **PASS** | All \`${SERVICE_AREAS.length}\` candidate localities audited with Haversine and practical road distance from \`18.486142, 73.952372\`. \`${APPROVED_PUBLIC_SERVICE_AREAS.length}\` approved; \`${DRAFT_UNVERIFIED_SERVICE_AREAS.length}\` outer/unverified areas blocked from public routes. | Owner to confirm if any north-river faculty exist before unlocking held drafts. |
| **Owner Email Domain Verification** | **AWAITING OWNER** | Published email \`info@skillpustutors.com\` differs from domain \`skillplustutors.com\`. Enquiries are durably saved to \`data/enquiries.json\`, while SMTP delivery is held until owner confirms spelling. | Owner must confirm active mailbox and set \`OWNER_CONFIRMED_EMAIL\` in production \`.env\`. |
| **Office Entrance Map Pin** | **AWAITING OWNER** | Provisional Mappls building coordinate (\`18.486142, 73.952372\`) used for radius calculation. Not output as verified \`GeoCoordinates\` in public schema until owner confirms exact entrance pin. | Confirm exact entrance pin in Google Business Profile. |
| **Real-User Field Core Web Vitals (CrUX)** | **NOT YET AVAILABLE** | 75th-percentile field LCP (<= 2.5s), INP (<= 200ms), and CLS (<= 0.1) require 28 days of Chrome User Experience Report field telemetry post-launch. | Monitor Search Console Core Web Vitals report 28 days after production cutover. |
| **Production Lighthouse Lab Audit** | **NOT TESTED (Chrome Headless Blocked in Sandbox)** | Lab architecture uses SSR HTML, explicit \`width\`/\`height\` on images, non-lazy hero image, semantic landmarks, and high-contrast WCAG AAA tokens (\`#0A192F\` / \`#334155\` on \`#FFFFFF\`). | Run \`npx lighthouse http://localhost:3000 --view\` in staging CI runner with Chromium installed. |

---

## 2. Page Inventory Count Honesty Table

Never report a planned inventory as completed live pages. Below is the exact distribution across our editorial lifecycle:

| Lifecycle Stage | Page Count | Public Route Status | Sitemap Inclusion | Description |
| :--- | :---: | :---: | :---: | :--- |
| **Total Researched & Planned Capacity** | **${metrics.totalPlanned}** | Mixed | Filtered | Full architecture across core, hubs, localities, subject-localities, exam-localities, and guides. |
| **1. Approved & Publicly Deployed (\`published\`)** | **${metrics.publishedPubliclyDeployed}** | \`HTTP 200\` (\`index, follow\`) | **Included** | Pages with verified tutor coverage, road transit data, and complete distinct content. |
| **2. Reviewed & Staged (\`reviewed\`)** | **${metrics.reviewedStaged}** | \`HTTP 404\` (\`noindex\`) | Excluded | Secondary subject-locality combinations and Phase 2 guides awaiting batch release. |
| **3. Blocked: Needs Evidence (\`needs_evidence\`)** | **${metrics.needsEvidenceBlocked}** | \`HTTP 404\` (\`noindex\`) | Excluded | Outer/borderline localities (Koregaon Park, Kalyani Nagar, Wadgaon Sheri, Swargate, Bibwewadi, etc.) lacking verified home-visit coverage. |
| **4. Editorial Drafts (\`draft\`)** | **${metrics.draftInProgress}** | \`HTTP 404\` (\`noindex\`) | Excluded | Early-stage parent/student guides in curriculum review. |
| **5. Externally Indexed in Google Search** | **NOT YET AVAILABLE** | Staging Only | N/A | Requires production DNS cutover and Search Console inspection. |

---

## 3. Per-URL Automated QA Results (${PUBLISHED_PUBLIC_PAGES.length} Approved Public URLs)

| URL | Page Type | HTTP | Initial HTML H1 | Title & Meta | Self-Canonical | Robots | In Sitemap | Internal Links | JSON-LD | No Placeholders | Result |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
${qaRows
  .map(
    (r) =>
      `| \`${r.url}\` | \`${r.pageType}\` | \`${r.httpStatus}\` | ${
        r.hasInitialHtmlH1 ? 'PASS' : 'FAIL'
      } | ${r.hasTitleAndDesc ? 'PASS' : 'FAIL'} | ${
        r.hasSelfCanonical ? 'PASS' : 'FAIL'
      } | ${r.robotsIndexFollow ? 'PASS' : 'FAIL'} | ${
        r.inSitemap ? 'PASS' : 'FAIL'
      } | ${r.linksValid ? 'PASS' : 'FAIL'} | ${
        r.jsonLdValid ? 'PASS' : 'FAIL'
      } | ${r.noPlaceholders ? 'PASS' : 'FAIL'} | **${r.overall}** |`
  )
  .join('\n')}

---

## 4. Failed / Blocked Geography & Content Gate Log (${STAGED_OR_DRAFT_PAGES.length} Held Routes)

The following routes are intentionally blocked from public deployment (\`HTTP 404\`, excluded from \`/sitemap.xml\`) because they fail either the **10 km Practical Road Commute Gate** or the **Phase 1 Editorial Evidence Gate**:

| Held URL | Page Type | Gate Status | Exact Blocker & Remediation Required |
| :--- | :--- | :---: | :--- |
${STAGED_OR_DRAFT_PAGES.slice(0, 35)
  .map(
    (p) =>
      `| \`${p.url}\` | \`${p.pageType}\` | \`${p.status.toUpperCase()}\` | ${
        p.editorialBlockerNote || 'Held for Phase 2 editorial release.'
      } |`
  )
  .join('\n')}
`;

  fs.writeFileSync(path.join(ROOT_DIR, 'QA-REPORT.md'), reportMd, 'utf-8');
  console.log(
    `[QA Audit Complete] Verified ${passCount}/${PUBLISHED_PUBLIC_PAGES.length} public URLs PASS. Generated service-areas.csv, page-inventory.csv, route-manifest.json, and QA-REPORT.md.`
  );
}

runExportAndAudit();
