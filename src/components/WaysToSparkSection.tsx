import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AthleticReveal } from './MotionPrimitives';

interface WaysToSparkSectionProps {
  onSelectService: (service: 'Book a Court' | 'Coaching Session') => void;
}

interface PanelData {
  id: string;
  key: 'court' | 'coaching';
  service: 'Book a Court' | 'Coaching Session';
  label: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
}

const PANELS: PanelData[] = [
  {
    id: 'court-booking',
    key: 'court',
    service: 'Book a Court',
    label: 'COURT BOOKING',
    headingLine1: 'RESERVE',
    headingLine2: 'YOUR COURT.',
    description:
      'Your next rally starts here. Find your court, bring your crew, and make every game count.',
    ctaLabel: 'Book a Court',
    imageSrc: '/images/panel-court-booking.jpg',
    imageAlt: 'Dramatic floodlit blue pickleball court with a red pickleball near the net',
  },
  {
    id: 'coaching',
    key: 'coaching',
    service: 'Coaching Session',
    label: 'COACHING',
    headingLine1: 'IMPROVE',
    headingLine2: 'YOUR GAME.',
    description:
      'From your first serve to your next breakthrough, discover coaching designed to help you play with confidence.',
    ctaLabel: 'Explore Coaching',
    imageSrc: '/images/panel-coaching.jpg',
    imageAlt: 'Dynamic action portrait of a pickleball player holding a matte black-and-red paddle under court floodlights',
  },
];

export function WaysToSparkSection({ onSelectService }: WaysToSparkSectionProps) {
  const [hovered, setHovered] = useState<'court' | 'coaching' | null>(null);

  return (
    <section
      id="ways-to-spark"
      aria-label="Court Bookings and Coaching"
      className="bg-[#08090B] border-t border-white/10"
    >
      <div className="flex flex-col lg:flex-row w-full">
        {PANELS.map((panel, index) => {
          const isHovered = hovered === panel.key;
          const isSiblingHovered = hovered !== null && hovered !== panel.key;

          const flexClass = isHovered
            ? 'lg:flex-[1.16]'
            : isSiblingHovered
              ? 'lg:flex-[0.84]'
              : 'lg:flex-1';

          return (
            <div
              key={panel.id}
              id={panel.id}
              onMouseEnter={() => setHovered(panel.key)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative overflow-hidden w-full min-w-0 min-h-[500px] sm:min-h-[560px] lg:min-h-[650px] flex flex-col justify-end transition-[flex] duration-500 ease-athletic ${flexClass} ${index === 0 ? 'border-b lg:border-b-0 lg:border-r border-white/15' : ''
                }`}
            >
              {/* Background Photograph */}
              <img
                src={panel.imageSrc}
                alt={panel.imageAlt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover brightness-[0.82] contrast-[1.08] saturate-[0.88] ${index === 1 ? 'object-[center_18%]' : 'object-center'
                  } transition-transform duration-700 ease-athletic ${isHovered ? 'scale-105' : 'scale-100'
                  }`}
              />

              {/* Contrasting Overlays: Court darkens sharply on bottom-left; Coaching holds moody athletic contrast */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-500 ${index === 0
                    ? 'bg-gradient-to-t from-[#08090B] via-[#08090B]/65 to-[#08090B]/35'
                    : 'bg-gradient-to-t from-[#08090B] via-[#111216]/65 to-[#08090B]/30'
                  }`}
              />
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-[#08090B] transition-opacity duration-500 ${isHovered ? 'opacity-20' : isSiblingHovered ? 'opacity-45' : 'opacity-10'
                  }`}
              />

              {/* Subtle Red Diagonal Accent Revealed on Hover (and faintly anchored on mobile) */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-0 right-0 w-36 h-36 sm:w-44 sm:h-44 bg-[#ED1725] clip-corner-slash transition-all duration-500 ease-athletic ${isHovered
                    ? 'opacity-90 translate-x-0 translate-y-0'
                    : 'opacity-25 lg:opacity-0 translate-x-4 translate-y-4'
                  }`}
              />

              {/* Panel Content */}
              <div className="relative z-10 p-7 sm:p-10 lg:p-14 xl:p-16 max-w-xl">
                <AthleticReveal>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[2px] w-6 bg-[#ED1725]" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C5C8CE]">
                      {panel.label}
                    </span>
                  </div>

                  <h3 className="font-athletic text-[2.65rem] sm:text-[3.75rem] lg:text-[4.5rem] leading-[0.88] text-white mb-4">
                    <span className="block">{panel.headingLine1}</span>
                    <span className="block">{panel.headingLine2}</span>
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-[#C5C8CE] max-w-md mb-8">
                    {panel.description}
                  </p>

                  <a
                    href="#enquiry"
                    onClick={() => onSelectService(panel.service)}
                    className={`inline-flex items-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === 0
                        ? 'bg-[#ED1725] hover:bg-[#A60E19] text-white'
                        : 'border border-white/80 text-white hover:bg-white hover:text-[#08090B]'
                      }`}
                  >
                    <span>{panel.ctaLabel}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ease-athletic ${isHovered ? 'translate-x-1.5' : 'group-hover:translate-x-1.5'
                        }`}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </a>
                </AthleticReveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
