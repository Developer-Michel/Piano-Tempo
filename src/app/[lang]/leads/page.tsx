import { LeadsFormSection } from "@/components/leads/LeadsFormSection";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;
  const isFrench = lang === "fr";
  const path = lang === "fr" ? "demandes" : "leads";

  return {
    title: isFrench
      ? "Demande de cours de piano | Piano a Tempo"
      : "Piano Lesson Inquiry | Piano a Tempo",
    description: isFrench
      ? "Faites une demande de cours de piano pour un ou plusieurs enfants et partagez vos disponibilites hebdomadaires."
      : "Submit your piano lesson inquiry for one or multiple students and share your weekly availability.",
    alternates: {
      canonical: `https://pianoatempo.ca/${lang}/${path}`,
      languages: {
        "en-CA": "https://pianoatempo.ca/en/leads",
        "fr-CA": "https://pianoatempo.ca/fr/demandes",
        "x-default": "https://pianoatempo.ca/fr/demandes",
      },
    },
    openGraph: {
      title: isFrench
        ? "Piano a Tempo | Demande de cours"
        : "Piano a Tempo | Lesson Inquiry",
      description: isFrench
        ? "Formulaire de demande de cours de piano pour parents et eleves."
        : "Piano lesson inquiry form for parents and students.",
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

export default function LeadsPage() {
  return (
    <main className="min-h-screen bg-white pt-28" data-testid="page-leads">
      <Suspense fallback={null}>
        <LeadsFormSection compact showContactPanel={false} />
      </Suspense>
    </main>
  );
}
