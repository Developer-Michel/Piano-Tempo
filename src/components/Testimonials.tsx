"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const t = useTranslations("home.testimonials");
  const testimonials = t.raw("items") as {
    quote: string;
    author: string;
    child: string;
  }[];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 bg-black"
      data-testid="section-testimonials"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl text-white mb-4"
            data-testid="text-testimonials-title"
          >
            {t("title")}
          </h2>
          <p
            className="font-serif text-xl text-gold "
            data-testid="text-testimonials-subtitle"
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Quote className="absolute -top-4 -left-4 w-16 h-16 text-gold/20" />

          <div className="min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center px-8"
              >
                <p
                  className="font-serif text-xl md:text-2xl text-white/90  leading-relaxed mb-8"
                  data-testid={`text-testimonial-quote-${currentIndex}`}
                >
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <p
                    className="font-sans text-gold font-medium"
                    data-testid={`text-testimonial-author-${currentIndex}`}
                  >
                    {testimonials[currentIndex].author}
                  </p>
                  <p
                    className="font-sans text-white/60 text-sm"
                    data-testid={`text-testimonial-child-${currentIndex}`}
                  >
                    {testimonials[currentIndex].child}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrev}
              className="text-white/70 hover:text-gold hover:bg-white/10"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gold w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="text-white/70 hover:text-gold hover:bg-white/10"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
