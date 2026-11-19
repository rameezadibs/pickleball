import { siteConfig } from '../config/siteConfig';

/**
 * Helper to generate pre-filled WhatsApp links with proper phone number formatting.
 */
export function getWhatsAppUrl(message: string): string {
  const rawNumber = siteConfig.brand.phoneRaw.replace('+', '').replace(/\s+/g, '');
  return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
}
