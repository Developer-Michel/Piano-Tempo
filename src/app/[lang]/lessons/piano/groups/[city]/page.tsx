import GroupPianoLessonsGatineauPage from "@/components/group-lessons/Gatineau";
import GroupPianoLessonsOttawaPage from "@/components/group-lessons/Ottawa";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string; city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, city } = await params;
  const isFrench = lang === "fr";
  const citySlug = city === "ottawa" ? "ottawa" : "gatineau";
  const path = `lessons/piano/groups/${citySlug}`;

  const namespaceByCity: Record<string, string> = {
    gatineau: "pianoLessonsGatineau",
    ottawa: "pianoLessonsOttawa",
  };

  const namespace = namespaceByCity[citySlug];
  const t = await getTranslations({
    locale: lang,
    namespace: `${namespace}.metadata`,
  });

  const title = t("title");
  const description = t("description");
  const openGraphTitle = t("openGraphTitle");
  const openGraphDescription = t("openGraphDescription");

  return {
    title,
    description,
    keywords: t.raw("keywords") as string[],
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
      title: openGraphTitle,
      description,
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: `https://pianoatempo.ca/${lang}/${path}`,
      alternateLocale: isFrench ? ["en_CA"] : ["fr_CA"],
      locale: isFrench ? "fr_CA" : "en_CA",
      siteName: "Piano a Tempo",
      type: "website",
      images: [
        { url: "https://pianoatempo.ca/concert.jpg", width: 800, height: 600 },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { city, lang } = await params;

  return (
    <main className="h-100">
      {(() => {
        switch (city) {
          case "gatineau":
            return <GroupPianoLessonsGatineauPage />;
          case "ottawa":
            return <GroupPianoLessonsOttawaPage params={{ lang }} />;
          default:
            return <div>Default content</div>;
        }
      })()}
    </main>
  );
}
