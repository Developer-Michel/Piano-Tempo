import type { MetadataRoute } from "next";

const baseUrl = "https://pianoatempo.ca";
const locales = ["fr", "en"] as const;

type Locale = (typeof locales)[number];

const localizedPaths: Record<Locale, string[]> = {
  fr: [
    "",
    "/methodologie",
    "/faq",
    "/galerie",
    "/resources",
    "/policy",
    "/cours-de-piano-groupes/gatineau",
    "/cours-de-piano-groupes/ottawa",
    "/cours-de-piano/gatineau",
  ],
  en: [
    "",
    "/methodology",
    "/faq",
    "/gallery",
    "/resources",
    "/policy",
    "/groups-piano-lessons/gatineau",
    "/groups-piano-lessons/ottawa",
    "/piano-lessons/gatineau",
  ],
};

function urlFor(locale: Locale, path: string) {
  return `${baseUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) => {
    return localizedPaths[locale].map((path, index) => ({
      url: urlFor(locale, path),
      lastModified: now,
      changeFrequency: index === 0 ? "weekly" : "monthly",
      priority: index === 0 ? 1 : 0.7,
      alternates: {
        languages: {
          fr: urlFor("fr", localizedPaths.fr[index]),
          en: urlFor("en", localizedPaths.en[index]),
          "x-default": urlFor("fr", localizedPaths.fr[index]),
        },
      },
    }));
  });
}
