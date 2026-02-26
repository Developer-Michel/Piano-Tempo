import { Card } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;

  const path = "gallery";
  const isFrench = lang === "fr";
  return {
    title: isFrench ? "Galerie | Piano a Tempo" : "Gallery | Piano a Tempo",
    description: isFrench
      ? "Découvrez notre galerie de photos et vidéos des cours de piano à Gatineau et Ottawa."
      : "Explore our gallery of photos and videos from piano lessons in Gatineau and Ottawa.",
    keywords: isFrench
      ? [
          "galerie cours de piano",
          "photos cours de piano",
          "vidéos cours de piano",
          "galerie piano Gatineau",
          "galerie piano Ottawa",
        ]
      : [
          "piano lessons gallery",
          "piano lesson photos",
          "piano lesson videos",
          "piano lessons Gatineau gallery",
          "piano lessons Ottawa gallery",
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
      title: "Piano a Tempo | Gallery",
      images: ["https://pianoatempo.ca/concert.jpg"],
      description:
        "Explore our gallery of photos and videos from piano lessons in Gatineau and Ottawa.",
    },
    openGraph: {
      title: isFrench ? "Piano a Tempo | Galerie" : "Piano a Tempo | Gallery",
      description: isFrench
        ? "Découvrez notre galerie de photos et vidéos des cours de piano à Gatineau et Ottawa."
        : "Explore our gallery of photos and videos from piano lessons in Gatineau and Ottawa.",
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
export default async function Gallery() {
  const t = await getTranslations("gallery");

  const placeholderImages = Array(6).fill(null);

  return (
    <div className="min-h-screen bg-white" data-testid="page-gallery">
      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1
              className="font-serif text-4xl md:text-5xl text-black mb-4"
              data-testid="text-gallery-title"
            >
              {t("title")}
            </h1>
            <p
              className="font-serif text-xl text-gold  mb-4"
              data-testid="text-gallery-subtitle"
            >
              {t("subtitle")}
            </p>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </Reveal>

          <Reveal
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p
              className="font-sans text-gray-600 max-w-2xl mx-auto"
              data-testid="text-gallery-coming-soon"
            >
              {t("comingSoon")}
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderImages.map((_, index) => (
              <Reveal
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card
                  className="aspect-square bg-gray-100 flex items-center justify-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  data-testid={`card-gallery-${index}`}
                >
                  <div className="text-center p-6">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3 group-hover:text-gold transition-colors duration-300" />
                    <p className="font-sans text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                      {t("cardPlaceholder")}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
