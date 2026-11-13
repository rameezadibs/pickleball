import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import {
  PackageCategoryId,
  PackageItem,
  COURT_PACKAGES,
  COACHING_PACKAGES,
} from '../config/packagesData';
import { ATHLETIC_EASE, AthleticReveal } from './MotionPrimitives';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

export function PackagesSection({ onSelectPackage }: PackagesSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<PackageCategoryId>('court');
  const [hoveredPackageId, setHoveredPackageId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const packages =
    activeCategory === 'court' ? COURT_PACKAGES : COACHING_PACKAGES;

  const handleCtaClick = (pkg: PackageItem) => {
    onSelectPackage(pkg);
    const target = document.getElementById('enquiry');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="packages"
      aria-label="SPARK Packages"
      className="relative bg-[#08090B] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-white/10"
    >
      {/* Large Decorative Pickleball Court-Line Background Graphic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-15 select-none"
      >
        <svg
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1400px] max-w-none h-auto -rotate-12 translate-x-24 translate-y-12"
        >
          {/* Outer Court Boundary */}
          <rect
            x="40"
            y="40"
            width="1120"
            height="520"
            stroke="#C5C8CE"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          {/* Center Net Line */}
          <line
            x1="600"
            y1="20"
            x2="600"
            y2="580"
            stroke="#ED1725"
            strokeWidth="3"
          />
          {/* Non-Volley Zone (Kitchen) Lines: 7ft each side proportionally */}
          <line
            x1="430"
            y1="40"
            x2="430"
            y2="560"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <line
            x1="770"
            y1="40"
            x2="770"
            y2="560"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Center Service Lines */}
          <line
            x1="40"
            y1="300"
            x2="430"
            y2="300"
            stroke="#C5C8CE"
            strokeWidth="2"
          />
          <line
            x1="770"
            y1="300"
            x2="1160"
            y2="300"
            stroke="#C5C8CE"
            strokeWidth="2"
          />
          {/* Subtle angled speed lines */}
          <line
            x1="180"
            y1="560"
            x2="520"
            y2="40"
            stroke="#ED1725"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <line
            x1="680"
            y1="560"
            x2="1020"
            y2="40"
            stroke="#ED1725"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <AthleticReveal className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-7 bg-[#ED1725]" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C5C8CE]">
                FIND YOUR FIT
              </span>
            </div>

            <h2 className="font-athletic text-[2.75rem] sm:text-[4.25rem] xl:text-[5.5rem] leading-[0.87] text-white mb-4">
              <span className="block">YOUR GAME.</span>
              <span className="block text-[#ED1725]">YOUR PACKAGE.</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#C5C8CE] max-w-xl">
              From casual rallies to consistent training, there&apos;s a way to play
              that fits your goals.
            </p>
          </AthleticReveal>

          {/* Animated Segmented Category Selector */}
          <AthleticReveal delay={0.1}>
            <div
              role="tablist"
              aria-label="Package categories"
              className="inline-flex items-center bg-[#111216] border border-white/15 p-1.5 gap-1.5"
            >
              <button
                type="button"
                role="tab"
                id="tab-court"
                aria-selected={activeCategory === 'court'}
                aria-controls="panel-packages"
                onClick={() => setActiveCategory('court')}
                className={`relative px-5 sm:px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1725] ${
                  activeCategory === 'court'
                    ? 'text-white'
                    : 'text-[#C5C8CE] hover:text-white'
                }`}
              >
                {activeCategory === 'court' && (
                  <motion.span
                    layoutId={prefersReduced ? undefined : 'active-package-tab'}
                    className="absolute inset-0 bg-[#ED1725]"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 35,
                    }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">COURT PACKAGES</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-coaching"
                aria-selected={activeCategory === 'coaching'}
                aria-controls="panel-packages"
                onClick={() => setActiveCategory('coaching')}
                className={`relative px-5 sm:px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1725] ${
                  activeCategory === 'coaching'
                    ? 'text-white'
                    : 'text-[#C5C8CE] hover:text-white'
                }`}
              >
                {activeCategory === 'coaching' && (
                  <motion.span
                    layoutId={prefersReduced ? undefined : 'active-package-tab'}
                    className="absolute inset-0 bg-[#ED1725]"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 35,
                    }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">COACHING PACKAGES</span>
              </button>
            </div>
          </AthleticReveal>
        </div>

        {/* Horizontally Stacked Package Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            id="panel-packages"
            role="tabpanel"
            aria-labelledby={
              activeCategory === 'court' ? 'tab-court' : 'tab-coaching'
            }
            initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: ATHLETIC_EASE }}
            className="space-y-4 sm:space-y-5"
          >
            {packages.map((pkg) => {
              const isHovered = hoveredPackageId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onMouseEnter={() => setHoveredPackageId(pkg.id)}
                  onMouseLeave={() => setHoveredPackageId(null)}
                  className={`group relative bg-[#111216]/80 border transition-all duration-300 overflow-hidden ${
                    isHovered
                      ? 'border-[#ED1725] bg-[#111216] shadow-[0_12px_40px_rgba(237,23,37,0.12)]'
                      : 'border-white/15 hover:border-white/30'
                  }`}
                >
                  {/* Subtle red indicator bar on left */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#ED1725] transition-transform duration-300 ease-athletic origin-top ${
                      isHovered ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />

                  {/* Corner diagonal accent slash */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-0 right-0 w-24 h-24 bg-[#ED1725]/20 clip-corner-slash transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
                    {/* Left: Number + Title & Description */}
                    <div className="flex items-start gap-5 sm:gap-8 lg:max-w-md xl:max-w-lg">
                      <span
                        className={`font-athletic text-4xl sm:text-6xl lg:text-7xl leading-none select-none shrink-0 transition-colors duration-300 ${
                          isHovered
                            ? 'text-[#ED1725]'
                            : 'text-[#C5C8CE]/35 group-hover:text-white/60'
                        }`}
                      >
                        {pkg.number}
                      </span>

                      <div>
                        <h3 className="font-athletic text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal leading-tight mb-2">
                          {pkg.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#C5C8CE] leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Feature list */}
                    <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8 flex-1">
                      <ul className="space-y-2 text-xs sm:text-sm text-[#C5C8CE]">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5">
                            <span className="w-4 h-4 rounded-none bg-[#ED1725]/15 border border-[#ED1725]/40 flex items-center justify-center shrink-0">
                              <Check
                                className="w-3 h-3 text-[#ED1725]"
                                strokeWidth={2.5}
                                aria-hidden="true"
                              />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Price + Action CTA */}
                    <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-5 lg:pt-0 lg:pl-8 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0">
                      <div className="text-left lg:text-right">
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#C5C8CE]/60 block">
                          Rate
                        </span>
                        <span className="font-athletic text-xl sm:text-2xl text-white tracking-wide block">
                          {pkg.priceLabel}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCtaClick(pkg)}
                        className="group/btn inline-flex items-center gap-2.5 bg-[#ED1725] hover:bg-[#A60E19] text-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
                      >
                        <span>{pkg.ctaLabel}</span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-300 ease-athletic group-hover/btn:translate-x-1"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Subtle Bottom Note */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#C5C8CE]/60">
          <p>
            All packages are subject to court availability and session confirmation.
          </p>
          <a
            href="#enquiry"
            className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4"
          >
            Have a custom requirement? Talk to our team &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
