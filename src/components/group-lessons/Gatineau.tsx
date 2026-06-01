import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Teachers } from "@/components/Teachers/Teachers";
import { Reveal } from "@/components/ui/Reveal";
import { Testimonials } from "../Testimonials";

export default async function GroupPianoLessonsGatineauPage() {
  const t = await getTranslations("pianoLessonsGatineau");
  const programsT = await getTranslations("home.programs");
  const locale = await getLocale();

  const benefits = t.raw("benefits.items") as string[];
  const teachingPoints = t.raw("teaching.points") as string[];
  const organizationPoints = t.raw("organization.points") as string[];
  const groupOptions = programsT.raw("groups.items") as string[];
  const groupPrice = programsT("groups.price");
  const groupAges = programsT("groups.ages");
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
              alt={t("images.classroomAlt")}
              width={1920}
              height={1080}
              className="w-full rounded h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        >
          <article>
            <h2 className="font-serif text-2xl md:text-3xl text-black mb-3">
              {t("organization.title")}
            </h2>
            <p className="font-sans text-gray-700 leading-relaxed">
              {t("organization.description")}
            </p>
            <ul className="mt-4 grid gap-y-2 list-disc pl-5">
              {organizationPoints.map((point, index) => (
                <Reveal
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.14 + index * 0.04 }}
                >
                  <li className="font-sans text-sm text-gray-700 leading-relaxed transition-transform duration-300 hover:translate-x-1">
                    {point}
                  </li>
                </Reveal>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="col-span-full mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </section>

      <section
        className={`${sectionContainer} py-10 grid md:grid-cols-2 gap-6`}
      >
        <Reveal
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
        >
          <figure className="group">
            <Image
              src="/happy_hand.jpg"
              alt={t("images.classroomAlt")}
              width={1200}
              height={800}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <figcaption className="pt-3 font-sans text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
              {t("images.classroomCaption")}
            </figcaption>
          </figure>
        </Reveal>
        <Reveal
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
        >
          <figure className="group">
            <Image
              src="/senior_play.jpg"
              alt={t("images.teacherAlt")}
              width={1200}
              height={800}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <figcaption className="pt-3 font-sans text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
              {t("images.teacherCaption")}
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

      <section className={`${sectionContainer} py-10`}>
        <Reveal
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        >
          <article>
            <h2 className="font-serif text-2xl md:text-3xl text-black mb-3">
              {t("benefits.title")}
            </h2>
            <ul className="grid gap-y-2 list-disc pl-5">
              {benefits.map((point, index) => (
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
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl text-black">
              {t("options.title")}
            </h2>
            <p className="font-sans text-gray-700 leading-relaxed">
              {t("options.description")}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <article className="h-full border border-gray-200 p-5 bg-white">
                <p className="font-serif text-xl text-black">{groupAges}</p>
                <p className="mt-2 font-sans text-sm text-gold">{groupPrice}</p>
                <p className="mt-3 font-sans text-xs text-gray-600 leading-relaxed">
                  {feeNote}
                </p>
              </article>
              {groupOptions.map((courseName, index) => (
                <Reveal
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.04 }}
                >
                  <Link
                    href={`/${locale}?course=${encodeURIComponent(courseName)}#contact`}
                    className="h-full border border-gray-200 p-5 bg-white flex items-center font-sans text-sm text-gray-700 leading-relaxed transition-transform duration-300 hover:-translate-y-1 whitespace-pre-line"
                  >
                    {courseName}
                  </Link>
                </Reveal>
              ))}
            </div>
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
