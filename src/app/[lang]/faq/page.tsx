import { FAQContent } from "@/components/faq/FAQContent";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;

  const path = "faq";
  const isFrench = lang === "fr";
  return {
    title: isFrench
      ? "Foire aux questions | Piano a Tempo"
      : "Frequently Asked Questions | Piano a Tempo",
    description: isFrench
      ? "Trouvez des réponses aux questions fréquemment posées sur les cours de piano à Gatineau et Ottawa. Informations sur les tarifs, les horaires, les méthodes d'enseignement et plus encore."
      : "Find answers to frequently asked questions about piano lessons in Gatineau and Ottawa. Information on rates, schedules, teaching methods, and more.",
    keywords: isFrench
      ? [
          "FAQ cours de piano",
          "questions fréquentes cours de piano",
          "informations cours de piano",
          "tarifs cours de piano",
          "horaires cours de piano",
          "méthodes d'enseignement piano",
          "cours de piano Gatineau FAQ",
          "cours de piano Ottawa FAQ",
        ]
      : [
          "piano lessons FAQ",
          "frequently asked questions piano lessons",
          "piano lesson information",
          "piano lesson rates",
          "piano lesson schedules",
          "piano teaching methods",
          "piano lessons Gatineau FAQ",
          "piano lessons Ottawa FAQ",
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
      title: "Piano a Tempo | Frequently Asked Questions",
      images: ["https://pianoatempo.ca/concert.jpg"],
      description:
        "Find answers to frequently asked questions about piano lessons in Gatineau and Ottawa.",
    },
    openGraph: {
      title: isFrench
        ? "Piano a Tempo | Foire aux questions"
        : "Piano a Tempo | Frequently Asked Questions",
      description: isFrench
        ? "Trouvez des réponses aux questions fréquemment posées sur les cours de piano à Gatineau et Ottawa."
        : "Find answers to frequently asked questions about piano lessons in Gatineau and Ottawa.",
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
export default function FAQ() {
  return <FAQContent />;
}
