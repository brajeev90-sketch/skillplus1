import {
  SERVICE_AREAS,
  APPROVED_PUBLIC_SERVICE_AREAS,
  SKILLPLUS_OFFICE_FACTS,
  ServiceAreaRecord
} from './serviceAreas';

export type EditorialStatus =
  | 'published'
  | 'approved'
  | 'reviewed'
  | 'needs_evidence'
  | 'draft';

export type PageType =
  | 'core'
  | 'programme_hub'
  | 'subject_hub'
  | 'board_hub'
  | 'regional_hub'
  | 'locality_hub'
  | 'subject_locality'
  | 'exam_locality'
  | 'parent_guide';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageContentSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface PageInventoryItem {
  url: string;
  pageType: PageType;
  title: string;
  metaDescription: string;
  h1: string;
  primaryUserIntent: string;
  keywordCluster: string[];
  localitySlug?: string;
  localityName?: string;
  subjectOrExam?: string;
  boardOrClassRange?: string;
  supportingEvidence: string;
  uniqueContentAngle: string;
  relatedUrls: string[];
  reviewer: string;
  status: EditorialStatus;
  lastModified: string;
  breadcrumbs: BreadcrumbItem[];
  heroBadge: string;
  heroSubtitle: string;
  quickSummaryFacts: { label: string; value: string }[];
  sections: PageContentSection[];
  faqs: FAQItem[];
  editorialBlockerNote?: string;
}

export interface SubjectSpec {
  slug: string;
  urlSlug: string;
  name: string;
  shortName: string;
  supportedClasses: string;
  supportedBoards: string[];
  coreTopics: string[];
  teachingApproach: string;
  tutorSuitability: string;
  parentEvaluationQuestions: string[];
}

export const SUBJECT_SPECS: Record<string, SubjectSpec> = {
  Chemistry: {
    slug: 'chemistry',
    urlSlug: 'chemistry-tutors',
    name: 'Chemistry',
    shortName: 'Chemistry',
    supportedClasses: 'Class 9–10 Foundation, Class 11–12 Boards (CBSE, ISC, HSC), NEET UG & JEE Main/Advanced',
    supportedBoards: ['CBSE', 'ICSE/ISC', 'Maharashtra HSC', 'IB', 'IGCSE', 'NEET', 'JEE'],
    coreTopics: [
      'Organic Chemistry reaction mechanisms, named reactions, and GOC',
      'Physical Chemistry numerical problem-solving (Thermodynamics, Equilibrium, Electrochemistry, Chemical Kinetics)',
      'Inorganic Chemistry NCERT line-by-line mastery, Coordination Compounds, and Periodic trends',
      'Board practical viva preparation, salt analysis, and volumetric titration calculations'
    ],
    teachingApproach:
      'We separate Chemistry preparation into equation-driven numerical drills for Physical Chemistry, mechanism mapping (rather than rote memorization) for Organic conversions, and structured NCERT/HSC textbook annotation for Inorganic retention.',
    tutorSuitability:
      'Ideal for Class 11–12 students struggling with the jump from Class 10 general science to Organic reaction mechanisms or Physical Chemistry logarithmic calculations, as well as NEET/JEE aspirants targeting high accuracy.',
    parentEvaluationQuestions: [
      'How will the tutor transition my child from memorizing Organic reactions to understanding electron-movement mechanisms?',
      'Does the weekly plan allocate dedicated time for Physical Chemistry numericals alongside NCERT/Board theory?',
      'How frequently are cumulative chapter tests conducted to prevent forgetting earlier Inorganic blocks?'
    ]
  },
  Physics: {
    slug: 'physics',
    urlSlug: 'physics-tutors',
    name: 'Physics',
    shortName: 'Physics',
    supportedClasses: 'Class 9–10 Foundation, Class 11–12 Science (CBSE, ISC, HSC), JEE Main/Advanced & NEET UG',
    supportedBoards: ['CBSE', 'ICSE/ISC', 'Maharashtra HSC', 'IB', 'IGCSE', 'JEE', 'NEET'],
    coreTopics: [
      'Classical Mechanics: Kinematics, Laws of Motion, Work-Energy-Power, Rotational Dynamics, and Gravitation',
      'Electrodynamics: Electrostatics, Current Electricity, Moving Charges & Magnetism, EMI, and AC Circuits',
      'Optics & Waves: Ray Optics, Wave Optics, SHM, and Superposition of Waves',
      'Modern Physics & Semiconductors: Dual Nature, Atoms, Nuclei, and Electronic Devices'
    ],
    teachingApproach:
      'Every Physics topic begins with free-body diagrams, dimensional intuition, and calculus/trigonometry prerequisites before moving to graded numerical problem sets (Board derivations -> NCERT Exemplar -> PYQs for JEE/NEET).',
    tutorSuitability:
      'Suited for NEET aspirants who understand Biology theory but lose marks in Physics numericals, JEE candidates needing 1-on-1 doubt resolution on multi-concept mechanics/electrodynamics problems, and Class 12 HSC/CBSE students mastering derivations.',
    parentEvaluationQuestions: [
      'Will the tutor first diagnose basic calculus and vector weaknesses before starting Class 11 Mechanics or Class 12 Electrostatics?',
      'How many timed numerical problems will the student solve independently during and between home sessions?',
      'How does the tutor balance step-wise Board derivation writing with faster objective shortcuts for CET/NEET/JEE?'
    ]
  },
  Mathematics: {
    slug: 'mathematics',
    urlSlug: 'maths-tutors',
    name: 'Mathematics',
    shortName: 'Maths',
    supportedClasses: 'Class 8–10 School Boards (CBSE, ICSE, SSC), Class 11–12 Science/Commerce, JEE Main/Advanced & MHT-CET',
    supportedBoards: ['CBSE', 'ICSE/ISC', 'Maharashtra SSC & HSC', 'IB', 'IGCSE', 'JEE'],
    coreTopics: [
      'Class 8–10 Core: Linear & Quadratic Equations, Coordinate Geometry, Trigonometry, Mensuration, Triangles, Statistics & Probability',
      'Calculus: Limits, Continuity, Differentiability, Applications of Derivatives, Indefinite & Definite Integration, Differential Equations',
      'Algebra & Matrices: Complex Numbers, Sequences & Series, Permutations & Combinations, Binomial Theorem, Matrices & Determinants',
      'Vectors & 3D Coordinate Geometry: Straight Lines, Conic Sections (Circle, Parabola, Ellipse, Hyperbola), and 3D Planes'
    ],
    teachingApproach:
      'Sessions emphasize live notebook supervision: watching how the student sets up equations, catching algebraic sign errors in real time, and building progressive problem sets from textbook exercises to board sample papers and JEE/CET timed drills.',
    tutorSuitability:
      'Designed for Class 8–10 students needing confidence and step-marking discipline in SSC/CBSE/ICSE boards, and Class 11–12 students tackling Calculus, Coordinate Geometry, and Algebra.',
    parentEvaluationQuestions: [
      'How does the tutor ensure my child writes complete, board-compliant steps rather than skipping intermediate algebra?',
      'What is the weekly homework correction and error-log protocol for wrong problems?',
      'Can the tutor adapt pacing around school unit tests and pre-board exam schedules?'
    ]
  },
  Biology: {
    slug: 'biology',
    urlSlug: 'biology-tutors',
    name: 'Biology',
    shortName: 'Biology',
    supportedClasses: 'Class 9–10 ICSE/CBSE, Class 11–12 PCB (CBSE, ISC, HSC) & NEET UG Target/Dropper',
    supportedBoards: ['CBSE', 'ICSE/ISC', 'Maharashtra HSC', 'NEET'],
    coreTopics: [
      'Human & Plant Physiology: Digestion, Respiration, Circulation, Excretion, Neural/Chemical Coordination, Photosynthesis',
      'Genetics & Evolution: Mendelian Inheritance, Molecular Basis of Inheritance (DNA/RNA), Evolution',
      'Cell Biology & Biotechnology: Cell Structure, Biomolecules, Cell Cycle, Recombinant DNA Technology & Applications',
      'Morphology, Anatomy, Reproduction & Ecology: Flowering Plants, Animal Kingdom, Human Reproduction, Ecosystems'
    ],
    teachingApproach:
      'Combines diagrammatic visual recall, flowcharts for physiological pathways, and strict NCERT line-by-line interrogation (assertion-reason and statement-based MCQs) so students master both descriptive Board answers and 360-mark NEET Biology sections.',
    tutorSuitability:
      'Built for Class 11–12 PCB students and NEET UG candidates who need structured retention, diagram labelling accuracy, and high-yield NCERT conceptual testing.',
    parentEvaluationQuestions: [
      'How does the tutor test line-by-line NCERT comprehension for statement-based and assertion-reason NEET questions?',
      'Are diagram practice and structured descriptive answer formatting included for Class 12 CBSE/HSC Board exams?',
      'What revision cycle is used so Class 11 chapters remain fresh during Class 12?'
    ]
  },
  Science: {
    slug: 'science',
    urlSlug: 'science-tutors',
    name: 'Class 8–10 Science',
    shortName: 'Science',
    supportedClasses: 'Class 8, Class 9, and Class 10 School Boards (CBSE, ICSE, Maharashtra SSC)',
    supportedBoards: ['CBSE', 'ICSE', 'Maharashtra SSC'],
    coreTopics: [
      'Class 10 Physics Units: Light Reflection & Refraction, Human Eye, Electricity, Magnetic Effects of Electric Current',
      'Class 10 Chemistry Units: Chemical Reactions & Equations, Acids Bases & Salts, Metals & Non-Metals, Carbon & Its Compounds',
      'Class 10 Biology Units: Life Processes, Control & Coordination, Reproduction, Heredity, Our Environment',
      'SSC Science Part 1 & Part 2 / ICSE Segregated Physics, Chemistry & Biology Paper Writing & Diagram Drills'
    ],
    teachingApproach:
      'Verified on existing Skill+ Tutors Class 10 Board programme: builds early conceptual clarity across Physics, Chemistry, and Biology units with ray-diagram practice, chemical equation balancing, and past 5-year CBSE/SSC/ICSE board paper evaluations.',
    tutorSuitability:
      'Specifically structured for Class 8–10 students preparing for their first major board examination (CBSE Class 10 Science, SSC Science 1 & 2, or ICSE Science) or laying a foundation for Class 11 Science streams.',
    parentEvaluationQuestions: [
      'Does the tutor cover all three components (Physics numericals, Chemistry equations, and Biology diagrams) thoroughly for Class 10?',
      'How many full-length 80-mark / 40+40-mark board sample papers are graded before the February/March board exams?',
      'Will the tutor help my child bridge Class 9–10 concepts towards future JEE or NEET foundation?'
    ]
  }
};

export interface ExamOrBoardSpec {
  slug: string;
  urlSlug: string;
  legacyUrl?: string;
  name: string;
  shortName: string;
  supportedClasses: string;
  subjectsOffered: string[];
  overview: string;
  methodology: string;
}

