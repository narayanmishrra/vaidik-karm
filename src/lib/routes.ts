/**
 * Route constants + homepage variants.
 *
 * The site has two front doors that render the *same* HomePage component —
 * only the hero title differs, everything below the hero (trust strip, both
 * puja service blocks, kshetra block, FAQ, final call CTA) is identical:
 *
 *   /  → Kaalsarp Puja homepage (main / canonical homepage)
 *   /narayan-nagbali-puja-trimbakeshwar → Narayan Nagbali Puja homepage
 *
 * Both paths are real URLs (vercel.json rewrites them to index.html) so each
 * can be linked, advertised and canonicalised on its own.
 */

import { HomeVariant } from '../types';

export const SITE_URL = 'https://www.kaalsarpintrimbakeshwar.com';

/** Dedicated Google Ads landing page (standalone page, not a homepage variant). */
export const KAAL_SARP_LANDING_PATH = '/kaal-sarp-puja';

/** Main homepage (Kaalsarp Puja). */
export const KAALSARP_HOME_PATH = '/';

/** Extended URL for the Narayan Nagbali Puja homepage. */
export const NAGBALI_HOME_PATH = '/narayan-nagbali-puja-trimbakeshwar';

/** Strips the trailing slash so '/' stays '/' but '/foo/' becomes '/foo'. */
export function normalizePath(pathname: string): string {
  const trimmed = (pathname || '/').replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** Which homepage a pathname resolves to. */
export function homeVariantFromPath(pathname: string): HomeVariant {
  return normalizePath(pathname) === NAGBALI_HOME_PATH ? 'nagbali' : 'kaalsarp';
}

interface HomeVariantConfig {
  /** URL of the homepage. */
  path: string;
  /** Hero title only — nothing else on the page is variant-specific. */
  hero: {
    /** H1 (Hindi, shown at every breakpoint). */
    titleHi: string;
    /** H2 (English). */
    titleEn: string;
  };
  /** Route-level SEO metadata (document title, description, canonical, OG, JSON-LD). */
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    jsonLd: object[];
  };
}

function serviceNode(variant: HomeVariant, url: string) {
  const isNagbali = variant === 'nagbali';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}/#service`,
    name: isNagbali
      ? 'Narayan Nagbali Puja at Trimbakeshwar'
      : 'Kaalsarp Puja at Trimbakeshwar',
    serviceType: isNagbali
      ? 'Narayan Nagbali Puja / Pitru Dosh Shanti'
      : 'Kaalsarp Dosh Shanti Puja',
    description: isNagbali
      ? 'Narayan Nagbali is a traditional ritual performed at Trimbakeshwar as per shastra vidhi. The pandit ji guides you on the process, dates, samagri and requirements before you plan your visit.'
      : 'Kaal Sarp Dosh Shanti Puja performed at the Trimbakeshwar Kshetra as per Vedic vidhi — with sankalp, mantra jaap, abhishek and havan, with guidance on dates, samagri and the complete process.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: ['Trimbakeshwar', 'Nashik', 'Maharashtra', 'India'],
    url,
  };
}

export const HOME_VARIANTS: Record<HomeVariant, HomeVariantConfig> = {
  kaalsarp: {
    path: KAALSARP_HOME_PATH,
    hero: {
      titleHi: 'त्र्यंबकेश्वर में कालसर्प पूजा',
      titleEn: 'Kaalsarp Puja at Trimbakeshwar',
    },
    meta: {
      title: 'Kaalsarp Puja in Trimbakeshwar | कालसर्प पूजा त्र्यंबकेश्वर',
      description:
        'Kaalsarp Puja at Trimbakeshwar Jyotirlinga, Nashik — performed by an experienced Vedic pandit with sankalp, mantra jaap, abhishek and havan. Real puja photos, clear guidance on dates & vidhi. Call +91 91096 95176 for booking.',
      canonical: `${SITE_URL}/`,
      ogTitle: 'Kaalsarp Puja in Trimbakeshwar | कालसर्प पूजा त्र्यंबकेश्वर',
      ogDescription:
        'Authentic Kaalsarp Puja at Trimbakeshwar Jyotirlinga by an experienced Vedic pandit. Call +91 91096 95176 for dates, vidhi and booking.',
      ogImage: `${SITE_URL}/images/Trimbakeshwar_Mandir.webp`,
      jsonLd: [serviceNode('kaalsarp', `${SITE_URL}/`)],
    },
  },
  nagbali: {
    path: NAGBALI_HOME_PATH,
    hero: {
      titleHi: 'त्र्यंबकेश्वर में नारायण नागबली पूजा',
      titleEn: 'Narayan Nagbali Puja at Trimbakeshwar',
    },
    meta: {
      title:
        'Narayan Nagbali Puja in Trimbakeshwar | नारायण नागबली पूजा त्र्यंबकेश्वर',
      description:
        'Narayan Nagbali Puja at Trimbakeshwar Jyotirlinga, Nashik — shastra vidhi, clear guidance on dates, samagri and requirements. Real puja photos from the kshetra. Call +91 91096 95176 for booking.',
      canonical: `${SITE_URL}${NAGBALI_HOME_PATH}`,
      ogTitle:
        'Narayan Nagbali Puja in Trimbakeshwar | नारायण नागबली पूजा त्र्यंबकेश्वर',
      ogDescription:
        'Narayan Nagbali at Trimbakeshwar Jyotirlinga performed as per shastra vidhi. Call +91 91096 95176 for dates, vidhi and booking.',
      ogImage: `${SITE_URL}/images/narayan_nagbali.jpg`,
      jsonLd: [
        serviceNode('nagbali', `${SITE_URL}${NAGBALI_HOME_PATH}`),
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Narayan Nagbali Puja',
              item: `${SITE_URL}${NAGBALI_HOME_PATH}`,
            },
          ],
        },
      ],
    },
  },
};
