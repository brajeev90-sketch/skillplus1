export interface OfficeLocationFact {
  brandName: string;
  legalOrAlternateName: string;
  publishedAddress: string;
  postalCode: string;
  locality: string;
  region: string;
  country: string;
  telephone: string;
  whatsappConfirmed: boolean;
  publishedEmail: string;
  domainName: string;
  emailDomainMismatchNote: string;
  emailOwnerConfirmed: boolean;
  provisionalCoordinates: {
    latitude: number;
    longitude: number;
    source: string;
    sourceUrl: string;
    isOwnerConfirmedPin: boolean;
    verificationNote: string;
  };
  radiusKm: number;
}

export const SKILLPLUS_OFFICE_FACTS: OfficeLocationFact = {
  brandName: 'Skill+ Tutors',
  legalOrAlternateName: 'SkillPlus Tutors',
  publishedAddress: 'Office 205, Saptrang Akash, Hadapsar, Pune - 412308',
  postalCode: '412308',
  locality: 'Hadapsar',
  region: 'Maharashtra',
  country: 'IN',
  telephone: '+91 8459832971',
  whatsappConfirmed: true, // Active Click-to-Chat WhatsApp integration verified on existing live site
  publishedEmail: 'info@skillpustutors.com',
  domainName: 'skillplustutors.com',
  emailDomainMismatchNote:
    'Published footer email (info@skillpustutors.com) omits the letter "l" compared to the live domain (skillplustutors.com). Owner confirmation is required before enabling automated SMTP enquiry delivery to this address. Enquiries are durably stored server-side.',
  emailOwnerConfirmed: false,
  provisionalCoordinates: {
    latitude: 18.486142,
    longitude: 73.952372,
    source: 'Mappls Building Listing (Saptarang Akash, Tukai Darshan, Phursungi / Hadapsar)',
    sourceUrl: 'https://www.mappls.com/',
    isOwnerConfirmedPin: false,
    verificationNote:
      'Provisional research coordinate for building Saptarang Akash near Tukai Darshan / Phursungi (18.486142, 73.952372). Used strictly for 10.0 km radius distance calculation; NOT claimed as an owner-confirmed entrance pin or verified Google Business Profile coordinate in public Schema.org markup.'
  },
  radiusKm: 10.0
};

/**
 * Exact Haversine formula calculating straight-line great-circle distance in km
 */
export function calculateHaversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371.0; // Earth mean radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

export type BoundaryStatus =
  | 'inside_10km'
  | 'borderline_10km'
  | 'outside_10km';

export type TutorCoverageStatus =
  | 'verified_home_and_online'
  | 'borderline_home_and_online'
  | 'online_only_pending_home_verification';

export type PublicationEligibility =
  | 'approved_public'
  | 'private_draft_needs_evidence';

