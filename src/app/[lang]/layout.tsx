import type { ReactNode } from "react";
import "@/index.css";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { Header } from "@/components/Header/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { locales } from "@/i18n/request";
import { Footer } from "@/components/Footer";
import { Lato, Playfair_Display } from "next/font/google";
import Script from "next/script";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  const messages = await getMessages();

  const privateLessonsPath =
    lang === "fr" ? "/cours-de-piano/gatineau" : "/piano-lessons/gatineau";
  const groupsLessonsPath =
    lang === "fr"
      ? "/cours-de-piano-groupes/gatineau"
      : "/groups-piano-lessons/gatineau";

  const serviceOffers = [
    {
      "@type": "Offer",
      name:
        lang === "fr"
          ? "Cours privé de piano (30 min)"
          : "Private piano lesson (30 min)",
      price: "30",
      priceCurrency: "CAD",
      url: `https://pianoatempo.ca/${lang}${privateLessonsPath}`,
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: lang === "fr" ? "Cours privé de piano" : "Private piano lessons",
        serviceType: "Piano lessons",
        areaServed: ["Gatineau", "Ottawa"],
      },
    },
    {
      "@type": "Offer",
      name:
        lang === "fr"
          ? "Cours privé de piano (45 min)"
          : "Private piano lesson (45 min)",
      price: "45",
      priceCurrency: "CAD",
      url: `https://pianoatempo.ca/${lang}${privateLessonsPath}`,
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: lang === "fr" ? "Cours privé de piano" : "Private piano lessons",
        serviceType: "Piano lessons",
        areaServed: ["Gatineau", "Ottawa"],
      },
    },
    {
      "@type": "Offer",
      name:
        lang === "fr"
          ? "Cours privé de piano (60 min)"
          : "Private piano lesson (60 min)",
      price: "60",
      priceCurrency: "CAD",
      url: `https://pianoatempo.ca/${lang}${privateLessonsPath}`,
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: lang === "fr" ? "Cours privé de piano" : "Private piano lessons",
        serviceType: "Piano lessons",
        areaServed: ["Gatineau", "Ottawa"],
      },
    },
    {
      "@type": "Offer",
      name:
        lang === "fr"
          ? "Cours de groupe de piano (60 min)"
          : "Group piano class (60 min)",
      price: "25",
      priceCurrency: "CAD",
      url: `https://pianoatempo.ca/${lang}${groupsLessonsPath}`,
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name:
          lang === "fr" ? "Cours de groupe de piano" : "Group piano classes",
        serviceType: "Group piano lessons",
        areaServed: ["Gatineau", "Ottawa"],
      },
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/MusicSchool",
    "@id": `https://pianoatempo.ca/${lang}/#music-school`,
    name: "Piano à Tempo",
    url: `https://pianoatempo.ca/${lang}`,
    description:
      lang === "fr"
        ? "Cours de piano à Gatineau et Ottawa : leçons pour enfants, adolescents et adultes, en personne et/ou en ligne."
        : "Piano lessons in Gatineau and Ottawa: lessons for children, teenagers, and adults, in person and/or online.",
    email: "info.pianoatempo@gmail.com",
    priceRange: "$25-$60",
    image: ["https://pianoatempo.ca/concert.jpg"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gatineau",
      addressRegion: "QC",
      postalCode: "J8Y 1B3", // optionnel mais recommandé
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "City", name: "Ottawa" },
      { "@type": "City", name: "Gatineau" },
    ],
    knowsLanguage: ["fr-CA", "en-CA"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:30",
      },
    ],
    hasMap: "https://www.google.com/maps?q=Rue%20Champagne%20Gatineau%20QC", // OK sans lat/lng
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.46152714550786,
      longitude: -75.74642768797247,
    },
    sameAs: ["https://www.facebook.com/profile.php?id=61550469422765"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: lang === "fr" ? "Cours de piano" : "Piano Lessons",
      itemListElement: serviceOffers,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: 17,
      bestRating: 5,
      worstRating: 5,
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://pianoatempo.ca/#organization",
    name: "Piano a Tempo",
    url: "https://pianoatempo.ca",
    logo: "https://pianoatempo.ca/concert.jpg",
    image: "https://pianoatempo.ca/concert.jpg",
    sameAs: [
      "https://www.instagram.com/pianoatempo/",
      "https://www.facebook.com/pianoatempo/",
    ],
    areaServed: ["Gatineau", "Ottawa"],
    knowsLanguage: ["fr", "en"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        areaServed: "CA",
        availableLanguage: ["French", "English"],
      },
    ],
  };

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/logo.ico" sizes="any" />
        <link rel="shortcut icon" href="/logo.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([structuredData, organizationJsonLd]),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <Header />
          <TooltipProvider>
            <div className={lato.className}>{children}</div>
          </TooltipProvider>
          <Toaster />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
