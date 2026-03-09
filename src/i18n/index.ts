import zh from './zh';
import en from './en';

export type Lang = 'zh' | 'en';

export type Translations = typeof zh;

const translations: Record<Lang, Translations> = { zh, en };

export function useTranslations(lang: Lang): Translations {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, langSegment] = url.pathname.split('/');
  if (langSegment === 'en') return 'en';
  return 'zh';
}

export const languages: Lang[] = ['zh', 'en'];
