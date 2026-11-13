export interface SocialLinkConfig {
  label: 'Instagram' | 'YouTube' | 'TikTok';
  url: string; // Leave empty string until an official verified URL is available
}

export interface SiteConfig {
  brand: {
    name: string;
    location: string;
    address: string;
    phone: string;
    phoneRaw: string;
    mapUrl: string;
    /**
     * DROP-IN LOGO SLOT:
     * Place the original SPARK PICKLEBALL logo file (e.g. spark-logo.svg or spark-logo.png)
     * inside `/public/brand/` and set `logoSrc` to `'/brand/spark-logo.svg'` (or `.png`).
     * The BrandLogo component will render your exact file untouched — no recoloring, filters, or distortion.
     */
    logoSrc: string;
    logoAlt: string;
  };
  bookingIntegration: {
    /**
     * CONFIGURABLE BOOKING / ENQUIRY ENDPOINT:
     * Set `VITE_BOOKING_API_URL` in `.env` (or provide a URL here) to POST JSON enquiry payloads
     * directly to your backend, CRM webhook, or booking API.
     * When empty, the form runs in validated preview mode without faking a backend confirmation.
     */
    endpoint: string;
  };
  socialLinks: SocialLinkConfig[];
}

export const siteConfig: SiteConfig = {
  brand: {
    name: 'SPARK Pickleball',
    location: 'Dubai, UAE',
    address: '132 Abu Baker Al Siddique St - Al Muraqqabat - Deira - Dubai',
    phone: '+971 54 140 0964',
    phoneRaw: '+971541400964',
    mapUrl: 'https://maps.google.com/?q=132+Abu+Baker+Al+Siddique+St+-+Al+Muraqqabat+-+Deira+-+Dubai',
    logoSrc: '',
    logoAlt: 'SPARK Pickleball Logo',
  },
  bookingIntegration: {
    endpoint: import.meta.env.VITE_BOOKING_API_URL || '',
  },
  socialLinks: [
    { label: 'Instagram', url: '' },
    { label: 'YouTube', url: '' },
    { label: 'TikTok', url: '' },
  ],
};

export interface NavItem {
  label: string;
  href: string;
  presetService?: 'Book a Court' | 'Coaching Session';
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Coaching', href: '#ways-to-spark', presetService: 'Coaching Session' },
  { label: 'Packages', href: '#packages' },
  { label: 'Book a Court', href: '#enquiry', presetService: 'Book a Court' },
  { label: 'Community', href: '#community' },
  { label: 'FAQ', href: '#faq' },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'experience',
    question: 'Do I need prior experience to play?',
    answer:
      'Not at all. Pickleball is quick to pick up from your very first rally, and SPARK welcomes complete beginners alongside regular players. Simply share your level in the enquiry form and we will point you to the right court or session.',
  },
  {
    id: 'group-booking',
    question: 'Can I book a court for a group?',
    answer:
      'Yes. Whether you are planning a casual doubles match with friends or bringing a larger crew together, send through a court booking enquiry with your preferred details and our team will assist with the setup.',
  },
  {
    id: 'coaching-options',
    question: 'What coaching options are available?',
    answer:
      'SPARK offers coaching tailored to your stage of play — from building core fundamentals and court positioning to sharpening match strategy and consistency. Select Coaching Session in the enquiry form or check our Coaching Packages to choose your pathway.',
  },
  {
    id: 'beginner-coaching',
    question: 'Can beginners join coaching sessions?',
    answer:
      'Yes — beginners are warmly encouraged to join coaching. Our First Spark package and Beginner skill level option are specifically designed to give you confidence and proper technique from day one.',
  },
  {
    id: 'court-availability',
    question: 'How can I enquire about court availability?',
    answer:
      'Use the Booking Enquiry form below, reach out via WhatsApp or phone at +971 54 140 0964, or visit us at 132 Abu Baker Al Siddique St, Al Muraqqabat, Deira, Dubai. Our team will coordinate available court slots and session timings with you immediately.',
  },
];
