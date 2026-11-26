import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

export function WhatsAppFloatingButton() {
  const prefersReduced = useReducedMotion();
  const rawNumber = siteConfig.brand.phoneRaw.replace('+', '');
  const defaultText = encodeURIComponent(
    'Hello SPARK Pickleball Lab! I would like to enquire about indoor court booking and coaching.'
  );
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${defaultText}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center group select-none"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SPARK Pickleball Lab on WhatsApp"
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={prefersReduced ? undefined : { scale: 1.08 }}
        whileTap={prefersReduced ? undefined : { scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:bg-[#20ba5a] hover:shadow-[0_12px_28px_rgba(37,211,102,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white transition-all duration-300"
      >
        {/* Subtle breathing radar ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none group-hover:opacity-40"
        />

        {/* WhatsApp Icon (SVG for iconic look) */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 w-7 h-7 sm:w-8 sm:h-8"
        >
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        {/* Hover Tooltip Label */}
        <span
          className="pointer-events-none absolute right-full mr-3.5 px-3 py-1.5 rounded bg-[#111216] border border-white/15 text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-xl hidden sm:block"
        >
          Chat on WhatsApp
        </span>
      </motion.a>
    </aside>
  );
}
