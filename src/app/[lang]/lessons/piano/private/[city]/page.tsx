import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import PrivatePianoLessonsGatineau from "@/components/private-lessons/Gatineau";

type Props = {
  params: Promise<{ lang: string; city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, city } = await params;
  const isFrench = lang === "fr";
  const cityLabel =
    city === "ottawa" ? (isFrench ? "Ottawa" : "Ottawa") : "Gatineau";
  const path = `lessons/piano/private/${city}`;

  const t = await getTranslations({
    locale: lang,
    namespace: "pianoLessonsPrivateGatineau.metadata",
  });

  const defaultTitle = isFrench
    ? `Cours de piano privés à ${cityLabel} | Piano a Tempo`
    : `Private Piano Lessons in ${cityLabel} | Piano a Tempo`;
  const defaultDescription = isFrench
    ? "Cours de piano privés pour enfants, ados et adultes. Enseignement personnalisé adapté à votre niveau et à vos objectifs."
    : "Private piano lessons for children, teens, and adults. Personalized instruction adapted to your level and goals.";

  const title = city === "gatineau" ? t("title") : defaultTitle;
  const description =
    city === "gatineau" ? t("description") : defaultDescription;

  return {
    title,
    description,
    keywords: isFrench
      ? [
          "cours de piano privés",
          "cours de piano gatineau",
          "cours de piano ottawa",
          "professeur de piano",
          "cours de piano pour enfants",
          "cours de piano pour adultes",
        ]
      : [
          "private piano lessons",
          "piano lessons gatineau",
          "piano lessons ottawa",
          "piano teacher",
          "piano lessons for kids",
          "piano lessons for adults",
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
      images: ["https://pianoatempo.ca/concert.jpg"],
      title,
      description,
    },
    openGraph: {
      title,
      description,
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

export default async function Page({ params }: Props) {
  const { city } = await params;

  if (city !== "gatineau") {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-xl border border-gray-200 p-8 bg-white">
          <h1 className="font-serif text-3xl md:text-4xl text-black mb-4">
            {city}
          </h1>
          <p className="font-sans text-gray-700 leading-relaxed">
            This private lessons page is currently available for Gatineau.
          </p>
        </div>
      </main>
    );
  }

  return <PrivatePianoLessonsGatineau />;
}
