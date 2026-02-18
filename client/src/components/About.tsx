import { useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import concertImage from "@assets/stock_images/concert.jpg";

export function About() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const aboutText = translations.about.singleText[language];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-white"
      data-testid="section-about"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div className="overflow-hidden rounded-xl shadow-lg h-64 md:h-80 lg:h-96">
              <img
                src={concertImage}
                alt="Concert performance"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 self-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2
                className="font-serif text-4xl md:text-5xl text-black mb-4"
                data-testid="text-about-title"
              >
                {translations.about.title[language]}
              </h2>
              <p
                className="font-serif text-xl text-gold "
                data-testid="text-about-subtitle"
              >
                {translations.about.subtitle[language]}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className=" "
              data-testid="about-text"
            >
              <div className="p-6">
                <p className="font-sans text-gray-700 leading-relaxed whitespace-pre-line">
                  {aboutText}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </section>
  );
}
