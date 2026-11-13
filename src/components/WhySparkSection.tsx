import { LayoutGrid, Target, Activity, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ATHLETIC_EASE } from './MotionPrimitives';

const FEATURES = [
  {
    title: 'Quality Courts',
    description: 'A great setting for every rally.',
    Icon: LayoutGrid,
  },
  {
    title: 'Dedicated Coaching',
    description: 'Learn, practise, and improve.',
    Icon: Target,
  },
  {
    title: 'All Skill Levels',
    description: 'From first-timers to experienced players.',
    Icon: Activity,
  },
  {
    title: 'Growing Community',
    description: 'More than matches — genuine connections.',
    Icon: Users,
  },
] as const;

export function WhySparkSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="why-spark"
      aria-label="Why play at SPARK"
      className="bg-[#08090B] border-y border-white/15"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          {FEATURES.map(({ title, description, Icon }, idx) => (
            <div
              key={title}
              className={`group px-6 sm:px-8 lg:px-10 py-10 sm:py-12 transition-colors duration-300 hover:bg-[#111216]/70 ${
                idx >= 2 ? 'sm:border-t lg:border-t-0 sm:border-white/15' : ''
              }`}
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0.88, scale: 0.9, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.48,
                  delay: idx * 0.06,
                  ease: ATHLETIC_EASE,
                }}
                className="inline-flex items-center justify-center text-[#ED1725] mb-5 transition-transform duration-300 ease-athletic group-hover:-translate-y-0.5"
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </motion.div>

              <h3 className="font-athletic text-2xl sm:text-[1.75rem] text-white tracking-normal leading-none mb-2.5">
                {title}
              </h3>

              <p className="text-sm leading-relaxed text-[#C5C8CE]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
