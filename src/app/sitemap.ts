import type { MetadataRoute } from "next";

const baseUrl = "https://pianoatempo.ca"; // <-- change si besoin
const locales = ["fr", "en"] as const;

type Locale = (typeof locales)[number];

// Liste tes routes “canoniques” (sans /fr ou /en) ici
const routes = [
  "", // home
  "/methodology",
  "/faq",
  "/gallery",
  "/resources",
  "/policy",
  // "/blog", "/blog/slug-1", etc.
];

function urlFor(locale: Locale, path: string) {
  // Si ton site est préfixé /fr et /en:
  return `${baseUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((path) => {
    // On crée une entrée par locale + alternates pour hreflang
    return locales.map((locale) => ({
      url: urlFor(locale, path),
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: {
          fr: urlFor("fr", path),
          en: urlFor("en", path),
          "x-default": urlFor("fr", path), // par défaut = français (Gatineau)
        },
      },
    }));
  });
}
