export const SITE = {
  name: "Elements Realty",
  tagline: "#BeInYourElement",
  phone: "022-4964 1636",
  email: "info@elementsrealty.in",
  careers: "careers@elementsrealty.in",
  office:
    "Unit No. 511, Fifth Floor, The Capital, G Block Road, Bandra Kurla Complex, Mumbai - 400051, Maharashtra, India",
  registered:
    "3/20, Kilachand Building, 298 - Princess Street, Marine Lines, Mumbai - 400002, Maharashtra, India",
};

export const PILLARS = [
  {
    title: "Nature",
    body: "Inspired by our surrounding, give-more-take-less.",
  },
  {
    title: "Technology at Core",
    body: "Leveraging the 21st-century ecosystem to deliver with quality and punctuality.",
  },
  {
    title: "Uncompromised Trust and Transparency",
    body: "Your trust in us is our biggest strength and drive, nothing else comes close.",
  },
  {
    title: "Efficiency in Planning",
    body: "Money saved for us in quality, helps us make superior lifestyle accessible to you.",
  },
  {
    title: "Growth for Everyone",
    body: "We take care of our associates and partners so that they in turn care for our customers.",
  },
  {
    title: "Thoughtful Design",
    body: "Designs which are thoughtful and take care of people from all walks of life and age.",
  },
  {
    title: "Desirable Locations",
    body: "Choosing locations that enhance our residents' lives by offering seamless connectivity.",
  },
  {
    title: "Love for Customer",
    body: "Ensuring customer centricity.",
  },
];

export const TEAM = [
  {
    name: "Mr. Mulraj P. Mody",
    role: "Brings the element of Quality",
    bio: "Commenced his journey in Kuwait as a supervisor and subcontractor. On his return to Bombay, he brought together every element of construction — quality architectural tools & materials — to create picture-perfect homes.",
  },
  {
    name: "Mr. Sumit V. Mody",
    role: "Brings the element of Innovation",
    bio: "Started as a Risk Management Professional, who eventually joined the family business where he now does project acquisitions and makes sure to bring innovation in every project with his experience and vision.",
  },
  {
    name: "Mr. Shyamal V. Mody",
    role: "Brings the Element of Vision",
    bio: "With years of experience, Mr Shyamal Mody leads Elements Realty with a forward-thinking approach, driving growth, creating innovative projects, and reshaping Mumbai's skyline with cutting-edge design and technology.",
  },
];

export const STATS = [
  { label: "Years Young", value: "10+" },
  { label: "Sq. Ft. Delivered", value: "1M+" },
  { label: "Ongoing MMR Projects", value: "5+" },
];

export function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
