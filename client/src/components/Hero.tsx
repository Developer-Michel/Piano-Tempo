import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@assets/stock_images/yamaha_piano.jpg";

export function Hero() {
  const { language } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-bold"
        >
          <h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-2 tracking-wide"
            data-testid="text-school-name"
          >
            Piano <span className="text-gold">à Tempo</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p
            className="font-serif text-xl sm:text-2xl md:text-3xl text-white/90 italic mt-6 mb-10"
            data-testid="text-tagline"
          >
            {translations.hero.tagline[language]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Button
            onClick={scrollToContact}
            className="bg-gold hover:bg-gold-dark text-white font-sans text-lg px-8 py-6 tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            data-testid="button-inquire-hero"
          >
            {translations.hero.cta[language]}
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
