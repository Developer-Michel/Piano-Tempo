import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer";
import {
  Methodology,
  Methodology as MethodologySection,
} from "@/components/Methodology";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;

  const path = "methodology";
  const isFrench = lang === "fr";
  return {
    title: isFrench
      ? "Méthodologie | Piano a Tempo"
      : "Methodology | Piano a Tempo",
    description: isFrench
      ? "Découvrez notre méthodologie d'enseignement du piano à Gatineau et Ottawa."
      : "Explore our piano teaching methodology in Gatineau and Ottawa.",
    keywords: isFrench
      ? [
          "méthodologie cours de piano",
          "enseignement cours de piano",
          "piano Gatineau",
          "piano Ottawa",
        ]
      : [
          "piano lessons methodology",
          "piano teaching",
          "piano Gatineau",
          "piano Ottawa",
        ],
    alternates: {
      canonical: `https://pianoatempo.ca/${lang}/${path}`,
      languages: {
        "en-CA": `https://pianoatempo.ca/en/${path}`,
        "fr-CA": `https://pianoatempo.ca/fr/${path}`,
        "x-default": `https://pianoatempo.ca/fr/${path}`,
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
      title: isFrench
        ? "Piano a Tempo | Méthodologie"
        : "Piano a Tempo | Methodology",
      images: ["https://pianoatempo.ca/concert.jpg"],
      description: isFrench
        ? "Découvrez notre méthodologie d'enseignement du piano à Gatineau et Ottawa."
        : "Explore our piano teaching methodology in Gatineau and Ottawa.",
    },
    openGraph: {
      title: isFrench
        ? "Piano a Tempo | Méthodologie"
        : "Piano a Tempo | Methodology",
      description: isFrench
        ? "Découvrez notre méthodologie d'enseignement du piano à Gatineau et Ottawa."
        : "Explore our piano teaching methodology in Gatineau and Ottawa.",
      url: `https://pianoatempo.ca/${lang}/${path}`,
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

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="page-methodology">
      <main className="pt-32 pb-12">
        <Methodology />
      </main>
    </div>
  );
}
