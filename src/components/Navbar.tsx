import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS, NavItem, siteConfig } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';
import { ATHLETIC_EASE } from './MotionPrimitives';

interface NavbarProps {
  onNavigateService?: (service: string) => void;
}

export function Navbar({ onNavigateService }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 36);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (item: NavItem) => {
    setMobileOpen(false);
    if (item.presetService && onNavigateService) {
      onNavigateService(item.presetService);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08090B]/95 backdrop-blur-md border-b border-white/10 py-3.5'
            : 'bg-gradient-to-b from-[#08090B]/85 via-[#08090B]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          {/* Left: Original SPARK Logo */}
          <a
            href="#home"
            className="relative z-10 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1725]"
            aria-label={`${siteConfig.brand.name} — Back to top`}
          >
            <BrandLogo size="nav" />
          </a>

          {/* Center: Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 xl:gap-9"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item)}
                className="group relative py-1 text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-[#C5C8CE] hover:text-white transition-colors duration-200 focus:outline-none focus-visible:text-white"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#ED1725] transition-all duration-300 ease-athletic group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Book Now CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#enquiry"
              onClick={() => onNavigateService?.('Book a Court')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#ED1725] hover:bg-[#A60E19] text-white px-5 py-2.5 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Book Now</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-athletic group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-white/20 text-white hover:border-[#ED1725] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1725]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: ATHLETIC_EASE }}
            className="fixed inset-0 z-40 bg-[#08090B] flex flex-col justify-between pt-24 pb-10 px-6 sm:px-10 lg:hidden overflow-y-auto"
          >
            {/* Subtle diagonal accent stripe */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed bottom-0 right-0 w-48 h-48 bg-[#ED1725]/15 clip-corner-slash"
            />

            <nav aria-label="Mobile navigation links" className="flex flex-col border-t border-white/10">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleLinkClick(item)}
                  initial={prefersReduced ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.3, ease: ATHLETIC_EASE }}
                  className="flex items-center justify-between py-4 border-b border-white/10 font-athletic text-4xl text-white hover:text-[#ED1725] transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-5 h-5 text-[#ED1725]" aria-hidden="true" />
                </motion.a>
              ))}
            </nav>

            <div className="pt-8 space-y-5">
              <a
                href="#enquiry"
                onClick={() => {
                  setMobileOpen(false);
                  onNavigateService?.('Book a Court');
                }}
                className="flex items-center justify-center gap-2.5 w-full bg-[#ED1725] hover:bg-[#A60E19] text-white py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C5C8CE] text-center">
                {siteConfig.brand.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

