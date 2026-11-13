import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ATHLETIC_EASE } from './MotionPrimitives';

interface HeroSectionProps {
  onBookCourtClick: () => void;
  onExploreCoachingClick?: () => void;
}

export function HeroSection({ onBookCourtClick, onExploreCoachingClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const decoY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[640px] h-[100svh] max-h-[960px] flex items-center bg-[#08090B] overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24"
    >
      {/* Background Photography with subtle initial zoom + desktop parallax */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.img
          src="/images/hero-court.jpg"
          alt="Professional blue pickleball court in Dubai at sunset with floodlights, Dubai skyline, black-and-red paddle, and red pickleball near the net"
          initial={prefersReduced ? false : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: ATHLETIC_EASE }}
          className="w-full h-full object-cover object-[62%_center] sm:object-center"
          fetchPriority="high"
        />

        {/* Directional dark overlays for crisp typography readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#08090B]/95 via-[#08090B]/70 to-[#08090B]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B]/55"
        />
      </motion.div>

      {/* Subtle paddle-inspired architectural diagonal motion lines */}
      <motion.div
        aria-hidden="true"
        style={prefersReduced ? undefined : { y: decoY }}
        initial={prefersReduced ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, delay: 0.35, ease: ATHLETIC_EASE }}
        className="pointer-events-none hidden md:block absolute right-6 lg:right-14 bottom-10 lg:bottom-16 z-10"
      >
        <svg
          width="180"
          height="220"
          viewBox="0 0 180 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70"
        >
          {/* Minimal angled geometric frame inspired by a carbon paddle profile */}
          <path
            d="M44 18 L142 18 C154 18 162 26 162 38 L162 128 C162 146 146 160 124 166 L96 174 L84 210"
            stroke="#ED1725"
            strokeWidth="1.5"
            strokeOpacity="0.65"
          />
          <line
            x1="18"
            y1="196"
            x2="152"
            y2="42"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.16"
          />
        </svg>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0.85, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: ATHLETIC_EASE }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-[2px] w-8 bg-[#ED1725]" aria-hidden="true" />
            <span className="text-xs sm:text-[0.8125rem] font-semibold uppercase tracking-[0.26em] text-[#C5C8CE]">
              PICKLEBALL IN DUBAI
            </span>
          </motion.div>

          {/* Primary H1 */}
          <h1 className="font-athletic text-[3.5rem] sm:text-[5.75rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.86] tracking-[-0.025em] mb-5">
            <motion.span
              initial={prefersReduced ? false : { opacity: 0.9, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: ATHLETIC_EASE }}
              className="block text-white"
            >
              BRING THE
            </motion.span>
            <motion.span
              initial={prefersReduced ? false : { opacity: 0.9, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: ATHLETIC_EASE }}
              className="block text-[#ED1725]"
            >
              HEAT.
            </motion.span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0.9, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: ATHLETIC_EASE }}
            className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white mb-4"
          >
            Play. Learn. Compete.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0.9, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: ATHLETIC_EASE }}
            className="text-sm sm:text-base md:text-[1.0625rem] leading-relaxed text-[#C5C8CE] max-w-xl mb-9"
          >
            Dubai&apos;s destination for pickleball — bringing together quality courts,
            expert coaching, and a growing community of players at every level.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0.95, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: ATHLETIC_EASE }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href="#enquiry"
              onClick={onBookCourtClick}
              className="group inline-flex items-center justify-center gap-3 bg-[#ED1725] hover:bg-[#A60E19] text-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Book a Court</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-athletic group-hover:translate-x-1.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>

            <a
              href="#coaching"
              onClick={onExploreCoachingClick}
              className="group inline-flex items-center justify-center gap-3 bg-[#ED1725] hover:bg-[#A60E19] text-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore Coaching</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-athletic group-hover:translate-x-1.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