export const EXAM_AND_BOARD_SPECS: Record<string, ExamOrBoardSpec> = {
  JEE: {
    slug: 'jee',
    urlSlug: 'jee-tutors',
    legacyUrl: '/jee/',
    name: 'IIT-JEE (Main & Advanced)',
    shortName: 'JEE',
    supportedClasses: 'Class 9–10 Foundation, Class 11–12 PCM & JEE Repeaters',
    subjectsOffered: ['Physics', 'Chemistry', 'Mathematics'],
    overview:
      '1-on-1 home and live online coaching for JEE Main and JEE Advanced across Physics, Chemistry, and Mathematics, synchronizing Class 11–12 board syllabi with NTA objective problem-solving.',
    methodology:
      'Replaces generic batch lectures with personalized error-log analysis, concept-to-numerical progression, PYQ topic drills, and regular mock test debriefings.'
  },
  NEET: {
    slug: 'neet',
    urlSlug: 'neet-tutors',
    legacyUrl: '/neet/',
    name: 'NEET UG Medical Entrance',
    shortName: 'NEET',
    supportedClasses: 'Class 9–10 Foundation, Class 11–12 PCB & NEET Repeaters/Droppers',
    subjectsOffered: ['Biology (Botany & Zoology)', 'Chemistry', 'Physics'],
    overview:
      'Focused 1-on-1 mentorship for NEET UG aspirants in Hadapsar and East Pune, combining strict NCERT line-by-line Biology and Chemistry mastery with supportive Physics numerical training.',
    methodology:
      'Structured around NCERT mastery, assertion-reason drills, negative-marking reduction strategies, and weekly OMR/timed test evaluations.'
  },
  CBSE: {
    slug: 'cbse',
    urlSlug: 'cbse-tutors',
    name: 'CBSE Board (Class 8–12)',
    shortName: 'CBSE',
    supportedClasses: 'Class 8, 9, 10, 11 & 12 (CBSE Curriculum)',
    subjectsOffered: ['Mathematics', 'Science (Class 8–10)', 'Physics', 'Chemistry', 'Biology'],
    overview:
      'NCERT-aligned doorstep and online tutoring tailored to the latest CBSE competency-based question patterns, case-study questions, and step-marked descriptive answers.',
    methodology:
      'Covers complete NCERT textbook exercises, Exemplar problems, competency-based MCQs, and timed pre-board answer sheet evaluations.'
  },
  ICSE: {
    slug: 'icse',
    urlSlug: 'icse-tutors',
    name: 'ICSE & ISC Board (Class 8–12)',
    shortName: 'ICSE',
    supportedClasses: 'Class 8–10 (ICSE) & Class 11–12 (ISC Science)',
    subjectsOffered: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    overview:
      'Specialized 1-on-1 tuition for CISCE (ICSE Class 8–10 and ISC Class 11–12) students requiring early subject segregation in Physics, Chemistry, Biology, and rigorous Mathematics.',
    methodology:
      'Aligns with prescribed ICSE/ISC reference texts (Selina/Concise, M.L. Aggarwal, Nootan), structured lab workbooks, and council marking-scheme keywords.'
  },
  SSC: {
    slug: 'ssc',
    urlSlug: 'ssc-tutors',
    legacyUrl: '/10th-board/',
    name: 'Maharashtra SSC & Class 10 Board',
    shortName: '10th Board / SSC',
    supportedClasses: 'Class 8, 9 & 10 (Maharashtra State Board SSC, CBSE & ICSE)',
    subjectsOffered: ['Mathematics (Algebra & Geometry)', 'Science (Part 1 & Part 2)'],
    overview:
      'Dedicated Class 10 Board preparation covering Algebra, Geometry, and Science 1 & 2 across Maharashtra SSC as well as CBSE/ICSE Class 10 curricula.',
    methodology:
      'Focuses on geometric theorem proofs, algebraic step accuracy, scientific give-reasons, diagram labelling, and full prelim paper evaluation.'
  },
  HSC: {
    slug: 'hsc',
    urlSlug: 'hsc-tutors',
    legacyUrl: '/12th-board/',
    name: 'Maharashtra HSC & Class 12 Science Board',
    shortName: '12th Board / HSC',
    supportedClasses: 'Class 11 & Class 12 Science (HSC, CBSE & ISC)',
    subjectsOffered: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    overview:
      'Comprehensive Class 11–12 Science board preparation for HSC, CBSE, and ISC students, balancing textbook derivations and practical readiness with MHT-CET/JEE/NEET entrance alignment.',
    methodology:
      'Emphasizes derivation clarity, numerical log-table / calculation accuracy, organic conversions, and board paper presentation.'
  },
  IB: {
    slug: 'ib',
    urlSlug: 'ib-tutors',
    name: 'IB (MYP & Diploma Programme)',
    shortName: 'IB',
    supportedClasses: 'IB MYP & IBDP (SL / HL Science & Mathematics)',
    subjectsOffered: ['Physics', 'Chemistry', 'Mathematics (AA/AI)', 'Biology'],
    overview:
      'Inquiry-driven 1-on-1 academic support for IB students in East Pune townships (Magarpatta, Amanora, NIBM, Undri) covering SL/HL concepts and data-based question analysis.',
    methodology:
      'Matched only after verifying faculty familiarity with IB syllabus command terms, criterion-referenced assessments, and graphical calculator workflows.'
  },
  IGCSE: {
    slug: 'igcse',
    urlSlug: 'igcse-tutors',
    name: 'Cambridge IGCSE & A-Level',
    shortName: 'IGCSE',
    supportedClasses: 'Cambridge Lower Secondary, IGCSE (Core/Extended) & AS/A-Level',
    subjectsOffered: ['Physics (0625)', 'Chemistry (0620)', 'Mathematics (0580)', 'Biology (0610)'],
    overview:
      'Structured 1-on-1 tutoring for Cambridge IGCSE and AS/A-Level students across East Pune, focusing on Paper 2 (MCQ), Paper 4 (Extended Theory), and Paper 6 (Alternative to Practical).',
    methodology:
      'Uses topic-wise past paper mark schemes to train precise scientific phrasing and calculation significant figures.'
  }
};

// High-priority localities where all verified subject-locality pages are approved and published publicly
const TIER_1_PUBLISHED_SUBJECT_LOCALITIES = new Set([
  'hadapsar',
  'hadapsar-gadital',
  'sasane-nagar',
  'malwadi',
  'satavwadi',
  'gondhale-nagar',
  'kalepadal',
  'magarpatta-city',
  'amanora-park-town',
  'sade-satra-nali',
  'mundhwa',
  'keshav-nagar',
  'wanowrie',
  'fatima-nagar',
  'nibm-road',
  'salunke-vihar',
  'handewadi',
  'mohammadwadi',
  'undri',
  'phursungi',
  'bhekrai-nagar',
  'tukai-darshan',
  'shewalewadi',
  'manjari-budruk',
  'kondhwa'
]);

const TIER_1_PUBLISHED_EXAM_LOCALITIES: Array<{
  localitySlug: string;
  examKey: keyof typeof EXAM_AND_BOARD_SPECS;
  status: EditorialStatus;
}> = [
  { localitySlug: 'hadapsar', examKey: 'NEET', status: 'published' },
  { localitySlug: 'hadapsar', examKey: 'JEE', status: 'published' },
  { localitySlug: 'hadapsar', examKey: 'CBSE', status: 'published' },
  { localitySlug: 'hadapsar', examKey: 'SSC', status: 'published' },
  { localitySlug: 'hadapsar', examKey: 'HSC', status: 'published' },
  { localitySlug: 'magarpatta-city', examKey: 'JEE', status: 'published' },
  { localitySlug: 'magarpatta-city', examKey: 'NEET', status: 'published' },
  { localitySlug: 'magarpatta-city', examKey: 'CBSE', status: 'published' },
  { localitySlug: 'magarpatta-city', examKey: 'ICSE', status: 'published' },
  { localitySlug: 'amanora-park-town', examKey: 'JEE', status: 'published' },
  { localitySlug: 'amanora-park-town', examKey: 'NEET', status: 'published' },
  { localitySlug: 'amanora-park-town', examKey: 'CBSE', status: 'published' },
  { localitySlug: 'amanora-park-town', examKey: 'ICSE', status: 'published' },
  { localitySlug: 'undri', examKey: 'NEET', status: 'published' },
  { localitySlug: 'undri', examKey: 'JEE', status: 'published' },
  { localitySlug: 'undri', examKey: 'CBSE', status: 'published' },
  { localitySlug: 'undri', examKey: 'ICSE', status: 'published' },
  { localitySlug: 'wanowrie', examKey: 'NEET', status: 'published' },
  { localitySlug: 'wanowrie', examKey: 'JEE', status: 'published' },
  { localitySlug: 'wanowrie', examKey: 'ICSE', status: 'published' },
  { localitySlug: 'nibm-road', examKey: 'NEET', status: 'published' },
  { localitySlug: 'nibm-road', examKey: 'JEE', status: 'published' },
  { localitySlug: 'nibm-road', examKey: 'CBSE', status: 'published' },
  { localitySlug: 'phursungi', examKey: 'NEET', status: 'published' },
  { localitySlug: 'phursungi', examKey: 'SSC', status: 'published' },
  { localitySlug: 'bhekrai-nagar', examKey: 'SSC', status: 'published' },
  { localitySlug: 'bhekrai-nagar', examKey: 'HSC', status: 'published' },
  { localitySlug: 'keshav-nagar', examKey: 'CBSE', status: 'published' },
  { localitySlug: 'handewadi', examKey: 'NEET', status: 'published' },
  { localitySlug: 'kondhwa', examKey: 'NEET', status: 'published' }
];

