import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../config/siteConfig';
import { ATHLETIC_EASE, AthleticReveal } from './MotionPrimitives';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const prefersReduced = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative bg-[#08090B] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-white/10"
    >
      {/* Decorative right-edge paddle-and-ball studio image (never obstructs content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-[310px] 2xl:w-[380px] h-[480px] opacity-80"
      >
        <img
          src="/images/faq-paddle-ball.jpg"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Side */}
          <div className="lg:col-span-4 min-w-0">
            <AthleticReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-7 bg-[#ED1725]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C5C8CE]">
                  FAQ
                </span>
              </div>

              <h2 className="font-athletic text-[2.75rem] sm:text-[4.25rem] lg:text-[5rem] leading-[0.87] text-white">
                <span className="block">GOT</span>
                <span className="block text-[#ED1725]">QUESTIONS?</span>
              </h2>
            </AthleticReveal>
          </div>

          {/* Right Side: Minimal Dark Accordion with Thin Silver Borders */}
          <div className="lg:col-span-7 xl:col-span-6 min-w-0">
            <div className="border-t border-[#C5C8CE]/25">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                const buttonId = `faq-btn-${item.id}`;
                const panelId = `faq-panel-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className="border-b border-[#C5C8CE]/25"
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleItem(item.id)}
                        className="w-full py-6 flex items-center justify-between gap-6 text-left group focus:outline-none focus-visible:text-[#ED1725]"
                      >
                        <span
                          className={`text-base sm:text-lg font-medium transition-colors duration-200 ${
                            isOpen
                              ? 'text-white'
                              : 'text-[#C5C8CE] group-hover:text-white'
                          }`}
                        >
                          {item.question}
                        </span>

                        <span
                          className={`shrink-0 w-7 h-7 flex items-center justify-center transition-transform duration-300 ease-athletic ${
                            isOpen ? 'rotate-45 text-[#ED1725]' : 'text-[#C5C8CE] group-hover:text-white'
                          }`}
                          aria-hidden="true"
                        >
                          <Plus className="w-5 h-5" strokeWidth={1.75} />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={
                            prefersReduced
                              ? { opacity: 1 }
                              : { height: 0, opacity: 0 }
                          }
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={
                            prefersReduced
                              ? { opacity: 0 }
                              : { height: 0, opacity: 0 }
                          }
                          transition={{ duration: 0.32, ease: ATHLETIC_EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-8 text-sm sm:text-[0.9375rem] leading-relaxed text-[#C5C8CE]">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
