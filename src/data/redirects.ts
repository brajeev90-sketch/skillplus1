export interface RedirectRule {
  sourcePath: string;
  destinationPath: string;
  statusCode: 301;
  reason: string;
}

export const REDIRECT_MAP: RedirectRule[] = [
  // Locality Alias Consolidation (Single-Hop 301 to Canonical Locality Hubs)
  {
    sourcePath: '/pune/fursungi/',
    destinationPath: '/pune/phursungi/',
    statusCode: 301,
    reason: 'Merge spelling alias Fursungi into canonical Phursungi hub'
  },
  {
    sourcePath: '/pune/fursungi/chemistry-tutors/',
    destinationPath: '/pune/phursungi/chemistry-tutors/',
    statusCode: 301,
    reason: 'Merge spelling alias Fursungi chemistry tutors into canonical Phursungi route'
  },
  {
    sourcePath: '/pune/fursungi/physics-tutors/',
    destinationPath: '/pune/phursungi/physics-tutors/',
    statusCode: 301,
    reason: 'Merge spelling alias Fursungi physics tutors into canonical Phursungi route'
  },
  {
    sourcePath: '/pune/fursungi/maths-tutors/',
    destinationPath: '/pune/phursungi/maths-tutors/',
    statusCode: 301,
    reason: 'Merge spelling alias Fursungi maths tutors into canonical Phursungi route'
  },
  {
    sourcePath: '/pune/kale-padal/',
    destinationPath: '/pune/kalepadal/',
    statusCode: 301,
    reason: 'Merge spelling variation Kale Padal into canonical Kalepadal hub'
  },
  {
    sourcePath: '/pune/gadital/',
    destinationPath: '/pune/hadapsar-gadital/',
    statusCode: 301,
    reason: 'Merge short alias Gadital into canonical Hadapsar Gadital hub'
  },
  {
    sourcePath: '/pune/mohammed-wadi/',
    destinationPath: '/pune/mohammadwadi/',
    statusCode: 301,
    reason: 'Merge spelling variation Mohammed Wadi into canonical Mohammadwadi hub'
  },
  {
    sourcePath: '/pune/autadwadi-handewadi/',
    destinationPath: '/pune/handewadi/',
    statusCode: 301,
    reason: 'Consolidate overlapping sub-pocket Autadwadi Handewadi into canonical Handewadi hub'
  },
  {
    sourcePath: '/pune/magarpatta/',
    destinationPath: '/pune/magarpatta-city/',
    statusCode: 301,
    reason: 'Consolidate short name Magarpatta into canonical Magarpatta City hub'
  },
  {
    sourcePath: '/pune/amanora/',
    destinationPath: '/pune/amanora-park-town/',
    statusCode: 301,
    reason: 'Consolidate short name Amanora into canonical Amanora Park Town hub'
  },
  {
    sourcePath: '/pune/manjri/',
    destinationPath: '/pune/manjari-budruk/',
    statusCode: 301,
    reason: 'Consolidate spelling variant Manjri into canonical Manjari Budruk hub'
  },
  {
    sourcePath: '/pune/wanwadi/',
    destinationPath: '/pune/wanowrie/',
    statusCode: 301,
    reason: 'Consolidate colloquial alias Wanwadi into canonical Wanowrie hub'
  },
  {
    sourcePath: '/pune/nibm/',
    destinationPath: '/pune/nibm-road/',
    statusCode: 301,
    reason: 'Consolidate short alias NIBM into canonical NIBM Road hub'
  },

  // Subject Keyword Variation Consolidation (Avoiding Doorway Pages)
  {
    sourcePath: '/pune/hadapsar/mathematics-tutors/',
    destinationPath: '/pune/hadapsar/maths-tutors/',
    statusCode: 301,
    reason: 'Consolidate mathematics-tutors slug into canonical maths-tutors route'
  },
  {
    sourcePath: '/pune/magarpatta-city/mathematics-tutors/',
    destinationPath: '/pune/magarpatta-city/maths-tutors/',
    statusCode: 301,
    reason: 'Consolidate mathematics-tutors slug into canonical maths-tutors route'
  },
  {
    sourcePath: '/pune/amanora-park-town/mathematics-tutors/',
    destinationPath: '/pune/amanora-park-town/maths-tutors/',
    statusCode: 301,
    reason: 'Consolidate mathematics-tutors slug into canonical maths-tutors route'
  },

  // Legacy & Utility Route Normalization
  {
    sourcePath: '/wp-sitemap.xml',
    destinationPath: '/sitemap.xml',
    statusCode: 301,
    reason: 'Redirect legacy WordPress sitemap endpoint to clean canonical XML sitemap'
  },
  {
    sourcePath: '/contact/',
    destinationPath: '/contact-us/',
    statusCode: 301,
    reason: 'Preserve existing live /contact-us/ route as canonical'
  },
  {
    sourcePath: '/about/',
    destinationPath: '/about-us/',
    statusCode: 301,
    reason: 'Preserve existing live /about-us/ route as canonical'
  },
  {
    sourcePath: '/enquire/',
    destinationPath: '/find-tutor/',
    statusCode: 301,
    reason: 'Direct generic /enquire/ to preserved /find-tutor/ enquiry route'
  }
];

export function normalizeUrlPath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  // Keep file extensions like .xml, .csv, .json, .txt without trailing slash
  if (/\.(xml|txt|csv|json|ico|png|jpg|svg|css|js)$/i.test(rawPath)) {
    return rawPath;
  }
  // Admin and API paths do not enforce trailing slash
  if (rawPath.startsWith('/api/') || rawPath.startsWith('/admin')) {
    return rawPath.replace(/\/+$/, '') || '/';
  }
  const clean = rawPath.replace(/\/+$/, '');
  return `${clean}/`;
}

export function findRedirectRule(rawPath: string): RedirectRule | undefined {
  const normalized = normalizeUrlPath(rawPath);
  return REDIRECT_MAP.find(
    (rule) =>
      rule.sourcePath === rawPath ||
      rule.sourcePath === normalized
  );
}
