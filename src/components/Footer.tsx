import { siteConfig } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

const FOOTER_PILLARS = [
  { label: 'Play', href: '#court-booking' },
  { label: 'Coach', href: '#coaching' },
  { label: 'Compete', href: '#community' },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08090B] border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Original SPARK PICKLEBALL Logo */}
          <a
            href="#home"
            aria-label={`${siteConfig.brand.name} — Back to top`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1725]"
          >
            <BrandLogo size="footer" />
          </a>

          {/* Center: Play / Coach / Compete */}
          <ul className="flex items-center gap-6 sm:gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5C8CE]">
            {FOOTER_PILLARS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-[#ED1725] transition-colors duration-200 focus:outline-none focus-visible:text-[#ED1725]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: Address, Phone, Socials + Dubai, UAE */}
          <div className="flex flex-col items-start md:items-end gap-2 text-xs font-medium text-[#C5C8CE]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={`tel:${siteConfig.brand.phoneRaw}`}
                className="text-white hover:text-[#ED1725] font-semibold transition-colors tracking-tight"
              >
                {siteConfig.brand.phone}
              </a>
              <span className="text-white/20 hidden sm:inline" aria-hidden="true">
                /
              </span>
              <a
                href={siteConfig.brand.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4"
              >
                {siteConfig.brand.address}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 uppercase tracking-[0.14em] text-[0.6875rem] text-[#C5C8CE]/70">
              {siteConfig.socialLinks.map((social) =>
                social.url ? (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 focus:outline-none focus-visible:text-[#ED1725]"
                  >
                    {social.label}
                  </a>
                ) : (
                  <span
                    key={social.label}
                    aria-disabled="true"
                    title={`${social.label} link will be activated once verified URL is configured`}
                    className="text-[#C5C8CE]/40 cursor-default select-none"
                  >
                    {social.label}
                  </span>
                )
              )}
              <span className="text-white/25 hidden sm:inline" aria-hidden="true">
                /
              </span>
              <span className="text-white font-medium">{siteConfig.brand.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[0.75rem] text-[#C5C8CE]/60">
          <p>
            &copy; {currentYear} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p>Pickleball Court Bookings &amp; Coaching &mdash; {siteConfig.brand.location}</p>
        </div>
      </div>
    </footer>
  );
}

