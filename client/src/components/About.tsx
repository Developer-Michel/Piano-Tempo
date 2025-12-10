import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { useInView, AnimatePresence } from "framer-motion";
import { Music, Award, Calendar, ChevronDown } from "lucide-react";

export function About() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const paragraphs = [
    translations.about.p1,
    translations.about.p2,
    translations.about.p3,
    translations.about.p4,
  ];

  // useEffect(() => {
  //   if (isHovered) return;
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % paragraphs.length);
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, [isHovered, paragraphs.length]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-white"
      data-testid="section-about"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl text-black mb-4"
            data-testid="text-about-title"
          >
            {translations.about.title[language]}
          </h2>
          <p
            className="font-serif text-xl text-gold italic"
            data-testid="text-about-subtitle"
          >
            {translations.about.subtitle[language]}
          </p>
        </motion.div>

        <div className="grid  gap-12">
          {/* Left: Accordion-style title cards with expandable content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            // onHoverStart={() => setIsHovered(true)}
            // onHoverEnd={() => setIsHovered(false)}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {paragraphs.map((para, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`border-0.2 border-gold rounded-lg overflow-hidden hover:-translate-y-1 bg-white ${
                  index === currentIndex ? "shadow-lg" : "shadow-sm"
                }`}
                data-testid={`accordion-about-${index}`}
              >
                {/* Title Button - Expandable */}
                <button
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full p-6 flex items-center justify-between transition-all duration-1000 ${
                    index === currentIndex
                      ? " text-black"
                      : "bg-white text-black hover:bg-gold/5"
                  }`}
                  data-testid={`button-about-title-${index}`}
                >
                  <h3 className="font-serif text-lg md:text-xl text-left">
                    {para.title[language]}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 shrink-0 transition-transform duration-500 ${
                      index === currentIndex ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Content - Expandable */}
                <AnimatePresence>
                  {index === currentIndex && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden "
                    >
                      <div className="p-6 pt-0 border-t-1 border-gold">
                        <p
                          className="font-sans text-gray-700 leading-relaxed whitespace-pre-line"
                          data-testid={`text-about-p${index + 1}`}
                        >
                          {para.text[language]}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
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
