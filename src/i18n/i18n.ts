import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const debug = process.env.NODE_ENV !== "production";

import en from "./en/translation.json";
import zh_Hans from "./zh-Hans/translation.json";

const resources = {
  en: {
    translation: en,
  },
  "zh-Hans": {
    translation: zh_Hans,
  },
} as const;

export type SupportedLanguage = keyof typeof resources;
export const supportedLanguages = Object.keys(resources) as SupportedLanguage[];

export const defaultNS = "translation";

const fallbackLng: Record<string, SupportedLanguage[]> = {
  "zh-CN": ["zh-Hans", "en"],
  "zh-SG": ["zh-Hans", "en"],
  "zh-MY": ["zh-Hans", "en"],
  zh: ["zh-Hans", "en"],
  default: ["en"],
} as const;

export function getFallbackLanguage(lang: string): SupportedLanguage {
  // return first match
  return (fallbackLng[lang] || fallbackLng.default)[0] as SupportedLanguage;
}

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: fallbackLng,
    debug: debug,

    resources: resources,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: typeof defaultNS;
    // custom resources type
    resources: (typeof resources)["en"];
    // other
  }
}