function buildAllPages(): PageInventoryItem[] {
  const pages: PageInventoryItem[] = [];
  const lastMod = '2026-10-08';

  // ============================================================================
  // 1. 10 CORE & PRESERVED LEGACY ROUTES
  // ============================================================================
  pages.push({
    url: '/',
    pageType: 'core',
    title: 'Skill+ Tutors Pune – Home & Online Tutors in Hadapsar & East Pune',
    metaDescription:
      'Personalized 1-on-1 home and online academic tutoring from Office 205, Saptrang Akash, Hadapsar, Pune (412308) for NEET, JEE & School Boards across verified ~10 km East Pune localities.',
    h1: 'Home & Online Tutors in Hadapsar & East Pune',
    primaryUserIntent: 'Discover verified 1-on-1 home and online tutoring in Hadapsar and within ~10 km in East Pune',
    keywordCluster: [
      'home tutors in hadapsar pune',
      'skill plus tutors pune',
      'online and home tuition east pune',
      'neet jee board tutors hadapsar'
    ],
    supportingEvidence:
      'Verified operational headquarters at Office 205, Saptrang Akash, Hadapsar, Pune 412308; helpline +91 8459832971; established 2020.',
    uniqueContentAngle:
      'Primary brand gateway with interactive Quick Tutor Matcher, 3-step parent matching protocol, verified ~10 km East Pune locality clusters, and real student outcomes.',
    relatedUrls: ['/pune/', '/pune/hadapsar/', '/neet/', '/jee/', '/find-tutor/', '/contact-us/'],
    reviewer: 'Lead SEO & Curriculum Architect',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [{ label: 'Home', url: '/' }],
    heroBadge: 'Pune Home & Online Tutoring',
    heroSubtitle:
      'Personalized 1-on-1 Academic Tutoring for NEET, JEE & School Boards (CBSE, ICSE, SSC, HSC, IB, IGCSE)',
    quickSummaryFacts: [
      { label: 'Registered Office', value: 'Office 205, Saptrang Akash, Hadapsar, Pune - 412308' },
      { label: 'Coverage Radius', value: '~10.0 km straight-line / verified East Pune road transit' },
      { label: 'Supported Modes', value: 'Doorstep 1-on-1 Home Tuition & Live Interactive Online' },
      { label: 'Parent Helpline', value: '+91 8459832971' }
    ],
    sections: [
      {
        heading: 'Verified 1-on-1 Academic Mentorship from Hadapsar HQ',
        body: [
          'Founded by experienced educators in 2020, Skill+ Tutors coordinates personalized 1-on-1 home tuition and live online classes from Office 205, Saptrang Akash, Hadapsar, Pune - 412308.',
          'Rather than grouping students into crowded coaching batches, we match learners in Class 8–12 and competitive exam tracks (NEET UG and IIT-JEE) with identity-verified subject specialists who adapt to your child’s pace and school curriculum.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Where is the Skill+ Tutors office located in Pune?',
        answer:
          'Our administrative office is located at Office 205, Saptrang Akash, Hadapsar, Pune - 412308 (near Tukai Darshan / Phursungi). All tutor verifications and parent consultations are coordinated from this office.'
      },
      {
        question: 'Which areas in Pune are covered for doorstep home tuition?',
        answer:
          'We provide 1-on-1 doorstep home tutoring within an approximate 10 km radius of our Hadapsar office, covering Hadapsar, Magarpatta City, Amanora Park Town, Sasane Nagar, Phursungi, Bhekrai Nagar, Wanowrie, Fatima Nagar, NIBM Road, Undri, Handewadi, Mohammadwadi, Mundhwa, and Keshav Nagar. Practical road connectivity determines home-visit slots, while live online 1-on-1 sessions are available across all of Pune.'
      },
      {
        question: 'Can parents evaluate a tutor before committing to monthly tuition?',
        answer:
          'Yes. After our Hadapsar administration shortlists a background-verified subject specialist, we arrange an initial demonstration session so parents and the student can evaluate teaching clarity and syllabus alignment.'
      }
    ]
  });

  pages.push({
    url: '/pune/',
    pageType: 'regional_hub',
    title: 'East Pune Home & Online Tutoring Directory (10 km Radius) | Skill+ Tutors',
    metaDescription:
      'Explore verified 1-on-1 home and online tutoring coverage across 34 East Pune localities within ~10 km of our Hadapsar office (Saptrang Akash, Pune 412308).',
    h1: 'East Pune Home & Online Tutoring Directory (~10 km Service Radius)',
    primaryUserIntent: 'Check locality-wise home tutor coverage, road distance, and available subjects in East Pune',
    keywordCluster: [
      'home tutors east pune',
      'tuition near hadapsar magarpatta wanowrie',
      'pune home tuition service areas'
    ],
    supportingEvidence:
      'Haversine straight-line and practical road-transit audit from provisional office point (18.486142, 73.952372) across 45 researched localities.',
    uniqueContentAngle:
      'Transparent regional hub separating verified core home-visit clusters, borderline road-commute pockets, and online-only outer areas.',
    relatedUrls: [
      '/',
      '/pune/hadapsar/',
      '/pune/magarpatta-city/',
      '/pune/amanora-park-town/',
      '/pune/wanowrie/',
      '/pune/undri/',
      '/pune/phursungi/'
    ],
    reviewer: 'Local Search & Geography Lead',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'East Pune Directory', url: '/pune/' }
    ],
    heroBadge: 'Verified ~10 km Radius Hub',
    heroSubtitle:
      'Transparent straight-line and road-transit coverage from Office 205, Saptrang Akash, Hadapsar, Pune - 412308.',
    quickSummaryFacts: [
      { label: 'Service Areas Covered', value: `${APPROVED_PUBLIC_SERVICE_AREAS.length} East Pune Localities` },
      { label: 'Supported Formats', value: '1-on-1 Doorstep Home Tuition & Live Online' },
      { label: 'Core Subjects', value: 'Physics, Chemistry, Mathematics, Biology & Class 8–10 Science' },
      { label: 'Administrative Hub', value: 'Office 205, Saptrang Akash, Hadapsar, Pune - 412308' }
    ],
    sections: [
      {
        heading: 'How We Coordinate Home Tuition Across East Pune',
        body: [
          'Our 10 km service radius around our Hadapsar administrative office covers major residential corridors—from integrated townships like Magarpatta City and Amanora Park Town to residential societies in Wanowrie, NIBM Road, Undri, Phursungi, and Keshav Nagar.',
          'Because home tutors commute by road, we match families with background-verified educators who live or travel regularly along your specific East Pune road corridor.'
        ],
        bullets: [
          'Core Hadapsar & Phursungi (< 4 km road): Morning and evening 1-on-1 home visit scheduling.',
          'Townships & South-East Pune (4–8 km road): Dedicated afternoon and evening slots across Magarpatta, Amanora, Wanowrie, NIBM Road, and Undri.',
          'Extended Corridors (8–10 km road, e.g., Kondhwa, Lulla Nagar, South Kharadi): Home visits subject to corridor faculty availability; live 1-on-1 online classes available across all Pune sectors.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do you schedule home tuition for areas further from Hadapsar?',
        answer:
          'For localities within 4–8 km of our Hadapsar hub, we match tutors who commute along that specific corridor. For outer Pune areas where daily road travel is longer, we offer both selective home visits (based on nearby faculty availability) and interactive 1-on-1 live online classes.'
      },
      {
        question: 'Where is the Skill+ Tutors office located?',
        answer:
          'Skill+ Tutors operates from our registered office at Office 205, Saptrang Akash, Hadapsar, Pune - 412308, coordinating doorstep tutor visits and online mentorship across East Pune.'
      }
    ]
  });

  pages.push({
    url: '/about-us/',
    pageType: 'core',
    title: 'About Skill+ Tutors Pune | Registered Tutoring Office in Hadapsar',
    metaDescription:
      'Learn about Skill+ Tutors (founded 2020), our tutor verification protocol, academic methodology, and administrative office at Saptrang Akash, Hadapsar, Pune 412308.',
    h1: 'About Skill+ Tutors: Educator-Founded 1-on-1 Mentorship in Pune',
    primaryUserIntent: 'Verify the legitimacy, history, office address, and tutor screening standards of Skill+ Tutors',
    keywordCluster: ['about skill plus tutors', 'skill+ tutors hadapsar office', 'verified home tutors pune'],
    supportingEvidence: 'Preserved live /about-us/ route; founded 2020; Office 205, Saptrang Akash, Hadapsar, Pune 412308.',
    uniqueContentAngle: 'Institutional transparency, tutor background verification protocol, and truthful operational disclosures.',
    relatedUrls: ['/', '/contact-us/', '/find-tutor/', '/join-us/'],
    reviewer: 'Editorial Compliance Lead',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '/about-us/' }
    ],
    heroBadge: 'Established 2020 • Hadapsar, Pune',
    heroSubtitle:
      'Founded by subject-matter educators to bridge the gap between school classroom teaching and competitive exam clarity.',
    quickSummaryFacts: [
      { label: 'Founded', value: '2020 (Educator-Led Academic Facilitation)' },
      { label: 'Students Mentored', value: '2,000+ Intermediate & Board/Entrance Candidates' },
      { label: 'Registered Office', value: 'Office 205, Saptrang Akash, Hadapsar, Pune - 412308' },
      { label: 'Screening Standard', value: 'ID/Address Verification + Subject Pedagogy Assessment' }
    ],
    sections: [
      {
        heading: 'Our Origin & Educational Mission',
        body: [
          'Skill+ Tutors (SkillPlus Tutors) was founded in 2020 by a group of subject-matter teachers who observed that many capable Class 8–12 students fall behind in large 60-student coaching batches.',
          'From our administrative office at Office 205, Saptrang Akash, Hadapsar, Pune - 412308, we coordinate individualized 1-on-1 home tuition across East Pune and interactive live online classes for students preparing for CBSE, ICSE, SSC, HSC, IB, IGCSE, NEET UG, and IIT-JEE.'
        ]
      },
      {
        heading: 'Three-Stage Tutor Verification & Matching Protocol',
        body: [
          'Every educator in our network undergoes a structured onboarding review before being introduced to a family for a home demonstration session:'
        ],
        bullets: [
          'Academic Credential & Subject Mastery Review: Verification of university degrees and written/oral evaluation in Physics, Chemistry, Mathematics, or Biology.',
          'Identity & Address Documentation: Government photo ID and local residential address verification maintained by our Hadapsar administration.',
          'Syllabus & Commute Alignment: Matching tutors who live or commute reliably along the student’s specific East Pune road corridor.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can parents visit the Hadapsar office in person?',
        answer:
          'Yes. Parents are welcome to schedule an academic counselling appointment at Office 205, Saptrang Akash, Hadapsar, Pune - 412308 by calling +91 8459832971.'
      }
    ]
  });

  pages.push({
    url: '/contact-us/',
    pageType: 'core',
    title: 'Contact Skill+ Tutors Hadapsar, Pune | Helpline & Office Address',
    metaDescription:
      'Contact Skill+ Tutors at Office 205, Saptrang Akash, Hadapsar, Pune - 412308. Call +91 8459832971 or submit a verified parent tutoring enquiry online.',
    h1: 'Contact Skill+ Tutors – Hadapsar Administrative Office',
    primaryUserIntent: 'Reach Skill+ Tutors by phone, WhatsApp, office visit, or online enquiry form',
    keywordCluster: ['skill plus tutors contact number', 'skill+ tutors hadapsar address', 'contact home tutors hadapsar'],
    supportingEvidence: 'Preserved live /contact-us/ route; verified phone +91 8459832971 and address.',
    uniqueContentAngle: 'Complete administrative contact details and direct parent enquiry form.',
    relatedUrls: ['/', '/find-tutor/', '/about-us/', '/pune/hadapsar/'],
    reviewer: 'Editorial Compliance Lead',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Contact Us', url: '/contact-us/' }
    ],
    heroBadge: 'Administrative Office & Helpline',
    heroSubtitle:
      'Direct coordination from Office 205, Saptrang Akash, Hadapsar, Pune - 412308 for parents and educators.',
    quickSummaryFacts: [
      { label: 'Office Address', value: 'Office 205, Saptrang Akash, Hadapsar, Pune - 412308' },
      { label: 'Direct Phone / WhatsApp', value: '+91 8459832971' },
      { label: 'Official Email', value: 'info@skillpustutors.com' },
      { label: 'Consultation Hours', value: 'Monday – Sunday, 9:00 AM – 8:30 PM IST' }
    ],
    sections: [
      {
        heading: 'Visit or Contact Our Hadapsar Office',
        body: [
          'Our administrative office is located at Office 205, Saptrang Akash, Hadapsar, Pune - 412308 (near Tukai Darshan / Phursungi corridor).',
          'Parents and students can call or WhatsApp our academic coordinator directly on +91 8459832971 or submit the online enquiry form below to schedule a 1-on-1 trial demonstration class.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the fastest way to check tutor availability for my society?',
        answer:
          'Call or WhatsApp our parent helpline at +91 8459832971 with your locality name, student class/board, and required subjects, or submit the validated enquiry form on this page.'
      }
    ]
  });

  pages.push({
    url: '/find-tutor/',
    pageType: 'core',
    title: 'Find a Home or Online Tutor in Hadapsar & East Pune | Skill+ Tutors',
    metaDescription:
      'Request a background-verified 1-on-1 home or online tutor in Hadapsar and East Pune for NEET, JEE, and Class 8–12 Boards (CBSE, ICSE, SSC, HSC).',
    h1: 'Request a Verified Home or Online Tutor in East Pune',
    primaryUserIntent: 'Submit student requirements to book a 1-on-1 tutor consultation and demo session',
    keywordCluster: ['find tutor hadapsar', 'book home tutor pune', 'home tutor enquiry form hadapsar'],
    supportingEvidence: 'Preserved live /find-tutor/ route (fixing legacy typo "Enquiry From") with server-side validated storage.',
    uniqueContentAngle: 'Dedicated parent enquiry intake with transparent 3-step matching workflow and privacy consent.',
    relatedUrls: ['/', '/pune/', '/student-registration/', '/contact-us/'],
    reviewer: 'Lead Engineer',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Find Tutor', url: '/find-tutor/' }
    ],
    heroBadge: 'Parent Enquiry Intake',
    heroSubtitle:
      'Share your locality, class/board, and subject preferences. Our Hadapsar coordination team responds with verified faculty options.',
    quickSummaryFacts: [
      { label: 'Matching SLA', value: '24–48 Hours for Core East Pune Localities' },
      { label: 'Trial Assessment', value: '1-on-1 Demonstration Session Before Monthly Commitment' },
      { label: 'Data Privacy', value: 'Server-Side Validated Storage; Minimal Student Data Collected' },
      { label: 'Direct Helpline', value: '+91 8459832971' }
    ],
    sections: [
      {
        heading: 'What Happens After You Submit an Enquiry?',
        body: [
          '1. Requirement Review: Our academic coordinator at Saptrang Akash (Hadapsar) checks your residential society location, board syllabus (CBSE, ICSE, SSC, HSC, IB, IGCSE), and preferred time slot.',
          '2. Faculty Shortlisting: We match an identity-verified tutor with proven subject experience who commutes along your locality corridor.',
          '3. Demo Session: We schedule an introductory session at your home or live online so you and your child can evaluate teaching clarity.'
        ]
      }
    ],
    faqs: []
  });

  pages.push({
    url: '/student-registration/',
    pageType: 'core',
    title: 'Student Registration for Home & Online Tuition | Skill+ Tutors Pune',
    metaDescription:
      'Complete student registration for personalized 1-on-1 home or online tuition in Hadapsar and East Pune across Class 8–12 Boards, JEE, and NEET.',
    h1: 'Student Academic Registration – Skill+ Tutors Pune',
    primaryUserIntent: 'Register a student for ongoing 1-on-1 home or online tutoring',
    keywordCluster: ['student registration skill plus tutors', 'register for home tuition pune'],
    supportingEvidence: 'Preserved live /student-registration/ route with server-side validation and consent.',
    uniqueContentAngle: 'Structured student onboarding capturing academic board, target examination, and locality preferences.',
    relatedUrls: ['/find-tutor/', '/pune/', '/contact-us/'],
    reviewer: 'Lead Engineer',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Student Registration', url: '/student-registration/' }
    ],
    heroBadge: 'Student Onboarding',
    heroSubtitle: 'Register your academic profile for 1-on-1 home or live online mentorship from our Hadapsar hub.',
    quickSummaryFacts: [
      { label: 'Classes Covered', value: 'Class 8–10, Class 11–12 Science & JEE/NEET Droppers' },
      { label: 'Subjects', value: 'Physics, Chemistry, Mathematics, Biology & Class 8–10 Science' }
    ],
    sections: [
      {
        heading: 'Privacy-Conscious Student Onboarding',
        body: [
          'We collect only the academic and locality details required to match your child with an appropriate subject specialist. Minor students should have a parent or legal guardian submit this registration.'
        ]
      }
    ],
    faqs: []
  });

  pages.push({
    url: '/join-us/',
    pageType: 'core',
    title: 'Join Skill+ Tutors as Verified Faculty in East Pune | Educator Careers',
    metaDescription:
      'Apply to join Skill+ Tutors as a verified home or online educator in Hadapsar and East Pune for Physics, Chemistry, Mathematics, Biology, and Science.',
    h1: 'Join Skill+ Tutors: Educator Empanelment in Hadapsar & East Pune',
    primaryUserIntent: 'Apply as a qualified teacher for home and online tutoring assignments in East Pune',
    keywordCluster: ['tutor jobs hadapsar pune', 'join skill plus tutors', 'home tutor vacancy east pune'],
    supportingEvidence: 'Preserved live /join-us/ route.',
    uniqueContentAngle: 'Transparent faculty qualification, identity verification, and East Pune corridor assignment criteria.',
    relatedUrls: ['/teacher-registration/', '/about-us/', '/contact-us/'],
    reviewer: 'Academic Coordinator',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Join Us (Educators)', url: '/join-us/' }
    ],
    heroBadge: 'For Qualified Educators',
    heroSubtitle: 'Partner with our Hadapsar office to teach motivated Class 8–12, JEE, and NEET students across East Pune.',
    quickSummaryFacts: [
      { label: 'Subjects Recruited', value: 'Physics, Chemistry, Mathematics, Biology, Class 8–10 Science' },
      { label: 'Mandatory Checks', value: 'Degree Verification, Subject Demo & Government ID/Address Check' }
    ],
    sections: [
      {
        heading: 'Faculty Empanelment Standards',
        body: [
          'Skill+ Tutors works with post-graduate educators, B.Tech/M.Tech/M.Sc/MBBS/B.Ed specialists, and experienced school/coaching faculty who can commit to consistent academic schedules across Hadapsar, Magarpatta, Amanora, Wanowrie, NIBM, Undri, and Phursungi.'
        ]
      }
    ],
    faqs: []
  });

  pages.push({
    url: '/teacher-registration/',
    pageType: 'core',
    title: 'Teacher Registration & Verification Form | Skill+ Tutors Pune',
    metaDescription:
      'Submit your educator profile, academic qualifications, and covered East Pune localities for verification with Skill+ Tutors (Hadapsar, Pune).',
    h1: 'Teacher Registration & Faculty Verification Intake',
    primaryUserIntent: 'Submit teacher application form for verification and assignment matching',
    keywordCluster: ['teacher registration skill plus tutors', 'apply as home tutor hadapsar'],
    supportingEvidence: 'Preserved live /teacher-registration/ route with server-side persistence.',
    uniqueContentAngle: 'Direct faculty registration capturing qualification, teaching experience, and East Pune travel radius.',
    relatedUrls: ['/join-us/', '/about-us/', '/contact-us/'],
    reviewer: 'Academic Coordinator',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Teacher Registration', url: '/teacher-registration/' }
    ],
    heroBadge: 'Faculty Empanelment Form',
    heroSubtitle: 'Complete your educator application for review by our Hadapsar academic administration.',
    quickSummaryFacts: [
      { label: 'Verification Office', value: 'Office 205, Saptrang Akash, Hadapsar, Pune - 412308' },
      { label: 'Status', value: 'In-Person Document Review Required Prior to Home Assignment' }
    ],
    sections: [
      {
        heading: 'Verification Notice for Applicant Teachers',
        body: [
          'Submitting this online profile initiates stage one of our faculty review. Shortlisted teachers are invited for a subject evaluation and original ID/address document verification prior to any student assignment.'
        ]
      }
    ],
    faqs: []
  });

  pages.push({
    url: '/terms-and-conditions/',
    pageType: 'core',
    title: 'Terms, Privacy & Academic Verification Policy | Skill+ Tutors Pune',
    metaDescription:
      'Read the terms of service, parent advisory, privacy notice, and honest educational disclaimers for Skill+ Tutors (Hadapsar, Pune).',
    h1: 'Terms of Service, Privacy & Parent Advisory',
    primaryUserIntent: 'Review legal terms, privacy safeguards, and educational service disclaimers',
    keywordCluster: ['skill plus tutors terms and conditions', 'privacy policy skill+ tutors pune'],
    supportingEvidence: 'Preserved live /terms-and-conditions/ route updated with privacy and consumer transparency clauses.',
    uniqueContentAngle: 'Clear disclosure of facilitation scope, no-guaranteed-rank ethics, and minor student data protection.',
    relatedUrls: ['/', '/about-us/', '/contact-us/'],
    reviewer: 'Legal & Editorial Reviewer',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Terms & Privacy', url: '/terms-and-conditions/' }
    ],
    heroBadge: 'Legal & Editorial Governance',
    heroSubtitle: 'Transparent policies governing home demonstration sessions, privacy, and academic facilitation.',
    quickSummaryFacts: [
      { label: 'Data Protection', value: 'Zero Minor PII Published; Strict Consent-Based Enquiry Storage' },
      { label: 'Academic Ethics', value: 'No Misleading Grade or Rank Guarantees' }
    ],
    sections: [
      {
        heading: '1. Scope of Tutoring Facilitation & Safety',
        body: [
          'Skill+ Tutors coordinates 1-on-1 home and online tutoring from Office 205, Saptrang Akash, Hadapsar, Pune - 412308. All tutors undergo identity and academic credential review prior to home demonstration classes. Parents/guardians must be present on the premises during home tuition sessions for minor students.'
        ]
      },
      {
        heading: '2. Honest Academic Disclaimers (No Guaranteed Marks or Ranks)',
        body: [
          'Academic improvement depends on consistent student effort, regular attendance, and completion of assigned practice work. Skill+ Tutors does not make unsupported "100% guaranteed selection" or "guaranteed score" claims.'
        ]
      }
    ],
    faqs: []
  });

  pages.push({
    url: '/resources/',
    pageType: 'core',
    title: 'Parent & Student Academic Guides for East Pune | Skill+ Tutors',
    metaDescription:
      'Practical, evidence-based guides for parents and students in Pune covering tutor selection, NEET/JEE study planning, and CBSE/ICSE/SSC/HSC board exams.',
    h1: 'Parent Advisory & Academic Preparation Guides',
    primaryUserIntent: 'Read transparent educational guides on choosing tutors and planning board/competitive exam study',
    keywordCluster: ['parent tutoring guide pune', 'how to choose home tutor pune', 'neet jee board preparation guides'],
    supportingEvidence: 'Original editorial hub housing 12 researched parent and student guides.',
    uniqueContentAngle: 'Commercial-interest disclosed, practical checklists without fabricated "Top 10" rankings.',
    relatedUrls: [
      '/resources/how-to-choose-a-chemistry-tutor/',
      '/resources/home-vs-online-tuition-east-pune/',
      '/resources/neet-biology-ncert-study-framework/',
      '/resources/jee-main-physics-problem-solving-guide/',
      '/resources/class-10-board-exam-preparation-checklist/',
      '/resources/hsc-vs-cbse-class-11-12-science-transition/'
    ],
    reviewer: 'Lead Curriculum Editor',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Parent & Student Guides', url: '/resources/' }
    ],
    heroBadge: 'Editorial Resource Library',
    heroSubtitle: 'Honest, practical guidance for families navigating Class 8–12 boards, JEE, and NEET preparation in Pune.',
    quickSummaryFacts: [
      { label: 'Editorial Standard', value: 'Educator-Reviewed with Commercial Interest Disclosure' },
      { label: 'Focus Areas', value: 'Tutor Selection, Syllabus Transitions & Exam Study Frameworks' }
    ],
    sections: [
      {
        heading: 'Our Editorial Commitment to Parents',
        body: [
          'Every guide published by Skill+ Tutors is written to answer real questions asked by parents during counselling sessions at our Hadapsar office. We disclose our commercial interest as a tutoring provider and never publish disguised "Top 10 Institutes" listicles.'
        ]
      }
    ],
    faqs: []
  });

  // ============================================================================
  // 2. PRESERVED PROGRAMME HUBS + SUBJECT & BOARD HUBS (18 HUBS)
  // ============================================================================
  pages.push({
    url: '/jee/',
    pageType: 'programme_hub',
    title: 'IIT-JEE Home & Online Tutors in Hadapsar, Pune (Main & Advanced) | Skill+ Tutors',
    metaDescription:
      '1-on-1 IIT-JEE (Main & Advanced) home and online tuition in Hadapsar & East Pune for Class 11–12 and Foundation Physics, Chemistry, and Mathematics.',
    h1: 'IIT-JEE (Main & Advanced) 1-on-1 Home & Online Tutoring in Pune',
    primaryUserIntent: 'Find 1-on-1 JEE Physics, Chemistry, and Mathematics tutors in Hadapsar and East Pune',
    keywordCluster: ['jee tutors in hadapsar', 'iit jee home tuition pune', 'jee main advanced personal tutor east pune'],
    subjectOrExam: 'JEE',
    boardOrClassRange: 'Class 9–10 Foundation, Class 11–12 PCM & JEE Repeaters',
    supportingEvidence:
      'Preserved live /jee/ route (remediated from legacy copy-pasted NEET text); verified alumni outcomes including NIT Jaipur (Sudarshan Bondge) and COEP Pune (Kabir Bhongale).',
    uniqueContentAngle:
      'Corrected, JEE-specific PCM curriculum architecture covering Mechanics, Electrodynamics, Calculus, Coordinate Geometry, and Physical/Organic Chemistry.',
    relatedUrls: [
      '/subjects/physics/',
      '/subjects/chemistry/',
      '/subjects/mathematics/',
      '/pune/hadapsar/jee-tutors/',
      '/pune/magarpatta-city/jee-tutors/',
      '/pune/amanora-park-town/jee-tutors/'
    ],
    reviewer: 'JEE PCM Academic Lead',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'JEE Tutoring', url: '/jee/' }
    ],
    heroBadge: 'JEE Main & Advanced • 1-on-1 PCM',
    heroSubtitle:
      'Individualized Physics, Chemistry, and Mathematics problem-solving mentorship for Class 11–12 and Foundation aspirants in East Pune.',
    quickSummaryFacts: [
      { label: 'Subjects Covered', value: 'Physics, Chemistry & Mathematics (JEE Main + Advanced)' },
      { label: 'Eligible Classes', value: 'Class 9–10 Foundation, Class 11, Class 12 & Repeaters' },
      { label: 'Verified Alumni', value: 'Admissions to NIT Jaipur, COEP Pune & Top Engineering Institutes' },
      { label: 'Learning Modes', value: 'Doorstep Home Visits (~10 km Hadapsar) & Live Online' }
    ],
    sections: [
      {
        heading: 'Why 1-on-1 Mentorship Complements or Replaces Crowded JEE Batches',
        body: [
          'In large coaching classrooms, a single unresolved doubt in Rotational Mechanics, Ionic Equilibrium, or Definite Integration can derail weeks of subsequent chapters. Our 1-on-1 JEE programme places a dedicated subject specialist at your study table to diagnose calculation bottlenecks in real time.',
          'Whether your child needs full PCM home tuition aligned with CBSE/HSC boards or targeted single-subject reinforcement alongside an existing test series, our Hadapsar academic team builds a customized weekly problem-solving schedule.'
        ],
        bullets: [
          'Physics: Vector & calculus foundations, free-body diagram mastery, Electrodynamics, Optics, and multi-concept NTA PYQ drills.',
          'Mathematics: Intensive practice in Differential & Integral Calculus, Conic Sections, 3D Vector Geometry, Matrices, and Probability.',
          'Chemistry: Physical Chemistry numerical speed, Organic reaction mechanism logic, and strict NCERT Inorganic line-by-line coverage.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can we book a tutor for only one JEE subject, such as Physics or Mathematics?',
        answer:
          'Yes. Parents frequently request single-subject 1-on-1 JEE specialists (for example, JEE Physics or JEE Calculus/Algebra) to strengthen a specific weak area without disrupting the rest of the student’s schedule.'
      },
      {
        question: 'How do you balance Class 12 HSC/CBSE board exam requirements with JEE Mains?',
        answer:
          'Our tutors map common chapters so students learn rigorous conceptual derivations for board step-marking alongside objective single-choice and integer-type question techniques required for JEE Main.'
      }
    ]
  });

  pages.push({
    url: '/neet/',
    pageType: 'programme_hub',
    title: 'NEET UG Home & Online Tutors in Hadapsar, Pune (PCB) | Skill+ Tutors',
    metaDescription:
      'Personalized 1-on-1 NEET UG home and online tutoring in Hadapsar & East Pune covering NCERT Biology, Chemistry, and Physics for Class 11–12 and Droppers.',
    h1: 'NEET UG 1-on-1 Home & Online Tutoring in Hadapsar & East Pune',
    primaryUserIntent: 'Find 1-on-1 NEET Biology, Chemistry, and Physics tutors in Hadapsar and East Pune',
    keywordCluster: ['neet tutors in hadapsar', 'neet home tuition pune', 'neet biology physics chemistry tutor east pune'],
    subjectOrExam: 'NEET',
    boardOrClassRange: 'Class 9–10 Foundation, Class 11–12 PCB & NEET Repeaters',
    supportingEvidence:
      'Preserved live /neet/ route; verified student outcomes including GMC Latur (Ojas Barure) and Bharati Vidyapeeth Medical College (Anuradha Dighe).',
    uniqueContentAngle:
      '360-mark NCERT Biology interrogation paired with Physics numerical confidence-building for medical aspirants.',
    relatedUrls: [
      '/subjects/biology/',
      '/subjects/chemistry/',
      '/subjects/physics/',
      '/pune/hadapsar/neet-tutors/',
      '/pune/undri/neet-tutors/',
      '/pune/wanowrie/neet-tutors/'
    ],
    reviewer: 'NEET PCB Academic Lead',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'NEET Tutoring', url: '/neet/' }
    ],
    heroBadge: 'NEET UG Medical Entrance • 1-on-1 PCB',
    heroSubtitle:
      'NCERT-centric Biology, Chemistry, and Physics 1-on-1 coaching from our Hadapsar hub for Class 11–12 and repeater candidates.',
    quickSummaryFacts: [
      { label: 'Subjects Covered', value: 'Biology (Botany & Zoology), Chemistry & Physics' },
      { label: 'Target Audience', value: 'Class 11–12 PCB Students, NEET Repeaters & Class 9–10 Foundation' },
      { label: 'Verified Alumni', value: 'Selections in GMC Latur, Bharati Vidyapeeth Medical College & More' },
      { label: 'Assessment Format', value: 'NCERT Statement/Assertion-Reason Drills & Timed OMR Practice' }
    ],
    sections: [
      {
        heading: 'Overcoming the Physics & Organic Chemistry Bottleneck in NEET UG',
        body: [
          'For most medical aspirants in Class 11 and 12, Biology is a strength while Physics numericals and Physical/Organic Chemistry determine the final rank gap. In a 1-on-1 setting, our tutors spend extra time building basic mathematical tools (logarithms, trigonometry, graph slopes, and vector resolution) so NEET Physics becomes approachable.',
          'Simultaneously, Biology and Inorganic Chemistry sessions focus on strict NCERT line-by-line retention, diagram accuracy, and statement-based MCQ practice.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you provide 1-on-1 home tutors for NEET repeater / dropper students in Hadapsar?',
        answer:
          'Yes. Because repeater students are often free during daytime hours (9 AM – 3 PM), we have high faculty availability in East Pune for dedicated daytime 1-on-1 NEET home visits and test evaluations.'
      }
    ]
  });

  pages.push({
    url: '/10th-board/',
    pageType: 'programme_hub',
    title: 'Class 10 Board Home & Online Tutors in Hadapsar, Pune (CBSE, ICSE, SSC) | Skill+ Tutors',
    metaDescription:
      '1-on-1 Class 10 Board home and online tuition in Hadapsar & East Pune for Mathematics (Algebra, Geometry) and Science across CBSE, ICSE, and Maharashtra SSC.',
    h1: 'Class 10 Board (CBSE, ICSE & SSC) Home & Online Tutors in Pune',
    primaryUserIntent: 'Find 1-on-1 Class 10 Mathematics and Science home or online tutors in East Pune',
    keywordCluster: ['10th board tuition hadapsar', 'class 10 maths science tutor pune', 'ssc cbse icse 10th home tutor'],
    subjectOrExam: '10th Board',
    boardOrClassRange: 'Class 9 & Class 10 (CBSE, ICSE, Maharashtra SSC)',
    supportingEvidence:
      'Preserved live /10th-board/ route detailing Class 10 Science and Mathematics (Algebra, Coordinate Geometry, Statistics, Trigonometry) for SSC, CBSE, and ICSE.',
    uniqueContentAngle:
      'Board-specific answer presentation, step-marking discipline, and full prelim paper grading for Class 10 students.',
    relatedUrls: [
      '/subjects/mathematics/',
      '/subjects/science/',
      '/boards/cbse/',
      '/boards/icse/',
      '/boards/ssc/',
      '/pune/hadapsar/'
    ],
    reviewer: 'Secondary Board Curriculum Lead',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: '10th Board Tutoring', url: '/10th-board/' }
    ],
    heroBadge: 'Class 10 Board Foundation • CBSE / ICSE / SSC',
    heroSubtitle:
      'Focused 1-on-1 coaching in Mathematics and Science to build exam confidence and rigorous answer-writing habits.',
    quickSummaryFacts: [
      { label: 'Core Subjects', value: 'Mathematics (Algebra & Geometry) & Science (Physics, Chemistry, Biology)' },
      { label: 'Supported Boards', value: 'CBSE, ICSE & Maharashtra State Board (SSC)' },
      { label: 'Prelim Testing', value: 'Full-Length Board Sample Paper Grading & Error Correction' }
    ],
    sections: [
      {
        heading: 'Mastering Class 10 Mathematics & Science Through Individual Attention',
        body: [
          'Class 10 is a student’s first external board examination and sets the foundation for Class 11 stream selection. Our tutors work 1-on-1 on core Mathematics topics—Algebra, Quadratic Equations, Coordinate Geometry, Trigonometry, Mensuration, and Statistics—ensuring every intermediate step is written clearly to secure full board step-marks.',
          'In Science, we cover Physics numericals (Light, Electricity), Chemistry equation balancing and Carbon compounds, and Biology life-process diagrams tailored specifically to your child’s board (CBSE 80-mark single paper, SSC 40+40 Science 1 & 2, or ICSE segregated papers).'
        ]
      }
    ],
    faqs: []
  });

  pages.push({
    url: '/12th-board/',
    pageType: 'programme_hub',
    title: 'Class 12 Science Board Tutors in Hadapsar, Pune (HSC, CBSE, ISC) | Skill+ Tutors',
    metaDescription:
      '1-on-1 Class 11–12 Science home and online tutors in Hadapsar & East Pune for Physics, Chemistry, Mathematics, and Biology across CBSE, HSC, and ISC boards.',
    h1: 'Class 12 Science Board (HSC, CBSE & ISC) Home & Online Tutors in Pune',
    primaryUserIntent: 'Find Class 11–12 Physics, Chemistry, Mathematics, and Biology board tutors in East Pune',
    keywordCluster: ['12th board science tutors hadapsar', 'hsc cbse class 12 home tuition pune', '12th pcm pcb tutor pune'],
    subjectOrExam: '12th Board',
    boardOrClassRange: 'Class 11 & Class 12 Science (CBSE, Maharashtra HSC, ISC)',
    supportingEvidence:
      'Preserved live /12th-board/ route covering Physics, Chemistry, Mathematics, and Biology for CBSE and HSC Class 12.',
    uniqueContentAngle:
      'Dual-track preparation ensuring students don’t sacrifice Class 12 Board theory/derivation marks while preparing for JEE, NEET, or MHT-CET.',
    relatedUrls: [
      '/subjects/physics/',
      '/subjects/chemistry/',
      '/subjects/mathematics/',
      '/subjects/biology/',
      '/boards/hsc/',
      '/boards/cbse/'
    ],
    reviewer: 'Senior Secondary Science Lead',
    status: 'published',
    lastModified: lastMod,
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: '12th Board Tutoring', url: '/12th-board/' }
    ],
    heroBadge: 'Class 11–12 Science • HSC / CBSE / ISC',
    heroSubtitle:
      'Subject-specialist 1-on-1 tuition across Physics, Chemistry, Mathematics, and Biology with complete derivation and numerical training.',
    quickSummaryFacts: [
      { label: 'Subjects', value: 'Physics, Chemistry, Mathematics & Biology (PCM / PCB / PCMB)' },
      { label: 'Boards Supported', value: 'Maharashtra HSC, CBSE, ISC, IB & Cambridge A-Level' }
    ],
    sections: [
      {
        heading: 'Subject-Wise Class 12 Science Preparation Strategy',
        body: [
          'Physics: Comprehensive coverage of Rotational Dynamics, Electromagnetism, Optics, and Modern Physics with step-by-step derivation notebooks and log-book/numerical drills.',
          'Chemistry: Dedicated focus on Organic conversions and reaction mechanisms, Physical Chemistry numericals, and Inorganic textbook exercises.',
          'Mathematics & Biology: Full theorem proofs and Calculus/Vector drills for Mathematics; structured physiology diagrams and NCERT/HSC textbook mastery for Biology.'
        ]
      }
    ],
    faqs: []
  });

  // 5 Subject Hubs (/subjects/chemistry/, /subjects/physics/, /subjects/mathematics/, /subjects/biology/, /subjects/science/)
  for (const [subjectKey, spec] of Object.entries(SUBJECT_SPECS)) {
    pages.push({
      url: `/subjects/${spec.slug}/`,
      pageType: 'subject_hub',
      title: `${spec.name} Tutors in Hadapsar & East Pune (Home & Online) | Skill+ Tutors`,
      metaDescription: `Verified 1-on-1 ${spec.name} home and online tutors in Hadapsar & East Pune (${spec.supportedClasses}). Book a demo session from our Hadapsar office.`,
      h1: `1-on-1 ${spec.name} Home & Online Tutors in Hadapsar & East Pune`,
      primaryUserIntent: `Find qualified ${spec.name} home or online tutors in East Pune and understand the teaching methodology`,
      keywordCluster: [
        `${spec.slug} tutors in hadapsar`,
        `${spec.slug} home tuition east pune`,
        `${spec.slug} teacher pune`
      ],
      subjectOrExam: spec.name,
      boardOrClassRange: spec.supportedClasses,
      supportingEvidence: `Confirmed ${spec.name} offering on Skill+ Tutors curriculum across ${spec.supportedBoards.join(', ')}.`,
      uniqueContentAngle: `Deep-dive into ${spec.name} syllabus coverage, teaching approach, and locality availability across East Pune.`,
      relatedUrls: [
        `/pune/hadapsar/${spec.urlSlug}/`,
        `/pune/magarpatta-city/${spec.urlSlug}/`,
        `/pune/amanora-park-town/${spec.urlSlug}/`,
        `/pune/wanowrie/${spec.urlSlug}/`,
        `/pune/undri/${spec.urlSlug}/`,
        '/find-tutor/'
      ],
      reviewer: `${spec.name} Curriculum Specialist`,
      status: 'published',
      lastModified: lastMod,
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: `${spec.name} Tutors`, url: `/subjects/${spec.slug}/` }
      ],
      heroBadge: `Subject Hub • ${spec.name}`,
      heroSubtitle: `${spec.supportedClasses} — Coordinated from Office 205, Saptrang Akash, Hadapsar, Pune.`,
      quickSummaryFacts: [
        { label: 'Subject', value: spec.name },
        { label: 'Supported Classes', value: spec.supportedClasses },
        { label: 'Supported Boards/Exams', value: spec.supportedBoards.join(', ') },
        { label: 'Delivery Mode', value: '1-on-1 Home Visits (~10 km East Pune) & Live Online' }
      ],
      sections: [
        {
          heading: `Our ${spec.name} Teaching Methodology`,
          body: [spec.teachingApproach, spec.tutorSuitability],
          bullets: spec.coreTopics
        },
        {
          heading: 'Questions Parents Should Ask During the Demo Session',
          body: [
            'During your introductory demonstration session, we encourage parents and students to evaluate the tutor using these subject-specific criteria:'
          ],
          bullets: spec.parentEvaluationQuestions
        }
      ],
      faqs: spec.parentEvaluationQuestions.map((q) => ({
        question: q,
        answer: spec.teachingApproach
      }))
    });
  }

  // 6 Board Hubs (/boards/cbse/, /boards/icse/, /boards/ssc/, /boards/hsc/, /boards/ib/, /boards/igcse/)
  for (const boardKey of ['CBSE', 'ICSE', 'SSC', 'HSC', 'IB', 'IGCSE'] as const) {
    const bSpec = EXAM_AND_BOARD_SPECS[boardKey];
    pages.push({
      url: `/boards/${bSpec.slug}/`,
      pageType: 'board_hub',
      title: `${bSpec.name} Home & Online Tutors in Hadapsar, Pune | Skill+ Tutors`,
      metaDescription: `Verified 1-on-1 ${bSpec.name} home and online tutors in Hadapsar & East Pune covering ${bSpec.subjectsOffered.join(', ')}.`,
      h1: `${bSpec.name} 1-on-1 Home & Online Tutors in East Pune`,
      primaryUserIntent: `Find board-aligned ${bSpec.shortName} home and online tutors in Hadapsar and East Pune`,
      keywordCluster: [
        `${bSpec.slug} home tutors hadapsar`,
        `${bSpec.slug} tuition east pune`,
        `${bSpec.shortName.toLowerCase()} tutors pune`
      ],
      subjectOrExam: bSpec.shortName,
      boardOrClassRange: bSpec.supportedClasses,
      supportingEvidence: `Verified ${bSpec.shortName} board offering on Skill+ Tutors live curriculum.`,
      uniqueContentAngle: `Board-specific marking scheme alignment, textbook coverage, and East Pune locality matching for ${bSpec.name}.`,
      relatedUrls: ['/pune/', '/10th-board/', '/12th-board/', '/find-tutor/'],
      reviewer: 'Board Curriculum Coordinator',
      status: 'published',
      lastModified: lastMod,
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: `${bSpec.shortName} Board`, url: `/boards/${bSpec.slug}/` }
      ],
      heroBadge: `Curriculum Hub • ${bSpec.shortName}`,
      heroSubtitle: bSpec.overview,
      quickSummaryFacts: [
        { label: 'Curriculum', value: bSpec.name },
        { label: 'Classes Covered', value: bSpec.supportedClasses },
        { label: 'Verified Subjects', value: bSpec.subjectsOffered.join(', ') }
      ],
      sections: [
        {
          heading: `How We Align Tutoring to ${bSpec.name} Standards`,
          body: [bSpec.overview, bSpec.methodology]
        }
      ],
      faqs: []
    });
  }

  // ============================================================================
  // 3. LOCALITY HUBS (34 APPROVED PUBLIC + 11 UNVERIFIED PRIVATE DRAFTS = 45)
  // ============================================================================
  for (const area of SERVICE_AREAS) {
    const isApproved = area.publicationEligibility === 'approved_public';
    const isBorderline = area.boundaryStatus === 'borderline_10km';

    const subjectLinks = area.supportedSubjects
      .filter((subj) => TIER_1_PUBLISHED_SUBJECT_LOCALITIES.has(area.slug))
      .map((subj) => `/pune/${area.slug}/${SUBJECT_SPECS[subj].urlSlug}/`);

    pages.push({
      url: `/pune/${area.slug}/`,
      pageType: 'locality_hub',
      title: `Home & Online Tutors in ${area.canonicalName}, Pune (NEET, JEE & Boards) | Skill+ Tutors`,
      metaDescription: isBorderline
        ? `1-on-1 tutoring for ${area.canonicalName}, Pune (${area.straightLineDistanceKm} km radius / ${area.practicalRoadDistanceKm} km road from Hadapsar HQ). Check pocket-wise home visit and online availability.`
        : `Verified 1-on-1 home and online tutors in ${area.canonicalName}, Pune (${area.practicalRoadDistanceKm} km road from our Hadapsar office) for NEET, JEE, CBSE, ICSE, SSC & HSC.`,
      h1: `Home & Online Tutors in ${area.canonicalName}, Pune`,
      primaryUserIntent: `Find verified 1-on-1 home or online tutors serving ${area.canonicalName}, Pune and check road transit availability from Hadapsar`,
      keywordCluster: [
        `home tutors in ${area.canonicalName.toLowerCase()} pune`,
        `tuition in ${area.canonicalName.toLowerCase()}`,
        `private tutor ${area.canonicalName.toLowerCase()} pune`,
        ...area.aliases.map((al) => `home tutors in ${al.toLowerCase()}`)
      ],
      localitySlug: area.slug,
      localityName: area.canonicalName,
      boardOrClassRange: area.supportedExamsAndBoards.join(', '),
      supportingEvidence: `Haversine distance: ${area.straightLineDistanceKm} km; Road distance: ${area.practicalRoadDistanceKm} km (${area.estimatedTransitMinutes}) from Saptrang Akash HQ. Checked ${area.checkedDate}.`,
      uniqueContentAngle: `Locality-specific road commute assessment (${area.practicalRoadDistanceKm} km), society/school context, and verified subject availability for ${area.canonicalName}.`,
      relatedUrls: ['/pune/', '/', '/find-tutor/', ...subjectLinks.slice(0, 5)],
      reviewer: 'East Pune Operations & SEO Lead',
      status: isApproved ? 'published' : 'needs_evidence',
      lastModified: lastMod,
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'East Pune Directory', url: '/pune/' },
        { label: area.canonicalName, url: `/pune/${area.slug}/` }
      ],
      heroBadge: isBorderline
        ? `Borderline ~10 km Sector • ${area.cluster}`
        : `Verified Service Area • ${area.cluster}`,
      heroSubtitle: `${area.localSchoolsAndSocietiesContext} Coordinated directly from Office 205, Saptrang Akash, Hadapsar (${area.practicalRoadDistanceKm} km road distance).`,
      quickSummaryFacts: [
        { label: 'Straight-Line Distance', value: `${area.straightLineDistanceKm} km from Saptrang Akash HQ` },
        { label: 'Practical Road Commute', value: `${area.practicalRoadDistanceKm} km (${area.estimatedTransitMinutes})` },
        { label: 'Available Subjects', value: area.supportedSubjects.join(', ') },
        { label: 'Supported Boards/Exams', value: area.supportedExamsAndBoards.join(', ') }
      ],
      sections: [
        {
          heading: `Tutor Travel & Service Coverage in ${area.canonicalName}`,
          body: [
            area.routeNotes,
            area.localSchoolsAndSocietiesContext,
            'Important Service-Area Disclosure: Skill+ Tutors operates from a single administrative office at Office 205, Saptrang Akash, Hadapsar, Pune - 412308. We do not claim a separate physical branch office in ' +
              area.canonicalName +
              '; instead, our verified faculty travel to your residence for 1-on-1 home sessions or teach via interactive live online classes.'
          ],
          bullets: area.supportedSubjects.map(
            (subj) =>
              `${SUBJECT_SPECS[subj].name}: ${SUBJECT_SPECS[subj].supportedClasses}`
          )
        }
      ],
      faqs: [
        {
          question: `How far is ${area.canonicalName} from the Skill+ Tutors Hadapsar office?`,
          answer: `${area.canonicalName} is approximately ${area.straightLineDistanceKm} km in a straight line and ${area.practicalRoadDistanceKm} km by road (${area.estimatedTransitMinutes}) from our office at Saptrang Akash, Hadapsar, Pune - 412308.`
        },
        {
          question: `Which subjects and boards are supported for home tuition in ${area.canonicalName}?`,
          answer: `We provide 1-on-1 tutoring in ${area.supportedSubjects.join(', ')} for students in ${area.supportedExamsAndBoards.join(', ')}, subject to tutor slot confirmation along the ${area.canonicalName} corridor.`
        }
      ],
      editorialBlockerNote: isApproved
        ? undefined
        : `PUBLICATION GATE BLOCKED: ${area.routeNotes}`
    });
  }

  // ============================================================================
  // 4. SELECTED SUBJECT-LOCALITY PAGES (170 PLANNED, GATED BY LOCALITY TIER)
  // ============================================================================
  for (const area of APPROVED_PUBLIC_SERVICE_AREAS) {
    const isTier1 = TIER_1_PUBLISHED_SUBJECT_LOCALITIES.has(area.slug);
    for (const subjKey of area.supportedSubjects) {
      const spec = SUBJECT_SPECS[subjKey];
      const pageUrl = `/pune/${area.slug}/${spec.urlSlug}/`;
      const isPublished = isTier1;
      const isBorderline = area.boundaryStatus === 'borderline_10km';

      pages.push({
        url: pageUrl,
        pageType: 'subject_locality',
        title: `${spec.name} Tutors in ${area.canonicalName}, Pune (Home & Online) | Skill+ Tutors`,
        metaDescription: `Verified 1-on-1 ${spec.name} home and online tutors in ${area.canonicalName}, Pune (${area.practicalRoadDistanceKm} km from Hadapsar HQ) for ${ area.supportedExamsAndBoards.join(', ') }.`,
        h1: `${spec.name} Home & Online Tutors in ${area.canonicalName}, Pune`,
        primaryUserIntent: `Book a 1-on-1 ${spec.name} tutor for home visits or online tuition in ${area.canonicalName}, Pune`,
        keywordCluster: [
          `${spec.slug} tutor ${area.canonicalName.toLowerCase()}`,
          `${spec.slug} teacher ${area.canonicalName.toLowerCase()} pune`,
          `${spec.slug} home tuition ${area.canonicalName.toLowerCase()}`,
          ...area.aliases.map((al) => `${spec.slug} tutor ${al.toLowerCase()}`)
        ],
        localitySlug: area.slug,
        localityName: area.canonicalName,
        subjectOrExam: spec.name,
        boardOrClassRange: `${spec.supportedClasses} (${area.supportedExamsAndBoards.join(', ')})`,
        supportingEvidence: `Confirmed ${spec.name} faculty coverage for ${area.canonicalName} (${area.practicalRoadDistanceKm} km road distance from Hadapsar HQ).`,
        uniqueContentAngle: `Combines ${spec.name}-specific pedagogy (${spec.coreTopics[0]}) with practical ${area.canonicalName} road-commute scheduling (${area.estimatedTransitMinutes}).`,
        relatedUrls: [
          `/pune/${area.slug}/`,
          `/subjects/${spec.slug}/`,
          '/pune/',
          '/find-tutor/'
        ],
        reviewer: `${spec.name} & Local Operations Reviewer`,
        status: isPublished ? 'published' : 'reviewed',
        lastModified: lastMod,
        breadcrumbs: [
          { label: 'Home', url: '/' },
          { label: 'East Pune', url: '/pune/' },
          { label: area.canonicalName, url: `/pune/${area.slug}/` },
          { label: `${spec.name} Tutors`, url: pageUrl }
        ],
        heroBadge: isBorderline
          ? `${spec.shortName} • Borderline Coverage (${area.canonicalName})`
          : `${spec.shortName} • Verified ${area.canonicalName} Coverage`,
        heroSubtitle: `1-on-1 ${spec.name} mentorship in ${area.canonicalName} (${area.practicalRoadDistanceKm} km road travel from our Hadapsar office) for ${area.supportedExamsAndBoards.join(', ')}.`,
        quickSummaryFacts: [
          { label: 'Subject', value: spec.name },
          { label: 'Service Locality', value: `${area.canonicalName} (${area.cluster})` },
          { label: 'Commute from HQ', value: `${area.practicalRoadDistanceKm} km road (${area.estimatedTransitMinutes})` },
          { label: 'Supported Curricula', value: area.supportedExamsAndBoards.join(', ') }
        ],
        sections: [
          {
            heading: `How Our 1-on-1 ${spec.name} Tutoring Works in ${area.canonicalName}`,
            body: [
              spec.teachingApproach,
              spec.tutorSuitability,
              `For families residing in ${area.canonicalName}, our Hadapsar coordination team at Saptrang Akash (${area.practicalRoadDistanceKm} km by road) matches background-verified ${spec.name} educators who travel along the ${area.canonicalName} corridor (${area.estimatedTransitMinutes}). ${area.routeNotes}`
            ],
            bullets: spec.coreTopics
          },
          {
            heading: `Evaluating Your ${spec.name} Tutor During the ${area.canonicalName} Demo Session`,
            body: [
              `Before confirming monthly tuition in ${area.canonicalName}, we schedule a 1-on-1 demonstration class. Use these questions to assess subject fit:`
            ],
            bullets: spec.parentEvaluationQuestions
          }
        ],
        faqs: [
          {
            question: `Do your ${spec.name} tutors travel to residential societies in ${area.canonicalName}?`,
            answer: `${area.routeNotes} Our administrative hub at Office 205, Saptrang Akash, Hadapsar is ${area.practicalRoadDistanceKm} km by road from ${area.canonicalName}. Both doorstep 1-on-1 visits and live online sessions are supported.`
          },
          {
            question: `Which classes and boards do your ${spec.name} tutors in ${area.canonicalName} cover?`,
            answer: `In ${area.canonicalName}, our ${spec.name} specialists support ${spec.supportedClasses}, aligned with ${area.supportedExamsAndBoards.join(', ')}.`
          }
        ],
        editorialBlockerNote: isPublished
          ? undefined
          : 'Staged for Phase 2 publication batch after Tier-1 locality performance review.'
      });
    }
  }

  // ============================================================================
  // 5. DISTINCT EXAM/BOARD-LOCALITY PAGES (30 PAGES)
  // ============================================================================
  for (const item of TIER_1_PUBLISHED_EXAM_LOCALITIES) {
    const area = SERVICE_AREAS.find((a) => a.slug === item.localitySlug)!;
    const eSpec = EXAM_AND_BOARD_SPECS[item.examKey];
    const pageUrl = `/pune/${area.slug}/${eSpec.urlSlug}/`;

    pages.push({
      url: pageUrl,
      pageType: 'exam_locality',
      title: `${eSpec.shortName} Tutors in ${area.canonicalName}, Pune (1-on-1 Home & Online) | Skill+ Tutors`,
      metaDescription: `1-on-1 ${eSpec.name} home and online tutors in ${area.canonicalName}, Pune (${area.practicalRoadDistanceKm} km from Hadapsar HQ) covering ${eSpec.subjectsOffered.join(', ')}.`,
      h1: `${eSpec.name} Tutors in ${area.canonicalName}, Pune`,
      primaryUserIntent: `Find 1-on-1 ${eSpec.shortName} preparation tutors for home or online tuition in ${area.canonicalName}, Pune`,
      keywordCluster: [
        `${eSpec.slug} tutors in ${area.canonicalName.toLowerCase()}`,
        `${eSpec.slug} home tuition ${area.canonicalName.toLowerCase()} pune`,
        `${eSpec.shortName.toLowerCase()} coaching ${area.canonicalName.toLowerCase()}`
      ],
      localitySlug: area.slug,
      localityName: area.canonicalName,
      subjectOrExam: eSpec.name,
      boardOrClassRange: eSpec.supportedClasses,
      supportingEvidence: `Verified ${eSpec.shortName} programme combined with ${area.canonicalName} road coverage (${area.practicalRoadDistanceKm} km).`,
      uniqueContentAngle: `Targeted ${eSpec.name} preparation plan for students in ${area.canonicalName} balancing school/board schedules with exam drills.`,
      relatedUrls: [
        `/pune/${area.slug}/`,
        eSpec.legacyUrl || `/boards/${eSpec.slug}/`,
        '/find-tutor/'
      ],
      reviewer: 'Competitive & Board Exam Reviewer',
      status: item.status,
      lastModified: lastMod,
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'East Pune', url: '/pune/' },
        { label: area.canonicalName, url: `/pune/${area.slug}/` },
        { label: `${eSpec.shortName} Tutors`, url: pageUrl }
      ],
      heroBadge: `${eSpec.shortName} Track • ${area.canonicalName}`,
      heroSubtitle: `${eSpec.overview} Coordinated for ${area.canonicalName} families (${area.practicalRoadDistanceKm} km road distance from Hadapsar HQ).`,
      quickSummaryFacts: [
        { label: 'Exam / Board Track', value: eSpec.name },
        { label: 'Locality', value: `${area.canonicalName}, Pune` },
        { label: 'Subjects Covered', value: eSpec.subjectsOffered.join(', ') },
        { label: 'Transit from HQ', value: `${area.practicalRoadDistanceKm} km (${area.estimatedTransitMinutes})` }
      ],
      sections: [
        {
          heading: `Structured 1-on-1 ${eSpec.name} Preparation in ${area.canonicalName}`,
          body: [
            eSpec.overview,
            eSpec.methodology,
            `Local Service Details for ${area.canonicalName}: ${area.routeNotes} ${area.localSchoolsAndSocietiesContext}`
          ],
          bullets: eSpec.subjectsOffered.map((s) => `Dedicated 1-on-1 specialist coverage for ${s}`)
        }
      ],
      faqs: [
        {
          question: `Can we book a single-subject ${eSpec.shortName} tutor in ${area.canonicalName}?`,
          answer: `Yes. Families in ${area.canonicalName} can request 1-on-1 mentorship for a single subject or the full ${eSpec.shortName} subject combination (${eSpec.subjectsOffered.join(', ')}).`
        }
      ]
    });
  }

  // ============================================================================
  // 6. 12 ORIGINAL LEARNING / PARENT GUIDES
  // ============================================================================
  const GUIDES_DATA: Array<{
    slug: string;
    title: string;
    h1: string;
    metaDescription: string;
    intent: string;
    keywords: string[];
    status: EditorialStatus;
    summary: string;
    sections: PageContentSection[];
  }> = [
    {
      slug: 'how-to-choose-a-chemistry-tutor',
      title: 'How to Choose a Class 11–12, JEE or NEET Chemistry Tutor in Pune | Parent Guide',
      h1: 'How to Evaluate and Choose a Chemistry Tutor for Class 11–12, JEE & NEET',
      metaDescription:
        'An honest, educator-written checklist for parents in Pune on evaluating Physical, Organic, and Inorganic Chemistry tutors without falling for rank guarantees.',
      intent: 'Learn how to vet a Chemistry tutor during a trial session for Class 11–12 boards, NEET, or JEE',
      keywords: ['how to choose a chemistry tutor', 'evaluate chemistry home tutor pune', 'class 12 chemistry tuition guide'],
      status: 'published',
      summary:
        'Practical criteria for testing a tutor’s ability to teach Organic reaction mechanisms, Physical Chemistry numericals, and NCERT Inorganic retention.',
      sections: [
        {
          heading: 'Why Many Students Struggle in Class 11–12 Chemistry Despite Coaching',
          body: [
            'Chemistry is three distinct sub-disciplines bundled into one exam paper: Physical Chemistry behaves like applied mathematics, Organic Chemistry requires spatial and electronic mechanism logic, and Inorganic Chemistry demands structured factual synthesis from NCERT.',
            'Commercial Disclosure: This guide is published by Skill+ Tutors (Office 205, Saptrang Akash, Hadapsar, Pune), a 1-on-1 home and online tutoring provider. Rather than publishing a self-serving "Top 10 Tutors" ranking, we share the exact evaluation rubric parents should use in any trial session.'
          ],
          bullets: [
            'Check 1 (Organic): Ask the tutor to explain an SN1/SN2 or Aldol mechanism using electron movement rather than asking the student to memorize product names.',
            'Check 2 (Physical): Observe whether the tutor watches the student solve logarithmic and mole-concept numericals by hand without a calculator.',
            'Check 3 (Inorganic): Verify that the tutor teaches directly from the current NCERT/Board textbook line by line.'
          ]
        }
      ]
    },
    {
      slug: 'home-vs-online-tuition-east-pune',
      title: '1-on-1 Home Tuition vs Live Online Tutoring in East Pune: A Practical Comparison',
      h1: '1-on-1 Home Tuition vs Live Online Tutoring: Which Fits Your Child in East Pune?',
      metaDescription:
        'Compare doorstep 1-on-1 home tuition and live online classes across Hadapsar, Magarpatta, Amanora, Undri, and Kharadi based on study habits and road commute.',
      intent: 'Decide between in-person home tuition and 1-on-1 online classes for Class 8–12 or JEE/NEET',
      keywords: ['home tuition vs online tuition pune', '1 on 1 home tutor vs online class', 'east pune tutoring guide'],
      status: 'published',
      summary:
        'How notebook supervision, commute exhaustion, and locality road connectivity affect the choice between doorstep and online 1-on-1 tutoring.',
      sections: [
        {
          heading: 'When In-Person Doorstep Home Tuition Works Best',
          body: [
            'For Class 8–10 board students and learners who get distracted on screens, having an educator sit beside them to inspect geometry constructions, algebraic steps, and handwriting speed provides irreplaceable accountability.',
            'Within our core 10 km Hadapsar radius (Magarpatta City, Amanora Park Town, Sasane Nagar, Wanowrie, Undri, Phursungi), doorstep home visits eliminate student travel fatigue completely.'
          ]
        },
        {
          heading: 'When Live 1-on-1 Online Or Hybrid Sessions Are Superior',
          body: [
            'For students in borderline traffic corridors (such as northern Kharadi, Koregaon Park, or late-evening JEE/NEET doubt slots), interactive 1-on-1 online sessions with shared digital whiteboards offer flexible scheduling without road delays.'
          ]
        }
      ]
    },
    {
      slug: 'neet-biology-ncert-study-framework',
      title: 'NEET UG Biology NCERT Line-by-Line Study Framework for Class 11 & 12',
      h1: 'Mastering NCERT Biology for NEET UG: Line-by-Line Study & Revision Framework',
      metaDescription:
        'Learn how NEET UG aspirants in Class 11, 12, and repeaters can structure NCERT Biology reading, diagram recall, and statement-based MCQ practice.',
      intent: 'Structure NCERT Biology preparation for NEET UG and Class 12 Boards',
      keywords: ['neet biology ncert study guide', 'how to read ncert for neet biology', 'neet biology preparation pune'],
      status: 'published',
      summary:
        'A structured 4-pass reading and testing protocol for Botany and Zoology based on current NTA NEET UG question patterns.',
      sections: [
        {
          heading: 'Why Passive Highlighting of NCERT Biology Fails in Statement Questions',
          body: [
            'Modern NEET UG Biology papers test multi-statement accuracy, assertion-reason logic, and subtle qualifiers ("all", "most", "only", "without exception") directly from NCERT paragraphs, tables, and figure captions.',
            'In 1-on-1 NEET Biology sessions, our faculty turn every NCERT page into active interrogation—requiring students to explain physiological flowcharts from memory and spot deliberate statement traps.'
          ]
        }
      ]
    },
    {
      slug: 'jee-main-physics-problem-solving-guide',
      title: 'Bridging Theory to Numericals in JEE Main & Class 11–12 Physics | Student Guide',
      h1: 'How to Move from Understanding Physics Theory to Solving JEE & Board Numericals',
      metaDescription:
        'Step-by-step framework for Class 11–12 students who understand Physics concepts in class but get stuck when solving JEE Main, NEET, or Board numericals.',
      intent: 'Overcome the gap between reading Physics theory and solving unseen numerical problems',
      keywords: ['how to solve physics numericals jee neet', 'class 11 physics problem solving guide', 'physics tutor advice pune'],
      status: 'published',
      summary:
        'Diagnosing mathematical tool gaps, drawing free-body diagrams, and maintaining a structured error log in Class 11–12 Physics.',
      sections: [
        {
          heading: 'The 4-Step Numerical Decomposition Protocol',
          body: [
            'Students often say "I understood the chapter, but I cannot start the numerical." Usually, this happens because the student reads solved examples passively instead of translating physical constraints into equations.'
          ],
          bullets: [
            'Step 1: Sketch the system and identify conserved vs changing quantities before looking at formulas.',
            'Step 2: Check calculus and vector projections (dot/cross products, basic differentiation/integration).',
            'Step 3: Solve graded sets—start with 10 single-concept problems before attempting mixed JEE PYQs.',
            'Step 4: Record every wrong attempt in a dedicated Error Notebook categorized by Conceptual Error, Formula Misapplication, or Calculation Slip.'
          ]
        }
      ]
    },
    {
      slug: 'class-10-board-exam-preparation-checklist',
      title: 'Class 10 Board Exam Preparation Checklist (CBSE, ICSE & Maharashtra SSC)',
      h1: 'Class 10 Board Exam Preparation Checklist: Maths & Science Month-by-Month Plan',
      metaDescription:
        'A practical Class 10 board preparation roadmap for Pune parents and students covering CBSE, ICSE, and Maharashtra SSC Mathematics and Science.',
      intent: 'Plan Class 10 board syllabus completion, prelims, and answer-sheet presentation',
      keywords: ['class 10 board exam checklist', '10th ssc cbse icse preparation plan pune', 'class 10 maths science study plan'],
      status: 'published',
      summary:
        'How to schedule syllabus completion by November, run timed prelim papers from December to January, and secure step-marks in Mathematics and Science.',
      sections: [
        {
          heading: 'Securing Step-Marks in Class 10 Mathematics & Science',
          body: [
            'Board examiners award marks for each logical step: writing the given data, stating the formula or geometric theorem with reason, substituting values with correct units, and boxing the final answer.',
            'During 1-on-1 home tuition, our teachers grade full 3-hour sample papers using official board marking schemes so students eliminate careless presentation penalties before the final exam.'
          ]
        }
      ]
    },
    {
      slug: 'hsc-vs-cbse-class-11-12-science-transition',
      title: 'Managing the Class 10 to Class 11 Science Transition in Pune (HSC & CBSE)',
      h1: 'How to Manage the Jump from Class 10 to Class 11 Science (PCM / PCB)',
      metaDescription:
        'Why scores often dip in Class 11 Science and how parents in Pune can structure early Physics, Chemistry, Maths, and Biology support across HSC and CBSE.',
      intent: 'Understand and manage the difficulty spike between Class 10 and Class 11 Science',
      keywords: ['class 10 to 11 science transition', 'hsc vs cbse class 11 science pune', 'class 11 pcm pcb guidance'],
      status: 'published',
      summary:
        'Addressing the sudden expansion in syllabus depth across Class 11 Mechanics, Mole Concept, Calculus, and Cell Biology.',
      sections: [
        {
          heading: 'Why the First 90 Days of Class 11 Determine Competitive Exam Momentum',
          body: [
            'In Class 10, a single Science textbook contains 13–16 concise chapters. In Class 11 PCM/PCB, each individual subject expands into two comprehensive volumes requiring mathematical derivation and abstract reasoning.',
            'Starting structured 1-on-1 reinforcement in Units & Dimensions, Basic Calculus, Mole Concept, and General Organic Chemistry prevents the mid-year backlog that plagues many Class 11 students.'
          ]
        }
      ]
    },
    // 6 additional researched guides in editorial review/draft to complete the 12-guide allocation
    {
      slug: 'avoiding-common-calculus-mistakes-class-12-boards',
      title: 'Common Calculus Mistakes in Class 12 CBSE & HSC Mathematics Boards',
      h1: 'How to Avoid Common Integration & Differential Equation Mistakes in Class 12 Boards',
      metaDescription: 'Editorial guide on preventing sign, substitution, and limit errors in Class 12 Calculus.',
      intent: 'Improve accuracy in Class 12 Board Calculus questions',
      keywords: ['class 12 calculus mistakes', 'hsc cbse integration tips'],
      status: 'reviewed',
      summary: 'Detailed breakdown of Indefinite/Definite Integration and Differential Equations step-marking.',
      sections: []
    },
    {
      slug: 'organic-chemistry-mechanism-roadmap-class-11-12',
      title: 'General Organic Chemistry (GOC) Roadmap for Class 11 & 12 Students',
      h1: 'Building a Strong General Organic Chemistry (GOC) Foundation in Class 11',
      metaDescription: 'Why inductive, resonance, and hyperconjugation effects must be mastered before Class 12 Haloalkanes and Carbonyls.',
      intent: 'Master GOC prerequisites for Class 12 Organic Chemistry',
      keywords: ['general organic chemistry roadmap', 'class 11 goc guide'],
      status: 'reviewed',
      summary: 'Connecting Class 11 electronic displacements to Class 12 named reactions.',
      sections: []
    },
    {
      slug: 'icse-class-9-10-physics-chemistry-biology-strategy',
      title: 'ICSE Class 9 & 10 Segregated Science Preparation Strategy (Physics, Chemistry, Biology)',
      h1: 'Preparing for ICSE Class 10 Science Papers: Physics, Chemistry & Biology',
      metaDescription: 'How ICSE students in East Pune can balance three separate Science papers alongside Mathematics.',
      intent: 'Prepare effectively for ICSE Class 10 Physics, Chemistry, and Biology papers',
      keywords: ['icse class 10 science preparation pune', 'icse physics chemistry biology guide'],
      status: 'reviewed',
      summary: 'Handling numerical density in ICSE Physics and analytical questions in ICSE Chemistry.',
      sections: []
    },
    {
      slug: 'neet-repeater-daily-timetable-and-test-analysis',
      title: 'Structuring a Daily Study & Mock-Test Analysis Routine for NEET Repeaters',
      h1: 'A Realistic Daily Study and Error-Log Routine for NEET UG Repeaters',
      metaDescription: 'How NEET dropper candidates can combine 1-on-1 doubt resolution with daily MCQ practice.',
      intent: 'Create a sustainable daily schedule for a NEET UG drop year',
      keywords: ['neet dropper timetable', 'neet repeater study plan pune'],
      status: 'draft',
      summary: 'Balancing self-study hours with targeted 1-on-1 faculty mentoring.',
      sections: []
    },
    {
      slug: 'mht-cet-vs-jee-main-preparation-for-hsc-students',
      title: 'Balancing Maharashtra HSC Board, MHT-CET & JEE Main Preparation',
      h1: 'How Maharashtra HSC Students Can Align Board Exams with MHT-CET and JEE Main',
      metaDescription: 'Comparing syllabus overlap and speed requirements between HSC Boards, MHT-CET, and JEE Main.',
      intent: 'Coordinate HSC board preparation with engineering entrance exams',
      keywords: ['hsc mht cet jee main preparation pune'],
      status: 'draft',
      summary: 'Managing speed vs depth across State CET and national JEE papers.',
      sections: []
    },
    {
      slug: 'parent-checklist-home-tutor-safety-and-progress-tracking',
      title: 'Parent Checklist: Home Tutor Verification, Safety & Monthly Progress Tracking',
      h1: 'How Parents Should Verify Home Tutors and Track Monthly Academic Progress',
      metaDescription: 'Safety, documentation, and academic milestone tracking guidelines for home tuition in Pune.',
      intent: 'Ensure safe and accountable home tutoring at home',
      keywords: ['home tutor safety checklist pune', 'verify home tutor credentials'],
      status: 'published',
      summary: 'Identity verification, study space setup, and bi-weekly assessment review guidelines for families.',
      sections: [
        {
          heading: '1. Identity, Qualification & Administrative Accountability',
          body: [
            'Before any home tutor begins regular classes at your residence, verify that an established administrative office maintains copies of the educator’s government photo ID, current address proof, and university certificates.',
            'At Skill+ Tutors (Office 205, Saptrang Akash, Hadapsar, Pune - 412308), our administration completes these checks prior to scheduling your introductory home demo session.'
          ]
        },
        {
          heading: '2. Bi-Weekly Written Testing Over Verbal Assurances',
          body: [
            'Never rely solely on verbal feedback ("the child is doing well"). Require a written chapter test every 14 days with graded answer scripts reviewed jointly by the parent and tutor.'
          ]
        }
      ]
    }
  ];

  for (const g of GUIDES_DATA) {
    pages.push({
      url: `/resources/${g.slug}/`,
      pageType: 'parent_guide',
      title: g.title,
      metaDescription: g.metaDescription,
      h1: g.h1,
      primaryUserIntent: g.intent,
      keywordCluster: g.keywords,
      supportingEvidence: 'Original educator-authored advisory with explicit commercial disclosure.',
      uniqueContentAngle: g.summary,
      relatedUrls: ['/resources/', '/find-tutor/', '/pune/', '/about-us/'],
      reviewer: 'Senior Curriculum Editor',
      status: g.status,
      lastModified: lastMod,
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'Parent Guides', url: '/resources/' },
        { label: g.h1.slice(0, 42) + '...', url: `/resources/${g.slug}/` }
      ],
      heroBadge: 'Parent & Student Advisory Guide',
      heroSubtitle: g.summary,
      quickSummaryFacts: [
        { label: 'Editorial Status', value: g.status.toUpperCase() },
        { label: 'Author / Reviewer', value: 'Skill+ Tutors Academic Team (Hadapsar, Pune)' },
        { label: 'Commercial Disclosure', value: 'Published by Skill+ Tutors; No Paid 3rd-Party Rankings' }
      ],
      sections: g.sections,
      faqs: [],
      editorialBlockerNote:
        g.status === 'published'
          ? undefined
          : 'Held in editorial staging until final curriculum sign-off.'
    });
  }

  return pages;
}

