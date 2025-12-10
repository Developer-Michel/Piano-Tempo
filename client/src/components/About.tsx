import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Music, Award, Calendar } from "lucide-react";

export function About() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const paragraphs = [
    translations.about.p1,
    translations.about.p2,
    translations.about.p3,
    translations.about.p4,
  ];

  const stats = [
    {
      icon: Music,
      value: "500+",
      label: translations.about.stats.students[language],
    },
    {
      icon: Award,
      value: "14+",
      label: translations.about.stats.years[language],
    },
    {
      icon: Calendar,
      value: "4",
      label: translations.about.stats.recitals[language],
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % paragraphs.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered, paragraphs.length]);

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + paragraphs.length) % paragraphs.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % paragraphs.length);
  };

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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              <div className="min-h-[500px] flex items-center transition-transform will-change-transform hover:-translate-y-2 ease-in-out duration-1000">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full rounded-lg p-8"
                    data-testid={`card-about-${currentIndex}`}
                  >
                    <h3
                      className="font-serif text-2xl text-black mb-4"
                      data-testid={`text-about-p${currentIndex + 1}-title`}
                    >
                      {paragraphs[currentIndex].title[language]}
                    </h3>
                    <p
                      className="font-sans text-gray-700 leading-relaxed whitespace-pre-line"
                      data-testid={`text-about-p${currentIndex + 1}`}
                    >
                      {paragraphs[currentIndex].text[language]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-4 mt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrev}
                  className="text-gold hover:text-gold-dark hover:bg-gold/10"
                  data-testid="button-about-prev"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <div className="flex gap-2">
                  {paragraphs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-gold w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      data-testid={`button-about-dot-${index}`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="text-gold hover:text-gold-dark hover:bg-gold/10"
                  data-testid="button-about-next"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-gray-50 rounded-lg p-8 border border-gray-100 group hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                data-testid={`stat-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0 group-hover:bg-gold/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-black mb-1">
                      {stat.value}
                    </div>
                    <div className="font-sans text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </div>
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
