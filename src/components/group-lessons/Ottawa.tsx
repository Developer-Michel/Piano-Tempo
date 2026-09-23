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
      className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_rgba(255,255,255,1)_40%)] pt-28 pb-16 md:pt-32"
      data-testid="page-piano-lessons-ottawa"
    >
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_25px_70px_-48px_rgba(0,0,0,0.7)] md:p-9">
          <header className="space-y-5">
            <h1 className="font-display text-4xl leading-tight text-black md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-3xl font-sans text-lg leading-relaxed text-gray-700">
              {t("hero.description")}
            </p>
            <div className="max-w-2xl rounded-xl border border-gold/35 bg-gradient-to-r from-gold/10 to-gold/5 px-4 py-3">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-black/75">
                {t("cta.affordabilityTitle")}
              </p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-gray-800">
                {t("cta.affordabilityNote")}
              </p>
            </div>
          </header>

          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-gold/25 bg-gold/5 p-6">
              <h2 className="mb-4 font-display text-3xl text-black">
                {t("options.title")}
              </h2>
              <ul className="space-y-3 font-sans text-gray-700">
                {options.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-lg bg-white/85 px-4 py-3 leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-black/10 bg-black p-6 text-white">
              <h2 className="mb-4 font-display text-3xl text-white">
                {t("why.title")}
              </h2>
              <p className="font-sans leading-relaxed text-white/85">
                {t("why.description")}
              </p>
            </article>
          </section>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl bg-[linear-gradient(145deg,#131313_10%,#2e2715_50%,#463910_100%)] p-8 text-white md:p-10">
          <div className="pointer-events-none absolute -right-16 -top-14 h-48 w-48 rounded-full bg-gold/25 blur-3xl" />
          <h2 className="relative font-display text-3xl text-white md:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="relative mb-6 mt-3 max-w-3xl font-sans text-white/85">
            {t("cta.description")}
          </p>
          <Link
            href={`/${lang}/#contact`}
            className="relative inline-flex items-center rounded-full bg-gold px-6 py-3 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </main>
  );
}
