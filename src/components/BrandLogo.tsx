import { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

interface BrandLogoProps {
  className?: string;
  size?: 'nav' | 'footer';
}

/**
 * BrandLogo preserves the exact supplied SPARK PICKLEBALL logo file without
 * recoloring, filters, or geometric distortion.
 *
 * When `siteConfig.brand.logoSrc` is not yet configured (or fails to load),
 * it displays a clean, minimal drop-in typographic slot rather than inventing
 * an unauthorized emblem or graphic mark.
 */
export function BrandLogo({ className = '', size = 'nav' }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  const hasLogoAsset = Boolean(siteConfig.brand.logoSrc) && !imgError;

  const heightClasses = size === 'nav' ? 'h-9 sm:h-10' : 'h-8 sm:h-9';

  if (hasLogoAsset) {
    return (
      <img
        src={siteConfig.brand.logoSrc}
        alt={siteConfig.brand.logoAlt}
        onError={() => setImgError(true)}
        className={`${heightClasses} w-auto object-contain select-none ${className}`}
        draggable={false}
      />
    );
  }

  // Clean architectural drop-in wordmark slot (no invented emblem/icon)
  return (
    <span
      className={`inline-flex items-baseline gap-2 select-none ${className}`}
      aria-label="SPARK Pickleball"
    >
      <span
        className={`font-athletic text-white tracking-[-0.03em] leading-none ${
          size === 'nav' ? 'text-[1.75rem] sm:text-[2rem]' : 'text-[1.5rem] sm:text-[1.75rem]'
        }`}
      >
        SPARK
      </span>
      <span className="text-[0.625rem] sm:text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-[#ED1725] leading-none">
        PICKLEBALL
      </span>
    </span>
  );
}

