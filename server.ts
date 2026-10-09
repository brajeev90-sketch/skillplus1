import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.tsx';
import {
  generateServiceAreasCsv,
  SERVICE_AREAS,
  APPROVED_PUBLIC_SERVICE_AREAS,
  SKILLPLUS_OFFICE_FACTS
} from './src/data/serviceAreas.ts';
import {
  ALL_INVENTORY_PAGES,
  PUBLISHED_PUBLIC_PAGES,
  findPageByUrl,
  generatePageInventoryCsv,
  buildStructuredDataJsonLd,
  getInventoryMetrics
} from './src/data/pageInventory.ts';
import {
  REDIRECT_MAP,
  normalizeUrlPath,
  findRedirectRule
} from './src/data/redirects.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const CANONICAL_BASE_URL = (process.env.APP_URL || 'https://skillplustutors.com').replace(
  /\/+$/,
  ''
);
const ADMIN_TOKEN = process.env.ADMIN_ACCESS_TOKEN || 'CHANGE_ME_BEFORE_STAGING_DEPLOY';

// Ensure durable data directory exists
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const TUTOR_APPS_FILE = path.join(DATA_DIR, 'tutor-applications.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}
if (!fs.existsSync(TUTOR_APPS_FILE)) {
  fs.writeFileSync(TUTOR_APPS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Simple in-memory IP rate limiter for form submissions (15-min window)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQ_PER_WINDOW = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 10);
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQ_PER_WINDOW) {
    return false;
  }
  entry.count += 1;
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  // ===========================================================================
  // 1. TECHNICAL SEO & GEOGRAPHIC DELIVERABLE ENDPOINTS
  // ===========================================================================

  // 301 Redirects check first (including /wp-sitemap.xml -> /sitemap.xml)
  app.use((req, res, next) => {
    const rule = findRedirectRule(req.path);
    if (rule) {
      return res.redirect(rule.statusCode, rule.destinationPath);
    }
    next();
  });

  // robots.txt with explicit search vs training bot governance
  app.get('/robots.txt', (_req, res) => {
    const lines = [
      '# robots.txt for Skill+ Tutors Pune (https://skillplustutors.com)',
      '# Note: robots.txt governs crawling, not access control or guaranteed de-indexing.',
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin',
      'Disallow: /api/',
      'Disallow: /*?q=*',
      'Disallow: /*?filter=*',
      '',
      '# AI Search & Training Bot Governance (Per Official OpenAI & Google Guidance)',
      '# Allow search-citation crawlers while disallowing bulk model-training scraping',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      '',
      'User-agent: GPTBot',
      'Disallow: /',
      '',
      `Sitemap: ${CANONICAL_BASE_URL}/sitemap.xml`
    ];
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(lines.join('\n'));
  });

  // Canonical XML Sitemap (ONLY approved, published, canonical 200 OK pages)
  app.get('/sitemap.xml', (_req, res) => {
    const urlsXml = PUBLISHED_PUBLIC_PAGES.map((page) => {
      const loc = `${CANONICAL_BASE_URL}${page.url}`;
      return [
        '  <url>',
        `    <loc>${escapeHtml(loc)}</loc>`,
        `    <lastmod>${page.lastModified}</lastmod>`,
        '  </url>'
      ].join('\n');
    }).join('\n');

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      urlsXml,
      '</urlset>'
    ].join('\n');

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(xml);
  });

  // Protected internal CSV & manifest endpoints (require admin token)
  app.get('/service-areas.csv', (req, res) => {
    const token = req.headers['x-admin-token'] || req.query.token;
    if (!token || token !== ADMIN_TOKEN) {
      return res.status(401).send('Unauthorized: Administrator authentication required.');
    }
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="service-areas.csv"');
    res.status(200).send(generateServiceAreasCsv());
  });

  app.get('/page-inventory.csv', (req, res) => {
    const token = req.headers['x-admin-token'] || req.query.token;
    if (!token || token !== ADMIN_TOKEN) {
      return res.status(401).send('Unauthorized: Administrator authentication required.');
    }
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="page-inventory.csv"');
    res.status(200).send(generatePageInventoryCsv());
  });

  app.get('/route-manifest.json', (req, res) => {
    const token = req.headers['x-admin-token'] || req.query.token;
    if (!token || token !== ADMIN_TOKEN) {
      return res.status(401).json({ ok: false, error: 'Unauthorized: Administrator authentication required.' });
    }
    res.status(200).json({
      generatedAt: '2026-10-08T12:00:00Z',
      canonicalBaseUrl: CANONICAL_BASE_URL,
      officeFacts: SKILLPLUS_OFFICE_FACTS,
      metrics: getInventoryMetrics(),
      approvedPublicRoutesCount: PUBLISHED_PUBLIC_PAGES.length,
      approvedPublicRoutes: PUBLISHED_PUBLIC_PAGES.map((p) => ({
        url: p.url,
        pageType: p.pageType,
        title: p.title,
        h1: p.h1,
        status: p.status,
        lastModified: p.lastModified
      })),
      redirects: REDIRECT_MAP
    });
  });

  // ===========================================================================
  // 2. SECURED ENQUIRY & TEACHER APPLICATION API ENDPOINTS
  // ===========================================================================
  app.post('/api/enquiries', (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        ok: false,
        error: 'Too many requests from this IP. Please wait 15 minutes or call +91 8459832971.'
      });
    }

    const {
      parentName,
      phone,
      locality,
      classGoal,
      subject,
      mode,
      notes,
      consent,
      sourceUrl,
      website_hp
    } = req.body || {};

    // Honeypot anti-spam trap
    if (website_hp && String(website_hp).trim().length > 0) {
      return res.status(400).json({ ok: false, error: 'Spam check triggered.' });
    }

    const cleanName = String(parentName || '').trim();
    const cleanPhone = String(phone || '').replace(/[^\d+]/g, '');
    const cleanLocality = String(locality || '').trim();

    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        ok: false,
        error: 'Please enter a valid parent or student name (2–100 characters).'
      });
    }
    if (!/^(\+91)?[6-9]\d{9}$/.test(cleanPhone.replace(/^0/, ''))) {
      return res.status(400).json({
        ok: false,
        error: 'Please provide a valid 10-digit Indian mobile number.'
      });
    }
    if (!cleanLocality) {
      return res.status(400).json({
        ok: false,
        error: 'Please specify your residential locality in Pune.'
      });
    }
    if (consent !== true) {
      return res.status(400).json({
        ok: false,
        error: 'Parent/guardian consent is required to store your enquiry.'
      });
    }

    try {
      const existing = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf-8'));
      const referenceId = `ENQ-${Date.now().toString(36).toUpperCase()}`;
      const record = {
        id: referenceId,
        createdAt: new Date().toISOString(),
        parentName: cleanName,
        phone: cleanPhone,
        locality: cleanLocality,
        classGoal: String(classGoal || 'Not specified').slice(0, 100),
        subject: String(subject || 'Not specified').slice(0, 100),
        mode: mode === 'online' ? 'online' : 'home',
        notes: String(notes || '').slice(0, 500),
        sourceUrl: String(sourceUrl || '/').slice(0, 200),
        consentVerified: true,
        emailDeliveryStatus: process.env.OWNER_CONFIRMED_EMAIL
          ? `queued_for_${process.env.OWNER_CONFIRMED_EMAIL}`
          : 'held_pending_owner_domain_confirmation_of_info@skillpustutors.com'
      };
      existing.unshift(record);
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');

      return res.status(201).json({
        ok: true,
        referenceId,
        message:
          'Enquiry validated and durably saved on our Hadapsar server. Our academic coordinator will contact you via phone/WhatsApp (+91 8459832971).'
      });
    } catch {
      return res.status(500).json({
        ok: false,
        error: 'Server storage error. We did not save your enquiry; please call +91 8459832971.'
      });
    }
  });

  app.post('/api/tutor-applications', (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        ok: false,
        error: 'Rate limit exceeded. Please try again later.'
      });
    }

    const {
      teacherName,
      phone,
      qualification,
      subjects,
      corridors,
      experience,
      consent,
      website_hp
    } = req.body || {};

    if (website_hp && String(website_hp).trim().length > 0) {
      return res.status(400).json({ ok: false, error: 'Spam check triggered.' });
    }

    const cleanName = String(teacherName || '').trim();
    const cleanPhone = String(phone || '').replace(/[^\d+]/g, '');
    const cleanQual = String(qualification || '').trim();

    if (cleanName.length < 2 || !/^(\+91)?[6-9]\d{9}$/.test(cleanPhone.replace(/^0/, '')) || !cleanQual) {
      return res.status(400).json({
        ok: false,
        error: 'Please provide a valid educator name, 10-digit mobile number, and academic qualification.'
      });
    }
    if (consent !== true) {
      return res.status(400).json({
        ok: false,
        error: 'Verification consent is required.'
      });
    }

    try {
      const existing = JSON.parse(fs.readFileSync(TUTOR_APPS_FILE, 'utf-8'));
      const referenceId = `TUT-${Date.now().toString(36).toUpperCase()}`;
      existing.unshift({
        id: referenceId,
        createdAt: new Date().toISOString(),
        teacherName: cleanName,
        phone: cleanPhone,
        qualification: cleanQual.slice(0, 150),
        subjects: String(subjects || '').slice(0, 150),
        corridors: String(corridors || '').slice(0, 200),
        experience: String(experience || '').slice(0, 500),
        verificationStage: 'pending_document_check_hadapsar_hq'
      });
      fs.writeFileSync(TUTOR_APPS_FILE, JSON.stringify(existing, null, 2), 'utf-8');

      return res.status(201).json({
        ok: true,
        referenceId,
        message:
          'Educator profile saved on server. Our Hadapsar administration will contact you to schedule credential and ID verification.'
      });
    } catch {
      return res.status(500).json({
        ok: false,
        error: 'Server storage failed.'
      });
    }
  });

  app.get('/api/admin/enquiries', (req, res) => {
    const token = req.headers['x-admin-token'];
    if (!token || token !== ADMIN_TOKEN) {
      return res.status(401).json({
        ok: false,
        error: 'Unauthorized: Valid ADMIN_ACCESS_TOKEN header required.'
      });
    }
    const enquiries = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf-8'));
    const tutorApps = JSON.parse(fs.readFileSync(TUTOR_APPS_FILE, 'utf-8'));
    return res.status(200).json({ ok: true, enquiries, tutorApps });
  });

  // ===========================================================================
  // 3. VITE MIDDLEWARE (DEV) OR STATIC ASSETS (PROD) + FULL SSR HTML INJECTION
  // ===========================================================================
  let vite: any = null;
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(path.join(__dirname, 'dist'), {
        index: false
      })
    );
  }

  // Catch-all SSR Handler for HTML routes
  app.use(async (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    try {
      const rawPath = req.path;
      const normalizedPath = normalizeUrlPath(rawPath);

      // Determine route status and SEO metadata
      const matchedPage = findPageByUrl(normalizedPath);
      const isPublishedPage = Boolean(matchedPage && matchedPage.status === 'published');
      const isAdminRoute = normalizedPath === '/admin';

      // Check if query params contain filter/search parameters
      const hasSearchOrFilterParams = Boolean(
        req.query.q || req.query.filter || req.query.sort || req.query.mode
      );

      let httpStatus = 200;
      let robotsDirective = 'index, follow';
      let title = 'Skill+ Tutors Pune – Home & Online Tutors in Hadapsar & East Pune';
      let description =
        'Personalized 1-on-1 home and online academic tutoring from Office 205, Saptrang Akash, Hadapsar, Pune (412308).';
      let canonicalUrl = `${CANONICAL_BASE_URL}${normalizedPath}`;
      let jsonLdScript = '';

      if (isAdminRoute) {
        httpStatus = 200;
        robotsDirective = 'noindex, nofollow';
        title = 'Staff & Administrator Sign In | Skill+ Tutors Pune';
        description = 'Protected staff portal for Skill+ Tutors Pune.';
      } else if (isPublishedPage && matchedPage) {
        httpStatus = 200;
        robotsDirective = hasSearchOrFilterParams ? 'noindex, follow' : 'index, follow';
        title = matchedPage.title;
        description = matchedPage.metaDescription;
        canonicalUrl = `${CANONICAL_BASE_URL}${matchedPage.url}`;
        const jsonLd = buildStructuredDataJsonLd(matchedPage, CANONICAL_BASE_URL);
        jsonLdScript = `<script id="ssr-jsonld" type="application/ld+json">${jsonLd}</script>`;
      } else {
        // Unknown route OR unverified/draft locality/page -> Real HTTP 404!
        httpStatus = 404;
        robotsDirective = 'noindex, nofollow';
        title = 'Page Not Found | Skill+ Tutors Pune';
        description =
          'Explore verified 1-on-1 home and online tutoring programmes in Hadapsar and East Pune.';
      }

      // Read index.html template
      const templatePath =
        process.env.NODE_ENV === 'production'
          ? path.join(__dirname, 'dist', 'index.html')
          : path.join(__dirname, 'index.html');
      let template = fs.readFileSync(templatePath, 'utf-8');

      if (vite) {
        template = await vite.transformIndexHtml(req.originalUrl, template);
      }

      // Render full React tree on the server for initial HTTP HTML response
      const renderedAppHtml = renderToString(
        React.createElement(App, { initialPath: normalizedPath })
      );

      const ssrHeadBlock = [
        `<title>${escapeHtml(title)}</title>`,
        `<meta name="description" content="${escapeHtml(description)}" />`,
        `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
        `<meta name="robots" content="${robotsDirective}" />`,
        `<meta property="og:title" content="${escapeHtml(title)}" />`,
        `<meta property="og:description" content="${escapeHtml(description)}" />`,
        `<meta property="og:type" content="${
          matchedPage?.pageType === 'parent_guide' ? 'article' : 'website'
        }" />`,
        `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
        `<meta property="og:site_name" content="Skill+ Tutors Pune" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
        jsonLdScript
      ]
        .filter(Boolean)
        .join('\n    ');

      const finalHtml = template
        .replace(/<!--SSR_HEAD_START-->[\s\S]*?<!--SSR_HEAD_END-->/, ssrHeadBlock)
        .replace('<!--SSR_OUTLET-->', renderedAppHtml);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Robots-Tag', robotsDirective);
      res.status(httpStatus).send(finalHtml);
    } catch (err) {
      if (vite) {
        vite.ssrFixStacktrace(err as Error);
      }
      next(err);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `[Skill+ Tutors SSR Server] Listening on http://0.0.0.0:${PORT} (Approved Public Pages: ${PUBLISHED_PUBLIC_PAGES.length} / Total Planned: ${ALL_INVENTORY_PAGES.length})`
    );
  });
}

startServer();
