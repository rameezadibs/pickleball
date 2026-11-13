import { ReactNode } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

export const ATHLETIC_EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function AthleticReveal({
  children,
  className = '',
  delay = 0,
  yOffset = 18,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.88, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, delay, ease: ATHLETIC_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ImageMaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'bottom';
}

export function ImageMaskReveal({
  children,
  className = '',
  delay = 0.04,
}: ImageMaskRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.9, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75, delay, ease: ATHLETIC_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0.9 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0.9, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: ATHLETIC_EASE,
    },
  },
};
