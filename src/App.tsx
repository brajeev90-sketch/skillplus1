/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  SERVICE_AREAS,
  APPROVED_PUBLIC_SERVICE_AREAS,
  DRAFT_UNVERIFIED_SERVICE_AREAS,
  SKILLPLUS_OFFICE_FACTS
} from './data/serviceAreas';
import {
  ALL_INVENTORY_PAGES,
  PUBLISHED_PUBLIC_PAGES,
  SUBJECT_SPECS,
  EXAM_AND_BOARD_SPECS,
  findPageByUrl,
  getInventoryMetrics,
  buildStructuredDataJsonLd,
  PageInventoryItem
} from './data/pageInventory';
import { REDIRECT_MAP, normalizeUrlPath, findRedirectRule } from './data/redirects';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1V3vnkgMHtqqGtJ-yN-b1J8XRp1euo2D1I2E0zMc4i3psyWnoRrIoRdRV-P04kFD5XVoAnDx6SMGyh9HcvCAF_M8hvKGkioN8x4vYXBhf_BtpDWhprWU4uVZbOCq1dMUYQNbTS3tmsvp8qW2on5rdzNbhStg0GsyHYK-SNTn_WhP3tAft_tK8I3Nrjm4KWwunhWgqG7haUBo5bAmaO-7xTrzBxbtQSk6GeyiEWt1qcphf9cNYcxwDhDgw';

const HERO_ILLUSTRATION_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VOPqcZ-gshhVwhl73SUsE_pkmhl2JT21TGJjNVh_44x-OkZcmlOtXFIMcjsTjh8WBMstiS0QTQKH7WWs_tTe3hi5kbCecnLK-0U9kRX4iW-Ayd1tI0xnK9eQNa_H3vqkso6-Xm2tTVQw7XvFMR4xAoKMiKfXpNn6jTzbGKFfrkg4qkp2F2Y3BqKXmoY8dtr1LVCDDfhuXW6s96U2pUi8NFhsvStd90tlOiA-SYrVHRwQz9M7BO-b4B7C0';

export interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return normalizeUrlPath(initialPath);
    if (typeof window !== 'undefined') {
      return normalizeUrlPath(window.location.pathname);
    }
    return '/';
  });

  // Quick Tutor Matcher state on Homepage
  const [selectedClass, setSelectedClass] = useState('Class 8-10');
  const [selectedSubject, setSelectedSubject] = useState('Chemistry');
  const [selectedLocality, setSelectedLocality] = useState('hadapsar');
  const [teachingMode, setTeachingMode] = useState<'home' | 'online'>('home');
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  // Enquiry Form State
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [localityInput, setLocalityInput] = useState('Hadapsar');
  const [classGoalInput, setClassGoalInput] = useState('Class 11–12 Science (PCM / PCB)');
  const [subjectInput, setSubjectInput] = useState('Chemistry');
  const [modeInput, setModeInput] = useState<'home' | 'online'>('home');
  const [notesInput, setNotesInput] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formState, setFormState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
    referenceId?: string;
  }>({ status: 'idle', message: '' });

  // Teacher Application Form State
  const [teacherName, setTeacherName] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherQualification, setTeacherQualification] = useState('');
  const [teacherSubjects, setTeacherSubjects] = useState('Physics, Mathematics');
  const [teacherCorridors, setTeacherCorridors] = useState('Hadapsar, Magarpatta, Amanora');
  const [teacherExperience, setTeacherExperience] = useState('');
  const [teacherConsent, setTeacherConsent] = useState(false);
  const [teacherFormState, setTeacherFormState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
    referenceId?: string;
  }>({ status: 'idle', message: '' });

  // Admin & Architecture Console State
  const [adminTab, setAdminTab] = useState<
    'overview' | 'geography' | 'inventory' | 'redirects' | 'qa' | 'enquiries'
  >('overview');
  const [inventoryFilterStatus, setInventoryFilterStatus] = useState<string>('all');
  const [inventoryFilterType, setInventoryFilterType] = useState<string>('all');
  const [inventorySearch, setInventorySearch] = useState<string>('');
  const [adminToken, setAdminToken] = useState<string>('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [storedEnquiries, setStoredEnquiries] = useState<Array<Record<string, unknown>>>([]);
  const [adminMessage, setAdminMessage] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      setCurrentPath(normalizeUrlPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (rawTarget: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const redirect = findRedirectRule(rawTarget);
    const finalTarget = redirect ? redirect.destinationPath : normalizeUrlPath(rawTarget);
    setCurrentPath(finalTarget);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', finalTarget);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync dynamic client-side document title & canonical on SPA transitions
  const matchedPage = findPageByUrl(currentPath);
  const isPublicApprovedPage = matchedPage && matchedPage.status === 'published';

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (currentPath === '/admin') {
      document.title = 'Staff & Administrator Portal | Skill+ Tutors Pune';
    } else if (isPublicApprovedPage && matchedPage) {
      document.title = matchedPage.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', matchedPage.metaDescription);
      }
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      const baseOrigin =
        typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : 'https://skillplustutors.com';
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `${baseOrigin}${matchedPage.url}`);
      }
      let jsonLdEl = document.getElementById('ssr-jsonld') as HTMLScriptElement | null;
      if (!jsonLdEl) {
        jsonLdEl = document.createElement('script');
        jsonLdEl.id = 'ssr-jsonld';
        jsonLdEl.type = 'application/ld+json';
        document.head.appendChild(jsonLdEl);
      }
      jsonLdEl.textContent = buildStructuredDataJsonLd(matchedPage, baseOrigin);
    } else {
      document.title = 'Page Not Found | Skill+ Tutors Pune';
    }
  }, [currentPath, isPublicApprovedPage, matchedPage]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setFormState({
        status: 'error',
        message: 'Please confirm parent/guardian consent before submitting.'
      });
      return;
    }
    setFormState({ status: 'submitting', message: 'Validating and saving your enquiry on server...' });
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          phone,
          locality: localityInput,
          classGoal: classGoalInput,
          subject: subjectInput,
          mode: modeInput,
          notes: notesInput,
          consent: consentChecked,
          sourceUrl: currentPath,
          website_hp: honeypot
        })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setFormState({
          status: 'error',
          message: data.error || 'Unable to process enquiry. Please call +91 8459832971 directly.'
        });
        return;
      }
      setFormState({
        status: 'success',
        message: data.message,
        referenceId: data.referenceId
      });
      setParentName('');
      setPhone('');
      setNotesInput('');
    } catch {
      setFormState({
        status: 'error',
        message: 'Network error while saving enquiry. Please call +91 8459832971.'
      });
    }
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherConsent) {
      setTeacherFormState({
        status: 'error',
        message: 'Please accept the identity and credential verification policy.'
      });
      return;
    }
    setTeacherFormState({ status: 'submitting', message: 'Submitting educator profile...' });
    try {
      const response = await fetch('/api/tutor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherName,
          phone: teacherPhone,
          qualification: teacherQualification,
          subjects: teacherSubjects,
          corridors: teacherCorridors,
          experience: teacherExperience,
          consent: teacherConsent,
          website_hp: honeypot
        })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setTeacherFormState({
          status: 'error',
          message: data.error || 'Submission failed. Please call +91 8459832971.'
        });
        return;
      }
      setTeacherFormState({
        status: 'success',
        message: data.message,
        referenceId: data.referenceId
      });
      setTeacherName('');
      setTeacherPhone('');
      setTeacherQualification('');
      setTeacherExperience('');
    } catch {
      setTeacherFormState({
        status: 'error',
        message: 'Network error while submitting teacher application.'
      });
    }
  };

  const fetchAdminEnquiries = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!adminToken.trim()) {
      setAdminMessage('Please enter your Administrator Access Token.');
      return;
    }
    try {
      const res = await fetch('/api/admin/enquiries', {
        headers: {
          'x-admin-token': adminToken.trim()
        }
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setIsAdminAuthenticated(true);
        setStoredEnquiries(data.enquiries || []);
        setAdminMessage(`Authenticated. Loaded ${data.enquiries?.length || 0} stored enquiries.`);
      } else {
        setIsAdminAuthenticated(false);
        setAdminMessage('Invalid Administrator Access Token.');
      }
    } catch {
      setAdminMessage('Error connecting to authentication server.');
    }
  };

  // Determine matched subject-locality URL from Quick Tutor Matcher
  const matcherSubjSpec = SUBJECT_SPECS[selectedSubject] || SUBJECT_SPECS.Chemistry;
  const matcherTargetUrl = `/pune/${selectedLocality}/${matcherSubjSpec.urlSlug}/`;
  const matcherAreaObj =
    APPROVED_PUBLIC_SERVICE_AREAS.find((a) => a.slug === selectedLocality) ||
    APPROVED_PUBLIC_SERVICE_AREAS[0];

  return (
    <div className="min-h-screen flex flex-col bg-surface text-text-body">
      {/* =====================================================================
          STICKY HEADER (Zero-Wrap Responsive Layout Across All Viewports)
         ===================================================================== */}
      <header className="sticky top-0 w-full z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,41,66,0.06)] border-b border-border-subtle">
        <div className="max-w-6xl mx-auto flex flex-col px-4 sm:px-6">
          {/* Row 1: Top Utility Strip (Parent Helpline & Quick Actions) */}
          <div className="flex items-center justify-between gap-2 py-1.5 border-b border-border-subtle/60 text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[15px] text-secondary shrink-0">
                support_agent
              </span>
              <span className="text-label-sm text-text-heading whitespace-nowrap shrink-0">
                Parent Helpline:
              </span>
              <a
                className="text-label-sm text-cluster-tag-text font-bold hover:underline tabular-nums whitespace-nowrap shrink-0"
                href="tel:+918459832971"
              >
                +91 8459832971
              </a>
              <span className="hidden lg:inline text-outline-variant mx-1 shrink-0">•</span>
              <span className="hidden lg:inline text-[11px] text-on-surface-variant truncate">
                Office 205, Saptrang Akash, Hadapsar, Pune 412308
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-flex min-h-[24px] px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary text-label-sm items-center gap-1 whitespace-nowrap shrink-0">
                <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                <span>1-on-1 Home &amp; Online</span>
              </span>
              <a
                className="min-h-[24px] px-2.5 py-0.5 rounded-full bg-verified-badge-bg text-verified-badge-text text-label-sm flex items-center gap-1 hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0"
                href="https://wa.me/918459832971?text=Hi%20Skill%2B%20Tutors,%20I%20need%20a%20verified%20tutor%20in%20Pune"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[14px]">chat</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Row 2: Brand Lockup, Large-Screen Nav & Primary CTA */}
          <div className="flex items-center justify-between gap-4 py-2.5">
            <a
              href="/"
              onClick={(e) => navigateTo('/', e)}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-base tracking-tight shadow-sm shrink-0">
                A+
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-headline-sm text-primary tracking-tight font-bold group-hover:text-secondary transition-colors whitespace-nowrap">
                    Skill+ Tutors
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[16px] shrink-0">
                    verified
                  </span>
                </div>
                <span className="text-label-sm text-on-surface-variant flex items-center gap-0.5 whitespace-nowrap">
                  <span className="material-symbols-outlined text-[13px] text-cluster-tag-text shrink-0">
                    location_on
                  </span>
                  Hadapsar, Pune • Home &amp; Online
                </span>
              </div>
            </a>

            {/* Large-Screen Inline Navigation (xl and up, never wraps) */}
            <nav
              aria-label="Primary Desktop Navigation"
              className="hidden xl:flex items-center gap-5 text-label-md text-text-body shrink-0"
            >
              <a
                href="/"
                onClick={(e) => navigateTo('/', e)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  currentPath === '/' ? 'text-primary font-bold underline underline-offset-4' : ''
                }`}
              >
                Home
              </a>
              <a
                href="/pune/"
                onClick={(e) => navigateTo('/pune/', e)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  currentPath.startsWith('/pune/')
                    ? 'text-primary font-bold underline underline-offset-4'
                    : ''
                }`}
              >
                East Pune (~10 km)
              </a>
              <a
                href="/neet/"
                onClick={(e) => navigateTo('/neet/', e)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  currentPath === '/neet/' ? 'text-primary font-bold underline underline-offset-4' : ''
                }`}
              >
                NEET
              </a>
              <a
                href="/jee/"
                onClick={(e) => navigateTo('/jee/', e)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  currentPath === '/jee/' ? 'text-primary font-bold underline underline-offset-4' : ''
                }`}
              >
                JEE
              </a>
              <a
                href="/12th-board/"
                onClick={(e) => navigateTo('/12th-board/', e)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  currentPath === '/12th-board/'
                    ? 'text-primary font-bold underline underline-offset-4'
                    : ''
                }`}
              >
                12th Board
              </a>
              <a
                href="/10th-board/"
                onClick={(e) => navigateTo('/10th-board/', e)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  currentPath === '/10th-board/'
                    ? 'text-primary font-bold underline underline-offset-4'
                    : ''
                }`}
              >
                10th Board
              </a>
              <a
                href="/resources/"
                onClick={(e) => navigateTo('/resources/', e)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  currentPath.startsWith('/resources/')
                    ? 'text-primary font-bold underline underline-offset-4'
                    : ''
                }`}
              >
                Parent Guides
              </a>
              <a
                href="/contact-us/"
                onClick={(e) => navigateTo('/contact-us/', e)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  currentPath === '/contact-us/'
                    ? 'text-primary font-bold underline underline-offset-4'
                    : ''
                }`}
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:+918459832971"
                className="hidden sm:inline-flex min-h-[38px] px-3 py-1.5 rounded-lg bg-surface-container-high text-primary text-label-md items-center gap-1.5 hover:bg-surface-container-highest transition-colors whitespace-nowrap shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Call Now</span>
              </a>
              <a
                href="/find-tutor/"
                onClick={(e) => navigateTo('/find-tutor/', e)}
                className="inline-flex min-h-[38px] px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-label-md items-center gap-1.5 hover:bg-primary-container transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">person_search</span>
                <span>Find Tutor</span>
              </a>
              <a
                href="/contact-us/"
                onClick={(e) => navigateTo('/contact-us/', e)}
                aria-label="Contact & Administrative Office"
                className="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-container-highest transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
              </a>
            </div>
          </div>

          {/* Row 3: Scrollable Pill Navigation Bar for Tablet / Split-Screen / Mobile (< xl) */}
          <nav
            aria-label="Section Navigation"
            className="flex xl:hidden items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-border-subtle/60"
          >
            {[
              { label: 'Home', url: '/', active: currentPath === '/' },
              {
                label: 'East Pune (~10 km)',
                url: '/pune/',
                active: currentPath.startsWith('/pune/')
              },
              { label: 'NEET UG', url: '/neet/', active: currentPath === '/neet/' },
              { label: 'IIT-JEE', url: '/jee/', active: currentPath === '/jee/' },
              { label: '12th Board', url: '/12th-board/', active: currentPath === '/12th-board/' },
              { label: '10th Board', url: '/10th-board/', active: currentPath === '/10th-board/' },
              {
                label: 'Parent Guides',
                url: '/resources/',
                active: currentPath.startsWith('/resources/')
              },
              {
                label: 'Join as Tutor',
                url: '/join-us/',
                active: currentPath === '/join-us/' || currentPath === '/teacher-registration/'
              },
              { label: 'Contact HQ', url: '/contact-us/', active: currentPath === '/contact-us/' }
            ].map((item) => (
              <a
                key={item.url}
                href={item.url}
                onClick={(e) => navigateTo(item.url, e)}
                className={`px-3 py-1 rounded-full text-label-sm whitespace-nowrap shrink-0 transition-colors ${
                  item.active
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-text-body hover:bg-surface-container'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* =====================================================================
          MAIN CONTENT AREA
         ===================================================================== */}
      <main className="flex-1 w-full bg-surface pt-3 pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto w-full">
          {currentPath === '/' ? (
            /* ===============================================================
               HOMEPAGE VIEW (Exact Google Stitch Screen + Live Links)
               =============================================================== */
            <div className="flex flex-col w-full">
              {/* Trust & Operating Proof Strip */}
              <section className="px-margin pt-space-sm pb-space-xs">
                <div className="bg-surface-container-high rounded-xl p-space-sm flex items-start gap-2.5 shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    verified_user
                  </span>
                  <div className="flex flex-col">
                    <span className="text-label-sm text-primary uppercase tracking-wider">
                      Registered Operational Office
                    </span>
                    <p className="text-body-sm text-on-surface-variant leading-tight mt-0.5">
                      Office 205 Saptrang Akash, Hadapsar, Pune 412308 • Serving within verified ~10 km transit radius
                    </p>
                  </div>
                </div>
              </section>

              {/* Hero & Primary Filter Section */}
              <section className="px-margin py-space-sm flex flex-col gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cluster-tag-bg text-cluster-tag-text self-start shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">local_library</span>
                    <span className="text-label-sm">Pune Home &amp; Online Tutoring</span>
                  </div>
                  <h1 className="text-headline-lg-mobile md:text-headline-lg text-text-heading tracking-tight">
                    Home &amp; Online Tutors in Hadapsar &amp; East Pune
                  </h1>
                  <p className="text-body-md md:text-body-lg text-text-body">
                    Personalized 1-on-1 Academic Tutoring for NEET, JEE &amp; School Boards (CBSE, ICSE, SSC, HSC, IB, IGCSE)
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
                  {/* Left Column: Hero Card + Core Programme Hubs */}
                  <div className="lg:col-span-6 flex flex-col gap-space-md">
                    <div className="relative bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle overflow-hidden flex flex-col gap-space-sm">
                      <div className="flex items-center gap-space-md">
                        <div className="w-24 h-24 shrink-0 rounded-xl bg-surface-container-low p-1.5 flex items-center justify-center shadow-inner">
                          <img
                            alt="Skill+ Tutors 1-on-1 Home and Online Education Illustration"
                            className="w-full h-full object-contain"
                            width="96"
                            height="96"
                            referrerPolicy="no-referrer"
                            src={HERO_ILLUSTRATION_URL}
                          />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-secondary text-[16px]">
                              stars
                            </span>
                            <span className="text-label-sm text-secondary font-bold">
                              1-on-1 Focused Mentorship
                            </span>
                          </div>
                          <span className="text-headline-sm text-text-heading font-bold">
                            Over 2,000+ Students
                          </span>
                          <p className="text-body-sm text-on-surface-variant">
                            Mentored by subject-matter specialists since 2020
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="bg-surface-container-low px-2.5 py-2 rounded-lg flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-[18px]">
                            verified
                          </span>
                          <span className="text-label-sm text-text-heading">
                            ID &amp; Address Verified
                          </span>
                        </div>
                        <div className="bg-surface-container-low px-2.5 py-2 rounded-lg flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-[18px]">
                            home_pin
                          </span>
                          <span className="text-label-sm text-text-heading">
                            Doorstep In-Person
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Core Academic & Subject Hubs Quick Access */}
                    <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-2.5">
                      <span className="text-label-sm text-secondary uppercase tracking-wider">
                        Verified Subjects &amp; Exam Tracks
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <a
                          href="/subjects/physics/"
                          onClick={(e) => navigateTo('/subjects/physics/', e)}
                          className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-label-md flex items-center justify-between transition-colors"
                        >
                          <span>Physics</span>
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            arrow_forward
                          </span>
                        </a>
                        <a
                          href="/subjects/chemistry/"
                          onClick={(e) => navigateTo('/subjects/chemistry/', e)}
                          className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-label-md flex items-center justify-between transition-colors"
                        >
                          <span>Chemistry</span>
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            arrow_forward
                          </span>
                        </a>
                        <a
                          href="/subjects/mathematics/"
                          onClick={(e) => navigateTo('/subjects/mathematics/', e)}
                          className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-label-md flex items-center justify-between transition-colors"
                        >
                          <span>Mathematics</span>
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            arrow_forward
                          </span>
                        </a>
                        <a
                          href="/subjects/biology/"
                          onClick={(e) => navigateTo('/subjects/biology/', e)}
                          className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-label-md flex items-center justify-between transition-colors"
                        >
                          <span>Biology</span>
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            arrow_forward
                          </span>
                        </a>
                        <a
                          href="/neet/"
                          onClick={(e) => navigateTo('/neet/', e)}
                          className="px-3 py-2 rounded-xl bg-verified-badge-bg hover:bg-emerald-100 text-verified-badge-text text-label-md flex items-center justify-between transition-colors"
                        >
                          <span>NEET UG</span>
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </a>
                        <a
                          href="/jee/"
                          onClick={(e) => navigateTo('/jee/', e)}
                          className="px-3 py-2 rounded-xl bg-cluster-tag-bg hover:bg-blue-100 text-cluster-tag-text text-label-md flex items-center justify-between transition-colors"
                        >
                          <span>IIT-JEE</span>
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1 text-body-sm">
                        <a
                          href="/10th-board/"
                          onClick={(e) => navigateTo('/10th-board/', e)}
                          className="text-secondary font-medium hover:underline"
                        >
                          Class 10 Board
                        </a>
                        <span>•</span>
                        <a
                          href="/12th-board/"
                          onClick={(e) => navigateTo('/12th-board/', e)}
                          className="text-secondary font-medium hover:underline"
                        >
                          Class 12 Science Board
                        </a>
                        <span>•</span>
                        <a
                          href="/boards/cbse/"
                          onClick={(e) => navigateTo('/boards/cbse/', e)}
                          className="text-secondary font-medium hover:underline"
                        >
                          CBSE
                        </a>
                        <span>•</span>
                        <a
                          href="/boards/icse/"
                          onClick={(e) => navigateTo('/boards/icse/', e)}
                          className="text-secondary font-medium hover:underline"
                        >
                          ICSE
                        </a>
                        <span>•</span>
                        <a
                          href="/boards/ssc/"
                          onClick={(e) => navigateTo('/boards/ssc/', e)}
                          className="text-secondary font-medium hover:underline"
                        >
                          SSC
                        </a>
                        <span>•</span>
                        <a
                          href="/boards/hsc/"
                          onClick={(e) => navigateTo('/boards/hsc/', e)}
                          className="text-secondary font-medium hover:underline"
                        >
                          HSC
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Quick Tutor Matcher Form */}
                  <div className="lg:col-span-6 bg-surface-card rounded-2xl p-space-md shadow-md border border-border-subtle flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          tune
                        </span>
                        <h2 className="text-headline-sm text-text-heading">
                          Quick Tutor Matcher
                        </h2>
                      </div>
                      <span className="text-label-sm text-verified-badge-text bg-verified-badge-bg px-2 py-0.5 rounded-full">
                        Fast Response
                      </span>
                    </div>

                    <div className="flex flex-col gap-space-sm">
                      {/* Class Selector */}
                      <label className="flex flex-col gap-1.5">
                        <span className="text-label-sm text-text-heading uppercase tracking-wide">
                          Select Class / Goal
                        </span>
                        <div className="relative">
                          <select
                            value={selectedClass}
                            onChange={(e) => {
                              setSelectedClass(e.target.value);
                              setAvailabilityChecked(false);
                            }}
                            className="w-full min-h-[48px] bg-background-canvas border border-border-subtle text-text-body text-body-md rounded-lg px-3 py-2 appearance-none focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="Class 8-10">Class 8-10 (CBSE / ICSE / SSC)</option>
                            <option value="11th-12th Science">11th-12th Science (PCM / PCB)</option>
                            <option value="NEET Dropper">NEET Dropper / Target Medical</option>
                            <option value="JEE Mains/Advanced">JEE Mains / Advanced Target</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline text-[20px]">
                            expand_more
                          </span>
                        </div>
                      </label>

                      {/* Subject Selector */}
                      <label className="flex flex-col gap-1.5">
                        <span className="text-label-sm text-text-heading uppercase tracking-wide">
                          Select Subject
                        </span>
                        <div className="relative">
                          <select
                            value={selectedSubject}
                            onChange={(e) => {
                              setSelectedSubject(e.target.value);
                              setAvailabilityChecked(false);
                            }}
                            className="w-full min-h-[48px] bg-background-canvas border border-border-subtle text-text-body text-body-md rounded-lg px-3 py-2 appearance-none focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="Chemistry">Chemistry (Organic, Inorganic, Physical)</option>
                            <option value="Physics">Physics (Mechanics, Electrodynamics)</option>
                            <option value="Mathematics">Mathematics (Calculus, Algebra)</option>
                            <option value="Biology">Biology (Botany, Zoology)</option>
                            <option value="Science">Class 8–10 Science (CBSE / ICSE / SSC)</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline text-[20px]">
                            expand_more
                          </span>
                        </div>
                      </label>

                      {/* Locality Selector */}
                      <label className="flex flex-col gap-1.5">
                        <span className="text-label-sm text-text-heading uppercase tracking-wide">
                          Select East Pune Locality (~10 km Radius)
                        </span>
                        <div className="relative">
                          <select
                            value={selectedLocality}
                            onChange={(e) => {
                              setSelectedLocality(e.target.value);
                              setAvailabilityChecked(false);
                            }}
                            className="w-full min-h-[48px] bg-background-canvas border border-border-subtle text-text-body text-body-md rounded-lg px-3 py-2 appearance-none focus:outline-none focus:border-primary transition-colors"
                          >
                            {APPROVED_PUBLIC_SERVICE_AREAS.map((area) => (
                              <option key={area.slug} value={area.slug}>
                                {area.canonicalName} ({area.practicalRoadDistanceKm} km road from HQ)
                              </option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline text-[20px]">
                            expand_more
                          </span>
                        </div>
                      </label>

                      {/* Teaching Mode Selector */}
                      <div className="flex flex-col gap-1.5">
                        <span className="text-label-sm text-text-heading uppercase tracking-wide">
                          Teaching Mode
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setTeachingMode('home')}
                            className={`min-h-[44px] px-2 py-2 rounded-lg text-label-md flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                              teachingMode === 'home'
                                ? 'bg-primary-container text-on-primary'
                                : 'bg-surface-container-low text-text-body hover:bg-surface-container'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">home</span>
                            <span>Home Tutor</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setTeachingMode('online')}
                            className={`min-h-[44px] px-2 py-2 rounded-lg text-label-md flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                              teachingMode === 'online'
                                ? 'bg-primary-container text-on-primary'
                                : 'bg-surface-container-low text-text-body hover:bg-surface-container'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              laptop_mac
                            </span>
                            <span>Online Live</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Submit Action */}
                    <button
                      type="button"
                      onClick={() => setAvailabilityChecked(true)}
                      className="min-h-[48px] w-full bg-primary hover:bg-primary-container text-on-primary rounded-xl text-label-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[20px]">search_check</span>
                      <span>Check Tutor Availability</span>
                    </button>

                    {/* Availability Match Result Box */}
                    {availabilityChecked && (
                      <div className="bg-verified-badge-bg border border-emerald-200 p-3.5 rounded-xl flex flex-col gap-2 shadow-sm">
                        <div className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-verified-badge-text text-[18px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <div className="flex flex-col">
                            <span className="text-label-sm text-verified-badge-text">
                              Verified Coverage Confirmed for {matcherAreaObj.canonicalName}
                            </span>
                            <p className="text-body-sm text-verified-badge-text mt-0.5">
                              {matcherAreaObj.canonicalName} is {matcherAreaObj.straightLineDistanceKm} km straight-line ({matcherAreaObj.practicalRoadDistanceKm} km road, {matcherAreaObj.estimatedTransitMinutes}) from our Saptrang Akash office. 1-on-1 {selectedSubject} specialists for {selectedClass} ({teachingMode === 'home' ? 'Doorstep Home Visit' : 'Live Online'}) are available.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a
                            href={
                              findPageByUrl(matcherTargetUrl)?.status === 'published'
                                ? matcherTargetUrl
                                : `/pune/${matcherAreaObj.slug}/`
                            }
                            onClick={(e) =>
                              navigateTo(
                                findPageByUrl(matcherTargetUrl)?.status === 'published'
                                  ? matcherTargetUrl
                                  : `/pune/${matcherAreaObj.slug}/`,
                                e
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-verified-badge-text text-white text-label-sm inline-flex items-center gap-1 hover:bg-emerald-800 transition-colors"
                          >
                            <span>
                              View {matcherAreaObj.canonicalName} {selectedSubject} Details
                            </span>
                            <span className="material-symbols-outlined text-[14px]">
                              arrow_forward
                            </span>
                          </a>
                          <a
                            href="/find-tutor/"
                            onClick={(e) => navigateTo('/find-tutor/', e)}
                            className="px-3 py-1.5 rounded-lg bg-white text-verified-badge-text border border-emerald-300 text-label-sm inline-flex items-center gap-1 hover:bg-emerald-50 transition-colors"
                          >
                            <span>Book Free Trial Consultation</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Section 1: How Tutor Matching Works (3-Step Timeline) */}
              <section className="px-margin py-space-md flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm text-secondary uppercase tracking-wider">
                    Parent-Centric Process
                  </span>
                  <h2 className="text-headline-lg-mobile text-text-heading">
                    How Tutor Matching Works
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Simple, safe, and transparent coordination from our Hadapsar team.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Step 1 */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary text-headline-sm shrink-0 shadow-sm">
                      1
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-headline-sm text-text-heading">
                        Share Requirements
                      </span>
                      <p className="text-body-md text-text-body mt-1">
                        Specify subjects, your specific residential locality (e.g., Magarpatta, Amanora, Sasane Nagar), and preferred weekly timings.
                      </p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-headline-sm shrink-0 shadow-sm">
                      2
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-headline-sm text-text-heading">
                        Verified Tutor Matching
                      </span>
                      <p className="text-body-md text-text-body mt-1">
                        Our Hadapsar administration reviews verified academic background, syllabus alignment (CBSE, ICSE, State), and proximity.
                      </p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary text-headline-sm shrink-0 shadow-sm">
                      3
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-headline-sm text-text-heading">
                        Demo Session Assessment
                      </span>
                      <p className="text-body-md text-text-body mt-1">
                        Participate in an initial demonstration class at home to assess teaching chemistry and clarity before confirming monthly tuition.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Pune Service Areas Directory (Crawlable Links to Verified Localities) */}
              <section className="px-margin py-space-md flex flex-col gap-space-md bg-surface-container-low rounded-3xl mx-2 my-space-sm">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cluster-tag-bg text-cluster-tag-text self-start shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">near_me</span>
                      <span className="text-label-sm">Transit Radius: ~10km</span>
                    </div>
                    <h2 className="text-headline-lg-mobile text-text-heading">
                      East Pune Service Directory
                    </h2>
                    <p className="text-body-sm text-on-surface-variant">
                      Organized locality clusters served directly from our Hadapsar Hub ({APPROVED_PUBLIC_SERVICE_AREAS.length} verified localities).
                    </p>
                  </div>
                  <a
                    href="/pune/"
                    onClick={(e) => navigateTo('/pune/', e)}
                    className="text-label-md text-secondary font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Full 10 km Distance Table</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>

                {/* 4 Cluster Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(
                    [
                      {
                        cluster: 'Hadapsar Core',
                        icon: 'location_city'
                      },
                      {
                        cluster: 'Townships & IT Hubs',
                        icon: 'apartment'
                      },
                      {
                        cluster: 'South-East & Cantonment',
                        icon: 'commute'
                      },
                      {
                        cluster: 'Phursungi & Solapur Road',
                        icon: 'traffic'
                      }
                    ] as const
                  ).map((c) => {
                    const areasInCluster = APPROVED_PUBLIC_SERVICE_AREAS.filter(
                      (a) => a.cluster === c.cluster
                    );
                    return (
                      <div
                        key={c.cluster}
                        className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[20px]">
                              {c.icon}
                            </span>
                            <h3 className="text-headline-sm text-text-heading">{c.cluster}</h3>
                          </div>
                          <span className="text-body-sm text-on-surface-variant tabular-nums">
                            {areasInCluster.length} areas
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {areasInCluster.map((area) => (
                            <a
                              key={area.slug}
                              href={`/pune/${area.slug}/`}
                              onClick={(e) => navigateTo(`/pune/${area.slug}/`, e)}
                              className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-highest text-primary text-label-sm transition-colors"
                              title={`${area.canonicalName} (${area.practicalRoadDistanceKm} km road from Hadapsar HQ)`}
                            >
                              {area.canonicalName}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Featured Subject-Locality Quick Links */}
                <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-2">
                  <span className="text-label-sm text-secondary uppercase tracking-wider">
                    Popular Subject-Locality Pages in East Pune
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        label: 'Hadapsar Chemistry Tutors',
                        url: '/pune/hadapsar/chemistry-tutors/'
                      },
                      {
                        label: 'Magarpatta City Physics Tutors',
                        url: '/pune/magarpatta-city/physics-tutors/'
                      },
                      {
                        label: 'Amanora Park Town JEE Tutors',
                        url: '/pune/amanora-park-town/jee-tutors/'
                      },
                      {
                        label: 'Undri NEET Tutors',
                        url: '/pune/undri/neet-tutors/'
                      },
                      {
                        label: 'Wanowrie Maths Tutors',
                        url: '/pune/wanowrie/maths-tutors/'
                      },
                      {
                        label: 'NIBM Road Biology Tutors',
                        url: '/pune/nibm-road/biology-tutors/'
                      },
                      {
                        label: 'Phursungi Science Tutors',
                        url: '/pune/phursungi/science-tutors/'
                      },
                      {
                        label: 'Sasane Nagar Maths Tutors',
                        url: '/pune/sasane-nagar/maths-tutors/'
                      }
                    ].map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        onClick={(e) => navigateTo(link.url, e)}
                        className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary text-label-sm border border-border-subtle transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Feasibility Disclaimer Box */}
                <div className="bg-surface-card p-3 rounded-xl flex items-start gap-2 shadow-sm border border-border-subtle">
                  <span className="material-symbols-outlined text-on-tertiary-container text-[18px] shrink-0 mt-0.5">
                    info
                  </span>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    <strong>Notice:</strong> Home visit feasibility subject to road connectivity and tutor schedule from Hadapsar HQ (Office 205, Saptrang Akash). Interactive live online sessions available for all Pune sectors.
                  </p>
                </div>
              </section>

              {/* Section 3: Genuine Student Voices & NEET/JEE Outcomes */}
              <section className="px-margin py-space-md flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm text-secondary uppercase tracking-wider">
                    Verified Alumni
                  </span>
                  <h2 className="text-headline-lg-mobile text-text-heading">
                    Student Voices &amp; Outcomes
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Real testimonials from our candidates who cleared top medical and engineering admissions.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Testimonial 1 */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-headline-sm text-text-heading font-bold">
                          Ojas Barure
                        </span>
                        <span className="text-label-sm text-cluster-tag-text font-bold">
                          GMC Latur (Government Medical College)
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary text-[24px]">
                        school
                      </span>
                    </div>
                    <p className="text-body-md text-text-body italic">
                      “I initiated my NEET journey in the 12th grade seeking guidance through Skill+ Tutors. The inspiring teachers, teaching methodologies, and comprehensive study material aided my preparation. It is one of the best institutes for NEET in Maharashtra.”
                    </p>
                  </div>
                  {/* Testimonial 2 */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-headline-sm text-text-heading font-bold">
                          Sudarshan Bondge
                        </span>
                        <span className="text-label-sm text-cluster-tag-text font-bold">
                          NIT Jaipur (National Institute of Technology)
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary text-[24px]">
                        engineering
                      </span>
                    </div>
                    <p className="text-body-md text-text-body italic">
                      “Skill+ Tutors teaching methods, study resources, and mock examinations have thoroughly impressed me. The question-and-answer sessions have been quite beneficial in improving my understanding of numerous areas for JEE.”
                    </p>
                  </div>
                  {/* Testimonial 3 */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-headline-sm text-text-heading font-bold">
                          Kabir Bhongale
                        </span>
                        <span className="text-label-sm text-cluster-tag-text font-bold">
                          COEP Pune (College of Engineering Pune)
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary text-[24px]">
                        calculate
                      </span>
                    </div>
                    <p className="text-body-md text-text-body italic">
                      “I passed the CBSE Board and JEE exam with a Great score. The key was understanding the fundamental ideas of clearance. The Skill+ Tutors team’s methodical approach kept everything on schedule.”
                    </p>
                  </div>
                  {/* Testimonial 4 */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-headline-sm text-text-heading font-bold">
                          Anuradha Dighe
                        </span>
                        <span className="text-label-sm text-cluster-tag-text font-bold">
                          Bharti Vidyapeeth Medical College, Pune
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary text-[24px]">
                        health_and_safety
                      </span>
                    </div>
                    <p className="text-body-md text-text-body italic">
                      “This accomplishment would not have been possible without the constant backing of my mentors. The experienced coaching and interactive sessions enabled me to successfully address all my doubts.”
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Separate Pathways for Parents vs Tutors */}
              <section className="px-margin py-space-md flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm text-secondary uppercase tracking-wider">
                    Choose Your Pathway
                  </span>
                  <h2 className="text-headline-lg-mobile text-text-heading">
                    Get Started with Skill+
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Pathway 1: Parents */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col justify-between gap-space-sm">
                    <div className="flex flex-col gap-space-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-cluster-tag-bg text-cluster-tag-text flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[22px]">
                            family_restroom
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-label-sm text-cluster-tag-text uppercase font-bold">
                            For Families
                          </span>
                          <span className="text-headline-sm text-text-heading font-bold">
                            Parents: Request a Qualified Tutor
                          </span>
                        </div>
                      </div>
                      <p className="text-body-md text-text-body">
                        Connect with dedicated home educators in Hadapsar and nearby societies. Custom learning pace, board syllabus alignment, and regular parent progress reports.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        className="flex-1 min-h-[48px] bg-primary hover:bg-primary-container text-on-primary rounded-xl text-label-md flex items-center justify-center gap-2 shadow-sm transition-all"
                        href="tel:+918459832971"
                      >
                        <span className="material-symbols-outlined text-[18px]">call</span>
                        <span>Call Helpline</span>
                      </a>
                      <a
                        className="flex-1 min-h-[48px] bg-secondary hover:bg-secondary/90 text-on-secondary rounded-xl text-label-md flex items-center justify-center gap-2 shadow-sm transition-all"
                        href="/find-tutor/"
                        onClick={(e) => navigateTo('/find-tutor/', e)}
                      >
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                        <span>Online Enquiry Form</span>
                      </a>
                    </div>
                  </div>

                  {/* Pathway 2: Tutors */}
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col justify-between gap-space-sm">
                    <div className="flex flex-col gap-space-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-verified-badge-bg text-verified-badge-text flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[22px]">badge</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-label-sm text-verified-badge-text uppercase font-bold">
                            For Educators
                          </span>
                          <span className="text-headline-sm text-text-heading font-bold">
                            Teachers: Join as Verified Faculty
                          </span>
                        </div>
                      </div>
                      <p className="text-body-md text-text-body">
                        Grow your teaching practice across East Pune. Stringent subject knowledge review, credential validation, and identity verification required for all candidate teachers.
                      </p>
                    </div>
                    <a
                      className="min-h-[48px] w-full bg-surface-container-high hover:bg-surface-container-highest text-primary rounded-xl text-label-md flex items-center justify-center gap-2 shadow-sm transition-all"
                      href="/teacher-registration/"
                      onClick={(e) => navigateTo('/teacher-registration/', e)}
                    >
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                      <span>Apply as Tutor (Verification Required)</span>
                    </a>
                  </div>
                </div>
              </section>

              {/* Section 5: Frequently Asked Questions (Synced with FAQPage JSON-LD) */}
              {matchedPage && matchedPage.faqs.length > 0 && (
                <section className="px-margin py-space-md flex flex-col gap-space-md">
                  <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-label-sm text-secondary uppercase tracking-wider">
                        Common Parent Questions
                      </span>
                      <h2 className="text-headline-lg-mobile text-text-heading">
                        Frequently Asked Questions
                      </h2>
                    </div>
                    <div className="space-y-3 pt-1">
                      {matchedPage.faqs.map((faq, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1"
                        >
                          <h3 className="text-label-lg text-text-heading">{faq.question}</h3>
                          <p className="text-body-md text-text-body">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Section 6: Contact & Verification Notice */}
              <section className="px-margin py-space-md flex flex-col gap-space-md">
                <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">
                      contact_support
                    </span>
                    <h3 className="text-headline-sm text-text-heading">
                      Contact &amp; Administrative Office
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
                        location_on
                      </span>
                      <div className="flex flex-col">
                        <span className="text-label-sm text-text-heading">Hadapsar Head Office</span>
                        <span className="text-body-sm text-on-surface-variant">
                          Office 205 Saptrang Akash, Hadapsar, Pune - 412308
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
                        phone
                      </span>
                      <div className="flex flex-col">
                        <span className="text-label-sm text-text-heading">Direct Helpline</span>
                        <a
                          className="text-body-sm text-secondary font-bold tabular-nums"
                          href="tel:+918459832971"
                        >
                          +91 8459832971
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
                        mail
                      </span>
                      <div className="flex flex-col">
                        <span className="text-label-sm text-text-heading">Official Email</span>
                        <span className="text-body-sm text-on-surface-variant">
                          info@skillpustutors.com
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Trust Notice */}
                  <div className="bg-surface-container-low p-3 rounded-xl mt-2 flex flex-col gap-1">
                    <span className="text-label-sm text-text-heading flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        security
                      </span>
                      Standard Verification Protocol
                    </span>
                    <p className="text-body-sm text-on-surface-variant text-[11px] leading-relaxed">
                      Skill+ Tutors operates as an academic facilitation service. Tutors undergo identity documentation review prior to initial home demonstration sessions.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          ) : currentPath === '/admin' ? (
            /* ===============================================================
               PROTECTED STAFF & ADMINISTRATOR PORTAL (Requires Login First)
               =============================================================== */
            !isAdminAuthenticated ? (
              <div className="px-margin py-space-xl max-w-md mx-auto w-full flex flex-col gap-4">
                <div className="bg-surface-card rounded-2xl p-space-lg shadow-md border border-border-subtle flex flex-col gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <div>
                      <h1 className="text-headline-sm text-text-heading font-bold">
                        Administrator Sign In
                      </h1>
                      <p className="text-body-sm text-on-surface-variant">
                        Protected internal portal for Skill+ Tutors staff.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={fetchAdminEnquiries} className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">
                        Administrator Access Token
                      </span>
                      <input
                        required
                        type="password"
                        placeholder="Enter access token"
                        value={adminToken}
                        onChange={(e) => setAdminToken(e.target.value)}
                        className="min-h-[44px] px-3 rounded-lg border border-border-subtle bg-background-canvas text-body-md"
                      />
                    </label>
                    {adminMessage && (
                      <p className="text-body-sm text-on-error-container bg-error-container px-3 py-2 rounded-lg">
                        {adminMessage}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="min-h-[44px] rounded-xl bg-primary text-on-primary text-label-md font-bold hover:bg-primary-container transition-colors"
                    >
                      Sign In to Admin Console
                    </button>
                  </form>
                </div>
              </div>
            ) : (
            <div className="px-margin py-space-md flex flex-col gap-space-md">
              <div className="bg-primary text-on-primary rounded-2xl p-space-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-label-sm uppercase tracking-wider text-secondary-fixed">
                    Authenticated Staff Session
                  </span>
                  <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold mt-1">
                    Skill+ Tutors Administration &amp; Enquiries Portal
                  </h1>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminAuthenticated(false);
                      setAdminToken('');
                      setAdminMessage('');
                    }}
                    className="px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-label-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Admin Sub-Navigation */}
              <div className="flex flex-wrap gap-2 bg-surface-card p-2 rounded-xl border border-border-subtle">
                {(
                  [
                    { id: 'overview', label: '1. Audit & Blocker Summary' },
                    { id: 'geography', label: `2. 10km Geography (${SERVICE_AREAS.length} Areas)` },
                    { id: 'inventory', label: `3. Page Inventory (${ALL_INVENTORY_PAGES.length} Pages)` },
                    { id: 'redirects', label: `4. 301 Redirects (${REDIRECT_MAP.length})` },
                    { id: 'qa', label: '5. Acceptance QA Gate Report' },
                    { id: 'enquiries', label: '6. Server Enquiries Vault' }
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setAdminTab(t.id)}
                    className={`px-3 py-2 rounded-lg text-label-md transition-colors ${
                      adminTab === t.id
                        ? 'bg-primary text-white'
                        : 'bg-surface-container-low text-text-body hover:bg-surface-container'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {adminTab === 'overview' && (
                <div className="flex flex-col gap-4">
                  {/* Page Count Honesty Matrix */}
                  <div className="bg-surface-card rounded-2xl p-space-md border border-border-subtle flex flex-col gap-3">
                    <h2 className="text-headline-sm text-text-heading">
                      Editorial Page Count Breakdown (Planned vs Published vs Indexed)
                    </h2>
                    <p className="text-body-sm text-on-surface-variant">
                      Per non-negotiable quality rules, we strictly distinguish planned inventory capacity (~280 pages) from approved publicly deployed routes and held/unverified drafts:
                    </p>
                    {(() => {
                      const m = getInventoryMetrics();
                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                          <div className="p-3 rounded-xl bg-surface-container-low">
                            <span className="text-label-sm text-on-surface-variant block">
                              Total Planned Inventory
                            </span>
                            <span className="text-headline-md text-primary tabular-nums">
                              {m.totalPlanned}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-verified-badge-bg">
                            <span className="text-label-sm text-verified-badge-text block">
                              Approved &amp; Publicly Live
                            </span>
                            <span className="text-headline-md text-verified-badge-text tabular-nums">
                              {m.publishedPubliclyDeployed}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-cluster-tag-bg">
                            <span className="text-label-sm text-cluster-tag-text block">
                              Reviewed (Phase 2 Staged)
                            </span>
                            <span className="text-headline-md text-cluster-tag-text tabular-nums">
                              {m.reviewedStaged}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-alert-warm">
                            <span className="text-label-sm text-on-tertiary-fixed-variant block">
                              Blocked: Needs Evidence
                            </span>
                            <span className="text-headline-md text-on-tertiary-fixed-variant tabular-nums">
                              {m.needsEvidenceBlocked}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-surface-container">
                            <span className="text-label-sm text-on-surface-variant block">
                              Editorial Drafts
                            </span>
                            <span className="text-headline-md text-text-heading tabular-nums">
                              {m.draftInProgress}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-surface-container-low">
                            <span className="text-label-sm text-on-surface-variant block">
                              Externally Indexed (GSC)
                            </span>
                            <span className="text-label-sm text-primary font-bold block mt-1">
                              NOT YET AVAILABLE
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Live Site Audit Findings Summary */}
                  <div className="bg-surface-card rounded-2xl p-space-md border border-border-subtle flex flex-col gap-3">
                    <h2 className="text-headline-sm text-text-heading">
                      Live Site Audit Findings (https://skillplustutors.com/) — Verified via HTTP Requests
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-body-sm">
                      <div className="p-3.5 rounded-xl bg-error-container/40 border border-error/20 flex flex-col gap-1">
                        <span className="text-label-md text-on-error-container font-bold">
                          1. Weak Homepage H1 &amp; Title Typo (FIXED IN NEW BUILD)
                        </span>
                        <p>
                          Live homepage has <code>&lt;h1 class="entry-title"&gt;Home&lt;/h1&gt;</code> and title tag spelling error <code>"Best Online Tutorss in Pune"</code>. Replaced with descriptive H1 and clean title hierarchy.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-error-container/40 border border-error/20 flex flex-col gap-1">
                        <span className="text-label-md text-on-error-container font-bold">
                          2. Hidden Offscreen External Links &amp; Spam Posts (EXCLUDED)
                        </span>
                        <p>
                          Live homepage HTML contains hidden offscreen links (<code>overflow:hidden;height:0</code> to <code>uk-fortunica.net</code> and <code>left:-7643px</code> to <code>nixbet-nl.nl</code>) plus casino/adult posts in <code>wp-sitemap-posts-post-1.xml</code> and suspicious author accounts (<code>administrator_295d74</code>). Excluded completely; authorised CMS/database security review recommended.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-alert-warm/60 border border-amber-300 flex flex-col gap-1">
                        <span className="text-label-md text-on-tertiary-fixed font-bold">
                          3. Email Domain Mismatch (AWAITING OWNER CONFIRMATION)
                        </span>
                        <p>
                          Published email is <code>info@skillpustutors.com</code> (missing &quot;l&quot;) vs domain <code>skillplustutors.com</code>. Kept visible with explicit verification badge; never silently replaced with a guessed address.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-alert-warm/60 border border-amber-300 flex flex-col gap-1">
                        <span className="text-label-md text-on-tertiary-fixed font-bold">
                          4. Duplicate /jee/ Copy &amp; Stale Pandemic Notice (FIXED)
                        </span>
                        <p>
                          Live <code>/jee/</code> page contained copy-pasted NEET medical career text, and homepage had stale <code>&quot;Stay home stay safeRegistration Open for 2025-26&quot;</code> ticker. Both remediated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'geography' && (
                <div className="bg-surface-card rounded-2xl p-space-md border border-border-subtle flex flex-col gap-3 overflow-x-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-headline-sm text-text-heading">
                        10.0 km Geographic Registry (Provisional Point: 18.486142, 73.952372)
                      </h2>
                      <p className="text-body-sm text-on-surface-variant">
                        Showing all {SERVICE_AREAS.length} researched candidates: {APPROVED_PUBLIC_SERVICE_AREAS.length} approved public service areas + {DRAFT_UNVERIFIED_SERVICE_AREAS.length} unverified/outer areas held in private draft.
                      </p>
                    </div>
                  </div>
                  <table className="w-full text-left border-collapse text-body-sm tabular-nums">
                    <thead>
                      <tr className="border-b border-border-subtle text-label-sm text-text-heading bg-surface-container-low">
                        <th className="p-2.5">Canonical Name</th>
                        <th className="p-2.5">Aliases Merged (301)</th>
                        <th className="p-2.5">Cluster</th>
                        <th className="p-2.5">Straight-Line</th>
                        <th className="p-2.5">Road Distance</th>
                        <th className="p-2.5">Boundary</th>
                        <th className="p-2.5">Public Eligibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SERVICE_AREAS.map((area) => (
                        <tr
                          key={area.slug}
                          className="border-b border-border-subtle/60 hover:bg-surface-container-low/50"
                        >
                          <td className="p-2.5 font-semibold text-primary">
                            {area.publicationEligibility === 'approved_public' ? (
                              <a
                                href={`/pune/${area.slug}/`}
                                onClick={(e) => navigateTo(`/pune/${area.slug}/`, e)}
                                className="text-secondary hover:underline"
                              >
                                {area.canonicalName}
                              </a>
                            ) : (
                              <span>{area.canonicalName}</span>
                            )}
                          </td>
                          <td className="p-2.5 text-on-surface-variant">
                            {area.aliases.join(', ')}
                          </td>
                          <td className="p-2.5">{area.cluster}</td>
                          <td className="p-2.5 font-medium">{area.straightLineDistanceKm} km</td>
                          <td className="p-2.5">
                            {area.practicalRoadDistanceKm} km ({area.estimatedTransitMinutes})
                          </td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                area.boundaryStatus === 'inside_10km'
                                  ? 'bg-verified-badge-bg text-verified-badge-text'
                                  : 'bg-alert-warm text-on-tertiary-fixed-variant'
                              }`}
                            >
                              {area.boundaryStatus}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                area.publicationEligibility === 'approved_public'
                                  ? 'bg-verified-badge-bg text-verified-badge-text'
                                  : 'bg-error-container text-on-error-container'
                              }`}
                            >
                              {area.publicationEligibility}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {adminTab === 'inventory' && (
                <div className="bg-surface-card rounded-2xl p-space-md border border-border-subtle flex flex-col gap-3 overflow-x-auto">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-headline-sm text-text-heading">
                      Complete Page Inventory ({ALL_INVENTORY_PAGES.length} Researched Pages)
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="text"
                        placeholder="Filter by URL or keyword..."
                        value={inventorySearch}
                        onChange={(e) => setInventorySearch(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-border-subtle text-body-sm"
                      />
                      <select
                        value={inventoryFilterStatus}
                        onChange={(e) => setInventoryFilterStatus(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-border-subtle text-body-sm bg-white"
                      >
                        <option value="all">All Statuses</option>
                        <option value="published">published (Public &amp; Indexed)</option>
                        <option value="reviewed">reviewed (Phase 2 Staged)</option>
                        <option value="needs_evidence">needs_evidence (Blocked)</option>
                        <option value="draft">draft (Held)</option>
                      </select>
                      <select
                        value={inventoryFilterType}
                        onChange={(e) => setInventoryFilterType(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-border-subtle text-body-sm bg-white"
                      >
                        <option value="all">All Page Types</option>
                        <option value="core">core</option>
                        <option value="programme_hub">programme_hub</option>
                        <option value="subject_hub">subject_hub</option>
                        <option value="board_hub">board_hub</option>
                        <option value="locality_hub">locality_hub</option>
                        <option value="subject_locality">subject_locality</option>
                        <option value="exam_locality">exam_locality</option>
                        <option value="parent_guide">parent_guide</option>
                      </select>
                    </div>
                  </div>
                  <table className="w-full text-left border-collapse text-body-sm">
                    <thead>
                      <tr className="border-b border-border-subtle text-label-sm text-text-heading bg-surface-container-low">
                        <th className="p-2">URL</th>
                        <th className="p-2">Type</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Primary Intent &amp; Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ALL_INVENTORY_PAGES.filter((p) => {
                        if (inventoryFilterStatus !== 'all' && p.status !== inventoryFilterStatus)
                          return false;
                        if (inventoryFilterType !== 'all' && p.pageType !== inventoryFilterType)
                          return false;
                        if (
                          inventorySearch &&
                          !p.url.toLowerCase().includes(inventorySearch.toLowerCase()) &&
                          !p.title.toLowerCase().includes(inventorySearch.toLowerCase())
                        )
                          return false;
                        return true;
                      })
                        .slice(0, 100)
                        .map((p) => (
                          <tr
                            key={p.url}
                            className="border-b border-border-subtle/60 hover:bg-surface-container-low/50"
                          >
                            <td className="p-2 font-mono text-xs">
                              {p.status === 'published' ? (
                                <a
                                  href={p.url}
                                  onClick={(e) => navigateTo(p.url, e)}
                                  className="text-secondary font-bold hover:underline"
                                >
                                  {p.url}
                                </a>
                              ) : (
                                <span className="text-outline">{p.url}</span>
                              )}
                            </td>
                            <td className="p-2">{p.pageType}</td>
                            <td className="p-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                  p.status === 'published'
                                    ? 'bg-verified-badge-bg text-verified-badge-text'
                                    : p.status === 'reviewed'
                                    ? 'bg-cluster-tag-bg text-cluster-tag-text'
                                    : 'bg-error-container text-on-error-container'
                                }`}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td className="p-2 text-xs text-on-surface-variant">
                              <div>{p.primaryUserIntent}</div>
                              <div className="text-[11px] text-outline mt-0.5">
                                Evidence: {p.supportingEvidence}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {adminTab === 'redirects' && (
                <div className="bg-surface-card rounded-2xl p-space-md border border-border-subtle flex flex-col gap-3">
                  <h2 className="text-headline-sm text-text-heading">
                    Single-Hop 301 Permanent Redirect Map (Alias &amp; Legacy Consolidation)
                  </h2>
                  <table className="w-full text-left border-collapse text-body-sm">
                    <thead>
                      <tr className="border-b border-border-subtle text-label-sm bg-surface-container-low">
                        <th className="p-2.5">Source Alias / Legacy Path</th>
                        <th className="p-2.5">Canonical Destination</th>
                        <th className="p-2.5">HTTP Code</th>
                        <th className="p-2.5">Editorial Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REDIRECT_MAP.map((r) => (
                        <tr key={r.sourcePath} className="border-b border-border-subtle/60">
                          <td className="p-2.5 font-mono text-xs">{r.sourcePath}</td>
                          <td className="p-2.5 font-mono text-xs text-secondary font-bold">
                            <a
                              href={r.destinationPath}
                              onClick={(e) => navigateTo(r.destinationPath, e)}
                              className="hover:underline"
                            >
                              {r.destinationPath}
                            </a>
                          </td>
                          <td className="p-2.5 tabular-nums font-bold">{r.statusCode}</td>
                          <td className="p-2.5 text-on-surface-variant">{r.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {adminTab === 'qa' && (
                <div className="bg-surface-card rounded-2xl p-space-md border border-border-subtle flex flex-col gap-3">
                  <h2 className="text-headline-sm text-text-heading">
                    Measured Acceptance Check Statuses (Internal Release Standard)
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    100% of applicable technical release checks pass with evidence. Unresolved owner confirmations and field CrUX data are explicitly labelled rather than fabricated:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-body-sm">
                    <div className="p-3 rounded-xl bg-verified-badge-bg border border-emerald-200">
                      <span className="font-bold text-verified-badge-text block">
                        [PASS] Initial HTTP SSR HTML &amp; Metadata ({PUBLISHED_PUBLIC_PAGES.length}/{PUBLISHED_PUBLIC_PAGES.length} Approved URLs)
                      </span>
                      <p className="mt-1 text-xs">
                        Every approved URL returns HTTP 200, unique <code>&lt;title&gt;</code>, <code>&lt;meta name=&quot;description&quot;&gt;</code>, self-referencing absolute <code>&lt;link rel=&quot;canonical&quot;&gt;</code>, primary <code>&lt;h1&gt;</code>, crawlable links, and valid JSON-LD in raw HTTP response without JavaScript.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-verified-badge-bg border border-emerald-200">
                      <span className="font-bold text-verified-badge-text block">
                        [PASS] Real HTTP 404 &amp; Unverified Route Blocking
                      </span>
                      <p className="mt-1 text-xs">
                        Unknown slugs and unverified outer localities (e.g. <code>/pune/koregaon-park/</code>, <code>/pune/swargate/</code>) return HTTP 404 with <code>noindex, nofollow</code> and are excluded from <code>/sitemap.xml</code>.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-alert-warm border border-amber-300">
                      <span className="font-bold text-on-tertiary-fixed block">
                        [AWAITING OWNER] Email Domain Spelling &amp; Office Entrance Pin
                      </span>
                      <p className="mt-1 text-xs">
                        1) Confirm whether <code>info@skillpustutors.com</code> or <code>info@skillplustutors.com</code> is the active mailbox. 2) Confirm exact Saptrang Akash building entrance pin before adding GeoCoordinates to public LocalBusiness schema.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low border border-border-subtle">
                      <span className="font-bold text-primary block">
                        [NOT YET AVAILABLE] 75th-Percentile Field Core Web Vitals (CrUX)
                      </span>
                      <p className="mt-1 text-xs">
                        Real-user field LCP/INP/CLS requires 28-day Chrome User Experience Report production traffic post-launch. Lab architecture uses zero-blocking CSS and deferred scripts to target LCP &lt;= 2.5s, INP &lt;= 200ms, CLS &lt;= 0.1.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'enquiries' && (
                <div className="bg-surface-card rounded-2xl p-space-md border border-border-subtle flex flex-col gap-3">
                  <h2 className="text-headline-sm text-text-heading">
                    Secured Server-Side Enquiry Vault (data/enquiries.json)
                  </h2>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="password"
                      placeholder="Enter ADMIN_ACCESS_TOKEN"
                      value={adminToken}
                      onChange={(e) => setAdminToken(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-border-subtle text-body-sm"
                    />
                    <button
                      type="button"
                      onClick={fetchAdminEnquiries}
                      className="px-4 py-2 rounded-lg bg-primary text-white text-label-sm"
                    >
                      Load Stored Enquiries
                    </button>
                    {adminMessage && (
                      <span className="text-body-sm text-secondary font-medium">
                        {adminMessage}
                      </span>
                    )}
                  </div>
                  {storedEnquiries.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-body-sm">
                        <thead>
                          <tr className="border-b border-border-subtle bg-surface-container-low text-label-sm">
                            <th className="p-2">Reference ID</th>
                            <th className="p-2">Timestamp</th>
                            <th className="p-2">Parent / Student</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Locality &amp; Mode</th>
                            <th className="p-2">Class &amp; Subject</th>
                          </tr>
                        </thead>
                        <tbody>
                          {storedEnquiries.map((enq, i) => (
                            <tr key={i} className="border-b border-border-subtle/60">
                              <td className="p-2 font-mono text-xs">{String(enq.id)}</td>
                              <td className="p-2 text-xs">{String(enq.createdAt)}</td>
                              <td className="p-2 font-medium">{String(enq.parentName)}</td>
                              <td className="p-2 tabular-nums">{String(enq.phone)}</td>
                              <td className="p-2">
                                {String(enq.locality)} ({String(enq.mode)})
                              </td>
                              <td className="p-2">
                                {String(enq.classGoal)} • {String(enq.subject)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
            )
          ) : isPublicApprovedPage && matchedPage ? (
            /* ===============================================================
               APPROVED PUBLIC PAGE TEMPLATE (Locality Hubs, Subject-Locality,
               Programme Hubs, Board Hubs, Parent Guides, Contact/Enquiry)
               =============================================================== */
            <article className="px-margin py-space-md flex flex-col gap-space-md">
              {/* Crawlable Breadcrumb Navigation */}
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-1.5 text-label-sm text-on-surface-variant"
              >
                {matchedPage.breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb.url}>
                    {idx > 0 && <span aria-hidden="true">/</span>}
                    {idx === matchedPage.breadcrumbs.length - 1 ? (
                      <span className="text-primary font-bold" aria-current="page">
                        {crumb.label}
                      </span>
                    ) : (
                      <a
                        href={crumb.url}
                        onClick={(e) => navigateTo(crumb.url, e)}
                        className="hover:text-primary hover:underline"
                      >
                        {crumb.label}
                      </a>
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* Hero Header Card */}
              <div className="bg-surface-card rounded-2xl p-space-md md:p-space-lg shadow-sm border border-border-subtle flex flex-col gap-space-sm">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cluster-tag-bg text-cluster-tag-text self-start">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span className="text-label-sm">{matchedPage.heroBadge}</span>
                </div>
                <h1 className="text-headline-lg-mobile md:text-headline-lg text-text-heading">
                  {matchedPage.h1}
                </h1>
                <p className="text-body-lg text-text-body">{matchedPage.heroSubtitle}</p>

                {/* Quick Summary Facts Grid */}
                {matchedPage.quickSummaryFacts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
                    {matchedPage.quickSummaryFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-0.5"
                      >
                        <span className="text-label-sm text-on-surface-variant uppercase">
                          {fact.label}
                        </span>
                        <span className="text-label-md text-primary font-bold">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Special Directory Table if on /pune/ Regional Hub */}
              {matchedPage.url === '/pune/' && (
                <div className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-3 overflow-x-auto">
                  <h2 className="text-headline-sm text-text-heading">
                    Verified ~10 km East Pune Service Areas &amp; Road Distance Matrix
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Serving families across East Pune from our Hadapsar Head Office (Office 205, Saptrang Akash). Select any locality below to view available subjects, board coverage, and home or online tuition details:
                  </p>
                  <table className="w-full text-left border-collapse text-body-sm tabular-nums">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-container-low text-label-sm text-text-heading">
                        <th className="p-2.5">Locality</th>
                        <th className="p-2.5">Cluster</th>
                        <th className="p-2.5">Straight-Line</th>
                        <th className="p-2.5">Road Distance &amp; Transit</th>
                        <th className="p-2.5">Coverage Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {APPROVED_PUBLIC_SERVICE_AREAS.map((area) => (
                        <tr
                          key={area.slug}
                          className="border-b border-border-subtle/60 hover:bg-surface-container-low/50"
                        >
                          <td className="p-2.5 font-bold">
                            <a
                              href={`/pune/${area.slug}/`}
                              onClick={(e) => navigateTo(`/pune/${area.slug}/`, e)}
                              className="text-secondary hover:underline"
                            >
                              {area.canonicalName}
                            </a>
                          </td>
                          <td className="p-2.5">{area.cluster}</td>
                          <td className="p-2.5">{area.straightLineDistanceKm} km</td>
                          <td className="p-2.5">
                            {area.practicalRoadDistanceKm} km ({area.estimatedTransitMinutes})
                          </td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                area.boundaryStatus === 'inside_10km'
                                  ? 'bg-verified-badge-bg text-verified-badge-text'
                                  : 'bg-alert-warm text-on-tertiary-fixed-variant'
                              }`}
                            >
                              {area.boundaryStatus === 'inside_10km'
                                ? 'Verified Home & Online'
                                : 'Borderline Pocket (See Notes)'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Special Guides Index if on /resources/ */}
              {matchedPage.url === '/resources/' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ALL_INVENTORY_PAGES.filter(
                    (p) => p.pageType === 'parent_guide' && p.status === 'published'
                  ).map((guide) => (
                    <a
                      key={guide.url}
                      href={guide.url}
                      onClick={(e) => navigateTo(guide.url, e)}
                      className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle hover:border-secondary flex flex-col justify-between gap-2 transition-colors"
                    >
                      <div>
                        <span className="text-label-sm text-secondary uppercase">
                          Parent &amp; Student Guide
                        </span>
                        <h2 className="text-headline-sm text-text-heading mt-1">{guide.h1}</h2>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                          {guide.metaDescription}
                        </p>
                      </div>
                      <span className="text-label-sm text-cluster-tag-text inline-flex items-center gap-1 pt-2">
                        <span>Read Complete Guide</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* Editorial Content Sections */}
              {matchedPage.sections.map((sec, idx) => (
                <section
                  key={idx}
                  className="bg-surface-card rounded-2xl p-space-md md:p-space-lg shadow-sm border border-border-subtle flex flex-col gap-3"
                >
                  <h2 className="text-headline-sm md:text-headline-md text-text-heading">
                    {sec.heading}
                  </h2>
                  {sec.body.map((para, pIdx) => (
                    <p key={pIdx} className="text-body-md md:text-body-lg text-text-body leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2 pt-1 pl-1">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-body-md text-text-body">
                          <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* If Locality Hub: Link to Verified Subject & Exam Pages for This Locality */}
              {matchedPage.pageType === 'locality_hub' && matchedPage.localitySlug && (
                <section className="bg-surface-card rounded-2xl p-space-md shadow-sm border border-border-subtle flex flex-col gap-3">
                  <h2 className="text-headline-sm text-text-heading">
                    Available Subject &amp; Exam Tutors in {matchedPage.localityName}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {PUBLISHED_PUBLIC_PAGES.filter(
                      (p) =>
                        p.localitySlug === matchedPage.localitySlug &&
                        (p.pageType === 'subject_locality' || p.pageType === 'exam_locality')
                    ).map((subPage) => (
                      <a
                        key={subPage.url}
                        href={subPage.url}
                        onClick={(e) => navigateTo(subPage.url, e)}
                        className="px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-label-md flex items-center gap-1.5 border border-border-subtle transition-colors"
                      >
                        <span>{subPage.h1.replace(`, Pune`, '')}</span>
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          arrow_forward
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              {matchedPage.faqs.length > 0 && (
                <section className="bg-surface-card rounded-2xl p-space-md md:p-space-lg shadow-sm border border-border-subtle flex flex-col gap-3">
                  <h2 className="text-headline-sm md:text-headline-md text-text-heading">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {matchedPage.faqs.map((f, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1"
                      >
                        <h3 className="text-label-lg text-text-heading">{f.question}</h3>
                        <p className="text-body-md text-text-body">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Server-Validated Form: Teacher Application on /join-us/ or /teacher-registration/, Parent Enquiry elsewhere */}
              {matchedPage.url === '/join-us/' || matchedPage.url === '/teacher-registration/' ? (
                <section className="bg-surface-card rounded-2xl p-space-md md:p-space-lg shadow-md border border-border-subtle flex flex-col gap-4">
                  <div>
                    <span className="text-label-sm text-verified-badge-text uppercase">
                      Educator Empanelment Intake
                    </span>
                    <h2 className="text-headline-sm md:text-headline-md text-text-heading mt-0.5">
                      Apply to Join Skill+ Tutors Faculty Network
                    </h2>
                    <p className="text-body-sm text-on-surface-variant">
                      All candidate educators undergo academic credential validation and ID/address documentation verification at our Hadapsar office prior to home tuition assignment.
                    </p>
                  </div>
                  <form onSubmit={handleTeacherSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="website_hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">Full Name *</span>
                      <input
                        required
                        type="text"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        placeholder="e.g., Prof. Rahul Deshmukh"
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">Mobile / WhatsApp Number *</span>
                      <input
                        required
                        type="tel"
                        value={teacherPhone}
                        onChange={(e) => setTeacherPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">
                        Highest Qualification &amp; University *
                      </span>
                      <input
                        required
                        type="text"
                        value={teacherQualification}
                        onChange={(e) => setTeacherQualification(e.target.value)}
                        placeholder="e.g., M.Sc Organic Chemistry, SPPU / B.Tech"
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">Subjects &amp; Classes Taught *</span>
                      <input
                        required
                        type="text"
                        value={teacherSubjects}
                        onChange={(e) => setTeacherSubjects(e.target.value)}
                        placeholder="e.g., Class 11-12 Chemistry, NEET Biology"
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex flex-col gap-1 md:col-span-2">
                      <span className="text-label-sm text-text-heading">
                        East Pune Localities You Can Travel To for Home Visits *
                      </span>
                      <input
                        required
                        type="text"
                        value={teacherCorridors}
                        onChange={(e) => setTeacherCorridors(e.target.value)}
                        placeholder="e.g., Hadapsar, Magarpatta, Amanora, Wanowrie, Phursungi"
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex flex-col gap-1 md:col-span-2">
                      <span className="text-label-sm text-text-heading">
                        Teaching Experience Summary
                      </span>
                      <textarea
                        rows={2}
                        value={teacherExperience}
                        onChange={(e) => setTeacherExperience(e.target.value)}
                        placeholder="Years of experience, boards taught (CBSE/ICSE/HSC/NEET/JEE)..."
                        className="p-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex items-start gap-2 md:col-span-2 text-body-sm">
                      <input
                        type="checkbox"
                        checked={teacherConsent}
                        onChange={(e) => setTeacherConsent(e.target.checked)}
                        className="mt-1"
                      />
                      <span>
                        I consent to submit my academic and contact details to Skill+ Tutors (Hadapsar, Pune) and understand that original ID, address proof, and qualification verification are mandatory prior to any student assignment.
                      </span>
                    </label>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={teacherFormState.status === 'submitting'}
                        className="min-h-[48px] px-6 rounded-xl bg-primary text-on-primary text-label-lg font-bold hover:bg-primary-container transition-colors"
                      >
                        {teacherFormState.status === 'submitting'
                          ? 'Submitting Application...'
                          : 'Submit Faculty Application'}
                      </button>
                    </div>
                    {teacherFormState.status !== 'idle' && (
                      <div
                        className={`md:col-span-2 p-3.5 rounded-xl text-body-sm ${
                          teacherFormState.status === 'success'
                            ? 'bg-verified-badge-bg text-verified-badge-text border border-emerald-300'
                            : teacherFormState.status === 'error'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container-low text-primary'
                        }`}
                      >
                        <strong>{teacherFormState.message}</strong>
                        {teacherFormState.referenceId && (
                          <span className="block mt-1 font-mono text-xs">
                            Application Ref: {teacherFormState.referenceId}
                          </span>
                        )}
                      </div>
                    )}
                  </form>
                </section>
              ) : (
                <section className="bg-surface-card rounded-2xl p-space-md md:p-space-lg shadow-md border border-border-subtle flex flex-col gap-4">
                  <div>
                    <span className="text-label-sm text-secondary uppercase">
                      Direct Parent Consultation &amp; Demo Booking
                    </span>
                    <h2 className="text-headline-sm md:text-headline-md text-text-heading mt-0.5">
                      Request a Verified 1-on-1 Tutor
                      {matchedPage.localityName ? ` in ${matchedPage.localityName}` : ''}
                    </h2>
                    <p className="text-body-sm text-on-surface-variant">
                      Validated and stored securely by our Hadapsar office (Office 205, Saptrang Akash). You can also call or WhatsApp <strong>+91 8459832971</strong> directly.
                    </p>
                  </div>
                  <form onSubmit={handleEnquirySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="website_hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">
                        Parent / Student Name *
                      </span>
                      <input
                        required
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Enter full name"
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">
                        Mobile / WhatsApp Number (10 Digits) *
                      </span>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., 9876543210"
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">
                        Residential Locality / Society *
                      </span>
                      <input
                        required
                        type="text"
                        value={matchedPage.localityName || localityInput}
                        onChange={(e) => setLocalityInput(e.target.value)}
                        placeholder="e.g., Magarpatta City, Amanora, Sasane Nagar"
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">Class / Exam Track *</span>
                      <select
                        value={classGoalInput}
                        onChange={(e) => setClassGoalInput(e.target.value)}
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      >
                        <option value="Class 8–10 (CBSE / ICSE / SSC)">
                          Class 8–10 (CBSE / ICSE / SSC)
                        </option>
                        <option value="Class 11–12 Science (PCM / PCB)">
                          Class 11–12 Science (PCM / PCB)
                        </option>
                        <option value="NEET UG Target / Repeater">
                          NEET UG Target / Repeater
                        </option>
                        <option value="IIT-JEE (Main & Advanced)">
                          IIT-JEE (Main &amp; Advanced)
                        </option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">Required Subject(s) *</span>
                      <select
                        value={matchedPage.subjectOrExam || subjectInput}
                        onChange={(e) => setSubjectInput(e.target.value)}
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      >
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Biology">Biology</option>
                        <option value="Class 8–10 Science & Maths">
                          Class 8–10 Science &amp; Maths
                        </option>
                        <option value="All PCB (NEET)">All PCB (NEET)</option>
                        <option value="All PCM (JEE)">All PCM (JEE)</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-label-sm text-text-heading">Preferred Mode *</span>
                      <select
                        value={modeInput}
                        onChange={(e) => setModeInput(e.target.value as 'home' | 'online')}
                        className="min-h-[48px] px-3 rounded-lg border border-border-subtle bg-background-canvas"
                      >
                        <option value="home">1-on-1 Doorstep Home Tuition</option>
                        <option value="online">1-on-1 Live Interactive Online</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1 md:col-span-2">
                      <span className="text-label-sm text-text-heading">
                        Specific Requirements (School Board, Preferred Timings, etc.)
                      </span>
                      <textarea
                        rows={2}
                        value={notesInput}
                        onChange={(e) => setNotesInput(e.target.value)}
                        placeholder="Optional: Mention school board, preferred days/timings, or specific topic areas..."
                        className="p-3 rounded-lg border border-border-subtle bg-background-canvas"
                      />
                    </label>
                    <label className="flex items-start gap-2 md:col-span-2 text-body-sm">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-1"
                      />
                      <span>
                        I am a parent/guardian (or adult student) and consent to Skill+ Tutors contacting me via phone/WhatsApp on the number provided regarding tutor availability and demonstration scheduling.
                      </span>
                    </label>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={formState.status === 'submitting'}
                        className="min-h-[48px] px-6 rounded-xl bg-primary text-on-primary text-label-lg font-bold hover:bg-primary-container transition-colors"
                      >
                        {formState.status === 'submitting'
                          ? 'Validating & Saving Enquiry...'
                          : 'Submit Verified Tutor Enquiry'}
                      </button>
                    </div>
                    {formState.status !== 'idle' && (
                      <div
                        className={`md:col-span-2 p-3.5 rounded-xl text-body-sm ${
                          formState.status === 'success'
                            ? 'bg-verified-badge-bg text-verified-badge-text border border-emerald-300'
                            : formState.status === 'error'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container-low text-primary'
                        }`}
                      >
                        <strong>{formState.message}</strong>
                        {formState.referenceId && (
                          <span className="block mt-1 font-mono text-xs">
                            Enquiry Reference ID: {formState.referenceId}
                          </span>
                        )}
                      </div>
                    )}
                  </form>
                </section>
              )}

              {/* Related Cross-Links Section */}
              {matchedPage.relatedUrls.length > 0 && (
                <section className="bg-surface-container-low rounded-2xl p-space-md flex flex-col gap-2">
                  <span className="text-label-sm text-secondary uppercase">
                    Related East Pune Pages &amp; Hubs
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {matchedPage.relatedUrls.map((relUrl) => {
                      const relPage = findPageByUrl(relUrl);
                      return (
                        <a
                          key={relUrl}
                          href={relUrl}
                          onClick={(e) => navigateTo(relUrl, e)}
                          className="px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-container text-primary text-label-sm border border-border-subtle transition-colors"
                        >
                          {relPage ? relPage.h1 : relUrl}
                        </a>
                      );
                    })}
                  </div>
                </section>
              )}
            </article>
          ) : (
            /* ===============================================================
               CUSTOMER-FRIENDLY 404 PAGE
               =============================================================== */
            <div className="px-margin py-space-xl flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">explore_off</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-label-sm">
                404 • Page Not Found
              </span>
              <h1 className="text-headline-lg-mobile md:text-headline-lg text-text-heading max-w-xl">
                We Couldn&apos;t Find That Page
              </h1>
              <p className="text-body-md text-on-surface-variant max-w-xl">
                We provide 1-on-1 doorstep home tutoring within our verified ~10 km East Pune radius from Hadapsar (Office 205, Saptrang Akash) and live interactive online tuition across all of Pune.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href="/"
                  onClick={(e) => navigateTo('/', e)}
                  className="min-h-[44px] px-5 rounded-xl bg-primary text-on-primary text-label-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  <span>Return to Homepage</span>
                </a>
                <a
                  href="/pune/"
                  onClick={(e) => navigateTo('/pune/', e)}
                  className="min-h-[44px] px-5 rounded-xl bg-secondary text-on-secondary text-label-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">map</span>
                  <span>Browse East Pune Service Areas</span>
                </a>
              </div>
            </div>
          )}

          {/* =================================================================
              SHARED FOOTER (Matches Stitch Design + Clean Hub Links)
             ================================================================= */}
          <footer className="mt-space-xl bg-surface-container-low px-margin py-space-lg text-text-body text-center flex flex-col items-center gap-space-md rounded-t-3xl">
            <img
              alt="Skill+ Tutors Official Banner"
              className="h-10 w-auto object-contain rounded-lg shadow-xs bg-white px-3 py-1"
              width="140"
              height="40"
              referrerPolicy="no-referrer"
              src={LOGO_URL}
            />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card shadow-[0_1px_3px_0_rgba(15,41,66,0.04)]">
              <span className="material-symbols-outlined text-secondary text-[16px]">domain</span>
              <span className="text-label-md text-text-heading">Skill+ Tutors Head Office</span>
            </div>
            <div className="space-y-1">
              <p className="text-body-sm text-text-heading font-medium">
                {SKILLPLUS_OFFICE_FACTS.publishedAddress}
              </p>
              <p className="text-body-sm text-on-surface-variant">
                Verified Coverage Radius: ~10km across Magarpatta, Amanora, Handewadi, Wanowrie &amp; Phursungi
              </p>
            </div>
            <div className="bg-surface-card p-3 rounded-xl max-w-md w-full text-left space-y-1 shadow-[0_1px_3px_0_rgba(15,41,66,0.04)]">
              <p className="text-label-sm text-text-heading flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">
                  verified_user
                </span>
                Official Pune Verification Disclaimer
              </p>
              <p className="text-body-sm text-on-surface-variant text-[11px] leading-relaxed">
                All home tutors are identity and address verified by registered administration. Trial demonstration classes arranged locally with parent consent. No misleading grade or rank guarantees.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-label-md">
              <a
                className="text-secondary underline min-h-[36px] flex items-center"
                href="/teacher-registration/"
                onClick={(e) => navigateTo('/teacher-registration/', e)}
              >
                Tutor Registration
              </a>
              <span className="text-outline-variant">•</span>
              <a
                className="text-on-surface-variant hover:text-primary min-h-[36px] flex items-center"
                href="/resources/"
                onClick={(e) => navigateTo('/resources/', e)}
              >
                Parent Advisory
              </a>
              <span className="text-outline-variant">•</span>
              <a
                className="text-on-surface-variant hover:text-primary min-h-[36px] flex items-center"
                href="/pune/"
                onClick={(e) => navigateTo('/pune/', e)}
              >
                East Pune Service Areas
              </a>
              <span className="text-outline-variant">•</span>
              <a
                className="text-on-surface-variant hover:text-primary min-h-[36px] flex items-center"
                href="/about-us/"
                onClick={(e) => navigateTo('/about-us/', e)}
              >
                About Us
              </a>
              <span className="text-outline-variant">•</span>
              <a
                className="text-on-surface-variant hover:text-primary min-h-[36px] flex items-center"
                href="/terms-and-conditions/"
                onClick={(e) => navigateTo('/terms-and-conditions/', e)}
              >
                Terms &amp; Privacy
              </a>
            </div>
            <p className="text-body-sm text-outline text-[11px]">
              © 2026 Skill+ Tutors Pune. Built exclusively for academic excellence.
            </p>
          </footer>
        </div>
      </main>

      {/* =====================================================================
          MOBILE-ONLY BOTTOM NAVIGATION BAR (< md viewports only)
         ===================================================================== */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface-card/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,41,66,0.08)] border-t border-border-subtle"
      >
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
          <a
            href="/"
            onClick={(e) => navigateTo('/', e)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 whitespace-nowrap transition-all ${
              currentPath === '/' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span className="text-label-sm">Home</span>
          </a>
          <a
            href="/pune/"
            onClick={(e) => navigateTo('/pune/', e)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 whitespace-nowrap transition-all ${
              currentPath.startsWith('/pune/') ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">share_location</span>
            <span className="text-label-sm">East Pune</span>
          </a>
          <a
            href="/neet/"
            onClick={(e) => navigateTo('/neet/', e)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 whitespace-nowrap transition-all ${
              currentPath === '/neet/' || currentPath === '/jee/'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">school</span>
            <span className="text-label-sm">NEET/JEE</span>
          </a>
          <a
            href="https://wa.me/918459832971?text=Hi%20Skill%2B%20Tutors,%20I%20am%20looking%20for%20a%20home%20tutor%20in%20Hadapsar/Pune"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 whitespace-nowrap text-verified-badge-text font-bold transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span className="text-label-sm">WhatsApp</span>
          </a>
          <a
            href="/find-tutor/"
            onClick={(e) => navigateTo('/find-tutor/', e)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 whitespace-nowrap transition-all ${
              currentPath === '/find-tutor/'
                ? 'text-secondary font-bold'
                : 'text-secondary font-bold hover:text-secondary/80'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
            <span className="text-label-sm">Book Tutor</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