export const ALL_INVENTORY_PAGES: PageInventoryItem[] = buildAllPages();

export const PUBLISHED_PUBLIC_PAGES: PageInventoryItem[] = ALL_INVENTORY_PAGES.filter(
  (p) => p.status === 'published'
);

export const STAGED_OR_DRAFT_PAGES: PageInventoryItem[] = ALL_INVENTORY_PAGES.filter(
  (p) => p.status !== 'published'
);

export function findPageByUrl(normalizedUrl: string): PageInventoryItem | undefined {
  return ALL_INVENTORY_PAGES.find((p) => p.url === normalizedUrl);
}

export function getInventoryMetrics() {
  const totalPlanned = ALL_INVENTORY_PAGES.length;
  const publishedCount = ALL_INVENTORY_PAGES.filter((p) => p.status === 'published').length;
  const reviewedCount = ALL_INVENTORY_PAGES.filter((p) => p.status === 'reviewed').length;
  const needsEvidenceCount = ALL_INVENTORY_PAGES.filter((p) => p.status === 'needs_evidence').length;
  const draftCount = ALL_INVENTORY_PAGES.filter((p) => p.status === 'draft').length;

  const byType: Record<string, { total: number; published: number; held: number }> = {};
  for (const p of ALL_INVENTORY_PAGES) {
    if (!byType[p.pageType]) {
      byType[p.pageType] = { total: 0, published: 0, held: 0 };
    }
    byType[p.pageType].total += 1;
    if (p.status === 'published') {
      byType[p.pageType].published += 1;
    } else {
      byType[p.pageType].held += 1;
    }
  }

  return {
    totalPlanned,
    publishedPubliclyDeployed: publishedCount,
    reviewedStaged: reviewedCount,
    needsEvidenceBlocked: needsEvidenceCount,
    draftInProgress: draftCount,
    externallyIndexedByGoogle: 'NOT YET AVAILABLE (Staging / Pre-Launch Environment)',
    byType
  };
}

