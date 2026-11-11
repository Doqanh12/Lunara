export type AppLanguage = 'vi' | 'en';

export interface BilingualContent {
  primary: string;
  secondary: string;
}

/**
 * Returns primary and secondary text based on active language.
 * When language is 'vi', vi is primary and en is secondary.
 * When language is 'en', en is primary and vi is secondary.
 */
export function getText(vi: string, en: string, language: AppLanguage): string {
  return language === 'en' ? en : vi;
}

/**
 * Returns primary text based on active language.
 * When language is 'vi', returns vi as primary and empty secondary (single language priority).
 * When language is 'en', returns en as primary and empty secondary (single language priority).
 */
export function getBilingualText(
  vi: string,
  en: string,
  language: AppLanguage
): BilingualContent {
  if (language === 'en') {
    return {
      primary: en,
      secondary: '',
    };
  }
  return {
    primary: vi,
    secondary: '',
  };
}

/**
 * Removes any legacy parenthesis enclosed English or Vietnamese text
 * e.g. "Cửa hàng (Shop)" -> { main: "Cửa hàng", sub: "Shop" }
 */
export function extractParenthesizedText(input: string): { main: string; sub: string } {
  const match = input.match(/^(.*?)\s*\((.*?)\)\s*$/);
  if (match) {
    return {
      main: match[1].trim(),
      sub: match[2].trim(),
    };
  }
  return {
    main: input.trim(),
    sub: '',
  };
}

/**
 * Standard product bilingual mapping
 */
export const PRODUCT_BILINGUAL_MAP: Record<string, { vi: string; en: string }> = {
  'prod-1': {
    vi: 'Tẩy tế bào chết Nha đam',
    en: 'Aloe Vera Scrub',
  },
  'prod-2': {
    vi: 'Tinh chất phục hồi Hoa cúc',
    en: 'Chamomile Serum',
  },
  'prod-3': {
    vi: 'Nước hoa hồng Trà xanh',
    en: 'Green tea toner',
  },
  'prod-4': {
    vi: 'Kem chống nắng phổ rộng Sun Veil',
    en: 'Sun Veil SPF 50+',
  },
  'prod-5': {
    vi: 'Kem dưỡng chống nhăn ban đêm GreenCalm',
    en: 'GreenCalm Wrinkle Cream',
  },
  'prod-6': {
    vi: 'Mặt nạ bùn khoáng Matcha Bảo Lộc',
    en: 'Matcha Detox Mask',
  },
};
