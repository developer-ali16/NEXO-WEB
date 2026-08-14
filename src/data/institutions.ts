import heroCampus from "@/assets/hero-campus.jpg";
import typeSchool from "@/assets/type-school.jpg";
import typeCollege from "@/assets/type-college.jpg";
import typeUniversity from "@/assets/type-university.jpg";

export type InstitutionType = "School" | "College" | "University";

export type Course = {
  name: string;
  duration: string;
  fee: number;
  eligibility: string;
};

export type Institution = {
  slug: string;
  name: string;
  type: InstitutionType;
  city: string;
  state: string;
  rating: number;
  reviews: number;
  description: string;
  about: string;
  startingFee: number;
  courses: Course[];
  facilities: string[];
  hostel: string;
  placement: string;
  admission: string;
  established: number;
  phone: string;
  email: string;
  website: string;
  images: string[];
};

export const typeImages: Record<InstitutionType, string> = {
  School: typeSchool,
  College: typeCollege,
  University: typeUniversity,
};

export const heroImage = heroCampus;

const gallery = (primary: string) => [primary, heroCampus, typeCollege, typeUniversity];

export const facilityOptions = [
  "Library",
  "Sports Complex",
  "Laboratories",
  "Hostel",
  "Wi-Fi Campus",
  "Auditorium",
  "Cafeteria",
  "Transport",
];

export const popularCourses = [
  { code: "BCA", name: "Bachelor of Computer Applications", duration: "3 years", institutions: 128 },
  { code: "B.Tech", name: "Bachelor of Technology", duration: "4 years", institutions: 214 },
  { code: "MBA", name: "Master of Business Administration", duration: "2 years", institutions: 176 },
  { code: "MBBS", name: "Bachelor of Medicine & Surgery", duration: "5.5 years", institutions: 64 },
  { code: "B.Com", name: "Bachelor of Commerce", duration: "3 years", institutions: 198 },
  { code: "BA", name: "Bachelor of Arts", duration: "3 years", institutions: 231 },
  { code: "B.Sc", name: "Bachelor of Science", duration: "3 years", institutions: 187 },
  { code: "LLB", name: "Bachelor of Legislative Law", duration: "3 years", institutions: 72 },
];

