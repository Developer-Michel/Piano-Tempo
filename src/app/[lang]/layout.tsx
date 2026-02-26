import type { ReactNode } from "react";

import "../../index.css";
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
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
      name: lang === "fr" ? "Cours privés" : "Private Lessons",
      itemListElement: [
        {
          "@type": "Offer",
          name:
            lang === "fr" ? "Cours privé (30 min)" : "Private lesson (30 min)",
          price: "30",
          priceCurrency: "CAD",
          url: `https://pianoatempo.ca/${lang}/programs#private`,
          description:
            lang === "fr"
              ? "Cours adaptés au rythme et aux objectifs de l’élève."
              : "Tailored lessons based on the student’s pace and goals.",
        },
        {
          "@type": "Offer",
          name:
            lang === "fr" ? "Cours privé (45 min)" : "Private lesson (45 min)",
          price: "45",
          priceCurrency: "CAD",
          url: `https://pianoatempo.ca/${lang}/programs#private`,
        },
        {
          "@type": "Offer",
          name:
            lang === "fr" ? "Cours privé (60 min)" : "Private lesson (60 min)",
          price: "60",
          priceCurrency: "CAD",
          url: `https://pianoatempo.ca/${lang}/programs#private`,
        },
        {
          "@type": "Offer",
          name:
            lang === "fr" ? "Cours de groupe (60 min)" : "Group class (60 min)",
          price: "25",
          priceCurrency: "CAD",
          url: `https://pianoatempo.ca/${lang}/programs#groups`,
          description:
            lang === "fr"
              ? "Cours collaboratif pour apprendre à lire et jouer la musique."
              : "Collaborative setting to learn reading and playing music.",
        },
      ],
    },

    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "4.9",
    //   reviewCount: "38",
    // },
    // // Optionnel: quelques reviews (si elles existent vraiment et sont visibles sur ton site)
    // review: [
    //   {
    //     "@type": "Review",
    //     author: { "@type": "Person", name: "Prénom N." },
    //     reviewRating: { "@type": "Rating", ratingValue: "5" },
    //     reviewBody: "Super expérience, prof très pédagogue.",
    //   },
    // ],
  };
  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
