import "server-only";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./locales";

export { locales, hasLocale, type Locale } from "./locales";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  it: () => import("./dictionaries/it.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
