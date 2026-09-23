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
  const feeNote = programsT("groupFeeNote");
  const sectionContainer = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.18),_rgba(255,255,255,1)_45%)]">
      <section className={`${sectionContainer} pt-28 pb-12 md:pt-32`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <Reveal
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <header className="space-y-5">
              <p className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-sans text-xs uppercase tracking-[0.2em] text-gold">
                {t("hero.tagline")}
              </p>
              <h1 className="font-display text-4xl leading-tight text-black md:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="max-w-3xl font-sans text-lg leading-relaxed text-gray-700">
                {t("hero.description")}
              </p>
            </header>
          </Reveal>

          <Reveal
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          >
            <aside className="overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-[0_16px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="bg-gradient-to-r from-black to-black/85 px-6 py-4">
                <p className="font-serif text-2xl text-white">{groupAges}</p>
                <p className="mt-1 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-gold">
                  {groupPrice}
                </p>
              </div>
              <div className="px-6 py-5">
                <p className="font-sans text-sm leading-relaxed text-gray-600">
                  {feeNote}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className={`${sectionContainer} pb-14`}>
        <div className="grid gap-8 rounded-3xl border border-black/10 bg-white p-5 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.6)] md:p-8 lg:grid-cols-[370px_minmax(0,1fr)] lg:items-center">
          <Reveal
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
          >
            <Image
              src="/piano_group.png"
              alt={t("images.classroomAlt")}
              width={1080}
              height={1080}
              className="h-72 w-full rounded-2xl object-cover md:h-80"
            />
          </Reveal>

          <Reveal
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          >
            <article>
              <h2 className="font-display text-3xl text-black">
                {t("organization.title")}
              </h2>
              <p className="mt-3 font-sans leading-relaxed text-gray-700">
                {t("organization.description")}
              </p>
              <ul className="mt-6 grid gap-3">
                {organizationPoints.map((point, index) => (
                  <Reveal
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.14 + index * 0.04 }}
                  >
                    <li className="rounded-xl border border-gold/20 bg-gold/5 p-4 font-sans text-sm leading-relaxed text-gray-700">
                      {point}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <section className={`${sectionContainer} pb-14`}>
        <Reveal
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="rounded-2xl border border-gold/35 bg-gradient-to-r from-gold/10 to-gold/5 p-5 md:p-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-black/75">
              {t("cta.affordabilityTitle")}
            </p>
            <p className="mt-1 max-w-3xl font-sans text-sm leading-relaxed text-gray-800 md:text-[0.95rem]">
              {t("cta.affordabilityNote")}
            </p>
          </div>
        </Reveal>
      </section>

      <section className={`${sectionContainer} pb-14`}>
        <Reveal
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h2 className="mb-6 font-display text-3xl text-black">
            {t("images.title")}
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
          >
            <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_55px_-40px_rgba(0,0,0,0.6)]">
              <Image
                src="/salle_de_cours.png"
                alt={t("images.classroomAlt")}
                width={1200}
                height={800}
                className="h-72 w-full object-cover"
              />
              <figcaption className="p-4 font-sans text-sm leading-relaxed text-gray-600">
                {t("images.classroomCaption")}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          >
            <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_55px_-40px_rgba(0,0,0,0.6)]">
              <Image
                src="/senior_play.jpg"
                alt={t("images.teacherAlt")}
                width={1200}
                height={800}
                className="h-72 w-full object-cover"
              />
              <figcaption className="p-4 font-sans text-sm leading-relaxed text-gray-600">
                {t("images.teacherCaption")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className={`${sectionContainer} pb-14`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
          >
            <article className="h-full rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_55px_-42px_rgba(0,0,0,0.6)] md:p-7">
              <h2 className="font-display text-3xl text-black">
                {t("benefits.title")}
              </h2>
              <ul className="mt-5 grid gap-3">
                {benefits.map((point, index) => (
                  <Reveal
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.04 }}
                  >
                    <li className="flex gap-3 rounded-lg bg-gray-50 px-4 py-3 font-sans text-sm leading-relaxed text-gray-700">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          >
            <article className="h-full rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_55px_-42px_rgba(0,0,0,0.6)] md:p-7">
              <h2 className="font-display text-3xl text-black">
                {t("teaching.title")}
              </h2>
              <p className="mt-3 font-sans leading-relaxed text-gray-700">
                {t("teaching.description")}
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {teachingPoints.map((point, index) => (
                  <Reveal
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.04 }}
                  >
                    <li className="h-full min-h-[112px] rounded-lg border border-gold/20 bg-gold/5 px-4 py-3 font-sans text-sm leading-relaxed text-gray-700">
                      {point}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <section className={`${sectionContainer} pb-14`}>
        <Reveal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
        >
          <div className="rounded-3xl border border-black/10 bg-gradient-to-br from-black to-black/90 p-6 text-white shadow-[0_25px_70px_-45px_rgba(0,0,0,0.9)] md:p-8">
            <h2 className="font-display text-3xl text-white">
              {t("options.title")}
            </h2>
            <p className="mt-3 max-w-3xl font-sans leading-relaxed text-white/85">
              {t("options.description")}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="h-full rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="font-serif text-xl text-white">{groupAges}</p>
                <p className="mt-2 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-gold">
                  {groupPrice}
                </p>
                <p className="mt-3 font-sans text-xs leading-relaxed text-white/75">
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
                    className="flex h-full items-center rounded-2xl border border-white/25 bg-white/10 p-5 font-sans text-sm leading-relaxed text-white transition duration-300 hover:-translate-y-1 hover:bg-white/20 whitespace-pre-line"
                  >
                    {courseName}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Teachers />
      </Reveal>

      <Testimonials />

      <section className={`${sectionContainer} pt-12 pb-16`}>
        <Reveal
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(140deg,#111_15%,#2f2a19_48%,#3f3410_100%)] p-8 text-white md:p-10">
            <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-gold/20 blur-3xl" />
            <h2 className="relative font-display text-3xl text-white md:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="relative mt-3 max-w-3xl font-sans text-white/85">
              {t("cta.description")}
            </p>
            <Link
              href={`/${locale}/#contact`}
              className="relative mt-6 inline-flex items-center rounded-full bg-gold px-6 py-3 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              {t("cta.button")}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
