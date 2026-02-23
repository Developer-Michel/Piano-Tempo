import type { ReactNode } from "react";

import "../../index.css";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { Header } from "@/components/Header/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { locales } from "@/i18n/request";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;

  const isFrench = lang === "fr";
  return {
    title: isFrench
      ? "Piano a Tempo | Cours de piano à Gatineau et Ottawa"
      : "Piano a Tempo | Piano Lessons in Gatineau and Ottawa",
    description: isFrench
      ? "Cours de piano pour enfants et adultes à Gatineau et Ottawa. Cours privés et en groupe en anglais et en français. Apprenez le piano à votre rythme."
      : "Piano lessons for children and adults in Gatineau and Ottawa. Private and group classes in English and French. Learn piano at your tempo.",
    keywords: isFrench
      ? [
          "cours de piano Gatineau",
          "cours de piano Ottawa",
          "professeur de piano Gatineau",
          "professeur de piano Ottawa",
          "cours de piano privés",
          "cours de piano pour enfants",
          "studio de piano Québec",
          "cours de piano en français",
          "cours de piano en anglais",
          "cours de piano pour débutants",
          "cours de piano pour adultes",
          "cours de piano pour enfants à Gatineau",
          "cours de piano pour enfants à Ottawa",
        ]
      : [
          "piano lessons Gatineau",
          "piano lessons Ottawa",
          "piano teacher Gatineau",
          "piano teacher Ottawa",
          "private piano lessons",
          "piano classes for kids",
          "piano studio Quebec",
          "piano lessons in French",
          "piano lessons in English",
          "piano lessons for beginners",
          "piano lessons for adults",
          "piano lessons for kids in Gatineau",
          "piano lessons for kids in Ottawa",
        ],
    alternates: {
      canonical: "https://pianoatempo.ca/${lang}",
      languages: {
        "en-CA": "https://pianoatempo.ca/en",
        "fr-CA": "https://pianoatempo.ca/fr",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "Piano a Tempo | Piano Lessons in Gatineau and Ottawa",
      description: "Private and group piano lessons in Gatineau and Ottawa.",
      images: ["https://pianoatempo.ca/concert.jpg"],
    },
    openGraph: {
      title: "Piano a Tempo | Piano Lessons in Gatineau and Ottawa",
      description: "Private and group piano lessons in Gatineau and Ottawa.",
      url: "https://pianoatempo.ca",
      alternateLocale: lang === "fr" ? ["en_CA"] : ["fr_CA"],
      siteName: "Piano a Tempo",
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      type: "website",
      images: [
        {
          url: "https://pianoatempo.ca/concert.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
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

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicSchool",
              name: "Piano a Tempo",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Rue Champagne",
                addressLocality: "Gatineau",
                addressRegion: "QC",
                postalCode: "J8Y 1B3",
                addressCountry: "CA",
              },
              url: "https://pianoatempo.ca",
              strategy: "afterInteractive",
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <Header />
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