export interface ServiceAreaRecord {
  canonicalName: string;
  slug: string;
  aliases: string[];
  cluster:
    | 'Hadapsar Core'
    | 'Townships & IT Hubs'
    | 'South-East & Cantonment'
    | 'Phursungi & Solapur Road'
    | 'Outer / Borderline Evaluation';
  placeType:
    | 'Sublocality / Residential Hub'
    | 'Integrated Township'
    | 'Residential Pocket / Wasti'
    | 'Urban Corridor / Road'
    | 'Cantonment / Fringe Sector'
    | 'Peri-Urban / Village Panchayat';
  latitude: number;
  longitude: number;
  sourceUrl: string;
  checkedDate: string;
  straightLineDistanceKm: number;
  practicalRoadDistanceKm: number;
  estimatedTransitMinutes: string;
  boundaryStatus: BoundaryStatus;
  actualTutorCoverage: TutorCoverageStatus;
  confidence: 'high' | 'medium' | 'low_pending_owner';
  publicationEligibility: PublicationEligibility;
  routeNotes: string;
  localSchoolsAndSocietiesContext: string;
  supportedSubjects: ('Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'Science')[];
  supportedExamsAndBoards: string[];
}

const OFFICE_LAT = SKILLPLUS_OFFICE_FACTS.provisionalCoordinates.latitude;
const OFFICE_LON = SKILLPLUS_OFFICE_FACTS.provisionalCoordinates.longitude;

interface RawServiceAreaInput {
  canonicalName: string;
  slug: string;
  aliases: string[];
  cluster: ServiceAreaRecord['cluster'];
  placeType: ServiceAreaRecord['placeType'];
  latitude: number;
  longitude: number;
  sourceUrl: string;
  practicalRoadDistanceKm: number;
  estimatedTransitMinutes: string;
  boundaryStatus: BoundaryStatus;
  actualTutorCoverage: TutorCoverageStatus;
  confidence: ServiceAreaRecord['confidence'];
  publicationEligibility: PublicationEligibility;
  routeNotes: string;
  localSchoolsAndSocietiesContext: string;
  supportedSubjects: ServiceAreaRecord['supportedSubjects'];
  supportedExamsAndBoards: string[];
}

const RAW_SERVICE_AREAS: RawServiceAreaInput[] = [
  // CLUSTER 1: HADAPSAR CORE
  {
    canonicalName: 'Hadapsar',
    slug: 'hadapsar',
    aliases: ['Hadapsar Pune', 'Hadapsar Central'],
    cluster: 'Hadapsar Core',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5089,
    longitude: 73.9259,
    sourceUrl: 'https://www.openstreetmap.org/node/317025128',
    practicalRoadDistanceKm: 4.6,
    estimatedTransitMinutes: '12–18 mins via Sasane Nagar Rd or NH-65',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Primary operational hub with direct 1-on-1 home visit faculty and administrative coordination at Saptrang Akash.',
    localSchoolsAndSocietiesContext: 'Serves families across central Hadapsar residential societies preparing for CBSE, ICSE, SSC, HSC, JEE, and NEET.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Hadapsar Gadital',
    slug: 'hadapsar-gadital',
    aliases: ['Gadital', 'Gadital Hadapsar'],
    cluster: 'Hadapsar Core',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4988,
    longitude: 73.9389,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4988/73.9389',
    practicalRoadDistanceKm: 2.5,
    estimatedTransitMinutes: '8–12 mins via Pune-Solapur Highway',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Major Hadapsar transit junction 2.5 km by road from Saptrang Akash; fast evening tutor dispatch.',
    localSchoolsAndSocietiesContext: 'High concentration of Class 10 SSC/CBSE and Class 11–12 Science students near Gadital Chowk and Gliding Centre approach.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Sasane Nagar',
    slug: 'sasane-nagar',
    aliases: ['Sasane Nagar Hadapsar'],
    cluster: 'Hadapsar Core',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4912,
    longitude: 73.9348,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4912/73.9348',
    practicalRoadDistanceKm: 2.4,
    estimatedTransitMinutes: '8–14 mins via Kalepadal-Sasane Nagar Link',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Direct internal road access from Tukai Darshan/Kalepadal without crossing major highway bottlenecks.',
    localSchoolsAndSocietiesContext: 'Dense apartment clusters requiring evening 1-on-1 home tutors for Class 8–10 Mathematics/Science and 11–12 PCM/PCB.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Malwadi',
    slug: 'malwadi',
    aliases: ['Malwadi Hadapsar', 'DP Road Hadapsar'],
    cluster: 'Hadapsar Core',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5028,
    longitude: 73.9324,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.5028/73.9324',
    practicalRoadDistanceKm: 3.5,
    estimatedTransitMinutes: '10–15 mins via Gadital and Malwadi DP Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Well-connected residential pocket between Gadital and Amanora approach road.',
    localSchoolsAndSocietiesContext: 'Active parent enquiries for CBSE/SSC board foundations and 12th HSC Science practical + theory revision.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Satavwadi',
    slug: 'satavwadi',
    aliases: ['Satavwadi Hadapsar'],
    cluster: 'Hadapsar Core',
    placeType: 'Residential Pocket / Wasti',
    latitude: 18.4962,
    longitude: 73.9415,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4962/73.9415',
    practicalRoadDistanceKm: 2.1,
    estimatedTransitMinutes: '6–10 mins via NH-65 Service Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Located immediately north-west of the Saptrang Akash / Tukai Darshan sector.',
    localSchoolsAndSocietiesContext: 'Strong demand for Class 9–10 Mathematics and Science home tuition and Class 11–12 Chemistry/Biology.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['SSC', 'HSC', 'CBSE', 'NEET']
  },
  {
    canonicalName: 'Gondhale Nagar',
    slug: 'gondhale-nagar',
    aliases: ['Gondhalenagar', 'Gondhale Nagar Hadapsar'],
    cluster: 'Hadapsar Core',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5015,
    longitude: 73.9418,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.5015/73.9418',
    practicalRoadDistanceKm: 2.8,
    estimatedTransitMinutes: '9–14 mins via Satavwadi / Gadital',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Short 2.8 km commute from office; high tutor availability across morning and evening slots.',
    localSchoolsAndSocietiesContext: 'Residential societies and independent homes seeking structured SSC, HSC, and CBSE home tutoring.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['SSC', 'HSC', 'CBSE', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Kalepadal',
    slug: 'kalepadal',
    aliases: ['Kale Padal', 'Kaleborate Nagar'],
    cluster: 'Hadapsar Core',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4878,
    longitude: 73.9392,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4878/73.9392',
    practicalRoadDistanceKm: 1.9,
    estimatedTransitMinutes: '6–10 mins via Kalepadal Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Adjacent residential pocket under 2 km road travel from Saptrang Akash HQ.',
    localSchoolsAndSocietiesContext: 'Covers Kalepadal and Kaleborate Nagar societies with verified home tutors for Class 8–12.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Satar Nagar',
    slug: 'satar-nagar',
    aliases: ['Satarnagar Hadapsar'],
    cluster: 'Hadapsar Core',
    placeType: 'Residential Pocket / Wasti',
    latitude: 18.4975,
    longitude: 73.9312,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4975/73.9312',
    practicalRoadDistanceKm: 3.3,
    estimatedTransitMinutes: '10–15 mins via Sasane Nagar / Solapur Rd',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Inside core 3.5 km road radius with reliable two-wheeler tutor connectivity.',
    localSchoolsAndSocietiesContext: 'Focused on Class 10 board exam scoring and Class 11–12 PCM/PCB fundamentals.',
    supportedSubjects: ['Mathematics', 'Science', 'Physics', 'Chemistry'],
    supportedExamsAndBoards: ['SSC', 'CBSE', 'HSC']
  },
  {
    canonicalName: 'Ramtekdi',
    slug: 'ramtekdi',
    aliases: ['Ramtekdi Hadapsar'],
    cluster: 'Hadapsar Core',
    placeType: 'Urban Corridor / Road',
    latitude: 18.5018,
    longitude: 73.9168,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.5018/73.9168',
    practicalRoadDistanceKm: 5.2,
    estimatedTransitMinutes: '14–20 mins along Pune-Solapur Highway',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'medium',
    publicationEligibility: 'approved_public',
    routeNotes: 'Direct highway corridor between Hadapsar and Fatima Nagar; home visits scheduled for residential pockets.',
    localSchoolsAndSocietiesContext: 'Supports SSC/HSC state board and CBSE students seeking foundational Mathematics and Science coaching.',
    supportedSubjects: ['Mathematics', 'Science', 'Chemistry'],
    supportedExamsAndBoards: ['SSC', 'HSC', 'CBSE']
  },

  // CLUSTER 2: TOWNSHIPS & IT HUBS
  {
    canonicalName: 'Magarpatta City',
    slug: 'magarpatta-city',
    aliases: ['Magarpatta', 'Magarpatta Township'],
    cluster: 'Townships & IT Hubs',
    placeType: 'Integrated Township',
    latitude: 18.5158,
    longitude: 73.9272,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5158/73.9272',
    practicalRoadDistanceKm: 5.5,
    estimatedTransitMinutes: '15–22 mins via Hadapsar Flyover / South Gate',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Gated township access requires visitor gate pass confirmation by parents prior to trial and regular home sessions.',
    localSchoolsAndSocietiesContext: 'High demand across Cosmos, Jasminium, Iris, Heliconia, and Roystonea for CBSE, ICSE, IB/IGCSE, JEE Mains/Advanced, and NEET.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'IB', 'IGCSE', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Amanora Park Town',
    slug: 'amanora-park-town',
    aliases: ['Amanora', 'Amanora Township'],
    cluster: 'Townships & IT Hubs',
    placeType: 'Integrated Township',
    latitude: 18.5192,
    longitude: 73.9412,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5192/73.9412',
    practicalRoadDistanceKm: 5.2,
    estimatedTransitMinutes: '14–20 mins via Malwadi DP Road / Sade Satra Nali',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Tutors check in via MyGate/digital security at Amanora towers; evening 4 PM–9 PM and weekend slots active.',
    localSchoolsAndSocietiesContext: 'Serves students across Future Towers, Adreno, Neo, Aspire, and Gateway Towers studying in CBSE, ICSE, and international curricula.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'IB', 'IGCSE', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Sade Satra Nali',
    slug: 'sade-satra-nali',
    aliases: ['Sadesatranali', 'Sade Satra Nali Hadapsar'],
    cluster: 'Townships & IT Hubs',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5114,
    longitude: 73.9445,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.5114/73.9445',
    practicalRoadDistanceKm: 3.9,
    estimatedTransitMinutes: '11–16 mins via Malwadi / Amanora Link Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Located immediately south of Amanora Park Town; 3.9 km road travel from Hadapsar office.',
    localSchoolsAndSocietiesContext: 'New residential high-rises and societies seeking 1-on-1 CBSE/SSC/HSC and JEE/NEET foundation tutors.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Mundhwa',
    slug: 'mundhwa',
    aliases: ['Mundhwa Pune', 'Kodre Nagar Mundhwa'],
    cluster: 'Townships & IT Hubs',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5328,
    longitude: 73.9325,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5328/73.9325',
    practicalRoadDistanceKm: 7.4,
    estimatedTransitMinutes: '20–28 mins via Magarpatta-Mundhwa Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Peak evening traffic near Mundhwa Chowk is factored into tutor scheduling; buffer of 15 mins maintained between sessions.',
    localSchoolsAndSocietiesContext: 'Growing residential societies along Mundhwa-Magarpatta corridor requiring CBSE/ICSE and JEE/NEET subject specialists.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Keshav Nagar',
    slug: 'keshav-nagar',
    aliases: ['Keshavnagar Mundhwa'],
    cluster: 'Townships & IT Hubs',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5365,
    longitude: 73.9478,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5365/73.9478',
    practicalRoadDistanceKm: 7.8,
    estimatedTransitMinutes: '22–30 mins via Amanora / Manjari-Mundhwa Link',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Accessible via Amanora-Keshav Nagar internal roads avoiding main Mundhwa bridge congestion where possible.',
    localSchoolsAndSocietiesContext: 'High density of working-professional families in gated societies requesting evening 1-on-1 CBSE/ICSE and competitive exam tuition.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Kharadi',
    slug: 'kharadi',
    aliases: ['South Kharadi', 'Kharadi Bypass', 'EON Kharadi Fringe'],
    cluster: 'Townships & IT Hubs',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5515,
    longitude: 73.9418,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5515/73.9418',
    practicalRoadDistanceKm: 9.8,
    estimatedTransitMinutes: '28–40 mins across Mundhwa River Bridge',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'borderline_home_and_online',
    confidence: 'medium',
    publicationEligibility: 'approved_public',
    routeNotes: 'BORDERLINE COVERAGE NOTICE: Straight-line distance is 7.35 km, but practical road distance via Mundhwa Bridge is 9.8–11.5 km. In-person home visits are restricted to southern Kharadi societies near Mundhwa-Kharadi Bypass depending on faculty slot availability; live 1-on-1 online tuition is available across all Kharadi sectors.',
    localSchoolsAndSocietiesContext: 'Serves families near Riverdale, Nyati Elysia, and southern Kharadi pockets for CBSE, ICSE, JEE, and NEET.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'JEE', 'NEET']
  },

  // CLUSTER 3: SOUTH-EAST & CANTONMENT
  {
    canonicalName: 'Wanowrie',
    slug: 'wanowrie',
    aliases: ['Wanwadi', 'Wanowrie Pune'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4958,
    longitude: 73.9015,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4958/73.9015',
    practicalRoadDistanceKm: 6.8,
    estimatedTransitMinutes: '18–25 mins via Fatima Nagar / Solapur Highway',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Strong tutor coverage along Wanowrie, Sacred Heart Town, and Kedari Nagar corridors.',
    localSchoolsAndSocietiesContext: 'Established residential hub with high concentration of ICSE, CBSE, and ISC/HSC students requiring 1-on-1 subject specialists.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['ICSE', 'CBSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Fatima Nagar',
    slug: 'fatima-nagar',
    aliases: ['Fatimanagar', 'Fatima Nagar Wanowrie'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5038,
    longitude: 73.9052,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.5038/73.9052',
    practicalRoadDistanceKm: 6.5,
    estimatedTransitMinutes: '16–22 mins direct on Pune-Solapur Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Direct linear connectivity along NH-65 from Hadapsar HQ.',
    localSchoolsAndSocietiesContext: 'Popular among Class 9–12 students from nearby convent and central board schools seeking structured home tuition.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'NIBM Road',
    slug: 'nibm-road',
    aliases: ['NIBM', 'NIBM Annexe'],
    cluster: 'South-East & Cantonment',
    placeType: 'Urban Corridor / Road',
    latitude: 18.4725,
    longitude: 73.9005,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4725/73.9005',
    practicalRoadDistanceKm: 7.3,
    estimatedTransitMinutes: '20–26 mins via Mohammadwadi / Kalepadal Link',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Connected via Kalepadal–Mohammadwadi internal road, bypassing Solapur Highway traffic.',
    localSchoolsAndSocietiesContext: 'High-rise gated communities along NIBM and NIBM Annexe preparing for CBSE/ICSE boards, JEE Mains, and NEET UG.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'IGCSE', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Salunke Vihar',
    slug: 'salunke-vihar',
    aliases: ['Salunke Vihar Road'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4828,
    longitude: 73.9032,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4828/73.9032',
    practicalRoadDistanceKm: 6.7,
    estimatedTransitMinutes: '18–24 mins via Wanowrie or Mohammadwadi',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Well-established residential enclave with regular afternoon and evening home tutor beats.',
    localSchoolsAndSocietiesContext: 'Defense and civilian residential societies with strong preference for verified 1-on-1 Physics, Chemistry, and Mathematics tutors.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Handewadi',
    slug: 'handewadi',
    aliases: ['Autadwadi Handewadi', 'Handewadi Road'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4662,
    longitude: 73.9318,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4662/73.9318',
    practicalRoadDistanceKm: 4.1,
    estimatedTransitMinutes: '10–15 mins via Saswad-Handewadi Link Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Close 4.1 km road proximity to Saptrang Akash; includes Autadwadi Handewadi residential belt.',
    localSchoolsAndSocietiesContext: 'Rapidly expanding apartment complexes along Handewadi Road requiring Class 8–10 Science/Maths and Class 11–12 board coaching.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Satav Nagar',
    slug: 'satav-nagar',
    aliases: ['Satavnagar Handewadi Road'],
    cluster: 'South-East & Cantonment',
    placeType: 'Residential Pocket / Wasti',
    latitude: 18.4748,
    longitude: 73.9341,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4748/73.9341',
    practicalRoadDistanceKm: 3.1,
    estimatedTransitMinutes: '8–12 mins via Kalepadal / Handewadi Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Just 3.1 km by road from Hadapsar office; high tutor availability.',
    localSchoolsAndSocietiesContext: 'Residential societies off Handewadi Road with frequent enquiries for CBSE/SSC Class 9–10 and HSC Science.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'NEET']
  },
  {
    canonicalName: 'Mohammadwadi',
    slug: 'mohammadwadi',
    aliases: ['Mohammed Wadi', 'Mohammad Wadi'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4789,
    longitude: 73.9162,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4789/73.9162',
    practicalRoadDistanceKm: 5.1,
    estimatedTransitMinutes: '14–20 mins via Kalepadal-Mohammadwadi Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Direct east-west road link from Kalepadal/Hadapsar; canonicalised from spelling variant Mohammed Wadi.',
    localSchoolsAndSocietiesContext: 'Covers Nyati townships, Tarawade Clarks Inn corridor, and Corinthian Club road societies for CBSE, ICSE, JEE, and NEET.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Undri',
    slug: 'undri',
    aliases: ['Undri Pune', 'Undri Chowk'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4568,
    longitude: 73.9182,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4568/73.9182',
    practicalRoadDistanceKm: 6.4,
    estimatedTransitMinutes: '16–22 mins via Handewadi Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Smooth 6.4 km commute via Handewadi-Undri Road without entering central city congestion.',
    localSchoolsAndSocietiesContext: 'Cluster of prominent CBSE and ICSE schools in Undri creates strong demand for doorstep NEET, JEE, and Class 8–12 tutoring.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Pisoli',
    slug: 'pisoli',
    aliases: ['Pisoli Road', 'Pisoli Undri'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4495,
    longitude: 73.9078,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4495/73.9078',
    practicalRoadDistanceKm: 8.1,
    estimatedTransitMinutes: '22–28 mins via Undri Chowk',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'medium',
    publicationEligibility: 'approved_public',
    routeNotes: '8.1 km road travel via Handewadi-Undri corridor; home visits scheduled primarily in 3-days/week or alternate-day blocks.',
    localSchoolsAndSocietiesContext: 'Supports families in Pisoli residential societies preparing for Class 9–10 CBSE/SSC boards and Class 11–12 Science.',
    supportedSubjects: ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'NEET']
  },
  {
    canonicalName: 'Kondhwa',
    slug: 'kondhwa',
    aliases: ['Kondhwa Khurd', 'Kondhwa Budruk', 'Kondhwa Main Road'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4692,
    longitude: 73.8891,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4692/73.8891',
    practicalRoadDistanceKm: 9.2,
    estimatedTransitMinutes: '25–35 mins via NIBM / Lulla Nagar',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'borderline_home_and_online',
    confidence: 'medium',
    publicationEligibility: 'approved_public',
    routeNotes: 'BORDERLINE COVERAGE NOTICE: Straight-line distance is 6.93 km, with 8.5–9.8 km road travel. Home visits cover eastern Kondhwa / NIBM-Kondhwa link societies; western pockets towards Katraj-Kondhwa Bypass are served via live online sessions or subject to specific tutor route match.',
    localSchoolsAndSocietiesContext: 'High student volume for NEET UG Biology/Chemistry, JEE Mathematics, and Class 10/12 Board preparation.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'BT Kawade Road',
    slug: 'bt-kawade-road',
    aliases: ['B.T. Kawade Road', 'BT Kawade'],
    cluster: 'South-East & Cantonment',
    placeType: 'Urban Corridor / Road',
    latitude: 18.5162,
    longitude: 73.9118,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.5162/73.9118',
    practicalRoadDistanceKm: 6.9,
    estimatedTransitMinutes: '18–24 mins via Solapur Rd / Ghorpadi Link',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: '6.9 km road distance connecting Solapur Highway to Ghorpadi; railway overbridge traffic accounted for in evening schedules.',
    localSchoolsAndSocietiesContext: 'Dense mid-rise and high-rise societies seeking Class 8–10 and 11–12 Science home tutors.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Ghorpadi',
    slug: 'ghorpadi',
    aliases: ['Ghorpadi Gaon', 'Ghorpadi Cantonment'],
    cluster: 'South-East & Cantonment',
    placeType: 'Cantonment / Fringe Sector',
    latitude: 18.5228,
    longitude: 73.9065,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5228/73.9065',
    practicalRoadDistanceKm: 8.3,
    estimatedTransitMinutes: '22–30 mins via BT Kawade Road or Mundhwa',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'medium',
    publicationEligibility: 'approved_public',
    routeNotes: 'Within 6.32 km straight-line and 8.3 km road distance; home tuition coordinated across Ghorpadi and Sopan Baug approach.',
    localSchoolsAndSocietiesContext: 'Serves CBSE, ICSE, and state board students requiring focused 1-on-1 Mathematics and Science mentorship.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'JEE']
  },
  {
    canonicalName: 'Lulla Nagar',
    slug: 'lulla-nagar',
    aliases: ['Lullanagar'],
    cluster: 'South-East & Cantonment',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4855,
    longitude: 73.8912,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4855/73.8912',
    practicalRoadDistanceKm: 8.2,
    estimatedTransitMinutes: '22–28 mins via Wanowrie / Fatima Nagar',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'borderline_home_and_online',
    confidence: 'medium',
    publicationEligibility: 'approved_public',
    routeNotes: 'BORDERLINE COVERAGE NOTICE: 6.45 km straight-line / 8.2 km road commute at the western edge of the Wanowrie belt. Home visits depend on tutor slot availability at Lulla Nagar Chowk; live online classes available immediately.',
    localSchoolsAndSocietiesContext: 'Established residential societies seeking ICSE/CBSE and NEET/JEE 1-on-1 faculty.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'HSC', 'NEET', 'JEE']
  },

  // CLUSTER 4: PHURSUNGI & SOLAPUR ROAD
  {
    canonicalName: 'Phursungi',
    slug: 'phursungi',
    aliases: ['Fursungi', 'Phursungi Road'],
    cluster: 'Phursungi & Solapur Road',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4772,
    longitude: 73.9698,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4772/73.9698',
    practicalRoadDistanceKm: 2.9,
    estimatedTransitMinutes: '8–12 mins via Tukai Darshan / Phursungi Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Immediate eastern neighbour to Saptrang Akash HQ (2.09 km straight-line, 2.9 km road). Spelling alias "Fursungi" permanently redirects here.',
    localSchoolsAndSocietiesContext: 'Serves SP Infocity residential surroundings, Phursungi societies, and Saswad Road pockets for Class 8–12 and NEET/JEE.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Bhekrai Nagar',
    slug: 'bhekrai-nagar',
    aliases: ['Bhekrainagar', 'Bhekrai Nagar Phursungi'],
    cluster: 'Phursungi & Solapur Road',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4785,
    longitude: 73.9562,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4785/73.9562',
    practicalRoadDistanceKm: 1.4,
    estimatedTransitMinutes: '4–7 mins from Saptrang Akash Office',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Under 1.5 km road distance from our registered administrative office; fastest doorstep tutor matching in East Pune.',
    localSchoolsAndSocietiesContext: 'High density of SSC, HSC, and CBSE students around Bhekrai Nagar Bus Depot and Saswad Road junction.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['SSC', 'HSC', 'CBSE', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Tukai Darshan',
    slug: 'tukai-darshan',
    aliases: ['Tukai Darshan Hadapsar', 'Tukai Darshan Phursungi'],
    cluster: 'Phursungi & Solapur Road',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4852,
    longitude: 73.9518,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4852/73.9518',
    practicalRoadDistanceKm: 0.3,
    estimatedTransitMinutes: '1–4 mins walking/driving from Saptrang Akash',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Immediate home locality of Office 205, Saptrang Akash. Instant in-person parent consultations and home trial sessions.',
    localSchoolsAndSocietiesContext: 'Immediate neighborhood societies served for Class 8–10 Science/Mathematics, Class 11–12 PCM/PCB, NEET, and JEE.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC', 'NEET', 'JEE']
  },
  {
    canonicalName: 'Papde Wasti',
    slug: 'papde-wasti',
    aliases: ['Papdewasti', 'Papde Wasti Phursungi'],
    cluster: 'Phursungi & Solapur Road',
    placeType: 'Residential Pocket / Wasti',
    latitude: 18.4816,
    longitude: 73.9554,
    sourceUrl: 'https://www.openstreetmap.org/#map=16/18.4816/73.9554',
    practicalRoadDistanceKm: 0.9,
    estimatedTransitMinutes: '3–6 mins from Saptrang Akash HQ',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: 'Adjacent micro-pocket between Tukai Darshan and Bhekrai Nagar (<1 km road travel).',
    localSchoolsAndSocietiesContext: 'Local families seeking dependable SSC, HSC, and CBSE home tutors for Mathematics, Science, and Chemistry.',
    supportedSubjects: ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology'],
    supportedExamsAndBoards: ['SSC', 'HSC', 'CBSE', 'NEET']
  },
  {
    canonicalName: 'Shewalewadi',
    slug: 'shewalewadi',
    aliases: ['Shewalewadi Solapur Road'],
    cluster: 'Phursungi & Solapur Road',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4954,
    longitude: 73.9752,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4954/73.9752',
    practicalRoadDistanceKm: 3.5,
    estimatedTransitMinutes: '9–14 mins via NH-65 Solapur Highway',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: '3.5 km along Pune-Solapur Road east of Manjari Phata; direct tutor access for Joyville and nearby societies.',
    localSchoolsAndSocietiesContext: 'Gated townships and apartment complexes near Shewalewadi Phata requiring CBSE, ICSE, HSC, JEE, and NEET coaching.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Manjari Budruk',
    slug: 'manjari-budruk',
    aliases: ['Manjari', 'Manjri', 'Manjari Bk'],
    cluster: 'Phursungi & Solapur Road',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5186,
    longitude: 73.9758,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5186/73.9758',
    practicalRoadDistanceKm: 5.8,
    estimatedTransitMinutes: '15–22 mins via Manjari Road from NH-65',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'high',
    publicationEligibility: 'approved_public',
    routeNotes: '5.8 km road distance; note railway crossing / flyover timing on Manjari Road during peak evening hours.',
    localSchoolsAndSocietiesContext: 'Serves Godrej Boulevard/Rivergreens, Kalpataru Serenity, and Manjari Greens students across CBSE, ICSE, and State Boards.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'SSC', 'HSC', 'JEE', 'NEET']
  },
  {
    canonicalName: 'Uruli Devachi',
    slug: 'uruli-devachi',
    aliases: ['Urali Devachi', 'Uruli Devachi Phata'],
    cluster: 'Phursungi & Solapur Road',
    placeType: 'Peri-Urban / Village Panchayat',
    latitude: 18.4552,
    longitude: 73.9685,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4552/73.9685',
    practicalRoadDistanceKm: 5.0,
    estimatedTransitMinutes: '12–18 mins via Pune-Saswad Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'verified_home_and_online',
    confidence: 'medium',
    publicationEligibility: 'approved_public',
    routeNotes: '3.83 km straight-line and 5.0 km road distance south-east on Saswad Highway; home visits available for societies along main road.',
    localSchoolsAndSocietiesContext: 'Focuses on SSC, HSC, and CBSE Class 9–12 Science and Mathematics foundations.',
    supportedSubjects: ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology'],
    supportedExamsAndBoards: ['SSC', 'HSC', 'CBSE', 'NEET']
  },

  // CLUSTER 5: OUTER / BORDERLINE EVALUATION CANDIDATES (EXCLUDED FROM PUBLIC ROUTES / KEPT AS PRIVATE DRAFTS)
  {
    canonicalName: 'Holkarwadi',
    slug: 'holkarwadi',
    aliases: ['Holkarwadi Handewadi'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Peri-Urban / Village Panchayat',
    latitude: 18.4512,
    longitude: 73.9415,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4512/73.9415',
    practicalRoadDistanceKm: 5.4,
    estimatedTransitMinutes: '15–22 mins via Handewadi-Wadki Road',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: 'Inside 10 km straight-line circle (4.05 km), but active doorstep tutor roster for interior Holkarwadi lanes is unverified. Held as private draft.',
    localSchoolsAndSocietiesContext: 'Awaiting owner verification of regular home-visit tutor availability.',
    supportedSubjects: ['Mathematics', 'Science'],
    supportedExamsAndBoards: ['SSC', 'HSC']
  },
  {
    canonicalName: 'Wadki',
    slug: 'wadki',
    aliases: ['Wadki Saswad Road'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Peri-Urban / Village Panchayat',
    latitude: 18.4368,
    longitude: 73.9612,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4368/73.9612',
    practicalRoadDistanceKm: 7.2,
    estimatedTransitMinutes: '18–25 mins towards Dive Ghat approach',
    boundaryStatus: 'inside_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '5.56 km straight-line along Saswad Hwy, but industrial/peri-urban stretch lacks verified evening home tutor coverage. Excluded from public routes.',
    localSchoolsAndSocietiesContext: 'Online live classes supported; home visits unverified.',
    supportedSubjects: ['Mathematics', 'Science'],
    supportedExamsAndBoards: ['SSC', 'HSC']
  },
  {
    canonicalName: 'Camp',
    slug: 'camp',
    aliases: ['Pune Camp', 'MG Road Camp', 'Pune Cantonment'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Cantonment / Fringe Sector',
    latitude: 18.5135,
    longitude: 73.8825,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5135/73.8825',
    practicalRoadDistanceKm: 9.9,
    estimatedTransitMinutes: '28–38 mins via Solapur Road',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '7.97 km straight-line / ~10 km road travel. Held in private draft pending owner confirmation of dedicated Cantonment West home faculty.',
    localSchoolsAndSocietiesContext: 'Cantonment ICSE/CBSE schools; online live mentorship active.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['ICSE', 'CBSE', 'HSC']
  },
  {
    canonicalName: 'Manjari Khurd',
    slug: 'manjari-khurd',
    aliases: ['Manjri Khurd'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Peri-Urban / Village Panchayat',
    latitude: 18.5395,
    longitude: 73.9912,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5395/73.9912',
    practicalRoadDistanceKm: 10.6,
    estimatedTransitMinutes: '30–40 mins beyond Manjari Budruk',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '7.20 km straight-line, but practical road distance exceeds 10.5 km via rural river approach. Excluded from public routes.',
    localSchoolsAndSocietiesContext: 'Online tuition only until road connectivity and faculty roster are confirmed.',
    supportedSubjects: ['Mathematics', 'Science'],
    supportedExamsAndBoards: ['SSC', 'HSC']
  },
  {
    canonicalName: 'Koregaon Park',
    slug: 'koregaon-park',
    aliases: ['KP Pune', 'North Main Road KP'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5362,
    longitude: 73.894,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5362/73.8940',
    practicalRoadDistanceKm: 11.2,
    estimatedTransitMinutes: '32–45 mins via Mundhwa / Ghorpadi river bridges',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '8.30 km straight-line, but 11.2 km practical road travel across congested Mundhwa/Ghorpadi bottlenecks. Excluded from public service-area pages.',
    localSchoolsAndSocietiesContext: 'Served via live online 1-on-1 sessions unless owner confirms north-bank home faculty.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'IB', 'IGCSE']
  },
  {
    canonicalName: 'Kalyani Nagar',
    slug: 'kalyani-nagar',
    aliases: ['Kalyaninagar'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5463,
    longitude: 73.9033,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5463/73.9033',
    practicalRoadDistanceKm: 11.6,
    estimatedTransitMinutes: '35–48 mins across Mundhwa Bridge',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '8.45 km straight-line, but 11.6 km practical road commute across Mula-Mutha river bridge congestion. Excluded from public routes.',
    localSchoolsAndSocietiesContext: 'Online live 1-on-1 tutoring available; doorstep coverage unverified.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'IB', 'IGCSE']
  },
  {
    canonicalName: 'Wadgaon Sheri',
    slug: 'wadgaon-sheri',
    aliases: ['Vadgaon Sheri'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5528,
    longitude: 73.9188,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5528/73.9188',
    practicalRoadDistanceKm: 11.4,
    estimatedTransitMinutes: '35–45 mins via Mundhwa-Kharadi Bypass',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '8.21 km straight-line, 11.4 km road distance north of river. Kept as private draft; excluded from sitemap.',
    localSchoolsAndSocietiesContext: 'Online sessions available; home tutor travel unverified.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['CBSE', 'ICSE', 'HSC']
  },
  {
    canonicalName: 'Bibwewadi',
    slug: 'bibwewadi',
    aliases: ['Bibvewadi'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.4721,
    longitude: 73.8652,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4721/73.8652',
    practicalRoadDistanceKm: 12.4,
    estimatedTransitMinutes: '35–48 mins via Kondhwa / Lulla Nagar',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '9.32 km straight-line, 12.4 km road distance. Exceeds practical home-visit transit threshold from Hadapsar HQ. Excluded from public routes.',
    localSchoolsAndSocietiesContext: 'Online coaching only.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC']
  },
  {
    canonicalName: 'Swargate',
    slug: 'swargate',
    aliases: ['Swargate Pune'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Sublocality / Residential Hub',
    latitude: 18.5018,
    longitude: 73.8636,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.5018/73.8636',
    practicalRoadDistanceKm: 11.8,
    estimatedTransitMinutes: '35–45 mins via Solapur Road / Shankarsheth Road',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '9.52 km straight-line, 11.8 km road distance into dense central Pune traffic. Excluded from public service-area pages.',
    localSchoolsAndSocietiesContext: 'Online live classes only.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['SSC', 'HSC', 'CBSE']
  },
  {
    canonicalName: 'Loni Kalbhor',
    slug: 'loni-kalbhor',
    aliases: ['Loni Kalbhor Solapur Road', 'MIT Loni Kalbhor'],
    cluster: 'Outer / Borderline Evaluation',
    placeType: 'Peri-Urban / Village Panchayat',
    latitude: 18.4892,
    longitude: 74.0235,
    sourceUrl: 'https://www.openstreetmap.org/#map=15/18.4892/74.0235',
    practicalRoadDistanceKm: 9.6,
    estimatedTransitMinutes: '22–30 mins east along NH-65 beyond Hadapsar Toll',
    boundaryStatus: 'borderline_10km',
    actualTutorCoverage: 'online_only_pending_home_verification',
    confidence: 'low_pending_owner',
    publicationEligibility: 'private_draft_needs_evidence',
    routeNotes: '7.50 km straight-line east along NH-65, but highway toll corridor evening home-visit roster requires owner confirmation. Held as private draft.',
    localSchoolsAndSocietiesContext: 'Awaiting owner confirmation of evening home tutor travel beyond Shewalewadi/Manjari.',
    supportedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    supportedExamsAndBoards: ['CBSE', 'SSC', 'HSC']
  }
];

export const SERVICE_AREAS: ServiceAreaRecord[] = RAW_SERVICE_AREAS.map((item) => ({
  ...item,
  checkedDate: '2026-10-08',
  straightLineDistanceKm: calculateHaversineKm(
    OFFICE_LAT,
    OFFICE_LON,
    item.latitude,
    item.longitude
  )
}));

export const APPROVED_PUBLIC_SERVICE_AREAS = SERVICE_AREAS.filter(
  (area) => area.publicationEligibility === 'approved_public'
);

export const DRAFT_UNVERIFIED_SERVICE_AREAS = SERVICE_AREAS.filter(
  (area) => area.publicationEligibility !== 'approved_public'
);

export function generateServiceAreasCsv(): string {
  const headers = [
    'canonical_name',
    'slug',
    'aliases',
    'cluster',
    'place_type',
    'coordinates',
    'source_url',
    'checked_date',
    'distance_from_office_straight_line_km',
    'practical_road_distance_km',
    'boundary_status',
    'actual_tutor_coverage',
    'confidence',
    'publication_eligibility',
    'route_notes'
  ];

  const escapeCsv = (val: string | number) => {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = SERVICE_AREAS.map((a) => [
    a.canonicalName,
    a.slug,
    a.aliases.join(' | '),
    a.cluster,
    a.placeType,
    `${a.latitude}, ${a.longitude}`,
    a.sourceUrl,
    a.checkedDate,
    a.straightLineDistanceKm,
    a.practicalRoadDistanceKm,
    a.boundaryStatus,
    a.actualTutorCoverage,
    a.confidence,
    a.publicationEligibility,
    a.routeNotes
  ]);

  return [
    headers.map(escapeCsv).join(','),
    ...rows.map((r) => r.map(escapeCsv).join(','))
  ].join('\n');
}
