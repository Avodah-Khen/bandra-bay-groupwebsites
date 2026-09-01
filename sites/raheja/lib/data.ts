export type Unit = {
  id: string;
  unitType: string;
  carpetArea: number | null;
  floor: string | null;
  price: number | null;
  status: string;
};

export type RahejaProject = {
  id: string;
  slug: string;
  title: string;
  category: "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL";
  status: string;
  published: boolean;
  featured: boolean;
  heroImage: string;
  location: string;
  city: string;
  state: string;
  shortDesc: string;
  description: string;
  bhk: string;
  areaFrom: string;
  areaTo: string;
  possessionDate: string;
  reraNumber: string;
  createdAt: string;
  units: Unit[];
};

const now = new Date().toISOString();

export const projects: RahejaProject[] = [
  {
    id: "p1",
    slug: "evergreen",
    title: "Evergreen",
    category: "RESIDENTIAL",
    status: "OC_RECEIVED",
    published: true,
    featured: true,
    heroImage: "/projects/evergreen.jpg",
    location: "Perry Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "A contemporary residential address on Perry Road in the heart of Bandra West.",
    description:
      "Evergreen by S. Raheja Realty is a contemporary architectural statement with sculpted, wave-like elevation, refined materials and thoughtfully curated amenities.",
    bhk: "3, 4 & 5 Bedroom Residences",
    areaFrom: "",
    areaTo: "",
    possessionDate: "OC Received",
    reraNumber: "P51800045921",
    createdAt: now,
    units: [],
  },

  {
    id: "p2",
    slug: "newlight",
    title: "Newlight",
    category: "RESIDENTIAL",
    status: "COMPLETED",
    published: true,
    featured: true,
    heroImage: "/projects/newlight.jpg",
    location: "South Avenue, Khar West",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "A residential address in South Avenue, Khar West.",
    description:
      "Newlight is part of S. Raheja Realty's established portfolio of residential developments across Mumbai's western suburbs.",
    bhk: "Residential",
    areaFrom: "",
    areaTo: "",
    possessionDate: "Completed",
    reraNumber: "",
    createdAt: now,
    units: [],
  },

  {
    id: "p3",
    slug: "fairfield",
    title: "Fairfield",
    category: "RESIDENTIAL",
    status: "OC_RECEIVED",
    published: true,
    featured: true,
    heroImage: "/projects/fairfield.jpg",
    location: "South Avenue, Santacruz West",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "A landmark residential development offering uninterrupted views and curated luxury.",
    description:
      "Fairfield at South Avenue, Santacruz West offers uninterrupted views and a carefully curated collection of amenities.",
    bhk: "3, 4 & 5 BHK",
    areaFrom: "",
    areaTo: "",
    possessionDate: "OC Received",
    reraNumber: "P51800045921",
    createdAt: now,
    units: [],
  },

  {
    id: "p4",
    slug: "worq",
    title: "WORQ",
    category: "COMMERCIAL",
    status: "LAUNCHED",
    published: true,
    featured: true,
    heroImage: "/projects/worq.jpg",
    location: "14th Road, Khar West",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "A modern workspace with a bold architectural identity in Khar West.",
    description:
      "WORQ is a modern workspace located in Khar West, designed around a distinctive architectural silhouette and contemporary business requirements.",
    bhk: "Commercial Workspace",
    areaFrom: "",
    areaTo: "",
    possessionDate: "Launched October 2025",
    reraNumber: "PC1180002503082",
    createdAt: now,
    units: [],
  },

  {
    id: "p5",
    slug: "la-em",
    title: "La Em",
    category: "RESIDENTIAL",
    status: "ONGOING",
    published: true,
    featured: true,
    heroImage: "/projects/la-em.jpg",
    location: "14th Road, Khar West",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "A refined residential development crafted in collaboration with Talati and Partners.",
    description:
      "La Em in Khar West has been meticulously crafted for those who appreciate a subtle language of excellence, with thoughtfully planned amenities and landscaped spaces.",
    bhk: "4 & 5 BHK",
    areaFrom: "",
    areaTo: "",
    possessionDate: "Expected OC in 2026",
    reraNumber: "P51800066507",
    createdAt: now,
    units: [],
  },

  {
    id: "p6",
    slug: "park-eleven",
    title: "Park Eleven",
    category: "RESIDENTIAL",
    status: "ONGOING",
    published: true,
    featured: true,
    heroImage: "/projects/park-eleven.jpg",
    location: "Madhu Park, Khar West",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "A peaceful residential address overlooking Madhu Park in Khar West.",
    description:
      "Park Eleven combines a vantage location overlooking Madhu Park with thoughtfully designed residences and curated amenities.",
    bhk: "3 & 4 BHK",
    areaFrom: "",
    areaTo: "",
    possessionDate: "Expected OC in 2026",
    reraNumber: "P51800056479",
    createdAt: now,
    units: [],
  },

  {
    id: "p7",
    slug: "pearl-queen",
    title: "Pearl Queen",
    category: "RESIDENTIAL",
    status: "ONGOING",
    published: true,
    featured: true,
    heroImage: "/projects/pearl-queen.jpg",
    location: "Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "A residential development from the S. Raheja Realty portfolio.",
    description:
      "Pearl Queen is part of S. Raheja Realty's current ongoing project portfolio.",
    bhk: "Residential",
    areaFrom: "",
    areaTo: "",
    possessionDate: "Ongoing",
    reraNumber: "",
    createdAt: now,
    units: [],
  },

  {
    id: "p8",
    slug: "verdana",
    title: "Verdana",
    category: "RESIDENTIAL",
    status: "LAUNCHED",
    published: true,
    featured: true,
    heroImage: "/projects/verdana.jpg",
    location: "6th Road, Juhu",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "A boutique development on Juhu's prominent 6th Road, opposite a park.",
    description:
      "Verdana is a low-density boutique development designed around privacy, green open views and flexible column-free living environments.",
    bhk: "3 & 4 BHK",
    areaFrom: "",
    areaTo: "",
    possessionDate: "Launched March 2025",
    reraNumber: "PR1180002502201",
    createdAt: now,
    units: [],
  },

  {
    id: "p9",
    slug: "homeland-homecourt",
    title: "Homeland Homecourt",
    category: "RESIDENTIAL",
    status: "UPCOMING",
    published: true,
    featured: false,
    heroImage: "/projects/homeland-homecourt.jpg",
    location: "Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "An upcoming residential development from S. Raheja Realty.",
    description:
      "Homeland Homecourt is listed among S. Raheja Realty's upcoming projects.",
    bhk: "Residential",
    areaFrom: "",
    areaTo: "",
    possessionDate: "Upcoming",
    reraNumber: "",
    createdAt: now,
    units: [],
  },

  {
    id: "p10",
    slug: "carter-apartments",
    title: "Carter Apartments",
    category: "RESIDENTIAL",
    status: "UPCOMING",
    published: true,
    featured: false,
    heroImage: "/projects/carter-apartments.jpg",
    location: "Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    shortDesc:
      "An upcoming residential project in the S. Raheja Realty portfolio.",
    description:
      "Carter Apartments is listed as an upcoming project by S. Raheja Realty.",
    bhk: "Residential",
    areaFrom: "",
    areaTo: "",
    possessionDate: "Upcoming",
    reraNumber: "",
    createdAt: now,
    units: [],
  },
];

export const blogPosts = [
  {
    id: "b1",
    slug: "designing-mumbais-next-generation-addresses",
    title: "Designing Mumbai's Next Generation Addresses",
    excerpt:
      "How thoughtful planning, architecture and location shape enduring urban developments.",
    content:
      "Mumbai's evolving neighbourhoods continue to create opportunities for thoughtfully designed residential and commercial developments.",
    published: true,
    createdAt: now,
  },
  {
    id: "b2",
    slug: "building-with-intention",
    title: "Building With Intention",
    excerpt:
      "A perspective on quality, design and long-term value in real estate.",
    content:
      "Real estate developments become enduring addresses when architecture, usability, connectivity and quality are considered together.",
    published: true,
    createdAt: now,
  },
];

export const leads = [
  {
    id: "l1",
    name: "Demo Enquiry",
    phone: "+91 90000 00000",
    email: "demo@example.com",
    project: projects[0],
    status: "NEW",
    source: "WEBSITE",
    createdAt: now,
  },
];