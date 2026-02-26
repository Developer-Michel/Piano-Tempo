import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/About";

import { Programs } from "@/components/program/Programs";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/contact/Contact";
import { Teachers } from "@/components/Teachers/Teachers";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;
  console.log("Generating metadata for lang:", lang);
  const isFrench = lang === "fr";
  return {
    title: isFrench
      ? "Cours de piano à Gatineau et Ottawa | Piano a Tempo "
      : "Piano Lessons in Gatineau and Ottawa | Piano a Tempo",
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
      canonical: `https://pianoatempo.ca/${lang}`,
      languages: {
        "en-CA": `https://pianoatempo.ca/en`,
        "fr-CA": `https://pianoatempo.ca/fr`,
        "x-default": `https://pianoatempo.ca/fr`,
      },
    },
    authors: [
      {
        name: "Michel Racicot-Nguyen",
      },
    ],
    publisher: "Michel Racicot-Nguyen",
    twitter: {
      card: "summary_large_image",
      images: ["https://pianoatempo.ca/concert.jpg"],
      title: isFrench
        ? "Piano a Tempo | Cours de piano à Gatineau et Ottawa"
        : "Piano a Tempo | Piano Lessons in Gatineau and Ottawa",
      description: isFrench
        ? "Cours de piano privés et en groupe à Gatineau et Ottawa."
        : "Private and group piano lessons in Gatineau and Ottawa.",
    },
    openGraph: {
      title: isFrench
        ? "Piano a Tempo | Cours de piano à Gatineau et Ottawa"
        : "Piano a Tempo | Piano Lessons in Gatineau and Ottawa",
      description: isFrench
        ? "Cours de piano privés et en groupe à Gatineau et Ottawa."
        : "Private and group piano lessons in Gatineau and Ottawa.",
      url: `https://pianoatempo.ca/${lang}`,
      alternateLocale: lang === "fr" ? ["en_CA"] : ["fr_CA"],
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      siteName: "Piano a Tempo",
      type: "website",
      images: [
        { url: "https://pianoatempo.ca/concert.jpg", width: 800, height: 600 },
      ],
    },
  };
}

export type HomeSection =
  | "hero"
  | "about"
  | "teachers"
  | "programs"
  | "testimonials"
  | "contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white" data-testid="page-home">
      <Hero />

      <div className="belowFold">
        <About />
        <Teachers />
        <Programs />
        <Testimonials />
        <Contact />
      </div>
    </div>
  );
}
