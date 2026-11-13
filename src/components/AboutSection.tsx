import { CircleDot, Compass, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ATHLETIC_EASE,
  AthleticReveal,
  ImageMaskReveal,
} from './MotionPrimitives';

const PILLARS = [
  {
    title: 'Play',
    description: 'Find your next game and reserve a court.',
    Icon: CircleDot,
  },
  {
    title: 'Learn',
    description: 'Build confidence and sharpen your skills through coaching.',
    Icon: Compass,
  },
  {
    title: 'Connect',
    description: 'Meet players who share your passion for pickleball.',
    Icon: Users,
  },
] as const;

export function AboutSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative bg-[#F4F1EA] text-[#08090B] overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Side: Elevated/Overhead Photograph with Diagonal Edge */}
        <div className="lg:col-span-5 min-w-0 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[640px] bg-[#F4F1EA]">
          <ImageMaskReveal direction="left" className="w-full h-full">
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[640px] clip-diagonal-about overflow-hidden">
              <img
                src="/images/about-overhead.jpg"
                alt="Elevated view of two players competing in a pickleball rally on a blue-and-red court"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Subtle edge contrast shadow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-[#08090B]/25 via-transparent to-transparent"
              />
            </div>
          </ImageMaskReveal>

          {/* Precision red accent line tracing the exact diagonal cut */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="hidden lg:block pointer-events-none absolute inset-0 w-full h-full"
          >
            <line
              x1="100"
              y1="0"
              x2="86"
              y2="100"
              stroke="#ED1725"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Center & Right Editorial Canvas */}
        <div className="lg:col-span-7 min-w-0 flex items-center px-5 sm:px-10 lg:px-12 xl:px-16 py-14 sm:py-20 lg:py-24">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Center Content */}
            <div className="md:col-span-7 min-w-0">
              <AthleticReveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-7 bg-[#ED1725]" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#08090B]/70">
                    ABOUT SPARK
                  </span>
                </div>

                <h2 className="font-athletic text-[2.35rem] sm:text-[3.5rem] xl:text-[4.35rem] leading-[0.88] text-[#08090B] mb-6">
                  <span className="block">SOME CALL IT A GAME.</span>
                  <span className="block">WE CALL IT YOUR</span>
                  <span className="block text-[#ED1725]">NEW THING.</span>
                </h2>

                <p className="text-[0.9375rem] sm:text-base leading-relaxed text-[#111216]/80 max-w-md">
                  SPARK Pickleball brings together the excitement of the game, a welcoming
                  community, and opportunities to improve your skills. Whether you&apos;re
                  picking up a paddle for the first time or returning for your next
                  competitive match, there&apos;s a place for you on the court.
                </p>
              </AthleticReveal>
            </div>

            {/* Right Side: Three Minimal Feature Rows (No Boxed Cards) */}
            <div className="md:col-span-5 min-w-0 border-t border-[#08090B]/15">
              {PILLARS.map(({ title, description, Icon }, idx) => (
                <motion.div
                  key={title}
                  initial={prefersReduced ? false : { opacity: 0.9, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: 0.06 * idx, ease: ATHLETIC_EASE }}
                  className="group relative py-6 border-b border-[#08090B]/15 transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ED1725] scale-y-0 origin-top transition-transform duration-300 ease-athletic group-hover:scale-y-100"
                  />
                  <div className="flex items-start gap-4 transition-transform duration-300 ease-athletic group-hover:translate-x-2">
                    <div className="pt-0.5 text-[#ED1725] shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-athletic text-2xl text-[#08090B] tracking-normal leading-none mb-1.5">
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#111216]/75">
                        {description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
