"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("home.hero");
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <Image
        className="bg-cover bg-center absolute inset-0 h-full w-full object-cover"
        src="/yamaha_piano.jpg"
        alt="Piano a Tempo"
        width={1920}
        height={1280}
        priority
        data-testid="image-hero-background"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="font-bold">
          <h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-2 tracking-wide"
            data-testid="text-school-name"
          >
            Piano <span className="text-gold ">a Tempo</span>
          </h1>
        </div>

        <div>
          <p
            className="font-serif text-xl sm:text-2xl md:text-3xl text-white/90  mt-6 mb-10"
            data-testid="text-tagline"
          >
            {t("tagline")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0 }}
        >
          <Button
            onClick={scrollToContact}
            className="bg-gold hover:bg-gold-dark text-white font-sans text-lg px-8 py-3 tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            data-testid="button-inquire-hero"
          >
            {t("cta")}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
