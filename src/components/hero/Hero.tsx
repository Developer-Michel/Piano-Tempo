import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HeroCta } from "./HeroCta";
import { HeroBottom } from "./HeroBottom";

import { playfair } from "@/app/[lang]/layout";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <Image
        className="absolute inset-0 object-cover"
        src="/yamaha_piano.webp"
        alt="Piano a Tempo"
        sizes="100vw"
        fill
        priority
        data-testid="image-hero-background"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div>
          <h1
            className={`${playfair.className} text-5xl sm:text-6xl md:text-7xl text-white mb-2 tracking-wide`}
            data-testid="text-school-name"
          >
            Piano <span className="text-gold ">a Tempo</span>
          </h1>
        </div>

        <div>
          <p
            className={` text-xl sm:text-2xl md:text-3xl text-white/90  mt-6 mb-10`}
            data-testid="text-tagline"
          >
            {t("tagline")}
          </p>
        </div>
        <HeroCta label={t("cta")} />
      </div>
      <HeroBottom />
    </section>
  );
}
