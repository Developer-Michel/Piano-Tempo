import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Teachers } from "@/components/Teachers/Teachers";
import { Reveal } from "@/components/ui/Reveal";
import { Testimonials } from "../Testimonials";

export default async function PrivatePianoLessonsGatineau() {
  const t = await getTranslations("pianoLessonsPrivateGatineau");
  const programsT = await getTranslations("home.programs");
  const locale = await getLocale();

  const teachingPoints = t.raw("teaching.points") as string[];
  const whyChooseUsPoints = t.raw("whyChooseUs.points") as string[];
  const feeTimeframes = t.raw("fees.timeframes") as Array<{
    duration: string;
    price: string;
    details: string;
  }>;
  const approachCards = t.raw("approach.cards") as string[];
  const privateAges = programsT("private.ages");
  const feeNote = programsT("feeNote");
  const sectionContainer = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <main className="min-h-screen bg-white">
      <section className={`${sectionContainer} pt-32 pb-10`}>
        <Reveal
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <header className="space-y-4">
            <p className="font-sans uppercase tracking-[0.18em] text-xs text-gold">
              {t("hero.tagline")}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-black leading-tight">
              {t("hero.title")}
            </h1>
            <p className="font-sans text-lg text-gray-700 leading-relaxed max-w-4xl">
              {t("hero.description")}
            </p>
          </header>
        </Reveal>
      </section>

      <section
        className={`${sectionContainer} pb-10 grid gap-6 md:grid-cols-[360px_minmax(0,1fr)] md:items-center`}
      >
        <Reveal
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
        >
          <div className="w-full md:w-[360px]">
            <Image
              src="/studio.webp"
              alt={t("images.instrumentAlt")}
              width={1920}
              height={1080}
              className="w-full rounded h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        >
          <div className="space-y-3">
            <h2 className="font-serif text-2xl md:text-3xl text-black">
              {t("audience.title")}
            </h2>
            <p className="font-sans text-gray-700 leading-relaxed max-w-4xl">
              {t("audience.description")}
            </p>
          </div>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="col-span-full mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </section>

      <section
        className={`${sectionContainer} py-10 grid md:grid-cols-3 gap-6`}
      >
        <Reveal className="col-span-full " aria-hidden="true">
          <article>
            <h2 className="font-serif text-2xl md:text-3xl text-black mb-3">
              {t("approach.title")}
            </h2>
            <p className="font-sans text-gray-700 leading-relaxed mb-5">
              {t("approach.description")}
            </p>
            <ul className="grid gap-y-2 list-disc pl-5">
              {approachCards.map((item, index) => (
                <Reveal
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.05 }}
                >
                  <li className="font-sans text-sm text-gray-700 leading-relaxed transition-transform duration-300 hover:translate-x-1">
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
        >
          <figure className="group">
            <Image
              src="/girl-piano.jpg"
              alt={t("images.lessonAlt")}
              width={1200}
              height={900}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <figcaption className="pt-3 font-sans text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
              {t("images.lessonCaption")}
            </figcaption>
          </figure>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
        >
          <figure className="group">
            <Image
              src="/hands_piano.png"
              alt={t("images.instrumentAlt")}
              width={1200}
              height={900}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <figcaption className="pt-3 font-sans text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
              {t("images.instrumentCaption")}
            </figcaption>
          </figure>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
        >
          <figure className="group">
            <Image
              src="/senior_play.jpg"
              alt={t("images.instrumentAlt")}
              width={1200}
              height={900}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <figcaption className="pt-3 font-sans text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
              {t("images.instrumentCaption")}
            </figcaption>
          </figure>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="col-span-full mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </section>

      <section className={`${sectionContainer} py-10 grid  gap-6`}>
        <Reveal
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        ></Reveal>

        <Reveal
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
        >
          <article>
            <figure className="group mt-6">
              <Image
                alt="Piano teacher giving feedback to a student during a private lesson"
                src="/true_potential.png"
                width={1536}
                height={1024}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </figure>
          </article>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="col-span-full mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </section>

      <section className={`${sectionContainer} py-10`}>
        <Reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl text-black">
              {t("fees.title")}
            </h2>
            <p className="font-sans text-gray-700 leading-relaxed">
              {t("fees.description")}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {feeTimeframes.map((timeframe, index) => (
                <Reveal
                  key={timeframe.duration}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + index * 0.04 }}
                >
                  <article className="h-full border border-gray-200 p-5 bg-white transition-transform duration-300 hover:-translate-y-1">
                    <p className="font-serif text-xl text-black">
                      {timeframe.duration} | {timeframe.price}
                    </p>
                    <p className="mt-3 font-sans text-sm text-gray-700 leading-relaxed">
                      {timeframe.details}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              {feeNote}
            </p>
          </div>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="col-span-full mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </section>

      <section className={`${sectionContainer} py-10`}>
        <Reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl text-black">
              {t("teaching.title")}
            </h2>
            <p className="font-sans text-gray-700 leading-relaxed">
              {t("teaching.description")}
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5">
              {teachingPoints.map((point, index) => (
                <Reveal
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + index * 0.04 }}
                >
                  <li className="font-sans text-sm text-gray-700 leading-relaxed transition-transform duration-300 hover:translate-x-1">
                    {point}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="col-span-full mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </section>

      <section className={`${sectionContainer} py-10`}>
        <Reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
        >
          <div className="space-y-5">
            <h2 className="font-serif text-2xl md:text-3xl text-black">
              {t("whyChooseUs.title")}
            </h2>
            <p className="font-sans text-gray-700 leading-relaxed max-w-4xl">
              {t("whyChooseUs.description")}
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5">
              {whyChooseUsPoints.map((point, index) => (
                <Reveal
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + index * 0.04 }}
                >
                  <li className="font-sans text-sm text-gray-700 leading-relaxed transition-transform duration-300 hover:translate-x-1">
                    {point}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="col-span-full mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </section>

      <Reveal
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Teachers />
      </Reveal>
      <Testimonials />
      <section className={`${sectionContainer} pt-10 pb-16`}>
        <Reveal
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
        >
          <div className="rounded-xl bg-black text-white p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl mb-3">
              {t("cta.title")}
            </h2>
            <p className="font-sans text-white/85 mb-6 max-w-3xl">
              {t("cta.description")}
            </p>
            <Link
              href={`/${locale}/#contact`}
              className="inline-flex items-center bg-gold px-5 py-3 text-black font-semibold transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              {t("cta.button")}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