export const institutions: Institution[] = [
  {
    slug: "westbourne-international-school",
    name: "Westbourne International School",
    type: "School",
    city: "Bengaluru",
    state: "Karnataka",
    rating: 4.6,
    reviews: 412,
    description:
      "A K–12 campus focused on inquiry-based learning, small cohorts and a broad co-curricular programme.",
    about:
      "Westbourne International School offers an internationally benchmarked curriculum from primary through senior secondary. The campus is designed around studio classrooms, open learning commons and dedicated performance spaces.",
    startingFee: 180000,
    courses: [
      { name: "Primary Programme", duration: "5 years", fee: 180000, eligibility: "Age 5+" },
      { name: "Middle Years", duration: "3 years", fee: 220000, eligibility: "Grade 5 completion" },
      { name: "Senior Secondary — Science", duration: "2 years", fee: 265000, eligibility: "Grade 10, 60%+" },
      { name: "Senior Secondary — Commerce", duration: "2 years", fee: 245000, eligibility: "Grade 10, 55%+" },
    ],
    facilities: ["Library", "Sports Complex", "Laboratories", "Auditorium", "Transport", "Cafeteria"],
    hostel: "Optional weekly boarding for Grades 8–12, separate wings, resident wardens.",
    placement: "Senior secondary counselling with university placement support across India, UK and Singapore.",
    admission: "Applications open in October. Entrance assessment in English and Mathematics, followed by an interaction.",
    established: 2004,
    phone: "+91 80 4000 1200",
    email: "admissions@westbourne.edu.in",
    website: "https://westbourne.edu.in",
    images: gallery(typeSchool),
  },
  {
    slug: "ardenhall-college-of-commerce",
    name: "Ardenhall College of Commerce",
    type: "College",
    city: "Pune",
    state: "Maharashtra",
    rating: 4.3,
    reviews: 968,
    description:
      "Undergraduate commerce and management college with an industry-linked curriculum and active placement cell.",
    about:
      "Ardenhall focuses on commerce, finance and management education with faculty drawn from practice. Students work on live case studies through the college's analytics and finance labs.",
    startingFee: 92000,
    courses: [
      { name: "B.Com", duration: "3 years", fee: 92000, eligibility: "Grade 12, 50%+" },
      { name: "BBA", duration: "3 years", fee: 118000, eligibility: "Grade 12, 50%+" },
      { name: "BCA", duration: "3 years", fee: 126000, eligibility: "Grade 12 with Mathematics" },
      { name: "MBA", duration: "2 years", fee: 340000, eligibility: "Graduation, 50%+ and entrance score" },
    ],
    facilities: ["Library", "Laboratories", "Wi-Fi Campus", "Cafeteria", "Auditorium"],
    hostel: "Partner accommodation within 2 km, no on-campus hostel.",
    placement: "Dedicated placement cell with recruiters across audit, banking and analytics.",
    admission: "Merit-based admission on Grade 12 results; MBA requires a national entrance score.",
    established: 1994,
    phone: "+91 20 6600 4400",
    email: "info@ardenhall.ac.in",
    website: "https://ardenhall.ac.in",
    images: gallery(typeCollege),
  },
  {
    slug: "northgate-university",
    name: "Northgate University",
    type: "University",
    city: "New Delhi",
    state: "Delhi",
    rating: 4.7,
    reviews: 2140,
    description:
      "Research-led university with engineering, management, law and liberal arts schools on a single campus.",
    about:
      "Northgate University runs eight schools across a residential campus, with research centres in computing, sustainability and public policy. Undergraduate students may take a minor from any school.",
    startingFee: 210000,
    courses: [
      { name: "B.Tech — Computer Science", duration: "4 years", fee: 385000, eligibility: "Grade 12 PCM + entrance" },
      { name: "B.Tech — Mechanical", duration: "4 years", fee: 320000, eligibility: "Grade 12 PCM + entrance" },
      { name: "MBA", duration: "2 years", fee: 620000, eligibility: "Graduation + entrance score" },
      { name: "BA (Hons) Economics", duration: "3 years", fee: 210000, eligibility: "Grade 12, 65%+" },
      { name: "LLB", duration: "3 years", fee: 245000, eligibility: "Graduation, 50%+" },
    ],
    facilities: [
      "Library",
      "Sports Complex",
      "Laboratories",
      "Hostel",
      "Wi-Fi Campus",
      "Auditorium",
      "Cafeteria",
      "Transport",
    ],
    hostel: "On-campus residences for all first-year students; single and twin-sharing rooms.",
    placement: "Central career services with structured internships from the second year onward.",
    admission: "Entrance-based admission with separate application windows for each school.",
    established: 1978,
    phone: "+91 11 2700 8800",
    email: "admissions@northgate.edu.in",
    website: "https://northgate.edu.in",
    images: gallery(typeUniversity),
  },
  {
    slug: "elmcroft-medical-college",
    name: "Elmcroft Medical College",
    type: "College",
    city: "Chennai",
    state: "Tamil Nadu",
    rating: 4.5,
    reviews: 1320,
    description:
      "Medical college attached to a 900-bed teaching hospital with clinical exposure from the first year.",
    about:
      "Elmcroft combines classroom instruction with early clinical rotations. The attached hospital supports community outreach programmes across the district.",
    startingFee: 780000,
    courses: [
      { name: "MBBS", duration: "5.5 years", fee: 780000, eligibility: "NEET qualified, PCB in Grade 12" },
      { name: "B.Sc Nursing", duration: "4 years", fee: 190000, eligibility: "Grade 12 PCB, 50%+" },
      { name: "BPT", duration: "4.5 years", fee: 165000, eligibility: "Grade 12 PCB" },
    ],
    facilities: ["Library", "Laboratories", "Hostel", "Cafeteria", "Wi-Fi Campus"],
    hostel: "Mandatory hostel for first-year MBBS students, separate blocks with mess facility.",
    placement: "Internship placement within the attached hospital network and district health centres.",
    admission: "NEET score-based counselling through state and management quota.",
    established: 1986,
    phone: "+91 44 2811 5500",
    email: "office@elmcroft.ac.in",
    website: "https://elmcroft.ac.in",
    images: gallery(typeCollege),
  },
  {
    slug: "harrow-vale-public-school",
    name: "Harrow Vale Public School",
    type: "School",
    city: "Hyderabad",
    state: "Telangana",
    rating: 4.2,
    reviews: 286,
    description:
      "Day school with a structured academic programme and strong emphasis on sport and performing arts.",
    about:
      "Harrow Vale runs a national curriculum from Grade 1 to Grade 12 with dedicated houses, an athletics track and a music school.",
    startingFee: 96000,
    courses: [
      { name: "Primary", duration: "5 years", fee: 96000, eligibility: "Age 6+" },
      { name: "Secondary", duration: "5 years", fee: 128000, eligibility: "Grade 5 completion" },
      { name: "Senior Secondary", duration: "2 years", fee: 156000, eligibility: "Grade 10, 55%+" },
    ],
    facilities: ["Library", "Sports Complex", "Transport", "Cafeteria", "Auditorium"],
    hostel: "No hostel facility; school transport across 14 routes.",
    placement: "Career guidance cell for senior secondary students.",
    admission: "Registration in November, assessment and parent interaction in December.",
    established: 1999,
    phone: "+91 40 2355 9090",
    email: "contact@harrowvale.edu.in",
    website: "https://harrowvale.edu.in",
    images: gallery(typeSchool),
  },
  {
    slug: "castleton-institute-of-technology",
    name: "Castleton Institute of Technology",
    type: "College",
    city: "Ahmedabad",
    state: "Gujarat",
    rating: 4.1,
    reviews: 742,
    description:
      "Engineering college with laboratories in embedded systems, robotics and applied data science.",
    about:
      "Castleton offers four-year engineering programmes with a compulsory industry project in the final year, supported by an on-campus incubation cell.",
    startingFee: 148000,
    courses: [
      { name: "B.Tech — Computer Science", duration: "4 years", fee: 168000, eligibility: "Grade 12 PCM + entrance" },
      { name: "B.Tech — Electronics", duration: "4 years", fee: 148000, eligibility: "Grade 12 PCM + entrance" },
      { name: "BCA", duration: "3 years", fee: 112000, eligibility: "Grade 12 with Mathematics" },
    ],
    facilities: ["Library", "Laboratories", "Hostel", "Wi-Fi Campus", "Sports Complex"],
    hostel: "Separate hostels for men and women with 620 total beds.",
    placement: "Placement cell with recruiters in software services, manufacturing and product firms.",
    admission: "State engineering entrance counselling and institute-level quota.",
    established: 2001,
    phone: "+91 79 4004 7700",
    email: "admissions@castleton.ac.in",
    website: "https://castleton.ac.in",
    images: gallery(typeCollege),
  },
  {
    slug: "vermont-hill-university",
    name: "Vermont Hill University",
    type: "University",
    city: "Kolkata",
    state: "West Bengal",
    rating: 4.4,
    reviews: 1585,
    description:
      "Liberal arts and sciences university with interdisciplinary majors and a residential college system.",
    about:
      "Vermont Hill's residential college structure pairs academic advising with small-group tutorials. Students design a major across two disciplines.",
    startingFee: 172000,
    courses: [
      { name: "BA (Hons) English", duration: "3 years", fee: 172000, eligibility: "Grade 12, 60%+" },
      { name: "B.Sc Data Science", duration: "3 years", fee: 235000, eligibility: "Grade 12 with Mathematics" },
      { name: "MA Public Policy", duration: "2 years", fee: 310000, eligibility: "Graduation, 55%+" },
      { name: "MBA", duration: "2 years", fee: 480000, eligibility: "Graduation + entrance score" },
    ],
    facilities: ["Library", "Hostel", "Wi-Fi Campus", "Auditorium", "Cafeteria", "Sports Complex"],
    hostel: "Residential colleges house 70% of undergraduates.",
    placement: "Career centre with fellowship and graduate-school advising alongside recruitment.",
    admission: "Application, aptitude assessment and interview across two rounds.",
    established: 1965,
    phone: "+91 33 2244 6600",
    email: "apply@vermonthill.edu.in",
    website: "https://vermonthill.edu.in",
    images: gallery(typeUniversity),
  },
  {
    slug: "stonebridge-college-of-design",
    name: "Stonebridge College of Design",
    type: "College",
    city: "Jaipur",
    state: "Rajasthan",
    rating: 4.0,
    reviews: 398,
    description:
      "Design college covering communication, product and interior design with studio-first teaching.",
    about:
      "Stonebridge runs studio-led programmes with workshops in wood, metal, textiles and digital fabrication.",
    startingFee: 158000,
    courses: [
      { name: "B.Des Communication Design", duration: "4 years", fee: 158000, eligibility: "Grade 12 + portfolio" },
      { name: "B.Des Product Design", duration: "4 years", fee: 172000, eligibility: "Grade 12 + portfolio" },
      { name: "M.Des", duration: "2 years", fee: 260000, eligibility: "Graduation + portfolio" },
    ],
    facilities: ["Library", "Laboratories", "Wi-Fi Campus", "Cafeteria"],
    hostel: "Limited hostel seats allotted on a first-come basis.",
    placement: "Studio and agency placements with an annual degree show.",
    admission: "Portfolio review followed by a studio test and interview.",
    established: 2010,
    phone: "+91 141 400 3300",
    email: "hello@stonebridge.ac.in",
    website: "https://stonebridge.ac.in",
    images: gallery(typeCollege),
  },
  {
    slug: "riverstone-grammar-school",
    name: "Riverstone Grammar School",
    type: "School",
    city: "Mumbai",
    state: "Maharashtra",
    rating: 4.5,
    reviews: 524,
    description:
      "Long-established grammar school with a rigorous academic core and a wide elective programme.",
    about:
      "Riverstone balances a traditional academic core with electives in robotics, debate and visual arts, supported by a modern learning resource centre.",
    startingFee: 145000,
    courses: [
      { name: "Primary", duration: "5 years", fee: 145000, eligibility: "Age 5+" },
      { name: "Secondary", duration: "5 years", fee: 178000, eligibility: "Grade 5 completion" },
      { name: "Senior Secondary — Science", duration: "2 years", fee: 210000, eligibility: "Grade 10, 65%+" },
    ],
    facilities: ["Library", "Laboratories", "Sports Complex", "Auditorium", "Transport"],
    hostel: "Boarding available for Grades 9–12 with 180 beds.",
    placement: "University counselling from Grade 11 onward.",
    admission: "Registration in September with staged assessment.",
    established: 1972,
    phone: "+91 22 6789 1100",
    email: "office@riverstone.edu.in",
    website: "https://riverstone.edu.in",
    images: gallery(typeSchool),
  },
  {
    slug: "kingsmoor-university",
    name: "Kingsmoor University",
    type: "University",
    city: "Chandigarh",
    state: "Punjab",
    rating: 4.2,
    reviews: 1104,
    description:
      "Multidisciplinary university with professional programmes in law, management, pharmacy and computing.",
    about:
      "Kingsmoor operates a compact residential campus with an emphasis on professional programmes and continuing education.",
    startingFee: 132000,
    courses: [
      { name: "BCA", duration: "3 years", fee: 132000, eligibility: "Grade 12 with Mathematics" },
      { name: "B.Tech — Computer Science", duration: "4 years", fee: 246000, eligibility: "Grade 12 PCM + entrance" },
      { name: "LLB", duration: "3 years", fee: 168000, eligibility: "Graduation, 45%+" },
      { name: "B.Pharm", duration: "4 years", fee: 198000, eligibility: "Grade 12 PCB/PCM" },
    ],
    facilities: ["Library", "Laboratories", "Hostel", "Wi-Fi Campus", "Cafeteria", "Transport"],
    hostel: "On-campus hostels with mess, laundry and 24×7 security.",
    placement: "Annual placement drive with regional and national recruiters.",
    admission: "University entrance test plus merit-based direct admission for select programmes.",
    established: 1991,
    phone: "+91 172 505 2200",
    email: "admissions@kingsmoor.edu.in",
    website: "https://kingsmoor.edu.in",
    images: gallery(typeUniversity),
  },
  {
    slug: "aldergrove-arts-college",
    name: "Aldergrove Arts College",
    type: "College",
    city: "Lucknow",
    state: "Uttar Pradesh",
    rating: 3.9,
    reviews: 312,
    description: "Humanities college offering language, history and social science programmes.",
    about:
      "Aldergrove focuses on humanities and social sciences with an active research archive and public lecture series.",
    startingFee: 62000,
    courses: [
      { name: "BA History", duration: "3 years", fee: 62000, eligibility: "Grade 12, 45%+" },
      { name: "BA Political Science", duration: "3 years", fee: 62000, eligibility: "Grade 12, 45%+" },
      { name: "MA Sociology", duration: "2 years", fee: 84000, eligibility: "Graduation, 50%+" },
    ],
    facilities: ["Library", "Cafeteria", "Wi-Fi Campus"],
    hostel: "Women's hostel only, 120 beds.",
    placement: "Guidance for civil services and postgraduate study.",
    admission: "Merit list based on Grade 12 aggregate.",
    established: 1968,
    phone: "+91 522 411 9900",
    email: "info@aldergrove.ac.in",
    website: "https://aldergrove.ac.in",
    images: gallery(typeCollege),
  },
  {
    slug: "brookfield-university-of-science",
    name: "Brookfield University of Science",
    type: "University",
    city: "Kochi",
    state: "Kerala",
    rating: 4.6,
    reviews: 1876,
    description:
      "Science and technology university with marine, environmental and computing research centres.",
    about:
      "Brookfield's coastal campus supports marine and environmental research alongside a growing computing school.",
    startingFee: 165000,
    courses: [
      { name: "B.Sc Marine Science", duration: "3 years", fee: 165000, eligibility: "Grade 12 PCB/PCM" },
      { name: "B.Tech — Computer Science", duration: "4 years", fee: 298000, eligibility: "Grade 12 PCM + entrance" },
      { name: "M.Sc Environmental Science", duration: "2 years", fee: 210000, eligibility: "B.Sc, 55%+" },
      { name: "MBA", duration: "2 years", fee: 420000, eligibility: "Graduation + entrance score" },
    ],
    facilities: [
      "Library",
      "Laboratories",
      "Hostel",
      "Wi-Fi Campus",
      "Sports Complex",
      "Cafeteria",
      "Auditorium",
    ],
    hostel: "Sea-facing residences with 1,400 beds across four blocks.",
    placement: "Research assistantships and industry placements in energy, shipping and software.",
    admission: "Entrance test with separate merit lists per programme.",
    established: 1983,
    phone: "+91 484 277 6600",
    email: "apply@brookfield.edu.in",
    website: "https://brookfield.edu.in",
    images: gallery(typeUniversity),
  },
];

export const cities = Array.from(new Set(institutions.map((i) => i.city))).sort();
export const allCourseNames = Array.from(
  new Set(institutions.flatMap((i) => i.courses.map((c) => c.name))),
).sort();

export const getInstitution = (slug: string) => institutions.find((i) => i.slug === slug);

export const formatFee = (fee: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(fee);
