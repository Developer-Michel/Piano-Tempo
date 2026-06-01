import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const EN_PATH = "piano-lessons-ottawa";
const FR_PATH = "cours-piano-ottawa";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: "pianoLessonsOttawa",
  });
  const localizedPath = lang === "fr" ? FR_PATH : EN_PATH;

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t.raw("metadata.keywords") as string[],
    alternates: {
      canonical: `https://pianoatempo.ca/${lang}/${localizedPath}`,
      languages: {
        "en-CA": `https://pianoatempo.ca/en/${EN_PATH}`,
        "fr-CA": `https://pianoatempo.ca/fr/${FR_PATH}`,
        "x-default": `https://pianoatempo.ca/fr/${FR_PATH}`,
      },
    },
    openGraph: {
      title: t("metadata.openGraphTitle"),
      description: t("metadata.openGraphDescription"),
      url: `https://pianoatempo.ca/${lang}/${localizedPath}`,
      siteName: "Piano a Tempo",
      type: "website",
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: lang === "fr" ? ["en_CA"] : ["fr_CA"],
      images: [
        { url: "https://pianoatempo.ca/concert.jpg", width: 800, height: 600 },
      ],
    },
  };
}

export default async function GroupPianoLessonsOttawaPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const t = await getTranslations("pianoLessonsOttawa");
  const options = t.raw("options.items") as string[];

  return (
    <main
      className="min-h-screen bg-white pt-32 pb-16"
      data-testid="page-piano-lessons-ottawa"
    >
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl text-black leading-tight">
            {t("hero.title")}
          </h1>
          <p className="font-sans text-lg text-gray-700 leading-relaxed">
            {t("hero.description")}
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border border-gray-200 p-6">
            <h2 className="font-serif text-2xl text-black mb-3">
              {t("options.title")}
            </h2>
            <ul className="font-sans text-gray-700 space-y-2">
              {options.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-gray-200 p-6">
            <h2 className="font-serif text-2xl text-black mb-3">
              {t("why.title")}
            </h2>
            <p className="font-sans text-gray-700 leading-relaxed">
              {t("why.description")}
            </p>
          </article>
        </section>

        <div className="rounded-xl bg-black text-white p-8">
          <h2 className="font-serif text-2xl mb-3">{t("cta.title")}</h2>
          <p className="font-sans text-white/85 mb-6">{t("cta.description")}</p>
          <Link
            href={`/${lang}#contact`}
            className="inline-flex items-center rounded-md bg-gold px-5 py-3 text-black font-semibold hover:opacity-90 transition-opacity"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </main>
  );
}
