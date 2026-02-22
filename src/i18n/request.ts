import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "fr"];
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "en";
  if (!locales.includes(locale)) notFound();
  console.log("requestLocale resolved to:", await requestLocale);
  return {
    locale,
    messages: {
      common: await loadMessages(locale, "common"),
      faq: await loadMessages(locale, "faq"),
      gallery: await loadMessages(locale, "gallery"),
      home: await loadMessages(locale, "home"),
      policy: await loadMessages(locale, "policy"),
      resources: await loadMessages(locale, "resources"),
      methodology: await loadMessages(locale, "methodology"),
    },
  };
});
async function loadMessages(locale: string, file: string) {
  try {
    return (await import(`../locales/${locale}/${file}.json`)).default;
  } catch {
    return {};
  }
}