export function generatePageInventoryCsv(): string {
  const headers = [
    'url',
    'page_type',
    'status',
    'title',
    'h1',
    'primary_user_intent',
    'keyword_cluster',
    'locality',
    'subject_or_exam',
    'supporting_evidence',
    'unique_content_angle',
    'related_pages',
    'reviewer'
  ];

  const escapeCsv = (val: string | number | undefined) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = ALL_INVENTORY_PAGES.map((p) => [
    p.url,
    p.pageType,
    p.status,
    p.title,
    p.h1,
    p.primaryUserIntent,
    p.keywordCluster.join(' | '),
    p.localityName || 'Pune / All Covered',
    p.subjectOrExam || 'All Verified Offerings',
    p.supportingEvidence,
    p.uniqueContentAngle,
    p.relatedUrls.join(' | '),
    p.reviewer
  ]);

  return [
    headers.map(escapeCsv).join(','),
    ...rows.map((r) => r.map(escapeCsv).join(','))
  ].join('\n');
}

export function buildStructuredDataJsonLd(
  page: PageInventoryItem,
  baseUrl: string = 'https://skillplustutors.com'
): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const fullUrl = `${cleanBase}${page.url}`;
  const orgId = `${cleanBase}/#organization`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'EducationalOrganization',
      '@id': orgId,
      name: SKILLPLUS_OFFICE_FACTS.brandName,
      alternateName: SKILLPLUS_OFFICE_FACTS.legalOrAlternateName,
      url: `${cleanBase}/`,
      telephone: SKILLPLUS_OFFICE_FACTS.telephone,
      foundingDate: '2020',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Office 205, Saptrang Akash, Hadapsar',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        postalCode: '412308',
        addressCountry: 'IN'
      },
      areaServed: APPROVED_PUBLIC_SERVICE_AREAS.map((a) => ({
        '@type': 'Place',
        name: `${a.canonicalName}, Pune`
      }))
    }
  ];

  // BreadcrumbList
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${fullUrl}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: b.label,
        item: `${cleanBase}${b.url}`
      }))
    });
  }

  // Service schema for locality, subject, and programme pages (never fake LocalBusiness branch address!)
  if (
    page.pageType === 'locality_hub' ||
    page.pageType === 'subject_locality' ||
    page.pageType === 'exam_locality' ||
    page.pageType === 'subject_hub' ||
    page.pageType === 'programme_hub' ||
    page.pageType === 'board_hub'
  ) {
    graph.push({
      '@type': 'Service',
      '@id': `${fullUrl}#service`,
      name: page.h1,
      description: page.metaDescription,
      url: fullUrl,
      provider: {
        '@id': orgId
      },
      serviceType: page.subjectOrExam
        ? `${page.subjectOrExam} 1-on-1 Home & Online Tutoring`
        : '1-on-1 Home & Online Academic Tutoring',
      areaServed: page.localityName
        ? {
            '@type': 'Place',
            name: `${page.localityName}, Pune, Maharashtra`
          }
        : {
            '@type': 'City',
            name: 'Pune'
          }
    });
  }

  // Article schema for original parent/student guides
  if (page.pageType === 'parent_guide') {
    graph.push({
      '@type': 'Article',
      '@id': `${fullUrl}#article`,
      headline: page.h1,
      description: page.metaDescription,
      datePublished: '2026-10-08',
      dateModified: page.lastModified,
      author: {
        '@id': orgId
      },
      publisher: {
        '@id': orgId
      },
      mainEntityOfPage: fullUrl
    });
  }

  // FAQPage schema for pages containing visible Frequently Asked Questions
  if (page.faqs && page.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${fullUrl}#faq`,
      url: fullUrl,
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': graph
    },
    null,
    2
  );
}
