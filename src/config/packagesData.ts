export type PackageCategoryId = 'court' | 'coaching';

export interface PackageItem {
  id: string;
  category: PackageCategoryId;
  number: string;
  name: string;
  description: string;
  features: string[];
  ctaLabel: string;
  priceLabel: string; // "Price on Enquiry" per requirement
  serviceTarget: 'Book a Court' | 'Coaching Session';
}

export const COURT_PACKAGES: PackageItem[] = [
  {
    id: 'single-session',
    category: 'court',
    number: '01',
    name: 'SINGLE SESSION',
    description: 'For spontaneous games and occasional court time.',
    features: [
      'One-time court booking',
      'Flexible scheduling subject to availability',
      'Ideal for casual matches',
    ],
    ctaLabel: 'Enquire Now',
    priceLabel: 'Price on Enquiry',
    serviceTarget: 'Book a Court',
  },
  {
    id: 'multi-play-pass',
    category: 'court',
    number: '02',
    name: 'MULTI-PLAY PASS',
    description: 'For players who keep coming back.',
    features: [
      'Multiple court sessions',
      'Convenient recurring play',
      'Ideal for friends and regular players',
    ],
    ctaLabel: 'Explore Package',
    priceLabel: 'Price on Enquiry',
    serviceTarget: 'Book a Court',
  },
  {
    id: 'group-play',
    category: 'court',
    number: '03',
    name: 'GROUP PLAY',
    description: 'For groups who want to play together.',
    features: [
      'Group court enquiries',
      'Suitable for friendly matches',
      'Scheduling based on group requirements',
    ],
    ctaLabel: 'Enquire Now',
    priceLabel: 'Price on Enquiry',
    serviceTarget: 'Book a Court',
  },
];

export const COACHING_PACKAGES: PackageItem[] = [
  {
    id: 'first-spark',
    category: 'coaching',
    number: '01',
    name: 'FIRST SPARK',
    description: 'A starting point for players discovering pickleball.',
    features: [
      'Beginner-focused coaching',
      'Fundamental techniques',
      'Confidence-building practice',
    ],
    ctaLabel: 'Start Learning',
    priceLabel: 'Price on Enquiry',
    serviceTarget: 'Coaching Session',
  },
  {
    id: 'level-up',
    category: 'coaching',
    number: '02',
    name: 'LEVEL UP',
    description: 'For players ready to improve their consistency.',
    features: [
      'Skill development',
      'Technique refinement',
      'Structured practice',
    ],
    ctaLabel: 'Explore Coaching',
    priceLabel: 'Price on Enquiry',
    serviceTarget: 'Coaching Session',
  },
  {
    id: 'private-coaching',
    category: 'coaching',
    number: '03',
    name: 'PRIVATE COACHING',
    description: 'Personalized attention focused on your development.',
    features: [
      'Individual coaching enquiries',
      'Tailored learning objectives',
      'Flexible session planning',
    ],
    ctaLabel: 'Enquire Now',
    priceLabel: 'Price on Enquiry',
    serviceTarget: 'Coaching Session',
  },
];

export const ALL_PACKAGES: PackageItem[] = [
  ...COURT_PACKAGES,
  ...COACHING_PACKAGES,
];

